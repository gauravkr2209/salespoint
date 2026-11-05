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

<!-- Hero Section with Deep Purple Ambient Glow & Precision Layout -->
<section class="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-[#0E0B1D]">
  <!-- Dynamic Midnight / Royal Purple Ambient Blobs -->
  <div class="absolute -top-28 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-r from-[#5A3B8C]/25 via-[#2A1E4D]/35 to-[#8B7CC7]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
  <div class="absolute top-40 -left-20 w-80 h-80 bg-[#5A3B8C]/15 rounded-full blur-3xl pointer-events-none animate-float"></div>
  <div class="absolute top-60 -right-20 w-96 h-96 bg-[#2A1E4D]/25 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>

  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <!-- Trust Badge Pill -->
    <div use:scrollFade={{ direction: 'down', delay: 50 }} class="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-[#2A1E4D]/90 border border-[#3A3A52] shadow-xl shadow-[#5A3B8C]/10 mb-6 backdrop-blur-xl max-w-full">
      <span class="flex h-2.5 w-2.5 relative shrink-0">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
      </span>
      <span class="text-[11px] sm:text-xs font-black text-[#C9C2E3] tracking-wide uppercase truncate">
        Scanning 400+ Verified SKUs Across 8 Stores
      </span>
    </div>

    <!-- Main Title: Headline & Supporting Text from Master Prompt -->
    <div use:scrollFade={{ direction: 'up', delay: 100 }}>
      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight leading-[1.1] drop-shadow-sm">
        Compare Smarter. <span class="animated-gradient-text">Shop Better.</span>
      </h1>
      
      <div class="text-xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 h-12 sm:h-16 flex items-center justify-center px-2 text-[#8B7CC7]">
        <span class="drop-shadow-[0_0_25px_rgba(139,124,199,0.35)]">
          <TypewriterText texts={heroTexts} speed={65} pause={2200} />
        </span>
      </div>

      <p class="text-sm sm:text-lg text-[#C9C2E3] mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
        Discover products, compare prices across multiple platforms, and find the best available deals — all in one place.
      </p>
    </div>

    <!-- Omnibox Search Bar with Subtle Purple Aura -->
    <div use:scrollFade={{ direction: 'up', delay: 150 }} class="max-w-2xl mx-auto mb-6 relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-[#5A3B8C]/35 via-[#8B7CC7]/25 to-[#5A3B8C]/35 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300"></div>
      <div class="relative">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

    <!-- Category Quick Chips -->
    <div use:scrollFade={{ direction: 'up', delay: 200 }} class="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
      {#each quickCategories as cat}
        <button
          onclick={() => handleSearch(cat.query)}
          class="flex items-center gap-1.5 px-4 py-2 bg-[#2A1E4D]/80 hover:bg-[#5A3B8C] text-[#C9C2E3] hover:text-white border border-[#3A3A52] hover:border-[#8B7CC7] rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:shadow-[#5A3B8C]/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer backdrop-blur-md"
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

    <!-- Live Store Intelligence Counters with Deep Purple Cards -->
    <div use:scrollFade={{ direction: 'up', delay: 300 }} class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div class="bg-[#2A1E4D] p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-[#3A3A52] hover:border-[#8B7CC7]/60">
        <div class="text-3xl mb-1.5">📦</div>
        <div class="text-2xl sm:text-3xl font-black text-white">415+</div>
        <div class="text-xs font-bold text-[#8E84B0] mt-0.5">Indexed Products</div>
      </div>
      <div class="bg-[#2A1E4D] p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-[#3A3A52] hover:border-[#8B7CC7]/60">
        <div class="text-3xl mb-1.5">⚡</div>
        <div class="text-2xl sm:text-3xl font-black text-white">10-Min</div>
        <div class="text-xs font-bold text-[#8E84B0] mt-0.5">Blinkit, Zepto, Minutes</div>
      </div>
      <div class="bg-[#2A1E4D] p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-[#3A3A52] hover:border-[#8B7CC7]/60">
        <div class="text-3xl mb-1.5">⚖️</div>
        <div class="text-2xl sm:text-3xl font-black text-white">Unit Price</div>
        <div class="text-xs font-bold text-[#8E84B0] mt-0.5">₹/100g & ₹/L Normalized</div>
      </div>
      <div class="bg-[#2A1E4D] p-5 rounded-3xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-[#3A3A52] hover:border-[#8B7CC7]/60">
        <div class="text-3xl mb-1.5">🤖</div>
        <div class="text-2xl sm:text-3xl font-black text-white">AI Voice</div>
        <div class="text-xs font-bold text-[#8E84B0] mt-0.5">Voice Input & Read Aloud</div>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Live Intelligence Radar Component -->
<section use:scrollFade={{ direction: 'up', delay: 100 }} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <LiveDealTicker />
</section>

<!-- Trending Deals Grid with Scroll Fade -->
<section use:scrollFade={{ direction: 'up', delay: 120 }} class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="text-2xl">🔥</span>
          <h2 class="text-2xl sm:text-3xl font-black text-white">Trending Hot Deals</h2>
        </div>
        <p class="text-xs sm:text-sm text-[#8E84B0] mt-1">
          Top price drops detected across quick commerce and major online retailers right now.
        </p>
      </div>
      <a
        href="/search?q="
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-white bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 px-5 py-2.5 rounded-xl transition-all hover:gap-3 shadow-md shadow-[#5A3B8C]/25"
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

<!-- How It Works Animated Visual Cards -->
<section use:scrollFade={{ direction: 'up', delay: 150 }} class="py-20 bg-[#140E28] border-y border-[#3A3A52] transition-colors">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-xs font-black text-[#8B7CC7] uppercase tracking-wider bg-[#2A1E4D] border border-[#3A3A52] px-4 py-1.5 rounded-full">
      Streamlined 3-Step Savings
    </span>
    <h2 class="text-3xl sm:text-4xl font-black text-white mt-4 mb-12">
      How SalesPoint Beats Regular Shopping
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Step 1 -->
      <div class="bg-[#2A1E4D] p-8 rounded-3xl border border-[#3A3A52] shadow-xl hover:shadow-2xl hover:border-[#8B7CC7] transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          🔍
        </div>
        <div class="text-xs font-bold text-[#8B7CC7] mb-1">STEP 01</div>
        <h3 class="text-lg font-bold text-white mb-2">Search Snacks or Gadgets</h3>
        <p class="text-xs sm:text-sm text-[#8E84B0] leading-relaxed">
          Search by brand, flavour, packet weight, or bottle size across chips, sodas, smartphones, and fashion.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="bg-[#2A1E4D] p-8 rounded-3xl border border-[#3A3A52] shadow-xl hover:shadow-2xl hover:border-[#8B7CC7] transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          ⚖️
        </div>
        <div class="text-xs font-bold text-[#8B7CC7] mb-1">STEP 02</div>
        <h3 class="text-lg font-bold text-white mb-2">Compare Unit Prices & Speed</h3>
        <p class="text-xs sm:text-sm text-[#8E84B0] leading-relaxed">
          Compare Blinkit, Zepto, and Flipkart Minutes side-by-side with ₹/100g or ₹/L metrics and 90-day history.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="bg-[#2A1E4D] p-8 rounded-3xl border border-[#3A3A52] shadow-xl hover:shadow-2xl hover:border-[#8B7CC7] transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          💰
        </div>
        <div class="text-xs font-bold text-[#8B7CC7] mb-1">STEP 03</div>
        <h3 class="text-lg font-bold text-white mb-2">Buy at the True Lowest</h3>
        <p class="text-xs sm:text-sm text-[#8E84B0] leading-relaxed">
          Order in 10 minutes or choose e-commerce delivery with guaranteed verified seller stock.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- URL Prefix Trick Animated Interactive Hero Banner -->
<section use:scrollFade={{ direction: 'up', delay: 150 }} class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
  <div class="bg-gradient-to-r from-[#1A1235] via-[#2A1E4D] to-[#1F173C] border border-[#3A3A52] p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
    <div class="absolute -right-20 -top-20 w-80 h-80 bg-[#5A3B8C]/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="max-w-2xl relative z-10">
      <div class="inline-flex items-center gap-2 bg-[#5A3B8C]/40 border border-[#8B7CC7]/40 px-3.5 py-1 rounded-full text-xs font-bold mb-4 text-[#C9C2E3]">
        <span>⚡</span> Omnibox Power Trick
      </div>
      <h3 class="text-2xl sm:text-3xl font-black mb-3 text-white tracking-tight">
        Prepend <span class="bg-[#0E0B1D] text-[#8B7CC7] border border-[#3A3A52] px-2.5 py-0.5 rounded-lg font-mono text-xl sm:text-2xl">salespoint.in/</span> before any URL
      </h3>
      <p class="text-xs sm:text-sm text-[#C9C2E3] leading-relaxed mb-6 font-medium">
        When browsing Amazon, Flipkart, Blinkit, or Zepto in your browser, just prepend <strong class="text-white underline">salespoint.in/</strong> to your browser address bar to view multi-store price comparisons and unit rate audits instantly!
      </p>
      <div class="p-4 bg-[#0E0B1D] border border-[#3A3A52] rounded-2xl font-mono text-xs sm:text-sm text-[#8B7CC7] flex items-center gap-2 overflow-x-auto shadow-inner">
        <span class="text-[#8E84B0] select-none">👉</span>
        <span>salespoint.in/https://blinkit.com/prn/lays-magic-masala/prid/12345</span>
      </div>
    </div>
  </div>
</section>
