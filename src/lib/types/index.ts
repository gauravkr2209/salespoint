/**
 * Core domain types for SalesPoint Price Comparison Engine
 */

export type StoreName =
	| 'Amazon'
	| 'Flipkart'
	| 'Myntra'
	| 'Croma'
	| 'Ajio'
	| 'Blinkit'
	| 'Zepto'
	| 'Flipkart Minutes';

export type UnitType = 'g' | 'kg' | 'ml' | 'l' | 'pack' | 'piece';

export interface StorePrice {
	storeId: string;
	store: StoreName;
	price: number;
	mrp: number;
	url: string;
	inStock: boolean;
	lastUpdated: string;
	/** Provider metadata */
	source?: 'verified_partner' | 'demo_feed' | 'official_api';
	isDemoData?: boolean;
	deliveryEta?: string;
	locationRestriction?: string;
}

export interface PriceHistoryEntry {
	date: string;
	price: number;
	store: StoreName;
}

export interface Product {
	id: string;
	title: string;
	brand: string;
	category: string;
	imageUrl: string;
	description: string;
	storePrices: StorePrice[];
	priceHistory: PriceHistoryEntry[];
	rating: number;
	reviewCount: number;
	popularity: number;
	tags: string[];

	/** Quantity & unit pricing for groceries, chips, drinks, snacks */
	variant?: string;
	packSize?: number;
	unit?: UnitType;
	unitPrice?: {
		pricePer100g?: number; // ₹ per 100g for solid food/chips/snacks
		pricePerLitre?: number; // ₹ per litre for drinks/beverages
		formatted: string;
	};
}

export interface SearchFilters {
	categories: string[];
	stores: StoreName[];
	priceMin: number | null;
	priceMax: number | null;
	minDiscount: number | null;
	unitPriceSort?: 'none' | 'unit_asc' | 'unit_desc';
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
