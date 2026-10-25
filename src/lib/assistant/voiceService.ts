/**
 * Browser Web Speech API Service
 * Supports SpeechRecognition (voice input) and SpeechSynthesis (voice response)
 * with robust browser fallbacks, permission handling, and SSR guards.
 */

export interface SpeechRecognitionCallbacks {
	onStart?: () => void;
	onInterim?: (text: string) => void;
	onResult?: (text: string) => void;
	onError?: (error: string) => void;
	onEnd?: () => void;
}

export interface SpeechSynthesisCallbacks {
	onStart?: () => void;
	onEnd?: () => void;
	onError?: (error: string) => void;
}

class VoiceService {
	private recognition: any = null;
	private isRecognitionActive: boolean = false;
	private currentUtterance: SpeechSynthesisUtterance | null = null;
	private preferredVoice: SpeechSynthesisVoice | null = null;
	private voicesLoaded: boolean = false;

	constructor() {
		if (typeof window !== 'undefined') {
			this.initVoices();
		}
	}

	/** Check if speech recognition is supported in this browser */
	public isRecognitionSupported(): boolean {
		if (typeof window === 'undefined') return false;
		return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
	}

	/** Check if speech synthesis is supported in this browser */
	public isSynthesisSupported(): boolean {
		if (typeof window === 'undefined') return false;
		return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
	}

	/** Initialize synthesis voices */
	private initVoices(): void {
		if (!this.isSynthesisSupported()) return;

		const populateVoices = () => {
			const voices = window.speechSynthesis.getVoices();
			if (voices && voices.length > 0) {
				this.voicesLoaded = true;
				// Prioritize natural English (India, US, UK) voices
				const inVoice = voices.find((v) => v.lang.startsWith('en-IN') && !v.name.includes('Bad'));
				const usVoice = voices.find((v) => v.lang.startsWith('en-US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
				const enVoice = voices.find((v) => v.lang.startsWith('en'));
				this.preferredVoice = inVoice || usVoice || enVoice || voices[0];
			}
		};

		populateVoices();
		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			window.speechSynthesis.onvoiceschanged = populateVoices;
		}
	}

	/** Start listening for user voice input */
	public startListening(callbacks: SpeechRecognitionCallbacks): void {
		if (!this.isRecognitionSupported()) {
			callbacks.onError?.('Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.');
			return;
		}

		if (this.isRecognitionActive) {
			this.stopListening();
		}

		// Also cancel any ongoing speech so assistant doesn't talk over user
		this.stopSpeaking();

		try {
			const SpeechRecognitionClass =
				(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
			this.recognition = new SpeechRecognitionClass();
			this.recognition.continuous = false;
			this.recognition.interimResults = true;
			this.recognition.lang = 'en-IN'; // Default to Indian English for SalesPoint context

			let finalTranscript = '';

			this.recognition.onstart = () => {
				this.isRecognitionActive = true;
				callbacks.onStart?.();
			};

			this.recognition.onresult = (event: any) => {
				let interim = '';
				for (let i = event.resultIndex; i < event.results.length; ++i) {
					const transcriptPart = event.results[i][0].transcript;
					if (event.results[i].isFinal) {
						finalTranscript += transcriptPart;
					} else {
						interim += transcriptPart;
					}
				}

				if (interim) {
					callbacks.onInterim?.(interim);
				}
				if (finalTranscript) {
					callbacks.onResult?.(finalTranscript.trim());
				}
			};

			this.recognition.onerror = (event: any) => {
				this.isRecognitionActive = false;
				let message = 'Speech recognition error';
				switch (event.error) {
					case 'not-allowed':
					case 'permission-denied':
						message = 'Microphone access was denied. Please allow microphone permissions in your browser.';
						break;
					case 'no-speech':
						message = 'No speech was detected. Please try again.';
						break;
					case 'network':
						message = 'Network error during speech recognition.';
						break;
					case 'aborted':
						return; // Ignore manual abort
					default:
						message = `Microphone error: ${event.error}`;
				}
				callbacks.onError?.(message);
			};

			this.recognition.onend = () => {
				this.isRecognitionActive = false;
				callbacks.onEnd?.();
			};

			this.recognition.start();
		} catch (err: any) {
			this.isRecognitionActive = false;
			callbacks.onError?.(err?.message || 'Failed to start speech recognition');
		}
	}

	/** Stop listening for voice input */
	public stopListening(): void {
		if (this.recognition && this.isRecognitionActive) {
			try {
				this.recognition.stop();
			} catch (_) {
				// Ignore
			}
			this.isRecognitionActive = false;
		}
	}

	/** Speak a message aloud using speech synthesis */
	public speak(text: string, callbacks?: SpeechSynthesisCallbacks): void {
		if (!this.isSynthesisSupported()) {
			callbacks?.onError?.('Speech synthesis is not supported on your browser.');
			return;
		}

		// Stop any active utterance first to avoid overlap
		this.stopSpeaking();

		// Clean string of symbols, emojis, and urls
		const clean = text
			.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
			.replace(/[*_#`~[\]]/g, '')
			.replace(/\s+/g, ' ')
			.trim();

		if (!clean) {
			callbacks?.onEnd?.();
			return;
		}

		try {
			const utterance = new SpeechSynthesisUtterance(clean);
			this.currentUtterance = utterance;

			if (this.preferredVoice) {
				utterance.voice = this.preferredVoice;
			}
			utterance.rate = 1.02;
			utterance.pitch = 1.0;
			utterance.lang = 'en-IN';

			utterance.onstart = () => {
				callbacks?.onStart?.();
			};

			utterance.onend = () => {
				this.currentUtterance = null;
				callbacks?.onEnd?.();
			};

			utterance.onerror = (e) => {
				this.currentUtterance = null;
				callbacks?.onError?.(e.error ?? 'Speech synthesis error');
			};

			window.speechSynthesis.speak(utterance);
		} catch (err: any) {
			callbacks?.onError?.(err?.message || 'Failed to speak response');
		}
	}

	/** Stop ongoing speech synthesis immediately */
	public stopSpeaking(): void {
		if (this.isSynthesisSupported()) {
			window.speechSynthesis.cancel();
			this.currentUtterance = null;
		}
	}

	/** Check if speech synthesis is currently active */
	public isSpeaking(): boolean {
		if (!this.isSynthesisSupported()) return false;
		return window.speechSynthesis.speaking;
	}
}

export const voiceService = new VoiceService();
