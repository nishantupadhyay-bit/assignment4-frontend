<script lang="ts">
  type Page = 'Dashboard' | 'Users' | 'Products' | 'Orders';
  interface Props { activePage: Page; onNavigate: (page: Page) => void; }
  let { activePage, onNavigate }: Props = $props();
  const navigation: { label: Page; description: string; marker: string }[] = [
    { label: 'Dashboard', description: 'Overview', marker: '⌂' },
    { label: 'Users', description: 'Manage users', marker: 'U' },
    { label: 'Products', description: 'Browse catalogue', marker: 'P' },
    { label: 'Orders', description: 'Manage orders', marker: 'O' }
  ];
</script>

<aside class="flex h-full flex-col border-r border-slate-200/80 bg-white">
  <div class="flex h-20 shrink-0 items-center gap-3 border-b border-slate-100 px-5 sm:px-6">
    <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-extrabold tracking-wide text-white shadow-lg shadow-indigo-200">A4</div>
    <div>
      <p class="text-sm font-bold tracking-tight text-slate-950">Assignment 4</p>
      <p class="mt-0.5 text-xs text-slate-500">Microservices workspace</p>
    </div>
  </div>
  <div class="px-5 pb-2 pt-7">
    <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
  </div>
  <nav aria-label="Main navigation" class="flex flex-1 gap-2 overflow-x-auto px-3 pb-4 md:flex-col md:overflow-visible">
    {#each navigation as item}
      <button type="button" aria-current={activePage === item.label ? 'page' : undefined}
        onclick={() => onNavigate(item.label)}
        class:active={activePage === item.label}
        class="group flex min-w-fit items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-all duration-150 hover:bg-slate-50 md:w-full">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500 transition group-hover:bg-white">{item.marker}</span>
        <span class="min-w-0">
          <span class="block text-sm font-semibold text-slate-700">{item.label}</span>
          <span class="hidden pt-0.5 text-xs text-slate-400 md:block">{item.description}</span>
        </span>
        {#if activePage === item.label}
          <span class="ml-auto hidden h-1.5 w-1.5 rounded-full bg-indigo-600 md:block"></span>
        {/if}
      </button>
    {/each}
  </nav>
  <div class="hidden p-4 md:block">
    <div class="rounded-2xl bg-slate-50 p-4">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
        <p class="text-xs font-semibold text-slate-700">Service gateway</p>
      </div>
      <p class="mt-2 text-xs leading-5 text-slate-500">Frontend requests are routed through the BFF REST API.</p>
    </div>
  </div>
</aside>

<style>
  button.active { background: #eef2ff; border-color: #e0e7ff; }
  button.active > span:first-child { background: #e0e7ff; color: #4338ca; }
  button.active span:nth-child(2) > span:first-child { color: #3730a3; }
</style>
