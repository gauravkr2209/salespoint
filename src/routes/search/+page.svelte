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

  // Category quick navigation pills
  const quickCategories = [
    { label: 'All Products', category: '', emoji: '🔥' },
    { label: 'Chips', category: 'Chips', emoji: '🥔' },
    { label: 'Drinks & Sodas', category: 'Soft Drinks & Sodas', emoji: '🥤' },
    { label: 'Namkeen & Snacks', category: 'Namkeen & Savoury Snacks', emoji: '🍿' },
    { label: 'Smartphones', category: 'Smartphones', emoji: '📱' },
    { label: 'Laptops', category: 'Laptops', emoji: '💻' },
    { label: 'Chocolates', category: 'Chocolates & Sweets', emoji: '🍫' }
  ];

  // Keep categoryParam in sync with filters if provided in URL
  $effect(() => {
    if (categoryParam && (!sidebarFilters.categories.length || sidebarFilters.categories[0] !== categoryParam)) {
      sidebarFilters.categories = [categoryParam];
      currentPage = 1;
    } else if (!categoryParam && sidebarFilters.categories.length > 0) {
      // Clear category filter if removed from URL
      sidebarFilters.categories = [];
    }
  });

  // Convert sidebar filters to search engine filters
  let engineFilters = $derived<SearchFilters>({
    category: sidebarFilters.categories.length === 1 ? sidebarFilters.categories[0] : (categoryParam || undefined),
    storeId: sidebarFilters.stores.length === 1 ? sidebarFilters.stores[0].toLowerCase() : undefined,
    minPrice: sidebarFilters.priceMin ?? undefined,
    maxPrice: sidebarFilters.priceMax ?? undefined,
    minDiscount: sidebarFilters.minDiscount ?? undefined
  });

  let results = $derived(searchProducts(query, engineFilters, currentSort, currentPage, 12));

  function handleSearch(q: string) {
    goto(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleQuickCategory(cat: string) {
    if (!cat) {
      sidebarFilters.categories = [];
      goto('/search?q=');
    } else {
      sidebarFilters.categories = [cat];
      goto(`/search?category=${encodeURIComponent(cat)}`);
    }
    currentPage = 1;
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

<svelte:head>
  <title>
    {categoryParam ? `${categoryParam} — SalesPoint` : query ? `Search: "${query}" — SalesPoint` : 'Browse Verified Products — SalesPoint'}
  </title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
  <!-- Search bar header -->
  <div class="max-w-2xl mx-auto mb-4">
    <SearchBar onSearch={handleSearch} initialValue={query} />
  </div>

  <!-- Quick Category Pills -->
  <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
    {#each quickCategories as item}
      {@const isActive = (!item.category && !categoryParam && !sidebarFilters.categories.length) || (categoryParam === item.category) || (sidebarFilters.categories.includes(item.category))}
      <button
        onclick={() => handleQuickCategory(item.category)}
        class="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border {
          isActive
            ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
            : 'bg-white dark:bg-slate-900 border-border/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/50'
        }"
      >
        <span>{item.emoji}</span>
        <span>{item.label}</span>
      </button>
    {/each}
  </div>

  <!-- Results Header + Sort Controls -->
  <div class="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b border-border/80 dark:border-slate-800">
    <div>
      <h1 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white flex items-center gap-2">
        {#if categoryParam}
          <span>Department:</span>
          <span class="text-primary dark:text-indigo-400">{categoryParam}</span>
        {:else if query}
          <span>Results for:</span>
          <span class="text-primary dark:text-indigo-400">"{query}"</span>
        {:else}
          <span>All Verified Catalog</span>
        {/if}
      </h1>
      <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-1">
        Showing {results.products.length} of {results.total} verified items across Blinkit, Zepto, Amazon, Flipkart, Minutes & Croma
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Mobile filter trigger -->
      <button
        class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-text-secondary dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 cursor-pointer shadow-xs"
        onclick={() => showFilters = !showFilters}
        aria-label="Toggle Filters"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
      </button>

      <!-- Sort Dropdown -->
      <select
        class="px-4 py-2 border border-border dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-text-primary dark:text-slate-200 bg-white dark:bg-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
        onchange={handleSortChange}
        value={currentSort}
        aria-label="Sort products by"
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

  <!-- Main Content Layout (Sidebar + Grid) -->
  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Filter Sidebar -->
    <aside class="w-full lg:w-64 shrink-0 {showFilters ? 'block' : 'hidden lg:block'}">
      <FilterSidebar
        filters={sidebarFilters}
        categories={results.categories}
        priceRange={results.priceRange}
        onFilterChange={handleFilterChange}
      />
    </aside>

    <!-- Product Grid & Pagination -->
    <div class="flex-1 min-w-0">
      {#if results.products.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each results.products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>

        <!-- Pagination Bar -->
        {#if totalPages > 1}
          <div class="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-12 pb-8">
            <button
              class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-xl text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs transition-colors"
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
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs {
                  p === currentPage 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'border border-border dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-secondary dark:text-slate-300'
                }"
                onclick={() => handlePageChange(p)}
              >
                {p}
              </button>
            {/each}
            <button
              class="px-3 py-2 border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text-secondary dark:text-slate-300 rounded-xl text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs transition-colors"
              disabled={currentPage === totalPages}
              onclick={() => handlePageChange(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        {/if}
      {:else}
        <!-- Empty State -->
        <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-border dark:border-slate-800 p-8 shadow-xs">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-lg font-bold text-text-primary dark:text-white mb-2">No matching products found</h3>
          <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any items matching your exact query or selected filters. Try searching for "Chips", "Coca-Cola", "Lay's", or reset your filters.
          </p>
          <button
            onclick={() => {
              sidebarFilters = { categories: [], stores: [], priceMin: null, priceMax: null, minDiscount: null };
              goto('/search?q=');
            }}
            class="px-5 py-2.5 bg-primary hover:bg-primary-hover active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
