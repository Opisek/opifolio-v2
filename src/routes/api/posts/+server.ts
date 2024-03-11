import { getPosts } from '$lib/server/db.js';

const DEFAULT_AMOUNT = 10;

export function GET({ url }) {
  const amount = Number.parseInt(url.searchParams.get('amount') || DEFAULT_AMOUNT.toString());
  const offset = Number.parseInt(url.searchParams.get('offset') || "0");

  const posts = getPosts(amount, offset);
  return new Response(JSON.stringify(posts));
}