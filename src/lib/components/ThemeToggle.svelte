<script lang="ts">
	import { onMount } from 'svelte';
	import { getStoredTheme, applyTheme, initThemeListener, type ThemeMode } from '$lib/utils/theme';

	let currentTheme = $state<ThemeMode>('system');
	let isOpen = $state(false);

	onMount(() => {
		currentTheme = getStoredTheme();
		applyTheme(currentTheme);
		const cleanup = initThemeListener();

		const onThemeEvent = (e: Event) => {
			const detail = (e as CustomEvent).detail;
			if (detail?.mode) currentTheme = detail.mode;
		};
		window.addEventListener('salespoint_theme_change', onThemeEvent);

		return () => {
			cleanup();
			window.removeEventListener('salespoint_theme_change', onThemeEvent);
		};
	});

	function setTheme(mode: ThemeMode) {
		currentTheme = mode;
		applyTheme(mode);
		isOpen = false;
	}
</script>

<div class="relative">
	<button
		type="button"
		onclick={() => isOpen = !isOpen}
		class="flex items-center justify-center w-9 h-9 rounded-xl border border-border/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-2xs transition-colors cursor-pointer"
		aria-label="Toggle theme mode"
		title={`Theme: ${currentTheme}`}
	>
		{#if currentTheme === 'dark'}
			<!-- Moon icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
			</svg>
		{:else if currentTheme === 'light'}
			<!-- Sun icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
		{:else}
			<!-- System monitor icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		{/if}
	</button>

	{#if isOpen}
		<!-- Backdrop for closing -->
		<div class="fixed inset-0 z-40" onclick={() => isOpen = false} role="presentation"></div>

		<!-- Dropdown -->
		<div class="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 shadow-xl p-1.5 z-50 text-xs font-semibold">
			<button
				type="button"
				onclick={() => setTheme('light')}
				class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer {currentTheme === 'light' ? 'bg-primary/10 text-primary dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-text-primary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
			>
				<span class="text-sm">☀️</span> Light
			</button>
			<button
				type="button"
				onclick={() => setTheme('dark')}
				class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer {currentTheme === 'dark' ? 'bg-primary/10 text-primary dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-text-primary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
			>
				<span class="text-sm">🌙</span> Dark
			</button>
			<button
				type="button"
				onclick={() => setTheme('system')}
				class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer {currentTheme === 'system' ? 'bg-primary/10 text-primary dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-text-primary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
			>
				<span class="text-sm">💻</span> System
			</button>
		</div>
	{/if}
</div>
