<script lang="ts">
  import SearchBar from '$lib/components/SearchBar.svelte';
  import TypewriterText from '$lib/components/TypewriterText.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import LiveDealTicker from '$lib/components/LiveDealTicker.svelte';
  import Hero3DShowcase from '$lib/components/Hero3DShowcase.svelte';
  import { getTrendingProducts } from '$lib/search/engine';
  import { goto } from '$app/navigation';
  import { scrollFade } from '$lib/utils/scrollAnimate';

  const trendingProducts = getTrendingProducts(8);

  const heroTexts = [
    'Lay\'s India\'s Magic Masala',
    'Coca-Cola Original 750ml',
    'Pringles Sour Cream 107g',
    'Red Bull Energy Drink 250ml',
    'Kurkure Masala Munch 82g',
    'iPhone 16 Pro Max 256GB',
    'Sony WH-1000XM5 ANC',
    'Doritos Sweet Chilli Nachos',
    'Bisleri 1L Mineral Water',
    'MacBook Air M3 16GB'
  ];

  const quickCategories = [
    { label: 'Chips & Crisps', emoji: '🥔', query: 'Chips' },
    { label: 'Soft Drinks', emoji: '🥤', query: 'Soft Drinks & Sodas' },
    { label: 'Juices', emoji: '🧃', query: 'Juices & Fruit Drinks' },
    { label: 'Energy Drinks', emoji: '⚡', query: 'Energy & Sports Drinks' },
    { label: 'Namkeen', emoji: '🍿', query: 'Namkeen & Savoury Snacks' },
    { label: 'Chocolates', emoji: '🍫', query: 'Chocolates & Candy' },
    { label: 'Smartphones', emoji: '📱', query: 'Smartphones' },
    { label: 'Laptops', emoji: '💻', query: 'Laptops' },
    { label: 'Headphones', emoji: '🎧', query: 'Headphones' },
    { label: 'Smartwatches', emoji: '⌚', query: 'Smartwatches' }
  ];

  function handleSearch(query: string) {
    goto(`/search?q=${encodeURIComponent(query)}`);
  }
</script>

