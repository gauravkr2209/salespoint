<script lang="ts">
	import type { SearchEntity, ProductEntity, BrandEntity, CategoryEntity, StoreEntity } from '$lib/search/spotifyEngine';
	import { formatCurrency } from '$lib/utils/formatPrice';

	let { entity, onSelect }: { entity: SearchEntity; onSelect?: (entity: SearchEntity) => void } = $props();

	function handleAction(e: MouseEvent) {
		e.stopPropagation();
		if (onSelect) onSelect(entity);
	}
</script>

<div
	class="group relative bg-white dark:bg-slate-900/90 border border-border/80 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 flex flex-col justify-between overflow-hidden"
>
	<!-- Spotify Top Result Glow Accent -->
	<div class="absolute -top-12 -right-12 w-36 h-36 bg-primary/10 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

	<div>
		<!-- Entity Badge -->
		<div class="flex items-center justify-between mb-4">
			<span
				class="text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-2xs font-mono {
					entity.type === 'product'
						? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
						: entity.type === 'brand'
							? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
							: entity.type === 'category'
								? 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
								: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
				}"
			>
				Top Result • {entity.type}
			</span>

			{#if entity.type === 'product' && (entity as ProductEntity).discountPercent > 0}
				<span class="text-xs font-black text-rose-500 bg-rose-500/10 dark:bg-rose-500/20 px-2 py-0.5 rounded-full">
					-{(entity as ProductEntity).discountPercent}% OFF
				</span>
			{/if}
		</div>

		<!-- Entity Artwork & Details -->
		<div class="flex items-start gap-4 mb-4">
			<div class="relative shrink-0">
				{#if entity.type === 'brand'}
					<!-- Circular avatar for brands (like Spotify artists) -->
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 dark:bg-slate-800 shadow-md">
						<img src={entity.imageUrl} alt={entity.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
					</div>
				{:else if entity.type === 'category'}
					<!-- Category badge card with emoji -->
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-indigo-600 flex flex-col items-center justify-center text-white shadow-md">
						<span class="text-4xl sm:text-5xl drop-shadow-md mb-1">{(entity as CategoryEntity).emoji}</span>
					</div>
				{:else if entity.type === 'store'}
					<!-- Store badge -->
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl border border-border/80 dark:border-slate-700 shadow-md">
						<span>{(entity as StoreEntity).store.logo}</span>
					</div>
				{:else}
					<!-- Product thumbnail with high contrast -->
					<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/60 dark:border-slate-700 shadow-md">
						<img src={entity.imageUrl} alt={entity.title} class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
					</div>
				{/if}
			</div>

			<div class="flex-1 min-w-0 pt-1">
				<a href={entity.url} class="block focus:outline-none">
					<h3 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white line-clamp-2 hover:text-primary dark:hover:text-primary-light transition-colors tracking-tight leading-snug">
						{entity.title}
					</h3>
				</a>
				<p class="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-1 line-clamp-2">
					{entity.subtitle}
				</p>

				{#if entity.type === 'product'}
					{@const pe = entity as ProductEntity}
					<div class="mt-3 flex items-baseline gap-2">
						<span class="text-2xl font-black text-primary dark:text-emerald-400">
							{formatCurrency(pe.lowestPrice)}
						</span>
						{#if pe.mrp > pe.lowestPrice}
							<span class="text-xs sm:text-sm line-through text-slate-400 dark:text-slate-500">
								{formatCurrency(pe.mrp)}
							</span>
						{/if}
						<span class="text-[11px] text-text-secondary dark:text-slate-400 ml-1">
							at <strong class="text-text-primary dark:text-white capitalize">{pe.bestStoreName}</strong>
						</span>
					</div>
				{:else if entity.type === 'brand'}
					{@const be = entity as BrandEntity}
					<div class="mt-3 flex items-center gap-2">
						<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
							{be.productCount} SKUs verified
						</span>
						{#if be.minPrice > 0}
							<span class="text-xs text-text-secondary dark:text-slate-400">
								Starting from <strong>{formatCurrency(be.minPrice)}</strong>
							</span>
						{/if}
					</div>
				{:else if entity.type === 'category'}
					{@const ce = entity as CategoryEntity}
					<div class="mt-3 text-xs text-text-secondary dark:text-slate-400">
						{ce.description}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Bottom Action Bar (Spotify Play Button Equivalent) -->
	<div class="flex items-center justify-between pt-4 border-t border-border/40 dark:border-slate-800/80 mt-2">
		<span class="text-xs font-medium text-text-secondary dark:text-slate-400">
			{#if entity.type === 'product'}
				Found across {(entity as ProductEntity).storesCount} stores
			{:else if entity.type === 'brand'}
				{(entity as BrandEntity).categories.join(', ')}
			{:else if entity.type === 'store'}
				{(entity as StoreEntity).storeType === 'quick_commerce' ? '⚡ 10-Minute Delivery' : '📦 Pan-India Marketplace'}
			{:else}
				Browse entire category catalog
			{/if}
		</span>

		<a
			href={entity.url}
			onclick={handleAction}
			class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
		>
			<span>{entity.type === 'product' ? 'Compare Prices' : 'Explore All'}</span>
			<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</a>
	</div>
</div>
