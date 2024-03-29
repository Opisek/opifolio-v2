import Database from "better-sqlite3";

export const DEFAULT_LIMIT = 10;

const db = new Database();

const begin = db.prepare('BEGIN');
const commit = db.prepare('COMMIT');
const rollback = db.prepare('ROLLBACK');
// TODO: i would like to use a decorator but ehhhhh not allowed on functions for some reason
function asTransaction<Args extends any[], Ret>(func: ((...args: Args) => Ret)): ((...args: Args) => Ret) {
  return function (...args) {
    begin.run();
    try {
      const res = func(...args);
      commit.run();
      return res;
    } finally {
      if (db.inTransaction) {
        rollback.run();
        console.error("Could not commit transaction");
      }
    }
  };
}

// Initalize
asTransaction(() => {
  // DB Settings
  db.pragma("journal_mode = WAL");

  // Posts Data
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      dbid INTEGER PRIMARY KEY,
      humanid VARCHAR(64) UNIQUE,
      title VARCHAR(255),
      summary VARCHAR(1024),
      thumbnail VARCHAR(64),
      author VARCHAR(64),
      timestamp DATETIME,
      public BOOLEAN,
      markdown TEXT,
      keywords TEXT
    );
  `);
  db.exec(`
    CREATE INDEX IF NOT EXISTS posts_humanid ON posts(humanid);
  `)

  // Tags
  db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
      dbid INTEGER,
      tag VARCHAR(64),
      PRIMARY KEY (dbid, tag),
      FOREIGN KEY(dbid) REFERENCES posts(dbid) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `)
  db.exec(`
    CREATE INDEX IF NOT EXISTS tags_index ON tags(tag);
  `)
  
  // Search
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5 (
      dbid,
      title,
      summary,
      markdown,
      keywords,
      content=posts,
      content_rowid=dbid,
      tokenize="trigram case_sensitive 0 remove_diacritics 1"
    );
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_update
    AFTER UPDATE ON posts BEGIN
      INSERT INTO posts_fts(posts_fts, rowid, title, summary, markdown, keywords)
      VALUES ('delete', OLD.dbid, OLD.title, OLD.summary, OLD.markdown, OLD.keywords);
      INSERT INTO posts_fts(rowid, title, summary, markdown, keywords)
      VALUES (NEW.dbid, NEW.title, NEW.summary, NEW.markdown, NEW.keywords);
    END;
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_delete
    AFTER DELETE ON posts BEGIN
      INSERT INTO posts_fts(posts_fts, rowid, title, summary, markdown, keywords)
      VALUES ('delete', OLD.dbid, OLD.title, OLD.summary, OLD.markdown, OLD.keywords);
    END;
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_insert
    AFTER INSERT ON posts BEGIN
      INSERT INTO posts_fts(rowid, title, summary, markdown, keywords)
      VALUES (NEW.dbid, NEW.title, NEW.summary, NEW.markdown, NEW.keywords);
    END;
  `)

  // Redirects
  db.exec(`
    CREATE TABLE IF NOT EXISTS redirects_data (
      id INTEGER PRIMARY KEY,
      url VARCHAR(255) UNIQUE,
      code INTEGER
    );
  `)
  db.exec(`
    CREATE INDEX IF NOT EXISTS redirects_data_url ON redirects_data(url);
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS redirects_aliases (
      alias VARCHAR(255) PRIMARY KEY,
      id INTEGER,
      FOREIGN KEY(id) REFERENCES redirects_data(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `)
})();

//
// Posts
//

const getPostTagsStatement = db.prepare(`
  SELECT tag
  FROM tags
  WHERE dbid = @dbid
  ORDER BY tag;
`);
function parsePost(post: PostData): PostData {
  const parsedPost = post as PostData;

  parsedPost.tags = getPostTagsStatement.all({ dbid: post.dbid }).map((tag) => (tag as { tag: string }).tag);

  parsedPost.timestamp = new Date(parsedPost.timestamp as unknown as number * 1000);

  try {
    if (parsedPost.keywords) parsedPost.keywords = JSON.parse(parsedPost.keywords as string);
    else parsedPost.keywords = [];
  } catch (_) {
    parsedPost.keywords = [];
  }

  delete parsedPost.dbid;

  return parsedPost;
}

const insertPostInsertTagStatement = db.prepare(`
  INSERT INTO tags (dbid, tag)
  VALUES (@dbid, @tag);
`);
const insertPostGetPostTagsStatement = db.prepare(`
  SELECT tag
  FROM tags
  WHERE dbid = @dbid;
`);
const insertPostDeleteTagStatement = db.prepare(`
  DELETE FROM tags
  WHERE dbid = @dbid
  AND tag = @tag;
`);
export const insertPost = (post: PostData): void => asTransaction((post: PostData) => {
  const fields = {
    humanid: post.id,
    title: post.title,
    summary: post.summary,
    thumbnail: post.thumbnail,
    author: post.author,
    timestamp: post.timestamp,
    public: post.public ? 1 : 0,
    markdown: post.markdown,
    keywords: JSON.stringify(post.keywords) 
  };

  let replace = "";
  Object.entries(fields).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (replace == "") replace = "SET ";
    else replace += ", ";
    replace += `${key} = @${key}`;
  });

  const sql = `
    INSERT INTO posts (humanid, title, summary, thumbnail, author, timestamp, public, markdown, keywords)
    VALUES (@humanid, @title, @summary, @thumbnail, @author, @timestamp, @public, @markdown, @keywords)
    ON CONFLICT(humanid) DO UPDATE
    ${replace}
    RETURNING dbid;
  `;

  const dbid = (db.prepare(sql).get(fields) as { dbid: number }).dbid;

  const wantedTags = new Set(post.tags);
  const currentTags = (insertPostGetPostTagsStatement.all({ dbid }) as { tag: string }[]).map((tag) => tag.tag);

  currentTags
    .filter((tag) => !wantedTags.has(tag))
    .forEach((tag) => insertPostDeleteTagStatement.run({ dbid, tag }));

  post.tags
    .filter(tag => !currentTags.includes(tag))
    .forEach((tag) => insertPostInsertTagStatement.run({ dbid, tag }));
})(post);

const insertMarkdownStatement = db.prepare(`
  UPDATE posts
  SET markdown = @markdown
  WHERE humanid = @humanid;
`);
export const insertMarkdown = (humanid: string, markdown: string): void => {
  insertMarkdownStatement.run({ humanid, markdown });
}

const deletePostStatement = db.prepare(`
  DELETE FROM posts
  WHERE humanid = @humanid;
`);
export const deletePost = (humanid: string): void => {
  deletePostStatement.run({ humanid });
}

const getPostAmountStatement = db.prepare(`
  SELECT COUNT(*) as count
  FROM posts
  WHERE public = true;
`);
export const getPostAmount = (): number => {
  return (getPostAmountStatement.get() as { count: number }).count as number; 
}

const getPostsStatement = db.prepare(`
  SELECT dbid, humanid AS id, title, summary, thumbnail, author, timestamp
  FROM posts
  WHERE public = true
  ORDER BY timestamp DESC
  LIMIT @amount
  OFFSET @offset;
`)
export const getPosts = (amount: number, page: number): PostData[] => {
  if (Number.isNaN(amount) || amount > 10 || amount < 1) amount = 10;
  if (Number.isNaN(page) || page < 1) page = 1;
  const offset = (page - 1) * amount;

  const result = getPostsStatement.all({ amount, offset });

  return result.map(post => parsePost(post as PostData));
}

const getPostStatement = db.prepare(`
  SELECT dbid, humanid AS id, title, summary, thumbnail, author, timestamp, markdown, keywords
  FROM posts
  WHERE humanid = @humanid;
`);
export function getPost(humanid: string): PostData | null {
  const post = getPostStatement.get({ humanid });

  if (!post) return null;
  return parsePost(post as PostData);  
}

const existsPostsStatement = db.prepare(`
  SELECT COUNT(*) as count
  FROM posts
  WHERE humanid = @humanid;
`);
export const existsPost = (humanid: string): boolean => {
  return (existsPostsStatement.get({ humanid }) as { count: number }).count > 0;
}

export const searchPosts = (query: string | null, tag: string | null, amount: number, page: number, onlyAmount: boolean = false): PostData[] | { count: number } => {
  if (Number.isNaN(amount) || amount > 10 || amount < 1) amount = 10;
  if (Number.isNaN(page) || page < 1) page = 1;
  const offset = (page - 1) * amount;

  let subclause =
    query == null
    ? `
      SELECT posts.*
      FROM posts
      ORDER BY timestamp DESC
    `
    : `
      SELECT posts.*
      FROM posts_fts
      JOIN posts ON posts.dbid = posts_fts.rowid
      WHERE posts_fts MATCH @query
      ORDER BY rank, timestamp DESC
    `;
  
  let condition = `
    WHERE public = true
  `
  if (tag != null) {
    condition += `
      AND EXISTS (
        SELECT *
        FROM tags
        WHERE tags.dbid = filtered.dbid
        AND tag = @tag
      )
    `;
  }

  const sql = `
    SELECT ${onlyAmount ? "COUNT(*) as count" : "dbid, humanid AS id, title, summary, thumbnail, author, timestamp"}
    FROM (
      ${subclause}
    ) filtered
    ${condition}
    ${onlyAmount ? "" : "LIMIT @amount OFFSET @offset"};
  `;

  const result = db.prepare(sql).all({ query, tag, amount, offset });

  if (onlyAmount) return result[0] as { count: number };
  else return result.map(post => parsePost(post as PostData));
}

const getAllTagsStatement = db.prepare(`
  SELECT DISTINCT tag
  FROM tags
  JOIN posts ON posts.dbid = tags.dbid
  WHERE public = true
  ORDER BY tag;
`);
export const getTags = (): string[] => {
  return getAllTagsStatement.all().map((tag) => (tag as { tag: string }).tag);
}

//
// Redirects
//

const insertRedirectDataStatement = db.prepare(`
  INSERT INTO redirects_data (url, code)
  VALUES (@url, @code)
  ON CONFLICT(url) DO UPDATE
  SET code = @code
  RETURNING id;
`);
const insertRedirectAliasStatement = db.prepare(`
  INSERT INTO redirects_aliases (alias, id)
  VALUES (@alias, @id)
  ON CONFLICT(alias) DO UPDATE
  SET id = @id;
`);
export const insertRedirect = (data: RedirectData): void => {
  const id = (insertRedirectDataStatement.get(data) as { id: number }).id;

  data.pages.forEach((page) => {
    insertRedirectAliasStatement.run({ alias: page, id: id });
  });
}

const getAllRedirectUrlsStatement = db.prepare(`
  SELECT url
  FROM redirects_data;
`);
export const getAllRedirectUrls = (): string[] => {
  return getAllRedirectUrlsStatement.all().map((row) => (row as { url: string }).url);
}

const deleteRedirectStatement = db.prepare(`
  DELETE FROM redirects_data
  WHERE url = @url;
`);
export const deleteRedirect = (url: string): void => {
  deleteRedirectStatement.run({ url });
}

const getRedirectStatement = db.prepare(`
  SELECT url, code
  FROM redirects_data
  JOIN redirects_aliases ON redirects_data.id = redirects_aliases.id
  WHERE alias = @alias;
`);
export function getRedirect(alias: string): RedirectData| null {
  return getRedirectStatement.get({ alias }) as RedirectData | null ;
}