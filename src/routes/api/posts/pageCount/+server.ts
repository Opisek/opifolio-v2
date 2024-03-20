import { getPostAmount, DEFAULT_LIMIT } from '$lib/server/db.js';

export function GET() {
  const postAmount = getPostAmount();
  return new Response(JSON.stringify(Math.ceil(postAmount / DEFAULT_LIMIT)));
}