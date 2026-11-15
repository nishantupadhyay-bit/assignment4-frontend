<script lang="ts">
  import AppLayout from './components/layout/AppLayout.svelte';
  import PageContainer from './components/common/PageContainer.svelte';
  import UserManagement from './components/users/UserManagement.svelte';

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083';

  const sections = [
    { title: 'Users', description: 'Register users and view the user directory.', marker: 'U', status: 'Coming in Phase 3' },
    { title: 'Products', description: 'Browse the product catalogue and view product details.', marker: 'P', status: 'Coming in Phase 4' },
    { title: 'Orders', description: 'Create orders and review order information.', marker: 'O', status: 'Coming in Phase 5' }
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
        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold text-indigo-600">Welcome</p>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Your microservices workspace</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Manage users, explore products and process orders from one place. The frontend communicates only with the BFF REST API.
          </p>
          <div class="mt-7 rounded-xl bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Configured BFF base URL</p>
            <code class="mt-2 block break-all text-sm text-slate-800">{apiBaseUrl}</code>
          </div>
        </section>

        <section class="mt-8">
          <div class="mb-4">
            <h2 class="text-lg font-bold text-slate-900">Application areas</h2>
            <p class="mt-1 text-sm text-slate-500">The main workflows planned for this application.</p>
          </div>
          <div class="grid gap-4 lg:grid-cols-3">
            {#each sections as section}
              <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{section.marker}</div>
                <h3 class="mt-4 font-semibold text-slate-900">{section.title}</h3>
                <p class="mt-2 min-h-12 text-sm leading-6 text-slate-600">{section.description}</p>
                <p class="mt-4 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">{section.status}</p>
              </article>
            {/each}
          </div>
        </section>
      {:else if activePage === 'Users'}
        <UserManagement />
      {:else}
        <section class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p class="text-sm font-semibold text-indigo-600">{activePage}</p>
          <h2 class="mt-2 text-xl font-bold text-slate-900">{activePage} workspace</h2>
          <p class="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
            The shared navigation is ready. The {activePage.toLowerCase()} workflow will be implemented in its planned phase.
          </p>
        </section>
      {/if}
    </PageContainer>
  {/snippet}
</AppLayout>
