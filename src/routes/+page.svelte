<script lang="ts">
  import SearchBar from '$lib/components/SearchBar.svelte';
  import TypewriterText from '$lib/components/TypewriterText.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import LiveDealTicker from '$lib/components/LiveDealTicker.svelte';
  import { getTrendingProducts } from '$lib/search/engine';
  import { goto } from '$app/navigation';

  const trendingProducts = getTrendingProducts(8);

  const heroTexts = [
    'iPhone 16 Pro Max',
    'Sony WH-1000XM5',
    'MacBook Air M3',
    'Samsung Galaxy S24 Ultra',
    'AirPods Pro 2nd Gen',
    'Nike Air Jordan 1',
    'LG 55-inch OLED C3',
    'Dyson V15 Detect'
  ];

  const quickCategories = [
    { label: 'Smartphones', emoji: '📱', query: 'Smartphones' },
    { label: 'Laptops', emoji: '💻', query: 'Laptops' },
    { label: 'Headphones', emoji: '🎧', query: 'Headphones' },
    { label: 'Smartwatches', emoji: '⌚', query: 'Smartwatches' },
    { label: '4K TVs', emoji: '📺', query: 'Televisions' },
    { label: 'Footwear', emoji: '👟', query: 'Footwear' },
    { label: 'Appliances', emoji: '🏠', query: 'Home Appliances' }
  ];

  function handleSearch(query: string) {
    goto(`/search?q=${encodeURIComponent(query)}`);
  }
</script>

