<script lang="ts">
  import { onMount } from 'svelte';
  import { getProduct, getProducts, type Product } from '../../lib/api';

  let products = $state<Product[]>([]);
  let selectedProduct = $state<Product | null>(null);
  let searchTerm = $state('');
  let loading = $state(true);
  let detailsLoading = $state(false);
  let errorMessage = $state('');
  let detailsError = $state('');

  let filteredProducts = $derived(
    products.filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  );

  async function loadProducts() {
    loading = true;
    errorMessage = '';
    try {
      products = await getProducts();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load products.';
    } finally {
      loading = false;
    }
  }

  async function showProduct(productId: number) {
    detailsLoading = true;
    detailsError = '';
    selectedProduct = null;
    try {
      selectedProduct = await getProduct(productId);
    } catch (error) {
      detailsError = error instanceof Error ? error.message : 'Unable to load product details.';
    } finally {
      detailsLoading = false;
    }
  }

  function formatPrice(product: Product) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: product.currency
    }).format(product.price);
  }

  onMount(() => {
    void loadProducts();
  });
</script>

<div class="space-y-8">
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-indigo-600">Product management</p>
        <h2 class="mt-1 text-xl font-bold text-slate-900">Product catalogue</h2>
        <p class="mt-2 text-sm text-slate-600">Browse products and inspect their details.</p>
      </div>
      <button type="button" onclick={loadProducts} disabled={loading}
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Refreshing…' : 'Refresh'}
      </button>
    </div>

    <label class="mt-6 block">
      <span class="mb-1.5 block text-sm font-medium text-slate-700">Search products</span>
      <input bind:value={searchTerm} type="search" placeholder="Search by product name or description"
        class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
    </label>
  </section>

  {#if errorMessage}
    <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
  {/if}

  {#if loading}
    <p class="py-10 text-center text-sm text-slate-500">Loading products…</p>
  {:else if products.length === 0}
    <p class="rounded-xl bg-white px-4 py-10 text-center text-sm text-slate-500">No products found.</p>
  {:else if filteredProducts.length === 0}
    <p class="rounded-xl bg-white px-4 py-10 text-center text-sm text-slate-500">No products match your search.</p>
  {:else}
    <section>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-900">Available products</h2>
        <span class="text-sm text-slate-500">{filteredProducts.length} of {products.length} products</span>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each filteredProducts as product (product.id)}
          <article class="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Product #{product.id}</p>
                <h3 class="mt-2 text-base font-bold text-slate-900">{product.name}</h3>
              </div>
              <span class:low-stock={product.stockQuantity > 0 && product.stockQuantity <= 5}
                class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </span>
            </div>
            <p class="mt-3 min-h-12 text-sm leading-6 text-slate-600">
              {product.description || 'No description available.'}
            </p>
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span class="text-lg font-bold text-slate-900">{formatPrice(product)}</span>
              <button type="button" onclick={() => showProduct(product.id)}
                class="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                View details
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>
  {/if}

  {#if detailsLoading}
    <p class="text-center text-sm text-slate-500">Loading product details…</p>
  {/if}
  {#if detailsError}
    <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{detailsError}</div>
  {/if}

  {#if selectedProduct}
    <section class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Product details · #{selectedProduct.id}</p>
          <h2 class="mt-1 text-xl font-bold text-slate-900">{selectedProduct.name}</h2>
        </div>
        <button type="button" onclick={() => selectedProduct = null} aria-label="Close product details"
          class="rounded-lg px-2 py-1 text-slate-500 hover:bg-white">✕</button>
      </div>
      <p class="mt-4 text-sm leading-6 text-slate-700">{selectedProduct.description || 'No description available.'}</p>
      <dl class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt class="text-xs text-slate-500">Price</dt>
          <dd class="mt-1 text-sm font-semibold text-slate-900">{formatPrice(selectedProduct)}</dd>
        </div>
        <div>
          <dt class="text-xs text-slate-500">Stock quantity</dt>
          <dd class="mt-1 text-sm font-semibold text-slate-900">{selectedProduct.stockQuantity}</dd>
        </div>
        <div>
          <dt class="text-xs text-slate-500">Created</dt>
          <dd class="mt-1 text-sm font-semibold text-slate-900">{new Date(selectedProduct.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt class="text-xs text-slate-500">Last updated</dt>
          <dd class="mt-1 text-sm font-semibold text-slate-900">{new Date(selectedProduct.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>
    </section>
  {/if}
</div>

<style>
  .low-stock {
    background: #fff7ed;
    color: #c2410c;
  }
</style>
