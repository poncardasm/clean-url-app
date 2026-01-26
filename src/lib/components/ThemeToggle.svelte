<script lang="ts">
	import { themeStore, type Theme } from '$lib/theme';
	import Button from '$lib/components/ui/Button.svelte';

	const { theme, resolvedTheme, setTheme } = themeStore;

	function cycleTheme() {
		const themes: Array<Theme> = ['light', 'dark'];
		let currentTheme: Theme = 'light';
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
		{#if $resolvedTheme === 'dark'}
			<img src="/icons/dark.svg" alt="Dark mode" class="h-4 w-4" />
			<span class="sr-only">Dark mode</span>
		{:else}
			<img src="/icons/light.svg" alt="Light mode" class="h-4 w-4" />
			<span class="sr-only">Light mode</span>
		{/if}
	{/snippet}
</Button>
