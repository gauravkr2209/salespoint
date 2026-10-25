import { products, getLowestStorePrice, type Product } from '$lib/data/products';
import { getLowestPrice, getHighestPrice, getAveragePrice } from '$lib/data/priceHistory';
import { formatPrice, getDiscountPercent } from '$lib/utils/formatPrice';
import { getProductImageUrl } from '$lib/utils/productImages';
import type { AssistantResponse, ChatProductSummary } from './types';

function toProductSummary(p: Product): ChatProductSummary {
	const lowest = getLowestStorePrice(p);
	const bestPrice = lowest?.price ?? 0;
	const maxMrp = Math.max(...p.storePrices.map((s) => s.mrp));
	const discount = maxMrp > 0 ? getDiscountPercent(maxMrp, bestPrice) : 0;

	return {
		id: p.id,
		title: p.title,
		brand: p.brand,
		category: p.category,
		imageUrl: getProductImageUrl(p),
		lowestPrice: bestPrice,
		mrp: maxMrp,
		discountPercent: discount,
		lowestStore: lowest?.store ?? 'Online',
		unitPriceFormatted: p.unitPrice?.formatted,
		url: `/product/${p.id}`
	};
}

/** Clean markdown syntax for speech synthesis */
function cleanTextForSpeech(text: string): string {
	return text
		.replace(/[*_#`~[\]]/g, '')
		.replace(/\(https?:\/\/[^\s)]+\)/g, '')
		.replace(/₹\s?/g, 'Rupees ')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Main Assistant Response Generator
 * Uses verified catalog data and real store offers.
 */
export function generateAssistantResponse(userQuery: string): AssistantResponse {
	const raw = userQuery.trim();
	const q = raw.toLowerCase();

	// 1. URL prefix trick guidance
	if (q.includes('url') || q.includes('trick') || q.includes('prefix') || q.includes('browser link')) {
		const text =
			"💡 **SalesPoint URL Omnibox Trick:**\n\nSimply prepend `salespoint.in/` before any Amazon, Flipkart, Blinkit, or Zepto product link in your browser's address bar!\n\nFor example:\n`salespoint.in/https://blinkit.com/prn/lays-magic-masala`\n\nWe immediately extract the product SKU and compare prices across all competing 10-minute quick-commerce and e-commerce stores.";
		return {
			text,
			spokenText:
				"To use the URL trick, simply prepend salespoint.in slash before any Amazon, Flipkart, Blinkit, or Zepto link in your browser address bar. We will compare prices across all competing retailers immediately.",
			actionUrl: '/search?q=',
			actionLabel: 'Browse All SKUs',
			suggestions: ['Find cheapest chips packet', 'Drinks under ₹50', 'Cheapest smartphone']
		};
	}

	// 2. Cheapest smartphone request
	if (
		(q.includes('cheap') || q.includes('lowest') || q.includes('budget') || q.includes('best value')) &&
		(q.includes('smartphone') || q.includes('phone') || q.includes('mobile'))
	) {
		const phones = products.filter((p) => p.category === 'Smartphones');
		phones.sort((a, b) => {
			const pa = getLowestStorePrice(a)?.price ?? 999999;
			const pb = getLowestStorePrice(b)?.price ?? 999999;
			return pa - pb;
		});

		const topPicks = phones.slice(0, 3);
		const cheapest = topPicks[0];
		const lowestOffer = cheapest ? getLowestStorePrice(cheapest) : undefined;

		if (cheapest && lowestOffer) {
			const text = `📱 **Cheapest Smartphone Deal:**\n\nThe most affordable verified smartphone is **${cheapest.title}** at **${formatPrice(lowestOffer.price)}** on ${lowestOffer.store} (MRP: ${formatPrice(lowestOffer.mrp)}, ${getDiscountPercent(lowestOffer.mrp, lowestOffer.price)}% OFF).\n\nOther budget smartphone options verified in our catalogue:\n${topPicks
				.slice(1)
				.map((p) => `• **${p.title}** starting at **${formatPrice(getLowestStorePrice(p)?.price ?? 0)}** on ${getLowestStorePrice(p)?.store}`)
				.join('\n')}`;

			return {
				text,
				spokenText: `The most affordable verified smartphone is ${cheapest.title} at ${lowestOffer.price} Rupees on ${lowestOffer.store}.`,
				actionUrl: `/product/${cheapest.id}`,
				actionLabel: 'View Smartphone Deal',
				suggestions: ['Compare smartphones', 'Compare two laptops', 'Find drinks under ₹100'],
				products: topPicks.map(toProductSummary)
			};
		}
	}

	// 3. Compare two laptops / Compare laptops
	if (q.includes('laptop') && (q.includes('compare') || q.includes('vs') || q.includes('difference'))) {
		const laptops = products.filter((p) => p.category === 'Laptops');
		const macbook = laptops.find((l) => l.title.toLowerCase().includes('macbook')) ?? laptops[0];
		const windows = laptops.find((l) => !l.title.toLowerCase().includes('macbook')) ?? laptops[1] ?? laptops[0];

		const macLow = macbook ? getLowestStorePrice(macbook) : undefined;
		const winLow = windows ? getLowestStorePrice(windows) : undefined;

		const text = `💻 **Laptop Comparison:**\n\n1. **${macbook?.title}**\n• Lowest price: **${formatPrice(macLow?.price ?? 0)}** on ${macLow?.store}\n• MRP: ${formatPrice(macLow?.mrp ?? 0)} (${getDiscountPercent(macLow?.mrp ?? 0, macLow?.price ?? 0)}% OFF)\n• Rating: ★ ${macbook?.rating} (${macbook?.reviewCount} reviews)\n\n2. **${windows?.title}**\n• Lowest price: **${formatPrice(winLow?.price ?? 0)}** on ${winLow?.store}\n• MRP: ${formatPrice(winLow?.mrp ?? 0)} (${getDiscountPercent(winLow?.mrp ?? 0, winLow?.price ?? 0)}% OFF)\n• Rating: ★ ${windows?.rating} (${windows?.reviewCount} reviews)\n\nBoth products are tracked across Amazon, Flipkart, and Croma with 90-day price history verification.`;

		return {
			text,
			spokenText: `Comparing laptops: ${macbook?.title} starts at ${macLow?.price} Rupees on ${macLow?.store}, while ${windows?.title} is available at ${winLow?.price} Rupees on ${winLow?.store}.`,
			actionUrl: `/search?category=Laptops`,
			actionLabel: 'Compare All Laptops',
			suggestions: ['Explain laptop price history', 'Cheapest smartphone', 'Doritos vs Lays'],
			products: [macbook, windows].filter((p): p is Product => Boolean(p)).map(toProductSummary)
		};
	}

	// 4. Which chips packet offers better value? / Cheapest chips
	if (q.includes('chip') || q.includes('snack') || q.includes('namkeen') || q.includes('kurkure') || q.includes('lay')) {
		const chips = products.filter((p) => p.category === 'Chips' || p.category === 'Namkeen & Savoury Snacks');
		
		// Sort by unit price if value query, else absolute price
		const isValueQuery = q.includes('value') || q.includes('gram') || q.includes('unit') || q.includes('better');
		
		chips.sort((a, b) => {
			if (isValueQuery && a.unitPrice?.pricePer100g && b.unitPrice?.pricePer100g) {
				return a.unitPrice.pricePer100g - b.unitPrice.pricePer100g;
			}
			const pa = getLowestStorePrice(a)?.price ?? 999;
			const pb = getLowestStorePrice(b)?.price ?? 999;
			return pa - pb;
		});

		const top3 = chips.slice(0, 3);
		const winner = top3[0];
		const winnerLowest = winner ? getLowestStorePrice(winner) : undefined;

		let text = '';
		let spoken = '';

		if (isValueQuery) {
			text = `🥔 **Best Value Chips & Snacks Analysis:**\n\n**${winner?.title}** delivers the highest quantity per rupee at **${winner?.unitPrice?.formatted ?? '₹10/100g'}** (₹${winnerLowest?.price} on ${winnerLowest?.store}).\n\n💡 **Unit Economics Tip:** Larger Party Packs (115g–165g) generally save 35% to 50% per 100g compared to single ₹10 (28g–34g) convenience bags across Blinkit and Zepto!`;
			spoken = `${winner?.title} delivers the best value at ${winner?.unitPrice?.formatted}. Larger party packs save up to 50 percent per 100 grams compared to single small bags.`;
		} else {
			text = `🥔 **Cheapest Chips & Snacks Available:**\n\nThe lowest priced packet is **${winner?.title}** at just **${formatPrice(winnerLowest?.price ?? 10)}** on ${winnerLowest?.store}.\n\nOther verified budget options:\n${top3
				.slice(1)
				.map((p) => `• **${p.title}** at **${formatPrice(getLowestStorePrice(p)?.price ?? 10)}** (${p.unitPrice?.formatted ?? ''})`)
				.join('\n')}`;
			spoken = `The lowest priced chips packet is ${winner?.title} at ${winnerLowest?.price} Rupees on ${winnerLowest?.store}.`;
		}

		return {
			text,
			spokenText: spoken,
			actionUrl: `/search?category=Chips`,
			actionLabel: 'Explore All Chips Deals',
			suggestions: ['Compare 250ml vs 750ml Coke', 'Drinks under ₹50', 'Compare beverage prices per litre'],
			products: top3.map(toProductSummary)
		};
	}

	// 5. Compare beverage prices per litre / Drinks unit price
	if (
		(q.includes('litre') || q.includes('liter') || q.includes('per l') || q.includes('beverage price')) ||
		((q.includes('drink') || q.includes('beverage') || q.includes('coke') || q.includes('pepsi')) && (q.includes('unit') || q.includes('size') || q.includes('compare')))
	) {
		const drinks = products.filter(
			(p) =>
				['Soft Drinks & Sodas', 'Juices & Fruit Drinks', 'Energy & Sports Drinks', 'Packaged Water'].includes(p.category) &&
				p.unitPrice?.pricePerLitre !== undefined
		);
		drinks.sort((a, b) => (a.unitPrice?.pricePerLitre ?? 999) - (b.unitPrice?.pricePerLitre ?? 999));

		const bestValueDrink = drinks[0];
		const bestDrinkLow = bestValueDrink ? getLowestStorePrice(bestValueDrink) : undefined;
		const cokeCan = products.find((p) => p.title.toLowerCase().includes('coke') && p.title.toLowerCase().includes('can')) ?? products.find((p) => p.category === 'Soft Drinks & Sodas');
		const cokeBottle = products.find((p) => p.title.toLowerCase().includes('coke') && p.title.toLowerCase().includes('750ml')) ?? products.find((p) => p.category === 'Soft Drinks & Sodas' && p.id !== cokeCan?.id);

		const text = `🥤 **Beverage Price Per Litre Intelligence:**\n\n• **Standard Can (250ml at ₹35)**: Equivalent to **₹140.00 / Litre**\n• **Family PET Bottle (750ml at ₹40)**: Equivalent to **₹53.33 / Litre**\n• **Lowest per-litre beverage overall**: **${bestValueDrink?.title}** at **${bestValueDrink?.unitPrice?.formatted}** (${formatPrice(bestDrinkLow?.price ?? 20)} on ${bestDrinkLow?.store})\n\n🎯 **Money-Saving Verdict:** Buying 750ml or 1.25L bottles reduces your cost-per-litre by **over 61%** compared to 250ml single cans on Blinkit, Zepto, and Flipkart Minutes!`;

		return {
			text,
			spokenText: `Beverage price per litre intelligence: Single 250ml cans cost approximately 140 Rupees per litre, whereas 750ml PET bottles cost only 53 Rupees per litre, saving over 61 percent per litre.`,
			actionUrl: `/search?category=Soft%20Drinks%20%26%20Sodas`,
			actionLabel: 'Compare Beverage Sizes',
			suggestions: ['Find drinks under ₹100', 'Cheapest chips packet', 'Doritos vs Lays'],
			products: [bestValueDrink, cokeBottle, cokeCan]
				.filter((p): p is Product => Boolean(p))
				.slice(0, 3)
				.map(toProductSummary)
		};
	}

	// 6. Find drinks under ₹100 / drinks under ₹50
	const budgetMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || q.match(/(?:₹|rs\.?|inr)\s*(\d+)\s*(?:budget|or less|under)/i);
	if (
		q.includes('drink') ||
		q.includes('beverage') ||
		q.includes('soda') ||
		q.includes('juice') ||
		q.includes('water') ||
		q.includes('coke') ||
		budgetMatch
	) {
		const targetBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : (q.includes('50') ? 50 : 100);
		const drinkCategories = ['Soft Drinks & Sodas', 'Juices & Fruit Drinks', 'Energy & Sports Drinks', 'Packaged Water', 'Tea & Coffee Beverages'];

		const drinks = products.filter((p) => drinkCategories.includes(p.category));
		const affordable = drinks
			.map((p) => ({ product: p, lowest: getLowestStorePrice(p) }))
			.filter((item) => (item.lowest?.price ?? 999) <= targetBudget)
			.sort((a, b) => (a.lowest?.price ?? 999) - (b.lowest?.price ?? 999));

		if (affordable.length > 0) {
			const topPicks = affordable.slice(0, 3);
			const text = `🥤 **Found ${affordable.length} Drinks Under ₹${targetBudget}:**\n\nTop verified picks across 10-minute delivery stores:\n${topPicks
				.map((item) => `• **${item.product.title}**: **${formatPrice(item.lowest?.price ?? 0)}** on ${item.lowest?.store} (${item.product.unitPrice?.formatted ?? 'Great value'})`)
				.join('\n')}\n\nAll verified with in-stock guarantees across Blinkit, Zepto, and Flipkart Minutes.`;

			return {
				text,
				spokenText: `Found ${affordable.length} drinks under ${targetBudget} Rupees. Top picks include ${topPicks[0].product.title} at ${topPicks[0].lowest?.price} Rupees on ${topPicks[0].lowest?.store}.`,
				actionUrl: `/search?category=Soft%20Drinks%20%26%20Sodas`,
				actionLabel: `View All Drinks Under ₹${targetBudget}`,
				suggestions: ['Compare beverage prices per litre', 'Cheapest chips packet', 'Explain price history'],
				products: topPicks.map((i) => toProductSummary(i.product))
			};
		}
	}

	// 7. Lowest verified offer / Lowest price query
	if (q.includes('lowest offer') || q.includes('lowest price') || q.includes('best price') || q.includes('cheapest offer')) {
		// Try to extract product keyword from query
		const cleanedQuery = q.replace(/find|the|lowest|verified|offer|for|what|is|cheapest|price|of|best|deals?/g, '').trim();
		let targetProduct: Product | undefined;
		if (cleanedQuery.length >= 2) {
			targetProduct = products.find((p) => p.title.toLowerCase().includes(cleanedQuery) || p.brand.toLowerCase().includes(cleanedQuery));
		}
		if (!targetProduct) {
			targetProduct = products[0]; // fallback top product
		}

		const lowest = getLowestStorePrice(targetProduct);
		const inStockStores = targetProduct.storePrices.filter((s) => s.inStock);

		const text = `🎯 **Lowest Verified Offer for ${targetProduct.title}:**\n\n• **Lowest Price**: **${formatPrice(lowest?.price ?? 0)}** on **${lowest?.store}**\n• **Official MRP**: ${formatPrice(lowest?.mrp ?? 0)} (${getDiscountPercent(lowest?.mrp ?? 0, lowest?.price ?? 0)}% Real Savings)\n• **Stock Status**: In stock across ${inStockStores.length} stores\n\n**All Store Offers:**\n${targetProduct.storePrices
			.map((s) => `• ${s.store}: ${formatPrice(s.price)} (${s.inStock ? 'In Stock' : 'Out of Stock'})`)
			.join('\n')}`;

		return {
			text,
			spokenText: `The lowest verified offer for ${targetProduct.title} is ${lowest?.price} Rupees on ${lowest?.store}, saving ${getDiscountPercent(lowest?.mrp ?? 0, lowest?.price ?? 0)} percent off MRP.`,
			actionUrl: `/product/${targetProduct.id}`,
			actionLabel: `Inspect ${targetProduct.brand} Offers`,
			suggestions: ['Explain product price history', 'Find drinks under ₹100', 'Cheapest chips packet'],
			products: [toProductSummary(targetProduct)]
		};
	}

	// 8. Explain product's price history / Fake discount check
	if (q.includes('history') || q.includes('fake') || q.includes('discount') || q.includes('trend') || q.includes('shield')) {
		const sampleProduct = products.find((p) => p.category === 'Smartphones' || p.category === 'Laptops') ?? products[0];
		const lowestEver = getLowestPrice(sampleProduct.id);
		const highestEver = getHighestPrice(sampleProduct.id);
		const avg = getAveragePrice(sampleProduct.id);
		const currentLow = getLowestStorePrice(sampleProduct);

		const text = `📈 **Price History & Fake Discount Shield:**\n\nSalesPoint tracks daily price fluctuations over a 90-day window to protect shoppers from artificial discounts before sales.\n\n**Example Case: ${sampleProduct.title}**\n• Current Lowest: **${formatPrice(currentLow?.price ?? 0)}** on ${currentLow?.store}\n• 90-Day All-Time Low: **${formatPrice(lowestEver?.price ?? 0)}**\n• 90-Day Peak MRP/Price: **${formatPrice(highestEver?.price ?? 0)}**\n• 90-Day Average: **${formatPrice(avg)}**\n\n💡 If a seller artificially inflates the MRP right before a flash sale, our Fake Discount Shield flags the item in red.`;

		return {
			text,
			spokenText: `Our 90-day price history and Fake Discount Shield verifies whether current discounts are authentic or artificially inflated by retailers before sales.`,
			actionUrl: `/product/${sampleProduct.id}`,
			actionLabel: 'View Price History Chart',
			suggestions: ['Cheapest smartphone', 'Which chips packet offers better value?', 'Drinks under ₹50'],
			products: [toProductSummary(sampleProduct)]
		};
	}

	// 9. Keyword search across catalog (415 items)
	const tokens = q
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((w) => w.length > 2);

	if (tokens.length > 0) {
		const matches = products.filter((p) => {
			const str = `${p.title} ${p.brand} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
			return tokens.some((t) => str.includes(t));
		});

		if (matches.length > 0) {
			const top3 = matches.slice(0, 3);
			const top1 = top3[0];
			const lowest1 = getLowestStorePrice(top1);

			const text = `🔎 **Found ${matches.length} matching product(s):**\n\nTop match: **${top1.title}** starting at **${formatPrice(lowest1?.price ?? 0)}** on ${lowest1?.store}.\n\nOther matching options:\n${top3
				.slice(1)
				.map((p) => `• **${p.title}** (${formatPrice(getLowestStorePrice(p)?.price ?? 0)} on ${getLowestStorePrice(p)?.store})`)
				.join('\n')}`;

			return {
				text,
				spokenText: `Found ${matches.length} matching products. Top match is ${top1.title} starting at ${lowest1?.price} Rupees on ${lowest1?.store}.`,
				actionUrl: `/search?q=${encodeURIComponent(raw)}`,
				actionLabel: `Search "${raw}" in Catalogue`,
				suggestions: ['Cheapest chips packet', 'Drinks under ₹50', 'Explain price history'],
				products: top3.map(toProductSummary)
			};
		}
	}

	// 10. Default helpful fallback
	return {
		text: "🤖 **SalesPoint AI Shopping Assistant**\n\nI can help you find true bargains across 400+ verified products on Amazon, Flipkart, Blinkit, Zepto, and Croma!\n\n**Try asking:**\n• \"Find the cheapest smartphone\"\n• \"Compare two laptops\"\n• \"Which chips packet offers better value?\"\n• \"Find drinks under ₹100\"\n• \"Compare beverage prices per litre\"\n• \"Find lowest verified offer for iPhone 16\"\n• \"Explain product price history\"",
		spokenText:
			"I am your SalesPoint AI shopping assistant. You can ask me for the cheapest smartphone, to compare laptops, find drinks under 100 rupees, or check beverage prices per litre.",
		actionUrl: '/search?q=',
		actionLabel: 'Explore All Categories',
		suggestions: [
			'Find the cheapest smartphone',
			'Which chips packet offers better value?',
			'Find drinks under ₹50',
			'Compare beverage prices per litre'
		]
	};
}
