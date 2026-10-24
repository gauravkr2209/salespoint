import type { Product } from '$lib/data/products';

export interface SuggestionItem {
	type: 'product' | 'query' | 'category' | 'trending';
	text: string;
	product?: Product;
	category?: string;
	imageUrl?: string;
	price?: number;
	storeId?: string;
}
