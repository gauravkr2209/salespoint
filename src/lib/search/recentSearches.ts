export interface RecentSearchItem {
	id: string;
	query: string;
	type: 'query' | 'product' | 'brand' | 'category' | 'store';
	title: string;
	subtitle?: string;
	imageUrl?: string;
	timestamp: number;
	url?: string;
}

const STORAGE_KEY = 'salespoint_recent_searches_v1';
const MAX_RECENTS = 12;

export function getRecentSearches(): RecentSearchItem[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			return parsed.slice(0, MAX_RECENTS);
		}
	} catch (e) {
		console.warn('Failed to read recent searches from localStorage', e);
	}
	return [];
}

export function addRecentSearch(item: Omit<RecentSearchItem, 'id' | 'timestamp'>): RecentSearchItem[] {
	if (typeof window === 'undefined') return [];
	try {
		const recents = getRecentSearches();
		const normalizedQuery = item.query.trim().toLowerCase();

		// Remove existing duplicate
		const filtered = recents.filter(
			(r) => !(r.query.trim().toLowerCase() === normalizedQuery && r.type === item.type)
		);

		const newItem: RecentSearchItem = {
			...item,
			id: `${item.type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
			timestamp: Date.now()
		};

		const updated = [newItem, ...filtered].slice(0, MAX_RECENTS);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		return updated;
	} catch (e) {
		console.warn('Failed to save recent search to localStorage', e);
		return [];
	}
}

export function removeRecentSearch(id: string): RecentSearchItem[] {
	if (typeof window === 'undefined') return [];
	try {
		const recents = getRecentSearches();
		const updated = recents.filter((r) => r.id !== id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		return updated;
	} catch (e) {
		console.warn('Failed to remove recent search from localStorage', e);
		return [];
	}
}

export function clearRecentSearches(): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (e) {
		console.warn('Failed to clear recent searches from localStorage', e);
	}
}
