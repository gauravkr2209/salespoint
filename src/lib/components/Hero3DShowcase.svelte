<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { isWebGLAvailable, prefersReducedMotion } from '$lib/three/webglDetect';
	import { formatPrice } from '$lib/utils/formatPrice';

	interface ShowcaseModel {
		id: 'soda' | 'phone' | 'chips' | 'headphones';
		name: string;
		brand: string;
		category: string;
		emoji: string;
		store: string;
		storeLogo: string;
		storeBadgeColor: string;
		price: number;
		mrp: number;
		savingsPercent: number;
		linkUrl: string;
		delivery: string;
		unitPrice: string;
		highlight: string;
	}

	const showcaseItems: ShowcaseModel[] = [
		{
			id: 'soda',
			name: 'Coca-Cola Original 750ml PET',
			brand: 'Coca-Cola',
			category: 'Soft Drinks & Sodas',
			emoji: '🥤',
			store: 'Blinkit',
			storeLogo: '⚡',
			storeBadgeColor: 'bg-amber-400 text-slate-950',
			price: 40,
			mrp: 45,
			savingsPercent: 11,
			linkUrl: '/search?category=Soft%20Drinks%20%26%20Sodas',
			delivery: '10-Min Instant Delivery',
			unitPrice: '₹53.33 / Litre (vs ₹140/L on 250ml cans)',
			highlight: 'Saves 61% per litre compared to single cans across quick-commerce stores.'
		},
		{
			id: 'phone',
			name: 'Samsung Galaxy S24 Ultra 5G',
			brand: 'Samsung',
			category: 'Smartphones',
			emoji: '📱',
			store: 'Amazon',
			storeLogo: '🛒',
			storeBadgeColor: 'bg-orange-500 text-white',
			price: 123100,
			mrp: 144999,
			savingsPercent: 15,
			linkUrl: '/product/prod-001',
			delivery: 'Prime Guaranteed Free Delivery',
			unitPrice: 'All-Time Low in 90 Days',
			highlight: 'Verified lowest offer across Amazon, Flipkart, and Croma with fake discount protection.'
		},
		{
			id: 'chips',
			name: "Lay's India's Magic Masala 115g",
			brand: "Lay's",
			category: 'Chips & Crisps',
			emoji: '🥔',
			store: 'Zepto',
			storeLogo: '⚡',
			storeBadgeColor: 'bg-purple-600 text-white',
			price: 50,
			mrp: 60,
			savingsPercent: 17,
			linkUrl: '/search?category=Chips',
			delivery: '10-15 Min Delivery',
			unitPrice: '₹43.48 / 100g Party Pack Value',
			highlight: 'Family pack saves over 40% per 100g compared to standard convenience packets.'
		},
		{
			id: 'headphones',
			name: 'Sony WH-1000XM5 Wireless ANC',
			brand: 'Sony',
			category: 'Headphones',
			emoji: '🎧',
			store: 'Croma',
			storeLogo: '🔌',
			storeBadgeColor: 'bg-emerald-600 text-white',
			price: 24990,
			mrp: 34990,
			savingsPercent: 29,
			linkUrl: '/search?category=Headphones',
			delivery: 'Official Warranty & Fast Dispatch',
			unitPrice: 'Save ₹10,000 off official MRP',
			highlight: 'Audited against 90-day price trends with lowest verified price alert badge.'
		}
	];

	let selectedIndex = $state(0);
	let currentItem = $derived(showcaseItems[selectedIndex]);

	let canvasContainerEl: HTMLDivElement | undefined = $state();
	let canvasEl: HTMLCanvasElement | undefined = $state();
	let isSupported = $state(true);
	let isReducedMotion = $state(false);
	let isPaused = $state(false);
	let isDragging = $state(false);
	let autoRotate = $state(true);

	// Three.js internal references
	let renderer: THREE.WebGLRenderer | null = null;
	let scene: THREE.Scene | null = null;
	let camera: THREE.PerspectiveCamera | null = null;
	let animFrameId: number | null = null;
	let modelGroup: THREE.Group | null = null;
	let particlesGroup: THREE.Points | null = null;
	let pedestalRings: THREE.Group | null = null;
	let activeMesh: THREE.Object3D | null = null;

	let targetRotY = 0;
	let curRotY = 0;
	let targetRotX = 0;
	let curRotX = 0;
	let prevPointerX = 0;
	let prevPointerY = 0;

	onMount(() => {
		isSupported = isWebGLAvailable();
		isReducedMotion = prefersReducedMotion();

		if (!isSupported || isReducedMotion || !canvasEl || !canvasContainerEl) {
			return;
		}

		initThree();

		// Intersection Observer to pause rendering when offscreen
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					isPaused = !entry.isIntersecting;
					if (!isPaused && !animFrameId) {
						renderLoop();
					}
				}
			},
			{ threshold: 0.1 }
		);

		if (canvasContainerEl) observer.observe(canvasContainerEl);

		// ResizeObserver on the actual canvas container for pixel-perfect responsiveness
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				if (width > 0 && height > 0 && camera && renderer) {
					camera.aspect = width / height;
					camera.updateProjectionMatrix();
					renderer.setSize(width, height, false);
				}
			}
		});

		if (canvasContainerEl) resizeObserver.observe(canvasContainerEl);

		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
			if (animFrameId) cancelAnimationFrame(animFrameId);
			if (renderer) renderer.dispose();
		};
	});

	function initThree() {
		if (!canvasEl || !canvasContainerEl) return;

		const width = canvasContainerEl.clientWidth || 600;
		const height = canvasContainerEl.clientHeight || 420;

		// 1. Scene
		scene = new THREE.Scene();

		// 2. Camera
		camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
		camera.position.set(0, 0.35, 3.8);

		// 3. Renderer with antialias and alpha
		renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
		renderer.setSize(width, height, false);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// 4. Vibrant Studio Lighting
		// Sky / ground hemisphere light ensures beautiful non-black ambient fill
		const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e1b4b, 1.8);
		scene.add(hemiLight);

		// Main key light (crisp white)
		const mainKey = new THREE.DirectionalLight(0xffffff, 2.4);
		mainKey.position.set(4, 5, 4);
		scene.add(mainKey);

		// Vibrant purple/indigo rim light
		const purpleRim = new THREE.DirectionalLight(0xa855f7, 2.2);
		purpleRim.position.set(-4, -2, -3);
		scene.add(purpleRim);

		// Cyan accent point light
		const cyanPoint = new THREE.PointLight(0x06b6d4, 2.0, 10);
		cyanPoint.position.set(-2, 3, 2);
		scene.add(cyanPoint);

		// Warm amber fill
		const amberPoint = new THREE.PointLight(0xf59e0b, 1.6, 8);
		amberPoint.position.set(2, -2, 2);
		scene.add(amberPoint);

		// 5. Starfield Particle Dust
		const particleCount = 140;
		const particleGeo = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount * 3; i += 3) {
			positions[i] = (Math.random() - 0.5) * 7;
			positions[i + 1] = (Math.random() - 0.5) * 5;
			positions[i + 2] = (Math.random() - 0.5) * 5;
		}

		particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const particleMat = new THREE.PointsMaterial({
			color: 0x818cf8,
			size: 0.038,
			transparent: true,
			opacity: 0.65,
			blending: THREE.AdditiveBlending
		});
		particlesGroup = new THREE.Points(particleGeo, particleMat);
		scene.add(particlesGroup);

		// 6. Holographic Glowing Pedestal
		pedestalRings = new THREE.Group();
		pedestalRings.position.y = -1.1;

		// Outer cyan ring
		const outerRingGeo = new THREE.RingGeometry(1.05, 1.25, 48);
		const outerRingMat = new THREE.MeshBasicMaterial({
			color: 0x38bdf8,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.4,
			wireframe: true
		});
		const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
		outerRing.rotation.x = Math.PI / 2;

		// Inner purple ring
		const innerRingGeo = new THREE.RingGeometry(0.65, 0.85, 36);
		const innerRingMat = new THREE.MeshBasicMaterial({
			color: 0x818cf8,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.5,
			wireframe: true
		});
		const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
		innerRing.rotation.x = Math.PI / 2;

		// Glowing center disc
		const discGeo = new THREE.CircleGeometry(0.5, 32);
		const discMat = new THREE.MeshBasicMaterial({
			color: 0x4f46e5,
			transparent: true,
			opacity: 0.25
		});
		const disc = new THREE.Mesh(discGeo, discMat);
		disc.rotation.x = -Math.PI / 2;

		pedestalRings.add(outerRing, innerRing, disc);
		scene.add(pedestalRings);

		// 7. Interactive Model Container
		modelGroup = new THREE.Group();
		modelGroup.position.y = -0.05;
		scene.add(modelGroup);

		buildModel(showcaseItems[0].id);

		renderLoop();
	}

	function buildModel(type: ShowcaseModel['id']) {
		if (!modelGroup) return;

		if (activeMesh) {
			modelGroup.remove(activeMesh);
			activeMesh = null;
		}

		const group = new THREE.Group();

		if (type === 'soda') {
			// Procedural metallic soda can with vibrant color
			const canBodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.55, 36);
			const canBodyMat = new THREE.MeshStandardMaterial({
				color: 0xdc2626, // Bright vibrant red
				metalness: 0.45,
				roughness: 0.25,
				emissive: 0x3b0707
			});
			const canBody = new THREE.Mesh(canBodyGeo, canBodyMat);

			// Top & bottom silver rims
			const rimGeo = new THREE.TorusGeometry(0.55, 0.035, 16, 36);
			const rimMat = new THREE.MeshStandardMaterial({
				color: 0xe2e8f0,
				metalness: 0.7,
				roughness: 0.2
			});
			const topRim = new THREE.Mesh(rimGeo, rimMat);
			topRim.rotation.x = Math.PI / 2;
			topRim.position.y = 0.775;

			const botRim = new THREE.Mesh(rimGeo, rimMat);
			botRim.rotation.x = Math.PI / 2;
			botRim.position.y = -0.775;

			// Top silver lid
			const topLidGeo = new THREE.CircleGeometry(0.53, 36);
			const topLidMat = new THREE.MeshStandardMaterial({
				color: 0xcbd5e1,
				metalness: 0.6,
				roughness: 0.2
			});
			const topLid = new THREE.Mesh(topLidGeo, topLidMat);
			topLid.rotation.x = -Math.PI / 2;
			topLid.position.y = 0.78;

			// Pull tab
			const tabGeo = new THREE.BoxGeometry(0.18, 0.02, 0.32);
			const tabMat = new THREE.MeshStandardMaterial({
				color: 0x94a3b8,
				metalness: 0.8,
				roughness: 0.2
			});
			const tab = new THREE.Mesh(tabGeo, tabMat);
			tab.position.set(0, 0.79, 0.12);

			// Glowing ribbon band
			const bandGeo = new THREE.CylinderGeometry(0.555, 0.555, 0.35, 36);
			const bandMat = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: 0.85
			});
			const band = new THREE.Mesh(bandGeo, bandMat);
			band.position.y = 0.05;

			group.add(canBody, topRim, botRim, topLid, tab, band);
		} else if (type === 'phone') {
			// Procedural titanium smartphone
			const bodyGeo = new THREE.BoxGeometry(1.05, 1.95, 0.09);
			const bodyMat = new THREE.MeshStandardMaterial({
				color: 0x1e293b,
				metalness: 0.65,
				roughness: 0.3
			});
			const body = new THREE.Mesh(bodyGeo, bodyMat);

			// Glowing AMOLED Display Screen
			const screenGeo = new THREE.PlaneGeometry(0.98, 1.86);
			const screenMat = new THREE.MeshBasicMaterial({
				color: 0x312e81 // Deep glowing violet wallpaper
			});
			const screen = new THREE.Mesh(screenGeo, screenMat);
			screen.position.z = 0.046;

			// Screen glow gradient strip
			const glowLineGeo = new THREE.PlaneGeometry(0.85, 0.08);
			const glowLineMat = new THREE.MeshBasicMaterial({
				color: 0x38bdf8
			});
			const glowLine = new THREE.Mesh(glowLineGeo, glowLineMat);
			glowLine.position.set(0, 0.3, 0.048);

			// Camera bump on back
			const bumpGeo = new THREE.BoxGeometry(0.42, 0.85, 0.04);
			const bumpMat = new THREE.MeshStandardMaterial({
				color: 0x0f172a,
				metalness: 0.7,
				roughness: 0.3
			});
			const bump = new THREE.Mesh(bumpGeo, bumpMat);
			bump.position.set(-0.25, 0.45, -0.06);

			// 3 Camera Lenses with glowing blue optics
			for (let i = 0; i < 3; i++) {
				const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20);
				const lensMat = new THREE.MeshStandardMaterial({
					color: 0x0284c7,
					metalness: 0.85,
					roughness: 0.1
				});
				const lens = new THREE.Mesh(lensGeo, lensMat);
				lens.rotation.x = Math.PI / 2;
				lens.position.set(-0.25, 0.72 - i * 0.26, -0.08);
				group.add(lens);
			}

			group.add(body, screen, glowLine, bump);
		} else if (type === 'chips') {
			// Procedural snack foil bag with crisp foil reflections
			const bagGeo = new THREE.BoxGeometry(1.2, 1.65, 0.45);
			const bagMat = new THREE.MeshStandardMaterial({
				color: 0x2563eb, // Lay's Magic Masala Blue
				metalness: 0.4,
				roughness: 0.3,
				emissive: 0x0f172a
			});
			const bag = new THREE.Mesh(bagGeo, bagMat);

			// Metallic gold crimp seals
			const crimpTopGeo = new THREE.BoxGeometry(1.26, 0.12, 0.06);
			const crimpMat = new THREE.MeshStandardMaterial({
				color: 0xf59e0b,
				metalness: 0.7,
				roughness: 0.25
			});
			const crimpTop = new THREE.Mesh(crimpTopGeo, crimpMat);
			crimpTop.position.y = 0.86;

			const crimpBot = crimpTop.clone();
			crimpBot.position.y = -0.86;

			// Center spice badge accent
			const badgeGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.05, 24);
			const badgeMat = new THREE.MeshBasicMaterial({
				color: 0xfbbf24
			});
			const badge = new THREE.Mesh(badgeGeo, badgeMat);
			badge.rotation.x = Math.PI / 2;
			badge.position.z = 0.23;

			group.add(bag, crimpTop, crimpBot, badge);
		} else if (type === 'headphones') {
			// Procedural ANC Headphones
			const arcGeo = new THREE.TorusGeometry(0.85, 0.065, 16, 40, Math.PI);
			const arcMat = new THREE.MeshStandardMaterial({
				color: 0x334155,
				metalness: 0.5,
				roughness: 0.3
			});
			const arc = new THREE.Mesh(arcGeo, arcMat);
			arc.position.y = 0.1;

			// Earcups
			const cupGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 28);
			const cupMat = new THREE.MeshStandardMaterial({
				color: 0x0f172a,
				metalness: 0.6,
				roughness: 0.25
			});
			const leftCup = new THREE.Mesh(cupGeo, cupMat);
			leftCup.rotation.z = Math.PI / 2;
			leftCup.position.set(-0.85, 0.1, 0);

			const rightCup = leftCup.clone();
			rightCup.position.set(0.85, 0.1, 0);

			// Glowing RGB neon ring around right earcup
			const glowRingGeo = new THREE.TorusGeometry(0.37, 0.015, 16, 28);
			const glowRingMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
			const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
			glowRing.rotation.y = Math.PI / 2;
			glowRing.position.set(0.98, 0.1, 0);

			group.add(arc, leftCup, rightCup, glowRing);
		}

		activeMesh = group;
		modelGroup.add(activeMesh);
	}

	function renderLoop() {
		if (isPaused) return;

		if (autoRotate && !isDragging) {
			targetRotY += 0.009;
		}

		curRotY += (targetRotY - curRotY) * 0.08;
		curRotX += (targetRotX - curRotX) * 0.08;

		if (modelGroup) {
			modelGroup.rotation.y = curRotY;
			modelGroup.rotation.x = curRotX;
			// Floating levitation oscillation
			modelGroup.position.y = Math.sin(Date.now() * 0.002) * 0.09;
		}

		if (pedestalRings) {
			pedestalRings.rotation.y += 0.005;
		}

		if (particlesGroup) {
			particlesGroup.rotation.y += 0.001;
		}

		if (renderer && scene && camera) {
			renderer.render(scene, camera);
		}

		animFrameId = requestAnimationFrame(renderLoop);
	}

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		prevPointerX = e.clientX;
		prevPointerY = e.clientY;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) {
			if (canvasContainerEl) {
				const rect = canvasContainerEl.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width - 0.5;
				const y = (e.clientY - rect.top) / rect.height - 0.5;
				targetRotX = y * 0.35;
			}
			return;
		}

		const dx = e.clientX - prevPointerX;
		const dy = e.clientY - prevPointerY;

		targetRotY += dx * 0.012;
		targetRotX += dy * 0.012;
		targetRotX = Math.max(-0.55, Math.min(0.55, targetRotX));

		prevPointerX = e.clientX;
		prevPointerY = e.clientY;
	}

	function handlePointerUp() {
		isDragging = false;
	}

	function selectModel(index: number) {
		selectedIndex = index;
		buildModel(showcaseItems[index].id);
	}
