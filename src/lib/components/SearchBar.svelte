<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSuggestions } from '$lib/search/engine';
	import { isUrl } from '$lib/search/urlParser';
	import { findProductByUrl } from '$lib/data/products';
	import TypewriterText from './TypewriterText.svelte';
	import type { SuggestionItem } from '$lib/search/suggestions';

	let { onSearch, initialValue = '' }: { onSearch?: (query: string) => void; initialValue?: string } = $props();

	const placeholderTexts = [
		'Search for iPhone 16...',
		'Search for Nike shoes...',
		'Paste any Amazon link...',
		'Search for boAt earbuds...',
		'Paste any Flipkart link...'
	];

	let query = $state('');
	$effect(() => {
		query = initialValue;
	});
	let suggestions = $state<SuggestionItem[]>([]);
	let showDropdown = $state(false);
	let selectedIndex = $state(-1);
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let inputElement: HTMLInputElement | undefined = $state();
	let isFocused = $state(false);

	function handleInput() {
		if (debounceTimer) clearTimeout(debounceTimer);

		if (!query.trim()) {
			suggestions = [];
			showDropdown = false;
			return;
		}

		// Don't autocomplete URLs
		if (isUrl(query)) {
			suggestions = [];
			showDropdown = false;
			return;
		}

		debounceTimer = setTimeout(() => {
			const results = getSuggestions(query);
			suggestions = results;
			showDropdown = results.length > 0;
			selectedIndex = -1;
		}, 250);
	}

	function handleSubmit() {
		const finalQuery = selectedIndex >= 0 ? suggestions[selectedIndex].text : query;
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

	function handleKeydown(e: KeyboardEvent) {
		if (!showDropdown) {
			if (e.key === 'Enter') {
				handleSubmit();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = (selectedIndex + 1) % suggestions.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
				break;
			case 'Enter':
				e.preventDefault();
				handleSubmit();
				break;
			case 'Escape':
				showDropdown = false;
				selectedIndex = -1;
				break;
		}
	}

	function selectSuggestion(index: number) {
		const item = suggestions[index];
		showDropdown = false;
		selectedIndex = -1;
		if (item.type === 'product' && item.product) {
			goto(`/product/${item.product.id}`);
			return;
		}
		if (item.type === 'category' && item.category) {
			goto(`/search?q=${encodeURIComponent(item.category)}`);
			return;
		}
		query = item.text;
		handleSubmit();
	}

	function getSuggestionIcon(type: string): string {
		switch (type) {
			case 'product':
				return '📦';
			case 'category':
				return '📂';
			default:
				return '🔍';
		}
	}
</script>

<div class="relative w-full max-w-2xl mx-auto">
	<!-- Search input wrapper -->
	<div
		class="relative flex items-center bg-surface rounded-full border-2 transition-all duration-200 shadow-sm {isFocused
			? 'border-primary shadow-lg shadow-primary/10'
			: 'border-border hover:border-primary/50'}"
	>
		<!-- Search icon -->
		<div class="absolute left-4 text-text-secondary pointer-events-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</div>

		<input
			bind:this={inputElement}
			bind:value={query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => {
				isFocused = true;
				if (suggestions.length > 0) showDropdown = true;
			}}
			onblur={() => {
				isFocused = false;
				// Delay closing so click on suggestion registers
				setTimeout(() => (showDropdown = false), 200);
			}}
			type="text"
			class="w-full py-4 pl-12 pr-28 text-base bg-transparent text-text-primary outline-none placeholder-transparent"
			placeholder="Search products or paste a link..."
			aria-label="Search products or paste a link"
			autocomplete="off"
		/>

		<!-- Typewriter placeholder (only when input is empty) -->
		{#if !query}
			<div
				class="absolute left-12 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none select-none"
			>
				<TypewriterText texts={placeholderTexts} speed={70} pause={1800} />
			</div>
		{/if}

		<!-- Search button -->
		<button
			onclick={handleSubmit}
			class="absolute right-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium text-sm transition-colors duration-150 cursor-pointer flex items-center gap-1.5"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
			Search
		</button>
	</div>

	<!-- URL detection hint -->
	{#if query && isUrl(query)}
		<div class="absolute left-4 -bottom-6 text-xs text-primary font-medium flex items-center gap-1">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.514a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
			</svg>
			Product link detected — press Enter to compare prices
		</div>
	{/if}

	<!-- Autocomplete dropdown -->
	{#if showDropdown && suggestions.length > 0}
		<div
			class="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl border border-border shadow-xl z-50 overflow-hidden"
		>
			{#each suggestions as suggestion, i}
				<button
					onmousedown={() => selectSuggestion(i)}
					class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer {i === selectedIndex
						? 'bg-primary/5 text-primary'
						: 'text-text-primary hover:bg-slate-50'}"
				>
					<span class="text-lg">{getSuggestionIcon(suggestion.type)}</span>
					<span class="flex-1 text-sm font-medium">{suggestion.text}</span>
					<span
						class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-text-secondary capitalize"
					>
						{suggestion.type}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
