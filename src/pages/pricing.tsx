import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { CLOUD_INCLUDED, CLOUD_PRICE_TIERS } from '@site/src/data/cloudPricing';
import styles from './pricing.module.css';

export default function Pricing(): ReactNode {
	return (
		<Layout
			title="Ciyex Cloud Pricing"
			description="Ciyex Cloud fixed monthly pricing by provider range, with managed hosting, encryption, backups and sync.">
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.head}>
						<p className={styles.eyebrow}>Ciyex Cloud</p>
						<Heading as="h1" className={styles.title}>One fixed price for your practice size.</Heading>
						<p className={styles.lede}>
							We host and run the Ciyex EHR for your clinic. Pick your provider range and pay one fixed monthly price.
						</p>
					</header>
					<div className={styles.grid}>
						{CLOUD_PRICE_TIERS.map((tier) => (
							<article key={tier.id} className={styles.card}>
								<Heading as="h2" className={styles.name}>{tier.name}</Heading>
								<p className={styles.providers}>{tier.providers}</p>
								{tier.monthlyPrice === null ? (
									<p className={styles.price}>Talk to us</p>
								) : (
									<p className={styles.price}>
										${tier.monthlyPrice.toLocaleString('en-US')}
										<small> per month</small>
									</p>
								)}
								<Link className={styles.button} to="/contact">Book a consultation</Link>
							</article>
						))}
					</div>
					<section className={styles.included}>
						<Heading as="h2" className={styles.includedTitle}>Included with Ciyex Cloud</Heading>
						<ul>
							{CLOUD_INCLUDED.map((item) => <li key={item}>{item}</li>)}
						</ul>
					</section>
				</div>
			</main>
		</Layout>
	);
}
