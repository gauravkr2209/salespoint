import { products } from './products';
import type { StoreName } from '$lib/types';

export interface PricePoint {
	date: string;
	price: number;
	store: StoreName;
}

/** Get price history for a product */
export function getPriceHistory(productId: string): PricePoint[] {
	const product = products.find((p) => p.id === productId);
	if (!product) return [];
	return product.priceHistory;
}

/** Get the lowest ever price from history */
export function getLowestPrice(productId: string): { price: number; date: string; store: StoreName } | null {
	const history = getPriceHistory(productId);
	if (history.length === 0) return null;
	const lowest = history.reduce((min, p) => (p.price < min.price ? p : min), history[0]);
	return { price: lowest.price, date: lowest.date, store: lowest.store };
}

/** Get the highest ever price from history */
export function getHighestPrice(productId: string): { price: number; date: string; store: StoreName } | null {
	const history = getPriceHistory(productId);
	if (history.length === 0) return null;
	const highest = history.reduce((max, p) => (p.price > max.price ? p : max), history[0]);
	return { price: highest.price, date: highest.date, store: highest.store };
}

/** Get average price from history */
export function getAveragePrice(productId: string): number {
	const history = getPriceHistory(productId);
	if (history.length === 0) return 0;
	const sum = history.reduce((acc, p) => acc + p.price, 0);
	return Math.round(sum / history.length);
}
