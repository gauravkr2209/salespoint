export interface DealRating {
	label: string;
	color: 'success' | 'warning' | 'danger';
	description: string;
}

export function getDealRating(
	currentPrice: number,
	lowestPrice: number,
	highestPrice: number,
	averagePrice: number
): DealRating {
	if (currentPrice <= lowestPrice) {
		return {
			label: '🔥 Lowest Price Ever!',
			color: 'success',
			description: `This is the lowest price we've ever tracked for this product.`
		};
	}

	if (currentPrice <= averagePrice * 0.9) {
		return {
			label: '✅ Great Deal',
			color: 'success',
			description: `This price is significantly below the average price of this product.`
		};
	}

	if (currentPrice <= averagePrice) {
		return {
			label: '👍 Good Deal',
			color: 'success',
			description: `This price is below or at the average — a good time to buy.`
		};
	}

	if (currentPrice > highestPrice * 0.95) {
		return {
			label: '🚨 Price Hiked!',
			color: 'danger',
			description: `The price is near or at its all-time high. Consider waiting for a drop.`
		};
	}

	if (currentPrice <= averagePrice * 1.1) {
		return {
			label: '⚠️ Average Price',
			color: 'warning',
			description: `The price is close to the average. You might find a better deal later.`
		};
	}

	return {
		label: '📊 Fair Price',
		color: 'warning',
		description: `The price is above average but not at the highest. Consider waiting for sales.`
	};
}
