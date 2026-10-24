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

	const allStores: StoreName[] = [
		'Amazon',
		'Flipkart',
		'Blinkit',
		'Zepto',
		'Flipkart Minutes',
		'Myntra',
		'Croma',
		'Ajio'
	];

	const storeEmoji: Record<StoreName, string> = {
		Amazon: '🛒',
		Flipkart: '🛍️',
		Blinkit: '⚡',
		Zepto: '🚀',
		'Flipkart Minutes': '⏱️',
		Myntra: '👗',
		Croma: '🔌',
		Ajio: '✨'
	};

	const discountOptions = [
		{ label: '10%+', value: 10 },
		{ label: '20%+', value: 20 },
		{ label: '30%+', value: 30 },
		{ label: '50%+', value: 50 }
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

<aside class="bg-white dark:bg-slate-800 rounded-2xl border border-border/80 dark:border-slate-700 p-5 space-y-6 shadow-sm">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h3 class="text-xs font-black text-text-primary dark:text-slate-100 uppercase tracking-wider">
			Filters
		</h3>
		{#if hasActiveFilters}
			<button
				onclick={clearAll}
				class="text-xs text-danger font-bold hover:underline cursor-pointer"
			>
				Clear All
			</button>
		{/if}
	</div>

	<!-- Categories -->
	{#if categories.length > 0}
		<div class="space-y-3">
			<h4 class="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">
				Categories ({categories.length})
			</h4>
			<div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
				{#each categories as cat}
					<label class="flex items-center gap-2.5 cursor-pointer group py-1">
						<input
							type="checkbox"
							checked={filters.categories.includes(cat.name)}
							onchange={() => toggleCategory(cat.name)}
							class="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
						/>
						<span class="flex-1 text-xs font-medium text-text-primary dark:text-slate-300 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors truncate">
							{cat.name}
						</span>
						<span class="text-[10px] text-text-secondary dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded-full font-bold">
							{cat.count}
						</span>
					</label>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Stores -->
	<div class="space-y-3">
		<h4 class="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">
			Sellers & Quick Commerce
		</h4>
		<div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
			{#each allStores as store}
				<label class="flex items-center gap-2.5 cursor-pointer group py-1">
					<input
						type="checkbox"
						checked={filters.stores.includes(store)}
						onchange={() => toggleStore(store)}
						class="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
					/>
					<span class="text-sm">{storeEmoji[store]}</span>
					<span class="flex-1 text-xs font-medium text-text-primary dark:text-slate-300 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
						{store}
					</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Price Range -->
	<div class="space-y-3">
		<h4 class="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">
			Price Range
		</h4>
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
					class="w-full pl-6 pr-2 py-2 text-xs border border-border dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary dark:bg-slate-900 text-text-primary dark:text-white"
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
					class="w-full pl-6 pr-2 py-2 text-xs border border-border dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary dark:bg-slate-900 text-text-primary dark:text-white"
					min="0"
				/>
			</div>
		</div>
	</div>

	<!-- Discount Quick Filters -->
	<div class="space-y-3">
		<h4 class="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider">
			Min Discount
		</h4>
		<div class="grid grid-cols-2 gap-1.5">
			{#each discountOptions as opt}
				<button
					type="button"
					onclick={() => setDiscount(opt.value)}
					class="py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer
						{filters.minDiscount === opt.value
						? 'bg-primary text-white border-primary shadow-xs'
						: 'bg-white dark:bg-slate-900 text-text-primary dark:text-slate-300 border-border dark:border-slate-700 hover:border-primary/50'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>
</aside>
