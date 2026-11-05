<script lang="ts">
	import type { Product } from '$lib/data/products';
	import type { StoreName } from '$lib/types';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';

	let { product }: { product: Product } = $props();

	/** Store visual config harmonized for dark purple */
	const storeConfig: Record<StoreName, { emoji: string; badge?: string }> = {
		Amazon: { emoji: '📦' },
		Flipkart: { emoji: '🛒' },
		Myntra: { emoji: '👗' },
		Croma: { emoji: '🖥️' },
		Ajio: { emoji: '👟' },
		Blinkit: { emoji: '⚡', badge: '10 Mins' },
		Zepto: { emoji: '🚀', badge: 'Instant' },
		'Flipkart Minutes': { emoji: '⏱️', badge: 'Minutes' }
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

<div class="bg-[#2A1E4D] rounded-2xl border border-[#3A3A52] overflow-hidden shadow-xl">
	<!-- Header -->
	<div class="px-6 py-4 border-b border-[#3A3A52] bg-[#1A1333] flex flex-wrap items-center justify-between gap-2">
		<div>
			<h3 class="text-base font-black text-white">Price Comparison Matrix</h3>
			<p class="text-xs text-[#8E84B0] mt-0.5">
				Verified live offers across {product.storePrices.length} online marketplaces & quick-commerce stores
			</p>
		</div>

		{#if product.unitPrice}
			<div class="px-3 py-1 bg-[#2A1E4D] text-[#8B7CC7] border border-[#3A3A52] rounded-xl text-xs font-bold shadow-xs">
				Unit Price: {product.unitPrice.formatted}
			</div>
		{/if}
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full text-left">
			<thead>
				<tr class="bg-[#140E28] text-xs text-[#8B7CC7] uppercase tracking-wider border-b border-[#3A3A52]">
					<th class="px-6 py-3.5 font-bold">Seller & Store</th>
					<th class="px-6 py-3.5 font-bold">Price</th>
					<th class="px-6 py-3.5 font-bold hidden sm:table-cell">MRP</th>
					<th class="px-6 py-3.5 font-bold hidden md:table-cell">Discount</th>
					<th class="px-6 py-3.5 font-bold text-center">Availability</th>
					<th class="px-6 py-3.5 font-bold text-right">Action</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#3A3A52]">
				{#each sortedPrices as sp}
					{@const discount = getDiscountPercent(sp.mrp, sp.price)}
					{@const isCheapest = sp.inStock && sp.price === lowestPrice}
					<tr
						class="transition-colors hover:bg-[#34265E]/70 {isCheapest
							? 'border-l-4 border-l-[#8B7CC7] bg-[#5A3B8C]/15'
							: 'bg-[#2A1E4D]'}"
					>
						<!-- Store -->
						<td class="px-6 py-4">
							<div class="flex items-center gap-3">
								<span class="text-2xl p-1.5 bg-[#140E28] border border-[#3A3A52] rounded-xl shadow-xs">
									{storeConfig[sp.store]?.emoji ?? '🏪'}
								</span>
								<div>
									<div class="flex items-center gap-2">
										<span class="font-bold text-sm text-white">
											{sp.store}
										</span>
										{#if isCheapest}
											<span class="text-[10px] font-black uppercase bg-[#5A3B8C] text-white border border-[#8B7CC7]/40 px-2 py-0.5 rounded-full shadow-xs">
												Lowest
											</span>
										{/if}
										{#if storeConfig[sp.store]?.badge}
											<span class="text-[10px] font-bold bg-[#140E28] border border-[#3A3A52] text-[#8B7CC7] px-1.5 py-0.5 rounded">
												{storeConfig[sp.store]?.badge}
											</span>
										{/if}
									</div>
									{#if sp.deliveryEta}
										<p class="text-[11px] text-[#8E84B0] mt-0.5">
											Delivery: {sp.deliveryEta}
										</p>
									{/if}
								</div>
							</div>
						</td>

						<!-- Price -->
						<td class="px-6 py-4">
							<span class="text-base font-black {isCheapest ? 'text-white drop-shadow-[0_0_12px_rgba(139,124,199,0.3)]' : 'text-[#C9C2E3]'}">
								{formatPrice(sp.price)}
							</span>
						</td>

						<!-- MRP -->
						<td class="px-6 py-4 hidden sm:table-cell">
							{#if discount > 0}
								<span class="text-sm text-[#8E84B0] line-through">
									{formatPrice(sp.mrp)}
								</span>
							{:else}
								<span class="text-sm text-[#8E84B0]">—</span>
							{/if}
						</td>

						<!-- Discount -->
						<td class="px-6 py-4 hidden md:table-cell">
							{#if discount > 0}
								<span class="text-xs font-bold text-[#8B7CC7] bg-[#140E28] border border-[#3A3A52] px-2.5 py-1 rounded-md">
									{discount}% off
								</span>
							{:else}
								<span class="text-sm text-[#8E84B0]">—</span>
							{/if}
						</td>

						<!-- Status -->
						<td class="px-6 py-4 text-center">
							{#if sp.inStock}
								<span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-full">
									<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
									In Stock
								</span>
							{:else}
								<span class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-800/60 px-2.5 py-1 rounded-full">
									<span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
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
								class="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md {sp.inStock
									? 'bg-[#5A3B8C] hover:bg-[#6D47A6] text-white border border-[#8B7CC7]/40 shadow-[#5A3B8C]/20 hover:shadow-[#5A3B8C]/40 active:scale-95'
									: 'bg-[#140E28] text-[#8E84B0] border border-[#3A3A52] cursor-not-allowed pointer-events-none'}"
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
	<div class="px-6 py-3.5 bg-[#140E28] border-t border-[#3A3A52] text-[11px] text-[#8E84B0] flex flex-col sm:flex-row items-center justify-between gap-2">
		<span class="flex items-center gap-1.5">
			<span class="text-[#8B7CC7]">💡</span> Prices and stock observations are benchmarked with verified multi-store crawlers.
		</span>
		<span>Blinkit, Zepto & Flipkart Minutes feeds indexed for demo area.</span>
	</div>
</div>
