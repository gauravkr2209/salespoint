<script lang="ts">
  import { page } from '$app/state';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import PriceHistoryChart from '$lib/components/PriceHistoryChart.svelte';
  import DealBadge from '$lib/components/DealBadge.svelte';
  import { products, getLowestStorePrice } from '$lib/data/products';
  import { getLowestPrice, getHighestPrice, getAveragePrice } from '$lib/data/priceHistory';
  import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';
  import { goto } from '$app/navigation';

  let productId = $derived(page.params.id);
  let product = $derived(products.find(p => p.id === productId));

  let lowestStore = $derived(product ? getLowestStorePrice(product) : undefined);
  let bestPrice = $derived(lowestStore?.price ?? 0);
  let bestMrp = $derived(product ? Math.max(...product.storePrices.map(s => s.mrp)) : 0);
  let discount = $derived(bestMrp > 0 ? getDiscountPercent(bestMrp, bestPrice) : 0);

  let lowestEver = $derived(productId ? getLowestPrice(productId) : null);
  let highestEver = $derived(productId ? getHighestPrice(productId) : null);
  let avgPrice = $derived(productId ? getAveragePrice(productId) : 0);

  let alertPrice = $state('');
  let alertSet = $state(false);

  function handleSearch(q: string) {
    goto(`/search?q=${encodeURIComponent(q)}`);
  }

  function setAlert() {
    if (alertPrice) {
      const alerts = JSON.parse(localStorage.getItem('priceAlerts') ?? '[]');
      alerts.push({ productId, targetPrice: Number(alertPrice), createdAt: new Date().toISOString() });
      localStorage.setItem('priceAlerts', JSON.stringify(alerts));
      alertSet = true;
    }
  }
</script>

{#if product}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-2xl mx-auto mb-8">
      <SearchBar onSearch={handleSearch} />
    </div>

    <nav class="text-sm text-text-secondary mb-6">
      <a href="/" class="hover:text-primary">Home</a>
      <span class="mx-2">›</span>
      <a href="/search?q={product.category}" class="hover:text-primary">{product.category}</a>
      <span class="mx-2">›</span>
      <span class="text-text-primary">{product.title}</span>
    </nav>

    <div class="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <img src={product.imageUrl} alt={product.title} class="max-w-full max-h-80 object-contain rounded-lg" />
        </div>

        <div>
          <div class="flex items-start justify-between gap-4 mb-2">
            <span class="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">{product.brand}</span>
            {#if lowestEver && highestEver}
              <DealBadge currentPrice={bestPrice} lowestPrice={lowestEver.price} highestPrice={highestEver.price} averagePrice={avgPrice} />
            {/if}
          </div>

          <h1 class="text-2xl sm:text-3xl font-bold text-text-primary mb-4 mt-3">{product.title}</h1>

          <p class="text-sm text-text-secondary mb-4">{product.description}</p>

          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-3xl font-bold text-primary">{formatPrice(bestPrice)}</span>
            {#if discount > 0}
              <span class="text-lg text-text-secondary line-through">{formatPrice(bestMrp)}</span>
              <span class="text-sm font-semibold text-success bg-green-100 px-2 py-1 rounded">{discount}% off</span>
            {/if}
          </div>

          <div class="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4 mb-6">
            {#if lowestEver}
              <div class="text-center">
                <p class="text-xs text-text-secondary mb-1">Lowest Ever</p>
                <p class="text-sm font-bold text-success">{formatPrice(lowestEver.price)}</p>
              </div>
            {/if}
            <div class="text-center">
              <p class="text-xs text-text-secondary mb-1">Average</p>
              <p class="text-sm font-bold text-text-primary">{formatPrice(avgPrice)}</p>
            </div>
            {#if highestEver}
              <div class="text-center">
                <p class="text-xs text-text-secondary mb-1">Highest Ever</p>
                <p class="text-sm font-bold text-danger">{formatPrice(highestEver.price)}</p>
              </div>
            {/if}
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex items-center gap-1">
              <span class="text-yellow-400">★</span>
              <span class="text-sm font-semibold text-text-primary">{product.rating}</span>
            </div>
            <span class="text-xs text-text-secondary">({product.reviewCount.toLocaleString('en-IN')} reviews)</span>
          </div>

          <!-- Price Alert -->
          <div class="bg-primary/5 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-text-primary mb-2">🔔 Set Price Alert</h3>
            {#if alertSet}
              <p class="text-sm text-success font-medium">✅ Alert set! We'll notify you when the price drops.</p>
            {:else}
              <div class="flex gap-2">
                <input
                  type="number"
                  bind:value={alertPrice}
                  placeholder="Enter target price (₹)"
                  class="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  onclick={setAlert}
                  class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Set Alert
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8">
      <h2 class="text-xl font-bold text-text-primary mb-6">🏪 Price Comparison Across Stores</h2>
      <ComparisonTable {product} />
    </div>

    <div class="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8">
      <h2 class="text-xl font-bold text-text-primary mb-6">📈 Price History</h2>
      <PriceHistoryChart productId={product.id} />
    </div>
  </div>
{:else}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <div class="text-6xl mb-4">😕</div>
    <h1 class="text-2xl font-bold text-text-primary mb-2">Product Not Found</h1>
    <p class="text-text-secondary mb-6">The product you're looking for doesn't exist.</p>
    <a href="/" class="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
      Go Home
    </a>
  </div>
{/if}
