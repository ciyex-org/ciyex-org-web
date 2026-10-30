import { useEffect, useState, type ReactNode } from 'react';

import { CONTACT } from '@site/src/data/contact';
import styles from './styles.module.css';

/** Tall enough for the date picker before Calendly reports its real height. */
const INITIAL_HEIGHT = 1100;

/**
 * Embedded booking calendar with no inner scrollbar. Calendly posts its content
 * height to the host page once it knows the embedding domain, and that height
 * changes as the visitor moves from the date to the time to the form.
 */
export default function BookingCalendar(): ReactNode {
	const [src, setSrc] = useState<string>();
	const [height, setHeight] = useState(INITIAL_HEIGHT);

	useEffect(() => {
		setSrc(`${CONTACT.bookingUrl}?hide_gdpr_banner=1&embed_type=Inline&embed_domain=${window.location.hostname}`);

		const onMessage = (event: MessageEvent) => {
			if (event.origin !== 'https://calendly.com' || event.data?.event !== 'calendly.page_height') return;
			const next = parseInt(event.data.payload?.height, 10);
			if (next > 0) setHeight(next);
		};
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, []);

	return (
		<iframe
			className={styles.frame}
			src={src}
			style={{ height }}
			scrolling="no"
			title="Book a consultation"
		/>
	);
}
