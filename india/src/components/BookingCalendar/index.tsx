import { useEffect, useState, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

/** The side-by-side layout's height, used until Calendly reports the real one. */
const INITIAL_HEIGHT = 760;

const BOOKING_URL = 'https://calendly.com/ciyex/ciyex-hims-demo';

/**
 * Embedded booking calendar with no inner scrollbar. Give it at least 1060px or
 * Calendly stacks its two panels vertically, and no card around it: Calendly
 * draws its own. Calendly posts its content
 * height to the host page once it knows the embedding domain, and that height
 * changes as the visitor moves from the date to the time to the form.
 *
 * The address is in the built HTML, so the calendar never waits on the site's JavaScript.
 */
export default function BookingCalendar(): ReactNode {
	const { siteConfig: { url } } = useDocusaurusContext();
	const [height, setHeight] = useState(INITIAL_HEIGHT);
	const src = `${BOOKING_URL}?hide_gdpr_banner=1&background_color=ffffff&embed_type=Inline&embed_domain=${new URL(url).hostname}`;

	useEffect(() => {
		const onMessage = (event: MessageEvent) => {
			if (event.origin !== 'https://calendly.com' || event.data?.event !== 'calendly.page_height') return;
			const next = parseInt(event.data.payload?.height, 10);
			if (next > 0) setHeight(next);
		};
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, []);

	return (
		<>
			<div className={styles.calendar}>
				<p className={styles.loading}>Loading the calendar…</p>
				<iframe
					className={styles.frame}
					src={src}
					style={{ height }}
					scrolling="no"
					title="Book a demo"
				/>
			</div>
			<p className={styles.fallback}>
				Calendar not showing? <a href={BOOKING_URL} target="_blank" rel="noreferrer">Open it on Calendly</a>
			</p>
		</>
	);
}
