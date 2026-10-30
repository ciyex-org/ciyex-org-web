import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BookingCalendar from '@site/src/components/BookingCalendar';
import { CONTACT } from '@site/src/data/contact';
import styles from './contact.module.css';

export default function Contact(): ReactNode {
	return (
		<Layout
			title="Contact Us"
			description="Call (844) 874-2236, email help@ciyex.org or book a consultation about medical billing, dental billing and practice services.">
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.head}>
						<p className={styles.eyebrow}>Contact</p>
						<Heading as="h1" className={styles.title}>Talk to our team.</Heading>
						<p className={styles.lede}>
							Call, email or book a time. Tell us about your practice, your current system and the work you want off your team’s plate.
						</p>
					</header>
					<div className={styles.details}>
						<section>
							<Heading as="h2" className={styles.label}>Call</Heading>
							<a className={styles.phone} href={CONTACT.phoneHref}>{CONTACT.phone}</a>
						</section>
						<section>
							<Heading as="h2" className={styles.label}>Email</Heading>
							<a className={styles.phone} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
						</section>
						<section>
							<Heading as="h2" className={styles.label}>Registered address</Heading>
							<address>{CONTACT.address.join(', ')}</address>
						</section>
					</div>
					<section className={styles.booking} aria-label="Book a consultation">
						<BookingCalendar />
					</section>
					<p className={styles.notice}>Please do not send patient information by email or through this site.</p>
								</div>
			</main>
		</Layout>
	);
}
