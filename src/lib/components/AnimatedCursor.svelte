<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/three/webglDetect';

	let cursorDot: HTMLDivElement | undefined = $state();
	let cursorRing: HTMLDivElement | undefined = $state();

	let mouseX = $state(-100);
	let mouseY = $state(-100);
	let ringX = $state(-100);
	let ringY = $state(-100);

	let isHovered = $state(false);
	let isClicking = $state(false);
	let isVisible = $state(false);
	let isTouchDevice = $state(false);
	let animId: number | null = null;

	onMount(() => {
		// Detect touch-only mobile devices to avoid interfering with mobile touch
		isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
		if (isTouchDevice || prefersReducedMotion()) return;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			if (!isVisible) isVisible = true;

			// Check if hovering interactive element
			const target = e.target as HTMLElement | null;
			if (target) {
				const isInteractive = Boolean(
					target.closest('a, button, input, select, textarea, [role="button"], .interactive-cursor, [data-interactive]')
				);
				isHovered = isInteractive;
			}
		};

		const handleMouseDown = () => {
			isClicking = true;
		};

		const handleMouseUp = () => {
			isClicking = false;
		};

		const handleMouseLeave = () => {
			isVisible = false;
		};

		const handleMouseEnter = () => {
			isVisible = true;
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		// Smooth spring interpolation for outer ring
		const animate = () => {
			const ease = 0.18;
			ringX += (mouseX - ringX) * ease;
			ringY += (mouseY - ringY) * ease;

			animId = requestAnimationFrame(animate);
		};
		animId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
			if (animId) cancelAnimationFrame(animId);
		};
	});
</script>

{#if !isTouchDevice && isVisible}
	<!-- Outer Spring Ring with Fluid Glow -->
	<div
		bind:this={cursorRing}
		style="transform: translate3d({ringX}px, {ringY}px, 0) translate(-50%, -50%) scale({isClicking ? 0.8 : isHovered ? 1.7 : 1});"
		class="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-all duration-150 ease-out will-change-transform {isHovered
			? 'w-10 h-10 bg-primary/15 dark:bg-indigo-400/20 border-2 border-primary/60 dark:border-indigo-400/80 shadow-[0_0_20px_rgba(99,102,241,0.5)] backdrop-blur-[2px]'
			: 'w-8 h-8 border border-primary/40 dark:border-indigo-400/50 bg-primary/5 dark:bg-indigo-500/10'}"
	></div>

	<!-- Inner Precision Dot -->
	<div
		bind:this={cursorDot}
		style="transform: translate3d({mouseX}px, {mouseY}px, 0) translate(-50%, -50%) scale({isClicking ? 1.5 : isHovered ? 0.5 : 1});"
		class="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full w-2 h-2 bg-gradient-to-r from-primary to-purple-500 shadow-md shadow-primary/80 transition-transform duration-75 ease-out will-change-transform"
	></div>
{/if}
