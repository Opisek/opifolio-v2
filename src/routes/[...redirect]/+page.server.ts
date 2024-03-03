import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import fs from "node:fs/promises";

export const load: PageServerLoad = async ({ params }) => {
	const parts = params.redirect.split("/");

	let redirects;
	try {
		redirects = await fs.readFile("/app/config/redirects.json", "utf-8").then(content => JSON.parse(content));
	} catch (_) {
		error(404, 'Not found');
	}

	for (const entry of redirects) {
		for (const match of entry.pages) {
			if (parts[0] === match) {
				parts[0] = entry.url;
				throw redirect(entry.code, `${parts.join("/")}`);
			}
		}
	}

	error(404, 'Not found');
};