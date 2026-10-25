import { products, getLowestStorePrice, type Product } from '$lib/data/products';
import { stores, type Store } from '$lib/data/stores';
import { categoryThemes, getCategoryTheme, type CategoryTheme } from '$lib/data/categoryThemes';

// ---------------------------------------------------------------------------
// Entity Types
// ---------------------------------------------------------------------------

export type SpotifyEntityType = 'product' | 'brand' | 'category' | 'store';

export interface BaseEntity {
	id: string;
	type: SpotifyEntityType;
	title: string;
	subtitle: string;
	score: number;
	imageUrl: string;
	url: string;
}

export interface ProductEntity extends BaseEntity {
	type: 'product';
	product: Product;
	brand: string;
	category: string;
	lowestPrice: number;
	mrp: number;
	discountPercent: number;
	bestStoreId: string;
	bestStoreName: string;
	storesCount: number;
	rating: number;
}

export interface BrandEntity extends BaseEntity {
	type: 'brand';
	name: string;
	productCount: number;
	categories: string[];
	minPrice: number;
	topProduct?: Product;
}

export interface CategoryEntity extends BaseEntity {
	type: 'category';
	name: string;
	productCount: number;
	emoji: string;
	gradient: string;
	description: string;
}

export interface StoreEntity extends BaseEntity {
	type: 'store';
	name: string;
	store: Store;
	storeType: 'quick_commerce' | 'marketplace';
	productCount: number;
	activeDealsCount: number;
	color: string;
}

export type SearchEntity = ProductEntity | BrandEntity | CategoryEntity | StoreEntity;

export interface SpotifyParsedQuery {
	raw: string;
	cleanTokens: string[];
	fieldFilters: {
		brand?: string;
		category?: string;
		store?: string;
		minPrice?: number;
		maxPrice?: number;
		tag?: string;
	};
	excludedTokens: string[];
	isExactPhrase: boolean;
	exactPhrase?: string;
}

export interface SpotifySearchResults {
	query: string;
	parsedQuery: SpotifyParsedQuery;
	topResult: SearchEntity | null;
	topProducts: ProductEntity[];
	matchingBrands: BrandEntity[];
	matchingCategories: CategoryEntity[];
	matchingStores: StoreEntity[];
	matchingDeals: ProductEntity[];
	allProducts: Product[];
	totalMatches: number;
}

// ---------------------------------------------------------------------------
// Pre-computed Brand and Category Indexes
// ---------------------------------------------------------------------------

export interface BrandSummary {
	name: string;
	normalized: string;
	productCount: number;
	categories: string[];
	minPrice: number;
	sampleImage: string;
	topProduct: Product;
	popularity: number;
}

export interface CategorySummary {
	name: string;
	normalized: string;
	productCount: number;
	sampleImage: string;
	theme: CategoryTheme;
	popularity: number;
}

const precomputedBrands: BrandSummary[] = (() => {
	const map = new Map<string, { products: Product[]; categories: Set<string> }>();
	for (const p of products) {
		const b = p.brand;
		if (!map.has(b)) {
			map.set(b, { products: [], categories: new Set() });
		}
		const entry = map.get(b)!;
		entry.products.push(p);
		entry.categories.add(p.category);
	}

	const list: BrandSummary[] = [];
	for (const [name, data] of map.entries()) {
		const sortedByPop = [...data.products].sort((a, b) => b.popularity - a.popularity);
		const topProduct = sortedByPop[0];
		const prices = data.products
			.map((p) => getLowestStorePrice(p)?.price ?? 0)
			.filter((pr) => pr > 0);
		const minPrice = prices.length ? Math.min(...prices) : 0;
		const totalPop = data.products.reduce((acc, p) => acc + p.popularity, 0);

		list.push({
			name,
			normalized: name.toLowerCase(),
			productCount: data.products.length,
			categories: Array.from(data.categories),
			minPrice,
			sampleImage: topProduct.imageUrl,
			topProduct,
			popularity: totalPop
		});
	}
	return list.sort((a, b) => b.popularity - a.popularity);
})();

