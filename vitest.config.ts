import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		include: ['src/**/*.{test,spec}.{js,ts}'],
		alias: {
			$lib: resolve('./src/lib'),
			$app: resolve('./node_modules/@sveltejs/kit/src/runtime/app')
		}
	},
	resolve: {
		alias: {
			$lib: resolve('./src/lib'),
			$app: resolve('./node_modules/@sveltejs/kit/src/runtime/app')
		}
	}
});
