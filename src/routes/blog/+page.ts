import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
  const currentPage = Number.parseInt(url.searchParams.get("page") || "1");
  const response = await fetch(`/api/posts?page=${currentPage}`);

  if (response.ok) {
    const json = await response.json();

    if (json.length == 0 && currentPage > 1) {
      const countResponse = await fetch(`/api/posts/count`);
      const lastPage = await countResponse.json();

      throw redirect(302, `/blog?page=${lastPage || 1}`);
    } else {
      return { posts: json };
    }
  } else {
    error(503, "Failed to load posts");
  }
}