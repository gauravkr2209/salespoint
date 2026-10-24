<script lang="ts">
	let visible = $state(true);
</script>

{#if visible}
	<div class="w-full bg-primary text-white text-center py-2 px-4 text-sm relative z-50">
		<span class="font-medium">
			💡 Pro tip: Add <span class="bg-white/20 rounded px-1.5 py-0.5 font-mono text-xs">copyweb.com/</span> before any product link to compare prices instantly!
		</span>
		<button
			onclick={() => (visible = false)}
			class="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors cursor-pointer"
			aria-label="Dismiss banner"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}
