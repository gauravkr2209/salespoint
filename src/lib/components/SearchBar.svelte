<script lang="ts">
	import { goto } from '$app/navigation';
	import { isUrl } from '$lib/search/urlParser';
	import { findProductByUrl } from '$lib/data/products';
	import { executeSpotifySearch, type SpotifySearchResults, type SearchEntity } from '$lib/search/spotifyEngine';
	import { addRecentSearch, getRecentSearches, type RecentSearchItem } from '$lib/search/recentSearches';
	import SpotifyRecentSearches from './SpotifyRecentSearches.svelte';
	import TypewriterText from './TypewriterText.svelte';
	import { formatCurrency } from '$lib/utils/formatPrice';

	let {
		onSearch,
		initialValue = '',
		placeholder = 'Search products, brands, or try brand:lays store:blinkit...'
	}: {
		onSearch?: (query: string) => void;
		initialValue?: string;
		placeholder?: string;
	} = $props();

	const placeholderTexts = [
		"Search 'Lay's Magic Masala'...",
		'Try brand:coca-cola max:50...',
		'Search for iPhone 16 Pro Max...',
		'Try store:blinkit tag:deal...',
		'Search for Sony WH-1000XM5...',
		'Paste any Amazon or Zepto link...'
	];

	const trendingQueries = [
		{ label: "Lay's", query: "brand:lay's", icon: '🥔' },
		{ label: 'Coca-Cola', query: 'brand:coca-cola', icon: '🥤' },
		{ label: 'Doritos', query: 'brand:doritos', icon: '🌽' },
		{ label: '10-Min Deals', query: 'store:blinkit tag:deal', icon: '⚡' },
		{ label: 'Headphones', query: 'category:headphones', icon: '🎧' },
		{ label: 'Chocolates', query: 'category:chocolates', icon: '🍫' }
	];

	let query = $state('');
	$effect(() => {
		query = initialValue;
	});

	let isFocused = $state(false);
	let showDropdown = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let searchResults = $state<SpotifySearchResults | null>(null);
	let selectedIndex = $state(-1);
	let inputElement: HTMLInputElement | undefined = $state();
	let recentSearchesCount = $state(0);

	function updateRecentsCount() {
		recentSearchesCount = getRecentSearches().length;
	}

	$effect(() => {
		updateRecentsCount();
	});

	function handleInput() {
		if (debounceTimer) clearTimeout(debounceTimer);

		if (!query.trim()) {
			searchResults = null;
			showDropdown = true;
			return;
		}

		if (isUrl(query)) {
			searchResults = null;
			showDropdown = false;
			return;
		}

		debounceTimer = setTimeout(() => {
			searchResults = executeSpotifySearch(query);
			showDropdown = true;
			selectedIndex = -1;
		}, 160);
	}

	function commitSearch(finalQuery: string, entity?: SearchEntity) {
		if (!finalQuery.trim()) return;

		// Save to recent searches
		if (entity) {
			addRecentSearch({
				query: finalQuery,
				type: entity.type,
				title: entity.title,
				subtitle: entity.subtitle,
				imageUrl: entity.imageUrl,
				url: entity.url
			});
		} else {
			addRecentSearch({
				query: finalQuery,
				type: 'query',
				title: finalQuery,
				subtitle: 'Search query'
			});
		}

		showDropdown = false;
		query = finalQuery;
		updateRecentsCount();

		if (isUrl(finalQuery)) {
			const matched = findProductByUrl(finalQuery);
			if (matched) {
				goto(`/product/${matched.id}`);
				return;
			}
		}

		if (onSearch) {
			onSearch(finalQuery);
		} else {
			goto(`/search?q=${encodeURIComponent(finalQuery)}`);
		}
	}

	function handleSubmit() {
		commitSearch(query);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			showDropdown = false;
			inputElement?.blur();
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
			return;
		}
	}

	function handleRecentSelect(item: RecentSearchItem) {
		if (item.url) {
			goto(item.url);
		} else {
			commitSearch(item.query);
		}
	}
</script>

