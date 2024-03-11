import { searchPosts } from '$lib/server/db.js';

export function GET({ url }) {
  const query = url.searchParams.get('query');
  const tag = url.searchParams.get('tag');

  const result = searchPosts(query, tag);

  return new Response(JSON.stringify(result));
}