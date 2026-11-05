<script lang="ts">
	import { onMount } from 'svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { generateAssistantResponse } from '$lib/assistant/assistantEngine';
	import { voiceService } from '$lib/assistant/voiceService';
	import type { ChatMessage, ChatProductSummary, VoiceState } from '$lib/assistant/types';

	let isOpen = $state(false);
	let isExpanded = $state(false);
	let inputValue = $state('');
	let isTyping = $state(false);
	let messagesContainer: HTMLDivElement | undefined = $state();
	let inputElement: HTMLInputElement | undefined = $state();

	// Voice states
	let isVoiceSupported = $state(false);
	let isListening = $state(false);
	let isSpeaking = $state(false);
	let activeSpeakingMessageId = $state<string | null>(null);
	let interimTranscript = $state('');
	let voiceError = $state<string | null>(null);
	let autoSpeak = $state(false);

	const initialMessages: ChatMessage[] = [
		{
			id: 'm1',
			sender: 'bot',
			text: "👋 Hi! I'm your **SalesPoint Shopping & Price AI**.\n\nAsk me anything by typing or speaking — find the lowest price chips, compare beverage unit rates (₹/L), or verify laptop & smartphone deals across Amazon, Flipkart, Blinkit & Zepto!",
			time: 'Just now',
			suggestions: [
				'Find the cheapest smartphone',
				'Which chips packet offers better value?',
				'Find drinks under ₹50',
				'Compare beverage prices per litre',
				'Compare two laptops',
				'Explain product price history'
			]
		}
	];

	let messages = $state<ChatMessage[]>(initialMessages);

	onMount(() => {
		isVoiceSupported = voiceService.isRecognitionSupported();

		// Cleanup audio on window unload
		return () => {
			voiceService.stopListening();
			voiceService.stopSpeaking();
		};
	});

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

	function handleUserSubmit(queryText?: string, wasSpoken: boolean = false) {
		const text = (queryText ?? inputValue).trim();
		if (!text) return;

		// Stop any voice activity
		if (isListening) {
			voiceService.stopListening();
			isListening = false;
			interimTranscript = '';
		}
		if (isSpeaking) {
			voiceService.stopSpeaking();
			isSpeaking = false;
			activeSpeakingMessageId = null;
		}

		messages.push({
			id: 'u_' + Date.now(),
			sender: 'user',
			text,
			time: getTime(),
			isVoiceTranscript: wasSpoken
		});

		inputValue = '';
		interimTranscript = '';
		voiceError = null;
		scrollToBottom();
		isTyping = true;

		setTimeout(() => {
			const res = generateAssistantResponse(text);
			const botMsgId = 'b_' + Date.now();

			messages.push({
				id: botMsgId,
				sender: 'bot',
				text: res.text,
				time: getTime(),
				actionUrl: res.actionUrl,
				actionLabel: res.actionLabel,
				suggestions: res.suggestions,
				products: res.products
			});

			isTyping = false;
			scrollToBottom();

			// Auto read-aloud if setting enabled
			if (autoSpeak) {
				speakMessage(botMsgId, res.spokenText || res.text);
			}
		}, 550);
	}

	function toggleVoiceInput() {
		if (isListening) {
			voiceService.stopListening();
			isListening = false;
			interimTranscript = '';
			return;
		}

		voiceError = null;
		interimTranscript = '';

		voiceService.startListening({
			onStart: () => {
				isListening = true;
			},
			onInterim: (text) => {
				interimTranscript = text;
				inputValue = text;
			},
			onResult: (finalText) => {
				isListening = false;
				interimTranscript = '';
				inputValue = finalText;
				// Auto-submit after voice input finishes
				handleUserSubmit(finalText, true);
			},
			onError: (err) => {
				isListening = false;
				voiceError = err;
				interimTranscript = '';
			},
			onEnd: () => {
				isListening = false;
				interimTranscript = '';
			}
		});
	}

	function speakMessage(messageId: string, textToSpeak: string) {
		if (activeSpeakingMessageId === messageId && isSpeaking) {
			voiceService.stopSpeaking();
			isSpeaking = false;
			activeSpeakingMessageId = null;
			return;
		}

		voiceService.speak(textToSpeak, {
			onStart: () => {
				isSpeaking = true;
				activeSpeakingMessageId = messageId;
			},
			onEnd: () => {
				isSpeaking = false;
				activeSpeakingMessageId = null;
			},
			onError: () => {
				isSpeaking = false;
				activeSpeakingMessageId = null;
			}
		});
	}

	function clearConversation() {
		voiceService.stopSpeaking();
		voiceService.stopListening();
		isSpeaking = false;
		isListening = false;
		activeSpeakingMessageId = null;
		messages = [
			{
				id: 'm_' + Date.now(),
				sender: 'bot',
				text: "✨ Conversation cleared! How can I assist your price comparison search today?",
				time: getTime(),
				suggestions: [
					'Find the cheapest smartphone',
					'Which chips packet offers better value?',
					'Find drinks under ₹50',
					'Compare beverage prices per litre'
				]
			}
		];
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleUserSubmit();
		} else if (e.key === 'Escape') {
			if (isOpen) {
				isOpen = false;
			}
		}
	}
