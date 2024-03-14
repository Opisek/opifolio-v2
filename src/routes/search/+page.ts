import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
  let params = url.search;
  params += `${params == "" ? "?" : "&"}limit=10&offset=0`;

  const posts = fetch(`/api/search${params}`).then(res => res.json());
  const tags = fetch("/api/tags").then(res => res.json());

  return {
    posts: await posts,
    tags: await tags 
  };
}