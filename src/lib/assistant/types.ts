import type { Product, StorePrice } from '$lib/types';

export interface ChatProductSummary {
	id: string;
	title: string;
	brand: string;
	category: string;
	imageUrl: string;
	lowestPrice: number;
	mrp: number;
	discountPercent: number;
	lowestStore: string;
	unitPriceFormatted?: string;
	url: string;
}

export interface ChatMessage {
	id: string;
	sender: 'bot' | 'user';
	text: string;
	time: string;
	actionUrl?: string;
	actionLabel?: string;
	suggestions?: string[];
	products?: ChatProductSummary[];
	status?: 'sending' | 'sent' | 'error';
	isVoiceTranscript?: boolean;
}

export interface AssistantResponse {
	text: string;
	spokenText?: string;
	actionUrl?: string;
	actionLabel?: string;
	suggestions?: string[];
	products?: ChatProductSummary[];
}

export interface VoiceState {
	isSupported: boolean;
	isListening: boolean;
	isSpeaking: boolean;
	currentSpokenMessageId: string | null;
	interimTranscript: string;
	error: string | null;
	autoSpeak: boolean;
}
