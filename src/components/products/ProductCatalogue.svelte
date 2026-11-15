<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createProduct,
    getProduct,
    getProducts,
    updateProductStock,
    type CreateProductRequest,
    type Product
  } from '../../lib/api';

  let products = $state<Product[]>([]);
  let selectedProduct = $state<Product | null>(null);
  let searchTerm = $state('');
  let loading = $state(true);
  let detailsLoading = $state(false);
  let errorMessage = $state('');
  let detailsError = $state('');
  let createError = $state('');
  let createSuccess = $state('');
  let creating = $state(false);
  let stockError = $state('');
  let stockSuccess = $state('');
  let updatingStock = $state(false);
  let newProduct = $state<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    currency: 'INR',
    stockQuantity: 0
  });
  let stockQuantity = $state(0);

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
      if (selectedProduct) {
        selectedProduct = products.find((product) => product.id === selectedProduct?.id) ?? selectedProduct;
      }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load products.';
    } finally {
      loading = false;
    }
  }

  async function showProduct(productId: number) {
    detailsLoading = true;
    detailsError = '';
    stockError = '';
    stockSuccess = '';
    selectedProduct = null;
    try {
      selectedProduct = await getProduct(productId);
      stockQuantity = selectedProduct.stockQuantity;
    } catch (error) {
      detailsError = error instanceof Error ? error.message : 'Unable to load product details.';
    } finally {
      detailsLoading = false;
    }
  }

  async function handleCreateProduct(event: SubmitEvent) {
    event.preventDefault();
    creating = true;
    createError = '';
    createSuccess = '';
    try {
      const created = await createProduct({
        ...newProduct,
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        price: Number(newProduct.price),
        stockQuantity: Number(newProduct.stockQuantity)
      });
      newProduct = { name: '', description: '', price: 0, currency: 'INR', stockQuantity: 0 };
      createSuccess = `Product #${created.id} was created successfully.`;
      await loadProducts();
    } catch (error) {
      createError = error instanceof Error ? error.message : 'Unable to create product.';
    } finally {
      creating = false;
    }
  }

  async function handleUpdateStock(event: SubmitEvent) {
    event.preventDefault();
    if (!selectedProduct) return;

    updatingStock = true;
    stockError = '';
    stockSuccess = '';
    try {
      selectedProduct = await updateProductStock(selectedProduct.id, {
        stockQuantity: Number(stockQuantity)
      });
      stockSuccess = 'Stock quantity updated successfully.';
      await loadProducts();
    } catch (error) {
      stockError = error instanceof Error ? error.message : 'Unable to update stock quantity.';
    } finally {
      updatingStock = false;
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
    <div>
      <p class="text-sm font-semibold text-indigo-600">Product management</p>
      <h2 class="mt-1 text-xl font-bold text-slate-900">Add a new product</h2>
      <p class="mt-2 text-sm text-slate-600">Create a product in the catalogue.</p>
    </div>

    <form onsubmit={handleCreateProduct} class="mt-6 grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Product name</span>
        <input bind:value={newProduct.name} required maxlength="100"
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Description</span>
        <input bind:value={newProduct.description} required
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Price</span>
        <input bind:value={newProduct.price} type="number" min="0.01" step="0.01" required
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Currency</span>
        <select bind:value={newProduct.currency} required
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700">Initial stock quantity</span>
        <input bind:value={newProduct.stockQuantity} type="number" min="0" step="1" required
          class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <div class="flex items-end">
        <button type="submit" disabled={creating}
          class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {creating ? 'Creating…' : 'Add product'}
        </button>
      </div>
    </form>
    {#if createError}
      <p role="alert" class="mt-4 text-sm text-red-700">{createError}</p>
    {/if}
    {#if createSuccess}
      <p role="status" class="mt-4 text-sm text-emerald-700">{createSuccess}</p>
    {/if}
  </section>

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
          <dt class="text-xs text-slate-500">Current stock</dt>
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

      <form onsubmit={handleUpdateStock} class="mt-8 max-w-md border-t border-indigo-100 pt-6">
        <h3 class="text-base font-bold text-slate-900">Update stock quantity</h3>
        <label class="mt-3 block">
          <span class="mb-1.5 block text-sm font-medium text-slate-700">New stock quantity</span>
          <input bind:value={stockQuantity} type="number" min="0" step="1" required
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        </label>
        <button type="submit" disabled={updatingStock}
          class="mt-4 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {updatingStock ? 'Updating…' : 'Update stock'}
        </button>
        {#if stockError}
          <p role="alert" class="mt-3 text-sm text-red-700">{stockError}</p>
        {/if}
        {#if stockSuccess}
          <p role="status" class="mt-3 text-sm text-emerald-700">{stockSuccess}</p>
        {/if}
      </form>
    </section>
  {/if}
</div>

<style>
  .low-stock {
    background: #fff7ed;
    color: #c2410c;
  }
</style>
