<script lang="ts">
  import '../app.css';
  import CampaignStrip from '$lib/components/CampaignStrip.svelte';
  import AuthBadge from '$lib/components/AuthBadge.svelte';
  import Chatbot from '$lib/components/Chatbot.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <title>CopyWeb — India's Smartest Price Comparison & Price History Engine</title>
  <meta name="description" content="Compare real-time prices across 150+ products on Amazon, Flipkart, Myntra, Croma & Ajio. Track 90-day price history graphs, spot fake sales, and save money." />
</svelte:head>

<CampaignStrip />

<header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/80 shadow-xs transition-all">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-18">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2.5 shrink-0 group">
        <div class="w-9 h-9 bg-gradient-to-tr from-primary to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 group-hover:rotate-2 transition-all">
          <span class="text-white font-black text-sm tracking-wider">CW</span>
        </div>
        <span class="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
          Copy<span class="animated-gradient-text">Web</span>
        </span>
      </a>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-6">
        <a href="/" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
          Home
        </a>
        <a href="/search?q=" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-1.5">
          <span>🔥</span> All Deals
          <span class="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full">150+</span>
        </a>
        <a href="/search?q=Smartphones" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
          Mobiles
        </a>
        <a href="/search?q=Laptops" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
          Laptops
        </a>
        <a href="/search?q=Headphones" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
          Audio
        </a>
        <a href="/search?q=Footwear" class="text-xs sm:text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
          Footwear
        </a>
      </nav>

      <!-- Auth Action & Assistant -->
      <div class="flex items-center gap-3">
        <AuthBadge />
      </div>
    </div>
  </div>
</header>

<main class="min-h-[75vh]">
  {@render children()}
</main>

<!-- Floating Chatbot Assistant -->
<Chatbot />

<footer class="bg-white border-t border-border mt-20 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
      <!-- Brand & Mission -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            CW
          </div>
          <span class="text-xl font-black text-text-primary">Copy<span class="text-primary">Web</span></span>
        </div>
        <p class="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
          India's dedicated price-intelligence platform inspired by BuyHatke. We index real-time prices across 150+ electronics, gadgets, and lifestyle products to protect consumers from artificial festival markups.
        </p>
        <div class="flex items-center gap-3 text-xs font-semibold text-text-secondary">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-success"></span>
            150 Live SKUs
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-primary"></span>
            5 Major Stores
          </span>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">Popular Categories</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary">
          <li><a href="/search?q=Smartphones" class="hover:text-primary transition-colors">5G Smartphones</a></li>
          <li><a href="/search?q=Laptops" class="hover:text-primary transition-colors">Gaming Laptops</a></li>
          <li><a href="/search?q=Headphones" class="hover:text-primary transition-colors">ANC Headphones</a></li>
          <li><a href="/search?q=Smartwatches" class="hover:text-primary transition-colors">Smartwatches</a></li>
          <li><a href="/search?q=Televisions" class="hover:text-primary transition-colors">4K OLED TVs</a></li>
        </ul>
      </div>

      <!-- Stores -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">Tracked Stores</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary">
          <li class="flex items-center gap-1.5"><span>🛒</span> Amazon India</li>
          <li class="flex items-center gap-1.5"><span>🛍️</span> Flipkart</li>
          <li class="flex items-center gap-1.5"><span>👗</span> Myntra</li>
          <li class="flex items-center gap-1.5"><span>🔌</span> Croma Electronics</li>
          <li class="flex items-center gap-1.5"><span>✨</span> Ajio Fashion</li>
        </ul>
      </div>

      <!-- Features & AI -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">Intelligence Tech</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary">
          <li>Omnibox URL Search</li>
          <li>Fake Discount Shield</li>
          <li>90-Day Price Graphs</li>
          <li>Shopping AI Assistant</li>
          <li>Target Price Alerts</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
      <p>© 2026 CopyWeb. Built with modern SvelteKit & Tailwind CSS.</p>
      <div class="flex items-center gap-4">
        <a href="/login" class="hover:text-primary">Sign In</a>
        <a href="/register" class="hover:text-primary">Sign Up</a>
        <span class="text-text-secondary/60">•</span>
        <span>Zero affiliate markups</span>
      </div>
    </div>
  </div>
</footer>
