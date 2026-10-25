<script lang="ts">
	import { getAllCategoriesForBrowse, type CategorySummary } from '$lib/search/spotifyEngine';

	let { onSelectCategory }: { onSelectCategory?: (category: string) => void } = $props();

	const categories: CategorySummary[] = getAllCategoriesForBrowse();

	function handleClick(catName: string) {
		if (onSelectCategory) {
			onSelectCategory(catName);
		}
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white tracking-tight">
			Browse All Categories
		</h2>
		<span class="text-xs text-text-secondary dark:text-slate-400">
			{categories.length} Curated Departments
		</span>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
		{#each categories as cat}
			<a
				href="/search?category={encodeURIComponent(cat.name)}"
				onclick={() => handleClick(cat.name)}
				class="group relative h-36 sm:h-44 rounded-2xl p-4 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br {cat.theme.gradient} flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
			>
				<!-- Subtle texture overlay -->
				<div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

				<!-- Bold Category Title -->
				<div class="relative z-10">
					<span class="text-2xl sm:text-3xl block mb-1 drop-shadow-sm">{cat.theme.emoji}</span>
					<h3 class="text-white font-black text-sm sm:text-base leading-snug tracking-tight drop-shadow-md line-clamp-2">
						{cat.name}
					</h3>
					<span class="text-[11px] font-medium text-white/80 block mt-0.5">
						{cat.productCount} verified items
					</span>
				</div>

				<!-- Corner Art Tile (Spotify tilted thumbnail effect) -->
				<div class="absolute -bottom-3 -right-3 w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden shadow-2xl rotate-[22deg] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300 pointer-events-none border-2 border-white/20 bg-slate-900/40">
					<img
						src={cat.sampleImage}
						alt={cat.name}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
