<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product } from '$lib/data/products';
	import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';
	import { prefersReducedMotion } from '$lib/three/webglDetect';
	import { getProductImageUrl, getFallbackImage } from '$lib/utils/productImages';
	import { isProductWishlisted, toggleWishlist } from '$lib/auth/store';

	let { product }: { product: Product } = $props();

	let bestPrice = $derived(
		product.storePrices.reduce(
			(best, sp) => (sp.inStock && sp.price < best.price ? sp : best),
			product.storePrices[0]
		)
	);

	let discount = $derived(getDiscountPercent(bestPrice.mrp, bestPrice.price));
	let storeCount = $derived(product.storePrices.filter((sp) => sp.inStock).length);

	let cardEl: HTMLElement | undefined = $state();
	let shineX = $state(50);
	let shineY = $state(50);
	let shineOpacity = $state(0);
	let isHovered = $state(false);

	let isWishlisted = $state(false);

	onMount(() => {
		isWishlisted = isProductWishlisted(product.id);
		const onWishlistChange = () => {
			isWishlisted = isProductWishlisted(product.id);
		};
		window.addEventListener('salespoint_wishlist_change', onWishlistChange);
		return () => {
			window.removeEventListener('salespoint_wishlist_change', onWishlistChange);
		};
	});

	function handlePointerMove(e: PointerEvent) {
		if (prefersReducedMotion() || !cardEl) return;

		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		shineX = (x / rect.width) * 100;
		shineY = (y / rect.height) * 100;
		shineOpacity = 0.15;
	}

	function handlePointerEnter() {
		isHovered = true;
	}

	function handlePointerLeave() {
		isHovered = false;
		shineOpacity = 0;
	}

	function handleToggleWishlist(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		isWishlisted = toggleWishlist(product.id);
	}
</script>

<div
	bind:this={cardEl}
	role="presentation"
	onpointermove={handlePointerMove}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	class="transition-all duration-300"
>
	<a
		href="/product/{product.id}"
		class="group block bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#5A3B8C]/25 hover:border-[#8B7CC7] hover:-translate-y-1.5 transition-all duration-300 relative"
	>
		<!-- Specular light sheen following cursor -->
		<div
			class="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-3xl"
			style="background: radial-gradient(circle 240px at {shineX}% {shineY}%, rgba(139, 124, 199, {shineOpacity}), transparent 80%);"
		></div>

		<!-- Image Container -->
		<div
			class="relative aspect-square bg-[#140E28] overflow-hidden p-5 flex items-center justify-center border-b border-[#3A3A52]/80"
		>
			<img
				src={getProductImageUrl(product)}
				alt={product.title}
				class="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-md"
				loading="lazy"
				onerror={(e) => {
					const target = e.currentTarget as HTMLImageElement;
					target.src = getFallbackImage(product.category);
				}}
			/>

			<!-- Discount badge in Royal Purple -->
			{#if discount > 0}
				<div
					class="absolute top-3 left-3 bg-[#5A3B8C] text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider border border-[#8B7CC7]/40"
				>
					{discount}% OFF
				</div>
			{/if}

			<!-- Wishlist Heart Button -->
			<button
				onclick={handleToggleWishlist}
				class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2A1E4D]/90 hover:bg-[#34265E] hover:scale-110 active:scale-90 shadow-md border border-[#3A3A52] hover:border-[#8B7CC7] flex items-center justify-center transition-all cursor-pointer z-30"
				title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
				aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
			>
				<span class="text-sm transition-transform {isWishlisted ? 'scale-110' : 'opacity-70'}">
					{isWishlisted ? '❤️' : '🤍'}
				</span>
			</button>

			<!-- Pack Size / Unit Price Pill if available -->
			{#if product.unitPrice}
				<div
					class="absolute bottom-2.5 right-2.5 bg-[#2A1E4D]/90 backdrop-blur-md text-[#C9C2E3] text-[10px] font-bold px-2 py-0.5 rounded-lg border border-[#3A3A52] shadow-xs"
				>
					{product.unitPrice.formatted}
				</div>
			{/if}
		</div>

		<!-- Info with elevated typography -->
		<div class="p-4 space-y-2 relative z-10">
			<!-- Category & Brand -->
			<div class="flex items-center justify-between text-xs">
				<span class="font-extrabold text-[#8B7CC7] uppercase tracking-wider text-[11px]">
					{product.brand}
				</span>
				<span class="text-[10px] bg-[#140E28] text-[#8E84B0] border border-[#3A3A52]/70 px-2 py-0.5 rounded-full font-medium truncate max-w-[120px]">
					{product.category}
				</span>
			</div>

			<!-- Title -->
			<h3 class="text-sm font-bold text-[#C9C2E3] leading-snug line-clamp-2 group-hover:text-white transition-colors">
				{product.title}
			</h3>

			<!-- Price row & Unit Price -->
			<div class="pt-1">
				<div class="flex items-baseline gap-2">
					<span class="text-lg font-black text-white">
						{formatPrice(bestPrice.price)}
					</span>
					{#if discount > 0}
						<span class="text-xs text-[#8E84B0] line-through">
							{formatPrice(bestPrice.mrp)}
						</span>
					{/if}
				</div>
				{#if product.variant}
					<p class="text-[11px] text-[#8E84B0] font-medium truncate">
						Variant: {product.variant}
					</p>
				{/if}
			</div>

			<!-- Store count & Lowest store -->
			<div class="flex items-center justify-between text-[11px] text-[#8E84B0] pt-2 border-t border-[#3A3A52]">
				<span class="flex items-center gap-1.5 font-semibold text-[#C9C2E3]">
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
					Lowest on {bestPrice.store}
				</span>
				<span class="text-[#8E84B0]">{storeCount} stores</span>
			</div>
		</div>
	</a>
</div>