const precomputedCategories: CategorySummary[] = (() => {
	const map = new Map<string, Product[]>();
	for (const p of products) {
		const c = p.category;
		if (!map.has(c)) map.set(c, []);
		map.get(c)!.push(p);
	}

	const list: CategorySummary[] = [];
	for (const [name, prods] of map.entries()) {
		const sorted = [...prods].sort((a, b) => b.popularity - a.popularity);
		const theme = getCategoryTheme(name);
		const totalPop = prods.reduce((acc, p) => acc + p.popularity, 0);
		list.push({
			name,
			normalized: name.toLowerCase(),
			productCount: prods.length,
			sampleImage: sorted[0]?.imageUrl || theme.sampleImage,
			theme,
			popularity: totalPop
		});
	}
	return list.sort((a, b) => b.popularity - a.popularity);
})();

// ---------------------------------------------------------------------------
// Levenshtein & Fuzzy Distance
// ---------------------------------------------------------------------------

function levenshtein(a: string, b: string): number {
	const an = a.length;
	const bn = b.length;
	if (an === 0) return bn;
	if (bn === 0) return an;

	const matrix: number[][] = [];
	for (let i = 0; i <= bn; i++) {
		matrix[i] = [i];
	}
	for (let j = 0; j <= an; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= bn; i++) {
		for (let j = 1; j <= an; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					matrix[i][j - 1] + 1,     // insertion
					matrix[i - 1][j] + 1      // deletion
				);
			}
		}
	}
	return matrix[bn][an];
}

function isFuzzyMatch(token: string, target: string): boolean {
	if (target.includes(token)) return true;
	if (token.length >= 4 && target.length >= 4) {
		const words = target.split(/[\s,()/-]+/);
		for (const w of words) {
			if (w.length >= 4 && Math.abs(w.length - token.length) <= 2) {
				if (levenshtein(token, w) <= 1) return true;
			}
		}
	}
	return false;
}

// ---------------------------------------------------------------------------
// Spotify Query Parser
// ---------------------------------------------------------------------------

export function parseSpotifyQuery(rawQuery: string): SpotifyParsedQuery {
	const raw = rawQuery.trim();
	const fieldFilters: SpotifyParsedQuery['fieldFilters'] = {};
	const excludedTokens: string[] = [];
	const cleanTokens: string[] = [];

	let working = raw;

	// Extract exact phrase if in quotes: "magic masala"
	let exactPhrase: string | undefined;
	const phraseMatch = working.match(/"([^"]+)"/);
	if (phraseMatch) {
		exactPhrase = phraseMatch[1].toLowerCase().trim();
		working = working.replace(phraseMatch[0], ' ');
	}

	// Split by whitespace
	const words = working.split(/\s+/).filter(Boolean);

	for (const word of words) {
		const lower = word.toLowerCase();

		// Field filter: brand:...
		if (lower.startsWith('brand:')) {
			fieldFilters.brand = lower.slice(6).trim();
			continue;
		}
		// Field filter: category:...
		if (lower.startsWith('category:') || lower.startsWith('cat:')) {
			const idx = lower.indexOf(':');
			fieldFilters.category = lower.slice(idx + 1).trim();
			continue;
		}
		// Field filter: store:...
		if (lower.startsWith('store:')) {
			fieldFilters.store = lower.slice(6).trim();
			continue;
		}
		// Field filter: max:... / price<...
		if (lower.startsWith('max:') || lower.startsWith('price<')) {
			const idx = lower.indexOf(':') !== -1 ? lower.indexOf(':') : lower.indexOf('<');
			const val = parseFloat(lower.slice(idx + 1));
			if (!isNaN(val)) fieldFilters.maxPrice = val;
			continue;
		}
		// Field filter: min:... / price>...
		if (lower.startsWith('min:') || lower.startsWith('price>')) {
			const idx = lower.indexOf(':') !== -1 ? lower.indexOf(':') : lower.indexOf('>');
			const val = parseFloat(lower.slice(idx + 1));
			if (!isNaN(val)) fieldFilters.minPrice = val;
			continue;
		}
		// Field filter: tag:... (deal, steal, new)
		if (lower.startsWith('tag:')) {
			fieldFilters.tag = lower.slice(4).trim();
			continue;
		}
		// Boolean NOT or -prefix
		if (lower.startsWith('-') && lower.length > 1) {
			excludedTokens.push(lower.slice(1));
			continue;
		}
		if (lower === 'not' || lower === 'and' || lower === 'or') {
			// Skip standalone boolean operators
			continue;
		}

		cleanTokens.push(lower);
	}

	return {
		raw,
		cleanTokens,
		fieldFilters,
		excludedTokens,
		isExactPhrase: !!exactPhrase,
		exactPhrase
	};
}

