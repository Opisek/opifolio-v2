import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools({
			defaultDirectives: () => {
				return new URLSearchParams("format=webp&quality=70&width=500withoutEnlargement");
			}
		})
	],
	server: {
		port: 8080
	}
});