</script>

<!-- Floating Toggle Button with Atmospheric Glow -->
<div class="fixed bottom-6 right-6 z-50">
	<button
		onclick={() => {
			isOpen = !isOpen;
			if (isOpen) {
				scrollToBottom();
				setTimeout(() => inputElement?.focus(), 150);
			} else {
				voiceService.stopSpeaking();
				voiceService.stopListening();
				isSpeaking = false;
				isListening = false;
			}
		}}
		class="group relative flex items-center gap-3 bg-gradient-to-r from-[#5A3B8C] via-[#6D47A6] to-[#5A3B8C] hover:from-[#6D47A6] hover:to-[#5A3B8C] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-[#5A3B8C]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#8B7CC7]/40"
		aria-label="Toggle SalesPoint AI Voice Shopping Assistant"
		aria-expanded={isOpen}
	>
		<!-- Animated pulse ring -->
		<span class="absolute -inset-1 rounded-full bg-[#5A3B8C] opacity-40 blur-md group-hover:opacity-75 transition duration-300 animate-pulse"></span>

		<div class="relative flex items-center justify-center">
			<div class="w-7 h-7 rounded-full bg-[#2A1E4D]/80 border border-[#8B7CC7]/40 flex items-center justify-center text-lg backdrop-blur-xs">
				{#if isSpeaking}
					<span class="animate-bounce">🔊</span>
				{:else if isListening}
					<span class="animate-pulse">🎙️</span>
				{:else}
					<span>🤖</span>
				{/if}
			</div>
			<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0E0B1D]"></span>
		</div>
		<div class="hidden sm:flex flex-col text-left">
			<span class="font-extrabold text-xs tracking-wider uppercase leading-none text-white">
				{isOpen ? 'Close AI' : 'Voice Shopping AI'}
			</span>
			<span class="text-[10px] text-[#C9C2E3] font-medium leading-tight mt-0.5">
				{isSpeaking ? 'Reading answer...' : isListening ? 'Listening...' : 'Text & Voice Enabled'}
			</span>
		</div>
	</button>
</div>