<!-- Hero Section with Animated Gradient & Floating Elements -->
<section class="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
  <!-- Dynamic Gradient Blobs -->
  <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/15 via-purple-500/10 to-pink-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
  <div class="absolute top-40 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-float"></div>
  <div class="absolute top-60 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>

  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <!-- Trust Badge Pill -->
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-primary/20 shadow-xs mb-6 backdrop-blur-md animate-in fade-in zoom-in-95">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
      </span>
      <span class="text-xs font-bold text-text-primary tracking-wide">
        Scanning 150+ Verified Products Across 5 Stores
      </span>
    </div>

    <!-- Main Title -->
    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-text-primary mb-4 tracking-tight leading-[1.1]">
      Stop Overpaying for
    </h1>
    <div class="text-3xl sm:text-5xl lg:text-6xl font-black mb-8 h-16 sm:h-20 flex items-center justify-center">
      <span class="animated-gradient-text drop-shadow-sm">
        <TypewriterText texts={heroTexts} speed={65} pause={2200} />
      </span>
    </div>

    <p class="text-sm sm:text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
      Search any product or paste direct product URLs from Amazon, Flipkart, Myntra, Croma or Ajio. Uncover fake discounts with real 90-day price history graphs.
    </p>

    <!-- Omnibox Search Bar with Glowing Ambient Shadow -->
    <div class="max-w-2xl mx-auto mb-6 relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
      <div class="relative">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

    <!-- Category Quick Chips -->
    <div class="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-12">
      {#each quickCategories as cat}
        <button
          onclick={() => handleSearch(cat.query)}
          class="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 hover:bg-primary hover:text-white border border-border/80 rounded-full text-xs font-semibold text-text-secondary hover:border-primary shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-xs"
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </button>
      {/each}
    </div>

    <!-- Live Store Intelligence Counters -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div class="glass-card p-4 rounded-2xl text-center hover:scale-105 transition-transform duration-200">
        <div class="text-2xl mb-1">📦</div>
        <div class="text-2xl font-black text-text-primary">150+</div>
        <div class="text-xs font-semibold text-text-secondary">Indexed Products</div>
      </div>
      <div class="glass-card p-4 rounded-2xl text-center hover:scale-105 transition-transform duration-200">
        <div class="text-2xl mb-1">🏪</div>
        <div class="text-2xl font-black text-text-primary">5 Stores</div>
        <div class="text-xs font-semibold text-text-secondary">Amazon, Flipkart & more</div>
      </div>
      <div class="glass-card p-4 rounded-2xl text-center hover:scale-105 transition-transform duration-200">
        <div class="text-2xl mb-1">📈</div>
        <div class="text-2xl font-black text-text-primary">90 Days</div>
        <div class="text-xs font-semibold text-text-secondary">Historical Price Audits</div>
      </div>
      <div class="glass-card p-4 rounded-2xl text-center hover:scale-105 transition-transform duration-200">
        <div class="text-2xl mb-1">🤖</div>
        <div class="text-2xl font-black text-text-primary">AI Chatbot</div>
        <div class="text-xs font-semibold text-text-secondary">Instant Deal Finder</div>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Live Intelligence Radar Component -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <LiveDealTicker />
</section>

<!-- Trending Deals Grid (From our 150 items catalog) -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔥</span>
          <h2 class="text-2xl sm:text-3xl font-black text-text-primary">Trending Hot Deals</h2>
        </div>
        <p class="text-xs sm:text-sm text-text-secondary mt-1">
          Top price drops detected across India's largest e-commerce retailers right now.
        </p>
      </div>
      <a
        href="/search?q="
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2.5 rounded-xl transition-all hover:gap-3"
      >
        Explore All 150 Products →
      </a>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each trendingProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
</section>

<!-- How It Works Animated Visual Cards -->
<section class="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-y border-border/60">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1 rounded-full">
      Streamlined 3-Step Savings
    </span>
    <h2 class="text-3xl sm:text-4xl font-black text-text-primary mt-3 mb-12">
      How CopyWeb Beats Regular Shopping
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Step 1 -->
      <div class="bg-white p-8 rounded-3xl border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          🔍
        </div>
        <div class="text-xs font-bold text-primary mb-1">STEP 01</div>
        <h3 class="text-lg font-bold text-text-primary mb-2">Search or Paste Link</h3>
        <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Type any product keyword or paste a product link from Amazon, Flipkart, Myntra, Croma or Ajio.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="bg-white p-8 rounded-3xl border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          📊
        </div>
        <div class="text-xs font-bold text-primary mb-1">STEP 02</div>
        <h3 class="text-lg font-bold text-text-primary mb-2">Compare & Audit Graph</h3>
        <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
          View all competitor stores side-by-side with stock status and check the 90-day chart for fake markups.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="bg-white p-8 rounded-3xl border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-left">
        <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
          💰
        </div>
        <div class="text-xs font-bold text-primary mb-1">STEP 03</div>
        <h3 class="text-lg font-bold text-text-primary mb-2">Buy at the True Lowest</h3>
        <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Visit the store with the real lowest price, set target price drop alerts, or ask our AI Shopping Bot!
        </p>
      </div>
    </div>
  </div>
</section>

<!-- URL Prefix Trick Animated Interactive Hero Banner -->
<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
  <div class="animated-gradient-bg p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
    <div class="max-w-2xl relative z-10">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-4">
        <span>⚡</span> Omnibox Power Trick
      </div>
      <h3 class="text-2xl sm:text-3xl font-black mb-3">
        Prepend <span class="bg-black/30 px-2 py-0.5 rounded font-mono">copyweb.com/</span> before any URL
      </h3>
      <p class="text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
        When browsing Amazon, Flipkart, Myntra, or Croma in any browser, just type <strong class="underline">copyweb.com/</strong> right in front of the URL in your address bar to jump straight to our multi-store price intelligence page!
      </p>
      <div class="p-3.5 bg-black/40 rounded-xl font-mono text-xs sm:text-sm text-emerald-300 flex items-center gap-2 overflow-x-auto">
        <span class="text-white/60 select-none">👉</span>
        <span>copyweb.com/https://amazon.in/dp/B0CS5JLKX7</span>
      </div>
    </div>
  </div>
</section>
