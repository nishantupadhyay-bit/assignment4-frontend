<script lang="ts">
  import AppLayout from './components/layout/AppLayout.svelte';
  import PageContainer from './components/common/PageContainer.svelte';
  import UserManagement from './components/users/UserManagement.svelte';
  import ProductCatalogue from './components/products/ProductCatalogue.svelte';
  import OrderManagement from './components/orders/OrderManagement.svelte';

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083';

  const sections = [
    { title: 'Users', description: 'Register users and explore the user directory.', marker: 'U', detail: 'Identity management' },
    { title: 'Products', description: 'Create products, browse the catalogue and manage stock.', marker: 'P', detail: 'Product catalogue' },
    { title: 'Orders', description: 'Place orders and inspect their processing status.', marker: 'O', detail: 'Order processing' }
  ];
</script>

<svelte:head>
  <title>Assignment 4 | Dashboard</title>
  <meta name="description" content="Frontend dashboard for the Assignment 4 microservices application." />
</svelte:head>

<AppLayout>
  {#snippet children(activePage)}
    <PageContainer>
      {#if activePage === 'Dashboard'}
        <section class="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 px-6 py-9 shadow-xl shadow-indigo-950/10 sm:px-9 sm:py-11">
          <div class="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"></div>
          <div class="absolute -bottom-32 right-1/3 -z-10 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl"></div>
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Microservices workspace
            </div>
            <h2 class="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything in one place.</h2>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-indigo-100/80 sm:text-base">
              Manage users, maintain your product catalogue and process orders through a single workspace. All frontend requests flow through the BFF REST API.
            </p>
          </div>
          <div class="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-indigo-100/80">
            <span class="rounded-lg border border-white/15 bg-white/10 px-3 py-2">Svelte + TypeScript</span>
            <span class="rounded-lg border border-white/15 bg-white/10 px-3 py-2">BFF REST integration</span>
            <span class="rounded-lg border border-white/15 bg-white/10 px-3 py-2">Responsive workspace</span>
          </div>
        </section>

        <section class="mt-9">
          <div class="mb-5">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Workspace</p>
            <h2 class="mt-1.5 text-xl font-bold tracking-tight text-slate-950">Your application areas</h2>
            <p class="mt-1.5 text-sm text-slate-500">Core workflows available in this application.</p>
          </div>
          <div class="grid gap-4 lg:grid-cols-3">
            {#each sections as section}
              <article class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60 sm:p-6">
                <div class="flex items-center justify-between">
                  <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-extrabold text-indigo-700">{section.marker}</div>
                  <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Available</span>
                </div>
                <h3 class="mt-5 text-base font-bold text-slate-900">{section.title}</h3>
                <p class="mt-2 min-h-12 text-sm leading-6 text-slate-500">{section.description}</p>
                <div class="mt-5 border-t border-slate-100 pt-4">
                  <span class="text-xs font-semibold text-indigo-600">{section.detail}</span>
                </div>
              </article>
            {/each}
          </div>
        </section>

        <section class="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Integration</p>
              <h2 class="mt-1 text-base font-bold text-slate-900">Backend for Frontend endpoint</h2>
              <p class="mt-1 text-sm text-slate-500">The frontend uses this base URL for its REST requests.</p>
            </div>
            <span class="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Configured
            </span>
          </div>
          <code class="mt-4 block overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 text-xs text-emerald-300">{apiBaseUrl}</code>
        </section>
      {:else if activePage === 'Users'}
        <UserManagement />
      {:else if activePage === 'Products'}
        <ProductCatalogue />
      {:else if activePage === 'Orders'}
        <OrderManagement />
      {/if}
    </PageContainer>
  {/snippet}
</AppLayout>
