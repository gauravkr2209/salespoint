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
			text: "👋 Hi there! I'm your CopyWeb Smart Shopping Assistant. Looking for the lowest prices, deal insights, or comparing iPhone vs Samsung?",
			time: 'Just now',
			suggestions: [
				'Find iPhone 16 best price',
				'Which laptop has highest discount?',
				'Best noise cancelling headphones',
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

		// Add user message
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
		if (q.includes('url') || q.includes('trick') || q.includes('link')) {
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: "💡 It's super easy! Just add 'copyweb.com/' before any Amazon, Flipkart, Myntra, or Croma link in your browser bar, or paste the link into the search box. We instantly extract the product & show all competing prices!",
				time: getTime(),
				suggestions: ['Compare iPhone 16', 'Show TV deals', 'Best wireless earbuds']
			});
			return;
		}

		// Laptop query
		if (q.includes('laptop') || q.includes('macbook') || q.includes('gaming')) {
			const laptops = products.filter(p => p.category === 'Laptops');
			const best = laptops[Math.floor(Math.random() * laptops.length)];
			const lowest = getLowestStorePrice(best);
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `💻 Recommended pick: **${best.title}** is currently starting at **${formatPrice(lowest?.price ?? 0)}** on ${lowest?.store}.`,
				time: getTime(),
				actionUrl: `/product/${best.id}`,
				actionLabel: 'View Price History & Stores →',
				suggestions: ['More Laptops', 'Headphones deals', 'Smartphones under ₹50,000']
			});
			return;
		}

		// iPhone / Phone query
		if (q.includes('iphone') || q.includes('samsung') || q.includes('phone') || q.includes('mobile')) {
			const phones = products.filter(p => p.category === 'Smartphones');
			const matched = phones.find(p => p.title.toLowerCase().includes(q.includes('iphone') ? 'iphone' : (q.includes('samsung') ? 'samsung' : 'phone'))) || phones[0];
			const lowest = getLowestStorePrice(matched);

			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `📱 Great choice! The **${matched.title}** has active discounts. Lowest tracked price is **${formatPrice(lowest?.price ?? 0)}** (saved vs MRP ${formatPrice(lowest?.mrp ?? 0)}).`,
				time: getTime(),
				actionUrl: `/product/${matched.id}`,
				actionLabel: 'Compare Stores Now',
				suggestions: ['View Price History Graph', 'Show Galaxy S24 Ultra', 'Smartwatch deals']
			});
			return;
		}

		// Headphones / Audio query
		if (q.includes('headphone') || q.includes('audio') || q.includes('earbud') || q.includes('sony') || q.includes('airpods')) {
			const headphones = products.filter(p => p.category === 'Headphones');
			const top = headphones[0];
			const lowest = getLowestStorePrice(top);
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `🎧 For industry-leading sound and ANC, check out **${top.title}**. It's trending at **${formatPrice(lowest?.price ?? 0)}** across 4 platforms!`,
				time: getTime(),
				actionUrl: `/product/${top.id}`,
				actionLabel: 'Inspect Deal Details',
				suggestions: ['boAt Airdopes price', 'Apple AirPods deals', 'Budget Smartwatches']
			});
			return;
		}

		// General search match across our 150 products
		const keywords = q.split(/\s+/).filter(w => w.length > 2);
		let matches = products.filter(p => {
			const titleLower = p.title.toLowerCase();
			return keywords.some(k => titleLower.includes(k));
		});

		if (matches.length > 0) {
			const topItem = matches[0];
			const lowest = getLowestStorePrice(topItem);
			messages.push({
				id: 'b_' + Date.now(),
				sender: 'bot',
				text: `🔎 Found **${matches.length}** item(s) matching your request! Top pick: **${topItem.title}** at **${formatPrice(lowest?.price ?? 0)}**.`,
				time: getTime(),
				actionUrl: `/product/${topItem.id}`,
				actionLabel: `View ${topItem.brand} Deal`,
				suggestions: ['Show all results in search', 'Check price alerts', 'Trending deals today']
			});
			return;
		}

		// Fallback helpful assistant response
		messages.push({
			id: 'b_' + Date.now(),
			sender: 'bot',
			text: "🤖 I've scanned 150+ live products across Amazon, Flipkart, Myntra, Croma and Ajio! You can type any product name, paste a link, or ask for the biggest discounts.",
			time: getTime(),
			actionUrl: `/search?q=${encodeURIComponent(userQuery)}`,
			actionLabel: `Search "${userQuery}" in Catalog`,
			suggestions: ['Top 10 Deals Today', 'Laptops with 30%+ off', 'Nike shoes price']
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
		aria-label="Open Shopping Assistant"
	>
		<div class="relative">
			<span class="text-2xl animate-bounce">🤖</span>
			<span class="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full ring-2 ring-white"></span>
		</div>
		<span class="font-bold text-sm hidden sm:inline tracking-wide">
			{isOpen ? 'Close Assistant' : 'Ask Shopping AI'}
		</span>
	</button>
</div>

<!-- Chatbot Window -->
{#if isOpen}
	<div
		class="fixed bottom-22 right-4 sm:right-6 w-[92vw] sm:w-[410px] h-[580px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-border/80 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
	>
		<!-- Header -->
		<div class="bg-gradient-to-r from-primary to-primary-dark p-4 text-white flex items-center justify-between shadow-md">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
					🤖
				</div>
				<div>
					<h3 class="font-bold text-sm tracking-wide flex items-center gap-1.5">
						CopyWeb Shopping AI
						<span class="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">LIVE</span>
					</h3>
					<p class="text-xs text-white/80 flex items-center gap-1">
						<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
						Cross-referencing 150+ products
					</p>
				</div>
			</div>
			<button
				onclick={() => isOpen = false}
				class="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
				aria-label="Close Assistant"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Messages Container -->
		<div bind:this={messagesContainer} class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
			{#each messages as msg (msg.id)}
				<div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
					<div
						class="max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all {msg.sender === 'user'
							? 'bg-primary text-white rounded-br-xs'
							: 'bg-white text-text-primary border border-border/60 rounded-bl-xs'}"
					>
						<p class="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

						{#if msg.actionUrl}
							<div class="mt-2.5 pt-2 border-t {msg.sender === 'user' ? 'border-white/20' : 'border-slate-100'}">
								<a
									href={msg.actionUrl}
									onclick={() => isOpen = false}
									class="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
								>
									{msg.actionLabel ?? 'Check Deal →'}
								</a>
							</div>
						{/if}
					</div>
					<span class="text-[10px] text-text-secondary mt-1 px-1">{msg.time}</span>

					<!-- Suggestion Pills -->
					{#if msg.suggestions && msg.suggestions.length > 0}
						<div class="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
							{#each msg.suggestions as chip}
								<button
									onclick={() => handleUserSubmit(chip)}
									class="text-xs bg-white hover:bg-primary/5 text-primary border border-primary/20 hover:border-primary/50 font-medium px-2.5 py-1 rounded-full shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer text-left"
								>
									{chip}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/each}

			{#if isTyping}
				<div class="flex items-center gap-1.5 bg-white border border-border/60 px-3 py-2 rounded-2xl w-fit">
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></span>
					<span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></span>
				</div>
			{/if}
		</div>

		<!-- Input Area -->
		<div class="p-3 bg-white border-t border-border flex items-center gap-2">
			<input
				type="text"
				bind:value={inputValue}
				onkeydown={handleKeyDown}
				placeholder="Ask for deals, products, or paste a link..."
				class="flex-1 text-xs sm:text-sm bg-slate-50 border border-border focus:border-primary focus:bg-white rounded-xl px-3.5 py-2.5 outline-none transition-all"
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
