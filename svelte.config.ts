import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const config: import('@sveltejs/kit').Config = {
	preprocess: preprocess({}),
	kit: {
		adapter: adapter()
	}
};

export default config;
