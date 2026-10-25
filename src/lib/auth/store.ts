import type { StoreName } from '$lib/types';
import { products, type Product } from '$lib/data/products';
import { 
	syncUserProfile, 
	syncWishlistToSupabase, 
	syncPriceAlertsToSupabase, 
	isSupabaseConfigured 
} from '$lib/supabase/client';

// Browser-persistent auth & profile store for SalesPoint
export interface PriceAlertItem {
	productId: string;
	targetPrice: number;
	createdAt: string;
	notified?: boolean;
}

export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	createdAt: string;
	phone?: string;
	city?: string;
	pincode?: string;
	preferredStores?: StoreName[];
	wishlist?: string[]; // Array of product IDs
	priceAlerts?: PriceAlertItem[];
	notificationPreferences?: {
		email: boolean;
		whatsapp: boolean;
		priceDropInstant: boolean;
	};
}

export function getCurrentUser(): User | null {
	if (typeof window === 'undefined') return null;
	const saved = localStorage.getItem('salespoint_auth_user') || localStorage.getItem('copyweb_auth_user');
	if (!saved) return null;
	try {
		const user = JSON.parse(saved);
		// Ensure arrays exist
		if (!user.wishlist) user.wishlist = [];
		if (!user.priceAlerts) user.priceAlerts = [];
		if (!user.preferredStores) user.preferredStores = ['Blinkit', 'Zepto', 'Amazon', 'Flipkart'];
		return user;
	} catch {
		return null;
	}
}

export function setCurrentUser(user: User | null): void {
	if (typeof window === 'undefined') return;
	if (user) {
		localStorage.setItem('salespoint_auth_user', JSON.stringify(user));
	} else {
		localStorage.removeItem('salespoint_auth_user');
		localStorage.removeItem('copyweb_auth_user');
	}
	window.dispatchEvent(new Event('salespoint_auth_change'));
}

export function updateUserProfile(updates: Partial<User>): User | null {
	if (typeof window === 'undefined') return null;
	const user = getCurrentUser();
	if (!user) return null;

	const updated: User = {
		...user,
		...updates,
		id: user.id, // Prevent overriding ID
		email: user.email // Prevent overriding Email directly without verification
	};

	setCurrentUser(updated);

	// Also sync to registered users table
	const users = getAllRegisteredUsers();
	const idx = users.findIndex((u) => u.user.id === user.id);
	if (idx >= 0) {
		users[idx].user = updated;
		localStorage.setItem('salespoint_registered_users', JSON.stringify(users));
	}

	if (isSupabaseConfigured) {
		syncUserProfile(updated);
	}

	return updated;
}

export function getAllRegisteredUsers(): Array<{ email: string; passwordHash: string; user: User }> {
	if (typeof window === 'undefined') return [];
	const list = localStorage.getItem('salespoint_registered_users') || localStorage.getItem('copyweb_registered_users');
	if (!list) return [];
	try {
		return JSON.parse(list);
	} catch {
		return [];
	}
}

export function registerUser(name: string, email: string, password: string): { success: boolean; message: string; user?: User } {
	if (typeof window === 'undefined') return { success: false, message: 'Client only' };
	const users = getAllRegisteredUsers();
	const cleanEmail = email.trim().toLowerCase();

	if (users.some((u) => u.email === cleanEmail)) {
		return { success: false, message: 'An account with this email already exists.' };
	}

	const newUser: User = {
		id: 'usr_' + Math.random().toString(36).substring(2, 9),
		name: name.trim(),
		email: cleanEmail,
		avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
		createdAt: new Date().toISOString(),
		city: 'New Delhi',
		pincode: '110001',
		preferredStores: ['Blinkit', 'Zepto', 'Amazon', 'Flipkart Minutes'],
		wishlist: [],
		priceAlerts: [],
		notificationPreferences: {
			email: true,
			whatsapp: true,
			priceDropInstant: true
		}
	};

	users.push({
		email: cleanEmail,
		passwordHash: password,
		user: newUser
	});

	localStorage.setItem('salespoint_registered_users', JSON.stringify(users));
	setCurrentUser(newUser);
	return { success: true, message: 'Account created successfully on SalesPoint!', user: newUser };
}

export function authenticateUser(email: string, password: string): { success: boolean; message: string; user?: User } {
	if (typeof window === 'undefined') return { success: false, message: 'Client only' };
	const users = getAllRegisteredUsers();
	const cleanEmail = email.trim().toLowerCase();

	// Default demo account with rich mock profile data
	if (
		(cleanEmail === 'demo@salespoint.in' || cleanEmail === 'demo@copyweb.com') &&
		password === 'password123'
	) {
		const demoUser: User = {
			id: 'usr_demo',
			name: 'Demo Shopper',
			email: 'demo@salespoint.in',
			avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DemoShopper',
			createdAt: '2026-01-15T08:30:00.000Z',
			phone: '+91 98765 43210',
			city: 'Bengaluru',
			pincode: '560001',
			preferredStores: ['Blinkit', 'Zepto', 'Amazon', 'Flipkart Minutes', 'Croma'],
			wishlist: ['prod-001', 'prod-002', 'prod-021', 'prod-039'],
			priceAlerts: [
				{ productId: 'prod-001', targetPrice: 120000, createdAt: '2026-10-20' },
				{ productId: 'prod-021', targetPrice: 22000, createdAt: '2026-10-22' }
			],
			notificationPreferences: {
				email: true,
				whatsapp: true,
				priceDropInstant: true
			}
		};
		setCurrentUser(demoUser);
		return { success: true, message: 'Logged in as Demo Shopper', user: demoUser };
	}

	const matched = users.find((u) => u.email === cleanEmail && u.passwordHash === password);
	if (!matched) {
		return { success: false, message: 'Invalid email or password.' };
	}

	setCurrentUser(matched.user);
	return { success: true, message: 'Welcome back to SalesPoint!', user: matched.user };
}

