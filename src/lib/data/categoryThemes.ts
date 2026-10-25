export interface CategoryTheme {
	name: string;
	emoji: string;
	gradient: string;
	bgClass: string;
	textColor: string;
	description: string;
	sampleImage: string;
}

export const categoryThemes: Record<string, CategoryTheme> = {
	'Chips': {
		name: 'Chips',
		emoji: '🥔',
		gradient: 'from-amber-600 via-orange-500 to-yellow-500',
		bgClass: 'bg-amber-600',
		textColor: 'text-amber-100',
		description: 'Potato crisps, nacho chips, tortilla & artisanal crunches',
		sampleImage: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80'
	},
	'Soft Drinks & Sodas': {
		name: 'Soft Drinks & Sodas',
		emoji: '🥤',
		gradient: 'from-red-600 via-rose-600 to-orange-500',
		bgClass: 'bg-red-600',
		textColor: 'text-rose-100',
		description: 'Colas, lemon-lime, sparkling sodas, tonic & diet fizz',
		sampleImage: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
	},
	'Juices & Fruit Drinks': {
		name: 'Juices & Fruit Drinks',
		emoji: '🧃',
		gradient: 'from-orange-500 via-amber-500 to-yellow-400',
		bgClass: 'bg-orange-500',
		textColor: 'text-orange-100',
		description: '100% real fruit juices, nectars, pulps & refreshing coolers',
		sampleImage: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80'
	},
	'Energy & Sports Drinks': {
		name: 'Energy & Sports Drinks',
		emoji: '⚡',
		gradient: 'from-blue-600 via-cyan-500 to-teal-400',
		bgClass: 'bg-blue-600',
		textColor: 'text-cyan-100',
		description: 'High-performance caffeine, taurine, electrolytes & hydration',
		sampleImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80'
	},
	'Packaged Water': {
		name: 'Packaged Water',
		emoji: '💧',
		gradient: 'from-sky-500 via-cyan-600 to-blue-700',
		bgClass: 'bg-sky-600',
		textColor: 'text-sky-100',
		description: 'Mineral water, alkaline hydration, sparkling spring & premium glass',
		sampleImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80'
	},
	'Tea & Coffee Beverages': {
		name: 'Tea & Coffee Beverages',
		emoji: '☕',
		gradient: 'from-amber-800 via-yellow-900 to-stone-800',
		bgClass: 'bg-amber-900',
		textColor: 'text-amber-200',
		description: 'Ready-to-drink iced lattes, cold brew, matcha & brewed teas',
		sampleImage: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80'
	},
	'Namkeen & Savoury Snacks': {
		name: 'Namkeen & Savoury Snacks',
		emoji: '🍿',
		gradient: 'from-yellow-600 via-amber-600 to-red-600',
		bgClass: 'bg-yellow-700',
		textColor: 'text-yellow-100',
		description: 'Bhujia, sev, roasted nuts, chana jor garam & Indian munchies',
		sampleImage: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80'
	},
	'Biscuits & Cookies': {
		name: 'Biscuits & Cookies',
		emoji: '🍪',
		gradient: 'from-amber-700 via-orange-600 to-yellow-600',
		bgClass: 'bg-amber-700',
		textColor: 'text-amber-100',
		description: 'Choco-chips, digestive oats, butter cookies & cream wafers',
		sampleImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80'
	},
	'Chocolates & Candy': {
		name: 'Chocolates & Candy',
		emoji: '🍫',
		gradient: 'from-amber-950 via-stone-800 to-red-900',
		bgClass: 'bg-stone-900',
		textColor: 'text-amber-200',
		description: 'Dark bars, silky milk chocolates, truffles, gummies & candies',
		sampleImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=400&q=80'
	},
	'Instant Noodles & Packaged Food': {
		name: 'Instant Noodles & Packaged Food',
		emoji: '🍜',
		gradient: 'from-red-600 via-orange-600 to-amber-500',
		bgClass: 'bg-red-700',
		textColor: 'text-red-100',
		description: 'Ramen, cup noodles, pasta, instant meals & ready mixes',
		sampleImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80'
	},
	'Smartphones': {
		name: 'Smartphones',
		emoji: '📱',
		gradient: 'from-indigo-600 via-blue-600 to-purple-600',
		bgClass: 'bg-indigo-600',
		textColor: 'text-indigo-100',
		description: 'Latest 5G flagship, budget & camera phones across retailers',
		sampleImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=400&q=80'
	},
	'Laptops': {
		name: 'Laptops',
		emoji: '💻',
		gradient: 'from-slate-700 via-indigo-900 to-cyan-800',
		bgClass: 'bg-slate-800',
		textColor: 'text-cyan-100',
		description: 'Ultrabooks, gaming rigs, MacBooks & creator workstations',
		sampleImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
	},
	'Headphones': {
		name: 'Headphones',
		emoji: '🎧',
		gradient: 'from-purple-700 via-pink-600 to-rose-500',
		bgClass: 'bg-purple-700',
		textColor: 'text-pink-100',
		description: 'Active Noise Cancelling over-ears, studio monitors & TWS earbuds',
		sampleImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'
	},
	'Smartwatches': {
		name: 'Smartwatches',
		emoji: '⌚',
		gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
		bgClass: 'bg-emerald-600',
		textColor: 'text-emerald-100',
		description: 'Fitness trackers, AMOLED wearables & health monitors',
		sampleImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80'
	},
	'Televisions': {
		name: 'Televisions',
		emoji: '📺',
		gradient: 'from-violet-800 via-purple-700 to-indigo-900',
		bgClass: 'bg-violet-800',
		textColor: 'text-violet-100',
		description: '4K OLED, QLED displays, smart streaming & home theaters',
		sampleImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80'
	},
	'Tablets': {
		name: 'Tablets',
		emoji: '📋',
		gradient: 'from-teal-600 via-cyan-600 to-sky-700',
		bgClass: 'bg-teal-600',
		textColor: 'text-teal-100',
		description: 'iPads, Android tablets, digital sketchpads & reader tablets',
		sampleImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80'
	},
	'Cameras': {
		name: 'Cameras',
		emoji: '📷',
		gradient: 'from-stone-700 via-zinc-800 to-neutral-900',
		bgClass: 'bg-stone-800',
		textColor: 'text-stone-200',
		description: 'Mirrorless cameras, full-frame vloggers & action cams',
		sampleImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'
	},
	'Footwear': {
		name: 'Footwear',
		emoji: '👟',
		gradient: 'from-rose-600 via-pink-600 to-amber-600',
		bgClass: 'bg-rose-600',
		textColor: 'text-rose-100',
		description: 'Sneakers, running shoes, loafers & lifestyle footwear',
		sampleImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'
	},
	'Clothing': {
		name: 'Clothing',
		emoji: '👕',
		gradient: 'from-fuchsia-700 via-purple-700 to-indigo-800',
		bgClass: 'bg-fuchsia-700',
		textColor: 'text-fuchsia-100',
		description: 'Apparel, graphic tees, jackets, denim & athleisure',
		sampleImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80'
	},
	'Home Appliances': {
		name: 'Home Appliances',
		emoji: '🏠',
		gradient: 'from-emerald-700 via-teal-700 to-blue-800',
		bgClass: 'bg-emerald-700',
		textColor: 'text-emerald-100',
		description: 'Air purifiers, robotic vacuums, coffee makers & microwaves',
		sampleImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
	}
};

export function getCategoryTheme(name: string): CategoryTheme {
	if (categoryThemes[name]) return categoryThemes[name];
	return {
		name,
		emoji: '🛒',
		gradient: 'from-slate-700 via-zinc-800 to-neutral-900',
		bgClass: 'bg-slate-700',
		textColor: 'text-slate-100',
		description: 'Explore products across verified retail stores',
		sampleImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
	};
}
