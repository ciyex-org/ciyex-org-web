/**
 * Fade-and-rise sections as they come into view.
 *
 * <p>The page ships fully visible. This module adds `reveal-ready` to the root
 * element, and only that class turns the hiding rule on — so a visitor with no
 * JavaScript, a chunk that failed to load, or a crawler that does not run
 * scripts sees the whole page rather than an empty shell. That is the one thing
 * the sites this borrows from get wrong.
 *
 * <p>Anything already on screen when the page loads is revealed without a
 * transition, because animating the hero on arrival delays the first thing the
 * visitor came to read.
 */

let observer: IntersectionObserver | undefined;

function reveal(el: Element): void {
	el.classList.add('is-revealed');
}

export function onRouteDidUpdate(): void {
	if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
		return;
	}

	// Someone who has asked their system for less motion gets none of this; the
	// stylesheet neutralises the transform, and there is no reason to observe.
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	document.documentElement.classList.add('reveal-ready');

	observer?.disconnect();
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					reveal(entry.target);
					observer?.unobserve(entry.target);
				}
			}
		},
		// A little past the bottom edge, so a section has finished arriving by the
		// time it is being read rather than animating under the reader's eyes.
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
	);

	// forEach rather than for-of: the tsconfig targets a lib without an iterator
	// on NodeList, and a spread would allocate an array for nothing.
	document.querySelectorAll('[data-reveal]').forEach((el) => {
		if (el.getBoundingClientRect().top < window.innerHeight) {
			reveal(el);
		} else {
			observer?.observe(el);
		}
	});
}
