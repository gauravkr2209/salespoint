<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { products, getLowestStorePrice } from '$lib/data/products';
	import { formatPrice } from '$lib/utils/formatPrice';

	interface ChatMessage {
		id: string;
		sender: 'bot' | 'user';
		text: string;
		time: string;
		actionUrl?: string;
		actionLabel?: string;
		suggestions?: string[];
	}

	let isOpen = $state(false);
	let inputValue = $state('');
	let isTyping = $state(false);
	let messagesContainer: HTMLDivElement | undefined = $state();

	const initialMessages: ChatMessage[] = [
		{
			id: 'm1',
			sender: 'bot',
			text: "👋 Hi there! I'm your SalesPoint Smart Shopping AI. Looking for the lowest price chips, cold drinks, or electronics across Amazon, Flipkart, Blinkit & Zepto?",
			time: 'Just now',
			suggestions: [
				'Find cheapest chips packet',
				'Compare 250ml vs 750ml Coke',
				'Find drinks under ₹50',
				'Show Kurkure vs Lay\'s',
				'How to use URL trick?'
			]
		}
	];

	let messages = $state<ChatMessage[]>(initialMessages);

	function getTime(): string {
		return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		}, 60);
	}

	function handleUserSubmit(queryText?: string) {
		const text = (queryText ?? inputValue).trim();
		if (!text) return;

		messages.push({
			id: 'u_' + Date.now(),
			sender: 'user',
			text,
			time: getTime()
		});

		inputValue = '';
		scrollToBottom();
		isTyping = true;

		setTimeout(() => {
			generateBotResponse(text);
			isTyping = false;
			scrollToBottom();
		}, 600);
	}

	function generateBotResponse(userQuery: string) {
		const q = userQuery.toLowerCase();

		// URL trick query
		if (q.includes('url') || q.includes('trick') || q.includes('prefix') || q.includes('link')) {
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: "💡 It's super easy! Just add 'salespoint.in/' before any Amazon, Flipkart, Blinkit, or Zepto link in your browser address bar. We parse the product SKU and compare prices across all competing retailers immediately!",
				time: getTime(),
				suggestions: ['Cheapest chips', 'Cold drinks under ₹50', 'iPhone 16 Pro price']
			});
			return;
		}

		// 1. Cheapest chips query
		if (q.includes('cheap') && (q.includes('chip') || q.includes('snack'))) {
			const chips = products.filter(p => p.category === 'Chips');
			const sorted = chips.sort((a, b) => {
				const pa = getLowestStorePrice(a)?.price ?? 999;
				const pb = getLowestStorePrice(b)?.price ?? 999;
				return pa - pb;
			});
			const top3 = sorted.slice(0, 3);
			const cheapest = top3[0];
			const lowest = getLowestStorePrice(cheapest);

			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `🥔 The lowest priced chips packet is **${cheapest.title}** at just **${formatPrice(lowest?.price ?? 10)}** on ${lowest?.store} (${cheapest.unitPrice?.formatted ?? 'great value'}).\n\nOther ₹10 options include: ${top3.slice(1).map(p => p.title).join(', ')}.`,
				time: getTime(),
				actionUrl: `/product/${cheapest.id}`,
				actionLabel: 'View Cheapest Chips →',
				suggestions: ['Show all Chips', 'Kurkure Munch deals', 'Cold drinks under ₹50']
			});
			return;
		}

		// 2. Drinks under ₹50
		if ((q.includes('drink') || q.includes('beverage') || q.includes('soda') || q.includes('coke') || q.includes('pepsi')) && (q.includes('50') || q.includes('budget') || q.includes('cheap'))) {
			const drinks = products.filter(p => 
				['Soft Drinks & Sodas', 'Juices & Fruit Drinks', 'Energy & Sports Drinks', 'Packaged Water', 'Tea & Coffee Beverages'].includes(p.category)
			);
			const under50 = drinks.filter(p => {
				const price = getLowestStorePrice(p)?.price ?? 100;
				return price <= 50;
			});
			const pick = under50[0] ?? drinks[0];
			const lowest = getLowestStorePrice(pick);

			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `🥤 We found **${under50.length} drinks under ₹50**!\n\nTop pick: **${pick.title}** at **${formatPrice(lowest?.price ?? 35)}** (Unit price: ${pick.unitPrice?.formatted ?? '₹53.33/L'}). Also check out Sting (₹20), Bisleri 1L (₹20), and Maaza 250ml (₹20).`,
				time: getTime(),
				actionUrl: `/search?q=Drinks`,
				actionLabel: 'Explore All Drinks Under ₹50 →',
				suggestions: ['Compare 250ml vs 750ml Coke', 'Red Bull deals', 'Biscuits & Cookies']
			});
			return;
		}

		// 3. Unit price comparison query (e.g. 250ml vs 750ml bottle)
		if (q.includes('unit') || (q.includes('250') && q.includes('750')) || q.includes('compare size') || q.includes('pack')) {
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: "⚖️ **Unit Price Intelligence:**\n\n• **Coca-Cola 250ml Can**: ₹35 → **₹140.00/Litre**\n• **Coca-Cola 750ml PET**: ₹40 → **₹53.33/Litre**\n\n🎯 **Verdict**: The 750ml bottle saves you **over 61% per litre** compared to single cans! SalesPoint automatically calculates price-per-100g and price-per-litre on all grocery items so you never overpay.",
				time: getTime(),
				actionUrl: `/search?q=Coca-Cola`,
				actionLabel: 'Compare All Coca-Cola Sizes →',
				suggestions: ['Find cheapest chips packet', 'Doritos Tortilla deals', 'Quick commerce snacks']
			});
			return;
		}

		// 4. Compare brand query (e.g. Lay's vs Kurkure, or Coke vs Pepsi)
		if ((q.includes('lay') && q.includes('kurkure')) || (q.includes('coke') && q.includes('pepsi')) || q.includes('compare')) {
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: "🔍 **Brand Comparison:**\n\n• **Lay's**: 20+ potato variants (Classic, Magic Masala, Cream & Onion). Starting at ₹10 (30g) up to ₹80 for 165g Party Packs.\n• **Kurkure**: 15+ crispy corn puff variants (Masala Munch, Green Chutney, Chilli Chatka). Average unit price: ₹26.67/100g.\n\nBoth available with 10-15 min delivery on Blinkit & Zepto!",
				time: getTime(),
				actionUrl: `/search?q=Chips`,
				actionLabel: 'Compare All Chips & Namkeen →',
				suggestions: ['Cheapest chips packet', 'Drinks under ₹50', 'Too Yumm! Karare']
			});
			return;
		}

		// 5. Electronics (preserve existing capability)
		if (q.includes('laptop') || q.includes('macbook') || q.includes('iphone') || q.includes('samsung') || q.includes('sony')) {
			const matched = products.find(p => p.title.toLowerCase().includes(q.includes('macbook') ? 'macbook' : (q.includes('iphone') ? 'iphone' : (q.includes('sony') ? 'sony' : 'samsung')))) || products[0];
			const lowest = getLowestStorePrice(matched);

			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `💻 Recommended pick: **${matched.title}** is currently at **${formatPrice(lowest?.price ?? 0)}** on ${lowest?.store}. Verified against 90-day price trends.`,
				time: getTime(),
				actionUrl: `/product/${matched.id}`,
				actionLabel: `View ${matched.brand} Comparison →`,
				suggestions: ['Check Fake Discount Shield', 'Compare Laptops', 'Chips & Beverages']
			});
			return;
		}

		// 6. Generic search across 415 products
		const keywords = q.split(/\s+/).filter(w => w.length > 2);
		const matches = products.filter(p => {
			const titleLower = p.title.toLowerCase();
			return keywords.some(k => titleLower.includes(k));
		});

		if (matches.length > 0) {
			const topItem = matches[0];
			const lowest = getLowestStorePrice(topItem);
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `🔎 Found **${matches.length}** item(s) matching your request! Top pick: **${topItem.title}** starting at **${formatPrice(lowest?.price ?? 0)}** on ${lowest?.store}.`,
				time: getTime(),
				actionUrl: `/product/${topItem.id}`,
				actionLabel: `Inspect ${topItem.brand} Deal →`,
				suggestions: ['Find cheapest chips packet', 'Drinks under ₹50', 'Explore all categories']
			});
			return;
		}

		// Fallback
		messages.push({
			id: 'b_' + Date.now(),
			sender: 'bot',
			text: "🤖 SalesPoint indexes 400+ live products across Amazon, Flipkart, Blinkit, Zepto, and Croma! Ask me for cheapest chips, drink comparisons under ₹50, or electronic gadgets.",
			time: getTime(),
			actionUrl: `/search?q=${encodeURIComponent(userQuery)}`,
			actionLabel: `Search "${userQuery}" in Catalogue`,
			suggestions: ['Cheapest chips packet', 'Drinks under ₹50', 'Compare 250ml vs 750ml Coke']
		});
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleUserSubmit();
		}
	}
