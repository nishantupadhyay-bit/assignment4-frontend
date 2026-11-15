<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createOrder,
    getOrder,
    getOrders,
    getProducts,
    getUsers,
    type Order,
    type Product,
    type User
  } from '../../lib/api';

  let orders = $state<Order[]>([]);
  let users = $state<User[]>([]);
  let products = $state<Product[]>([]);
  let selectedOrder = $state<Order | null>(null);
  let userId = $state('');
  let productId = $state('');
  let quantity = $state(1);
  let loading = $state(true);
  let submitting = $state(false);
  let detailsLoading = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  let detailsError = $state('');

  async function loadOrders() {
    loading = true;
    errorMessage = '';
    try {
      orders = await getOrders();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load orders.';
    } finally {
      loading = false;
    }
  }

  async function loadFormOptions() {
    try {
      const [loadedUsers, loadedProducts] = await Promise.all([getUsers(), getProducts()]);
      users = loadedUsers;
      products = loadedProducts;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load users and products.';
    }
  }

  async function handleCreateOrder(event: SubmitEvent) {
    event.preventDefault();
    submitting = true;
    errorMessage = '';
    successMessage = '';

    try {
      const createdOrder = await createOrder({
        userId: Number(userId),
        productId: Number(productId),
        quantity: Number(quantity)
      });
      selectedOrder = createdOrder;
      successMessage = 'Your order has been placed successfully.';
      await loadOrders();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to create order.';
    } finally {
      submitting = false;
    }
  }

  async function showOrder(orderId: number) {
    detailsLoading = true;
    detailsError = '';
    selectedOrder = null;
    try {
      selectedOrder = await getOrder(orderId);
    } catch (error) {
      detailsError = error instanceof Error ? error.message : 'Unable to load order details.';
    } finally {
      detailsLoading = false;
    }
  }

  function formatDate(value: string) {
    return value ? new Date(value).toLocaleString() : '—';
  }

  onMount(() => {
    void loadOrders();
    void loadFormOptions();
  });
</script>

<div class="space-y-8">
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div>
      <p class="text-sm font-semibold text-indigo-600">Order management</p>
      <h2 class="mt-1 text-xl font-bold text-slate-900">Create an order</h2>
      <p class="mt-2 text-sm text-slate-600">Choose a user, product and quantity to place an order.</p>
    </div>

    <form onsubmit={handleCreateOrder} class="mt-6 grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">User</span>
        <select bind:value={userId} required
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
          <option value="" disabled>Select a user</option>
          {#each users as user (user.id)}
            <option value={String(user.id)}>{user.fullName}</option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Product</span>
        <select bind:value={productId} required
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
          <option value="" disabled>Select a product</option>
          {#each products as product (product.id)}
            <option value={String(product.id)} disabled={product.stockQuantity <= 0}>
              {product.name} · {product.stockQuantity} available
            </option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Quantity</span>
        <input bind:value={quantity} type="number" min="1" step="1" required
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <div class="md:col-span-3">
        <button type="submit" disabled={submitting || users.length === 0 || products.length === 0}
          class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Creating order…' : 'Create order'}
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
        <h2 class="text-xl font-bold text-slate-900">Order directory</h2>
        <p class="mt-1 text-sm text-slate-600">View orders created in the system.</p>
      </div>
      <button type="button" onclick={loadOrders} disabled={loading}
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">
        {loading ? 'Refreshing…' : 'Refresh'}
      </button>
    </div>

    {#if loading}
      <p class="py-8 text-center text-sm text-slate-500">Loading orders…</p>
    {:else if orders.length === 0}
      <p class="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No orders found.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px] text-left text-sm">
          <thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-3 py-3 font-semibold">Order ID</th>
              <th class="px-3 py-3 font-semibold">Customer</th>
              <th class="px-3 py-3 font-semibold">Product</th>
              <th class="px-3 py-3 font-semibold">Quantity</th>
              <th class="px-3 py-3 font-semibold">Status</th>
              <th class="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each orders as order (order.id)}
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-3 font-medium text-slate-900">#{order.id}</td>
                <td class="px-3 py-3 text-slate-600">{users.find((user) => user.id === order.userId)?.fullName ?? 'Customer'}</td>
                <td class="px-3 py-3 text-slate-600">{products.find((product) => product.id === order.productId)?.name ?? 'Product'}</td>
                <td class="px-3 py-3 text-slate-600">{order.quantity}</td>
                <td class="px-3 py-3">
                  <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{order.status}</span>
                </td>
                <td class="px-3 py-3 text-right">
                  <button type="button" onclick={() => showOrder(order.id)}
                    class="font-semibold text-indigo-600 hover:text-indigo-800">Details</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  {#if detailsLoading}
    <p class="text-center text-sm text-slate-500">Loading order details…</p>
  {/if}
  {#if detailsError}
    <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{detailsError}</div>
  {/if}
  {#if selectedOrder}
    <section class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Order summary</p>
          <h2 class="mt-1 text-xl font-bold text-slate-900">Order details</h2>
        </div>
        <button type="button" onclick={() => selectedOrder = null} aria-label="Close order details"
          class="rounded-lg px-2 py-1 text-slate-500 hover:bg-white">✕</button>
      </div>
      <dl class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div><dt class="text-xs text-slate-500">User ID</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{users.find((user) => user.id === selectedOrder?.userId)?.fullName ?? 'Customer details unavailable'}</dd></div>
        <div><dt class="text-xs text-slate-500">Product ID</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{products.find((product) => product.id === selectedOrder?.productId)?.name ?? 'Product details unavailable'}</dd></div>
        <div><dt class="text-xs text-slate-500">Quantity</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{selectedOrder.quantity}</dd></div>
        <div><dt class="text-xs text-slate-500">Status</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{selectedOrder.status}</dd></div>
        <div><dt class="text-xs text-slate-500">Created</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{formatDate(selectedOrder.createdAt)}</dd></div>
        <div><dt class="text-xs text-slate-500">Last updated</dt><dd class="mt-1 text-sm font-semibold text-slate-900">{formatDate(selectedOrder.updatedAt)}</dd></div>
      </dl>
    </section>
  {/if}
</div>
