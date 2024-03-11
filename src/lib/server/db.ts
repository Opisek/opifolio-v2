import Database from "better-sqlite3";
import * as fs from "fs";

const db = new Database();

export function initialize() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id VARCHAR(64) PRIMARY KEY,
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
    CREATE TABLE IF NOT EXISTS tags (
      id VARCHAR(64) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
      tag VARCHAR(64),
      PRIMARY KEY (id, tag)
    );
  `)
}

export function insertPost(post: PostData) {
  db.prepare(`
    INSERT INTO posts (id, title, summary, thumbnail, author, timestamp, public, markdown)
    VALUES (@id, @title, @summary, @thumbnail, @author, @timestamp, @public, @markdown)
    ON CONFLICT(id) DO UPDATE
    SET title = @title, summary = @summary, thumbnail = @thumbnail, author = @author, timestamp = @timestamp, public = @public, markdown = @markdown;
  `).run({
    id: post.id,
    title: post.title,
    summary: post.summary,
    thumbnail: post.thumbnail,
    author: post.author,
    timestamp: post.timestamp,
    public: post ? 1 : 0,
    markdown: post.markdown
  });

  post.tags.forEach((tag) => {
    db.prepare(`
      INSERT INTO tags (id, tag)
      VALUES (@id, @tag)
      ON CONFLICT(id, tag) DO NOTHING;
    `).run({
      id: post.id,
      tag: tag
    });
  });
}

export function insertMarkdown(id: string, markdown: string) {
  db.prepare(`
    UPDATE posts
    SET markdown = @markdown
    WHERE id = @id;
  `).run({ id, markdown });
}

export function deletePost(id: string) {
  db.prepare(`
    DELETE FROM posts WHERE id = @id;
  `).run({ id });
}

export function getPostAmount() {
  return db.prepare(`
    SELECT COUNT(*) FROM posts
    WHERE public = true;
  `).get();
}

function parsePost(post: PostData): PostData {
  const parsedPost = post as PostData;

  parsedPost.tags = db.prepare(`
    SELECT tag FROM tags
    WHERE id = @id;
  `).all({ id: parsedPost.id }).map((tag) => (tag as { tag: string }).tag);

  parsedPost.timestamp = new Date(parsedPost.timestamp as unknown as number * 1000);

  return parsedPost;
}

export function getPosts(amount: number, offset: number) {
  if (Number.isNaN(amount) || amount > 10 || amount < 1) amount = 10;
  if (Number.isNaN(offset) || offset < 0) offset = 0;

  const result = db.prepare(`
    SELECT id, title, summary, thumbnail, author, timestamp FROM posts
    WHERE public = true
    ORDER BY timestamp DESC
    LIMIT @amount OFFSET @offset;
  `).all({ amount, offset });

  return result.map(post => parsePost(post as PostData));
}

export function getPost(id: string) {
  const post = db.prepare(`
    SELECT id, title, summary, thumbnail, author, timestamp, markdown FROM posts
    WHERE id = @id;
  `).get({ id });

  if (!post) return null;
  return parsePost(post as PostData);  
}