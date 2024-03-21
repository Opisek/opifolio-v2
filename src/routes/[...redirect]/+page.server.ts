import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getRedirect } from '../../lib/server/db';

export const load: PageServerLoad = async ({ params }) => {
	const parts = params.redirect.split("/");

	const redirectData = getRedirect(parts[0]);
	if (redirectData) {
		parts[0] = redirectData.url;
		throw redirect(redirectData.code, `${parts.join("/")}`);
	}

	error(404, 'Not found');
};