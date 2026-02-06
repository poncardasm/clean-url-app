<script lang="ts">
  import { cleanUrl } from '$lib/clean-url';
  import Button from '$lib/components/ui/Button.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let inputUrl = $state('');
  let copied = $state(false);
  let copyResetTimeout: ReturnType<typeof setTimeout> | null = null;
  let cleanedUrl = $derived(
    inputUrl.trim() ? cleanUrl(inputUrl.trim()) : ''
  );

  function resetCopyState() {
    if (copyResetTimeout) {
      clearTimeout(copyResetTimeout);
      copyResetTimeout = null;
    }
    copied = false;
  }

  async function handleCopy() {
    if (cleanedUrl) {
      try {
        await navigator.clipboard.writeText(cleanedUrl);
        copied = true;
        if (copyResetTimeout) {
          clearTimeout(copyResetTimeout);
        }
        copyResetTimeout = setTimeout(() => {
          copied = false;
          copyResetTimeout = null;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
</script>

<div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
  <!-- Theme toggle in top right -->
  <div class="absolute top-4 right-4">
    <ThemeToggle />
  </div>

  <div class="w-full max-w-2xl mx-auto space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-foreground">Clean URL</h1>
      <p class="text-muted-foreground">
        Remove tracking parameters and unnecessary parts from your URLs
      </p>
    </div>

    <!-- Input section -->
    <div class="space-y-4">
      <Textarea
        placeholder="Paste URL here..."
        bind:value={inputUrl}
        oninput={resetCopyState}
        class="h-30 max-h-30 resize-none text-lg overflow-y-auto"
      />
      <div class="text-center text-sm text-muted-foreground">
        Cleans automatically when you paste or edit.
      </div>
    </div>

    <!-- Output section -->
    <div class="space-y-4">
      <h3 class="font-semibold text-foreground">Clean URL</h3>
      <div class="relative">
        <Textarea
          value={cleanedUrl}
          readonly
          class="min-h-30 resize-none bg-muted text-lg"
          placeholder="Your cleaned URL will appear here..."
        />
        {#if cleanedUrl}
          <Button
            onclick={handleCopy}
            variant="secondary"
            class="absolute bottom-3 right-3 h-auto px-0 py-0 text-base leading-none"
            aria-label={copied ? 'Copied cleaned URL' : 'Copy cleaned URL'}
          >
            <span class="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3 py-2 leading-none">
              <img
                src={copied ? '/icons/check.svg' : '/icons/copy.svg'}
                alt=""
                class="h-5 w-5"
              />
              <span class="text-sm font-medium">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </span>
          </Button>
        {/if}
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm text-muted-foreground">
      <p>
        By <span class="font-medium">Mchael Poncardas</span> | Source code on
        <a
          class="font-medium underline-offset-4 hover:underline"
          href="https://github.com/poncardasm/clean-url-app"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </p>
    </div>
  </div>
</div>
