<script lang="ts">
	import { onMount } from 'svelte';
	import { products } from '$lib/data/products';
	import { formatPrice } from '$lib/utils/formatPrice';

	let activeTab = $state<'live' | 'ticker' | 'scanner'>('live');

	// Simulated live deal stream
	let liveDeals = $state([
		{ id: '1', title: 'Lay\'s India\'s Magic Masala (115g)', drop: '₹12 DROP', store: 'Blinkit', time: '1m ago', emoji: '🥔' },
		{ id: '2', title: 'Coca-Cola 750ml PET Bottle', drop: '₹8 DROP', store: 'Zepto', time: '3m ago', emoji: '🥤' },
		{ id: '3', title: 'Apple iPhone 16 (Ultramarine Blue)', drop: '₹5,001 DROP', store: 'Amazon', time: '5m ago', emoji: '📱' },
		{ id: '4', title: 'Sony WH-1000XM5 Wireless Headphones', drop: '₹8,000 DROP', store: 'Flipkart', time: '8m ago', emoji: '🎧' },
		{ id: '5', title: 'Kurkure Masala Munch (135g)', drop: '₹7 DROP', store: 'Flipkart Minutes', time: '11m ago', emoji: '🌽' },
		{ id: '6', title: 'MacBook Air M3 (Midnight, 16GB)', drop: '₹10,000 DROP', store: 'Croma', time: '14m ago', emoji: '💻' }
	]);

	onMount(() => {
		const interval = setInterval(() => {
			const randomProd = products[Math.floor(Math.random() * products.length)];
			const stores = ['Amazon', 'Flipkart', 'Blinkit', 'Zepto', 'Flipkart Minutes', 'Croma', 'Myntra'];
			const store = stores[Math.floor(Math.random() * stores.length)];
			const randomDrop = randomProd.category === 'Chips' || randomProd.category === 'Soft Drinks & Sodas'
				? Math.floor(Math.random() * 8 + 3)
				: Math.floor(Math.random() * 8 + 1) * 1000;

			liveDeals = [
				{
					id: String(Date.now()),
					title: randomProd.title,
					drop: `₹${randomDrop.toLocaleString('en-IN')} DROP`,
					store,
					time: 'Just now',
					emoji: randomProd.category === 'Chips' ? '🥔' : (randomProd.category.includes('Drink') || randomProd.category.includes('Water') ? '🥤' : (randomProd.category === 'Smartphones' ? '📱' : (randomProd.category === 'Laptops' ? '💻' : '🔥')))
				},
				...liveDeals.slice(0, 5)
			];
		}, 6000);

		return () => clearInterval(interval);
	});
</script>