<!-- Hero Section with Animated Gradient & Floating Elements -->
<section class="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
  <!-- Dynamic Gradient Blobs -->
  <div class="absolute -top-28 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/25 via-purple-500/20 to-pink-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
  <div class="absolute top-40 -left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-float"></div>
  <div class="absolute top-60 -right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>

  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <!-- Trust Badge Pill -->
    <div use:scrollFade={{ direction: 'down', delay: 50 }} class="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-primary/30 dark:border-indigo-500/30 shadow-lg shadow-primary/5 mb-6 backdrop-blur-xl max-w-full">
      <span class="flex h-2.5 w-2.5 relative shrink-0">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span class="text-[11px] sm:text-xs font-black text-slate-800 dark:text-slate-100 tracking-wide uppercase truncate">
        Scanning 400+ Verified SKUs Across 8 Stores
      </span>
    </div>

    <!-- Main Title with high contrast & flexible scaling -->
    <div use:scrollFade={{ direction: 'up', delay: 100 }}>
      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3 tracking-tight leading-[1.1] drop-shadow-sm">
        Stop Overpaying for
      </h1>
      <div class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 h-14 sm:h-18 md:h-20 flex items-center justify-center px-2">
        <span class="animated-gradient-text drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
          <TypewriterText texts={heroTexts} speed={65} pause={2200} />
        </span>
      </div>

      <p class="text-sm sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
        Compare prices and unit rates (₹/100g & ₹/L) across Blinkit, Zepto, Flipkart Minutes, Amazon, Croma & Myntra. Uncover fake markups with live price history graphs.
      </p>
    </div>

    <!-- Omnibox Search Bar with Glowing Ambient Shadow -->
    <div use:scrollFade={{ direction: 'up', delay: 150 }} class="max-w-2xl mx-auto mb-6 relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-primary/40 via-purple-500/40 to-pink-500/40 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div class="relative">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

    <!-- Category Quick Chips with 3D hover lift -->
    <div use:scrollFade={{ direction: 'up', delay: 200 }} class="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
      {#each quickCategories as cat}
        <button
          onclick={() => handleSearch(cat.query)}
          class="flex items-center gap-1.5 px-4 py-2 bg-white/90 dark:bg-slate-900/90 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white border border-border/80 dark:border-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-primary shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span class="text-sm">{cat.emoji}</span>
          <span>{cat.label}</span>
        </button>
      {/each}
    </div>

    <!-- 3D Interactive Hero Product Stage -->
    <div use:scrollFade={{ direction: 'up', delay: 250 }}>
      <Hero3DShowcase />
    </div>

    <!-- Live Store Intelligence Counters with 3D Depth Hover -->
    <div use:scrollFade={{ direction: 'up', delay: 300 }} class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div class="glass-card p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md border border-white/60 dark:border-slate-800">
        <div class="text-3xl mb-1.5">📦</div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">415+</div>
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Indexed Products</div>
      </div>
      <div class="glass-card p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md border border-white/60 dark:border-slate-800">
        <div class="text-3xl mb-1.5">⚡</div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">10-Min</div>
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Blinkit, Zepto, Minutes</div>
      </div>
      <div class="glass-card p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md border border-white/60 dark:border-slate-800">
        <div class="text-3xl mb-1.5">⚖️</div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Unit Price</div>
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">₹/100g & ₹/L Normalized</div>
      </div>
      <div class="glass-card p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md border border-white/60 dark:border-slate-800">
        <div class="text-3xl mb-1.5">🤖</div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">AI Voice</div>
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Voice Input & Read Aloud</div>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Live Intelligence Radar Component with Scroll Fade -->
<section use:scrollFade={{ direction: 'up', delay: 100 }} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <LiveDealTicker />
</section>

<!-- Trending Deals Grid with Scroll Fade -->
<section use:scrollFade={{ direction: 'up', delay: 120 }} class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔥</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Trending Hot Deals</h2>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Top price drops detected across quick commerce and major online retailers right now.
        </p>
      </div>
      <a
        href="/search?q="
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 px-5 py-2.5 rounded-xl transition-all hover:gap-3 shadow-xs"
      >
        Explore All 415 Products →
      </a>
    </div>

    <!-- Products Grid with 3D Tilt Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each trendingProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
</section>

<!-- How It Works Animated Visual Cards with Scroll Fade -->
<section use:scrollFade={{ direction: 'up', delay: 150 }} class="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-y border-border/60 dark:border-slate-800 transition-colors">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-xs font-black text-primary uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full border border-primary/20">
      Streamlined 3-Step Savings
    </span>
    <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4 mb-12">
      How SalesPoint Beats Regular Shopping
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Step 1 -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-border/80 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          🔍
        </div>
        <div class="text-xs font-bold text-primary dark:text-primary-light mb-1">STEP 01</div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Search Snacks or Gadgets</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Search by brand, flavour, packet weight, or bottle size across chips, sodas, smartphones, and fashion.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-border/80 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          ⚖️
        </div>
        <div class="text-xs font-bold text-primary dark:text-primary-light mb-1">STEP 02</div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Compare Unit Prices & Speed</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Compare Blinkit, Zepto, and Flipkart Minutes side-by-side with ₹/100g or ₹/L metrics and 90-day history.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-border/80 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          💰
        </div>
        <div class="text-xs font-bold text-primary dark:text-primary-light mb-1">STEP 03</div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Buy at the True Lowest</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Order in 10 minutes or choose e-commerce delivery with guaranteed verified seller stock.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- URL Prefix Trick Animated Interactive Hero Banner with Scroll Fade -->
<section use:scrollFade={{ direction: 'up', delay: 150 }} class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
  <div class="animated-gradient-bg p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
    <div class="max-w-2xl relative z-10">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-4">
        <span>⚡</span> Omnibox Power Trick
      </div>
      <h3 class="text-2xl sm:text-3xl font-black mb-3">
        Prepend <span class="bg-black/30 px-2 py-0.5 rounded font-mono">salespoint.in/</span> before any URL
      </h3>
      <p class="text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
        When browsing Amazon, Flipkart, Blinkit, or Zepto in your browser, just prepend <strong class="underline">salespoint.in/</strong> to your browser address bar to view multi-store price comparisons and unit rate audits instantly!
      </p>
      <div class="p-3.5 bg-black/40 rounded-xl font-mono text-xs sm:text-sm text-emerald-300 flex items-center gap-2 overflow-x-auto">
        <span class="text-white/60 select-none">👉</span>
        <span>salespoint.in/https://blinkit.com/prn/lays-magic-masala/prid/12345</span>
      </div>
    </div>
  </div>
</section>
