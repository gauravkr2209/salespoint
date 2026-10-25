<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getCurrentUser,
		updateUserProfile,
		logoutUser,
		getWishlistProducts,
		getUserPriceAlerts,
		removePriceAlert,
		toggleWishlist,
		authenticateUser,
		type User
	} from '$lib/auth/store';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';
	import { getProductImageUrl, getFallbackImage } from '$lib/utils/productImages';
	import { getLowestStorePrice, type Product } from '$lib/data/products';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { goto } from '$app/navigation';
	import type { StoreName } from '$lib/types';

	let currentUser = $state<User | null>(null);
	let activeTab = $state<'wishlist' | 'alerts' | 'delivery' | 'stores' | 'settings'>('wishlist');

	let wishlistItems = $state<Product[]>([]);
	let alertItems = $state<Array<{ product: Product; targetPrice: number; createdAt: string }>>([]);

	// Edit Profile Form State
	let isEditModalOpen = $state(false);
	let editName = $state('');
	let editPhone = $state('');
	let editCity = $state('');
	let editPincode = $state('');
	let saveSuccess = $state(false);

	// Notification toggles
	let notifyEmail = $state(true);
	let notifyWhatsapp = $state(true);
	let notifyPriceDrop = $state(true);

	const availableStores: StoreName[] = [
		'Blinkit',
		'Zepto',
		'Flipkart Minutes',
		'Amazon',
		'Flipkart',
		'Croma',
		'Myntra',
		'Ajio'
	];

	function refreshData() {
		currentUser = getCurrentUser();
		if (currentUser) {
			editName = currentUser.name || '';
			editPhone = currentUser.phone || '';
			editCity = currentUser.city || 'New Delhi';
			editPincode = currentUser.pincode || '110001';
			notifyEmail = currentUser.notificationPreferences?.email ?? true;
			notifyWhatsapp = currentUser.notificationPreferences?.whatsapp ?? true;
			notifyPriceDrop = currentUser.notificationPreferences?.priceDropInstant ?? true;
		}
		wishlistItems = getWishlistProducts();
		alertItems = getUserPriceAlerts();
	}

	onMount(() => {
		refreshData();

		window.addEventListener('salespoint_auth_change', refreshData);
		window.addEventListener('salespoint_wishlist_change', refreshData);
		window.addEventListener('salespoint_alerts_change', refreshData);

		return () => {
			window.removeEventListener('salespoint_auth_change', refreshData);
			window.removeEventListener('salespoint_wishlist_change', refreshData);
			window.removeEventListener('salespoint_alerts_change', refreshData);
		};
	});

	function handleSaveProfile(e: SubmitEvent) {
		e.preventDefault();
		updateUserProfile({
			name: editName.trim(),
			phone: editPhone.trim(),
			city: editCity.trim(),
			pincode: editPincode.trim(),
			notificationPreferences: {
				email: notifyEmail,
				whatsapp: notifyWhatsapp,
				priceDropInstant: notifyPriceDrop
			}
		});
		saveSuccess = true;
		setTimeout(() => {
			saveSuccess = false;
			isEditModalOpen = false;
		}, 800);
	}

	function handleToggleStore(store: StoreName) {
		if (!currentUser) return;
		const current = currentUser.preferredStores || [];
		const updated = current.includes(store) ? current.filter((s) => s !== store) : [...current, store];
		updateUserProfile({ preferredStores: updated });
		refreshData();
	}

	function handleRemoveWishlist(productId: string) {
		toggleWishlist(productId);
		wishlistItems = getWishlistProducts();
	}

	function handleRemoveAlert(productId: string) {
		removePriceAlert(productId);
		alertItems = getUserPriceAlerts();
	}

	function handleLogout() {
		logoutUser();
		goto('/');
	}

	function handleLoginDemo() {
		authenticateUser('demo@salespoint.in', 'password123');
		refreshData();
	}
</script>

