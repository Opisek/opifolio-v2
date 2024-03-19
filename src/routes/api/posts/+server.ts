import { getPosts, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET({ url }) {
  const amount = Number.parseInt(url.searchParams.get("limit") || DEFAULT_LIMIT.toString());
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  const posts = getPosts(amount, page);
  return new Response(JSON.stringify(posts));
}