import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    return { posts: await response.json() };
  } else {
    error(503, "Failed to load posts");
  }
}