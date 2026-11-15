<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-9">
  {@render children()}
</div>
