<script lang="ts">
	import { getDealRating } from '$lib/utils/dealRating';

	let {
		currentPrice,
		lowestPrice,
		highestPrice,
		averagePrice
	}: {
		currentPrice: number;
		lowestPrice: number;
		highestPrice: number;
		averagePrice: number;
	} = $props();

	let rating = $derived(getDealRating(currentPrice, lowestPrice, highestPrice, averagePrice));

	const colorMap = {
		success: {
			bg: 'bg-emerald-950/40',
			text: 'text-emerald-400',
			border: 'border-emerald-800/60'
		},
		warning: {
			bg: 'bg-amber-950/40',
			text: 'text-amber-400',
			border: 'border-amber-800/60'
		},
		danger: {
			bg: 'bg-rose-950/40',
			text: 'text-rose-400',
			border: 'border-rose-800/60'
		}
	};

	let colors = $derived(colorMap[rating.color]);
</script>

<div
	class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold {colors.bg} {colors.text} {colors.border} shadow-xs"
	title={rating.description}
>
	<span>{rating.label}</span>
</div>
