import { searchPosts, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET({ url }) {
  const query = url.searchParams.get("query");
  const tag = url.searchParams.get("tag");
  const amount = Number.parseInt(url.searchParams.get("limit") || DEFAULT_LIMIT.toString());
  const page = Number.parseInt(url.searchParams.get("page") || "0");

  const result = searchPosts(query, tag, amount, page);

  return new Response(JSON.stringify(result));
}