</script>

<div class="relative w-full max-w-5xl mx-auto rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-border/80 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-300 my-8">
	<!-- Background glow accents -->
	<div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

	<!-- Stage Header & Category Selector -->
	<div class="relative z-20 px-6 py-5 border-b border-border/80 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/60 dark:bg-slate-950/40 backdrop-blur-md">
		<div>
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-300 border border-primary/20 dark:border-indigo-500/30 text-xs font-black uppercase tracking-wider">
					<span class="flex h-2 w-2 relative">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
					</span>
					Interactive 3D Stage
				</span>
				<span class="text-xs font-semibold text-text-secondary dark:text-slate-400 hidden sm:inline">
					Drag to inspect 360°
				</span>
			</div>
			<h3 class="text-lg sm:text-xl font-black text-text-primary dark:text-white mt-1.5">
				Real-Time Multi-Store Product Showcase
			</h3>
		</div>

		<!-- Model Selector Pills -->
		<div class="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-border/80 dark:border-slate-700/80 self-stretch md:self-auto overflow-x-auto">
			{#each showcaseItems as item, idx}
				<button
					onclick={() => selectModel(idx)}
					class="px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 {selectedIndex === idx
						? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/30 scale-102'
						: 'text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'}"
				>
					<span>{item.emoji}</span>
					<span>{item.brand}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Main Stage: Split Layout with 3D Canvas + Deal Details Card -->
	<div class="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] lg:min-h-[440px] relative">
		<!-- Verified Deal Details Card -->
		<div class="order-2 lg:order-1 lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-border/80 dark:border-slate-800 z-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
			<div class="space-y-4">
				<div class="flex flex-wrap items-center gap-2">
					<span class="text-xs font-black px-3 py-1 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1.5 {currentItem.storeBadgeColor}">
						<span>{currentItem.storeLogo}</span> Lowest on {currentItem.store}
					</span>
					<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
						{currentItem.delivery}
					</span>
				</div>

				<div>
					<span class="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400">
						{currentItem.category}
					</span>
					<h4 class="text-xl sm:text-2xl font-black text-text-primary dark:text-white mt-1 leading-tight">
						{currentItem.name}
					</h4>
				</div>

				<!-- Pricing & Verified Savings -->
				<div class="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-border/80 dark:border-slate-700/80">
					<div class="flex items-baseline gap-3">
						<span class="text-3xl font-black text-text-primary dark:text-white">
							{formatPrice(currentItem.price)}
						</span>
						<span class="text-sm text-text-secondary dark:text-slate-400 line-through">
							{formatPrice(currentItem.mrp)}
						</span>
						<span class="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
							{currentItem.savingsPercent}% OFF
						</span>
					</div>

					<div class="mt-2 text-xs font-semibold text-text-secondary dark:text-slate-300 flex items-center gap-1.5">
						<span>⚖️</span>
						<span>{currentItem.unitPrice}</span>
					</div>
				</div>

				<p class="text-xs sm:text-sm text-text-secondary dark:text-slate-300 leading-relaxed">
					{currentItem.highlight}
				</p>
			</div>

			<div class="pt-6 mt-4 border-t border-border/60 dark:border-slate-800 flex items-center justify-between">
				<a
					href={currentItem.linkUrl}
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-black shadow-md shadow-primary/20 transition-all hover:gap-3 active:scale-95"
				>
					<span>View Verified Deal</span>
					<span>→</span>
				</a>

				<button
					onclick={() => autoRotate = !autoRotate}
					class="text-xs font-semibold text-text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 cursor-pointer flex items-center gap-1.5"
				>
					<span>{autoRotate ? '⏸️ Pause Orbit' : '▶️ Resume Orbit'}</span>
				</button>
			</div>
		</div>

		<!-- 3D Canvas Column -->
		<div
			bind:this={canvasContainerEl}
			role="region"
			aria-label="3D Product Canvas"
			class="order-1 lg:order-2 lg:col-span-7 relative h-[300px] sm:h-[380px] lg:h-[460px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointerleave={handlePointerUp}
		>
			{#if isSupported && !isReducedMotion}
				<canvas bind:this={canvasEl} class="w-full h-full block"></canvas>
			{:else}
				<div class="flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
					<div class="w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center text-7xl shadow-2xl mb-4 backdrop-blur-md">
						{currentItem.emoji}
					</div>
					<h4 class="text-xl font-black text-text-primary dark:text-white mb-1">{currentItem.name}</h4>
					<p class="text-xs text-text-secondary dark:text-slate-400 max-w-sm">{currentItem.highlight}</p>
				</div>
			{/if}

			<!-- Floating rotation guide pill -->
			<div class="absolute bottom-4 right-4 z-20 pointer-events-none">
				<div class="px-3 py-1 rounded-full bg-slate-900/80 dark:bg-slate-950/80 text-white text-[11px] font-semibold border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5">
					<span class="animate-spin text-xs">🔄</span>
					<span>360° Drag & Hover</span>
				</div>
			</div>
		</div>
	</div>
</div>
