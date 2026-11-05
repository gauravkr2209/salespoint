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

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh] bg-[#0E0B1D]">
	{#if currentUser}
		<!-- Customer Profile Hero Card in Deep Purple -->
		<div class="relative overflow-hidden rounded-3xl bg-[#2A1E4D] border border-[#3A3A52] p-6 sm:p-10 shadow-2xl mb-10 transition-colors">
			<!-- Background glow -->
			<div class="absolute -top-24 -right-24 w-80 h-80 bg-[#5A3B8C]/20 rounded-full blur-3xl pointer-events-none"></div>

			<div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
				<div class="flex items-center gap-5">
					<div class="relative">
						<img
							src={currentUser.avatar}
							alt={currentUser.name}
							class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#140E28] border-2 border-[#8B7CC7]/40 object-cover shadow-xl"
						/>
						<span class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0E0B1D] flex items-center justify-center text-[10px] text-white">
							✓
						</span>
					</div>

					<div>
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<h1 class="text-2xl sm:text-3xl font-black text-white">
								{currentUser.name}
							</h1>
							<span class="bg-[#5A3B8C] text-white border border-[#8B7CC7]/40 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
								Verified Shopper
							</span>
						</div>

						<p class="text-xs sm:text-sm text-[#8E84B0] font-medium">
							{currentUser.email}
						</p>

						<div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#C9C2E3] mt-3">
							<span class="flex items-center gap-1.5 bg-[#140E28] border border-[#3A3A52] px-3 py-1 rounded-full">
								<span>📍</span> {currentUser.city || 'New Delhi'} ({currentUser.pincode || '110001'})
							</span>
							{#if currentUser.phone}
								<span class="flex items-center gap-1.5 bg-[#140E28] border border-[#3A3A52] px-3 py-1 rounded-full">
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
						class="px-4 py-2.5 rounded-xl border border-[#3A3A52] bg-[#140E28] hover:bg-[#34265E] text-[#C9C2E3] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
					>
						<span>✏️</span>
						<span>Edit Profile</span>
					</button>

					<button
						onclick={handleLogout}
						class="px-4 py-2.5 rounded-xl border border-rose-800/60 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
					>
						<span>🚪</span>
						<span>Sign Out</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Profile Tabs -->
		<div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#3A3A52]">
			<button
				onclick={() => activeTab = 'wishlist'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'wishlist'
					? 'bg-[#5A3B8C] text-white border border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/40'
					: 'bg-[#2A1E4D] text-[#C9C2E3] hover:text-white hover:bg-[#34265E] border border-[#3A3A52]'}"
			>
				<span>❤️</span>
				<span>Saved Wishlist</span>
				<span class="text-xs px-2 py-0.5 rounded-full {activeTab === 'wishlist' ? 'bg-[#140E28] text-white' : 'bg-[#140E28] text-[#8B7CC7]'}">
					{wishlistItems.length}
				</span>
			</button>

			<button
				onclick={() => activeTab = 'alerts'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'alerts'
					? 'bg-[#5A3B8C] text-white border border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/40'
					: 'bg-[#2A1E4D] text-[#C9C2E3] hover:text-white hover:bg-[#34265E] border border-[#3A3A52]'}"
			>
				<span>🔔</span>
				<span>Price Drop Alerts</span>
				<span class="text-xs px-2 py-0.5 rounded-full {activeTab === 'alerts' ? 'bg-[#140E28] text-white' : 'bg-[#140E28] text-[#8B7CC7]'}">
					{alertItems.length}
				</span>
			</button>

			<button
				onclick={() => activeTab = 'delivery'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'delivery'
					? 'bg-[#5A3B8C] text-white border border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/40'
					: 'bg-[#2A1E4D] text-[#C9C2E3] hover:text-white hover:bg-[#34265E] border border-[#3A3A52]'}"
			>
				<span>⚡</span>
				<span>10-Min Delivery Pincode</span>
			</button>

			<button
				onclick={() => activeTab = 'stores'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'stores'
					? 'bg-[#5A3B8C] text-white border border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/40'
					: 'bg-[#2A1E4D] text-[#C9C2E3] hover:text-white hover:bg-[#34265E] border border-[#3A3A52]'}"
			>
				<span>🏪</span>
				<span>Preferred Merchants</span>
			</button>

			<button
				onclick={() => activeTab = 'settings'}
				class="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 {activeTab === 'settings'
					? 'bg-[#5A3B8C] text-white border border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/40'
					: 'bg-[#2A1E4D] text-[#C9C2E3] hover:text-white hover:bg-[#34265E] border border-[#3A3A52]'}"
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
									class="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-[#2A1E4D] text-rose-400 hover:bg-rose-950/80 hover:text-white shadow-md flex items-center justify-center transition-all cursor-pointer border border-[#3A3A52]"
									title="Remove from wishlist"
									aria-label="Remove from wishlist"
								>
									✕
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] p-8 shadow-xl">
						<div class="text-5xl mb-3">❤️</div>
						<h3 class="text-lg font-black text-white mb-1">Your Wishlist is Empty</h3>
						<p class="text-xs sm:text-sm text-[#8E84B0] max-w-md mx-auto mb-6">
							Save your favorite chips packets, cold drinks, smartphones, and laptops to track real-time price drops across 8 stores!
						</p>
						<a
							href="/search?q="
							class="inline-flex px-6 py-3 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white font-black text-xs sm:text-sm shadow-md transition-all"
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

							<div class="bg-[#2A1E4D] border border-[#3A3A52] rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
								<div class="flex items-center gap-4">
									<div class="w-16 h-16 rounded-2xl bg-[#140E28] p-2 shrink-0 border border-[#3A3A52] flex items-center justify-center overflow-hidden">
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
										<span class="text-[10px] font-bold uppercase tracking-wider text-[#8B7CC7]">
											{alert.product.brand}
										</span>
										<h4 class="text-sm font-bold text-white line-clamp-1">
											{alert.product.title}
										</h4>
										<div class="flex items-center gap-2 mt-1">
											<span class="text-xs text-[#8E84B0]">
												Current: <strong class="text-white">{formatPrice(currentPrice)}</strong> on {lowest?.store}
											</span>
											<span class="text-[#8E84B0]">•</span>
											<span class="text-xs text-[#8B7CC7] font-bold">
												Target: {formatPrice(alert.targetPrice)}
											</span>
										</div>
									</div>
								</div>

								<div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
									{#if isTriggered}
										<span class="bg-emerald-950/80 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-700 flex items-center gap-1">
											<span>🎉</span> Target Price Met!
										</span>
									{:else}
										<span class="text-xs text-[#8E84B0]">
											Waiting for ₹{currentPrice - alert.targetPrice} drop
										</span>
									{/if}

									<a
										href="/product/{alert.product.id}"
										class="px-3.5 py-1.5 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white text-xs font-bold transition-colors"
									>
										View Deal →
									</a>

									<button
										onclick={() => handleRemoveAlert(alert.product.id)}
										class="p-2 text-[#8E84B0] hover:text-rose-400 rounded-xl hover:bg-rose-950/40 transition-colors cursor-pointer"
										title="Delete alert"
									>
										🗑️
									</button>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] p-8 shadow-xl">
						<div class="text-5xl mb-3">🔔</div>
						<h3 class="text-lg font-black text-white mb-1">No Active Price Alerts</h3>
						<p class="text-xs sm:text-sm text-[#8E84B0] max-w-md mx-auto mb-6">
							Set price alerts on any product page. When a festival discount or flash sale drops the price below your target, we'll notify you immediately!
						</p>
					</div>
				{/if}
			</div>
		{/if}

		<!-- 3. Delivery Pincode Tab -->
		{#if activeTab === 'delivery'}
			<div class="max-w-2xl bg-[#2A1E4D] border border-[#3A3A52] rounded-3xl p-6 sm:p-8 shadow-xl">
				<div class="flex items-center gap-3 mb-6">
					<div class="w-12 h-12 rounded-2xl bg-[#140E28] border border-[#3A3A52] text-emerald-400 flex items-center justify-center text-2xl font-black">
						⚡
					</div>
					<div>
						<h3 class="text-base sm:text-lg font-black text-white">
							10-Minute Delivery Location
						</h3>
						<p class="text-xs text-[#8E84B0]">
							We check real-time warehouse inventory across Blinkit, Zepto, and Flipkart Minutes for your area.
						</p>
					</div>
				</div>

				<form onsubmit={handleSaveProfile} class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label for="profile-city" class="block text-xs font-bold text-[#8B7CC7] mb-1">
								City
							</label>
							<input
								id="profile-city"
								type="text"
								bind:value={editCity}
								placeholder="e.g. New Delhi, Bengaluru, Mumbai"
								class="w-full px-4 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
							/>
						</div>

						<div>
							<label for="profile-pincode" class="block text-xs font-bold text-[#8B7CC7] mb-1">
								6-Digit Pincode
							</label>
							<input
								id="profile-pincode"
								type="text"
								bind:value={editPincode}
								placeholder="e.g. 110001"
								class="w-full px-4 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
							/>
						</div>
					</div>

					<div class="pt-4 flex items-center gap-3">
						<button
							type="submit"
							class="px-6 py-2.5 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
						>
							Save Location Preferences
						</button>
						{#if saveSuccess}
							<span class="text-xs font-bold text-emerald-400 animate-in fade-in">
								✅ Saved!
							</span>
						{/if}
					</div>
				</form>
			</div>
		{/if}

		<!-- 4. Preferred Stores Tab -->
		{#if activeTab === 'stores'}
			<div class="max-w-3xl bg-[#2A1E4D] border border-[#3A3A52] rounded-3xl p-6 sm:p-8 shadow-xl">
				<h3 class="text-base sm:text-lg font-black text-white mb-1">
					Custom Store Preferences
				</h3>
				<p class="text-xs text-[#8E84B0] mb-6">
					Choose which stores you frequently shop at. We prioritize their stock and unit rate comparisons.
				</p>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#each availableStores as store}
						{@const isSelected = (currentUser.preferredStores || []).includes(store)}
						<button
							type="button"
							onclick={() => handleToggleStore(store)}
							class="p-4 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer {isSelected
								? 'bg-[#5A3B8C]/20 border-[#8B7CC7] shadow-sm'
								: 'bg-[#140E28] border-[#3A3A52] hover:border-[#8B7CC7]/60'}"
						>
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-xl bg-[#2A1E4D] border border-[#3A3A52] flex items-center justify-center font-bold text-xs text-white">
									{store.slice(0, 2).toUpperCase()}
								</div>
								<div>
									<h4 class="text-xs sm:text-sm font-bold text-white">{store}</h4>
									<span class="text-[10px] text-[#8E84B0]">
										{store === 'Blinkit' || store === 'Zepto' || store === 'Flipkart Minutes' ? '⚡ 10-Min Quick Commerce' : '📦 E-Commerce Marketplace'}
									</span>
								</div>
							</div>

							<div class="w-5 h-5 rounded-md border flex items-center justify-center {isSelected ? 'bg-[#5A3B8C] border-[#8B7CC7] text-white text-xs' : 'border-[#3A3A52]'}">
								{#if isSelected}✓{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- 5. Settings Tab -->
		{#if activeTab === 'settings'}
			<div class="max-w-2xl bg-[#2A1E4D] border border-[#3A3A52] rounded-3xl p-6 sm:p-8 shadow-xl">
				<h3 class="text-base sm:text-lg font-black text-white mb-1">
					Alert Notifications
				</h3>
				<p class="text-xs text-[#8E84B0] mb-6">
					Manage how and when SalesPoint pings you about price drops and discount verification audits.
				</p>

				<form onsubmit={handleSaveProfile} class="space-y-4">
					<div class="flex items-center justify-between p-4 rounded-2xl bg-[#140E28] border border-[#3A3A52]">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-white">Instant Price Drop Alerts</h4>
							<p class="text-[11px] text-[#8E84B0]">Receive alerts whenever an item in your watch list hits its target price.</p>
						</div>
						<input type="checkbox" bind:checked={notifyPriceDrop} class="w-5 h-5 rounded accent-[#5A3B8C]" />
					</div>

					<div class="flex items-center justify-between p-4 rounded-2xl bg-[#140E28] border border-[#3A3A52]">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-white">Email Digest</h4>
							<p class="text-[11px] text-[#8E84B0]">Weekly breakdown of grocery savings and verified discount alerts.</p>
						</div>
						<input type="checkbox" bind:checked={notifyEmail} class="w-5 h-5 rounded accent-[#5A3B8C]" />
					</div>

					<div class="flex items-center justify-between p-4 rounded-2xl bg-[#140E28] border border-[#3A3A52]">
						<div>
							<h4 class="text-xs sm:text-sm font-bold text-white">WhatsApp Price Pings</h4>
							<p class="text-[11px] text-[#8E84B0]">Instant notification via WhatsApp when a 10-minute flash drop is detected.</p>
						</div>
						<input type="checkbox" bind:checked={notifyWhatsapp} class="w-5 h-5 rounded accent-[#5A3B8C]" />
					</div>

					<div class="pt-4 flex items-center gap-3">
						<button
							type="submit"
							class="px-6 py-2.5 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
						>
							Save Notification Settings
						</button>
						{#if saveSuccess}
							<span class="text-xs font-bold text-emerald-400 animate-in fade-in">
								✅ Saved!
							</span>
						{/if}
					</div>
				</form>
			</div>
		{/if}

	{:else}
		<!-- Guest View in Deep Purple -->
		<div class="max-w-xl mx-auto py-16 text-center bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] p-8 sm:p-12 shadow-2xl">
			<div class="w-16 h-16 rounded-2xl bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] flex items-center justify-center text-3xl mx-auto mb-4">
				👤
			</div>
			<h2 class="text-2xl font-black text-white mb-2">Customer Profile & Saved Alerts</h2>
			<p class="text-xs sm:text-sm text-[#8E84B0] leading-relaxed mb-8">
				Sign in to access your personal price drop alerts, bookmarked grocery items, 10-minute delivery preferences, and unit price history!
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
				<a
					href="/login"
					class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center"
				>
					Sign In
				</a>
				<a
					href="/register"
					class="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#3A3A52] bg-[#140E28] hover:bg-[#34265E] text-white font-bold text-xs sm:text-sm transition-all text-center"
				>
					Create Account
				</a>
				<button
					onclick={handleLoginDemo}
					class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2A1E4D] hover:bg-[#34265E] text-[#8B7CC7] hover:text-white border border-[#3A3A52] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
				>
					Try Demo Profile
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Edit Profile Modal in Deep Purple -->
{#if isEditModalOpen && currentUser}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
		role="dialog"
		aria-modal="true"
		aria-label="Edit Customer Profile"
	>
		<div class="w-full max-w-md bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] p-6 sm:p-8 shadow-2xl relative">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-lg font-black text-white">Edit Customer Profile</h3>
				<button
					onclick={() => isEditModalOpen = false}
					class="p-1.5 rounded-xl text-[#8E84B0] hover:text-white hover:bg-[#34265E] transition-colors"
				>
					✕
				</button>
			</div>

			<form onsubmit={handleSaveProfile} class="space-y-4">
				<div>
					<label for="edit-profile-name" class="block text-xs font-bold text-[#8B7CC7] mb-1">Full Name</label>
					<input
						id="edit-profile-name"
						type="text"
						bind:value={editName}
						class="w-full px-3.5 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
					/>
				</div>

				<div>
					<label for="edit-profile-phone" class="block text-xs font-bold text-[#8B7CC7] mb-1">Phone Number</label>
					<input
						id="edit-profile-phone"
						type="tel"
						bind:value={editPhone}
						placeholder="+91 98765 43210"
						class="w-full px-3.5 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
					/>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="edit-profile-city" class="block text-xs font-bold text-[#8B7CC7] mb-1">City</label>
						<input
							id="edit-profile-city"
							type="text"
							bind:value={editCity}
							class="w-full px-3.5 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
						/>
					</div>
					<div>
						<label for="edit-profile-pincode" class="block text-xs font-bold text-[#8B7CC7] mb-1">Pincode</label>
						<input
							id="edit-profile-pincode"
							type="text"
							bind:value={editPincode}
							class="w-full px-3.5 py-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] text-white text-xs sm:text-sm outline-none focus:border-[#8B7CC7]"
						/>
					</div>
				</div>

				<div class="pt-4 flex items-center justify-end gap-2">
					<button
						type="button"
						onclick={() => isEditModalOpen = false}
						class="px-4 py-2 text-xs font-bold text-[#8E84B0] hover:text-white cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="px-5 py-2.5 rounded-xl bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