export function logoutUser(): void {
	setCurrentUser(null);
}

// --- Wishlist Management ---

export function isProductWishlisted(productId: string): boolean {
	if (typeof window === 'undefined') return false;
	const user = getCurrentUser();
	if (user && user.wishlist) {
		return user.wishlist.includes(productId);
	}
	// Fallback to guest wishlist in localStorage
	try {
		const guest = JSON.parse(localStorage.getItem('salespoint_guest_wishlist') || '[]');
		return guest.includes(productId);
	} catch {
		return false;
	}
}

export function toggleWishlist(productId: string): boolean {
	if (typeof window === 'undefined') return false;
	const user = getCurrentUser();

	if (user) {
		const list = user.wishlist || [];
		const exists = list.includes(productId);
		const updatedList = exists ? list.filter((id) => id !== productId) : [...list, productId];
		updateUserProfile({ wishlist: updatedList });
		if (isSupabaseConfigured) {
			syncWishlistToSupabase(user.email, updatedList);
		}
		window.dispatchEvent(new CustomEvent('salespoint_wishlist_change', { detail: { productId, wishlisted: !exists } }));
		return !exists;
	} else {
		// Guest wishlist
		try {
			const guest: string[] = JSON.parse(localStorage.getItem('salespoint_guest_wishlist') || '[]');
			const exists = guest.includes(productId);
			const updated = exists ? guest.filter((id) => id !== productId) : [...guest, productId];
			localStorage.setItem('salespoint_guest_wishlist', JSON.stringify(updated));
			window.dispatchEvent(new CustomEvent('salespoint_wishlist_change', { detail: { productId, wishlisted: !exists } }));
			return !exists;
		} catch {
			return false;
		}
	}
}

export function getWishlistProducts(): Product[] {
	if (typeof window === 'undefined') return [];
	const user = getCurrentUser();
	let ids: string[] = [];

	if (user && user.wishlist) {
		ids = user.wishlist;
	} else {
		try {
			ids = JSON.parse(localStorage.getItem('salespoint_guest_wishlist') || '[]');
		} catch {
			ids = [];
		}
	}

	return products.filter((p) => ids.includes(p.id));
}

// --- Price Alerts Management ---

export function addPriceAlert(productId: string, targetPrice: number): void {
	if (typeof window === 'undefined') return;
	const user = getCurrentUser();

	const alertItem: PriceAlertItem = {
		productId,
		targetPrice,
		createdAt: new Date().toISOString()
	};

	if (user) {
		const alerts = user.priceAlerts || [];
		const filtered = alerts.filter((a) => a.productId !== productId);
		const updatedAlerts = [...filtered, alertItem];
		updateUserProfile({ priceAlerts: updatedAlerts });
		if (isSupabaseConfigured) {
			syncPriceAlertsToSupabase(user.email, updatedAlerts);
		}
	}

	// Always sync with global priceAlerts key used by product pages
	try {
		const existing = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
		const filtered = existing.filter((a: any) => a.productId !== productId);
		localStorage.setItem('priceAlerts', JSON.stringify([...filtered, alertItem]));
	} catch {}

	window.dispatchEvent(new Event('salespoint_alerts_change'));
}

export function removePriceAlert(productId: string): void {
	if (typeof window === 'undefined') return;
	const user = getCurrentUser();

	if (user && user.priceAlerts) {
		const remaining = user.priceAlerts.filter((a) => a.productId !== productId);
		updateUserProfile({ priceAlerts: remaining });
		if (isSupabaseConfigured) {
			syncPriceAlertsToSupabase(user.email, remaining);
		}
	}

	try {
		const existing = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
		localStorage.setItem('priceAlerts', JSON.stringify(existing.filter((a: any) => a.productId !== productId)));
	} catch {}

	window.dispatchEvent(new Event('salespoint_alerts_change'));
}

export function getUserPriceAlerts(): Array<{ product: Product; targetPrice: number; createdAt: string }> {
	if (typeof window === 'undefined') return [];
	const user = getCurrentUser();
	let rawAlerts: PriceAlertItem[] = [];

	if (user && user.priceAlerts && user.priceAlerts.length > 0) {
		rawAlerts = user.priceAlerts;
	} else {
		try {
			rawAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
		} catch {
			rawAlerts = [];
		}
	}

	const result: Array<{ product: Product; targetPrice: number; createdAt: string }> = [];
	for (const alert of rawAlerts) {
		const prod = products.find((p) => p.id === alert.productId);
		if (prod) {
			result.push({
				product: prod,
				targetPrice: alert.targetPrice,
				createdAt: alert.createdAt
			});
		}
	}

	return result;
}