<svelte:head>
	<title>Customer Profile & Saved Alerts — SalesPoint</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh]">
	{#if currentUser}
		<!-- Customer Profile Hero Card -->
		<div class="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 p-6 sm:p-10 shadow-xl mb-10 transition-colors">
			<!-- Background glow -->
			<div class="absolute -top-24 -right-24 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

			<div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
				<div class="flex items-center gap-5">
					<div class="relative">
						<img
							src={currentUser.avatar}
							alt={currentUser.name}
							class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 border-2 border-primary/30 object-cover shadow-lg"
						/>
						<span class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
							✓
						</span>
					</div>

					<div>
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
								{currentUser.name}
							</h1>
							<span class="bg-primary/10 dark:bg-primary/20 text-primary dark:text-indigo-400 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
								Verified Shopper
							</span>
						</div>

						<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
							{currentUser.email}
						</p>

						<div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 mt-3">
							<span class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
								<span>📍</span> {currentUser.city || 'New Delhi'} ({currentUser.pincode || '110001'})
							</span>
							{#if currentUser.phone}
								<span class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
									<span>📱</span> {currentUser.phone}
								</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-3">
					<button
						onclick={() => isEditModalOpen = true}
						class="px-4 py-2.5 rounded-xl border border-border/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
					>
						<span>✏️</span>
						<span>Edit Profile</span>
					</button>

					<button
						onclick={handleLogout}
						class="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
					>
						<span>🚪</span>
						<span>Sign Out</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Profile Tabs -->
		<div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/80 dark:border-slate-800">
			<button
				onclick={() => activeTab = 'wishlist'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'wishlist'
					? 'bg-primary text-white shadow-md shadow-primary/30'
					: 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/60 dark:border-slate-800'}"
			>
				<span>❤️</span>
				<span>Saved Wishlist</span>
				<span class="text-xs px-2 py-0.2 rounded-full {activeTab === 'wishlist' ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}">
					{wishlistItems.length}
				</span>
			</button>

			<button
				onclick={() => activeTab = 'alerts'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'alerts'
					? 'bg-primary text-white shadow-md shadow-primary/30'
					: 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/60 dark:border-slate-800'}"
			>
				<span>🔔</span>
				<span>Price Drop Alerts</span>
				<span class="text-xs px-2 py-0.2 rounded-full {activeTab === 'alerts' ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}">
					{alertItems.length}
				</span>
			</button>

			<button
				onclick={() => activeTab = 'delivery'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'delivery'
					? 'bg-primary text-white shadow-md shadow-primary/30'
					: 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/60 dark:border-slate-800'}"
			>
				<span>⚡</span>
				<span>10-Min Delivery Pincode</span>
			</button>

			<button
				onclick={() => activeTab = 'stores'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'stores'
					? 'bg-primary text-white shadow-md shadow-primary/30'
					: 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/60 dark:border-slate-800'}"
			>
				<span>🏪</span>
				<span>Preferred Merchants</span>
			</button>

			<button
				onclick={() => activeTab = 'settings'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'settings'
					? 'bg-primary text-white shadow-md shadow-primary/30'
					: 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/60 dark:border-slate-800'}"
			>
				<span>⚙️</span>
				<span>Notification Preferences</span>
			</button>
		</div>

		<!-- TAB CONTENT -->

		<!-- 1. Wishlist Tab -->
		{#if activeTab === 'wishlist'}
			<div>
				{#if wishlistItems.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
						{#each wishlistItems as product (product.id)}
							<div class="relative group">
								<ProductCard {product} />
								<button
									onclick={() => handleRemoveWishlist(product.id)}
									class="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-red-500 hover:bg-red-500 hover:text-white shadow-md flex items-center justify-center transition-all cursor-pointer border border-border/60"
									title="Remove from wishlist"
									aria-label="Remove from wishlist"
								>
									✕
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-border/80 dark:border-slate-800 p-8">
						<div class="text-5xl mb-3">❤️</div>
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">Your Wishlist is Empty</h3>
						<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
							Save your favorite chips packets, cold drinks, smartphones, and laptops to track real-time price drops across 8 stores!
						</p>
						<a
							href="/search?q="
							class="inline-flex px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm shadow-md transition-all"
						>
							Explore 400+ Verified Deals →
						</a>
					</div>
				{/if}
			</div>
		{/if}

		<!-- 2. Price Drop Alerts Tab -->
		{#if activeTab === 'alerts'}
			<div>
				{#if alertItems.length > 0}
					<div class="space-y-4 max-w-4xl">
						{#each alertItems as alert (alert.product.id)}
							{@const lowest = getLowestStorePrice(alert.product)}
							{@const currentPrice = lowest?.price ?? 0}
							{@const isTriggered = currentPrice <= alert.targetPrice}

							<div class="bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
								<div class="flex items-center gap-4">
									<div class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2 shrink-0 border border-border/60 dark:border-slate-700 flex items-center justify-center overflow-hidden">
										<img
											src={getProductImageUrl(alert.product)}
											alt={alert.product.title}
											class="max-w-full max-h-full object-contain"
											onerror={(e) => {
												(e.currentTarget as HTMLImageElement).src = getFallbackImage(alert.product.category);
											}}
										/>
									</div>

									<div>
										<span class="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-indigo-400">
											{alert.product.brand}
										</span>
										<h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
											{alert.product.title}
										</h4>
										<div class="flex items-center gap-2 mt-1">
											<span class="text-xs text-slate-500 dark:text-slate-400">
												Current: <strong class="text-slate-900 dark:text-white">{formatPrice(currentPrice)}</strong> on {lowest?.store}
											</span>
											<span>•</span>
											<span class="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
												Target: {formatPrice(alert.targetPrice)}
											</span>
										</div>
									</div>
								</div>

								<div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
									{#if isTriggered}
										<span class="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
											<span>🎉</span> Target Price Met!
										</span>
									{:else}
										<span class="text-xs text-slate-500 dark:text-slate-400">
											Waiting for ₹{currentPrice - alert.targetPrice} drop
										</span>
									{/if}

									<a
										href="/product/{alert.product.id}"
										class="px-3.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary dark:text-indigo-300 text-xs font-bold transition-colors"
									>
										View Deal →
									</a>

									<button
										onclick={() => handleRemoveAlert(alert.product.id)}
										class="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
										title="Delete alert"
									>
										🗑️
									</button>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-border/80 dark:border-slate-800 p-8">
						<div class="text-5xl mb-3">🔔</div>
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">No Active Price Alerts</h3>
						<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
							Set price alerts on any product page. When a festival discount or flash sale drops the price below your target, we'll notify you immediately!
						</p>
					</div>
				{/if}
			</div>
		{/if}

		<!-- 3. Delivery Pincode Tab -->
		{#if activeTab === 'delivery'}
			<div class="max-w-2xl bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
				<div class="flex items-center gap-3 mb-6">
					<div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-black">
						⚡
					</div>
					<div>
						<h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">
							10-Minute Delivery Location
						</h3>
						<p class="text-xs text-slate-500 dark:text-slate-400">
							We check real-time warehouse inventory across Blinkit, Zepto, and Flipkart Minutes for your area.
						</p>
					</div>
				</div>

				<form onsubmit={handleSaveProfile} class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label for="profile-city" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
								City
							</label>
							<input
								id="profile-city"
								type="text"
								bind:value={editCity}
								placeholder="e.g. New Delhi, Bengaluru, Mumbai"
								class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
							/>
						</div>

						<div>
							<label for="profile-pincode" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
								6-Digit Pincode
							</label>
							<input
								id="profile-pincode"
								type="text"
								bind:value={editPincode}
								placeholder="e.g. 110001"
								class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
							/>
						</div>
					</div>

					<div class="pt-4 flex items-center gap-3">
						<button
							type="submit"
							class="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
						>
							Save Location Preferences
						</button>
						{#if saveSuccess}
							<span class="text-xs font-bold text-emerald-500 animate-in fade-in">
								✅ Saved!
							</span>
						{/if}
					</div>
				</form>
			</div>
		{/if}

		<!-- 4. Preferred Stores Tab -->
		{#if activeTab === 'stores'}
			<div class="max-w-3xl bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
				<h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
					Custom Store Preferences
				</h3>
				<p class="text-xs text-slate-500 dark:text-slate-400 mb-6">
					Choose which stores you frequently shop at. We prioritize their stock and unit rate comparisons.
				</p>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#each availableStores as store}
						{@const isSelected = (currentUser.preferredStores || []).includes(store)}
						<button
							type="button"
							onclick={() => handleToggleStore(store)}
							class="p-4 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer {isSelected
								? 'bg-primary/5 dark:bg-indigo-950/30 border-primary dark:border-indigo-500/60 shadow-xs'
								: 'bg-slate-50 dark:bg-slate-850 border-border/80 dark:border-slate-800 hover:border-slate-400'}"
						>
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-border/60 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-white">
									{store.slice(0, 2).toUpperCase()}
								</div>
								<div>
									<h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{store}</h4>
									<span class="text-[10px] text-slate-500 dark:text-slate-400">
										{store === 'Blinkit' || store === 'Zepto' || store === 'Flipkart Minutes' ? '⚡ 10-Min Quick Commerce' : '📦 E-Commerce Marketplace'}
									</span>
								</div>
							</div>

							<div class="w-5 h-5 rounded-md border flex items-center justify-center {isSelected ? 'bg-primary border-primary text-white text-xs' : 'border-slate-400'}">
								{#if isSelected}✓{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- 5. Settings Tab -->
		{#if activeTab === 'settings'}
			<div class="max-w-2xl bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
				<h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
					Alert Notifications
				</h3>
				<p class="text-xs text-slate-500 dark:text-slate-400 mb-6">
					Manage how and when SalesPoint pings you about price drops and discount verification audits.
				</p>

				<form onsubmit={handleSaveProfile} class="space-y-4">
					<div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-border/60 dark:border-slate-800">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Instant Price Drop Alerts</h4>
							<p class="text-[11px] text-slate-500 dark:text-slate-400">Receive alerts whenever an item in your watch list hits its target price.</p>
						</div>
						<input type="checkbox" bind:checked={notifyPriceDrop} class="w-5 h-5 rounded text-primary" />
					</div>

					<div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-border/60 dark:border-slate-800">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Email Digest</h4>
							<p class="text-[11px] text-slate-500 dark:text-slate-400">Weekly breakdown of grocery savings and verified discount alerts.</p>
						</div>
						<input type="checkbox" bind:checked={notifyEmail} class="w-5 h-5 rounded text-primary" />
					</div>

					<div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-border/60 dark:border-slate-800">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">WhatsApp Price Pings</h4>
							<p class="text-[11px] text-slate-500 dark:text-slate-400">Instant notification via WhatsApp when a 10-minute flash drop is detected.</p>
						</div>
						<input type="checkbox" bind:checked={notifyWhatsapp} class="w-5 h-5 rounded text-primary" />
					</div>

					<div class="pt-4 flex items-center gap-3">
						<button
							type="submit"
							class="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
						>
							Save Notification Settings
						</button>
						{#if saveSuccess}
							<span class="text-xs font-bold text-emerald-500 animate-in fade-in">
								✅ Saved!
							</span>
						{/if}
					</div>
				</form>
			</div>
		{/if}

	{:else}
		<!-- Guest View -->
		<div class="max-w-xl mx-auto py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-border/80 dark:border-slate-800 p-8 sm:p-12 shadow-xl">
			<div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto mb-4">
				👤
			</div>
			<h2 class="text-2xl font-black text-slate-900 dark:text-white mb-2">Customer Profile & Saved Alerts</h2>
			<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
				Sign in to access your personal price drop alerts, bookmarked grocery items, 10-minute delivery preferences, and unit price history!
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
				<a
					href="/login"
					class="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center"
				>
					Sign In
				</a>
				<a
					href="/register"
					class="w-full sm:w-auto px-6 py-3 rounded-xl border border-border/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all text-center"
				>
					Create Account
				</a>
				<button
					onclick={handleLoginDemo}
					class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
				>
					Try Demo Profile
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Edit Profile Modal -->
{#if isEditModalOpen && currentUser}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
		role="dialog"
		aria-modal="true"
		aria-label="Edit Customer Profile"
	>
		<div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-border/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-lg font-black text-slate-900 dark:text-white">Edit Customer Profile</h3>
				<button
					onclick={() => isEditModalOpen = false}
					class="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
				>
					✕
				</button>
			</div>

			<form onsubmit={handleSaveProfile} class="space-y-4">
				<div>
					<label for="edit-profile-name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
					<input
						id="edit-profile-name"
						type="text"
						bind:value={editName}
						class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
					/>
				</div>

				<div>
					<label for="edit-profile-phone" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
					<input
						id="edit-profile-phone"
						type="tel"
						bind:value={editPhone}
						placeholder="+91 98765 43210"
						class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
					/>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="edit-profile-city" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
						<input
							id="edit-profile-city"
							type="text"
							bind:value={editCity}
							class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
						/>
					</div>
					<div>
						<label for="edit-profile-pincode" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pincode</label>
						<input
							id="edit-profile-pincode"
							type="text"
							bind:value={editPincode}
							class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-primary"
						/>
					</div>
				</div>

				<div class="pt-4 flex items-center justify-end gap-2">
					<button
						type="button"
						onclick={() => isEditModalOpen = false}
						class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
