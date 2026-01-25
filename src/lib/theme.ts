import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'system';

function createThemeStore() {
	// Use writable stores for SSR compatibility
	const theme: Writable<Theme> = writable<Theme>(DEFAULT_THEME);
	const resolvedTheme: Writable<'light' | 'dark'> = writable<'light' | 'dark'>('light');

	// Initialize only in browser
	if (browser) {
		// Load theme from localStorage on initialization
		const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme;
		if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
			theme.set(storedTheme);
		}

		// Subscribe to theme changes to update resolved theme
		theme.subscribe((value) => {
			updateResolvedTheme(value);
		});

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			theme.update((t) => {
				if (t === 'system') {
					updateResolvedTheme(t);
				}
				return t;
			});
		});
	}

	function setTheme(newTheme: Theme) {
		theme.set(newTheme);
		if (browser) {
			localStorage.setItem(STORAGE_KEY, newTheme);
		}
	}

	function updateResolvedTheme(currentTheme: Theme) {
		if (!browser) return;

		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		let systemTheme: 'light' | 'dark' = 'light';

		if (currentTheme === 'system') {
			systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		} else {
			systemTheme = currentTheme;
		}

		resolvedTheme.set(systemTheme);
		root.classList.add(systemTheme);
	}

	return {
		theme,
		resolvedTheme,
		setTheme
	};
}

export const themeStore = createThemeStore();

