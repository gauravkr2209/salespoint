export interface ParsedURL {
	isProductUrl: boolean;
	store: string | null;
	productId: string | null;
	originalUrl: string;
}

/**
 * Detect whether an input string looks like a URL.
 */
export function isUrl(input: string): boolean {
	const trimmed = input.trim();
	if (/^https?:\/\//i.test(trimmed)) return true;
	// Looks like a domain (e.g. amazon.in/dp/...)
	if (/^(www\.)?[a-z0-9-]+\.[a-z]{2,}/i.test(trimmed)) return true;
	return false;
}

// Store patterns: each entry maps a store id to a hostname matcher and product-id extractor.
interface StorePattern {
	storeId: string;
	hostnames: RegExp;
	extractId: (pathname: string) => string | null;
}

const storePatterns: StorePattern[] = [
	{
		storeId: 'amazon',
		hostnames: /amazon\.(in|com|co\.uk)/i,
		extractId: (pathname: string) => {
			// /dp/ASIN or /gp/product/ASIN
			const dpMatch = pathname.match(/\/dp\/([A-Z0-9]{10})/i);
			if (dpMatch) return dpMatch[1];
			const gpMatch = pathname.match(/\/gp\/product\/([A-Z0-9]{10})/i);
			if (gpMatch) return gpMatch[1];
			return null;
		}
	},
	{
		storeId: 'flipkart',
		hostnames: /flipkart\.com/i,
		extractId: (pathname: string) => {
			// /product-name/p/ITEM_ID  →  extract ITEM_ID
			const pMatch = pathname.match(/\/p\/([a-zA-Z0-9]+)/);
			if (pMatch) return pMatch[1];
			// Fallback: last path segment
			const segments = pathname.split('/').filter(Boolean);
			return segments.length > 0 ? segments[segments.length - 1] : null;
		}
	},
	{
		storeId: 'myntra',
		hostnames: /myntra\.com/i,
		extractId: (pathname: string) => {
			// Myntra URLs: /brand-product-name/12345678  →  numeric ID at end
			const numericMatch = pathname.match(/\/(\d{5,})/);
			if (numericMatch) return numericMatch[1];
			const segments = pathname.split('/').filter(Boolean);
			return segments.length > 0 ? segments[segments.length - 1] : null;
		}
	},
	{
		storeId: 'croma',
		hostnames: /croma\.com/i,
		extractId: (pathname: string) => {
			// Croma URLs: /product-name/p/PRODUCT_ID
			const pMatch = pathname.match(/\/p\/([a-zA-Z0-9]+)/);
			if (pMatch) return pMatch[1];
			const segments = pathname.split('/').filter(Boolean);
			return segments.length > 0 ? segments[segments.length - 1] : null;
		}
	},
	{
		storeId: 'ajio',
		hostnames: /ajio\.com/i,
		extractId: (pathname: string) => {
			// Ajio URLs: /brand-product-name/p/PRODUCT_ID
			const pMatch = pathname.match(/\/p\/([a-zA-Z0-9]+)/);
			if (pMatch) return pMatch[1];
			const segments = pathname.split('/').filter(Boolean);
			return segments.length > 0 ? segments[segments.length - 1] : null;
		}
	}
];

/**
 * Parse a product URL from a supported Indian e-commerce store.
 * Returns structured information about the detected store and product ID.
 */
export function parseProductUrl(input: string): ParsedURL {
	const trimmed = input.trim();
	const result: ParsedURL = {
		isProductUrl: false,
		store: null,
		productId: null,
		originalUrl: trimmed
	};

	if (!isUrl(trimmed)) return result;

	// Normalise to a full URL so we can parse it
	let urlStr = trimmed;
	if (!/^https?:\/\//i.test(urlStr)) {
		urlStr = 'https://' + urlStr;
	}

	let parsed: URL;
	try {
		parsed = new URL(urlStr);
	} catch {
		return result;
	}

	for (const pattern of storePatterns) {
		if (pattern.hostnames.test(parsed.hostname)) {
			result.store = pattern.storeId;
			result.productId = pattern.extractId(parsed.pathname);
			result.isProductUrl = result.productId !== null;
			break;
		}
	}

	return result;
}
