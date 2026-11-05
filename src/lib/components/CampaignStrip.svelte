<script lang="ts">
	let visible = $state(true);
</script>

{#if visible}
	<div class="w-full bg-gradient-to-r from-[#1A1235] via-[#2A1E4D] to-[#1A1235] border-b border-[#3A3A52] text-[#C9C2E3] text-center py-2.5 pr-10 pl-4 sm:px-12 text-xs sm:text-sm relative z-50 shadow-sm">
		<span class="font-medium inline-flex items-center gap-1.5 flex-wrap justify-center">
			<span class="text-[#8B7CC7]">💡</span>
			<span>Pro tip: Add</span>
			<span class="bg-[#0E0B1D] text-[#8B7CC7] border border-[#3A3A52] rounded-md px-2 py-0.5 font-mono text-xs font-bold tracking-tight">salespoint.in/</span>
			<span>before any product link to compare multi-store prices instantly!</span>
		</span>
		<button
			onclick={() => (visible = false)}
			class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B7CC7] hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-[#3A3A52]/50"
			aria-label="Dismiss banner"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}
