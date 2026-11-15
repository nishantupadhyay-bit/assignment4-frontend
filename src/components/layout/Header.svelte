<script lang="ts">
  interface Props { pageTitle: string; }
  let { pageTitle }: Props = $props();
</script>

<header class="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
  <div>
    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Assignment 4</p>
    <h1 class="mt-1 text-xl font-bold text-slate-900">{pageTitle}</h1>
  </div>
  <div class="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 sm:flex">
    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
    <span class="text-xs font-semibold text-emerald-700">BFF integration</span>
  </div>
</header>
