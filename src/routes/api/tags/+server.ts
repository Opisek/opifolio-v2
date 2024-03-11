import { getTags } from '$lib/server/db.js';

export function GET() {
  const tags = getTags();
  return new Response(JSON.stringify(tags));
}