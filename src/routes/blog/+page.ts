import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ fetch, url }) => {
  const currentPage = Number.parseInt(url.searchParams.get("page") || "1");

  const [ posts, count ] = await Promise.all([
    fetch(`/api/posts?page=${currentPage}`).then(res => res.json()),
    fetch(`/api/posts/pageCount`).then(res => res.json())
  ]);

  if (posts.length == 0 && currentPage > 1) {
    const url = `/blog?page=${count || 1}`;
    if (browser) goto(url, { replaceState: true });
    else throw redirect(302, url);
  } else {
    return {
      posts: posts,
      count: count
    };
  }
}