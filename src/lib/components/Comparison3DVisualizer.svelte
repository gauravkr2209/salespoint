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

<div class="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-950/90 rounded-3xl p-6 sm:p-8 border border-border/80 dark:border-slate-800 shadow-md overflow-hidden">
	<!-- Background glow -->
	<div class="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

	<div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
		<div>
			<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-black tracking-wide uppercase mb-2">
				<span>📊</span> Multi-Store Dimensional Audit
			</div>
			<h3 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white">
				Price & Delivery Spread
			</h3>
			<p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-0.5">
				Real-time price variance across {inStockPrices.length} verified sellers
			</p>
		</div>

		<!-- Quick Metric Stat Pill -->
		{#if highestPrice > lowestPrice}
			<div class="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-3.5 flex items-center gap-3">
				<div class="text-2xl">💰</div>
				<div>
					<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
						Maximum Immediate Savings
					</span>
					<span class="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200">
						Save {formatPrice(highestPrice - lowestPrice)}
					</span>
					<span class="text-xs text-emerald-700 dark:text-emerald-300 ml-1">
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
					? 'bg-emerald-500/5 dark:bg-emerald-950/30 border-emerald-500/40 shadow-md shadow-emerald-500/5'
					: 'bg-white/80 dark:bg-slate-850/80 border-border/80 dark:border-slate-800 hover:border-primary/40'}"
			>
				<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border/60 dark:border-slate-700 flex items-center justify-center font-black text-sm text-text-primary dark:text-white shadow-xs">
							{sp.store.slice(0, 2).toUpperCase()}
						</div>
						<div>
							<div class="flex items-center gap-2">
								<span class="font-extrabold text-sm sm:text-base text-text-primary dark:text-white">
									{sp.store}
								</span>
								{#if isLowest}
									<span class="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
										<span>🏆</span> Best Price
									</span>
								{/if}
							</div>
							<span class="text-xs text-text-secondary dark:text-slate-400 font-medium">
								{sp.deliveryEta ?? (sp.store.toLowerCase().includes('blinkit') || sp.store.toLowerCase().includes('zepto') ? '⚡ 10-15 Min Delivery' : '📦 2-Day Shipping')}
							</span>
						</div>
					</div>

					<!-- Pricing and Savings Badge -->
					<div class="flex items-baseline sm:items-end flex-col">
						<div class="flex items-baseline gap-2">
							<span class="text-lg sm:text-xl font-black {isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-text-primary dark:text-white'}">
								{formatPrice(sp.price)}
							</span>
							{#if savings > 0}
								<span class="text-xs text-text-secondary dark:text-slate-400 line-through">
									{formatPrice(sp.mrp)}
								</span>
							{/if}
						</div>
						{#if savings > 0}
							<span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
								{savings}% off official MRP
							</span>
						{/if}
					</div>
				</div>

				<!-- 3D Bar Depth Gauge -->
				<div class="relative w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-border/50 dark:border-slate-700">
					<div
						class="h-full rounded-full transition-all duration-700 ease-out {isLowest
							? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500 shadow-sm shadow-emerald-400/50'
							: 'bg-gradient-to-r from-primary to-indigo-500'}"
						style="width: {pctOfMax}%;"
					></div>
				</div>

				<!-- Visit Store Action -->
				<div class="mt-3 pt-2.5 border-t border-border/40 dark:border-slate-800/80 flex items-center justify-between text-xs">
					<span class="text-text-secondary dark:text-slate-400 text-[11px]">
						{sp.inStock ? '✅ Verified in stock' : '❌ Out of stock'}
					</span>
					<a
						href={sp.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 font-bold {isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary dark:text-indigo-400'} hover:underline"
					>
						Go to {sp.store} →
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