</script>

<!-- Floating Toggle Button -->
<div class="fixed bottom-6 right-6 z-50">
	<button
		onclick={() => {
			isOpen = !isOpen;
			if (isOpen) scrollToBottom();
		}}
		class="group flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-indigo-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
		aria-label="Open SalesPoint Shopping Assistant"
	>
		<div class="relative">
			<span class="text-2xl animate-bounce">🤖</span>
			<span class="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full ring-2 ring-white"></span>
		</div>
		<span class="font-bold text-sm hidden sm:inline tracking-wide">
			{isOpen ? 'Close Assistant' : 'SalesPoint AI'}
		</span>
	</button>
</div>

<!-- Chatbot Window -->
{#if isOpen}
	<div
		class="fixed bottom-22 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[590px] max-h-[82vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-border/80 dark:border-slate-700 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
	>
		<!-- Header -->
		<div class="bg-gradient-to-r from-primary to-primary-dark p-4 text-white flex items-center justify-between shadow-md">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
					🤖
				</div>
				<div>
					<h3 class="font-extrabold text-sm tracking-wide flex items-center gap-1.5">
						SalesPoint AI Assistant
						<span class="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">LIVE</span>
					</h3>
					<p class="text-xs text-white/80 flex items-center gap-1">
						<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
						Comparing 400+ Products across 8 Stores
					</p>
				</div>
			</div>
			<button
				onclick={() => isOpen = false}
				class="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
				aria-label="Close Assistant"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Messages Container -->
		<div bind:this={messagesContainer} class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 dark:bg-slate-900/60">
			{#each messages as msg (msg.id)}
				<div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
					<div
						class="max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs transition-all {msg.sender === 'user'
							? 'bg-primary text-white rounded-br-xs'
							: 'bg-white dark:bg-slate-800 text-text-primary dark:text-slate-100 border border-border/80 dark:border-slate-700 rounded-bl-xs'}"
					>
						<p class="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

						{#if msg.actionUrl}
							<div class="mt-2.5 pt-2 border-t {msg.sender === 'user' ? 'border-white/20' : 'border-slate-100 dark:border-slate-700'}">
								<a
									href={msg.actionUrl}
									onclick={() => isOpen = false}
									class="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-indigo-300 bg-primary/10 dark:bg-indigo-950/60 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
								>
									{msg.actionLabel ?? 'Check Deal →'}
								</a>
							</div>
						{/if}
					</div>
					<span class="text-[10px] text-text-secondary dark:text-slate-400 mt-1 px-1">{msg.time}</span>

					<!-- Suggestion Pills -->
					{#if msg.suggestions && msg.suggestions.length > 0}
						<div class="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
							{#each msg.suggestions as chip}
								<button
									onclick={() => handleUserSubmit(chip)}
									class="text-xs bg-white dark:bg-slate-800 hover:bg-primary/5 dark:hover:bg-slate-700 text-primary dark:text-indigo-400 border border-primary/25 dark:border-slate-700 hover:border-primary/50 font-bold px-3 py-1 rounded-full shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer text-left"
								>
									{chip}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/each}

			{#if isTyping}
				<div class="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 px-3 py-2 rounded-2xl w-fit">
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></span>
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></span>
				</div>
			{/if}
		</div>

		<!-- Input Area -->
		<div class="p-3 bg-white dark:bg-slate-800 border-t border-border/80 dark:border-slate-700 flex items-center gap-2">
			<input
				type="text"
				bind:value={inputValue}
				onkeydown={handleKeyDown}
				placeholder="Ask for cheapest chips, drinks under ₹50..."
				class="flex-1 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-border/80 dark:border-slate-700 focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-xl px-3.5 py-2.5 outline-none transition-all text-text-primary dark:text-white"
			/>
			<button
				onclick={() => handleUserSubmit()}
				disabled={!inputValue.trim()}
				class="p-2.5 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:hover:bg-primary text-white rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
				aria-label="Send message"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>
		</div>
	</div>
{/if}
