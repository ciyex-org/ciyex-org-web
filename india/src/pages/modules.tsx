import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { HIMS_MODULE_GROUPS, HIMS_MODULES } from '@site/src/data/himsModules';
import { HimsIcon } from '@site/src/data/himsIcons';
import styles from '@site/src/pages/hims.module.css';

const MODULE_GROUP_IMAGES: Readonly<Record<string, { src: string; alt: string }>> = {
	'front-desk': { src: '/en-in/img/hims/dashboard.webp', alt: 'Ciyex HIMS hospital dashboard' },
	'patient-care': { src: '/en-in/img/hims/patients.webp', alt: 'Ciyex HIMS patient management screen' },
	departments: { src: '/en-in/img/hims/laboratory.webp', alt: 'Ciyex HIMS laboratory workflow screen' },
	records: { src: '/en-in/img/hims/reports.webp', alt: 'Ciyex HIMS reports screen' },
	administration: { src: '/en-in/img/hims/expenses.webp', alt: 'Ciyex HIMS hospital expenses screen' },
	platform: { src: '/en-in/img/hims/dashboard.webp', alt: 'Ciyex HIMS dashboard' },
};

/**
 * The Ciyex HIMS feature catalogue, for India.
 *
 * <p>Grouped the way the hospital sidebar groups it, so a hospital reading this
 * page and a hospital using the product are looking at the same structure.
 * Only modules that ship today are listed — see `src/data/himsModules.ts`.
 */
export default function Modules(): ReactNode {
	return (
		<Layout
			title="Ciyex HIMS Features"
			description="Explore Ciyex HIMS features for registration, appointments, OPD, emergency, wards, nursing, operation theatre, laboratory, radiology, pharmacy, billing, discharge, records and administration.">
			<main className={styles.page}>
				<section className={styles.modulesHero}>
					<div className={styles.modulesHeroInner}>
						<div className={styles.sectionLabel}>Ciyex HIMS features</div>
						<Heading as="h1" className={styles.heroTitle}>
							One HIMS for the<br />
							<span className={styles.heroGradient}>whole hospital journey.</span>
						</Heading>
						<p className={styles.heroSubtitle}>
							From registration and OPD to diagnostics, wards and billing, explore the
							features that bring hospital operations into one system. Configure the setup
							around the departments your hospital runs.
						</p>
						<nav className={styles.jumpNav} aria-label="Jump to feature group">
							{HIMS_MODULE_GROUPS.map((group) => (
								<a key={group.id} className={styles.jumpLink} href={`#${group.id}`}>
									{group.label}
								</a>
							))}
						</nav>
					</div>
				</section>

				<div className={styles.container}>
					{HIMS_MODULE_GROUPS.map((group) => (
						<section key={group.id} id={group.id} className={styles.group}>
							<div className={styles.groupHead} data-reveal>
								<span className={styles.groupIcon}>
									<HimsIcon name={group.icon} size={22} />
								</span>
								<div>
									<Heading as="h2" className={styles.groupTitle}>
										{group.label}
									</Heading>
									<p className={styles.groupBlurb}>{group.blurb}</p>
								</div>
								<img
									className={styles.groupPreview}
									src={MODULE_GROUP_IMAGES[group.id].src}
									alt={MODULE_GROUP_IMAGES[group.id].alt}
									loading="lazy"
								/>
							</div>
							<div className={styles.detailGrid} data-reveal>
								{group.modules.map((module) => (
									<article key={module.code} className={styles.detailCard}>
										<span className={styles.detailIcon}>
											<HimsIcon name={module.icon} size={26} />
										</span>
										<Heading as="h3" className={styles.detailName}>
											{module.name}
										</Heading>
										<p className={styles.detailSummary}>{module.summary}</p>
										<ul className={styles.detailList}>
											{module.points.map((point) => (
												<li key={point}>{point}</li>
											))}
										</ul>
									</article>
								))}
							</div>
						</section>
					))}
				</div>

				<section className={styles.cta}>
					<div className={styles.container}>
						<Heading as="h2" className={styles.ctaTitle}>
							Let’s map the right setup for your hospital.
						</Heading>
						<p className={styles.ctaDesc}>
							Tell us about your departments, facilities and current systems. We’ll walk
							you through the relevant features and discuss a practical implementation plan.
						</p>
						<div className={styles.heroCta}>
							<Link className={styles.btnPrimary} to="/signup">
								Schedule a free demo
							</Link>
							<Link className={styles.btnGhost} to="/">
								Explore Ciyex HIMS
							</Link>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
}
