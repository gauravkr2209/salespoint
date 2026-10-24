<script lang="ts">
	import type { Product } from '$lib/data/products';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';

	let { product }: { product: Product } = $props();

	let bestPrice = $derived(
		product.storePrices.reduce(
			(best, sp) => (sp.inStock && sp.price < best.price ? sp : best),
			product.storePrices[0]
		)
	);

	let discount = $derived(getDiscountPercent(bestPrice.mrp, bestPrice.price));
	let storeCount = $derived(product.storePrices.filter((sp) => sp.inStock).length);
</script>

<a
	href="/product/{product.id}"
	class="group block bg-white dark:bg-slate-800 rounded-2xl border border-border/80 dark:border-slate-700/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 dark:hover:border-indigo-500/50 hover:-translate-y-1 relative"
>
	<!-- Image Container with Fallback & Aspect Ratio -->
	<div class="relative aspect-square bg-slate-50 dark:bg-slate-900/60 overflow-hidden p-5 flex items-center justify-center">
		<img
			src={product.imageUrl}
			alt={product.title}
			class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
			loading="lazy"
			onerror={(e) => {
				// Fallback SVG if unsplash or remote image fails
				const target = e.currentTarget as HTMLImageElement;
				target.src = 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80';
			}}
		/>

		<!-- Discount badge -->
		{#if discount > 0}
			<div class="absolute top-3 left-3 bg-gradient-to-r from-success to-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs tracking-wider">
				{discount}% OFF
			</div>
		{/if}

		<!-- Pack Size / Unit Price Pill if available -->
		{#if product.unitPrice}
			<div class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
				{product.unitPrice.formatted}
			</div>
		{/if}
	</div>

	<!-- Info -->
	<div class="p-4 space-y-2">
		<!-- Category & Brand -->
		<div class="flex items-center justify-between text-xs">
			<span class="font-extrabold text-primary dark:text-indigo-400 uppercase tracking-wider text-[11px]">
				{product.brand}
			</span>
			<span class="text-[10px] bg-slate-100 dark:bg-slate-700/60 text-text-secondary dark:text-slate-400 px-2 py-0.5 rounded-full font-medium truncate max-w-[110px]">
				{product.category}
			</span>
		</div>

		<!-- Title -->
		<h3 class="text-sm font-bold text-text-primary dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
			{product.title}
		</h3>

		<!-- Price row & Unit Price -->
		<div class="pt-1">
			<div class="flex items-baseline gap-2">
				<span class="text-lg font-black text-text-primary dark:text-white">
					{formatPrice(bestPrice.price)}
				</span>
				{#if discount > 0}
					<span class="text-xs text-text-secondary dark:text-slate-400 line-through">
						{formatPrice(bestPrice.mrp)}
					</span>
				{/if}
			</div>
			{#if product.variant}
				<p class="text-[11px] text-text-secondary dark:text-slate-400 font-medium">
					Variant: {product.variant}
				</p>
			{/if}
		</div>

		<!-- Store count & Lowest store -->
		<div class="flex items-center justify-between text-[11px] text-text-secondary dark:text-slate-400 pt-2 border-t border-border/50 dark:border-slate-700/60">
			<span class="flex items-center gap-1 font-semibold text-text-primary dark:text-slate-200">
				<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
				Lowest on {bestPrice.store}
			</span>
			<span>{storeCount} stores</span>
		</div>
	</div>
</a>
