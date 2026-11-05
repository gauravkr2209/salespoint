<script lang="ts">
	import type { Product } from '$lib/data/products';
	import type { StorePrice } from '$lib/types';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';

	let { product }: { product: Product } = $props();

	let inStockPrices = $derived(product.storePrices.filter((sp) => sp.inStock));
	let lowestPrice = $derived(
		inStockPrices.reduce((min, sp) => (sp.price < min ? sp.price : min), inStockPrices[0]?.price ?? 0)
	);
	let highestPrice = $derived(
		inStockPrices.reduce((max, sp) => (sp.price > max ? sp.price : max), inStockPrices[0]?.price ?? 1)
	);

	let hoveredStore = $state<string | null>(null);
</script>

<div class="relative bg-[#2A1E4D] rounded-3xl p-6 sm:p-8 border border-[#3A3A52] shadow-xl overflow-hidden">
	<!-- Background glow -->
	<div class="absolute -top-16 -right-16 w-64 h-64 bg-[#5A3B8C]/20 rounded-full blur-3xl pointer-events-none"></div>

	<div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
		<div>
			<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#140E28] text-[#8B7CC7] border border-[#3A3A52] text-xs font-black tracking-wide uppercase mb-2">
				<span>📊</span> Multi-Store Dimensional Audit
			</div>
			<h3 class="text-xl sm:text-2xl font-black text-white">
				Price & Delivery Spread
			</h3>
			<p class="text-xs sm:text-sm text-[#8E84B0] mt-0.5">
				Real-time price variance across {inStockPrices.length} verified sellers
			</p>
		</div>

		<!-- Quick Metric Stat Pill -->
		{#if highestPrice > lowestPrice}
			<div class="bg-[#140E28] border border-[#3A3A52] rounded-2xl p-4 flex items-center gap-3 shadow-md">
				<div class="text-2xl">💰</div>
				<div>
					<span class="text-[10px] font-bold uppercase tracking-wider text-[#8B7CC7] block">
						Maximum Immediate Savings
					</span>
					<span class="text-base sm:text-lg font-black text-white">
						Save {formatPrice(highestPrice - lowestPrice)}
					</span>
					<span class="text-xs text-emerald-400 ml-1 font-bold">
						({Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)}% cheaper)
					</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Dimensional Visualizer Bars -->
	<div class="space-y-4">
		{#each product.storePrices as sp (sp.storeId)}
			{@const isLowest = sp.inStock && sp.price === lowestPrice}
			{@const pctOfMax = Math.max(20, Math.round((sp.price / highestPrice) * 100))}
			{@const savings = sp.mrp > sp.price ? getDiscountPercent(sp.mrp, sp.price) : 0}

			<div
				role="presentation"
				onmouseenter={() => hoveredStore = sp.store}
				onmouseleave={() => hoveredStore = null}
				class="group relative rounded-2xl p-4 border transition-all duration-300 {isLowest
					? 'bg-[#5A3B8C]/15 border-[#8B7CC7] shadow-lg shadow-[#5A3B8C]/20'
					: 'bg-[#1F173C] border-[#3A3A52] hover:border-[#8B7CC7]/60 hover:bg-[#34265E]/50'}"
			>
				<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-[#140E28] border border-[#3A3A52] flex items-center justify-center font-black text-sm text-[#C9C2E3] shadow-xs">
							{sp.store.slice(0, 2).toUpperCase()}
						</div>
						<div>
							<div class="flex items-center gap-2">
								<span class="font-extrabold text-sm sm:text-base text-white">
									{sp.store}
								</span>
								{#if isLowest}
									<span class="bg-[#5A3B8C] border border-[#8B7CC7]/40 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
										<span>🏆</span> Best Price
									</span>
								{/if}
							</div>
							<span class="text-xs text-[#8E84B0] font-medium">
								{sp.deliveryEta ?? (sp.store.toLowerCase().includes('blinkit') || sp.store.toLowerCase().includes('zepto') ? '⚡ 10-15 Min Delivery' : '📦 2-Day Shipping')}
							</span>
						</div>
					</div>

					<!-- Pricing and Savings Badge -->
					<div class="flex items-baseline sm:items-end flex-col">
						<div class="flex items-baseline gap-2">
							<span class="text-lg sm:text-xl font-black {isLowest ? 'text-white drop-shadow-[0_0_10px_rgba(139,124,199,0.3)]' : 'text-[#C9C2E3]'}">
								{formatPrice(sp.price)}
							</span>
							{#if savings > 0}
								<span class="text-xs text-[#8E84B0] line-through">
									{formatPrice(sp.mrp)}
								</span>
							{/if}
						</div>
						{#if savings > 0}
							<span class="text-[10px] font-bold text-[#8B7CC7]">
								{savings}% off official MRP
							</span>
						{/if}
					</div>
				</div>

				<!-- 3D Bar Depth Gauge -->
				<div class="relative w-full h-3.5 bg-[#140E28] rounded-full overflow-hidden border border-[#3A3A52]">
					<div
						class="h-full rounded-full transition-all duration-700 ease-out {isLowest
							? 'bg-gradient-to-r from-[#5A3B8C] via-[#8B7CC7] to-emerald-400 shadow-sm shadow-[#8B7CC7]/50'
							: 'bg-gradient-to-r from-[#3A3A52] to-[#5A3B8C]'}"
						style="width: {pctOfMax}%;"
					></div>
				</div>

				<!-- Visit Store Action -->
				<div class="mt-3 pt-2.5 border-t border-[#3A3A52] flex items-center justify-between text-xs">
					<span class="text-[#8E84B0] text-[11px]">
						{sp.inStock ? '✅ Verified in stock' : '❌ Out of stock'}
					</span>
					<a
						href={sp.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 font-bold text-[#8B7CC7] hover:text-white transition-colors"
					>
						Go to {sp.store} →
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
