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

  // Close mobile menu on page change
  $effect(() => {
    const _ = page.url.pathname;
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

<header class="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-border/80 dark:border-slate-800 shadow-xs transition-colors">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-18 gap-4">
      <!-- Logo with ample separation -->
      <a href="/" class="flex items-center gap-3 shrink-0 mr-2 sm:mr-4 group">
        <div class="w-9 h-9 bg-gradient-to-tr from-primary to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 group-hover:rotate-2 transition-all">
          <span class="text-white font-black text-sm tracking-wider">SP</span>
        </div>
        <span class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Sales<span class="animated-gradient-text">Point</span>
        </span>
      </a>

      <!-- Desktop / Laptop Nav Links -->
      <nav class="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap">
        <a
          href="/"
          class="text-xs xl:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white px-2 xl:px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all shrink-0"
        >
          Home
        </a>

        {#each navCategories as item}
          <a
            href={item.href}
            class="text-xs xl:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white px-2 xl:px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
            {#if item.badge}
              <span class="hidden 2xl:inline-block text-[10px] font-black bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-300 px-1.5 py-0.2 rounded-full">
                {item.badge}
              </span>
            {/if}
          </a>
        {/each}

        <a
          href="/profile"
          class="hidden xl:flex text-xs xl:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white px-2 xl:px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all items-center gap-1 shrink-0"
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
          class="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-border/80 dark:border-slate-700 cursor-pointer"
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
    <div class="lg:hidden bg-white/95 dark:bg-slate-900/95 border-b border-border/80 dark:border-slate-800 backdrop-blur-2xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
      <div class="space-y-1">
        <a
          href="/"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>🏠</span>
          <span>Home</span>
        </a>

        {#each navCategories as item}
          <a
            href={item.href}
            class="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
            {#if item.badge}
              <span class="text-xs font-black bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-300 px-2.5 py-0.5 rounded-full">
                {item.badge} items
              </span>
            {/if}
          </a>
        {/each}

        <a
          href="/profile"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-primary dark:text-indigo-400 bg-primary/5 dark:bg-indigo-950/40 hover:bg-primary/10 transition-colors"
        >
          <span>👤</span>
          <span>Customer Profile & Price Alerts</span>
        </a>
      </div>
    </div>
  {/if}
</header>

<main class="min-h-[75vh] bg-surface-soft dark:bg-slate-950 text-text-primary dark:text-slate-100 transition-colors">
  {@render children()}
</main>

<!-- Floating Chatbot Assistant -->
<Chatbot />

<footer class="bg-white dark:bg-slate-900 border-t border-border dark:border-slate-800 mt-20 relative overflow-hidden transition-colors">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
      <!-- Brand & Mission -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            SP
          </div>
          <span class="text-xl font-black text-text-primary dark:text-white">Sales<span class="text-primary">Point</span></span>
        </div>
        <p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 leading-relaxed max-w-sm">
          India's smarter multi-category shopping and price intelligence engine. We index real-time prices across 400+ grocery snacks, cold beverages, electronics, and lifestyle products to protect consumers from artificial discounts.
        </p>
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-text-secondary dark:text-slate-400">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-success"></span>
            415 Verified SKUs
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-primary"></span>
            8 Supported Stores
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            10-min Quick Commerce
          </span>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary dark:text-slate-200 mb-3">Food & Beverages</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary dark:text-slate-400">
          <li><a href="/search?category=Chips" class="hover:text-primary dark:hover:text-primary-light transition-colors">Chips & Crisps (116)</a></li>
          <li><a href="/search?category=Soft%20Drinks%20%26%20Sodas" class="hover:text-primary dark:hover:text-primary-light transition-colors">Soft Drinks & Sodas (42)</a></li>
          <li><a href="/search?category=Juices%20%26%20Fruit%20Drinks" class="hover:text-primary dark:hover:text-primary-light transition-colors">Fruit Juices (25)</a></li>
          <li><a href="/search?category=Energy%20%26%20Sports%20Drinks" class="hover:text-primary dark:hover:text-primary-light transition-colors">Energy & Sports Drinks (18)</a></li>
          <li><a href="/search?category=Namkeen%20%26%20Savoury%20Snacks" class="hover:text-primary dark:hover:text-primary-light transition-colors">Namkeen & Bhujia (11)</a></li>
          <li><a href="/search?category=Chocolates%20%26%20Candy" class="hover:text-primary dark:hover:text-primary-light transition-colors">Chocolates & Candy (9)</a></li>
        </ul>
      </div>

      <!-- Stores -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary dark:text-slate-200 mb-3">Tracked Merchants</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary dark:text-slate-400">
          <li class="flex items-center gap-1.5"><span>⚡</span> Blinkit Quick Commerce</li>
          <li class="flex items-center gap-1.5"><span>⚡</span> Zepto 10-Min Grocery</li>
          <li class="flex items-center gap-1.5"><span>⚡</span> Flipkart Minutes</li>
          <li class="flex items-center gap-1.5"><span>🛒</span> Amazon India</li>
          <li class="flex items-center gap-1.5"><span>🛍️</span> Flipkart</li>
          <li class="flex items-center gap-1.5"><span>🔌</span> Croma Electronics</li>
          <li class="flex items-center gap-1.5"><span>👗</span> Myntra Fashion</li>
        </ul>
      </div>

      <!-- Features & AI -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-text-primary dark:text-slate-200 mb-3">Intelligence Tech</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-text-secondary dark:text-slate-400">
          <li>Unit-Price Normalization (₹/100g, ₹/L)</li>
          <li>Blinkit vs Zepto Comparison</li>
          <li>Fake Discount Shield</li>
          <li>90-Day Price Graphs</li>
          <li>Shopping AI Assistant</li>
          <li>Dark / Light / System Mode</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary dark:text-slate-400">
      <p>© 2026 SalesPoint. Multi-Store Shopping Intelligence & Unit Price Comparison.</p>
    </div>
  </div>
</footer>
