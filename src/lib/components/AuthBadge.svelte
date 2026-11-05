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
		class="relative p-2 rounded-xl text-[#C9C2E3] hover:text-[#8B7CC7] bg-[#2A1E4D]/80 hover:bg-[#34265E] border border-[#3A3A52] transition-colors cursor-pointer"
		title="Saved Wishlist & Price Alerts"
		aria-label="View Saved Wishlist"
	>
		<span class="text-base">❤️</span>
		{#if wishlistCount > 0}
			<span class="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#5A3B8C] text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-[#0E0B1D] shadow-xs">
				{wishlistCount}
			</span>
		{/if}
	</a>

	{#if currentUser}
		<div class="relative">
			<button
				onclick={() => isMenuOpen = !isMenuOpen}
				class="flex items-center gap-2 p-1.5 px-2.5 rounded-xl bg-[#2A1E4D]/80 hover:bg-[#34265E] border border-[#3A3A52] transition-colors cursor-pointer"
				aria-label="User Account Menu"
				aria-expanded={isMenuOpen}
			>
				<img
					src={currentUser.avatar}
					alt={currentUser.name}
					class="w-6 h-6 rounded-full bg-[#5A3B8C]/40 object-cover border border-[#8B7CC7]/40"
				/>
				<span class="text-xs font-bold text-[#C9C2E3] hidden sm:inline max-w-[100px] truncate">
					{currentUser.name}
				</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#8B7CC7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if isMenuOpen}
				<!-- Backdrop -->
				<div class="fixed inset-0 z-40" onclick={() => isMenuOpen = false} role="presentation"></div>

				<div class="absolute right-0 top-full mt-2 w-64 bg-[#2A1E4D] rounded-2xl shadow-2xl border border-[#3A3A52] py-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
					<div class="px-4 py-3 border-b border-[#3A3A52]">
						<p class="text-[10px] font-black uppercase tracking-wider text-[#8B7CC7]">Verified Shopper</p>
						<p class="text-xs font-black text-white truncate">{currentUser.name}</p>
						<p class="text-[11px] text-[#C9C2E3]/70 truncate">{currentUser.email}</p>
					</div>

					<a
						href="/profile"
						class="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>👤</span>
						<span>Customer Profile & Alerts</span>
					</a>

					<a
						href="/profile"
						class="flex items-center justify-between px-4 py-2 text-xs font-semibold text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span class="flex items-center gap-2"><span>❤️</span> Wishlist Items</span>
						<span class="text-[10px] bg-[#140E28] text-[#8B7CC7] border border-[#3A3A52] px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>
					</a>

					<a
						href="/search?q="
						class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🎯</span> Browse All 400+ Products
					</a>

					<button
						onclick={handleLogout}
						class="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer border-t border-[#3A3A52] mt-1"
					>
						<span>🚪</span> Sign Out
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center gap-2 whitespace-nowrap">
			<a
				href="/login"
				class="hidden sm:inline-block text-xs font-bold text-[#C9C2E3] hover:text-white bg-[#2A1E4D]/80 hover:bg-[#34265E] border border-[#3A3A52] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap"
			>
				Sign In
			</a>
			<a
				href="/register"
				class="text-xs font-bold text-white bg-[#5A3B8C] hover:bg-[#6D47A6] px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-md shadow-[#5A3B8C]/25 hover:shadow-lg hover:shadow-[#5A3B8C]/40 active:scale-95 whitespace-nowrap border border-[#8B7CC7]/30"
			>
				Sign Up
			</a>
		</div>
	{/if}
</div>
