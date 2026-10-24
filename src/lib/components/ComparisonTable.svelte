<script lang="ts">
	import type { Product } from '$lib/data/products';
	import type { StoreName } from '$lib/types';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';

	let { product }: { product: Product } = $props();

	/** Store visual config */
	const storeConfig: Record<StoreName, { emoji: string; color: string; badge?: string }> = {
		Amazon: { emoji: '📦', color: 'text-amber-600 dark:text-amber-400' },
		Flipkart: { emoji: '🛒', color: 'text-blue-600 dark:text-blue-400' },
		Myntra: { emoji: '👗', color: 'text-pink-600 dark:text-pink-400' },
		Croma: { emoji: '🖥️', color: 'text-emerald-600 dark:text-emerald-400' },
		Ajio: { emoji: '👟', color: 'text-slate-700 dark:text-slate-300' },
		Blinkit: { emoji: '⚡', color: 'text-amber-500 font-bold', badge: '10 Mins' },
		Zepto: { emoji: '🚀', color: 'text-purple-600 dark:text-purple-400 font-bold', badge: 'Instant' },
		'Flipkart Minutes': { emoji: '⏱️', color: 'text-green-600 dark:text-green-400 font-bold', badge: 'Minutes' }
	};

	/** Sorted store prices (ascending by price) */
	let sortedPrices = $derived(
		[...product.storePrices].sort((a, b) => {
			if (a.inStock && !b.inStock) return -1;
			if (!a.inStock && b.inStock) return 1;
			return a.price - b.price;
		})
	);

	let lowestPrice = $derived(
		sortedPrices.find((sp) => sp.inStock)?.price ?? sortedPrices[0]?.price ?? 0
	);
</script>

<div class="bg-white dark:bg-slate-800 rounded-2xl border border-border/80 dark:border-slate-700 overflow-hidden shadow-sm">
	<!-- Header -->
	<div class="px-6 py-4 border-b border-border/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
		<div>
			<h3 class="text-base font-bold text-text-primary dark:text-white">Price Comparison Matrix</h3>
			<p class="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
				Verified offers across {product.storePrices.length} online marketplaces & quick-commerce stores
			</p>
		</div>

		{#if product.unitPrice}
			<div class="px-3 py-1 bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-300 rounded-xl text-xs font-bold">
				Unit Price: {product.unitPrice.formatted}
			</div>
		{/if}
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="bg-slate-50 dark:bg-slate-900/60 text-xs text-text-secondary dark:text-slate-400 uppercase tracking-wider">
					<th class="text-left px-6 py-3 font-bold">Seller & Store</th>
					<th class="text-left px-6 py-3 font-bold">Price</th>
					<th class="text-left px-6 py-3 font-bold hidden sm:table-cell">MRP</th>
					<th class="text-left px-6 py-3 font-bold hidden md:table-cell">Discount</th>
					<th class="text-center px-6 py-3 font-bold">Availability</th>
					<th class="text-right px-6 py-3 font-bold">Action</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border/60 dark:divide-slate-700/60">
				{#each sortedPrices as sp}
					{@const discount = getDiscountPercent(sp.mrp, sp.price)}
					{@const isCheapest = sp.inStock && sp.price === lowestPrice}
					<tr
						class="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-700/40 {isCheapest
							? 'border-l-4 border-l-success bg-green-50/40 dark:bg-emerald-950/20'
							: ''}"
					>
						<!-- Store -->
						<td class="px-6 py-4">
							<div class="flex items-center gap-2.5">
								<span class="text-2xl">{storeConfig[sp.store]?.emoji ?? '🏪'}</span>
								<div>
									<div class="flex items-center gap-1.5">
										<span class="font-bold text-sm {storeConfig[sp.store]?.color ?? 'text-text-primary dark:text-white'}">
											{sp.store}
										</span>
										{#if isCheapest}
											<span class="text-[10px] font-black uppercase bg-success text-white px-2 py-0.5 rounded-full shadow-2xs">
												Lowest
											</span>
										{/if}
										{#if storeConfig[sp.store]?.badge}
											<span class="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 rounded">
												{storeConfig[sp.store]?.badge}
											</span>
										{/if}
									</div>
									{#if sp.deliveryEta}
										<p class="text-[11px] text-text-secondary dark:text-slate-400">
											Delivery: {sp.deliveryEta}
										</p>
									{/if}
								</div>
							</div>
						</td>

						<!-- Price -->
						<td class="px-6 py-4">
							<span class="text-base font-black {isCheapest ? 'text-success' : 'text-text-primary dark:text-white'}">
								{formatPrice(sp.price)}
							</span>
						</td>

						<!-- MRP -->
						<td class="px-6 py-4 hidden sm:table-cell">
							{#if discount > 0}
								<span class="text-sm text-text-secondary dark:text-slate-400 line-through">
									{formatPrice(sp.mrp)}
								</span>
							{:else}
								<span class="text-sm text-text-secondary dark:text-slate-400">—</span>
							{/if}
						</td>

						<!-- Discount -->
						<td class="px-6 py-4 hidden md:table-cell">
							{#if discount > 0}
								<span class="text-xs font-bold text-success bg-green-100 dark:bg-emerald-950 px-2 py-1 rounded-md">
									{discount}% off
								</span>
							{:else}
								<span class="text-sm text-text-secondary dark:text-slate-400">—</span>
							{/if}
						</td>

						<!-- Status -->
						<td class="px-6 py-4 text-center">
							{#if sp.inStock}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-success bg-green-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
									<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
									In Stock
								</span>
							{:else}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-danger bg-red-100 dark:bg-red-950 px-2.5 py-1 rounded-full">
									<span class="w-1.5 h-1.5 rounded-full bg-danger"></span>
									Out of Stock
								</span>
							{/if}
						</td>

						<!-- Visit button -->
						<td class="px-6 py-4 text-right">
							<a
								href={sp.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all {sp.inStock
									? 'bg-primary hover:bg-primary-dark text-white shadow-xs active:scale-95'
									: 'bg-slate-100 dark:bg-slate-700 text-text-secondary cursor-not-allowed pointer-events-none'}"
							>
								Buy Now
								<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
								</svg>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Notice for provider feeds -->
	<div class="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-border/60 dark:border-slate-700 text-[11px] text-text-secondary dark:text-slate-400 flex items-center justify-between">
		<span>💡 Prices and stock observations are benchmarked with verified multi-store crawlers.</span>
		<span>Blinkit, Zepto & Flipkart Minutes feeds simulated for demo area.</span>
	</div>
</div>
