<script lang="ts">
  import AppLayout from './components/layout/AppLayout.svelte';
  import PageContainer from './components/common/PageContainer.svelte';
  import UserManagement from './components/users/UserManagement.svelte';
  import ProductCatalogue from './components/products/ProductCatalogue.svelte';
  import OrderManagement from './components/orders/OrderManagement.svelte';

  const collections = [
    { title: 'Customers', description: 'Manage your customer community.', marker: '01', tone: 'from-violet-500 to-indigo-600' },
    { title: 'Shop catalogue', description: 'Explore products and keep inventory up to date.', marker: '02', tone: 'from-fuchsia-500 to-rose-500' },
    { title: 'Orders', description: 'Follow purchases and keep every order moving.', marker: '03', tone: 'from-amber-500 to-orange-500' }
  ];
</script>

<svelte:head>
  <title>Everyday Store | Shop & Manage</title>
  <meta name="description" content="A modern storefront and commerce management experience." />
</svelte:head>

<AppLayout>
  {#snippet children(activePage)}
    <PageContainer>
      {#if activePage === 'Dashboard'}
        <section class="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-900 px-6 py-10 shadow-xl shadow-violet-900/15 sm:px-10 sm:py-14">
          <div class="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl"></div>
          <div class="absolute -bottom-32 right-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>
          <div class="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="max-w-2xl">
              <span class="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">THE EVERYDAY EDIT · NEW SEASON</span>
              <h2 class="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">Good finds.<br />Great days.</h2>
              <p class="mt-4 max-w-lg text-sm leading-7 text-violet-100 sm:text-base">Explore your catalogue, discover products and make every order feel effortless.</p>
              <div class="mt-7 flex flex-wrap gap-3">
                <span class="rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-800 shadow-lg">Discover the collection</span>
                <span class="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white">Simple. Smooth. Convenient.</span>
              </div>
            </div>
            <div class="relative mx-auto flex aspect-square w-full max-w-[290px] items-center justify-center">
              <div class="absolute inset-5 rotate-6 rounded-[2.5rem] bg-white/10"></div>
              <div class="relative flex h-56 w-56 -rotate-6 flex-col items-center justify-center rounded-[2.5rem] border border-white/25 bg-white/15 text-center shadow-2xl backdrop-blur">
                <span class="text-6xl">✦</span><span class="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80">Curated for you</span><span class="mt-1 text-2xl font-black text-white">Shop happy</span>
              </div>
              <span class="absolute right-0 top-8 rounded-full bg-amber-300 px-4 py-2 text-xs font-black text-amber-950 shadow-lg">FRESH PICKS</span>
              <span class="absolute bottom-8 left-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-violet-800 shadow-lg">MADE SIMPLE</span>
            </div>
          </div>
        </section>

        <section class="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3 sm:p-5">
          <div class="flex items-center gap-3 px-2 py-2"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg">✦</span><div><p class="text-sm font-bold text-slate-900">Curated catalogue</p><p class="text-xs text-slate-500">Products in one place</p></div></div>
          <div class="flex items-center gap-3 border-slate-100 px-2 py-2 sm:border-x sm:px-5"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">✓</span><div><p class="text-sm font-bold text-slate-900">Easy checkout</p><p class="text-xs text-slate-500">A smooth order flow</p></div></div>
          <div class="flex items-center gap-3 px-2 py-2 sm:px-5"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">♡</span><div><p class="text-sm font-bold text-slate-900">Simple management</p><p class="text-xs text-slate-500">Keep things organised</p></div></div>
        </section>

        <section class="mt-10">
          <div class="mb-5"><p class="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">Made for everyday</p><h2 class="mt-1.5 text-2xl font-black tracking-tight text-slate-950">Explore your store</h2><p class="mt-1.5 text-sm text-slate-500">Everything you need to run your shopping experience.</p></div>
          <div class="grid gap-4 lg:grid-cols-3">
            {#each collections as collection}
              <article class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <div class="flex h-32 items-center justify-between bg-gradient-to-br {collection.tone} px-6"><span class="text-5xl font-black text-white/90">{collection.marker}</span><span class="text-5xl text-white/80">✦</span></div>
                <div class="p-5"><h3 class="text-lg font-bold text-slate-950">{collection.title}</h3><p class="mt-2 min-h-12 text-sm leading-6 text-slate-500">{collection.description}</p><p class="mt-4 text-xs font-bold uppercase tracking-wide text-violet-700">Explore workspace <span class="ml-1 transition group-hover:ml-2">→</span></p></div>
              </article>
            {/each}
          </div>
        </section>
        <section class="mt-8 rounded-2xl bg-slate-950 px-6 py-7 text-white sm:flex sm:items-center sm:justify-between sm:px-8">
          <div><p class="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">A better way to shop</p><h2 class="mt-2 text-xl font-bold">Your store, all in one experience.</h2><p class="mt-1 text-sm text-slate-400">Browse products, manage customers and keep orders moving.</p></div>
          <span class="mt-5 inline-flex rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white sm:mt-0">Welcome to the store</span>
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
