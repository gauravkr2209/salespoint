<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { isWebGLAvailable, prefersReducedMotion } from '$lib/three/webglDetect';
	import { getProductImageUrl, getFallbackImage } from '$lib/utils/productImages';
	import type { Product } from '$lib/data/products';

	let { product, isOpen = $bindable(false) }: { product: Product; isOpen: boolean } = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let canvasEl: HTMLCanvasElement | undefined = $state();

	let isSupported = $state(true);
	let isReducedMotion = $state(false);
	let isWireframe = $state(false);
	let isNeonMode = $state(false);
	let zoomLevel = $state(1);

	let renderer: THREE.WebGLRenderer | null = null;
	let scene: THREE.Scene | null = null;
	let camera: THREE.PerspectiveCamera | null = null;
	let modelGroup: THREE.Group | null = null;
	let animFrameId: number | null = null;

	let isDragging = false;
	let prevX = 0;
	let prevY = 0;
	let rotY = 0;
	let rotX = 0;

	onMount(() => {
		isSupported = isWebGLAvailable();
		isReducedMotion = prefersReducedMotion();

		if (isSupported && !isReducedMotion && canvasEl && containerEl) {
			initScene();
		}

		return () => {
			if (animFrameId) cancelAnimationFrame(animFrameId);
			if (renderer) renderer.dispose();
		};
	});

	function initScene() {
		if (!canvasEl || !containerEl) return;

		const width = containerEl.clientWidth || 400;
		const height = containerEl.clientHeight || 400;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
		camera.position.set(0, 0, 4);

		renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			alpha: true,
			antialias: true
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Lighting
		setupLighting();

		// Model Group
		modelGroup = new THREE.Group();
		scene.add(modelGroup);

		buildCategoryModel();

		render();
	}

	function setupLighting() {
		if (!scene) return;
		// Clear existing lights
		const existingLights = scene.children.filter((c) => c instanceof THREE.Light);
		existingLights.forEach((l) => scene?.remove(l));

		if (isNeonMode) {
			const ambient = new THREE.AmbientLight(0x221133, 1.5);
			const cyan = new THREE.DirectionalLight(0x06b6d4, 3);
			cyan.position.set(3, 3, 2);
			const magenta = new THREE.DirectionalLight(0xd946ef, 3);
			magenta.position.set(-3, -2, -2);
			scene.add(ambient, cyan, magenta);
		} else {
			const ambient = new THREE.AmbientLight(0xffffff, 1.8);
			const key = new THREE.DirectionalLight(0xffffff, 2.2);
			key.position.set(4, 5, 4);
			const fill = new THREE.DirectionalLight(0x94a3b8, 1.2);
			fill.position.set(-4, 2, -3);
			scene.add(ambient, key, fill);
		}
	}

	function buildCategoryModel() {
		if (!modelGroup) return;

		// Clear children
		while (modelGroup.children.length > 0) {
			modelGroup.remove(modelGroup.children[0]);
		}

		const cat = product.category.toLowerCase();
		const group = new THREE.Group();

		if (cat.includes('drink') || cat.includes('soda') || cat.includes('juice') || cat.includes('water')) {
			// Beverage Can / Bottle
			const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.6, 32);
			const bodyMat = new THREE.MeshStandardMaterial({
				color: cat.includes('energy') ? 0x0284c7 : cat.includes('juice') ? 0xf97316 : 0xdc2626,
				metalness: 0.8,
				roughness: 0.2,
				wireframe: isWireframe
			});
			const body = new THREE.Mesh(bodyGeo, bodyMat);

			const rimGeo = new THREE.TorusGeometry(0.55, 0.03, 16, 32);
			const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1, wireframe: isWireframe });
			const rimTop = new THREE.Mesh(rimGeo, rimMat);
			rimTop.rotation.x = Math.PI / 2;
			rimTop.position.y = 0.8;

			group.add(body, rimTop);
		} else if (cat.includes('chip') || cat.includes('snack') || cat.includes('namkeen')) {
			// Snack Bag
			const bagGeo = new THREE.BoxGeometry(1.1, 1.6, 0.45);
			const bagMat = new THREE.MeshStandardMaterial({
				color: 0x2563eb,
				metalness: 0.6,
				roughness: 0.35,
				wireframe: isWireframe
			});
			const bag = new THREE.Mesh(bagGeo, bagMat);

			const crimpGeo = new THREE.BoxGeometry(1.18, 0.1, 0.05);
			const crimpMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2, wireframe: isWireframe });
			const crimpTop = new THREE.Mesh(crimpGeo, crimpMat);
			crimpTop.position.y = 0.83;
			const crimpBot = crimpTop.clone();
			crimpBot.position.y = -0.83;

			group.add(bag, crimpTop, crimpBot);
		} else if (cat.includes('laptop')) {
			// Laptop with open lid
			const baseGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
			const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25, wireframe: isWireframe });
			const base = new THREE.Mesh(baseGeo, baseMat);

			const lidGeo = new THREE.BoxGeometry(1.8, 1.2, 0.05);
			const lidMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2, wireframe: isWireframe });
			const lid = new THREE.Mesh(lidGeo, lidMat);
			lid.position.set(0, 0.6, -0.6);
			lid.rotation.x = -Math.PI / 10;

			group.add(base, lid);
		} else if (cat.includes('headphone')) {
			// Headphones
			const arcGeo = new THREE.TorusGeometry(0.85, 0.06, 16, 36, Math.PI);
			const arcMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2, wireframe: isWireframe });
			const arc = new THREE.Mesh(arcGeo, arcMat);

			const cupGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 24);
			const cupMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.3, wireframe: isWireframe });
			const left = new THREE.Mesh(cupGeo, cupMat);
			left.rotation.z = Math.PI / 2;
			left.position.set(-0.85, 0, 0);
			const right = left.clone();
			right.position.set(0.85, 0, 0);

			group.add(arc, left, right);
		} else {
			// Smartphone / Generic gadget
			const phoneGeo = new THREE.BoxGeometry(0.95, 1.85, 0.1);
			const phoneMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.15, wireframe: isWireframe });
			const phone = new THREE.Mesh(phoneGeo, phoneMat);

			const screenGeo = new THREE.PlaneGeometry(0.9, 1.8);
			const screenMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: isWireframe });
			const screen = new THREE.Mesh(screenGeo, screenMat);
			screen.position.z = 0.052;

			group.add(phone, screen);
		}

		modelGroup.add(group);
	}

	function render() {
		if (modelGroup) {
			modelGroup.rotation.y = rotY;
			modelGroup.rotation.x = rotX;
			modelGroup.scale.set(zoomLevel, zoomLevel, zoomLevel);
		}
		if (renderer && scene && camera) {
			renderer.render(scene, camera);
		}
		animFrameId = requestAnimationFrame(render);
	}

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		prevX = e.clientX;
		prevY = e.clientY;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - prevX;
		const dy = e.clientY - prevY;
		rotY += dx * 0.015;
		rotX += dy * 0.015;
		prevX = e.clientX;
		prevY = e.clientY;
	}

	function handlePointerUp() {
		isDragging = false;
	}

	function toggleWireframe() {
		isWireframe = !isWireframe;
		buildCategoryModel();
	}

	function toggleLighting() {
		isNeonMode = !isNeonMode;
		setupLighting();
	}

	function resetView() {
		rotX = 0;
		rotY = 0;
		zoomLevel = 1;
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
		role="dialog"
		aria-modal="true"
		aria-label="3D Dimensional Product Inspection"
	>
		<div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
			<!-- Header -->
			<div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
				<div>
					<div class="flex items-center gap-2">
						<span class="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
							3D Dimensional Inspection
						</span>
						<span class="text-xs text-slate-400">{product.brand}</span>
					</div>
					<h3 class="text-base sm:text-lg font-black text-white mt-1 line-clamp-1">
						{product.title}
					</h3>
				</div>
				<button
					onclick={() => isOpen = false}
					class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
					aria-label="Close 3D inspection modal"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Canvas Container -->
			<div
				bind:this={containerEl}
				role="region"
				aria-label="3D Interactive Product Viewer Canvas"
				class="relative h-[380px] sm:h-[450px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing bg-radial from-slate-850 to-slate-950 select-none"
				onpointerdown={handlePointerDown}
				onpointermove={handlePointerMove}
				onpointerup={handlePointerUp}
				onpointerleave={handlePointerUp}
			>
				{#if isSupported && !isReducedMotion}
					<canvas bind:this={canvasEl} class="w-full h-full block"></canvas>
				{:else}
					<div class="text-center p-6">
						<img
							src={getProductImageUrl(product)}
							alt={product.title}
							class="w-48 h-48 object-contain mx-auto mb-4 drop-shadow-xl"
							onerror={(e) => {
								(e.currentTarget as HTMLImageElement).src = getFallbackImage(product.category);
							}}
						/>
						<p class="text-sm font-bold text-white">Interactive 3D fallback mode</p>
					</div>
				{/if}

				<!-- Floating Controls Bar -->
				<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/80 shadow-xl">
					<button
						onclick={toggleWireframe}
						class="px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer {isWireframe
							? 'bg-indigo-600 text-white border-indigo-400'
							: 'text-slate-300 hover:text-white border-slate-700'}"
					>
						🕸️ Wireframe
					</button>

					<button
						onclick={toggleLighting}
						class="px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer {isNeonMode
							? 'bg-purple-600 text-white border-purple-400'
							: 'text-slate-300 hover:text-white border-slate-700'}"
					>
						💡 {isNeonMode ? 'Neon Light' : 'Studio Light'}
					</button>

					<button
						onclick={() => zoomLevel = Math.min(zoomLevel + 0.15, 1.6)}
						class="px-2 py-1 text-xs font-bold rounded-lg text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
						title="Zoom in"
					>
						🔍+
					</button>

					<button
						onclick={() => zoomLevel = Math.max(zoomLevel - 0.15, 0.6)}
						class="px-2 py-1 text-xs font-bold rounded-lg text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
						title="Zoom out"
					>
						🔍-
					</button>

					<button
						onclick={resetView}
						class="px-2.5 py-1 text-xs font-bold rounded-lg text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
					>
						🔄 Reset
					</button>
				</div>
			</div>

			<!-- Footer -->
			<div class="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between px-6">
				<span>🖱️ Drag to rotate 360° in 3D space</span>
				<span class="text-indigo-400 font-semibold">Verified Product Silhouette</span>
			</div>
		</div>
	</div>
{/if}
