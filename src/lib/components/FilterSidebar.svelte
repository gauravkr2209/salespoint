<script lang="ts">
	import type { SearchFilters, StoreName } from '$lib/types';

	let {
		filters = $bindable(),
		categories,
		priceRange,
		onFilterChange
	}: {
		filters: SearchFilters;
		categories: { name: string; count: number }[];
		priceRange: { min: number; max: number };
		onFilterChange?: (filters: SearchFilters) => void;
	} = $props();

	const allStores: StoreName[] = ['Amazon', 'Flipkart', 'Myntra', 'Croma', 'Ajio'];

	const storeEmoji: Record<StoreName, string> = {
		Amazon: '📦',
		Flipkart: '🛒',
		Myntra: '👗',
		Croma: '🖥️',
		Ajio: '👟'
	};

	const discountOptions = [
		{ label: '20%+', value: 20 },
		{ label: '50%+', value: 50 },
		{ label: '70%+', value: 70 }
	];

	function notifyChange() {
		onFilterChange?.(filters);
	}

	function toggleCategory(cat: string) {
		if (filters.categories.includes(cat)) {
			filters.categories = filters.categories.filter((c) => c !== cat);
		} else {
			filters.categories = [...filters.categories, cat];
		}
		notifyChange();
	}

	function toggleStore(store: StoreName) {
		if (filters.stores.includes(store)) {
			filters.stores = filters.stores.filter((s) => s !== store);
		} else {
			filters.stores = [...filters.stores, store];
		}
		notifyChange();
	}

	function setDiscount(val: number) {
		filters.minDiscount = filters.minDiscount === val ? null : val;
		notifyChange();
	}

	function clearAll() {
		filters.categories = [];
		filters.stores = [];
		filters.priceMin = null;
		filters.priceMax = null;
		filters.minDiscount = null;
		notifyChange();
	}

	let hasActiveFilters = $derived(
		filters.categories.length > 0 ||
			filters.stores.length > 0 ||
			filters.priceMin !== null ||
			filters.priceMax !== null ||
			filters.minDiscount !== null
	);
</script>

<aside class="bg-surface rounded-xl border border-border p-5 space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">Filters</h3>
		{#if hasActiveFilters}
			<button
				onclick={clearAll}
				class="text-xs text-danger font-medium hover:underline cursor-pointer"
			>
				Clear All
			</button>
		{/if}
	</div>

	<!-- Categories -->
	{#if categories.length > 0}
		<div class="space-y-3">
			<h4 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">Category</h4>
			<div class="space-y-2">
				{#each categories as cat}
					<label class="flex items-center gap-2.5 cursor-pointer group">
						<input
							type="checkbox"
							checked={filters.categories.includes(cat.name)}
							onchange={() => toggleCategory(cat.name)}
							class="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
						/>
						<span class="flex-1 text-sm text-text-primary group-hover:text-primary transition-colors">
							{cat.name}
						</span>
						<span class="text-xs text-text-secondary bg-slate-100 px-1.5 py-0.5 rounded-full">
							{cat.count}
						</span>
					</label>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Stores -->
	<div class="space-y-3">
		<h4 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">Stores</h4>
		<div class="space-y-2">
			{#each allStores as store}
				<label class="flex items-center gap-2.5 cursor-pointer group">
					<input
						type="checkbox"
						checked={filters.stores.includes(store)}
						onchange={() => toggleStore(store)}
						class="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
					/>
					<span class="text-base">{storeEmoji[store]}</span>
					<span class="text-sm text-text-primary group-hover:text-primary transition-colors">
						{store}
					</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Price Range -->
	<div class="space-y-3">
		<h4 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">Price Range</h4>
		<div class="flex items-center gap-2">
			<div class="relative flex-1">
				<span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary">₹</span>
				<input
					type="number"
					placeholder={String(priceRange.min)}
					value={filters.priceMin ?? ''}
					oninput={(e) => {
						const val = (e.target as HTMLInputElement).value;
						filters.priceMin = val ? Number(val) : null;
						notifyChange();
					}}
					class="w-full pl-7 pr-2 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-text-primary"
					min="0"
				/>
			</div>
			<span class="text-text-secondary text-xs">to</span>
			<div class="relative flex-1">
				<span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary">₹</span>
				<input
					type="number"
					placeholder={String(priceRange.max)}
					value={filters.priceMax ?? ''}
					oninput={(e) => {
						const val = (e.target as HTMLInputElement).value;
						filters.priceMax = val ? Number(val) : null;
						notifyChange();
					}}
					class="w-full pl-7 pr-2 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-text-primary"
					min="0"
				/>
			</div>
		</div>
	</div>

	<!-- Discount Quick Filters -->
	<div class="space-y-3">
		<h4 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">Min Discount</h4>
		<div class="flex gap-2">
			{#each discountOptions as opt}
				<button
					onclick={() => setDiscount(opt.value)}
					class="flex-1 py-2 text-sm font-medium rounded-lg border transition-colors cursor-pointer
						{filters.minDiscount === opt.value
						? 'bg-primary text-white border-primary'
						: 'bg-surface text-text-primary border-border hover:border-primary/50'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>
</aside>
