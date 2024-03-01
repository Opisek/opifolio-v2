import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import sanitizeHtml from "sanitize-html";

import fs from "node:fs/promises";

export const load: PageServerLoad = async ({ params }) => {
	const postID = params.post;

	let postMarkdown;
	let postJson;
	try {
		postJson = await fs.readFile(`/app/posts/${postID}.json`, "utf-8").then(content => JSON.parse(content));
		postMarkdown = sanitizeHtml(await fs.readFile(`/app/posts/${postID}.md`, "utf-8"), { disallowedTagsMode: "recursiveEscape" });
		postJson.markdown = postMarkdown;
		postJson.timestamp = new Date(postJson.timestamp * 1000);
	} catch (_) {
		error(404, 'Not found');
	}

	return {
		post: postJson
	}
};