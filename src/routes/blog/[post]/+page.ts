import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/post/${params.post}`);
  const post = await response.json();
  if (!post) error(404, "Post not found");
  post.timestamp = new Date(post.timestamp); // TODO: figure out why we need it here but not under /blog
  return { post: post };
}