import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import fs from "node:fs/promises";

export const load: PageServerLoad = async ({ params }) => {
	const parts = params.redirect.split("/");
	const firstPart = parts.shift();

	let redirects;
	try {
		redirects = await fs.readFile("/app/config/redirects.json").then(content => JSON.parse(content));
	} catch (_) {
		error(404, 'Not found');
	}

	for (const entry of redirects)
		for (const match of entry.pages)
			if (firstPart === match)
				throw redirect(entry.code, `${entry.url}/${parts.join("/")}`);

	error(404, 'Not found');
};