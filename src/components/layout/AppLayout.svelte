<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';

  type Page = 'Dashboard' | 'Users' | 'Products' | 'Orders';

  interface Props {
    children: Snippet<[Page]>;
  }

  let { children }: Props = $props();
  let activePage = $state<Page>('Dashboard');
  let isDark = $state(false);

  function navigateTo(page: Page) {
    activePage = page;
  }

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('assignment4-theme', isDark ? 'dark' : 'light');
  }

  onMount(() => {
    isDark = localStorage.getItem('assignment4-theme') === 'dark';
  });
</script>

<div class:dark={isDark} class="app-shell min-h-screen bg-slate-50 md:grid md:grid-cols-[260px_minmax(0,1fr)]">
  <div class="z-30 md:sticky md:top-0 md:h-screen">
    <Sidebar activePage={activePage} onNavigate={navigateTo} />
  </div>

  <div class="flex min-h-screen min-w-0 flex-col">
    <Header pageTitle={activePage === 'Dashboard' ? 'Overview' : activePage} {isDark} onToggleTheme={toggleTheme} />
    <main class="min-w-0 flex-1">
      {@render children(activePage)}
    </main>
    <footer class="border-t border-slate-200/80 bg-white px-5 py-4 text-center text-xs text-slate-400 sm:px-8">
      <span class="font-semibold text-slate-500">Assignment 4</span> <span class="mx-1.5">·</span> Svelte frontend <span class="mx-1.5">·</span> Powered by the BFF REST API
    </footer>
  </div>
</div>

<style>
  .app-shell { min-height: 100vh; }
  :global(.app-shell.dark) { color-scheme: dark; background: #0b1020; color: #e2e8f0; }
  :global(.app-shell.dark .bg-white) { background-color: #151d31 !important; }
  :global(.app-shell.dark .bg-slate-50),
  :global(.app-shell.dark .bg-slate-100) { background-color: #10182a !important; }
  :global(.app-shell.dark .bg-slate-950) { background-color: #070b15 !important; }
  :global(.app-shell.dark .text-slate-950),
  :global(.app-shell.dark .text-slate-900),
  :global(.app-shell.dark .text-slate-700) { color: #e5eaf5 !important; }
  :global(.app-shell.dark .text-slate-600),
  :global(.app-shell.dark .text-slate-500) { color: #a8b3c7 !important; }
  :global(.app-shell.dark .text-slate-400) { color: #8491a8 !important; }
  :global(.app-shell.dark .border-slate-100),
  :global(.app-shell.dark .border-slate-200),
  :global(.app-shell.dark .border-slate-200\/80),
  :global(.app-shell.dark .border-slate-300) { border-color: #2a3650 !important; }
  :global(.app-shell.dark .divide-slate-100 > :not([hidden]) ~ :not([hidden])) { border-color: #2a3650 !important; }
  :global(.app-shell.dark input),
  :global(.app-shell.dark select) { background-color: #10182a; color: #e5eaf5; border-color: #394761; }
  :global(.app-shell.dark input::placeholder) { color: #8491a8; }
  :global(.app-shell.dark .hover\:bg-slate-50:hover),
  :global(.app-shell.dark .hover\:bg-slate-100:hover) { background-color: #202b42 !important; }
  :global(.app-shell.dark .bg-indigo-50),
  :global(.app-shell.dark .bg-violet-50),
  :global(.app-shell.dark .bg-fuchsia-50),
  :global(.app-shell.dark .bg-amber-50),
  :global(.app-shell.dark .bg-emerald-50) { filter: brightness(.78) saturate(.9); }
  :global(.app-shell.dark .bg-indigo-50\/50),
  :global(.app-shell.dark .bg-violet-50\/50) { background-color: #18213a !important; }
  :global(.app-shell.dark .bg-gradient-to-br.from-violet-50) { background-color: #18213a; }
</style>