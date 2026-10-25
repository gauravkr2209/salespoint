/** Format a number as Indian Rupees (₹) */
const formatter = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

export function formatPrice(price: number): string {
	return formatter.format(price);
}

export const formatCurrency = formatPrice;

export function getDiscountPercent(mrp: number, price: number): number {
	if (mrp <= 0 || price >= mrp) return 0;
	return Math.round(((mrp - price) / mrp) * 100);
}
