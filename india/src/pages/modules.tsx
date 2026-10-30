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
 * The full Ciyex HIMS module catalogue, for India.
 *
 * <p>Grouped the way the hospital sidebar groups it, so a hospital reading this
 * page and a hospital using the product are looking at the same structure.
 * Only modules that ship today are listed — see `src/data/himsModules.ts`.
 */
export default function Modules(): ReactNode {
	return (
		<Layout
			title="HIMS Modules"
			description="Every Ciyex HIMS module — registration and UHID, appointments and queue, OPD, emergency, IPD and wards, nursing, operation theatre, laboratory, radiology and PACS, pharmacy, stores, blood bank, GST billing, discharge, medical records, accounts, HR and payroll, ambulance and ABDM integration.">
			<main className={styles.page}>
				<section className={styles.modulesHero}>
					<div className={styles.modulesHeroInner}>
						<div className={styles.sectionLabel}>All modules</div>
						<Heading as="h1" className={styles.heroTitle}>
							{HIMS_MODULES.length} modules.<br />
							<span className={styles.heroGradient}>Switch on what you run.</span>
						</Heading>
						<p className={styles.heroSubtitle}>
							Every module below is available today. Your hospital uses only the ones
							it needs, and staff never see the rest. When you need another one, it
							can be switched on straight away.
						</p>
						<nav className={styles.jumpNav} aria-label="Jump to module group">
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
							Not sure which ones you need?
						</Heading>
						<p className={styles.ctaDesc}>
							Most hospitals start with registration, appointments, OPD, pharmacy and
							billing, then add wards, diagnostics and payroll as they go. Tell us how
							your hospital runs and we will map it module by module.
						</p>
						<div className={styles.heroCta}>
							<Link className={styles.btnPrimary} to="/signup">
								Schedule a free demo
							</Link>
							<Link className={styles.btnGhost} to="/">
								Back to Ciyex HIMS
							</Link>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
}
