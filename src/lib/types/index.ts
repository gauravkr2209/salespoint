/** Core domain types for CopyWeb */

export interface StorePrice {
	store: StoreName;
	price: number;
	mrp: number;
	url: string;
	inStock: boolean;
	lastUpdated: string;
}

export type StoreName = 'Amazon' | 'Flipkart' | 'Myntra' | 'Croma' | 'Ajio';

export interface Product {
	id: string;
	title: string;
	brand: string;
	imageUrl: string;
	category: string;
	storePrices: StorePrice[];
}

export interface PriceHistoryEntry {
	date: string;
	price: number;
	store: StoreName;
}

export interface SearchFilters {
	categories: string[];
	stores: StoreName[];
	priceMin: number | null;
	priceMax: number | null;
	minDiscount: number | null;
}

export interface SearchSuggestion {
	text: string;
	type: 'query' | 'product' | 'category';
}

export interface DealRating {
	label: string;
	color: string;
	bgColor: string;
	score: number;
}
