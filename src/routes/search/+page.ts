import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ fetch, url }) => {
  const [ posts, tags ] = await Promise.all([
    fetch(`/api/search${url.search}`).then(res => res.json()),
    fetch("/api/tags").then(res => res.json())
  ]);

  if (posts.length == 0) {
    const currentPage = Number.parseInt(url.searchParams.get("page") || "1");
    if (currentPage > 1) {
      url.searchParams.set("page", (currentPage - 1).toString());
      if (browser) goto(url.toString(), { replaceState: true });
      else throw redirect(302, url.toString());
    }
  }

  return {
    posts: await posts,
    tags: await tags 
  };
}