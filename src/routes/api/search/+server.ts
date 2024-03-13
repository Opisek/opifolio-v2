import { searchPosts, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET({ url }) {
  const query = url.searchParams.get('query');
  const tag = url.searchParams.get('tag');
  const amount = Number.parseInt(url.searchParams.get('amount') || DEFAULT_LIMIT.toString());
  const offset = Number.parseInt(url.searchParams.get('offset') || "0");

  const result = searchPosts(query, tag, amount, offset);

  return new Response(JSON.stringify(result));
}