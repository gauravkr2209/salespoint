<script lang="ts">
	import { onMount } from 'svelte';
	import { getCurrentUser, logoutUser, type User } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	let currentUser = $state<User | null>(null);
	let isMenuOpen = $state(false);

	function updateAuth() {
		currentUser = getCurrentUser();
	}

	onMount(() => {
		updateAuth();
		window.addEventListener('salespoint_auth_change', updateAuth);
		return () => {
			window.removeEventListener('salespoint_auth_change', updateAuth);
		};
	});

	function handleLogout() {
		logoutUser();
		isMenuOpen = false;
		goto('/');
	}
</script>

<div class="relative">
	{#if currentUser}
		<div class="flex items-center gap-3">
			<button
				onclick={() => isMenuOpen = !isMenuOpen}
				class="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-border/80 dark:border-slate-700"
			>
				<img
					src={currentUser.avatar}
					alt={currentUser.name}
					class="w-7 h-7 rounded-full bg-primary/10 object-cover"
				/>
				<span class="text-xs font-bold text-text-primary dark:text-slate-200 hidden sm:inline max-w-[100px] truncate">
					{currentUser.name}
				</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-secondary dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if isMenuOpen}
				<!-- Backdrop -->
				<div class="fixed inset-0 z-40" onclick={() => isMenuOpen = false} role="presentation"></div>

				<div class="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-border/80 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
					<div class="px-4 py-2 border-b border-border/60 dark:border-slate-700/60">
						<p class="text-[11px] text-text-secondary dark:text-slate-400">Signed in as</p>
						<p class="text-xs font-bold text-text-primary dark:text-white truncate">{currentUser.email}</p>
					</div>
					<a
						href="/search?q="
						class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🎯</span> Browse All 400+ Products
					</a>
					<a
						href="/search?q=Chips"
						class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🥔</span> Compare Chips & Snacks
					</a>
					<a
						href="/search?q=Drinks"
						class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🥤</span> Compare Beverages
					</a>
					<button
						onclick={handleLogout}
						class="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-t border-border/40 dark:border-slate-700/60 mt-1"
					>
						<span>🚪</span> Sign Out
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center gap-2">
			<a
				href="/login"
				class="text-xs font-bold text-text-secondary dark:text-slate-300 hover:text-primary dark:hover:text-indigo-400 px-3 py-2 rounded-xl transition-colors"
			>
				Sign In
			</a>
			<a
				href="/register"
				class="text-xs font-bold text-white bg-primary hover:bg-primary-dark px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 active:scale-95"
			>
				Sign Up
			</a>
		</div>
	{/if}
</div>
