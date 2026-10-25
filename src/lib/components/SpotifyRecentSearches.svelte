<script lang="ts">
	import { getRecentSearches, removeRecentSearch, clearRecentSearches, type RecentSearchItem } from '$lib/search/recentSearches';

	let {
		onSelect,
		compact = false
	}: {
		onSelect?: (item: RecentSearchItem) => void;
		compact?: boolean;
	} = $props();

	let items = $state<RecentSearchItem[]>([]);

	function refresh() {
		items = getRecentSearches();
	}

	$effect(() => {
		refresh();
	});

	function handleRemove(e: MouseEvent, id: string) {
		e.stopPropagation();
		e.preventDefault();
		items = removeRecentSearch(id);
	}

	function handleClearAll(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		clearRecentSearches();
		items = [];
	}

	function handleSelect(item: RecentSearchItem) {
		if (onSelect) onSelect(item);
	}
</script>

{#if items.length > 0}
	<div class="space-y-3">
		<div class="flex items-center justify-between">
			<h3 class="text-xs sm:text-sm font-black text-text-primary dark:text-white tracking-wider uppercase font-mono flex items-center gap-2">
				<span>🕒</span> Recent Searches
			</h3>
			<button
				type="button"
				onclick={handleClearAll}
				class="text-[11px] font-bold text-text-secondary dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
			>
				Clear all
			</button>
		</div>

		{#if compact}
			<!-- Compact Chip Flow for Dropdown -->
			<div class="flex flex-wrap gap-2">
				{#each items as item}
					<div
						class="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-text-primary dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-border/40 dark:border-slate-700"
						onclick={() => handleSelect(item)}
						onkeydown={(e) => e.key === 'Enter' && handleSelect(item)}
						role="button"
						tabindex="0"
					>
						{#if item.imageUrl}
							<img src={item.imageUrl} alt="" class="w-4 h-4 rounded-full object-cover" />
						{:else}
							<span class="text-slate-400">🔍</span>
						{/if}
						<span class="font-medium max-w-[160px] truncate">{item.title}</span>
						<button
							type="button"
							onclick={(e) => handleRemove(e, item.id)}
							class="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
							aria-label="Remove search"
						>
							×
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Grid Shelf for Search Page -->
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
				{#each items as item}
					<div
						class="group relative bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
						onclick={() => handleSelect(item)}
						onkeydown={(e) => e.key === 'Enter' && handleSelect(item)}
						role="button"
						tabindex="0"
					>
						<div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center border border-border/40 dark:border-slate-700">
							{#if item.imageUrl}
								<img src={item.imageUrl} alt="" class="w-full h-full object-contain p-1" />
							{:else}
								<span class="text-base text-slate-400">🔍</span>
							{/if}
						</div>

						<div class="flex-1 min-w-0 pr-4">
							<p class="text-xs font-bold text-text-primary dark:text-white truncate">
								{item.title}
							</p>
							{#if item.subtitle}
								<p class="text-[10px] text-text-secondary dark:text-slate-400 truncate">
									{item.subtitle}
								</p>
							{/if}
						</div>

						<button
							type="button"
							onclick={(e) => handleRemove(e, item.id)}
							class="absolute top-2 right-2 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center text-xs text-slate-400 transition-colors shadow-2xs"
							aria-label="Delete"
						>
							×
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
