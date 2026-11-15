<script lang="ts">
  import type { Snippet } from 'svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';

  type Page = 'Dashboard' | 'Users' | 'Products' | 'Orders';

  interface Props {
    children: Snippet<[Page]>;
  }

  let { children }: Props = $props();
  let activePage = $state<Page>('Dashboard');

  function navigateTo(page: Page) {
    activePage = page;
  }
</script>

<div class="min-h-screen bg-slate-50 md:grid md:grid-cols-[250px_minmax(0,1fr)]">
  <div class="md:sticky md:top-0 md:h-screen">
    <Sidebar activePage={activePage} onNavigate={navigateTo} />
  </div>

  <div class="flex min-h-screen min-w-0 flex-col">
    <Header pageTitle={activePage === 'Dashboard' ? 'Microservices Dashboard' : activePage} />
    <main class="flex-1">
      {@render children(activePage)}
    </main>
    <footer class="border-t border-slate-200 bg-white px-5 py-4 text-center text-xs text-slate-500 sm:px-8">
      Assignment 4 · Svelte frontend · Connected through BFF REST API
    </footer>
  </div>
</div>
