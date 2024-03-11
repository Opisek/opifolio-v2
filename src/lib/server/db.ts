import Database from "better-sqlite3";

const db = new Database();

function getID(humanid: string): number {
  return (db.prepare(`
    SELECT dbid, humanid
    FROM posts
    WHERE humanid = @humanid;
  `).get({ humanid }) as { dbid: number }).dbid;
}

export function initialize() {
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
      markdown TEXT
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
    CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
      dbid,
      title,
      summary,
      markdown,
      content=posts,
      content_rowid=dbid
    );
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_update
    AFTER UPDATE ON posts BEGIN
      INSERT INTO posts_fts(posts_fts, rowid, title, summary, markdown)
      VALUES ('delete', OLD.dbid, OLD.title, OLD.summary, OLD.markdown);
      INSERT INTO posts_fts(rowid, title, summary, markdown)
      VALUES (NEW.dbid, NEW.title, NEW.summary, NEW.markdown);
    END;
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_delete
    AFTER DELETE ON posts BEGIN
      INSERT INTO posts_fts(posts_fts, rowid, title, summary, markdown)
      VALUES ('delete', OLD.dbid, OLD.title, OLD.summary, OLD.markdown);
    END;
  `)
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS posts_after_insert
    AFTER INSERT ON posts BEGIN
      INSERT INTO posts_fts(rowid, title, summary, markdown)
      VALUES (NEW.dbid, NEW.title, NEW.summary, NEW.markdown);
    END;
  `)
}

export function insertPost(post: PostData) {
  const fields = {
    humanid: post.id,
    title: post.title,
    summary: post.summary,
    thumbnail: post.thumbnail,
    author: post.author,
    timestamp: post.timestamp,
    public: post ? 1 : 0,
    markdown: post.markdown
  };

  let replace = "";
  Object.entries(fields).forEach(([key, value]) => {
    if (value == null) return;
    if (replace == "") replace = "SET ";
    else replace += ", ";
    replace += `${key} = @${key}`;
  });

  const sql = `
    INSERT INTO posts (humanid, title, summary, thumbnail, author, timestamp, public, markdown)
    VALUES (@humanid, @title, @summary, @thumbnail, @author, @timestamp, @public, @markdown)
    ON CONFLICT(humanid) DO UPDATE
    ${replace};
  `;

  db.prepare(sql).run(fields);

  const dbid = getID(post.id);
  post.tags.forEach((tag) => {
    db.prepare(`
      INSERT INTO tags (dbid, tag)
      VALUES (@dbid, @tag)
      ON CONFLICT(dbid, tag) DO NOTHING;
    `).run({ dbid, tag });
  });
}

export function insertMarkdown(humanid: string, markdown: string) {
  db.prepare(`
    UPDATE posts
    SET markdown = @markdown
    WHERE humanid = @humanid;
  `).run({ humanid, markdown });
}

export function deletePost(humanid: string) {
  db.prepare(`
    DELETE FROM posts
    WHERE humanid = @humanid;
  `).run({ humanid });
}

export function getPostAmount() {
  return db.prepare(`
    SELECT COUNT(*)
    FROM posts
    WHERE public = true;
  `).get();
}

function parsePost(post: PostData): PostData {
  const parsedPost = post as PostData;

  parsedPost.tags = db.prepare(`
    SELECT tag
    FROM tags
    WHERE dbid = @dbid
    ORDER BY tag;
  `).all({ dbid: getID(post.id) }).map((tag) => (tag as { tag: string }).tag);

  parsedPost.timestamp = new Date(parsedPost.timestamp as unknown as number * 1000);

  return parsedPost;
}

export function getPosts(amount: number, offset: number) {
  if (Number.isNaN(amount) || amount > 10 || amount < 1) amount = 10;
  if (Number.isNaN(offset) || offset < 0) offset = 0;

  const result = db.prepare(`
    SELECT humanid AS id, title, summary, thumbnail, author, timestamp
    FROM posts
    WHERE public = true
    ORDER BY timestamp DESC
    LIMIT @amount OFFSET @offset;
  `).all({ amount, offset });

  return result.map(post => parsePost(post as PostData));
}

export function getPost(humanid: string) {
  const post = db.prepare(`
    SELECT humanid AS id, title, summary, thumbnail, author, timestamp, markdown
    FROM posts
    WHERE humanid = @humanid;
  `).get({ humanid });

  if (!post) return null;
  return parsePost(post as PostData);  
}

export function existsPost(humanid: string) {
  return (db.prepare(`
    SELECT COUNT(*) as count
    FROM posts
    WHERE humanid = @humanid;
  `).get({ humanid }) as { count: number }).count > 0;
}

export function searchPosts(query: string | null, tag: string | null) {
  let subclause = "";
  if (query != null) {
    subclause += `
      SELECT dbid
      FROM posts_fts
      WHERE posts_fts MATCH @query
    `;
  }
  if (tag != null) {
    if (subclause != "") subclause += "INTERSECT"
    subclause += `
      SELECT dbid
      FROM tags
      WHERE tag=@tag
    `;
  }
  if (subclause == "") {
    subclause = `
      SELECT dbid
      FROM posts 
    `
  }

  const sql = `
    SELECT humanid AS id, title, summary, thumbnail, author, timestamp
    FROM (
      ${subclause}
    ) ids
    JOIN posts ON posts.dbid = ids.dbid;
  `;

  const result = db.prepare(sql).all({ query, tag });

  return result.map(post => parsePost(post as PostData));
}

export function getTags() {
  return db.prepare(`
    SELECT DISTINCT tag
    FROM tags
    ORDER BY tag;
  `).all().map((tag) => (tag as { tag: string }).tag);
}