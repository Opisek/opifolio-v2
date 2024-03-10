import { getPost } from '$lib/server/db.js';

export function GET({ params }) {
  const post = getPost(params.id);
  return new Response(JSON.stringify(post));
}