<script lang="ts">
	let { texts, speed = 80, pause = 2000 }: { texts: string[]; speed?: number; pause?: number } =
		$props();

	let displayText = $state('');
	let currentIndex = $state(0);
	let isDeleting = $state(false);

	$effect(() => {
		if (!texts.length) return;

		const currentFullText = texts[currentIndex % texts.length];
		let timeout: ReturnType<typeof setTimeout>;

		if (!isDeleting) {
			if (displayText.length < currentFullText.length) {
				// Typing
				timeout = setTimeout(() => {
					displayText = currentFullText.slice(0, displayText.length + 1);
				}, speed);
			} else {
				// Pause before deleting
				timeout = setTimeout(() => {
					isDeleting = true;
				}, pause);
			}
		} else {
			if (displayText.length > 0) {
				// Deleting
				timeout = setTimeout(() => {
					displayText = displayText.slice(0, -1);
				}, speed / 2);
			} else {
				// Move to next text
				isDeleting = false;
				currentIndex = (currentIndex + 1) % texts.length;
			}
		}

		return () => clearTimeout(timeout);
	});
</script>

<span class="inline-flex items-center">
	<span>{displayText}</span>
	<span class="ml-0.5 inline-block w-0.5 h-5 bg-primary animate-pulse"></span>
</span>
