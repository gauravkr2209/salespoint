export function formatPrice(price: number): string {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0
	}).format(price);
}

export function formatDiscount(mrp: number, price: number): number {
	return Math.round(((mrp - price) / mrp) * 100);
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}
