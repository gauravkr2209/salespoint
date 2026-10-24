<script lang="ts">
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Legend,
		Filler
	} from 'chart.js';
	import type { StoreName, PriceHistoryEntry } from '$lib/types';
	import { formatPrice } from '$lib/utils/formatPrice';

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Legend,
		Filler
	);

	let { productId }: { productId: string } = $props();

	let activeRange = $state<'30d' | '90d'>('30d');
	let canvasElement: HTMLCanvasElement | undefined = $state();
	let chartInstance: Chart | null = null;

	/** Store-specific chart colors */
	const storeColors: Record<StoreName, { line: string; bg: string }> = {
		Amazon: { line: '#FF9900', bg: 'rgba(255,153,0,0.08)' },
		Flipkart: { line: '#2874F0', bg: 'rgba(40,116,240,0.08)' },
		Myntra: { line: '#FF3F6C', bg: 'rgba(255,63,108,0.08)' },
		Croma: { line: '#00966B', bg: 'rgba(0,150,107,0.08)' },
		Ajio: { line: '#3B3A3C', bg: 'rgba(59,58,60,0.08)' }
	};

	/** Generate mock price history data for the given product */
	function generateMockData(days: number): PriceHistoryEntry[] {
		const stores: StoreName[] = ['Amazon', 'Flipkart', 'Croma'];
		const entries: PriceHistoryEntry[] = [];
		const basePrice = 15000 + Math.abs(hashCode(productId) % 50000);

		for (let d = days; d >= 0; d--) {
			const date = new Date();
			date.setDate(date.getDate() - d);
			const dateStr = date.toISOString().split('T')[0];

			for (const store of stores) {
				const storeOffset = stores.indexOf(store) * 500;
				const noise = Math.sin(d * 0.15 + stores.indexOf(store)) * 2000;
				const spike = d % 30 < 5 ? -1500 : 0; // Sale events
				entries.push({
					date: dateStr,
					price: Math.round(basePrice + storeOffset + noise + spike),
					store
				});
			}
		}
		return entries;
	}

	function hashCode(s: string): number {
		let hash = 0;
		for (let i = 0; i < s.length; i++) {
			const char = s.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}
		return hash;
	}

	function buildChart() {
		if (!canvasElement) return;

		if (chartInstance) {
			chartInstance.destroy();
			chartInstance = null;
		}

		const days = activeRange === '30d' ? 30 : 90;
		const data = generateMockData(days);

		// Group by store
		const stores = [...new Set(data.map((d) => d.store))] as StoreName[];
		const dates = [...new Set(data.map((d) => d.date))];

		// Find overall min/max for annotations
		const allPrices = data.map((d) => d.price);
		const minPrice = Math.min(...allPrices);
		const maxPrice = Math.max(...allPrices);

		const datasets = stores.map((store) => {
			const storePrices = data.filter((d) => d.store === store);
			const colors = storeColors[store] || { line: '#5855E5', bg: 'rgba(88,85,229,0.08)' };

			return {
				label: store,
				data: dates.map((date) => {
					const entry = storePrices.find((d) => d.date === date);
					return entry?.price ?? null;
				}),
				borderColor: colors.line,
				backgroundColor: colors.bg,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: colors.line,
				pointHoverBorderColor: '#fff',
				pointHoverBorderWidth: 2,
				tension: 0.3,
				fill: true
			};
		});

		chartInstance = new Chart(canvasElement, {
			type: 'line',
			data: {
				labels: dates.map((d) => {
					const date = new Date(d);
					return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
				}),
				datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				plugins: {
					legend: {
						display: true,
						position: 'top',
						align: 'end',
						labels: {
							usePointStyle: true,
							pointStyle: 'circle',
							padding: 16,
							font: { size: 12, family: 'Inter, system-ui, sans-serif' },
							color: '#64748B'
						}
					},
					tooltip: {
						backgroundColor: '#1E293B',
						titleColor: '#E2E8F0',
						bodyColor: '#FFFFFF',
						borderColor: '#334155',
						borderWidth: 1,
						cornerRadius: 8,
						padding: 12,
						titleFont: { size: 12 },
						bodyFont: { size: 13, weight: 'bold' },
						usePointStyle: true,
						callbacks: {
							title(items) {
								return items[0]?.label ?? '';
							},
							label(item) {
								return `  ${item.dataset.label}: ${formatPrice(item.parsed.y ?? 0)}`;
							},
							afterBody() {
								return [
									'',
									`Lowest: ${formatPrice(minPrice)}`,
									`Highest: ${formatPrice(maxPrice)}`
								];
							}
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: {
							color: '#94A3B8',
							font: { size: 11 },
							maxTicksLimit: activeRange === '30d' ? 10 : 12
						},
						border: { display: false }
					},
					y: {
						grid: { color: '#F1F5F9' },
						ticks: {
							color: '#94A3B8',
							font: { size: 11 },
							callback: (val) => formatPrice(val as number)
						},
						border: { display: false }
					}
				}
			}
		});
	}

	$effect(() => {
		// Re-run whenever range or canvas changes
		activeRange;
		canvasElement;
		buildChart();

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};
	});
</script>

<div class="bg-surface rounded-xl border border-border overflow-hidden">
	<!-- Header -->
	<div class="flex items-center justify-between px-5 py-4 border-b border-border">
		<h3 class="text-base font-semibold text-text-primary">Price History</h3>
		<div class="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
			<button
				onclick={() => (activeRange = '30d')}
				class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer
					{activeRange === '30d'
					? 'bg-surface text-primary shadow-sm'
					: 'text-text-secondary hover:text-text-primary'}"
			>
				30 Days
			</button>
			<button
				onclick={() => (activeRange = '90d')}
				class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer
					{activeRange === '90d'
					? 'bg-surface text-primary shadow-sm'
					: 'text-text-secondary hover:text-text-primary'}"
			>
				90 Days
			</button>
		</div>
	</div>

	<!-- Chart -->
	<div class="p-5">
		<div class="relative h-72">
			<canvas bind:this={canvasElement}></canvas>
		</div>
	</div>
</div>
