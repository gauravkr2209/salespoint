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

<div class="w-full my-12 bg-[#2A1E4D] rounded-3xl border border-[#3A3A52] shadow-2xl overflow-hidden transition-colors">
	<!-- Tab Bar -->
	<div class="flex flex-wrap items-center justify-between border-b border-[#3A3A52] px-6 py-4 bg-[#1A1333]">
		<div class="flex items-center gap-2.5">
			<span class="flex h-2.5 w-2.5 relative">
				<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B7CC7] opacity-75"></span>
				<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B7CC7]"></span>
			</span>
			<h3 class="text-xs sm:text-sm font-black text-white tracking-wide uppercase flex items-center gap-2">
				SalesPoint Live Intelligence Radar
			</h3>
		</div>
		<div class="flex gap-1.5 p-1 bg-[#140E28] border border-[#3A3A52] rounded-xl mt-2 sm:mt-0">
			<button
				type="button"
				onclick={() => activeTab = 'live'}
				class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'live' ? 'bg-[#5A3B8C] text-white shadow-md' : 'text-[#8E84B0] hover:text-white'}"
			>
				⚡ Real-Time Drops
			</button>
			<button
				type="button"
				onclick={() => activeTab = 'scanner'}
				class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'scanner' ? 'bg-[#5A3B8C] text-white shadow-md' : 'text-[#8E84B0] hover:text-white'}"
			>
				🛡️ Fake Discount Shield
			</button>
			<button
				type="button"
				onclick={() => activeTab = 'ticker'}
				class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer {activeTab === 'ticker' ? 'bg-[#5A3B8C] text-white shadow-md' : 'text-[#8E84B0] hover:text-white'}"
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
					<div class="group relative bg-[#1F173C] hover:bg-[#34265E]/60 border border-[#3A3A52] hover:border-[#8B7CC7] p-4.5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
						<div class="flex items-start justify-between gap-2 mb-2.5">
							<span class="text-2xl p-2 bg-[#140E28] border border-[#3A3A52] rounded-xl shadow-xs group-hover:scale-110 transition-transform">
								{item.emoji}
							</span>
							<span class="text-[11px] font-black text-white bg-[#5A3B8C] border border-[#8B7CC7]/40 px-3 py-1 rounded-full shadow-sm">
								{item.drop}
							</span>
						</div>
						<h4 class="text-sm font-bold text-[#C9C2E3] line-clamp-1 group-hover:text-white transition-colors">
							{item.title}
						</h4>
						<div class="flex items-center justify-between text-xs text-[#8E84B0] mt-3.5 pt-2.5 border-t border-[#3A3A52]">
							<span class="font-bold text-white flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 rounded-full bg-[#8B7CC7]"></span>
								{item.store}
							</span>
							<span class="text-[11px]">{item.time}</span>
						</div>
					</div>
				{/each}
			</div>

		{:else if activeTab === 'scanner'}
			<div class="bg-gradient-to-r from-[#1A1235] via-[#2A1E4D] to-[#1F173C] border border-[#3A3A52] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
				<div class="absolute -right-10 -bottom-10 w-64 h-64 bg-[#5A3B8C]/20 rounded-full blur-3xl pointer-events-none"></div>
				<div class="max-w-2xl relative z-10">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A3B8C]/40 border border-[#8B7CC7]/40 text-xs font-semibold mb-3.5 text-[#C9C2E3]">
						<span>🛡️</span> SalesPoint Price Rigging Detector
					</div>
					<h4 class="text-xl sm:text-2xl font-black mb-3 text-white tracking-tight">
						How SalesPoint Stops "Fake Festival Sales" & Supermarket Markups
					</h4>
					<p class="text-xs sm:text-sm text-[#C9C2E3] leading-relaxed mb-6 font-medium">
						Many retail platforms artificially increase the MRP or list price by 15% to 30% right before festival sales, then advertise a "Huge 40% Off". Our background price-intelligence algorithms record real historical data daily across 400+ products to expose inflated discounts.
					</p>
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
						<div class="bg-[#140E28] rounded-xl p-3.5 border border-[#3A3A52]">
							<div class="text-lg font-black text-white">90 Days</div>
							<div class="text-[11px] text-[#8E84B0]">Continuous Price Snapshots</div>
						</div>
						<div class="bg-[#140E28] rounded-xl p-3.5 border border-[#3A3A52]">
							<div class="text-lg font-black text-emerald-400">100% Verified</div>
							<div class="text-[11px] text-[#8E84B0]">Historical Price Accuracy</div>
						</div>
						<div class="bg-[#140E28] rounded-xl p-3.5 border border-[#3A3A52] col-span-2 sm:col-span-1">
							<div class="text-lg font-black text-[#8B7CC7]">₹0 Markups</div>
							<div class="text-[11px] text-[#8E84B0]">Unbiased Retailer Comparison</div>
						</div>
					</div>
				</div>
			</div>

		{:else if activeTab === 'ticker'}
			<div class="space-y-4">
				<div class="p-6 bg-[#1F173C] rounded-2xl border border-[#3A3A52]">
					<div class="flex items-center justify-between mb-4 text-xs font-black text-[#8B7CC7] uppercase tracking-wider">
						<span>Store Platform</span>
						<span>Average Catalogue Savings</span>
					</div>
					<div class="space-y-4">
						<div>
							<div class="flex justify-between text-xs font-bold mb-1.5 text-white">
								<span>Blinkit & Zepto (Snacks & Quick Commerce)</span>
								<span class="text-[#8B7CC7]">Fast 10-15 Min Delivery</span>
							</div>
							<div class="w-full bg-[#140E28] border border-[#3A3A52] h-2.5 rounded-full overflow-hidden">
								<div class="bg-[#5A3B8C] h-full rounded-full transition-all duration-1000" style="width: 88%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1.5 text-white">
								<span>Amazon India</span>
								<span class="text-[#C9C2E3]">23.4% Avg Savings</span>
							</div>
							<div class="w-full bg-[#140E28] border border-[#3A3A52] h-2.5 rounded-full overflow-hidden">
								<div class="bg-[#8B7CC7] h-full rounded-full transition-all duration-1000" style="width: 78%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1.5 text-white">
								<span>Flipkart & Flipkart Minutes</span>
								<span class="text-[#C9C2E3]">24.1% Avg Savings</span>
							</div>
							<div class="w-full bg-[#140E28] border border-[#3A3A52] h-2.5 rounded-full overflow-hidden">
								<div class="bg-[#6D47A6] h-full rounded-full transition-all duration-1000" style="width: 82%"></div>
							</div>
						</div>
						<div>
							<div class="flex justify-between text-xs font-bold mb-1.5 text-white">
								<span>Croma Electronics</span>
								<span class="text-[#C9C2E3]">18.9% Avg Savings</span>
							</div>
							<div class="w-full bg-[#140E28] border border-[#3A3A52] h-2.5 rounded-full overflow-hidden">
								<div class="bg-[#5A3B8C] h-full rounded-full transition-all duration-1000" style="width: 65%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
