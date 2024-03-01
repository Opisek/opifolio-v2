import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import sanitizeHtml from "sanitize-html";

import fs from "node:fs/promises";

export const load: PageServerLoad = async ({ params }) => {
	const postID = params.post;

	let postMarkdown;
	let postJson;
	try {
		postMarkdown = sanitizeHtml(await fs.readFile(`/app/posts/${postID}.md`, "utf-8"), { disallowedTagsMode: "recursiveEscape" });
		postJson = await fs.readFile(`/app/posts/${postID}.json`).then(content => JSON.parse(content));
	} catch (_) {
		error(404, 'Not found');
	}

	return {
		post: {
			markdown: postMarkdown,
			json: postJson
		}
	}
};