import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  return { posts: (await (await fetch("/api/posts")).json()) };
}