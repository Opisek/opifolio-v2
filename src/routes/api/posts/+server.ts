import { getPosts, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET({ url }) {
  const amount = Number.parseInt(url.searchParams.get('amount') || DEFAULT_LIMIT.toString());
  const offset = Number.parseInt(url.searchParams.get('offset') || "0");

  const posts = getPosts(amount, offset);
  return new Response(JSON.stringify(posts));
}