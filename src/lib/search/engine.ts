import { products, getLowestStorePrice, type Product } from '$lib/data/products';
import type { SuggestionItem } from './suggestions';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchFilters {
	category?: string;
	storeId?: string;
	minPrice?: number;
	maxPrice?: number;
	minDiscount?: number;
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'discount_desc' | 'popularity';

export interface SearchResult {
	products: Product[];
	total: number;
	categories: { name: string; count: number }[];
	priceRange: { min: number; max: number };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalise(str: string): string {
	return str.toLowerCase().trim();
}

function tokenise(query: string): string[] {
	return normalise(query)
		.split(/\s+/)
		.filter((w) => w.length > 0);
}

function scoreProduct(product: Product, tokens: string[]): number {
	if (tokens.length === 0) return 1;

	const titleLower = normalise(product.title);
	const brandLower = normalise(product.brand);
	const categoryLower = normalise(product.category);
	const tagsJoined = product.tags.join(' ').toLowerCase();

	let score = 0;
	let allMatch = true;

	for (const token of tokens) {
		let tokenMatched = false;

		if (titleLower.includes(token)) { score += 3; tokenMatched = true; }
		if (brandLower.includes(token)) { score += 2; tokenMatched = true; }
		if (categoryLower.includes(token)) { score += 2; tokenMatched = true; }
		if (tagsJoined.includes(token)) { score += 1; tokenMatched = true; }

		if (!tokenMatched) allMatch = false;
	}

	if (!allMatch) return 0;

	const fullQuery = tokens.join(' ');
	if (titleLower.includes(fullQuery)) score += 5;

	return score;
}

function bestPrice(product: Product, storeId?: string): number {
	let relevant = product.storePrices.filter((p) => p.inStock);
	if (storeId) relevant = relevant.filter((p) => p.storeId === storeId);
	if (relevant.length === 0) relevant = product.storePrices;
	return Math.min(...relevant.map((p) => p.price));
}

function bestDiscount(product: Product): number {
	const inStock = product.storePrices.filter((p) => p.inStock);
	if (inStock.length === 0) return 0;
	return Math.max(...inStock.map((p) => Math.round(((p.mrp - p.price) / p.mrp) * 100)));
}

// ---------------------------------------------------------------------------
// Main search
// ---------------------------------------------------------------------------

export function searchProducts(
	query: string,
	filters?: SearchFilters,
	sort: SortOption = 'relevance',
	page: number = 1,
	pageSize: number = 20
): SearchResult {
	const tokens = tokenise(query);

	let scored = products
		.map((product) => ({ product, score: scoreProduct(product, tokens) }))
		.filter((entry) => entry.score > 0);

	if (filters) {
		if (filters.category) {
			const cat = normalise(filters.category);
			scored = scored.filter((e) => normalise(e.product.category) === cat);
		}
		if (filters.storeId) {
			scored = scored.filter((e) =>
				e.product.storePrices.some((p) => p.storeId === filters.storeId && p.inStock)
			);
		}
		if (filters.minPrice !== undefined) {
			scored = scored.filter((e) => bestPrice(e.product, filters.storeId) >= filters.minPrice!);
		}
		if (filters.maxPrice !== undefined) {
			scored = scored.filter((e) => bestPrice(e.product, filters.storeId) <= filters.maxPrice!);
		}
		if (filters.minDiscount !== undefined) {
			scored = scored.filter((e) => bestDiscount(e.product) >= filters.minDiscount!);
		}
	}

	// Aggregate categories
	const categoryMap = new Map<string, number>();
	for (const entry of scored) {
		const cat = entry.product.category;
		categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + 1);
	}
	const categories = Array.from(categoryMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);

	// Price range
	const allPrices = scored.map((e) => bestPrice(e.product, filters?.storeId));
	const priceRange = allPrices.length > 0
		? { min: Math.min(...allPrices), max: Math.max(...allPrices) }
		: { min: 0, max: 0 };

	// Sort
	switch (sort) {
		case 'price_asc':
			scored.sort((a, b) => bestPrice(a.product, filters?.storeId) - bestPrice(b.product, filters?.storeId));
			break;
		case 'price_desc':
			scored.sort((a, b) => bestPrice(b.product, filters?.storeId) - bestPrice(a.product, filters?.storeId));
			break;
		case 'discount_desc':
			scored.sort((a, b) => bestDiscount(b.product) - bestDiscount(a.product));
			break;
		case 'popularity':
			scored.sort((a, b) => b.product.popularity - a.product.popularity);
			break;
		case 'relevance':
		default:
			scored.sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);
			break;
	}

	// Paginate
	const total = scored.length;
	const start = (page - 1) * pageSize;
	const paged = scored.slice(start, start + pageSize).map((e) => e.product);

	return { products: paged, total, categories, priceRange };
}

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

export function getSuggestions(query: string, limit: number = 8): SuggestionItem[] {
	const trimmed = query.trim();
	if (trimmed.length === 0) return getTrendingSuggestions(limit);

	const tokens = tokenise(trimmed);
	const suggestions: SuggestionItem[] = [];
	const matchedCategories = new Set<string>();

	const scored = products
		.map((product) => ({ product, score: scoreProduct(product, tokens) }))
		.filter((e) => e.score > 0)
		.sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);

	// Category suggestions (max 2)
	for (const entry of scored) {
		if (matchedCategories.size >= 2) break;
		const cat = entry.product.category;
		if (!matchedCategories.has(cat)) {
			matchedCategories.add(cat);
			suggestions.push({ type: 'category', text: cat, category: cat });
		}
	}

	// Product suggestions
	for (const entry of scored) {
		if (suggestions.length >= limit) break;
		const lowest = getLowestStorePrice(entry.product);
		suggestions.push({
			type: 'product',
			text: entry.product.title,
			product: entry.product,
			imageUrl: entry.product.imageUrl,
			price: lowest?.price,
			storeId: lowest?.storeId
		});
	}

	return suggestions.slice(0, limit);
}

// ---------------------------------------------------------------------------
// Trending
// ---------------------------------------------------------------------------

export function getTrendingProducts(limit: number = 6): Product[] {
	const sorted = [...products].sort((a, b) => b.popularity - a.popularity);
	return sorted.slice(0, limit);
}

function getTrendingSuggestions(limit: number): SuggestionItem[] {
	return getTrendingProducts(limit).map((product) => {
		const lowest = getLowestStorePrice(product);
		return {
			type: 'trending' as const,
			text: product.title,
			product,
			imageUrl: product.imageUrl,
			price: lowest?.price,
			storeId: lowest?.storeId
		};
	});
}