<div class="relative w-full max-w-2xl mx-auto">
	<!-- Search input container -->
	<div
		class="relative flex items-center bg-white dark:bg-slate-900 rounded-full border-2 transition-all duration-300 shadow-md {
			isFocused
				? 'border-primary ring-4 ring-primary/10 shadow-xl shadow-primary/10'
				: 'border-border/80 dark:border-slate-800 hover:border-primary/50'
		}"
	>
		<!-- Search Icon -->
		<div class="absolute left-4.5 text-text-secondary dark:text-slate-400 pointer-events-none flex items-center">
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
			</svg>
		</div>

		<input
			bind:this={inputElement}
			bind:value={query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => {
				isFocused = true;
				showDropdown = true;
				updateRecentsCount();
			}}
			onblur={() => {
				isFocused = false;
				setTimeout(() => {
					showDropdown = false;
				}, 250);
			}}
			type="text"
			class="w-full py-4 pl-12 pr-28 text-sm sm:text-base bg-transparent text-text-primary dark:text-white outline-none placeholder-transparent font-medium"
			placeholder={placeholder}
			aria-label="Search catalog"
			autocomplete="off"
			spellcheck="false"
		/>

		<!-- Typewriter Animated Placeholder -->
		{#if !query}
			<div class="absolute left-12 top-1/2 -translate-y-1/2 text-text-secondary dark:text-slate-400 pointer-events-none select-none text-xs sm:text-sm truncate max-w-[65%]">
				<TypewriterText texts={placeholderTexts} speed={70} pause={2000} />
			</div>
		{/if}

		<!-- Search Action Button -->
		<button
			type="button"
			onclick={handleSubmit}
			class="absolute right-2 bg-primary hover:bg-primary-hover active:scale-95 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md shadow-primary/25"
		>
			<span>Search</span>
			<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</button>
	</div>

	<!-- URL Detection Banner -->
	{#if query && isUrl(query)}
		<div class="absolute left-4 -bottom-6 text-xs text-primary dark:text-indigo-400 font-bold flex items-center gap-1.5">
			<span>🔗</span> Store URL recognized — press Enter to inspect price breakdown
		</div>
	{/if}

	<!-- Spotify-Style Instant Dropdown Drawer -->
	{#if showDropdown}
		<div
			class="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-border/80 dark:border-slate-800 shadow-2xl z-50 overflow-hidden divide-y divide-border/60 dark:divide-slate-800 animate-in fade-in zoom-in-98 duration-150"
		>
			{#if !query.trim()}
				<!-- Zero-State: Recent Searches & Browse Shortcuts -->
				<div class="p-4 space-y-4">
					{#if recentSearchesCount > 0}
						<SpotifyRecentSearches compact={true} onSelect={handleRecentSelect} />
					{/if}

					<!-- Trending Quick Queries -->
					<div>
						<h4 class="text-[11px] font-black text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
							<span>🔥</span> Trending Searches
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each trendingQueries as t}
								<button
									type="button"
									onmousedown={() => commitSearch(t.query)}
									class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-text-primary dark:text-slate-200 transition-colors"
								>
									<span>{t.icon}</span>
									<span>{t.label}</span>
								</button>
							{/each}
						</div>
					</div>

					<!-- Spotify Power Syntax Cheatsheet -->
					<div class="pt-2 border-t border-border/40 dark:border-slate-800">
						<p class="text-[11px] text-text-secondary dark:text-slate-400 flex items-center justify-between">
							<span>💡 <strong>Spotify Search Syntax:</strong> <code class="text-primary font-mono">brand:lays</code>, <code class="text-primary font-mono">store:blinkit</code>, <code class="text-primary font-mono">tag:deal</code>, <code class="text-primary font-mono">max:100</code></span>
							<a href="/search?q=" class="text-primary hover:underline font-bold text-[11px] ml-2">Browse All →</a>
						</p>
					</div>
				</div>
			{:else if searchResults}
				<!-- As-You-Type Spotify Results -->
				<div class="p-3 space-y-3">
					<!-- Mini Top Result (Spotify Hero Result preview) -->
					{#if searchResults.topResult}
						{@const tr = searchResults.topResult}
						<div
							onmousedown={() => commitSearch(tr.title, tr)}
							class="p-3 rounded-xl bg-gradient-to-r from-primary/10 via-indigo-500/5 to-transparent border border-primary/20 hover:bg-primary/15 transition-all cursor-pointer flex items-center justify-between gap-3"
							role="button"
							tabindex="0"
						>
							<div class="flex items-center gap-3 min-w-0">
								<div class="w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shrink-0 border border-primary/20 shadow-xs flex items-center justify-center">
									{#if tr.type === 'category'}
										<span class="text-2xl">{tr.subtitle.slice(-2)}</span>
									{:else}
										<img src={tr.imageUrl} alt="" class="w-full h-full object-contain p-1" />
									{/if}
								</div>
								<div class="min-w-0">
									<div class="flex items-center gap-2">
										<span class="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-primary text-white font-mono">
											Top Result • {tr.type}
										</span>
									</div>
									<h4 class="text-xs sm:text-sm font-black text-text-primary dark:text-white truncate mt-0.5">
										{tr.title}
									</h4>
									<p class="text-[11px] text-text-secondary dark:text-slate-400 truncate">
										{tr.subtitle}
									</p>
								</div>
							</div>
							<span class="shrink-0 text-xs font-bold text-primary dark:text-primary-light flex items-center gap-1">
								View →
							</span>
						</div>
					{/if}

					<!-- Top Matching Products -->
					{#if searchResults.topProducts.length > 0}
						<div class="space-y-1">
							<span class="text-[10px] font-mono font-bold tracking-wider uppercase text-text-secondary dark:text-slate-400 px-2">
								Products ({searchResults.totalMatches})
							</span>
							{#each searchResults.topProducts.slice(0, 4) as p}
								<div
									onmousedown={() => {
										addRecentSearch({
											query: p.title,
											type: 'product',
											title: p.title,
											subtitle: p.subtitle,
											imageUrl: p.imageUrl,
											url: p.url
										});
										goto(p.url);
									}}
									class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"
									role="button"
									tabindex="0"
								>
									<div class="flex items-center gap-3 min-w-0">
										<div class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-border/40 dark:border-slate-700">
											<img src={p.imageUrl} alt="" class="w-full h-full object-contain p-0.5" />
										</div>
										<div class="min-w-0">
											<p class="text-xs font-bold text-text-primary dark:text-white truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
												{p.title}
											</p>
											<p class="text-[10px] text-text-secondary dark:text-slate-400 truncate">
												{p.brand} • {p.bestStoreName}
											</p>
										</div>
									</div>
									<div class="text-right shrink-0 pl-2">
										<span class="text-xs font-black text-primary dark:text-emerald-400">
											{formatCurrency(p.lowestPrice)}
										</span>
									</div>
								</div>
							{/each}
						</div>
					{/if}

					<!-- Matching Brands Pill Shelf -->
					{#if searchResults.matchingBrands.length > 0}
						<div class="pt-2 border-t border-border/40 dark:border-slate-800">
							<span class="text-[10px] font-mono font-bold tracking-wider uppercase text-text-secondary dark:text-slate-400 block mb-1.5">
								Matching Brands
							</span>
							<div class="flex flex-wrap gap-1.5">
								{#each searchResults.matchingBrands.slice(0, 5) as b}
									<button
										type="button"
										onmousedown={() => commitSearch(`brand:${b.name.toLowerCase()}`, b)}
										class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-text-primary dark:text-slate-200 transition-colors"
									>
										<span class="w-3.5 h-3.5 rounded-full overflow-hidden bg-white shrink-0">
											<img src={b.imageUrl} alt="" class="w-full h-full object-cover" />
										</span>
										<span>{b.name}</span>
										<span class="text-[10px] text-slate-400">({b.productCount})</span>
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- View All Results Action -->
					<div class="pt-2 border-t border-border/40 dark:border-slate-800 flex items-center justify-between px-2">
						<span class="text-[11px] text-text-secondary dark:text-slate-400">
							Press <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono border">Enter</kbd> to see all {searchResults.totalMatches} results
						</span>
						<button
							type="button"
							onmousedown={handleSubmit}
							class="text-xs font-bold text-primary dark:text-primary-light hover:underline"
						>
							See all results →
						</button>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
