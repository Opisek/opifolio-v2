import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import fs from "node:fs";
import fsp from "node:fs/promises";

import sharp from 'sharp';

export const GET: RequestHandler = async ({ params }) => {
	const postID = params.post;
	const imageID = params.img.slice(0, -5);

	try {
    let file;
    if (!fs.existsSync(`/app/posts/${postID}/images/${imageID}.webp`)) {
      file = await sharp(`/app/posts/${postID}/images/${imageID}`)
        .webp({ quality: 70 })
        .resize(500, 500, { fit: 'inside' })
        .toBuffer();
      await fsp.writeFile(`/app/posts/${postID}/images/${imageID}.webp`, file);
    } else {
      file = await fsp.readFile(`/app/posts/${postID}/images/${imageID}.webp`);
    }
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