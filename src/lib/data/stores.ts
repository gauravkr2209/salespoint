import type { StoreName } from '$lib/types';

export interface Store {
	id: string;
	name: StoreName;
	logo: string;
	color: string;
	url: string;
	type: 'marketplace' | 'quick_commerce';
	requiresPartnerAccess?: boolean;
	notes?: string;
}

export const stores: Store[] = [
	{ id: 'amazon', name: 'Amazon', logo: '🛒', color: '#FF9900', url: 'https://amazon.in', type: 'marketplace' },
	{ id: 'flipkart', name: 'Flipkart', logo: '🛍️', color: '#2874F0', url: 'https://flipkart.com', type: 'marketplace' },
	{ id: 'myntra', name: 'Myntra', logo: '👗', color: '#FF3F6C', url: 'https://myntra.com', type: 'marketplace' },
	{ id: 'croma', name: 'Croma', logo: '🔌', color: '#00966B', url: 'https://croma.com', type: 'marketplace' },
	{ id: 'ajio', name: 'Ajio', logo: '✨', color: '#3B3A3C', url: 'https://ajio.com', type: 'marketplace' },
	{
		id: 'blinkit',
		name: 'Blinkit',
		logo: '⚡',
		color: '#F8CB46',
		url: 'https://blinkit.com',
		type: 'quick_commerce',
		requiresPartnerAccess: true,
		notes: 'Quick-commerce 10-minute delivery. Live integration requires authorized Blinkit Partner API key.'
	},
	{
		id: 'zepto',
		name: 'Zepto',
		logo: '🚀',
		color: '#8B5CF6',
		url: 'https://zepto.com',
		type: 'quick_commerce',
		requiresPartnerAccess: true,
		notes: 'Quick-commerce instant delivery. Requires Zepto Enterprise Partner Feed access.'
	},
	{
		id: 'minutes',
		name: 'Flipkart Minutes',
		logo: '⏱️',
		color: '#22C55E',
		url: 'https://flipkart.com/minutes',
		type: 'quick_commerce',
		requiresPartnerAccess: true,
		notes: 'Flipkart Quick / Minutes hyper-local delivery.'
	}
];

export function getStore(storeId: string): Store | undefined {
	return stores.find((s) => s.id === storeId || s.name.toLowerCase() === storeId.toLowerCase());
}
