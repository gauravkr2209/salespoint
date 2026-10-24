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
		window.addEventListener('copyweb_auth_change', updateAuth);
		return () => {
			window.removeEventListener('copyweb_auth_change', updateAuth);
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
				class="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border border-border"
			>
				<img
					src={currentUser.avatar}
					alt={currentUser.name}
					class="w-7 h-7 rounded-full bg-primary/10 object-cover"
				/>
				<span class="text-xs font-semibold text-text-primary hidden sm:inline max-w-[100px] truncate">
					{currentUser.name}
				</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if isMenuOpen}
				<div class="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95">
					<div class="px-4 py-2 border-b border-border/60">
						<p class="text-xs text-text-secondary">Signed in as</p>
						<p class="text-sm font-bold text-text-primary truncate">{currentUser.email}</p>
					</div>
					<a
						href="/search?q="
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-text-primary hover:bg-slate-50 transition-colors"
						onclick={() => isMenuOpen = false}
					>
						<span>🎯</span> Browse All 150 Deals
					</a>
					<button
						onclick={handleLogout}
						class="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-danger hover:bg-red-50 transition-colors cursor-pointer"
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
				class="text-xs font-semibold text-text-secondary hover:text-primary px-3 py-2 rounded-lg transition-colors"
			>
				Sign In
			</a>
			<a
				href="/register"
				class="text-xs font-semibold text-white bg-primary hover:bg-primary-dark px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 active:scale-95"
			>
				Sign Up
			</a>
		</div>
	{/if}
</div>
