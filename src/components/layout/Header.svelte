<script lang="ts">
  interface Props { pageTitle: string; }
  let { pageTitle }: Props = $props();
</script>

<header class="sticky top-0 z-20 flex min-h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-8">
  <div>
    <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
      <span>Assignment 4</span><span class="text-slate-300">/</span><span class="text-slate-400">Workspace</span>
    </div>
    <h1 class="mt-1 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{pageTitle}</h1>
  </div>
  <div class="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2">
    <span class="relative flex h-2 w-2">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
    </span>
    <span class="text-xs font-semibold text-emerald-800">BFF connected</span>
  </div>
</header>
