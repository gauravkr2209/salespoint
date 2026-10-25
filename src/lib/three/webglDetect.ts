/**
 * WebGL and Accessibility Motion Detectors
 */

export function isWebGLAvailable(): boolean {
	if (typeof window === 'undefined') return false;

	try {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		return Boolean(gl && gl instanceof WebGLRenderingContext || (window as any).WebGL2RenderingContext && gl instanceof (window as any).WebGL2RenderingContext);
	} catch (e) {
		return false;
	}
}

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
