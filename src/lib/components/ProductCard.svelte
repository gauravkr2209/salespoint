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
	let tiltX = $state(0);
	let tiltY = $state(0);
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

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// Subtle 3D tilt (max 8 degrees)
		tiltX = -((y - centerY) / centerY) * 7;
		tiltY = ((x - centerX) / centerX) * 7;

		shineX = (x / rect.width) * 100;
		shineY = (y / rect.height) * 100;
		shineOpacity = 0.22;
	}

	function handlePointerEnter() {
		isHovered = true;
	}

	function handlePointerLeave() {
		isHovered = false;
		tiltX = 0;
		tiltY = 0;
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
	class="perspective-1000 transition-transform duration-300"
>
	<a
		href="/product/{product.id}"
		style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg) scale3d({isHovered ? 1.02 : 1}, {isHovered ? 1.02 : 1}, 1); transform-style: preserve-3d;"
		class="group block bg-white dark:bg-slate-800 rounded-3xl border border-border/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 dark:hover:border-indigo-500/50 transition-all duration-200 relative"
	>
		<!-- Specular light sheen following cursor -->
		<div
			class="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-3xl"
			style="background: radial-gradient(circle 240px at {shineX}% {shineY}%, rgba(255, 255, 255, {shineOpacity}), transparent 80%);"
		></div>

		<!-- Image Container with 3D Parallax Depth -->
		<div
			class="relative aspect-square bg-slate-50 dark:bg-slate-900/60 overflow-hidden p-5 flex items-center justify-center"
			style="transform: translateZ(18px);"
		>
			<img
				src={getProductImageUrl(product)}
				alt={product.title}
				class="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-sm"
				loading="lazy"
				onerror={(e) => {
					const target = e.currentTarget as HTMLImageElement;
					target.src = getFallbackImage(product.category);
				}}
			/>

			<!-- Discount badge with elevated 3D depth -->
			{#if discount > 0}
				<div
					style="transform: translateZ(32px);"
					class="absolute top-3 left-3 bg-gradient-to-r from-success to-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider border border-white/20"
				>
					{discount}% OFF
				</div>
			{/if}

			<!-- Wishlist Heart Button -->
			<button
				onclick={handleToggleWishlist}
				style="transform: translateZ(34px);"
				class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 hover:scale-110 active:scale-90 shadow-md border border-border/60 dark:border-slate-700 flex items-center justify-center transition-all cursor-pointer z-30"
				title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
				aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
			>
				<span class="text-sm transition-transform {isWishlisted ? 'scale-110' : 'opacity-60'}">
					{isWishlisted ? '❤️' : '🤍'}
				</span>
			</button>

			<!-- Pack Size / Unit Price Pill if available -->
			{#if product.unitPrice}
				<div
					style="transform: translateZ(32px);"
					class="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 shadow-xs"
				>
					{product.unitPrice.formatted}
				</div>
			{/if}
		</div>

		<!-- Info with elevated typography -->
		<div class="p-4 space-y-2 relative z-10" style="transform: translateZ(12px);">
			<!-- Category & Brand -->
			<div class="flex items-center justify-between text-xs">
				<span class="font-extrabold text-primary dark:text-indigo-400 uppercase tracking-wider text-[11px]">
					{product.brand}
				</span>
				<span class="text-[10px] bg-slate-100 dark:bg-slate-700/60 text-text-secondary dark:text-slate-300 px-2 py-0.5 rounded-full font-medium truncate max-w-[110px]">
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
</div>
