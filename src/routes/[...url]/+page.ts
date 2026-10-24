import { redirect } from '@sveltejs/kit';
import { findProductByUrl } from '$lib/data/products';

export function load({ params }: { params: { url: string } }) {
	const raw = params.url;
	if (raw) {
		const matched = findProductByUrl(raw);
		if (matched) {
			throw redirect(302, `/product/${matched.id}`);
		}
		throw redirect(302, `/search?q=${encodeURIComponent(raw)}`);
	}
	throw redirect(302, '/');
}
