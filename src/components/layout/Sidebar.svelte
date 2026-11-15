<script lang="ts">
  type Page = 'Dashboard' | 'Users' | 'Products' | 'Orders';
  interface Props { activePage: Page; onNavigate: (page: Page) => void; }
  let { activePage, onNavigate }: Props = $props();
  const navigation: { label: Page; description: string; marker: string }[] = [
    { label: 'Dashboard', description: 'Overview', marker: 'D' },
    { label: 'Users', description: 'Manage users', marker: 'U' },
    { label: 'Products', description: 'Browse catalogue', marker: 'P' },
    { label: 'Orders', description: 'Manage orders', marker: 'O' }
  ];
</script>

<aside class="flex h-full flex-col border-r border-slate-200 bg-white">
  <div class="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">A4</div>
    <div>
      <p class="text-sm font-bold text-slate-900">Assignment 4</p>
      <p class="text-xs text-slate-500">Microservices platform</p>
    </div>
  </div>
  <nav aria-label="Main navigation" class="flex flex-1 gap-2 overflow-x-auto p-3 md:flex-col md:overflow-visible">
    {#each navigation as item}
      <button type="button" aria-current={activePage === item.label ? 'page' : undefined}
        onclick={() => onNavigate(item.label)}
        class:active={activePage === item.label}
        class="flex min-w-fit items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 md:w-full">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{item.marker}</span>
        <span class="min-w-0">
          <span class="block text-sm font-semibold text-slate-800">{item.label}</span>
          <span class="hidden text-xs text-slate-500 md:block">{item.description}</span>
        </span>
      </button>
    {/each}
  </nav>
  <div class="hidden border-t border-slate-100 p-4 md:block">
    <p class="text-xs leading-5 text-slate-500">Frontend communicates with backend services through the BFF REST API.</p>
  </div>
</aside>

<style>
  button.active { background: #eef2ff; }
  button.active > span:first-child { background: #e0e7ff; color: #4338ca; }
</style>
