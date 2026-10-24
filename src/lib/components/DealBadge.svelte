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
		success: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
		warning: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
		danger: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
	};

	let colors = $derived(colorMap[rating.color]);
</script>

<div
	class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold {colors.bg} {colors.text} {colors.border}"
	title={rating.description}
>
	<span>{rating.label}</span>
</div>
