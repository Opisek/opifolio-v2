import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { sveltekit } from "@sveltejs/kit/vite";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./src/lib/common/values";

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools({
			defaultDirectives: () => {
				return new URLSearchParams({
					w: DEFAULT_WIDTH.toString(),
					h: DEFAULT_HEIGHT.toString(),
					format: "webp",
					quality: "70",
					withoutEnlargement: "true",
					fit: "contain",
					background: "transparent"
				});
			}
		})
	],
	server: {
		port: 8080
	}
});
