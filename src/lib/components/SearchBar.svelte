<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSuggestions } from '$lib/search/engine';
	import { isUrl } from '$lib/search/urlParser';
	import { findProductByUrl } from '$lib/data/products';
	import TypewriterText from './TypewriterText.svelte';
	import type { SuggestionItem } from '$lib/search/suggestions';
	import { formatCurrency } from '$lib/utils/formatPrice';

	let {
		onSearch,
		initialValue = '',
		placeholder = 'Search products, brands, or compare prices...'
	}: {
		onSearch?: (query: string) => void;
		initialValue?: string;
		placeholder?: string;
	} = $props();

	const placeholderTexts = [
		"Search 'Lay's Magic Masala'...",
		'Search for Coca-Cola 750ml...',
		'Search for iPhone 16 Pro Max...',
		'Search for Kurkure Masala Munch...',
		'Search for Sony WH-1000XM5...',
		'Paste any Amazon or Blinkit link...'
	];

	const trendingQueries = [
		{ label: "Lay's", query: "Lay's", icon: '🥔' },
		{ label: 'Coca-Cola', query: 'Coca-Cola', icon: '🥤' },
		{ label: 'Doritos', query: 'Doritos', icon: '🌽' },
		{ label: 'Smartphones', query: 'Smartphones', icon: '📱' },
		{ label: 'Laptops', query: 'Laptops', icon: '💻' },
		{ label: 'Headphones', query: 'Headphones', icon: '🎧' }
	];

	let query = $state('');
	$effect(() => {
		query = initialValue;
	});

	let isFocused = $state(false);
	let showDropdown = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let suggestions = $state<SuggestionItem[]>([]);
	let selectedIndex = $state(-1);
	let inputElement: HTMLInputElement | undefined = $state();

	function handleInput() {
		if (debounceTimer) clearTimeout(debounceTimer);

		if (!query.trim()) {
			suggestions = [];
			showDropdown = true;
			return;
		}

		if (isUrl(query)) {
			suggestions = [];
			showDropdown = false;
			return;
		}

		debounceTimer = setTimeout(() => {
			suggestions = getSuggestions(query, 6);
			showDropdown = true;
			selectedIndex = -1;
		}, 150);
	}

	function commitSearch(finalQuery: string) {
		if (!finalQuery.trim()) return;

		showDropdown = false;
		query = finalQuery;

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
		const chosen = selectedIndex >= 0 && suggestions[selectedIndex] 
			? suggestions[selectedIndex].text 
			: query;
		commitSearch(chosen);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			showDropdown = false;
			inputElement?.blur();
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (suggestions.length > 0) {
				selectedIndex = (selectedIndex + 1) % suggestions.length;
			}
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (suggestions.length > 0) {
				selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
			}
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
			return;
		}
	}

	function handleSelectSuggestion(item: SuggestionItem) {
		if (item.type === 'product' && item.product) {
			goto(`/product/${item.product.id}`);
		} else if (item.type === 'category' && item.category) {
			goto(`/search?category=${encodeURIComponent(item.category)}`);
		} else {
			commitSearch(item.text);
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
			<span>🔗</span> Store URL recognized — press Enter to inspect price comparison
		</div>
	{/if}

	<!-- Autocomplete Dropdown Menu -->
	{#if showDropdown}
		<div
			class="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-border/80 dark:border-slate-800 shadow-2xl z-50 overflow-hidden divide-y divide-border/60 dark:divide-slate-800 animate-in fade-in zoom-in-98 duration-150"
		>
			{#if !query.trim()}
				<!-- Trending Quick Queries -->
				<div class="p-4 space-y-3">
					<h4 class="text-[11px] font-black text-text-secondary dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
						<span>🔥</span> Popular Searches
					</h4>
					<div class="flex flex-wrap gap-2">
						{#each trendingQueries as t}
							<button
								type="button"
								onmousedown={() => commitSearch(t.query)}
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-text-primary dark:text-slate-200 transition-colors cursor-pointer"
							>
								<span>{t.icon}</span>
								<span>{t.label}</span>
							</button>
						{/each}
					</div>
				</div>
			{:else if suggestions.length > 0}
				<!-- Live Matching Suggestions -->
				<div class="p-2 space-y-1">
					{#each suggestions as item, idx}
						<div
							onmousedown={() => handleSelectSuggestion(item)}
							class="flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer {
								idx === selectedIndex 
									? 'bg-primary/10 text-primary dark:bg-primary/20' 
									: 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-text-primary dark:text-white'
							}"
							role="button"
							tabindex="0"
						>
							<div class="flex items-center gap-3 min-w-0">
								{#if item.imageUrl}
									<div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-border/40 dark:border-slate-700">
										<img src={item.imageUrl} alt="" class="w-full h-full object-contain p-0.5" />
									</div>
								{:else if item.type === 'category'}
									<div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm">
										🏷️
									</div>
								{:else}
									<div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-sm">
										🔍
									</div>
								{/if}
								<div class="min-w-0">
									<p class="text-xs sm:text-sm font-bold truncate">
										{item.text}
									</p>
									{#if item.category}
										<p class="text-[10px] text-text-secondary dark:text-slate-400">
											In Category • {item.category}
										</p>
									{/if}
								</div>
							</div>

							{#if item.price}
								<div class="text-right shrink-0 pl-2">
									<span class="text-xs font-black text-primary dark:text-emerald-400">
										From {formatCurrency(item.price)}
									</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Footer Action -->
				<div class="p-3 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
					<span class="text-[11px] text-text-secondary dark:text-slate-400">
						Press <kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono border border-border">Enter</kbd> to search
					</span>
					<button
						type="button"
						onmousedown={handleSubmit}
						class="text-xs font-bold text-primary dark:text-primary-light hover:underline cursor-pointer"
					>
						Search for "{query}" →
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
