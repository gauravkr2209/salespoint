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
	class="group block bg-surface rounded-xl border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5"
>
	<!-- Image -->
	<div class="relative aspect-square bg-slate-50 overflow-hidden p-4">
		<img
			src={product.imageUrl}
			alt={product.title}
			class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
			loading="lazy"
		/>

		<!-- Discount badge -->
		{#if discount > 0}
			<div
				class="absolute top-2 left-2 bg-success text-white text-xs font-bold px-2 py-1 rounded-md"
			>
				{discount}% OFF
			</div>
		{/if}
	</div>

	<!-- Info -->
	<div class="p-4 space-y-2">
		<!-- Brand -->
		<p class="text-xs font-semibold text-primary uppercase tracking-wide">
			{product.brand}
		</p>

		<!-- Title -->
		<h3
			class="text-sm font-medium text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors"
		>
			{product.title}
		</h3>

		<!-- Price row -->
		<div class="flex items-baseline gap-2 pt-1">
			<span class="text-lg font-bold text-text-primary">
				{formatPrice(bestPrice.price)}
			</span>
			{#if discount > 0}
				<span class="text-sm text-text-secondary line-through">
					{formatPrice(bestPrice.mrp)}
				</span>
			{/if}
		</div>

		<!-- Store count -->
		<div class="flex items-center gap-1.5 text-xs text-text-secondary pt-1">
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
					d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"
				/>
			</svg>
			Available on {storeCount} {storeCount === 1 ? 'store' : 'stores'}
		</div>
	</div>
</a>
