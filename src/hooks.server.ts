import * as db from "$lib/server/db";
import chokidar from "chokidar";

import * as fs from "fs";
import * as fsp from "fs/promises";

//
// Posts
//

function getPostId(file: string): string | null {
  const parts = file.split("/");
  if (parts.length != 5) return null;
  return parts[3];
}

function handlePostAddMetadata(path: string) {
  // Parse post ID
  const id = getPostId(path);
  if (id == null) return;

  // Parse post metadata
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
  if (!post.thumbnail.startsWith("http")) {
    post.thumbnail = `/blog/${post.id}/images/${post.thumbnail}.webp`;
  }

  // Insert post metadata and potentially markdown
  const isNewEntry = !db.existsPost(id) && fs.existsSync(`/app/posts/${id}/post.md`);
  db.insertPost(post);
  if (isNewEntry) handlePostAddMarkdown(`/app/posts/${id}/post.md`);
}

function handlePostAddMarkdown(path: string) {
  // Parse post ID
  const id = getPostId(path);
  if (id == null) return;
  
  // Check if post exists
  if (!db.existsPost(id)) return;

  // Update post markdown
  db.insertMarkdown(id, fs.readFileSync(path, "utf-8"));
}

function handlePostAdd(path: string) {
  if (path.endsWith(".json")) handlePostAddMetadata(path);
  else if (path.endsWith(".md")) handlePostAddMarkdown(path);
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

//
// Redirets
//

function handleRedirectUpdate(path: string) {
  if (path != "/app/config/redirects.json") return;

  let redirects: RedirectData[];
  try {
    redirects = JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (e) {
    throw new Error(`Failed to parse redirects: ${e}`);
  }

  const allRedirects = new Set<string>();
  redirects.forEach((redirect) => {
    db.insertRedirect(redirect);
    allRedirects.add(redirect.url);
  });

  db.getAllRedirectUrls().filter(url => !allRedirects.has(url)).forEach(url => db.deleteRedirect(url));
}

chokidar.watch("/app/config")
  .on("add", handleRedirectUpdate)
  .on("change", handleRedirectUpdate);