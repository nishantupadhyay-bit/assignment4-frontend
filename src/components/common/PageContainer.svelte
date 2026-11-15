<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="mx-auto w-full max-w-7xl p-5 sm:p-8 lg:p-10">
  {@render children()}
</div>
