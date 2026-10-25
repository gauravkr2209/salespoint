<script lang="ts">
  import { page } from '$app/state';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import FilterSidebar from '$lib/components/FilterSidebar.svelte';
  import SpotifyTopResultCard from '$lib/components/SpotifyTopResultCard.svelte';
  import SpotifyEntityChips, { type SpotifyTab } from '$lib/components/SpotifyEntityChips.svelte';
  import SpotifyBrowseCategories from '$lib/components/SpotifyBrowseCategories.svelte';
  import SpotifyRecentSearches from '$lib/components/SpotifyRecentSearches.svelte';
  import { searchProducts, type SearchFilters, type SortOption } from '$lib/search/engine';
  import { executeSpotifySearch, type SpotifySearchResults, type SearchEntity } from '$lib/search/spotifyEngine';
  import { addRecentSearch, type RecentSearchItem } from '$lib/search/recentSearches';
  import type { SearchFilters as SidebarFilters } from '$lib/types';
  import { formatCurrency } from '$lib/utils/formatPrice';
  import { goto } from '$app/navigation';

  let query = $derived(page.url.searchParams.get('q') ?? '');
  let categoryParam = $derived(page.url.searchParams.get('category'));
  let activeTab = $state<SpotifyTab>('all');
  let currentSort: SortOption = $state('relevance');
  let currentPage = $state(1);

  // Sidebar filters
  let sidebarFilters: SidebarFilters = $state({
    categories: [],
    stores: [],
    priceMin: null,
    priceMax: null,
    minDiscount: null
  });

  // Keep categoryParam in sync with filters if provided in URL
  $effect(() => {
    if (categoryParam && (!sidebarFilters.categories.length || sidebarFilters.categories[0] !== categoryParam)) {
      sidebarFilters.categories = [categoryParam];
      currentPage = 1;
    }
  });

  // Effective query string combining categoryParam or query
  let effectiveQuery = $derived(
    categoryParam ? `category:${categoryParam} ${query}`.trim() : query
  );

  // Spotify multi-entity search results
  let spotifyResults = $derived<SpotifySearchResults>(
    executeSpotifySearch(effectiveQuery)
  );

  // Entity counts for Spotify filter tabs
  let entityCounts = $derived({
    all: spotifyResults.totalMatches,
    products: spotifyResults.totalMatches,
    brands: spotifyResults.matchingBrands.length,
    categories: spotifyResults.matchingCategories.length,
    stores: spotifyResults.matchingStores.length,
    deals: spotifyResults.matchingDeals.length
  });

  // Engine filters for full product catalog pagination & sorting
  let engineFilters = $derived<SearchFilters>({
    category: sidebarFilters.categories.length === 1 ? sidebarFilters.categories[0] : (spotifyResults.parsedQuery.fieldFilters.category ?? undefined),
    brand: spotifyResults.parsedQuery.fieldFilters.brand ?? undefined,
    storeId: sidebarFilters.stores.length === 1 ? sidebarFilters.stores[0].toLowerCase() : (spotifyResults.parsedQuery.fieldFilters.store ?? undefined),
    minPrice: sidebarFilters.priceMin ?? spotifyResults.parsedQuery.fieldFilters.minPrice ?? undefined,
    maxPrice: sidebarFilters.priceMax ?? spotifyResults.parsedQuery.fieldFilters.maxPrice ?? undefined,
    minDiscount: sidebarFilters.minDiscount ?? (spotifyResults.parsedQuery.fieldFilters.tag === 'deal' ? 15 : undefined)
  });

  // Clean free-text tokens for traditional engine
  let cleanedFreeText = $derived(spotifyResults.parsedQuery.cleanTokens.join(' '));

  let results = $derived(searchProducts(cleanedFreeText, engineFilters, currentSort, currentPage, 12));

  function handleSearch(q: string) {
    goto(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleSortChange(e: Event) {
    currentSort = (e.target as HTMLSelectElement).value as SortOption;
    currentPage = 1;
  }

  function handleFilterChange(newFilters: SidebarFilters) {
    sidebarFilters = newFilters;
    currentPage = 1;
  }

  function handlePageChange(p: number) {
    currentPage = p;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectEntity(entity: SearchEntity) {
    addRecentSearch({
      query: entity.title,
      type: entity.type,
      title: entity.title,
      subtitle: entity.subtitle,
      imageUrl: entity.imageUrl,
      url: entity.url
    });
    goto(entity.url);
  }

  function handleRecentSelect(item: RecentSearchItem) {
    if (item.url) {
      goto(item.url);
    } else {
      goto(`/search?q=${encodeURIComponent(item.query)}`);
    }
  }

  function applySyntaxExample(syntaxStr: string) {
    goto(`/search?q=${encodeURIComponent(syntaxStr)}`);
  }

  let totalPages = $derived(Math.ceil(results.total / 12));
  let showFilters = $state(false);

  let visiblePages = $derived.by(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, totalPages]);
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.add(i);
    }
    return Array.from(pages).sort((a, b) => a - b);
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <!-- Search Bar Header -->
  <div class="max-w-2xl mx-auto">
    <SearchBar onSearch={handleSearch} initialValue={query} />
  </div>

  <!-- Spotify Power Query Syntax Chips Bar -->
  <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-text-secondary dark:text-slate-400">
    <span class="font-bold shrink-0 font-mono text-[11px] uppercase tracking-wider text-primary flex items-center gap-1">
      <span>💡</span> Spotify Syntax:
    </span>
    <button
      type="button"
      onclick={() => applySyntaxExample("brand:lay's")}
      class="shrink-0 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-mono text-[11px] text-text-primary dark:text-slate-200 transition-colors"
    >
      brand:lay's
    </button>
    <button
      type="button"
      onclick={() => applySyntaxExample("store:blinkit tag:deal")}
      class="shrink-0 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-mono text-[11px] text-text-primary dark:text-slate-200 transition-colors"
    >
      store:blinkit tag:deal
    </button>
    <button
      type="button"
      onclick={() => applySyntaxExample("category:chips max:50")}
      class="shrink-0 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-mono text-[11px] text-text-primary dark:text-slate-200 transition-colors"
    >
      category:chips max:50
    </button>
    <button
      type="button"
      onclick={() => applySyntaxExample("coca-cola -diet")}
      class="shrink-0 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-mono text-[11px] text-text-primary dark:text-slate-200 transition-colors"
    >
      coca-cola -diet
    </button>
  </div>

  <!-- Spotify Multi-Entity Filter Chips (All, Products, Brands, Categories, Stores, Deals) -->
  <div class="border-b border-border/80 dark:border-slate-800 pb-3">
    <SpotifyEntityChips
      activeTab={activeTab}
      onTabChange={(tab) => { activeTab = tab; currentPage = 1; }}
      counts={entityCounts}
    />
  </div>

  <!-- ZERO-STATE: When Query is completely empty and "all" or "categories" selected -->
  {#if !query.trim() && !categoryParam && activeTab === 'all'}
    <div class="space-y-10">
      <!-- Recent Searches Shelf -->
      <SpotifyRecentSearches onSelect={handleRecentSelect} />

      <!-- Spotify "Browse all" Colorful Category Tiles -->
      <SpotifyBrowseCategories onSelectCategory={(cat) => goto(`/search?category=${encodeURIComponent(cat)}`)} />
    </div>
  {/if}

  <!-- TAB: ALL (Spotify Unified Results Layout) -->
  {#if activeTab === 'all'}
    <!-- Hero Section: Top Result + Top Matches (Spotify 2-Column Search Hero) -->
    {#if spotifyResults.topResult && query.trim()}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Top Result Card (Left 5 Cols) -->
        <div class="lg:col-span-5 space-y-2">
          <h2 class="text-xs font-black tracking-wider uppercase font-mono text-text-secondary dark:text-slate-400">
            Top Result
          </h2>
          <SpotifyTopResultCard entity={spotifyResults.topResult} onSelect={handleSelectEntity} />
        </div>

        <!-- Top Matches ("Songs" List Equivalent - Right 7 Cols) -->
        <div class="lg:col-span-7 space-y-2">
          <h2 class="text-xs font-black tracking-wider uppercase font-mono text-text-secondary dark:text-slate-400 flex items-center justify-between">
            <span>Top Matches</span>
            <button
              type="button"
              onclick={() => activeTab = 'products'}
              class="text-primary dark:text-primary-light hover:underline font-bold text-[11px] capitalize"
            >
              See all {spotifyResults.totalMatches} products →
            </button>
          </h2>

          <div class="bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-2xl p-2 divide-y divide-border/40 dark:divide-slate-800 shadow-sm">
            {#each spotifyResults.topProducts.slice(0, 4) as p, idx}
              <div
                class="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                onclick={() => handleSelectEntity(p)}
                onkeydown={(e) => e.key === 'Enter' && handleSelectEntity(p)}
                role="button"
                tabindex="0"
              >
                <div class="flex items-center gap-3.5 min-w-0">
                  <span class="text-xs font-mono font-bold text-slate-400 w-4 text-center">
                    {idx + 1}
                  </span>
                  <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-border/40 dark:border-slate-700 flex items-center justify-center">
                    <img src={p.imageUrl} alt={p.title} class="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform" />
                  </div>
                  <div class="min-w-0 pr-2">
                    <h4 class="text-xs sm:text-sm font-bold text-text-primary dark:text-white truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {p.title}
                    </h4>
                    <p class="text-[11px] text-text-secondary dark:text-slate-400 truncate mt-0.5">
                      {p.brand} • <span class="capitalize">{p.bestStoreName}</span>
                    </p>
                  </div>
                </div>

                <div class="text-right shrink-0 pl-3">
                  <div class="text-xs sm:text-sm font-black text-primary dark:text-emerald-400">
                    {formatCurrency(p.lowestPrice)}
                  </div>
                  {#if p.discountPercent > 0}
                    <span class="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-1.5 py-0.2 rounded-full">
                      -{p.discountPercent}%
                    </span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Matching Brands Shelf ("Artists" Equivalent) -->
    {#if spotifyResults.matchingBrands.length > 0 && query.trim()}
      <div class="space-y-3 pt-4 border-t border-border/60 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <h2 class="text-xs font-black tracking-wider uppercase font-mono text-text-secondary dark:text-slate-400">
            Matching Brands
          </h2>
          <button
            type="button"
            onclick={() => activeTab = 'brands'}
            class="text-xs font-bold text-primary dark:text-primary-light hover:underline"
          >
            See all ({spotifyResults.matchingBrands.length}) →
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {#each spotifyResults.matchingBrands.slice(0, 6) as brand}
            <a
              href={brand.url}
              onclick={() => handleSelectEntity(brand)}
              class="group bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-lg transition-all duration-300 block"
            >
              <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-primary/20 shadow-sm mb-3">
                <img src={brand.imageUrl} alt={brand.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 class="text-xs sm:text-sm font-black text-text-primary dark:text-white truncate group-hover:text-primary transition-colors">
                {brand.name}
              </h4>
              <p class="text-[11px] text-text-secondary dark:text-slate-400 mt-0.5">
                {brand.productCount} SKUs
              </p>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Matching Categories Shelf -->
    {#if spotifyResults.matchingCategories.length > 0 && query.trim()}
      <div class="space-y-3 pt-4 border-t border-border/60 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <h2 class="text-xs font-black tracking-wider uppercase font-mono text-text-secondary dark:text-slate-400">
            Categories & Departments
          </h2>
          <button
            type="button"
            onclick={() => activeTab = 'categories'}
            class="text-xs font-bold text-primary dark:text-primary-light hover:underline"
          >
            See all ({spotifyResults.matchingCategories.length}) →
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {#each spotifyResults.matchingCategories.slice(0, 6) as cat}
            <a
              href={cat.url}
              onclick={() => handleSelectEntity(cat)}
              class="group relative h-28 rounded-2xl p-3 overflow-hidden bg-gradient-to-br {cat.gradient} flex flex-col justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div class="relative z-10">
                <span class="text-xl block mb-0.5">{cat.emoji}</span>
                <h4 class="text-white font-black text-xs leading-snug line-clamp-2">
                  {cat.name}
                </h4>
              </div>
              <span class="text-[10px] text-white/80 font-medium relative z-10">
                {cat.productCount} items
              </span>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Quick-Commerce & Retail Stores Shelf -->
    {#if spotifyResults.matchingStores.length > 0 && query.trim()}
      <div class="space-y-3 pt-4 border-t border-border/60 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <h2 class="text-xs font-black tracking-wider uppercase font-mono text-text-secondary dark:text-slate-400">
            Retail & Quick-Commerce Stores
          </h2>
          <button
            type="button"
            onclick={() => activeTab = 'stores'}
            class="text-xs font-bold text-primary dark:text-primary-light hover:underline"
          >
            See all ({spotifyResults.matchingStores.length}) →
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {#each spotifyResults.matchingStores as store}
            <a
              href={store.url}
              onclick={() => handleSelectEntity(store)}
              class="group bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-md transition-all flex items-center gap-3.5"
            >
              <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border/60 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0">
                {store.store.logo}
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-xs sm:text-sm font-black text-text-primary dark:text-white truncate group-hover:text-primary transition-colors">
                  {store.name}
                </h4>
                <p class="text-[11px] text-text-secondary dark:text-slate-400 truncate">
                  {store.storeType === 'quick_commerce' ? '⚡ 10-Min Delivery' : '📦 Marketplace'}
                </p>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  {store.productCount} verified items
                </span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Full Product Catalog with Sorting & Filters -->
    <div class="pt-8 border-t border-border/80 dark:border-slate-800 space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-black text-text-primary dark:text-white">
            {#if categoryParam}
              Category: <span class="text-primary dark:text-primary-light">{categoryParam}</span>
            {:else if query}
              Catalog Results for "<span class="text-primary dark:text-primary-light">{query}</span>"
            {:else}
              All Verified Products
            {/if}
          </h2>
          <p class="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
            Showing {results.products.length} of {results.total} verified items across 8 stores
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border dark:border-slate-700 rounded-lg text-xs font-bold text-text-secondary dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
            onclick={() => showFilters = !showFilters}
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          <select
            class="px-3.5 py-2 border border-border dark:border-slate-700 rounded-lg text-xs font-semibold text-text-primary dark:text-slate-200 bg-white dark:bg-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs"
            onchange={handleSortChange}
            value={currentSort}
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="discount_desc">Discount: High → Low</option>
            <option value="unit_price_asc">Unit Price: Low → High</option>
            <option value="unit_price_desc">Unit Price: High → Low</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <aside class="w-full lg:w-64 shrink-0 {showFilters ? 'block' : 'hidden lg:block'}">
          <FilterSidebar
            filters={sidebarFilters}
            categories={results.categories}
            priceRange={results.priceRange}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <div class="flex-1 min-w-0">
          {#if results.products.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {#each results.products as product (product.id)}
                <ProductCard {product} />
              {/each}
            </div>

            {#if totalPages > 1}
              <div class="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-12 pb-8">
                <button
                  type="button"
                  class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
                  disabled={currentPage === 1}
                  onclick={() => handlePageChange(currentPage - 1)}
                >
                  ← Prev
                </button>
                {#each visiblePages as p, idx}
                  {#if idx > 0 && p - visiblePages[idx - 1] > 1}
                    <span class="px-2 text-text-secondary dark:text-slate-500">...</span>
                  {/if}
                  <button
                    type="button"
                    class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs {p === currentPage ? 'bg-primary text-white shadow-md shadow-primary/20' : 'border border-border dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-text-secondary dark:text-slate-300'}"
                    onclick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                {/each}
                <button
                  type="button"
                  class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
                  disabled={currentPage === totalPages}
                  onclick={() => handlePageChange(currentPage + 1)}
                >
                  Next →
                </button>
              </div>
            {/if}
          {:else}
            <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-border dark:border-slate-800 p-8">
              <div class="text-5xl mb-3">🔍</div>
              <h3 class="text-base font-bold text-text-primary dark:text-white mb-2">No matching products found</h3>
              <p class="text-xs text-text-secondary dark:text-slate-400 max-w-md mx-auto mb-6">
                No items match your exact combination of search terms and filters.
              </p>
              <button
                type="button"
                onclick={() => {
                  sidebarFilters = { categories: [], stores: [], priceMin: null, priceMax: null, minDiscount: null };
                  goto('/search?q=');
                }}
                class="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Reset All Filters
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- TAB: PRODUCTS ONLY -->
  {#if activeTab === 'products'}
    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="w-full lg:w-64 shrink-0">
        <FilterSidebar
          filters={sidebarFilters}
          categories={results.categories}
          priceRange={results.priceRange}
          onFilterChange={handleFilterChange}
        />
      </aside>
      <div class="flex-1 min-w-0">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each results.products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- TAB: BRANDS ONLY -->
  {#if activeTab === 'brands'}
    <div class="space-y-4">
      <h2 class="text-xl font-black text-text-primary dark:text-white">
        Brands ({spotifyResults.matchingBrands.length})
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {#each spotifyResults.matchingBrands as brand}
          <a
            href={brand.url}
            onclick={() => handleSelectEntity(brand)}
            class="group bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-2xl p-5 text-center hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-lg transition-all"
          >
            <div class="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-primary/20 shadow-sm mb-3">
              <img src={brand.imageUrl} alt={brand.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-sm font-black text-text-primary dark:text-white truncate group-hover:text-primary transition-colors">
              {brand.name}
            </h3>
            <p class="text-xs text-text-secondary dark:text-slate-400 mt-1">
              {brand.productCount} verified items
            </p>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- TAB: CATEGORIES ONLY -->
  {#if activeTab === 'categories'}
    <SpotifyBrowseCategories onSelectCategory={(cat) => goto(`/search?category=${encodeURIComponent(cat)}`)} />
  {/if}

  <!-- TAB: STORES ONLY -->
  {#if activeTab === 'stores'}
    <div class="space-y-4">
      <h2 class="text-xl font-black text-text-primary dark:text-white">
        Stores & Instant Quick-Commerce Platforms
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each spotifyResults.matchingStores as store}
          <a
            href={store.url}
            onclick={() => handleSelectEntity(store)}
            class="group bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-2xl p-5 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-lg transition-all flex items-start gap-4"
          >
            <div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-border/60 dark:border-slate-700 flex items-center justify-center text-3xl shrink-0">
              {store.store.logo}
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-base font-black text-text-primary dark:text-white truncate group-hover:text-primary transition-colors">
                {store.name}
              </h3>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 {store.storeType === 'quick_commerce' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}">
                {store.storeType === 'quick_commerce' ? '⚡ 10-Minute Instant' : '📦 Marketplace'}
              </span>
              <p class="text-xs text-text-secondary dark:text-slate-400 mt-2">
                {store.productCount} products indexed
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- TAB: DEALS & STEALS ONLY -->
  {#if activeTab === 'deals'}
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-black text-text-primary dark:text-white flex items-center gap-2">
            <span>🔥</span> Verified Deals & Steals (≥15% OFF)
          </h2>
          <p class="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
            Real discounts compared against historical MRP across quick-commerce & marketplaces
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each spotifyResults.matchingDeals as deal (deal.id)}
          <ProductCard product={deal.product} />
        {/each}
      </div>
    </div>
  {/if}
</div>
