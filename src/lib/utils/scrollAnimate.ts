import { prefersReducedMotion } from '$lib/three/webglDetect';

export interface ScrollFadeOptions {
	threshold?: number;
	delay?: number;
	direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
	once?: boolean;
}

/**
 * Svelte Action to create smooth 3D scroll-fade animations
 * Usage: <div use:scrollFade={{ delay: 100, direction: 'up' }}>
 */
export function scrollFade(node: HTMLElement, options: ScrollFadeOptions = {}) {
	if (typeof window === 'undefined' || prefersReducedMotion()) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		return {
			destroy() {}
		};
	}

	const {
		threshold = 0.12,
		delay = 0,
		direction = 'up',
		once = true
	} = options;

	// Initial hidden state
	node.style.opacity = '0';
	node.style.transition = `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
	node.style.willChange = 'opacity, transform';

	let initialTransform = 'translateY(36px) scale(0.97)';
	if (direction === 'down') initialTransform = 'translateY(-36px) scale(0.97)';
	else if (direction === 'left') initialTransform = 'translateX(40px) scale(0.98)';
	else if (direction === 'right') initialTransform = 'translateX(-40px) scale(0.98)';
	else if (direction === 'scale') initialTransform = 'scale(0.92)';

	node.style.transform = initialTransform;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translate(0, 0) scale(1)';
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.style.opacity = '0';
					node.style.transform = initialTransform;
				}
			}
		},
		{
			threshold,
			rootMargin: '0px 0px -40px 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
