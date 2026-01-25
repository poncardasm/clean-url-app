<script lang="ts">
  import { cleanUrl } from '$lib/clean-url';
  import Button from '$lib/components/ui/Button.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';

  let inputUrl = $state('');
  let cleanedUrl = $state('');
  let buttonText = $state('Clean URL');
  let showCopiedMessage = $state(false);

  async function handleClean() {
    if (inputUrl.trim()) {
      const cleaned = cleanUrl(inputUrl.trim());
      cleanedUrl = cleaned;

      // Copy to clipboard immediately after cleaning
      try {
        await navigator.clipboard.writeText(cleaned);
        buttonText = 'Copied to clipboard!';
        showCopiedMessage = true;

        // Reset button text after 3 seconds
        setTimeout(() => {
          buttonText = 'Clean URL';
          showCopiedMessage = false;
        }, 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
        // If copy fails, just show the cleaned URL without copy feedback
      }
    }
  }

  function handleClear() {
    inputUrl = '';
    cleanedUrl = '';
    buttonText = 'Clean URL';
    showCopiedMessage = false;
  }

  async function handleCopy() {
    if (cleanedUrl) {
      try {
        await navigator.clipboard.writeText(cleanedUrl);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
</script>

<div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
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
        class="h-[120px] max-h-[120px] resize-none text-lg overflow-y-auto"
      />

      <div class="flex flex-col sm:flex-row gap-4">
        <Button
          onclick={handleClean}
          class="w-full sm:flex-1 h-12 text-lg"
          disabled={!inputUrl.trim()}
        >
          {#snippet children()}
            {buttonText}
          {/snippet}
        </Button>
        <Button
          onclick={handleClear}
          variant="outline"
          class="w-full sm:flex-1 h-12 text-lg"
        >
          {#snippet children()}
            Clear
          {/snippet}
        </Button>
      </div>

      {#if showCopiedMessage}
        <div class="text-center text-sm text-green-600 font-medium">
          ✓ URL copied to clipboard!
        </div>
      {/if}
    </div>

    <!-- Output section -->
    <div class="space-y-4">
      <h3 class="font-semibold text-foreground">Clean URL</h3>
      <div class="relative">
        <Textarea
          bind:value={cleanedUrl}
          readonly
          class="min-h-[120px] resize-none bg-muted text-lg"
          placeholder="Your cleaned URL will appear here..."
        />
        {#if cleanedUrl}
          <Button
            onclick={handleCopy}
            variant="secondary"
            class="absolute bottom-3 right-3 h-10 px-6 text-base sm:w-auto w-full sm:max-w-none max-w-[calc(100%-1.5rem)]"
          >
            {#snippet children()}
              Copy
            {/snippet}
          </Button>
        {/if}
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm text-muted-foreground">
      <p>
        By <span class="font-medium">Mchael Poncardas</span> | Source code{' '}
        <span class="font-medium">GitHub</span>
      </p>
    </div>
  </div>
</div>