// ---------------------------------------------------------------------------
// Product Entity Helper
// ---------------------------------------------------------------------------

function toProductEntity(product: Product, score: number): ProductEntity {
	const lowest = getLowestStorePrice(product);
	const bestPrice = lowest?.price ?? 0;
	const mrp = lowest?.mrp ?? bestPrice;
	const discountPercent = mrp > bestPrice ? Math.round(((mrp - bestPrice) / mrp) * 100) : 0;
	const inStockStores = product.storePrices.filter((s) => s.inStock);

	return {
		id: product.id,
		type: 'product',
		title: product.title,
		subtitle: `${product.brand} • ${product.variant || product.category}`,
		score,
		imageUrl: product.imageUrl,
		url: `/product/${product.id}`,
		product,
		brand: product.brand,
		category: product.category,
		lowestPrice: bestPrice,
		mrp,
		discountPercent,
		bestStoreId: lowest?.storeId || 'amazon',
		bestStoreName: lowest?.store || 'Amazon',
		storesCount: inStockStores.length,
		rating: product.rating
	};
}

// ---------------------------------------------------------------------------
// Scoring Algorithms
// ---------------------------------------------------------------------------

function scoreProduct(
	product: Product,
	tokens: string[],
	parsed: SpotifyParsedQuery
): number {
	const titleLower = product.title.toLowerCase();
	const brandLower = product.brand.toLowerCase();
	const categoryLower = product.category.toLowerCase();
	const tagsJoined = product.tags.join(' ').toLowerCase();
	const fullQuery = tokens.join(' ');

	// Check excluded tokens
	for (const exc of parsed.excludedTokens) {
		if (titleLower.includes(exc) || brandLower.includes(exc) || categoryLower.includes(exc)) {
			return 0;
		}
	}

	// Check field filters
	if (parsed.fieldFilters.brand) {
		if (!brandLower.includes(parsed.fieldFilters.brand)) return 0;
	}
	if (parsed.fieldFilters.category) {
		if (!categoryLower.includes(parsed.fieldFilters.category)) return 0;
	}
	if (parsed.fieldFilters.store) {
		const matchesStore = product.storePrices.some(
			(sp) => sp.storeId.toLowerCase().includes(parsed.fieldFilters.store!) ||
			        sp.store.toLowerCase().includes(parsed.fieldFilters.store!)
		);
		if (!matchesStore) return 0;
	}
	if (parsed.fieldFilters.tag) {
		const t = parsed.fieldFilters.tag;
		if (t === 'deal' || t === 'steal') {
			const hasGoodDiscount = product.storePrices.some(
				(sp) => sp.inStock && sp.mrp > 0 && ((sp.mrp - sp.price) / sp.mrp) >= 0.15
			);
			if (!hasGoodDiscount) return 0;
		} else if (!tagsJoined.includes(t)) {
			return 0;
		}
	}

	const lowest = getLowestStorePrice(product);
	const bestPrice = lowest?.price ?? 0;
	if (parsed.fieldFilters.minPrice !== undefined && bestPrice < parsed.fieldFilters.minPrice) return 0;
	if (parsed.fieldFilters.maxPrice !== undefined && bestPrice > parsed.fieldFilters.maxPrice) return 0;

	// Check exact phrase
	if (parsed.isExactPhrase && parsed.exactPhrase) {
		if (!titleLower.includes(parsed.exactPhrase) && !brandLower.includes(parsed.exactPhrase)) {
			return 0;
		}
	}

	if (tokens.length === 0) {
		return product.popularity;
	}

	let score = 0;
	let matchCount = 0;

	for (const token of tokens) {
		let tokenMatched = false;

		if (titleLower.includes(token)) {
			score += 25;
			tokenMatched = true;
			if (titleLower.startsWith(token)) score += 15;
		}
		if (brandLower.includes(token)) {
			score += 18;
			tokenMatched = true;
			if (brandLower === token) score += 20;
		}
		if (categoryLower.includes(token)) {
			score += 15;
			tokenMatched = true;
		}
		if (tagsJoined.includes(token)) {
			score += 8;
			tokenMatched = true;
		}

		if (!tokenMatched && isFuzzyMatch(token, titleLower)) {
			score += 12;
			tokenMatched = true;
		}

		if (tokenMatched) matchCount++;
	}

	// Must match most tokens
	if (matchCount < Math.ceil(tokens.length * 0.75)) {
		return 0;
	}

	// Exact full phrase bonus
	if (titleLower.includes(fullQuery)) score += 35;
	if (titleLower.startsWith(fullQuery)) score += 20;

	// Popularity prior boost (0 to 20)
	score += (product.popularity / 100) * 20;

	return score;
}

