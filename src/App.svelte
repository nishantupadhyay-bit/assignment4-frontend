<script lang="ts">
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083';
</script>

<svelte:head>
  <title>Assignment 4 | Dashboard</title>
  <meta name="description" content="Frontend dashboard for the Assignment 4 microservices application." />
</svelte:head>

<div class="min-h-screen bg-slate-50">
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Assignment 4</p>
        <h1 class="mt-1 text-2xl font-bold text-slate-900">Microservices Dashboard</h1>
      </div>
      <span class="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Frontend setup</span>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-6 py-12">
    <section class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900">Frontend foundation is ready</h2>
      <p class="mt-2 max-w-2xl text-slate-600">
        This Svelte application will use the BFF REST API. It will not connect directly to the backend gRPC services or databases.
      </p>
      <div class="mt-6 rounded-xl bg-slate-100 p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Configured BFF base URL</p>
        <code class="mt-2 block break-all text-sm text-slate-800">{apiBaseUrl}</code>
      </div>
    </section>
  </main>
</div>
