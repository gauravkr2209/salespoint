export interface Store {
	id: string;
	name: string;
	logo: string;
	color: string;
	url: string;
}

export const stores: Store[] = [
	{ id: 'amazon', name: 'Amazon', logo: '🛒', color: '#FF9900', url: 'https://amazon.in' },
	{ id: 'flipkart', name: 'Flipkart', logo: '🛍️', color: '#2874F0', url: 'https://flipkart.com' },
	{ id: 'myntra', name: 'Myntra', logo: '👗', color: '#FF3F6C', url: 'https://myntra.com' },
	{ id: 'croma', name: 'Croma', logo: '🔌', color: '#00966B', url: 'https://croma.com' },
	{ id: 'ajio', name: 'Ajio', logo: '✨', color: '#3B3A3C', url: 'https://ajio.com' }
];

export function getStore(storeId: string): Store | undefined {
	return stores.find((s) => s.id === storeId);
}
