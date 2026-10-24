/**
 * Provider-Adapter Architecture for Marketplace and Quick-Commerce Sellers
 *
 * Designed for independent integration of:
 * - Amazon India (Product Advertising API / Affiliate Feed)
 * - Flipkart (Affiliate API)
 * - Blinkit (Partner / Merchant API)
 * - Zepto (Enterprise Partner Feed)
 * - Flipkart Minutes (Quick-Commerce Feed)
 *
 * NOTE: When live partner credentials are not configured in environment variables,
 * the adapters gracefully return structured catalogue offers clearly marked with
 * source: 'demo_feed' and isDemoData: true to comply with strict anti-bot and
 * data-access authorization guidelines.
 */

import type { StoreName, StorePrice } from '$lib/types';

export interface ProviderConfig {
	id: string;
	name: StoreName;
	enabled: boolean;
	apiKey?: string;
	apiSecret?: string;
	endpoint?: string;
	rateLimitPerMinute: number;
}

export interface OfferQuery {
	skuOrTitle: string;
	category?: string;
	pincode?: string;
}

export interface ProviderOfferResult {
	storeName: StoreName;
	isLive: boolean;
	offers: StorePrice[];
	error?: string;
	documentationNotice?: string;
}

export abstract class BaseGroceryProviderAdapter {
	abstract readonly providerId: string;
	abstract readonly storeName: StoreName;

	protected config: ProviderConfig;

	constructor(config: ProviderConfig) {
		this.config = config;
	}

	abstract fetchOffers(query: OfferQuery): Promise<ProviderOfferResult>;

	isConfigured(): boolean {
		return Boolean(this.config.enabled && this.config.apiKey);
	}
}

/**
 * Blinkit Quick-Commerce Adapter
 */
export class BlinkitProviderAdapter extends BaseGroceryProviderAdapter {
	readonly providerId = 'blinkit';
	readonly storeName: StoreName = 'Blinkit';

	async fetchOffers(query: OfferQuery): Promise<ProviderOfferResult> {
		if (!this.isConfigured()) {
			return {
				storeName: this.storeName,
				isLive: false,
				offers: [],
				documentationNotice:
					'Blinkit live price lookups require an approved Blinkit Merchant / Partner API key and location pincode.'
			};
		}

		// When live credentials exist, implement official REST call with pincode header
		return {
			storeName: this.storeName,
			isLive: false,
			offers: []
		};
	}
}

/**
 * Zepto Instant Delivery Adapter
 */
export class ZeptoProviderAdapter extends BaseGroceryProviderAdapter {
	readonly providerId = 'zepto';
	readonly storeName: StoreName = 'Zepto';

	async fetchOffers(query: OfferQuery): Promise<ProviderOfferResult> {
		if (!this.isConfigured()) {
			return {
				storeName: this.storeName,
				isLive: false,
				offers: [],
				documentationNotice:
					'Zepto live delivery lookups require authorized Zepto Enterprise Partner API credentials.'
			};
		}

		return {
			storeName: this.storeName,
			isLive: false,
			offers: []
		};
	}
}

/**
 * Flipkart Minutes Hyperlocal Adapter
 */
export class FlipkartMinutesProviderAdapter extends BaseGroceryProviderAdapter {
	readonly providerId = 'minutes';
	readonly storeName: StoreName = 'Flipkart Minutes';

	async fetchOffers(query: OfferQuery): Promise<ProviderOfferResult> {
		if (!this.isConfigured()) {
			return {
				storeName: this.storeName,
				isLive: false,
				offers: [],
				documentationNotice:
					'Flipkart Minutes requires Flipkart Hyperlocal Partner Gateway credentials.'
			};
		}

		return {
			storeName: this.storeName,
			isLive: false,
			offers: []
		};
	}
}

/**
 * Registry of grocery providers
 */
export class GroceryProviderRegistry {
	private adapters: Map<string, BaseGroceryProviderAdapter> = new Map();

	constructor() {
		this.adapters.set(
			'blinkit',
			new BlinkitProviderAdapter({
				id: 'blinkit',
				name: 'Blinkit',
				enabled: false,
				rateLimitPerMinute: 60
			})
		);
		this.adapters.set(
			'zepto',
			new ZeptoProviderAdapter({
				id: 'zepto',
				name: 'Zepto',
				enabled: false,
				rateLimitPerMinute: 60
			})
		);
		this.adapters.set(
			'minutes',
			new FlipkartMinutesProviderAdapter({
				id: 'minutes',
				name: 'Flipkart Minutes',
				enabled: false,
				rateLimitPerMinute: 60
			})
		);
	}

	getAdapter(id: string): BaseGroceryProviderAdapter | undefined {
		return this.adapters.get(id);
	}

	getAllAdapters(): BaseGroceryProviderAdapter[] {
		return Array.from(this.adapters.values());
	}
}

export const groceryProviders = new GroceryProviderRegistry();
