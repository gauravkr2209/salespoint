<script lang="ts">
  import { page } from '$app/state';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import FilterSidebar from '$lib/components/FilterSidebar.svelte';
  import { searchProducts, type SearchFilters, type SortOption } from '$lib/search/engine';
  import type { SearchFilters as SidebarFilters } from '$lib/types';
  import { goto } from '$app/navigation';

  let query = $derived(page.url.searchParams.get('q') ?? '');
  let categoryParam = $derived(page.url.searchParams.get('category'));
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

  // Convert sidebar filters to search engine filters
  let engineFilters = $derived<SearchFilters>({
    category: sidebarFilters.categories.length === 1 ? sidebarFilters.categories[0] : undefined,
    storeId: sidebarFilters.stores.length === 1 ? sidebarFilters.stores[0].toLowerCase() : undefined,
    minPrice: sidebarFilters.priceMin ?? undefined,
    maxPrice: sidebarFilters.priceMax ?? undefined,
    minDiscount: sidebarFilters.minDiscount ?? undefined
  });

  let results = $derived(searchProducts(query, engineFilters, currentSort, currentPage, 12));

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

  let totalPages = $derived(Math.ceil(results.total / 12));
  let showFilters = $state(false);

  // Smart pagination numbers
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

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-2xl mx-auto mb-8">
    <SearchBar onSearch={handleSearch} initialValue={query} />
  </div>

  <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
    <div>
      <h1 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white">
        {#if categoryParam}
          Browsing Category: <span class="text-primary dark:text-primary-light">{categoryParam}</span>
        {:else if query}
          Results for "<span class="text-primary dark:text-primary-light">{query}</span>"
        {:else}
          All Verified Products
        {/if}
      </h1>
      <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-1">
        Showing {results.products.length} of {results.total} verified items across 8 stores
      </p>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border dark:border-slate-700 rounded-lg text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
        onclick={() => showFilters = !showFilters}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>

      <select
        class="px-4 py-2 border border-border dark:border-slate-700 rounded-lg text-xs sm:text-sm text-text-primary dark:text-slate-200 bg-white dark:bg-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs"
        onchange={handleSortChange}
        value={currentSort}
      >
        <option value="relevance">Sort: Relevance</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="discount_desc">Discount: High → Low</option>
        <option value="unit_price_asc">Unit Price: Low → High (₹/100g, ₹/L)</option>
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
              class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-lg text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
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
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs {p === currentPage ? 'bg-primary text-white shadow-md shadow-primary/20' : 'border border-border dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-text-secondary dark:text-slate-300'}"
                onclick={() => handlePageChange(p)}
              >
                {p}
              </button>
            {/each}
            <button
              class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-lg text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
              disabled={currentPage === totalPages}
              onclick={() => handlePageChange(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        {/if}
      {:else}
        <div class="text-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-border dark:border-slate-700 p-8">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-lg font-bold text-text-primary dark:text-white mb-2">No matching products found</h3>
          <p class="text-sm text-text-secondary dark:text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any items matching your exact query or selected filters. Try searching for "Chips", "Coca-Cola", "Lay's", or clear some filters.
          </p>
          <button
            onclick={() => {
              sidebarFilters = { categories: [], stores: [], priceMin: null, priceMax: null, minDiscount: null };
              goto('/search?q=');
            }}
            class="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all"
          >
            Reset All Filters
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
