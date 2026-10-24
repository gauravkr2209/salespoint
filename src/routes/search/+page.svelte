<script lang="ts">
  import { page } from '$app/state';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import FilterSidebar from '$lib/components/FilterSidebar.svelte';
  import { searchProducts, type SearchFilters, type SortOption } from '$lib/search/engine';
  import type { SearchFilters as SidebarFilters } from '$lib/types';
  import { goto } from '$app/navigation';

  let query = $derived(page.url.searchParams.get('q') ?? '');
  let currentSort: SortOption = $state('relevance');
  let currentPage = $state(1);

  // Sidebar filters (component's own type)
  let sidebarFilters: SidebarFilters = $state({
    categories: [],
    stores: [],
    priceMin: null,
    priceMax: null,
    minDiscount: null
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
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-2xl mx-auto mb-8">
    <SearchBar onSearch={handleSearch} initialValue={query} />
  </div>

  <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
    <div>
      <h1 class="text-xl font-bold text-text-primary">
        {#if query}
          Results for "<span class="text-primary">{query}</span>"
        {:else}
          All Products
        {/if}
      </h1>
      <p class="text-sm text-text-secondary mt-1">{results.total} products found</p>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-gray-50 cursor-pointer"
        onclick={() => showFilters = !showFilters}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>

      <select
        class="px-4 py-2 border border-border rounded-lg text-sm text-text-secondary bg-white cursor-pointer"
        onchange={handleSortChange}
        value={currentSort}
      >
        <option value="relevance">Sort: Relevance</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="discount_desc">Discount: High → Low</option>
      </select>
    </div>
  </div>

  <div class="flex gap-8">
    <aside class="w-64 shrink-0 {showFilters ? 'block' : 'hidden lg:block'}">
      <FilterSidebar
        filters={sidebarFilters}
        categories={results.categories}
        priceRange={results.priceRange}
        onFilterChange={handleFilterChange}
      />
    </aside>

    <div class="flex-1">
      {#if results.products.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each results.products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>

        {#if totalPages > 1}
          <div class="flex justify-center items-center gap-2 mt-10">
            <button
              class="px-3 py-2 border border-border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
              disabled={currentPage === 1}
              onclick={() => handlePageChange(currentPage - 1)}
            >
              ← Prev
            </button>
            {#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
              <button
                class="w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer {p === currentPage ? 'bg-primary text-white' : 'border border-border hover:bg-gray-50 text-text-secondary'}"
                onclick={() => handlePageChange(p)}
              >
                {p}
              </button>
            {/each}
            <button
              class="px-3 py-2 border border-border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
              disabled={currentPage === totalPages}
              onclick={() => handlePageChange(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        {/if}
      {:else}
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">No products found</h3>
          <p class="text-text-secondary">Try a different search term or adjust your filters</p>
        </div>
      {/if}
    </div>
  </div>
</div>
