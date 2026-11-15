<script lang="ts">
  import { onMount } from 'svelte';
  import { createUser, getUser, getUsers, type User } from '../../lib/api';

  let users = $state<User[]>([]);
  let selectedUser = $state<User | null>(null);
  let fullName = $state('');
  let email = $state('');
  let loading = $state(true);
  let submitting = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');

  async function loadUsers() {
    loading = true;
    errorMessage = '';
    try {
      users = await getUsers();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load users.';
    } finally {
      loading = false;
    }
  }

  async function registerUser(event: SubmitEvent) {
    event.preventDefault();
    submitting = true;
    errorMessage = '';
    successMessage = '';

    try {
      const createdUser = await createUser({ fullName: fullName.trim(), email: email.trim() });
      await loadUsers();
      selectedUser = createdUser;
      fullName = '';
      email = '';
      successMessage = 'User registered successfully.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to register user.';
    } finally {
      submitting = false;
    }
  }

  async function showUser(userId: number) {
    errorMessage = '';
    try {
      selectedUser = await getUser(userId);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load user details.';
    }
  }

  onMount(() => {
    void loadUsers();
  });
</script>

<div class="space-y-8">
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div class="mb-6">
      <p class="text-sm font-semibold text-indigo-600">User management</p>
      <h2 class="mt-1 text-xl font-bold text-slate-900">Register a user</h2>
      <p class="mt-2 text-sm text-slate-600">Create a user through the BFF REST API.</p>
    </div>

    <form class="grid gap-4 md:grid-cols-2" onsubmit={registerUser}>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Full name</span>
        <input bind:value={fullName} required maxlength="100" autocomplete="name"
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          placeholder="Enter full name" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Email address</span>
        <input bind:value={email} required type="email" maxlength="100" autocomplete="email"
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          placeholder="name@example.com" />
      </label>
      <div class="md:col-span-2">
        <button type="submit" disabled={submitting}
          class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Registering…' : 'Register user'}
        </button>
      </div>
    </form>
  </section>

  {#if errorMessage}
    <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
  {/if}
  {#if successMessage}
    <div role="status" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div>
  {/if}

  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-bold text-slate-900">User directory</h2>
        <p class="mt-1 text-sm text-slate-600">Select a user to view their details.</p>
      </div>
      <button type="button" onclick={loadUsers} disabled={loading}
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">
        Refresh
      </button>
    </div>

    {#if loading}
      <p class="py-8 text-center text-sm text-slate-500">Loading users…</p>
    {:else if users.length === 0}
      <p class="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No users found.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full min-w-[480px] text-left text-sm">
          <thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr><th class="px-3 py-3 font-semibold">Customer</th><th class="px-3 py-3 font-semibold">Full name</th><th class="px-3 py-3 font-semibold">Email</th><th class="px-3 py-3"></th></tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each users as user (user.id)}
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">{user.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span></td>
                <td class="px-3 py-3 font-medium text-slate-900">{user.fullName}</td>
                <td class="px-3 py-3 text-slate-600">{user.email}</td>
                <td class="px-3 py-3 text-right">
                  <button type="button" onclick={() => showUser(user.id)} class="font-semibold text-indigo-600 hover:text-indigo-800">Details</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  {#if selectedUser}
    <section class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600">User details</p>
          <h2 class="mt-1 text-lg font-bold text-slate-900">{selectedUser.fullName}</h2>
        </div>
        <button type="button" onclick={() => selectedUser = null} aria-label="Close user details"
          class="rounded-lg px-2 py-1 text-slate-500 hover:bg-white">✕</button>
      </div>
      <dl class="mt-4 grid gap-4 sm:grid-cols-3">
        
        <div><dt class="text-xs text-slate-500">Full name</dt><dd class="mt-1 text-sm font-medium text-slate-900">{selectedUser.fullName}</dd></div>
        <div><dt class="text-xs text-slate-500">Email</dt><dd class="mt-1 text-sm font-medium text-slate-900">{selectedUser.email}</dd></div>
      </dl>
    </section>
  {/if}
</div>
