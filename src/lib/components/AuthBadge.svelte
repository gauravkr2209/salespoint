<script lang="ts">
	import { onMount } from 'svelte';
	import { getCurrentUser, logoutUser, getWishlistProducts, type User } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	let currentUser = $state<User | null>(null);
	let isMenuOpen = $state(false);
	let wishlistCount = $state(0);

	function updateAuth() {
		currentUser = getCurrentUser();
		wishlistCount = getWishlistProducts().length;
	}

	onMount(() => {
		updateAuth();
		window.addEventListener('salespoint_auth_change', updateAuth);
		window.addEventListener('salespoint_wishlist_change', updateAuth);
		return () => {
			window.removeEventListener('salespoint_auth_change', updateAuth);
			window.removeEventListener('salespoint_wishlist_change', updateAuth);
		};
	});

	function handleLogout() {
		logoutUser();
		isMenuOpen = false;
		goto('/');
	}
</script>

<div class="relative flex items-center gap-2">
	<!-- Wishlist Quick Pill Icon -->
	<a
		href="/profile"
		class="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
		title="Saved Wishlist & Price Alerts"
		aria-label="View Saved Wishlist"
	>
		<span class="text-base">❤️</span>
		{#if wishlistCount > 0}
			<span class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-xs">
				{wishlistCount}
			</span>
		{/if}
	</a>

	{#if currentUser}
		<div class="relative">
			<button
				onclick={() => isMenuOpen = !isMenuOpen}
				class="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-border/80 dark:border-slate-700"
				aria-label="User Account Menu"
				aria-expanded={isMenuOpen}
			>
				<img
					src={currentUser.avatar}
					alt={currentUser.name}
					class="w-7 h-7 rounded-full bg-primary/10 object-cover shadow-2xs"
				/>
				<span class="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline max-w-[100px] truncate">
					{currentUser.name}
				</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if isMenuOpen}
				<!-- Backdrop -->
				<div class="fixed inset-0 z-40" onclick={() => isMenuOpen = false} role="presentation"></div>

				<div class="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-slate-850 rounded-2xl shadow-2xl border border-border/80 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
					<div class="px-4 py-2.5 border-b border-border/60 dark:border-slate-700/60">
						<p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified Shopper</p>
						<p class="text-xs font-extrabold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
						<p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
					</div>

					<a
						href="/profile"
						class="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-primary dark:text-indigo-400 hover:bg-primary/5 dark:hover:bg-slate-750 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>👤</span>
						<span>Customer Profile & Alerts</span>
					</a>

					<a
						href="/profile"
						class="flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span class="flex items-center gap-2"><span>❤️</span> Wishlist Items</span>
						<span class="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{wishlistCount}</span>
					</a>

					<a
						href="/search?q="
						class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🎯</span> Browse All 400+ Products
					</a>

					<button
						onclick={handleLogout}
						class="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-t border-border/40 dark:border-slate-700/60 mt-1"
					>
						<span>🚪</span> Sign Out
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
			<a
				href="/login"
				class="hidden sm:inline-block text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-indigo-400 px-2.5 sm:px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
			>
				Sign In
			</a>
			<a
				href="/register"
				class="text-xs font-bold text-white bg-primary hover:bg-primary-dark px-3 sm:px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 active:scale-95 whitespace-nowrap"
			>
				Sign Up
			</a>
		</div>
	{/if}
</div>
