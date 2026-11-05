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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#0E0B1D]">
    <div class="max-w-2xl mx-auto mb-8">
      <SearchBar onSearch={handleSearch} />
    </div>

    <!-- Breadcrumbs -->
    <nav class="text-xs sm:text-sm text-[#8E84B0] mb-6 flex flex-wrap items-center gap-2">
      <a href="/" class="hover:text-white transition-colors">Home</a>
      <span>›</span>
      <a href="/search?category={encodeURIComponent(product.category)}" class="hover:text-white transition-colors">
        {product.category}
      </a>
      <span>›</span>
      <span class="text-white font-semibold line-clamp-1">{product.title}</span>
    </nav>

    <!-- Product Hero Card in Deep Purple -->
    <div class="bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] p-6 sm:p-10 mb-8 shadow-2xl transition-colors">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <!-- Product Image Preview -->
        <div class="relative flex items-center justify-center bg-[#140E28] rounded-2xl p-8 min-h-[320px] border border-[#3A3A52] overflow-hidden group">
          <!-- Top Controls: 3D Inspection + Wishlist -->
          <div class="absolute top-3 right-3 z-10 flex items-center gap-2">
            <button
              onclick={handleToggleWishlist}
              class="w-9 h-9 rounded-full bg-[#2A1E4D]/90 hover:bg-[#34265E] hover:scale-110 active:scale-90 shadow-md border border-[#3A3A52] hover:border-[#8B7CC7] flex items-center justify-center transition-all cursor-pointer"
              title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              aria-label={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            >
              <span class="text-sm">{wishlisted ? '❤️' : '🤍'}</span>
            </button>

            <button
              onclick={() => is3DViewerOpen = true}
              class="bg-[#5A3B8C] hover:bg-[#6D47A6] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md border border-[#8B7CC7]/40 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
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
              <div class="w-24 h-24 rounded-2xl bg-[#2A1E4D] border border-[#3A3A52] flex items-center justify-center text-4xl mb-3 shadow-inner">
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
              <span class="text-xs font-bold text-[#8B7CC7]">{product.brand}</span>
              <span class="text-sm font-semibold text-white mt-1 max-w-[200px]">{product.title}</span>
            </div>
          {/if}

          {#if product.packSize}
            <div class="absolute bottom-3 left-3 bg-[#2A1E4D]/90 backdrop-blur-md border border-[#3A3A52] text-xs font-bold px-3 py-1 rounded-full shadow-xs text-white">
              ⚖️ {product.packSize}
            </div>
          {/if}
        </div>

        <!-- Product Details -->
        <div>
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-black text-[#8B7CC7] bg-[#140E28] border border-[#3A3A52] px-3 py-1 rounded-full uppercase tracking-wider">
                {product.brand}
              </span>
              {#if product.variant}
                <span class="text-xs font-medium text-[#C9C2E3] bg-[#140E28] border border-[#3A3A52]/60 px-2.5 py-1 rounded-full">
                  {product.variant}
                </span>
              {/if}
            </div>
            {#if lowestEver && highestEver}
              <DealBadge currentPrice={bestPrice} lowestPrice={lowestEver.price} highestPrice={highestEver.price} averagePrice={avgPrice} />
            {/if}
          </div>

          <h1 class="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            {product.title}
          </h1>

          <p class="text-xs sm:text-sm text-[#C9C2E3] mb-6 leading-relaxed font-medium">
            {product.description}
          </p>

          <!-- Price & Discount -->
          <div class="flex flex-wrap items-baseline gap-3 mb-3">
            <span class="text-3xl sm:text-4xl font-black text-white">
              {formatPrice(bestPrice)}
            </span>
            {#if discount > 0}
              <span class="text-lg text-[#8E84B0] line-through">
                {formatPrice(bestMrp)}
              </span>
              <span class="text-xs sm:text-sm font-black text-white bg-[#5A3B8C] border border-[#8B7CC7]/40 px-3 py-0.5 rounded-full shadow-sm">
                {discount}% OFF
              </span>
            {/if}
          </div>

          <!-- Unit Rate Breakdown (Chips ₹/100g or Drinks ₹/L) -->
          {#if product.unitPrice?.pricePer100g || product.unitPrice?.pricePerLitre}
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] text-xs font-bold mb-6">
              <span>⚖️ Standardized Unit Price:</span>
              {#if product.unitPrice?.pricePer100g}
                <span class="text-white text-sm">₹{product.unitPrice.pricePer100g} / 100g</span>
              {:else if product.unitPrice?.pricePerLitre}
                <span class="text-white text-sm">₹{product.unitPrice.pricePerLitre} / Litre</span>
              {/if}
            </div>
          {/if}

          <!-- 90-Day High / Low Stats Grid -->
          <div class="grid grid-cols-3 gap-3 bg-[#140E28] rounded-2xl p-4 mb-6 border border-[#3A3A52]">
            {#if lowestEver}
              <div class="text-center">
                <p class="text-[11px] font-semibold text-[#8E84B0] mb-0.5">Lowest 90D</p>
                <p class="text-sm sm:text-base font-black text-emerald-400">{formatPrice(lowestEver.price)}</p>
              </div>
            {/if}
            <div class="text-center">
              <p class="text-[11px] font-semibold text-[#8E84B0] mb-0.5">Average Price</p>
              <p class="text-sm sm:text-base font-black text-white">{formatPrice(avgPrice)}</p>
            </div>
            {#if highestEver}
              <div class="text-center">
                <p class="text-[11px] font-semibold text-[#8E84B0] mb-0.5">Highest 90D</p>
                <p class="text-sm sm:text-base font-black text-rose-400">{formatPrice(highestEver.price)}</p>
              </div>
            {/if}
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex items-center gap-1.5 bg-[#140E28] px-3 py-1 rounded-xl border border-[#3A3A52]">
              <span class="text-amber-400">★</span>
              <span class="text-xs sm:text-sm font-bold text-white">{product.rating}</span>
            </div>
            <span class="text-xs text-[#8E84B0]">({product.reviewCount.toLocaleString('en-IN')} verified customer reviews)</span>
          </div>

          <!-- Price Alert -->
          <div class="bg-[#1F173C] rounded-2xl p-5 border border-[#3A3A52]">
            <h3 class="text-xs sm:text-sm font-black text-white mb-2 flex items-center gap-1.5">
              <span>🔔</span> Set Instant Drop Notification
            </h3>
            {#if alertSet}
              <p class="text-xs sm:text-sm text-emerald-400 font-bold">
                ✅ Alert active! SalesPoint will ping you when {product.brand} hits ₹{alertPrice}.
              </p>
            {:else}
              <div class="flex gap-2">
                <input
                  type="number"
                  bind:value={alertPrice}
                  placeholder="Target price (e.g. {Math.round(bestPrice * 0.9)})"
                  class="flex-1 px-3.5 py-2.5 bg-[#140E28] border border-[#3A3A52] focus:border-[#8B7CC7] rounded-xl text-xs sm:text-sm text-white focus:outline-none"
                />
                <button
                  onclick={setAlert}
                  class="px-4 py-2.5 bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer shrink-0"
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
    <div class="mb-8">
      <ComparisonTable {product} />
    </div>

    <!-- Price History Graph -->
    <div class="mb-8">
      <PriceHistoryChart productId={product.id} />
    </div>

    <!-- 3D Inspection Modal -->
    <Product3DViewer {product} bind:isOpen={is3DViewerOpen} />
  </div>
{:else}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-[#0E0B1D]">
    <div class="max-w-md mx-auto bg-[#2A1E4D] border border-[#3A3A52] rounded-3xl p-8 shadow-xl">
      <div class="text-6xl mb-4">🔍</div>
      <h1 class="text-2xl font-black text-white mb-2">Product Not Found</h1>
      <p class="text-[#8E84B0] text-sm mb-6">The product you're looking for doesn't exist in our 415+ item index.</p>
      <a href="/" class="inline-flex px-6 py-3 bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white font-bold rounded-xl transition-all shadow-md">
        Back to SalesPoint Home
      </a>
    </div>
  </div>
{/if}
