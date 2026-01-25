<script lang="ts">
	import { themeStore, type Theme } from '$lib/theme';
	import Button from '$lib/components/ui/Button.svelte';

	const { theme, resolvedTheme, setTheme } = themeStore;

	function cycleTheme() {
		const themes: Array<Theme> = ['light', 'dark', 'system'];
		let currentTheme: Theme = 'system';
		const unsubscribe = theme.subscribe((value: Theme) => {
			currentTheme = value;
		});
		unsubscribe();

		const currentIndex = themes.indexOf(currentTheme);
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	}
</script>

<Button onclick={cycleTheme} variant="outline" size="sm">
	{#snippet children()}
		Theme: {#if $theme === 'system'}
			System ({$resolvedTheme})
		{:else}
			{$theme.charAt(0).toUpperCase() + $theme.slice(1)}
		{/if}
	{/snippet}
</Button>




