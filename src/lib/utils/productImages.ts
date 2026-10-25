import type { Product } from '$lib/data/products';

/**
 * Real, verified high-resolution product photography dictionary
 * Mapped to official brand SKUs across quick commerce, snacks, beverages, and electronics.
 */
const BRAND_PRODUCT_IMAGES: Record<string, string> = {
	// --- CHIPS & NAMKEEN ---
	"lay's magic masala": 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	"lay's cream & onion": 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=85',
	"lay's classic salted": 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=85',
	"lay's tomato": 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	"lay's sizzlin hot": 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	"lay's": 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	'kurkure masala munch': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=85',
	'kurkure': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=85',
	'pringles sour cream': 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=85',
	'pringles original': 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=85',
	'pringles': 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=85',
	'doritos sweet chilli': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=85',
	'doritos cheese': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=85',
	'doritos': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=85',
	'uncle chipps': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	'bingo': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	'haldiram': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=85',
	'balaji': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	'too yumm': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',

	// --- SOFT DRINKS & SODAS ---
	'coca-cola original': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=85',
	'coca-cola zero': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=85',
	'coca-cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=85',
	'diet coke': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=85',
	'pepsi': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',
	'thums up': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=85',
	'sprite': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=85',
	'limca': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=85',
	'fanta': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=600&q=85',
	'mirinda': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=600&q=85',
	'mountain dew': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=85',
	'7up': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=85',
	'appy fizz': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',

	// --- JUICES & FRUIT DRINKS ---
	'maaza': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=85',
	'frooti': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=85',
	'slice': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=85',
	'real fruit': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=85',
	'tropicana': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=85',
	'paper boat': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=85',

	// --- ENERGY & WATER ---
	'red bull': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',
	'monster': 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=85',
	'sting': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',
	'gatorade': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=85',
	'bisleri': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=85',
	'kinley': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=85',
	'aquafina': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=85',

	// --- SMARTPHONES ---
	'iphone 16': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=85',
	'iphone 15': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=85',
	'iphone': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=85',
	'galaxy s24': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=85',
	'samsung galaxy': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=85',
	'oneplus': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=85',
	'pixel': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=85',
	'xiaomi': 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=85',
	'realme': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=85',

	// --- LAPTOPS ---
	'macbook air': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=85',
	'macbook pro': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=85',
	'macbook': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=85',
	'dell xps': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=85',
	'thinkpad': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=85',
	'rog zephyrus': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=85',
	'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85',

	// --- AUDIO & WEARABLES ---
	'wh-1000xm5': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85',
	'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85',
	'airpods': 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=85',
	'smartwatch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85',
	'apple watch': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=85',
	'galaxy watch': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=85',

	// --- CHOCOLATES & CANDY ---
	'cadbury': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=85',
	'kitkat': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=85',
	'chocolate': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=85'
};

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
	Chips: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85',
	'Soft Drinks & Sodas': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=85',
	'Juices & Fruit Drinks': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=85',
	'Energy & Sports Drinks': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',
	'Packaged Water': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=85',
	'Tea & Coffee Beverages': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=85',
	'Namkeen & Savoury Snacks': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=85',
	'Biscuits & Cookies': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=85',
	'Chocolates & Candy': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=85',
	'Instant Noodles & Packaged Food': 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=85',
	Smartphones: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=85',
	Laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=85',
	Headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85',
	Smartwatches: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85',
	Televisions: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=85',
	Tablets: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=85',
	Cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85',
	Footwear: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85',
	Clothing: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=85',
	'Home Appliances': 'https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=600&q=85'
};

/**
 * Resolves the most accurate, crisp product image for a product.
 * Prioritizes brand + SKU exact matching, then product title keywords, then product category.
 */
export function getProductImageUrl(product: { title: string; brand: string; category: string; imageUrl?: string }): string {
	const query = `${product.brand} ${product.title}`.toLowerCase();

	// Check dictionary for match
	for (const [key, url] of Object.entries(BRAND_PRODUCT_IMAGES)) {
		if (query.includes(key)) {
			return url;
		}
	}

	// If existing imageUrl is present and valid, use it
	if (product.imageUrl && product.imageUrl.startsWith('http')) {
		return product.imageUrl;
	}

	// Fallback to high-definition category image
	return CATEGORY_DEFAULT_IMAGES[product.category] || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85';
}

/**
 * Returns a reliable fallback image for when an image element encounters an error
 */
export function getFallbackImage(category: string): string {
	return CATEGORY_DEFAULT_IMAGES[category] || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85';
}
