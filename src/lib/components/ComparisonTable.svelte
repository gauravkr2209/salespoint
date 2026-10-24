<script lang="ts">
	import type { Product } from '$lib/data/products';
	import type { StoreName } from '$lib/types';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';

	let { product }: { product: Product } = $props();

	/** Store visual config */
	const storeConfig: Record<StoreName, { emoji: string; color: string }> = {
		Amazon: { emoji: '📦', color: 'text-amazon' },
		Flipkart: { emoji: '🛒', color: 'text-flipkart' },
		Myntra: { emoji: '👗', color: 'text-myntra' },
		Croma: { emoji: '🖥️', color: 'text-croma' },
		Ajio: { emoji: '👟', color: 'text-ajio' }
	};

	/** Sorted store prices (ascending by price) */
	let sortedPrices = $derived(
		[...product.storePrices].sort((a, b) => {
			// In-stock items first
			if (a.inStock && !b.inStock) return -1;
			if (!a.inStock && b.inStock) return 1;
			return a.price - b.price;
		})
	);

	let lowestPrice = $derived(
		sortedPrices.find((sp) => sp.inStock)?.price ?? sortedPrices[0]?.price ?? 0
	);
</script>

<div class="bg-surface rounded-xl border border-border overflow-hidden">
	<!-- Header -->
	<div class="px-5 py-4 border-b border-border">
		<h3 class="text-base font-semibold text-text-primary">Price Comparison</h3>
		<p class="text-xs text-text-secondary mt-0.5">
			Across {product.storePrices.length} stores
		</p>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="bg-slate-50 text-xs text-text-secondary uppercase tracking-wider">
					<th class="text-left px-5 py-3 font-medium">Store</th>
					<th class="text-left px-5 py-3 font-medium">Price</th>
					<th class="text-left px-5 py-3 font-medium hidden sm:table-cell">MRP</th>
					<th class="text-left px-5 py-3 font-medium hidden md:table-cell">Discount</th>
					<th class="text-center px-5 py-3 font-medium">Status</th>
					<th class="text-right px-5 py-3 font-medium"></th>
				</tr>
			</thead>
			<tbody>
				{#each sortedPrices as sp, i}
					{@const discount = getDiscountPercent(sp.mrp, sp.price)}
					{@const isCheapest = sp.inStock && sp.price === lowestPrice}
					<tr
						class="border-t border-border/60 transition-colors hover:bg-slate-50/70 {isCheapest
							? 'border-l-3 border-l-success bg-green-50/40'
							: ''}"
					>
						<!-- Store -->
						<td class="px-5 py-4">
							<div class="flex items-center gap-2.5">
								<span class="text-xl">{storeConfig[sp.store]?.emoji ?? '🏪'}</span>
								<span class="font-medium text-sm {storeConfig[sp.store]?.color ?? 'text-text-primary'}">
									{sp.store}
								</span>
								{#if isCheapest}
									<span
										class="text-[10px] font-bold uppercase bg-success text-white px-1.5 py-0.5 rounded"
									>
										Best
									</span>
								{/if}
							</div>
						</td>

						<!-- Price -->
						<td class="px-5 py-4">
							<span class="text-base font-bold {isCheapest ? 'text-success' : 'text-text-primary'}">
								{formatPrice(sp.price)}
							</span>
						</td>

						<!-- MRP -->
						<td class="px-5 py-4 hidden sm:table-cell">
							{#if discount > 0}
								<span class="text-sm text-text-secondary line-through">
									{formatPrice(sp.mrp)}
								</span>
							{:else}
								<span class="text-sm text-text-secondary">—</span>
							{/if}
						</td>

						<!-- Discount -->
						<td class="px-5 py-4 hidden md:table-cell">
							{#if discount > 0}
								<span class="text-sm font-semibold text-success">{discount}% off</span>
							{:else}
								<span class="text-sm text-text-secondary">—</span>
							{/if}
						</td>

						<!-- Status -->
						<td class="px-5 py-4 text-center">
							{#if sp.inStock}
								<span
									class="inline-flex items-center gap-1 text-xs font-medium text-success bg-green-100 px-2 py-1 rounded-full"
								>
									<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
									In Stock
								</span>
							{:else}
								<span
									class="inline-flex items-center gap-1 text-xs font-medium text-danger bg-red-100 px-2 py-1 rounded-full"
								>
									<span class="w-1.5 h-1.5 rounded-full bg-danger"></span>
									Out of Stock
								</span>
							{/if}
						</td>

						<!-- Visit button -->
						<td class="px-5 py-4 text-right">
							<a
								href={sp.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors {sp.inStock
									? 'bg-primary text-white hover:bg-primary-dark'
									: 'bg-slate-100 text-text-secondary cursor-not-allowed pointer-events-none'}"
							>
								Visit Store
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-3.5 h-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