function scoreBrand(
	brand: BrandSummary,
	tokens: string[],
	parsed: SpotifyParsedQuery
): number {
	const brandLower = brand.normalized;
	const fullQuery = tokens.join(' ');

	if (parsed.fieldFilters.brand) {
		if (!brandLower.includes(parsed.fieldFilters.brand)) return 0;
	}

	if (tokens.length === 0) {
		return parsed.fieldFilters.brand ? 100 : 0;
	}

	// Exact brand match is Spotify's signature artist trigger
	if (brandLower === fullQuery) {
		return 160 + (brand.popularity / 50);
	}

	if (brandLower.startsWith(fullQuery)) {
		return 130 + (brand.popularity / 60);
	}

	let score = 0;
	let matched = false;
	for (const token of tokens) {
		if (brandLower.includes(token)) {
			score += 30;
			matched = true;
		} else if (isFuzzyMatch(token, brandLower)) {
			score += 18;
			matched = true;
		}
	}

	if (!matched) return 0;

	score += (brand.popularity / 100) * 15;
	return score;
}

function scoreCategory(
	cat: CategorySummary,
	tokens: string[],
	parsed: SpotifyParsedQuery
): number {
	const catLower = cat.normalized;
	const fullQuery = tokens.join(' ');

	if (parsed.fieldFilters.category) {
		if (!catLower.includes(parsed.fieldFilters.category)) return 0;
	}

	if (tokens.length === 0) {
		return parsed.fieldFilters.category ? 110 : 0;
	}

	if (catLower === fullQuery) {
		return 155;
	}
	if (catLower.startsWith(fullQuery)) {
		return 125;
	}

	let score = 0;
	let matched = false;
	for (const token of tokens) {
		if (catLower.includes(token)) {
			score += 28;
			matched = true;
		} else if (isFuzzyMatch(token, catLower)) {
			score += 15;
			matched = true;
		}
	}

	if (!matched) return 0;
	return score;
}

function scoreStore(
	store: Store,
	tokens: string[],
	parsed: SpotifyParsedQuery
): number {
	const storeName = store.name.toLowerCase();
	const storeId = store.id.toLowerCase();
	const fullQuery = tokens.join(' ');

	if (parsed.fieldFilters.store) {
		if (!storeName.includes(parsed.fieldFilters.store) && !storeId.includes(parsed.fieldFilters.store)) {
			return 0;
		}
	}

	if (tokens.length === 0) {
		return parsed.fieldFilters.store ? 120 : 0;
	}

	if (storeName === fullQuery || storeId === fullQuery) {
		return 150;
	}
	if (storeName.startsWith(fullQuery) || storeId.startsWith(fullQuery)) {
		return 120;
	}

	for (const token of tokens) {
		if (storeName.includes(token) || storeId.includes(token)) {
			return 40;
		}
	}
	return 0;
}

// ---------------------------------------------------------------------------
// Main Spotify Search Execution
// ---------------------------------------------------------------------------

