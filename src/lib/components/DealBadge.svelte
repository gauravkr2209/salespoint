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
			bg: 'bg-green-100 dark:bg-emerald-950/60',
			text: 'text-green-800 dark:text-emerald-300',
			border: 'border-green-300 dark:border-emerald-800'
		},
		warning: {
			bg: 'bg-amber-100 dark:bg-amber-950/60',
			text: 'text-amber-800 dark:text-amber-300',
			border: 'border-amber-300 dark:border-amber-800'
		},
		danger: {
			bg: 'bg-red-100 dark:bg-red-950/60',
			text: 'text-red-800 dark:text-red-300',
			border: 'border-red-300 dark:border-red-800'
		}
	};

	let colors = $derived(colorMap[rating.color]);
</script>

<div
	class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold {colors.bg} {colors.text} {colors.border}"
	title={rating.description}
>
	<span>{rating.label}</span>
</div>
