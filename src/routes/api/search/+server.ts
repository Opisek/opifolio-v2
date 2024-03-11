import { searchPosts } from '$lib/server/db.js';

export function GET({ url }) {
  let query = url.searchParams.get('query');
  if (query != null) query = decodeURIComponent(query);
  
  let tag = url.searchParams.get('tag');
  if (tag != null) tag = decodeURIComponent(tag);

  const result = searchPosts(query, tag);

  return new Response(JSON.stringify(result));
}