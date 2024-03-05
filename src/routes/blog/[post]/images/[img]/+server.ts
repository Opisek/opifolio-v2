import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import fs from "node:fs/promises";

export const GET: RequestHandler = async ({ params }) => {
	const postID = params.post;
	const imageID = params.img;

	try {
		const file = await fs.readFile(`/app/posts/${postID}/images/${imageID}`);
    console.log(file);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": `image/${imageID.split('.').pop()}`,
        "Content-Length": file.length.toString()
      }
    });
	} catch (_) {
		error(404, 'Not found');
	}
};