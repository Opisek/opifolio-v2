import * as db from "$lib/server/db";
import chokidar from "chokidar";

import * as fs from "fs";
import * as fsp from "fs/promises";

db.initialize();

function getPostId(file: string): string | null {
  if (!file.endsWith(".json")) return null;
  const parts = file.split("/");
  if (parts.length != 5) return null;
  return parts[3];
}

function handlePostAdd(path: string) {
  const id = getPostId(path);
  if (id == null) return;

  let post: PostData;
  try {
    post = JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (_) {
    return;
  }
  if (["author", "summary", "thumbnail", "author", "timestamp"].some((key) => !(key in post))) return;

  if (!post.tags) post.tags = [];
  if (!Array.isArray(post.tags)) return;
  post.tags = post.tags.sort();

  post.id = id; 
  post.thumbnail = `/blog/${post.id}/images/${post.thumbnail}.webp`;

  db.insertPost(post);
}

function handlePostDelete(path: string) {
  const id = getPostId(path);
  if (id == null) return;

  db.deletePost(id);
}

chokidar.watch("/app/posts")
  .on("add", handlePostAdd)
  .on("change", handlePostAdd)
  .on("unlink", handlePostDelete);