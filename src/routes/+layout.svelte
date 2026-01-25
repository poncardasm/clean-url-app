<script lang="ts">
	import '../app.css';
	import { siteConfig } from '$lib/site-config';
	let { children } = $props();
</script>

<svelte:head>
	<title>{siteConfig.name} - {siteConfig.description}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords.join(', ')} />
	
	<!-- Open Graph -->
	<meta property="og:type" content={siteConfig.openGraph.type} />
	<meta property="og:locale" content={siteConfig.openGraph.locale} />
	<meta property="og:site_name" content={siteConfig.openGraph.siteName} />
	<meta property="og:title" content={siteConfig.name} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:url" content={siteConfig.url} />
	
	<!-- Twitter -->
	<meta name="twitter:card" content={siteConfig.twitter.card} />
	<meta name="twitter:creator" content={siteConfig.twitter.creator} />
	<meta name="twitter:title" content={siteConfig.name} />
	<meta name="twitter:description" content={siteConfig.description} />
	
	<!-- Icons -->
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

{@render children()}
