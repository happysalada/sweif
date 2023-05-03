import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import { isoImport } from 'vite-plugin-iso-import'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		isoImport(),
		nodePolyfills(),
		sentrySvelteKit(),
		sveltekit(),
		ViteImageOptimizer({})
	],
};

export default config;
