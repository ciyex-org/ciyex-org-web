import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { CONTACT } from '@site/src/data/contact';
import { groupOfService, serviceHref, SERVICE_GROUP_ART } from '@site/src/data/services';
import { SERVICE_LANDING } from '@site/src/data/serviceLanding';
import styles from './styles.module.css';

const DEFAULT_PILLS = ['Works with your current system', 'Scope and handoffs agreed upfront', 'BAA before PHI access'];

export default function ServiceLanding({ service }: { service: string }): ReactNode {
	const page = SERVICE_LANDING[service];
	const group = groupOfService(service);
	const art = group ? SERVICE_GROUP_ART[group.id] : undefined;
	const related = group?.live.filter((other) => other.slug !== service).slice(0, 3) ?? [];

	return (
		<Layout title={page.title} description={page.description}>
			<main className={styles.page}>
				<header className={styles.hero}>
					<div className={`${styles.container} ${styles.heroGrid}`}>
						<div className={styles.heroCopy}>
							<nav className={styles.breadcrumb} aria-label="Breadcrumb">
								<Link to="/services">Services</Link>
								<span aria-hidden="true">/</span>
								<Link to={`/services#${group?.id}`}>{group?.label}</Link>
							</nav>
							<p className={styles.eyebrow}>{page.eyebrow}</p>
							<Heading as="h1" className={styles.heroTitle}>{page.heading}</Heading>
							<p className={styles.lede}>{page.lede}</p>
							<div className={styles.heroActions}>
								<Link className={styles.primaryButton} to="/contact">Book a consultation</Link>
								<Link className={styles.secondaryButton} to="/services">Explore all services</Link>
							</div>
							<div className={styles.trustPills}>
								{(page.pills ?? DEFAULT_PILLS).map((pill) => <span key={pill}>{pill}</span>)}
								</div>
						</div>
						{page.image || art ? (
							<div className={styles.heroMedia}>
								<img src={page.image ?? art?.src} alt={page.imageAlt ?? art?.alt ?? ''} />
							</div>
						) : (
							<aside className={styles.heroPanel} aria-label="What this service covers">
								<p className={styles.heroPanelLabel}>What this covers</p>
								<ol>
									{page.sections.map((section) => (
										<li key={section.title}>
											<strong>{section.title}</strong>
											<span>{section.items[0]}</span>
										</li>
									))}
								</ol>
							</aside>
						)}
					</div>
				</header>

				<section className={styles.overview}>
					<div className={styles.container}>
						<div className={styles.overviewLead}>
							<p className={styles.eyebrow}>A clear scope. A consistent handoff.</p>
							<Heading as="h2" className={styles.sectionTitle}>Support designed around real practice work.</Heading>
							<p>{page.overview}</p>
						</div>
						<div className={styles.scopeGrid}>
							{page.sections.map((section, index) => (
								<article className={styles.scopeCard} key={section.title}>
									<span className={styles.scopeIndex}>0{index + 1}</span>
									<Heading as="h3" className={styles.scopeTitle}>{section.title}</Heading>
									<p>{section.description}</p>
									<ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
								</article>
							))}
						</div>
					</div>
				</section>

				{page.specialtyLink && (
					<section className={styles.specialtyCallout}>
						<div className={`${styles.container} ${styles.specialtyInner}`}>
							<div>
								<p className={styles.eyebrow}>Medical billing across specialties</p>
								<Heading as="h2" className={styles.sectionTitle}>Primary care, behavioral health, specialty and facility-based billing.</Heading>
								<p>Billing details vary with the service, payer and documentation. We begin by learning how your practice works and can support a wide range of specialties and care settings.</p>
							</div>
							<Link className={styles.secondaryButton} to="/services#specialties">Browse specialty directory</Link>
						</div>
					</section>
				)}

				<section className={styles.processSection}>
					<div className={styles.container}>
						<div className={styles.overviewLead}>
							<p className={styles.eyebrow}>How we begin</p>
							<Heading as="h2" className={styles.sectionTitle}>A measured start before the work is handed over.</Heading>
						</div>
						<ol className={styles.processGrid}>
							{page.process.map((step, index) => (
								<li key={step.title}>
									<span>0{index + 1}</span>
									<Heading as="h3" className={styles.processTitle}>{step.title}</Heading>
									<p>{step.text}</p>
								</li>
							))}
						</ol>
						<aside className={styles.responsibility}>
							<strong>{page.responsibilityTitle ?? 'Clinical responsibility stays with your practice.'}</strong>
							<span>{page.responsibility}</span>
						</aside>
					</div>
				</section>

				<section className={styles.faqSection}>
					<div className={`${styles.container} ${styles.faqGrid}`}>
						<div>
							<p className={styles.eyebrow}>Questions</p>
							<Heading as="h2" className={styles.sectionTitle}>Before you get started.</Heading>
							<p className={styles.faqIntro}>We’ll use an initial conversation to understand the work, the current system and the boundaries your practice needs.</p>
						</div>
						<div className={styles.faqList}>
							{page.faqs.map((faq) => (
								<details key={faq.question}>
									<summary>{faq.question}</summary>
									<p>{faq.answer}</p>
								</details>
							))}
						</div>
					</div>
				</section>

				<section className={styles.closing}>
					<div className={styles.closingInner}>
						<p className={styles.eyebrow}>Start with a conversation</p>
						<Heading as="h2" className={styles.closingTitle}>Let’s talk about the work you want off your team’s plate.</Heading>
						<p>We’ll discuss your workflow and what a practical service scope could look like. Please don’t share patient details on the call booking form or this website.</p>
						<p>Or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
						<div className={styles.heroActions}>
							<Link className={styles.primaryButton} to="/contact">Request a consultation</Link>
							<Link className={styles.secondaryOnBand} to="/services">All services</Link>
						</div>
						<nav className={styles.otherServices} aria-label="Related services">
							{related.map((other) => <Link key={other.slug} to={serviceHref(other.slug)}>{other.name} <span aria-hidden="true">→</span></Link>)}
						</nav>
					</div>
				</section>
			</main>
		</Layout>
	);
}