<div class="w-full my-12 bg-white dark:bg-slate-800 rounded-3xl border border-border/80 dark:border-slate-700 shadow-xl overflow-hidden transition-colors">
	<!-- Tab Bar -->
	<div class="flex flex-wrap items-center justify-between border-b border-border/60 dark:border-slate-700/60 px-6 py-4 bg-slate-50/70 dark:bg-slate-900/60">
		<div class="flex items-center gap-2">
			<span class="w-2.5 h-2.5 rounded-full bg-danger animate-ping"></span>
			<h3 class="text-xs sm:text-sm font-black text-text-primary dark:text-white tracking-wide uppercase flex items-center gap-2">
				SalesPoint Live Market Intelligence Radar
			</h3>
		</div>
		<div class="flex gap-1.5 p-1 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 rounded-xl">
			<button
				type="button"
				onclick={() => activeTab = 'live'}
				class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'live' ? 'bg-primary text-white shadow-xs' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}"
			>
				⚡ Real-Time Drops
			</button>
			<button
				type="button"
				onclick={() => activeTab = 'scanner'}
				class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'scanner' ? 'bg-primary text-white shadow-xs' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}"
			>
				🛡️ Fake Discount Shield
			</button>
			<button
				type="button"
				onclick={() => activeTab = 'ticker'}
				class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'ticker' ? 'bg-primary text-white shadow-xs' : 'text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white'}"
			>
				📊 Multi-Store Index
			</button>
		</div>
	</div>

	<!-- Content based on tab -->
	<div class="p-6">
		{#if activeTab === 'live'}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each liveDeals as item (item.id)}
					<div class="group relative bg-slate-50 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 border border-border/70 dark:border-slate-700 hover:border-primary/50 dark:hover:border-indigo-500/50 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
						<div class="flex items-start justify-between gap-2 mb-2">
							<span class="text-2xl p-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xs group-hover:scale-110 transition-transform">
								{item.emoji}
							</span>
							<span class="text-[11px] font-black text-white bg-gradient-to-r from-success to-emerald-600 px-2.5 py-1 rounded-full shadow-xs">
								{item.drop}
							</span>
						</div>
						<h4 class="text-sm font-bold text-text-primary dark:text-slate-100 line-clamp-1 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
							{item.title}
						</h4>
						<div class="flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 mt-3 pt-2 border-t border-border/40 dark:border-slate-700/60">
							<span class="font-bold text-text-primary dark:text-slate-200 flex items-center gap-1">
								<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
								{item.store}
							</span>
							<span>{item.time}</span>
						</div>
					</div>
				{/each}
			</div>

		{:else if activeTab === 'scanner'}
			<div class="bg-gradient-to-r from-indigo-900 via-primary to-purple-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
				<div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
				<div class="max-w-2xl relative z-10">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3">
						<span>🛡️</span> SalesPoint Price Rigging Detector
					</div>
					<h4 class="text-xl sm:text-2xl font-black mb-2">
						How SalesPoint Stops "Fake Festival Sales" & Supermarket Markups
					</h4>
					<p class="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
						Many retail platforms artificially increase the MRP or list price by 15% to 30% right before festival sales, then advertise a "Huge 40% Off". Our background price-intelligence algorithms record real historical data daily across 400+ products to expose inflated discounts.
					</p>
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
							<div class="text-lg font-black text-amber-300">90 Days</div>
							<div class="text-[11px] text-white/70">Continuous Price Snapshots</div>
						</div>
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
							<div class="text-lg font-black text-green-300">100% Verified</div>
							<div class="text-[11px] text-white/70">Historical Price Accuracy</div>
						</div>
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
							<div class="text-lg font-black text-cyan-300">₹0 Markups</div>
							<div class="text-[11px] text-white/70">Unbiased Retailer Comparison</div>
						</div>
					</div>
				</div>
			</div>

		{:else if activeTab === 'ticker'}
			<div class="space-y-4">
				<div class="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border dark:border-slate-700">
					<div class="flex items-center justify-between mb-4 text-xs font-bold text-text-secondary dark:text-slate-400">
						<span>STORE PLATFORM</span>
						<span>AVERAGE CATALOGUE SAVINGS</span>
					</div>
					<div class="space-y-3.5">
						<div>
							<div class="flex justify-between text-xs font-bold mb-1 dark:text-slate-200">
								<span>Blinkit & Zepto (Snacks & Quick Commerce)</span>
								<span class="text-amber-500">Fast 10-15 Min Delivery</span>
							</div>
							<div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
								<div class="bg-amber-500 h-full rounded-full transition-all duration-1000" style="width: 88%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1 dark:text-slate-200">
								<span>Amazon India</span>
								<span class="text-amazon">23.4% Avg Savings</span>
							</div>
							<div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
								<div class="bg-amazon h-full rounded-full transition-all duration-1000" style="width: 78%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1 dark:text-slate-200">
								<span>Flipkart & Flipkart Minutes</span>
								<span class="text-flipkart">24.1% Avg Savings</span>
							</div>
							<div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
								<div class="bg-flipkart h-full rounded-full transition-all duration-1000" style="width: 82%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1 dark:text-slate-200">
								<span>Croma Electronics</span>
								<span class="text-croma">18.9% Avg Savings</span>
							</div>
							<div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
								<div class="bg-croma h-full rounded-full transition-all duration-1000" style="width: 65%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
