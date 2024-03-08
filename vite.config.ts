import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools({
			defaultDirectives: () => {
				return new URLSearchParams({
					w: "500",
					h: "500",
					format: "webp",
					quality: "70"
				});
			}
		})
	],
	server: {
		port: 8080
	}
});
