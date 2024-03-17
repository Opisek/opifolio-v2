import { getPost } from '$lib/server/db.js';
import { PLAUSIBLE_API_KEY, PLAUSIBLE_API_URL, PLAUSIBLE_DATE_START } from "$env/static/private";
import { PUBLIC_PLAUSIBLE_DOMAIN } from '$env/static/public';

export async function GET({ params }) {
  const post = getPost(params.id);

  if (post != null) {
    const response = await fetch(
      `${PLAUSIBLE_API_URL}/stats/aggregate?site_id=${PUBLIC_PLAUSIBLE_DOMAIN}&period=custom&date=1970-01-01,2999-01-01&metrics=visitors&filters=event:page==/blog/${post.id}`,
      { headers: { Authorization: `Bearer ${PLAUSIBLE_API_KEY}` } }
    );
    const json = await response.json();
    const views = json.results.visitors.value;
    post.views = views || 1;
  }

  return new Response(JSON.stringify(post));
}