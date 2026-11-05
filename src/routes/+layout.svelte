<script lang="ts">
  import '../app.css';
  import CampaignStrip from '$lib/components/CampaignStrip.svelte';
  import AuthBadge from '$lib/components/AuthBadge.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Chatbot from '$lib/components/Chatbot.svelte';
  import AnimatedCursor from '$lib/components/AnimatedCursor.svelte';
  import { page } from '$app/state';

  let { children } = $props();
  let isMobileMenuOpen = $state(false);

  // Close mobile menu on page change or query param change
  $effect(() => {
    const _ = page.url.href;
    isMobileMenuOpen = false;
  });

  const navCategories = [
    { label: 'All Deals', href: '/search?q=', emoji: '🔥', badge: '400+' },
    { label: 'Chips', href: '/search?category=Chips', emoji: '🥔', badge: '116' },
    { label: 'Drinks', href: '/search?category=Soft%20Drinks%20%26%20Sodas', emoji: '🥤', badge: '110' },
    { label: 'Snacks', href: '/search?category=Namkeen%20%26%20Savoury%20Snacks', emoji: '🍿' },
    { label: 'Mobiles', href: '/search?q=Smartphones', emoji: '📱' },
    { label: 'Laptops', href: '/search?q=Laptops', emoji: '💻' }
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <title>SalesPoint — India's Smartest Multi-Store Price Comparison Engine</title>
  <meta name="description" content="Compare real-time prices across 400+ products including groceries, chips, drinks, electronics, and fashion across Amazon, Flipkart, Blinkit, Zepto, Flipkart Minutes, Croma & Myntra." />
</svelte:head>

<!-- Custom 3D Animated Cursor -->
<AnimatedCursor />

<CampaignStrip />

<header class="sticky top-0 z-40 bg-[#0E0B1D]/90 backdrop-blur-xl border-b border-[#3A3A52] shadow-xl transition-colors">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20 gap-4">
      <!-- Logo with ample separation -->
      <a href="/" class="flex items-center gap-3 shrink-0 mr-2 sm:mr-4 group">
        <div class="w-10 h-10 bg-gradient-to-tr from-[#5A3B8C] to-[#8B7CC7] rounded-xl flex items-center justify-center shadow-lg shadow-[#5A3B8C]/40 group-hover:scale-105 transition-all border border-[#8B7CC7]/40">
          <span class="text-white font-black text-sm tracking-wider">SP</span>
        </div>
        <span class="text-xl sm:text-2xl font-black text-white tracking-tight">
          Sales<span class="animated-gradient-text">Point</span>
        </span>
      </a>

      <!-- Desktop / Laptop Nav Links -->
      <nav class="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap">
        <a
          href="/"
          class="text-xs xl:text-sm font-bold text-[#C9C2E3] hover:text-white px-3 py-2 rounded-xl hover:bg-[#2A1E4D] border border-transparent hover:border-[#3A3A52] transition-all shrink-0"
        >
          Home
        </a>

        {#each navCategories as item}
          <a
            href={item.href}
            class="text-xs xl:text-sm font-bold text-[#C9C2E3] hover:text-white px-3 py-2 rounded-xl hover:bg-[#2A1E4D] border border-transparent hover:border-[#3A3A52] transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
            {#if item.badge}
              <span class="hidden 2xl:inline-block text-[10px] font-black bg-[#140E28] text-[#8B7CC7] border border-[#3A3A52] px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            {/if}
          </a>
        {/each}

        <a
          href="/profile"
          class="hidden xl:flex text-xs xl:text-sm font-bold text-[#C9C2E3] hover:text-white px-3 py-2 rounded-xl hover:bg-[#2A1E4D] border border-transparent hover:border-[#3A3A52] transition-all items-center gap-1.5 shrink-0"
        >
          <span>👤</span>
          <span>Profile</span>
        </a>
      </nav>

      <!-- Right Controls: Theme + Wishlist + Auth + Mobile Menu Toggle -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
        <ThemeToggle />
        <AuthBadge />

        <!-- Mobile & Tablet Hamburger Button -->
        <button
          onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
          class="lg:hidden p-2 rounded-xl text-[#C9C2E3] hover:text-white bg-[#2A1E4D] hover:bg-[#34265E] transition-colors border border-[#3A3A52] cursor-pointer"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {#if isMobileMenuOpen}
            <!-- Close Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <!-- Hamburger Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile / Tablet Drawer Menu -->
  {#if isMobileMenuOpen}
    <div class="lg:hidden bg-[#0E0B1D]/95 border-b border-[#3A3A52] backdrop-blur-2xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
      <div class="space-y-1.5">
        <a
          href="/"
          onclick={() => isMobileMenuOpen = false}
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-white bg-[#140E28] border border-[#3A3A52] hover:bg-[#2A1E4D] transition-colors"
        >
          <span>🏠</span>
          <span>Home</span>
        </a>

        {#each navCategories as item}
          <a
            href={item.href}
            onclick={() => isMobileMenuOpen = false}
            class="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-[#C9C2E3] hover:text-white bg-[#140E28] border border-[#3A3A52] hover:bg-[#2A1E4D] transition-colors"
          >
            <div class="flex items-center gap-3">
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
            {#if item.badge}
              <span class="text-xs font-black bg-[#2A1E4D] text-[#8B7CC7] border border-[#3A3A52] px-2.5 py-0.5 rounded-full">
                {item.badge} items
              </span>
            {/if}
          </a>
        {/each}

        <a
          href="/profile"
          onclick={() => isMobileMenuOpen = false}
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-white bg-[#5A3B8C] border border-[#8B7CC7]/40 hover:bg-[#6D47A6] transition-colors shadow-sm"
        >
          <span>👤</span>
          <span>Customer Profile & Price Alerts</span>
        </a>
      </div>
    </div>
  {/if}
</header>

<main class="min-h-[75vh] bg-[#0E0B1D] text-[#C9C2E3] transition-colors">
  {@render children()}
</main>

<!-- Floating Chatbot Assistant -->
<Chatbot />

<footer class="bg-[#0E0B1D] border-t border-[#3A3A52] mt-20 relative overflow-hidden transition-colors">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
      <!-- Brand & Mission -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-tr from-[#5A3B8C] to-[#8B7CC7] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm border border-[#8B7CC7]/40">
            SP
          </div>
          <span class="text-xl font-black text-white">Sales<span class="animated-gradient-text">Point</span></span>
        </div>
        <p class="text-xs sm:text-sm text-[#8E84B0] leading-relaxed max-w-sm">
          India's smarter multi-category shopping and price intelligence engine. We index real-time prices across 400+ grocery snacks, cold beverages, electronics, and lifestyle products to protect consumers from artificial discounts.
        </p>
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#C9C2E3]">
          <span class="flex items-center gap-1.5 bg-[#140E28] px-3 py-1.5 rounded-full border border-[#3A3A52]">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            415 Verified SKUs
          </span>
          <span class="flex items-center gap-1.5 bg-[#140E28] px-3 py-1.5 rounded-full border border-[#3A3A52]">
            <span class="w-2 h-2 rounded-full bg-[#8B7CC7]"></span>
            8 Supported Stores
          </span>
          <span class="flex items-center gap-1.5 bg-[#140E28] px-3 py-1.5 rounded-full border border-[#3A3A52]">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            10-min Quick Commerce
          </span>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h4 class="text-xs font-black uppercase tracking-wider text-[#8B7CC7] mb-4">Food & Beverages</h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#8E84B0]">
          <li><a href="/search?category=Chips" class="hover:text-white transition-colors">Chips & Crisps (116)</a></li>
          <li><a href="/search?category=Soft%20Drinks%20%26%20Sodas" class="hover:text-white transition-colors">Soft Drinks & Sodas (42)</a></li>
          <li><a href="/search?category=Juices%20%26%20Fruit%20Drinks" class="hover:text-white transition-colors">Fruit Juices (25)</a></li>
          <li><a href="/search?category=Energy%20%26%20Sports%20Drinks" class="hover:text-white transition-colors">Energy & Sports Drinks (18)</a></li>
          <li><a href="/search?category=Namkeen%20%26%20Savoury%20Snacks" class="hover:text-white transition-colors">Namkeen & Bhujia (11)</a></li>
          <li><a href="/search?category=Chocolates%20%26%20Candy" class="hover:text-white transition-colors">Chocolates & Candy (9)</a></li>
        </ul>
      </div>

      <!-- Stores -->
      <div>
        <h4 class="text-xs font-black uppercase tracking-wider text-[#8B7CC7] mb-4">Tracked Merchants</h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#8E84B0]">
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>⚡</span> Blinkit Quick Commerce</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>⚡</span> Zepto 10-Min Grocery</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>⚡</span> Flipkart Minutes</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>🛒</span> Amazon India</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>🛍️</span> Flipkart</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>🔌</span> Croma Electronics</li>
          <li class="flex items-center gap-2 text-[#C9C2E3]"><span>👗</span> Myntra Fashion</li>
        </ul>
      </div>

      <!-- Features & AI -->
      <div>
        <h4 class="text-xs font-black uppercase tracking-wider text-[#8B7CC7] mb-4">Intelligence Tech</h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#8E84B0]">
          <li>Unit-Price Normalization (₹/100g, ₹/L)</li>
          <li>Blinkit vs Zepto Comparison</li>
          <li>Fake Discount Shield</li>
          <li>90-Day Price Graphs</li>
          <li>Shopping AI Assistant</li>
          <li>Dark Midnight Purple Mode</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-[#3A3A52] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E84B0]">
      <p>© 2026 SalesPoint. Multi-Store Shopping Intelligence & Unit Price Comparison.</p>
    </div>
  </div>
</footer>
