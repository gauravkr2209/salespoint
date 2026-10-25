<script lang="ts">
  import { page } from '$app/state';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import PriceHistoryChart from '$lib/components/PriceHistoryChart.svelte';
  import DealBadge from '$lib/components/DealBadge.svelte';
  import Product3DViewer from '$lib/components/Product3DViewer.svelte';
  import Comparison3DVisualizer from '$lib/components/Comparison3DVisualizer.svelte';
  import { products, getLowestStorePrice } from '$lib/data/products';
  import { getLowestPrice, getHighestPrice, getAveragePrice } from '$lib/data/priceHistory';
  import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';
  import { getProductImageUrl, getFallbackImage } from '$lib/utils/productImages';
  import { isProductWishlisted, toggleWishlist, addPriceAlert } from '$lib/auth/store';
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
  let imageError = $state(false);
  let is3DViewerOpen = $state(false);
  let wishlisted = $state(false);

  $effect(() => {
    if (productId) {
      wishlisted = isProductWishlisted(productId);
    }
  });

  function handleSearch(q: string) {
    goto(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleToggleWishlist() {
    if (productId) {
      wishlisted = toggleWishlist(productId);
    }
  }

  function setAlert() {
    if (alertPrice && productId) {
      addPriceAlert(productId, Number(alertPrice));
      alertSet = true;
    }
  }
</script>

{#if product}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-2xl mx-auto mb-8">
      <SearchBar onSearch={handleSearch} />
    </div>

    <!-- Breadcrumbs -->
    <nav class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mb-6 flex flex-wrap items-center gap-1.5">
      <a href="/" class="hover:text-primary dark:hover:text-primary-light transition-colors">Home</a>
      <span>›</span>
      <a href="/search?category={encodeURIComponent(product.category)}" class="hover:text-primary dark:hover:text-primary-light transition-colors">
        {product.category}
      </a>
      <span>›</span>
      <span class="text-text-primary dark:text-white font-medium line-clamp-1">{product.title}</span>
    </nav>

    <!-- Product Hero Card -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-border dark:border-slate-700 p-6 sm:p-10 mb-8 shadow-sm transition-colors">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <!-- Product Image Preview -->
        <div class="relative flex items-center justify-center bg-gray-50 dark:bg-slate-900/80 rounded-2xl p-8 min-h-[320px] border border-border/50 dark:border-slate-700/60 overflow-hidden group">
          <!-- Top Controls: 3D Inspection + Wishlist -->
          <div class="absolute top-3 right-3 z-10 flex items-center gap-2">
            <button
              onclick={handleToggleWishlist}
              class="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 hover:scale-110 active:scale-90 shadow-md border border-border/60 dark:border-slate-700 flex items-center justify-center transition-all cursor-pointer"
              title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              aria-label={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            >
              <span class="text-sm">{wishlisted ? '❤️' : '🤍'}</span>
            </button>

            <button
              onclick={() => is3DViewerOpen = true}
              class="bg-slate-900/85 hover:bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              aria-label="Inspect product in 3D"
            >
              <span class="text-xs">✨</span>
              <span>Inspect 3D (360°)</span>
            </button>
          </div>

          {#if !imageError}
            <img
              src={getProductImageUrl(product)}
              alt={product.title}
              class="max-w-full max-h-80 object-contain rounded-lg drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              onerror={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = getFallbackImage(product.category);
              }}
            />
          {:else}
            <div class="flex flex-col items-center justify-center text-center p-6">
              <div class="w-24 h-24 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-4xl mb-3 shadow-inner">
                {#if product.category.toLowerCase().includes('chip')}
                  🥔
                {:else if product.category.toLowerCase().includes('drink') || product.category.toLowerCase().includes('juice') || product.category.toLowerCase().includes('water')}
                  🥤
                {:else if product.category.toLowerCase().includes('snack') || product.category.toLowerCase().includes('chocolate')}
                  🍫
                {:else}
                  📦
                {/if}
              </div>
              <span class="text-xs font-bold text-text-secondary dark:text-slate-400">{product.brand}</span>
              <span class="text-sm font-semibold text-text-primary dark:text-white mt-1 max-w-[200px]">{product.title}</span>
            </div>
          {/if}

          {#if product.packSize}
            <div class="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs border border-border dark:border-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs text-text-primary dark:text-white">
              ⚖️ {product.packSize}
            </div>
          {/if}
        </div>

        <!-- Product Details -->
        <div>
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {product.brand}
              </span>
              {#if product.variant}
                <span class="text-xs font-medium text-text-secondary dark:text-slate-400 bg-gray-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">
                  {product.variant}
                </span>
              {/if}
            </div>
            {#if lowestEver && highestEver}
              <DealBadge currentPrice={bestPrice} lowestPrice={lowestEver.price} highestPrice={highestEver.price} averagePrice={avgPrice} />
            {/if}
          </div>

          <h1 class="text-2xl sm:text-3xl font-black text-text-primary dark:text-white mb-3 tracking-tight">
            {product.title}
          </h1>

          <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          <!-- Price & Discount -->
          <div class="flex flex-wrap items-baseline gap-3 mb-3">
            <span class="text-3xl sm:text-4xl font-black text-primary dark:text-primary-light">
              {formatPrice(bestPrice)}
            </span>
            {#if discount > 0}
              <span class="text-lg text-text-secondary dark:text-slate-400 line-through">
                {formatPrice(bestMrp)}
              </span>
              <span class="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                {discount}% OFF
              </span>
            {/if}
          </div>

          <!-- Unit Rate Breakdown (Chips ₹/100g or Drinks ₹/L) -->
          {#if product.unitPrice?.pricePer100g || product.unitPrice?.pricePerLitre}
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold mb-6">
              <span>⚖️ Standardized Unit Price:</span>
              {#if product.unitPrice?.pricePer100g}
                <span class="text-amber-950 dark:text-amber-200 text-sm">₹{product.unitPrice.pricePer100g} / 100g</span>
              {:else if product.unitPrice?.pricePerLitre}
                <span class="text-amber-950 dark:text-amber-200 text-sm">₹{product.unitPrice.pricePerLitre} / Litre</span>
              {/if}
            </div>
          {/if}

          <!-- 90-Day High / Low Stats Grid -->
          <div class="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-slate-900/60 rounded-2xl p-4 mb-6 border border-border/50 dark:border-slate-700/60">
            {#if lowestEver}
              <div class="text-center">
                <p class="text-[11px] font-semibold text-text-secondary dark:text-slate-400 mb-0.5">Lowest 90D</p>
                <p class="text-sm sm:text-base font-black text-success dark:text-emerald-400">{formatPrice(lowestEver.price)}</p>
              </div>
            {/if}
            <div class="text-center">
              <p class="text-[11px] font-semibold text-text-secondary dark:text-slate-400 mb-0.5">Average Price</p>
              <p class="text-sm sm:text-base font-black text-text-primary dark:text-slate-200">{formatPrice(avgPrice)}</p>
            </div>
            {#if highestEver}
              <div class="text-center">
                <p class="text-[11px] font-semibold text-text-secondary dark:text-slate-400 mb-0.5">Highest 90D</p>
                <p class="text-sm sm:text-base font-black text-danger dark:text-rose-400">{formatPrice(highestEver.price)}</p>
              </div>
            {/if}
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800">
              <span class="text-amber-500">★</span>
              <span class="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300">{product.rating}</span>
            </div>
            <span class="text-xs text-text-secondary dark:text-slate-400">({product.reviewCount.toLocaleString('en-IN')} verified customer reviews)</span>
          </div>

          <!-- Price Alert -->
          <div class="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 border border-primary/20">
            <h3 class="text-xs sm:text-sm font-bold text-text-primary dark:text-white mb-2 flex items-center gap-1.5">
              <span>🔔</span> Set Instant Drop Notification
            </h3>
            {#if alertSet}
              <p class="text-xs sm:text-sm text-success dark:text-emerald-400 font-bold">
                ✅ Alert active! SalesPoint will ping you when {product.brand} hits ₹{alertPrice}.
              </p>
            {:else}
              <div class="flex gap-2">
                <input
                  type="number"
                  bind:value={alertPrice}
                  placeholder="Target price (e.g. {Math.round(bestPrice * 0.9)})"
                  class="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-border dark:border-slate-700 rounded-xl text-xs sm:text-sm text-text-primary dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary shadow-2xs"
                />
                <button
                  onclick={setAlert}
                  class="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                >
                  Set Alert
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Dimensional Comparison Visualizer -->
    <div class="mb-8">
      <Comparison3DVisualizer {product} />
    </div>

    <!-- Store Comparison Table -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-border dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-sm transition-colors">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 class="text-lg sm:text-xl font-black text-text-primary dark:text-white flex items-center gap-2">
            <span>🏪</span> Multi-Store Price Comparison & Delivery
          </h2>
          <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-0.5">
            Compare verified prices across 10-minute quick commerce (Blinkit, Zepto, Flipkart Minutes) and e-commerce platforms.
          </p>
        </div>
      </div>
      <ComparisonTable {product} />
    </div>

    <!-- Price History Graph -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-border dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-sm transition-colors">
      <div class="mb-6">
        <h2 class="text-lg sm:text-xl font-black text-text-primary dark:text-white flex items-center gap-2">
          <span>📈</span> 90-Day Historical Price Audit
        </h2>
        <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-0.5">
          Verify whether current festival deals or sales are legitimate or inflated.
        </p>
      </div>
      <PriceHistoryChart productId={product.id} />
    </div>

    <!-- 3D Inspection Modal -->
    <Product3DViewer {product} bind:isOpen={is3DViewerOpen} />
  </div>
{:else}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <div class="text-6xl mb-4">😕</div>
    <h1 class="text-2xl font-bold text-text-primary dark:text-white mb-2">Product Not Found</h1>
    <p class="text-text-secondary dark:text-slate-400 mb-6">The product you're looking for doesn't exist in our 415+ item index.</p>
    <a href="/" class="inline-flex px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md">
      Back to SalesPoint Home
    </a>
  </div>
{/if}