<!-- Chatbot Window -->
{#if isOpen}
	<div
		class="fixed bottom-22 right-3 sm:right-6 {isExpanded
			? 'w-[96vw] sm:w-[680px] h-[88vh]'
			: 'w-[92vw] sm:w-[460px] h-[630px] max-h-[82vh]'} bg-[#2A1E4D] backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#3A3A52] flex flex-col z-50 overflow-hidden transition-all duration-300"
		role="dialog"
		aria-label="SalesPoint Shopping Assistant"
	>
		<!-- Header -->
		<div class="bg-[#1A1333] border-b border-[#3A3A52] p-4 text-white flex items-center justify-between shadow-md relative">
			<div class="flex items-center gap-3">
				<div class="relative w-10 h-10 rounded-2xl bg-[#2A1E4D] flex items-center justify-center text-2xl backdrop-blur-sm border border-[#3A3A52] shadow-inner">
					{#if isSpeaking}
						<span class="animate-spin text-xl">✨</span>
					{:else}
						🤖
					{/if}
					{#if isSpeaking}
						<span class="absolute -bottom-1 -right-1 flex h-3 w-3">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
						</span>
					{/if}
				</div>
				<div>
					<h3 class="font-black text-sm tracking-wide flex items-center gap-2 text-white">
						SalesPoint Shopping Assistant
						<span class="text-[9px] bg-[#5A3B8C] text-white border border-[#8B7CC7]/40 font-mono px-2 py-0.5 rounded-full font-bold">3D & VOICE</span>
					</h3>
					<p class="text-[11px] text-[#8E84B0] flex items-center gap-1.5 font-medium">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
						Real-Time Catalogue Intelligence across 8 Stores
					</p>
				</div>
			</div>

			<!-- Header Controls -->
			<div class="flex items-center gap-1">
				<!-- Auto-Speak Voice Toggle -->
				<button
					onclick={() => {
						autoSpeak = !autoSpeak;
						if (!autoSpeak) voiceService.stopSpeaking();
					}}
					class="p-2 rounded-xl text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors cursor-pointer"
					title={autoSpeak ? 'Disable Auto-Speak (Voice Output Active)' : 'Enable Auto-Speak (Reads Answers Aloud)'}
					aria-label={autoSpeak ? 'Mute automatic voice response' : 'Enable automatic voice response'}
				>
					{#if autoSpeak}
						<span class="text-base">🔊</span>
					{:else}
						<span class="text-base opacity-60">🔇</span>
					{/if}
				</button>

				<!-- Clear Chat -->
				<button
					onclick={clearConversation}
					class="p-2 rounded-xl text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors cursor-pointer"
					title="Clear conversation"
					aria-label="Clear chat history"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>

				<!-- Expand / Collapse Window -->
				<button
					onclick={() => isExpanded = !isExpanded}
					class="p-2 rounded-xl text-[#C9C2E3] hover:text-white hover:bg-[#34265E] transition-colors cursor-pointer hidden sm:block"
					title={isExpanded ? 'Collapse size' : 'Expand size'}
					aria-label="Toggle chat window size"
				>
					{#if isExpanded}
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M4 10h6m0 0V4m0 6L3 3m17 7h-6m0 0V4m0 6l7-7" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
						</svg>
					{/if}
				</button>

				<!-- Close Assistant -->
				<button
					onclick={() => {
						isOpen = false;
						voiceService.stopSpeaking();
						voiceService.stopListening();
					}}
					class="text-[#C9C2E3] hover:text-white p-2 rounded-xl hover:bg-[#34265E] transition-colors cursor-pointer"
					aria-label="Close Assistant"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Voice Status Banner (Listening / Error) -->
		{#if isListening}
			<div class="bg-[#5A3B8C] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold animate-pulse border-b border-[#8B7CC7]/40">
				<div class="flex items-center gap-2">
					<span class="flex h-2.5 w-2.5 relative">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
					</span>
					<span>Listening to your voice... Speak your request</span>
				</div>
				<button
					onclick={toggleVoiceInput}
					class="px-2.5 py-1 bg-black/30 hover:bg-black/50 rounded-lg text-[11px] font-bold cursor-pointer"
				>
					Cancel
				</button>
			</div>
		{:else if voiceError}
			<div class="bg-rose-950/60 border-b border-rose-800 text-rose-200 px-4 py-2 text-xs flex items-center justify-between">
				<span class="line-clamp-1">{voiceError}</span>
				<button
					onclick={() => voiceError = null}
					class="text-rose-300 font-bold ml-2 underline text-[11px]"
				>
					Dismiss
				</button>
			</div>
		{/if}

		<!-- Messages Container -->
		<div bind:this={messagesContainer} class="flex-1 p-4 overflow-y-auto space-y-4 bg-[#140E28]">
			{#each messages as msg (msg.id)}
				<div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
					<div
						class="max-w-[90%] rounded-2xl p-4 text-xs sm:text-sm shadow-md transition-all {msg.sender === 'user'
							? 'bg-[#5A3B8C] text-white border border-[#8B7CC7]/40 rounded-br-xs'
							: 'bg-[#221845] text-[#C9C2E3] border border-[#3A3A52] rounded-bl-xs'}"
					>
						{#if msg.isVoiceTranscript}
							<div class="flex items-center gap-1.5 text-[10px] font-bold text-[#8B7CC7] uppercase tracking-wider mb-1">
								<span>🎙️ Voice Input</span>
							</div>
						{/if}

						<div class="whitespace-pre-wrap leading-relaxed space-y-2">
							{msg.text}
						</div>

						<!-- Embedded Rich Product Cards -->
						{#if msg.products && msg.products.length > 0}
							<div class="mt-3 pt-3 border-t border-[#3A3A52] space-y-2">
								<p class="text-[11px] font-bold uppercase tracking-wider text-[#8B7CC7]">
									Verified Catalogue Deals:
								</p>
								<div class="grid grid-cols-1 gap-2">
									{#each msg.products as p}
										<a
											href={p.url}
											onclick={() => isOpen = false}
											class="flex items-center gap-3 p-2.5 rounded-xl bg-[#140E28] border border-[#3A3A52] hover:border-[#8B7CC7] hover:bg-[#2A1E4D] transition-all group"
										>
											<div class="w-12 h-12 bg-[#2A1E4D] rounded-lg p-1 shrink-0 border border-[#3A3A52] flex items-center justify-center overflow-hidden">
												<img src={p.imageUrl} alt={p.title} class="max-w-full max-h-full object-contain" />
											</div>
											<div class="min-w-0 flex-1">
												<h4 class="text-xs font-bold text-white truncate group-hover:text-[#8B7CC7] transition-colors">
													{p.title}
												</h4>
												<div class="flex items-center gap-2 mt-0.5">
													<span class="text-xs font-black text-white">
														{formatPrice(p.lowestPrice)}
													</span>
													{#if p.discountPercent > 0}
														<span class="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 rounded">
															{p.discountPercent}% OFF
														</span>
													{/if}
													<span class="text-[10px] text-[#8E84B0] truncate">
														on {p.lowestStore}
													</span>
												</div>
											</div>
											<span class="text-xs font-bold text-[#8B7CC7] shrink-0">
												View →
											</span>
										</a>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Primary Action Button -->
						{#if msg.actionUrl}
							<div class="mt-3 pt-2.5 border-t {msg.sender === 'user' ? 'border-white/20' : 'border-[#3A3A52]'}">
								<a
									href={msg.actionUrl}
									onclick={() => isOpen = false}
									class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#5A3B8C] hover:bg-[#6D47A6] border border-[#8B7CC7]/40 px-3 py-1.5 rounded-xl transition-colors shadow-xs"
								>
									{msg.actionLabel ?? 'Check Deal →'}
								</a>
							</div>
						{/if}
					</div>

					<!-- Message Footer: Time + Read Aloud Control -->
					<div class="flex items-center gap-2 mt-1 px-1">
						<span class="text-[10px] text-[#8E84B0]">{msg.time}</span>
						{#if msg.sender === 'bot'}
							<button
								onclick={() => speakMessage(msg.id, msg.text)}
								class="text-[11px] flex items-center gap-1 font-semibold text-[#8E84B0] hover:text-[#8B7CC7] cursor-pointer transition-colors"
								title={activeSpeakingMessageId === msg.id && isSpeaking ? 'Stop speaking' : 'Read answer aloud'}
								aria-label={activeSpeakingMessageId === msg.id && isSpeaking ? 'Stop speaking' : 'Read answer aloud'}
							>
								{#if activeSpeakingMessageId === msg.id && isSpeaking}
									<span class="text-[#8B7CC7] font-bold animate-pulse">■ Stop Speech</span>
								{:else}
									<span>🔊 Read Aloud</span>
								{/if}
							</button>
						{/if}
					</div>

					<!-- Suggestion Pills -->
					{#if msg.suggestions && msg.suggestions.length > 0}
						<div class="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
							{#each msg.suggestions as chip}
								<button
									onclick={() => handleUserSubmit(chip)}
									class="text-xs bg-[#1F173C] hover:bg-[#34265E] text-[#C9C2E3] hover:text-white border border-[#3A3A52] hover:border-[#8B7CC7] font-semibold px-3 py-1 rounded-full shadow-xs transition-all duration-150 active:scale-95 cursor-pointer text-left"
								>
									{chip}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/each}

			{#if isTyping}
				<div class="flex items-center gap-2 bg-[#221845] border border-[#3A3A52] px-4 py-2.5 rounded-2xl w-fit shadow-xs">
					<span class="text-xs font-bold text-[#8B7CC7]">Analyzing 400+ SKUs</span>
					<div class="flex items-center gap-1">
						<span class="w-2 h-2 rounded-full bg-[#8B7CC7] animate-bounce"></span>
						<span class="w-2 h-2 rounded-full bg-[#8B7CC7] animate-bounce [animation-delay:0.2s]"></span>
						<span class="w-2 h-2 rounded-full bg-[#8B7CC7] animate-bounce [animation-delay:0.4s]"></span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input Area with Voice & Text Dual Support -->
		<div class="p-3 bg-[#1A1333] border-t border-[#3A3A52]">
			<!-- Interim Voice preview pill if listening -->
			{#if isListening && interimTranscript}
				<div class="mb-2 px-3 py-1.5 bg-[#5A3B8C]/20 border border-[#8B7CC7]/40 rounded-xl text-xs text-[#C9C2E3] italic flex items-center gap-2">
					<span class="animate-pulse">🎙️</span>
					<span class="truncate">"{interimTranscript}"</span>
				</div>
			{/if}

			<div class="flex items-center gap-2">
				<input
					bind:this={inputElement}
					type="text"
					bind:value={inputValue}
					onkeydown={handleKeyDown}
					placeholder={isListening ? 'Listening... Speak now' : 'Ask cheapest chips, drinks under ₹50, compare...'}
					class="flex-1 text-xs sm:text-sm bg-[#140E28] border border-[#3A3A52] focus:border-[#8B7CC7] rounded-xl px-3.5 py-2.5 outline-none transition-all text-white placeholder-[#8E84B0]"
				/>

				<!-- Voice Input Microphone Button -->
				<button
					onclick={toggleVoiceInput}
					class="p-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer shrink-0 border {isListening
						? 'bg-rose-500 hover:bg-rose-600 text-white border-rose-400 animate-pulse'
						: 'bg-[#1F173C] hover:bg-[#34265E] text-[#8B7CC7] hover:text-white border-[#3A3A52]'}"
					title={isListening ? 'Stop listening' : 'Speak your question'}
					aria-label={isListening ? 'Stop listening' : 'Start voice input'}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
					</svg>
				</button>

				<!-- Text Submit Button -->
				<button
					onclick={() => handleUserSubmit()}
					disabled={!inputValue.trim()}
					class="p-2.5 bg-[#5A3B8C] hover:bg-[#6D47A6] disabled:opacity-40 text-white border border-[#8B7CC7]/40 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
					aria-label="Send message"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}
