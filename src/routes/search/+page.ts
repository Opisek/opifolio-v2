import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ fetch, url }) => {
  const [ posts, tags, count ] = await Promise.all([
    fetch(`/api/search${url.search}`).then(res => res.json()),
    fetch("/api/tags").then(res => res.json()), // TODO: caching
    fetch(`/api/search/pageCount${url.search}`).then(res => res.json()) // TODO: caching
  ]);

  if (posts.length == 0) {
    url.searchParams.set("page", count.toString());
    if (browser) goto(url.toString(), { replaceState: true });
    else throw redirect(302, url.toString());
  }

  return {
    posts: posts,
    tags: tags,
    count: count
  };
}