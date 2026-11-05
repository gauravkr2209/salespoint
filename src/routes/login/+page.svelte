<script lang="ts">
	import { authenticateUser } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');
	let successMsg = $state('');
	let isLoading = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMsg = '';
		successMsg = '';
		isLoading = true;

		setTimeout(() => {
			const res = authenticateUser(email, password);
			isLoading = false;
			if (res.success) {
				successMsg = res.message;
				setTimeout(() => goto('/'), 600);
			} else {
				errorMsg = res.message;
			}
		}, 400);
	}

	function fillDemoAccount() {
		email = 'demo@salespoint.in';
		password = 'password123';
	}
</script>

<svelte:head>
	<title>Sign In — SalesPoint Multi-Store Intelligence</title>
</svelte:head>

<div class="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-[#0E0B1D]">
	<!-- Animated Deep Purple Background Glows -->
	<div class="absolute top-1/4 left-1/4 w-80 h-80 bg-[#5A3B8C]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
	<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B7CC7]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 2s;"></div>

	<div class="w-full max-w-md relative z-10">
		<!-- Card container in Deep Purple -->
		<div class="bg-[#2A1E4D] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#3A3A52] backdrop-blur-xl transition-colors">
			<!-- Header -->
			<div class="text-center mb-8">
				<a href="/" class="inline-flex items-center gap-2.5 mb-4 group">
					<div class="w-10 h-10 bg-gradient-to-tr from-[#5A3B8C] to-[#8B7CC7] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#5A3B8C]/40 group-hover:scale-105 transition-transform border border-[#8B7CC7]/40">
						SP
					</div>
					<span class="text-2xl font-black text-white tracking-tight">
						Sales<span class="animated-gradient-text">Point</span>
					</span>
				</a>
				<h2 class="text-2xl font-black text-white">Welcome Back</h2>
				<p class="text-xs text-[#8E84B0] mt-1 font-medium">
					Track snacks, beverages, and electronics across quick commerce and e-commerce stores.
				</p>
			</div>

			<!-- Quick Demo Account Fill Button -->
			<div class="mb-6 p-3 bg-[#140E28] rounded-2xl border border-[#3A3A52] flex items-center justify-between text-xs">
				<span class="text-[#8E84B0]">Want a 1-click test?</span>
				<button
					type="button"
					onclick={fillDemoAccount}
					class="font-bold text-[#8B7CC7] hover:text-white transition-colors cursor-pointer"
				>
					Fill Demo Account
				</button>
			</div>

			{#if errorMsg}
				<div class="mb-5 p-3.5 bg-rose-950/50 border border-rose-800 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
					<span>⚠️</span> {errorMsg}
				</div>
			{/if}

			{#if successMsg}
				<div class="mb-5 p-3.5 bg-emerald-950/50 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
					<span>✅</span> {successMsg}
				</div>
			{/if}

			<!-- Form -->
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="email" class="block text-xs font-bold text-[#8B7CC7] uppercase tracking-wider mb-1.5">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						required
						bind:value={email}
						placeholder="you@domain.com"
						class="w-full text-sm bg-[#140E28] border border-[#3A3A52] text-white focus:border-[#8B7CC7] focus:ring-2 focus:ring-[#5A3B8C]/40 rounded-xl px-4 py-3 outline-none transition-all placeholder-[#8E84B0]"
					/>
				</div>

				<div>
					<div class="flex items-center justify-between mb-1.5">
						<label for="password" class="block text-xs font-bold text-[#8B7CC7] uppercase tracking-wider">
							Password
						</label>
						<a href="#forgot" class="text-xs font-semibold text-[#8B7CC7] hover:text-white transition-colors">Forgot?</a>
					</div>
					<input
						id="password"
						type="password"
						required
						bind:value={password}
						placeholder="••••••••"
						class="w-full text-sm bg-[#140E28] border border-[#3A3A52] text-white focus:border-[#8B7CC7] focus:ring-2 focus:ring-[#5A3B8C]/40 rounded-xl px-4 py-3 outline-none transition-all placeholder-[#8E84B0]"
					/>
				</div>

				<div class="pt-2">
					<button
						type="submit"
						disabled={isLoading}
						class="w-full py-3.5 px-4 bg-[#5A3B8C] hover:bg-[#6D47A6] active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#5A3B8C]/30 border border-[#8B7CC7]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
					>
						{#if isLoading}
							<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
							Signing In...
						{:else}
							Sign In to SalesPoint
						{/if}
					</button>
				</div>
			</form>

			<!-- Footer -->
			<div class="mt-8 pt-6 border-t border-[#3A3A52] text-center">
				<p class="text-xs text-[#8E84B0]">
					Don't have an account yet?
					<a href="/register" class="font-bold text-[#8B7CC7] hover:text-white hover:underline ml-1">
						Create free account →
					</a>
				</p>
			</div>
		</div>
	</div>
</div>
