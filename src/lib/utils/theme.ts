// Theme system supporting 'light', 'dark', and 'system'
export type ThemeMode = 'light' | 'dark' | 'system';

export function getStoredTheme(): ThemeMode {
	if (typeof window === 'undefined') return 'system';
	try {
		const val = localStorage.getItem('salespoint_theme') as ThemeMode;
		if (val === 'light' || val === 'dark' || val === 'system') return val;
	} catch {}
	return 'system';
}

export function applyTheme(mode: ThemeMode): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem('salespoint_theme', mode);
	} catch {}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

	if (isDark) {
		document.documentElement.classList.add('dark');
		document.documentElement.style.colorScheme = 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.style.colorScheme = 'light';
	}

	window.dispatchEvent(new CustomEvent('salespoint_theme_change', { detail: { mode, isDark } }));
}

export function initThemeListener(): () => void {
	if (typeof window === 'undefined') return () => {};

	const media = window.matchMedia('(prefers-color-scheme: dark)');
	const handler = () => {
		const current = getStoredTheme();
		if (current === 'system') {
			applyTheme('system');
		}
	};

	media.addEventListener('change', handler);
	return () => media.removeEventListener('change', handler);
}