export function executeSpotifySearch(queryText: string): SpotifySearchResults {
	const parsed = parseSpotifyQuery(queryText);
	const tokens = parsed.cleanTokens;

	// 1. Score Products
	const scoredProducts: { product: Product; score: number }[] = [];
	for (const product of products) {
		const s = scoreProduct(product, tokens, parsed);
		if (s > 0) {
			scoredProducts.push({ product, score: s });
		}
	}
	scoredProducts.sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);

	const allProducts = scoredProducts.map((sp) => sp.product);
	const productEntities = scoredProducts.map((sp) => toProductEntity(sp.product, sp.score));

	// 2. Score Brands
	const brandEntities: BrandEntity[] = [];
	for (const b of precomputedBrands) {
		const s = scoreBrand(b, tokens, parsed);
		if (s > 0) {
			brandEntities.push({
				id: `brand-${b.normalized}`,
				type: 'brand',
				title: b.name,
				subtitle: `${b.productCount} verified products • ${b.categories.slice(0, 2).join(', ')}`,
				score: s,
				imageUrl: b.sampleImage,
				url: `/search?q=brand:${encodeURIComponent(b.name.toLowerCase())}`,
				name: b.name,
				productCount: b.productCount,
				categories: b.categories,
				minPrice: b.minPrice,
				topProduct: b.topProduct
			});
		}
	}
	brandEntities.sort((a, b) => b.score - a.score);

	// 3. Score Categories
	const categoryEntities: CategoryEntity[] = [];
	for (const c of precomputedCategories) {
		const s = scoreCategory(c, tokens, parsed);
		if (s > 0) {
			categoryEntities.push({
				id: `cat-${c.normalized}`,
				type: 'category',
				title: c.name,
				subtitle: `${c.productCount} verified items • ${c.theme.emoji}`,
				score: s,
				imageUrl: c.sampleImage,
				url: `/search?category=${encodeURIComponent(c.name)}`,
				name: c.name,
				productCount: c.productCount,
				emoji: c.theme.emoji,
				gradient: c.theme.gradient,
				description: c.theme.description
			});
		}
	}
	categoryEntities.sort((a, b) => b.score - a.score);

	// 4. Score Stores
	const storeEntities: StoreEntity[] = [];
	for (const s of stores) {
		const score = scoreStore(s, tokens, parsed);
		if (score > 0) {
			const carriedProducts = products.filter((p) =>
				p.storePrices.some((sp) => sp.storeId === s.id && sp.inStock)
			);
			const dealsCount = carriedProducts.filter((p) => {
				const sp = p.storePrices.find((entry) => entry.storeId === s.id);
				return sp && sp.mrp > sp.price && (sp.mrp - sp.price) / sp.mrp >= 0.15;
			}).length;

			storeEntities.push({
				id: `store-${s.id}`,
				type: 'store',
				name: s.name,
				title: s.name,
				subtitle: `${s.type === 'quick_commerce' ? '⚡ 10-Min Quick Commerce' : '🛒 Marketplace'} • ${carriedProducts.length} items`,
				score,
				imageUrl: `https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80`,
				url: `/search?q=store:${s.id}`,
				store: s,
				storeType: s.type,
				productCount: carriedProducts.length,
				activeDealsCount: dealsCount,
				color: s.color
			});
		}
	}
	storeEntities.sort((a, b) => b.score - a.score);

	// 5. Matching Deals (discounts >= 15%)
	const matchingDeals = productEntities
		.filter((pe) => pe.discountPercent >= 15)
		.sort((a, b) => b.discountPercent - a.discountPercent);

	// 6. Cross-Entity Top Result Selection (Spotify's Signature "Top Result")
	const allCandidates: SearchEntity[] = [
		...brandEntities,
		...categoryEntities,
		...storeEntities,
		...productEntities.slice(0, 10)
	];

	allCandidates.sort((a, b) => b.score - a.score);
	const topResult = allCandidates.length > 0 ? allCandidates[0] : null;

	return {
		query: queryText,
		parsedQuery: parsed,
		topResult,
		topProducts: productEntities.slice(0, 5),
		matchingBrands: brandEntities.slice(0, 8),
		matchingCategories: categoryEntities.slice(0, 6),
		matchingStores: storeEntities.slice(0, 4),
		matchingDeals: matchingDeals.slice(0, 6),
		allProducts,
		totalMatches: scoredProducts.length
	};
}

export function getAllCategoriesForBrowse(): CategorySummary[] {
	return precomputedCategories;
}

export function getAllBrandsForBrowse(): BrandSummary[] {
	return precomputedBrands;
}
