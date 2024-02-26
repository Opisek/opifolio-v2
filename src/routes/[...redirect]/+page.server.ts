import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import redirects from "../../config/redirects.json";

export const load: PageServerLoad = ({ params }) => {
	const parts = params.redirect.split("/");
	const firstPart = parts.shift();

	for (const entry of redirects)
		for (const match of entry.pages)
			if (firstPart === match)
				throw redirect(entry.code, `${entry.url}/${parts.join("/")}`);

	error(404, 'Not found');
};