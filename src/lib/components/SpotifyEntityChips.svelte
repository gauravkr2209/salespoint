<script lang="ts">
	export type SpotifyTab = 'all' | 'products' | 'brands' | 'categories' | 'stores' | 'deals';

	let {
		activeTab = 'all',
		onTabChange,
		counts = {}
	}: {
		activeTab?: SpotifyTab;
		onTabChange?: (tab: SpotifyTab) => void;
		counts?: Partial<Record<SpotifyTab, number>>;
	} = $props();

	const tabs: { id: SpotifyTab; label: string; icon: string }[] = [
		{ id: 'all', label: 'All', icon: '✨' },
		{ id: 'products', label: 'Products', icon: '📦' },
		{ id: 'brands', label: 'Brands', icon: '🏷️' },
		{ id: 'categories', label: 'Categories', icon: '🗂️' },
		{ id: 'stores', label: 'Stores', icon: '⚡' },
		{ id: 'deals', label: 'Deals & Steals', icon: '🔥' }
	];

	function selectTab(tab: SpotifyTab) {
		if (onTabChange) onTabChange(tab);
	}
</script>

<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
	{#each tabs as tab}
		{@const isActive = activeTab === tab.id}
		{@const count = counts[tab.id]}
		<button
			type="button"
			onclick={() => selectTab(tab.id)}
			class="shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 {
				isActive
					? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102'
					: 'bg-white/80 dark:bg-slate-800/80 text-text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-border/60 dark:border-slate-700/60'
			}"
		>
			<span>{tab.icon}</span>
			<span>{tab.label}</span>
			{#if count !== undefined && count > 0}
				<span
					class="text-[10px] px-1.5 py-0.2 rounded-full font-mono {
						isActive
							? 'bg-white/20 text-white dark:bg-black/15 dark:text-slate-950 font-black'
							: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
					}"
				>
					{count}
				</span>
			{/if}
		</button>
	{/each}
</div>
