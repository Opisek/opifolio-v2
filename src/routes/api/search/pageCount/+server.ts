import { searchPosts, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET({ url }) {
  const query = url.searchParams.get("query");
  const tag = url.searchParams.get("tag");

  const postAmount = (searchPosts(query, tag, 1, 1, true) as { count: number }).count;

  return new Response(JSON.stringify(Math.ceil(postAmount / DEFAULT_LIMIT)));
}