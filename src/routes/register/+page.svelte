<script lang="ts">
	import { registerUser } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');
	let successMsg = $state('');
	let isLoading = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMsg = '';
		successMsg = '';

		if (password.length < 6) {
			errorMsg = 'Password should be at least 6 characters long.';
			return;
		}

		isLoading = true;
		setTimeout(() => {
			const res = registerUser(name, email, password);
			isLoading = false;
			if (res.success) {
				successMsg = res.message;
				setTimeout(() => goto('/'), 600);
			} else {
				errorMsg = res.message;
			}
		}, 400);
	}
</script>

<svelte:head>
	<title>Sign Up — CopyWeb Price Tracker</title>
</svelte:head>

<div class="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
	<!-- Animated Background Glows -->
	<div class="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
	<div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 2s;"></div>

	<div class="w-full max-w-md relative z-10">
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
				<h2 class="text-2xl font-extrabold text-text-primary">Create Your Account</h2>
				<p class="text-xs text-text-secondary mt-1">
					Join thousands of shoppers monitoring 150+ products across 5 platforms with zero markups.
				</p>
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
					<label for="name" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
						Full Name
					</label>
					<input
						id="name"
						type="text"
						required
						bind:value={name}
						placeholder="Jane Doe"
						class="w-full text-sm bg-white/90 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 outline-none transition-all"
					/>
				</div>

				<div>
					<label for="reg-email" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
						Email Address
					</label>
					<input
						id="reg-email"
						type="email"
						required
						bind:value={email}
						placeholder="jane@domain.com"
						class="w-full text-sm bg-white/90 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 outline-none transition-all"
					/>
				</div>

				<div>
					<label for="reg-password" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
						Create Password
					</label>
					<input
						id="reg-password"
						type="password"
						required
						bind:value={password}
						placeholder="At least 6 characters"
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
							Creating Account...
						{:else}
							Start Saving with CopyWeb
						{/if}
					</button>
				</div>
			</form>

			<!-- Footer -->
			<div class="mt-8 pt-6 border-t border-border/60 text-center">
				<p class="text-xs text-text-secondary">
					Already have an account?
					<a href="/login" class="font-bold text-primary hover:underline ml-1">
						Sign In →
					</a>
				</p>
			</div>
		</div>
	</div>
</div>
