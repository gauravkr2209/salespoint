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
		email = 'demo@copyweb.com';
		password = 'password123';
	}
</script>

<svelte:head>
	<title>Sign In — CopyWeb Price Tracker</title>
</svelte:head>

<div class="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
	<!-- Animated Background Glows -->
	<div class="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
	<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 2s;"></div>

	<div class="w-full max-w-md relative z-10">
		<!-- Card container -->
		<div class="glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/60">
			<!-- Header -->
			<div class="text-center mb-8">
				<a href="/" class="inline-flex items-center gap-2 mb-4 group">
					<div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
						CW
					</div>
					<span class="text-2xl font-black text-text-primary tracking-tight">
						Copy<span class="text-primary">Web</span>
					</span>
				</a>
				<h2 class="text-2xl font-extrabold text-text-primary">Welcome Back</h2>
				<p class="text-xs text-text-secondary mt-1">
					Track prices, set alerts, and save money across all Indian e-commerce stores.
				</p>
			</div>

			<!-- Quick Demo Account Fill Button -->
			<div class="mb-6 p-3 bg-primary/5 rounded-2xl border border-primary/20 flex items-center justify-between text-xs">
				<span class="text-text-secondary">Want a 1-click test?</span>
				<button
					type="button"
					onclick={fillDemoAccount}
					class="font-bold text-primary hover:underline cursor-pointer"
				>
					Fill Demo Account
				</button>
			</div>

			{#if errorMsg}
				<div class="mb-5 p-3.5 bg-red-50 border border-red-200 text-danger rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
					<span>⚠️</span> {errorMsg}
				</div>
			{/if}

			{#if successMsg}
				<div class="mb-5 p-3.5 bg-green-50 border border-green-200 text-success rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
					<span>✅</span> {successMsg}
				</div>
			{/if}

			<!-- Form -->
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="email" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						required
						bind:value={email}
						placeholder="you@domain.com"
						class="w-full text-sm bg-white/90 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 outline-none transition-all"
					/>
				</div>

				<div>
					<div class="flex items-center justify-between mb-1.5">
						<label for="password" class="block text-xs font-bold text-text-secondary uppercase tracking-wider">
							Password
						</label>
						<a href="#forgot" class="text-xs font-semibold text-primary hover:underline">Forgot?</a>
					</div>
					<input
						id="password"
						type="password"
						required
						bind:value={password}
						placeholder="••••••••"
						class="w-full text-sm bg-white/90 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 outline-none transition-all"
					/>
				</div>

				<div class="pt-2">
					<button
						type="submit"
						disabled={isLoading}
						class="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
					>
						{#if isLoading}
							<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
							Signing In...
						{:else}
							Sign In to CopyWeb
						{/if}
					</button>
				</div>
			</form>

			<!-- Footer -->
			<div class="mt-8 pt-6 border-t border-border/60 text-center">
				<p class="text-xs text-text-secondary">
					Don't have an account yet?
					<a href="/register" class="font-bold text-primary hover:underline ml-1">
						Create free account →
					</a>
				</p>
			</div>
		</div>
	</div>
</div>
