import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { HimsIcon, type HimsIconName } from '@site/src/data/himsIcons';
import styles from '@site/src/css/india/professional-support.module.css';

/**
 * Support, described as what it is: first-party.
 *
 * <p>This page used to be a partner directory — "browse our vetted professional
 * support vendors below", a Tier 1 badge, partners in the plural — with exactly
 * one entry in it, and that entry was Qiaben, who build Ciyex. A directory of
 * one reads as a marketplace that does not exist, and a Tier 1 badge implies a
 * Tier 2 that nobody can see. The partner programme is still invited at the
 * bottom; the day there are partners, they get their own section.
 *
 * <p>Two service claims were also dropped rather than reworded — "transparent
 * pricing" and "no long-term contracts" — because neither is something the site
 * can show. Uptime and round-the-clock support stay, confirmed as real.
 */

const OFFICE = {
	company: 'Qiaben Healthcare Solutions Pvt Ltd',
	address: '1/39, Veerappanur, Coimbatore, Tamil Nadu 641105',
	email: 'info@qiaben.com',
	website: 'https://qiaben.com',
	booking: '/signup',
	// TODO: an Indian landline or mobile goes here. The +1 (844) number the page
	// used to print is a US toll-free line an Indian hospital mostly cannot dial,
	// so it is better absent than wrong.
	phone: undefined as string | undefined,
};

const SERVICES: readonly { icon: HimsIconName; title: string; text: string }[] = [
	{
		icon: 'parameter',
		title: 'Implementation and configuration',
		text: 'Your masters, tariffs, ward and bed structure, tax rates and number series set up as your hospital already runs them — not as a default we ship.',
	},
	{
		icon: 'records',
		title: 'Data migration',
		text: 'Patient master, visit history and outstanding balances brought across from your existing system, scoped against your export before anything is committed.',
	},
	{
		icon: 'staff',
		title: 'Training for every desk',
		text: 'Reception, nursing, laboratory, radiology, pharmacy and billing each learn the screens they actually work in, not a general tour of the software.',
	},
	{
		icon: 'lock',
		title: 'Managed hosting',
		text: 'Managed cloud on Azure or AWS, or deployed on a server inside the hospital. Encrypted at rest and in transit, with data practices aligned to the DPDP Act, 2023.',
	},
	{
		icon: 'clock',
		title: 'Support for urgent problems',
		text: 'A hospital does not close at six. Support hours and escalation are agreed with each hospital, for anything that stops the counter, the ward or the cash desk.',
	},
	{
		icon: 'insurance',
		title: 'ABDM setup',
		text: 'Gateway credentials, sandbox and production environments, HIP ID and facility identity configured and verified against the live ABDM gateway.',
	},
	{
		icon: 'microscope',
		title: 'Machines and interfaces',
		text: 'Lab analysers over HL7 and imaging modalities over DICOM connected to your worklist, with the message log to debug them rather than guess.',
	},
	{
		icon: 'refresh',
		title: 'Ongoing maintenance',
		text: 'Upgrades, new modules switched on as you grow, and configuration changes as the hospital changes. Unlimited users throughout.',
	},
	{
		icon: 'records',
		title: 'Backups and recovery',
		text: 'Encrypted storage with scheduled backups, so a case sheet from three years ago is still there when the record room is asked for it.',
	},
];

const STEPS: readonly { n: string; title: string; text: string }[] = [
	{
		n: '1',
		title: 'Tell us how your hospital runs',
		text: 'A call about your departments, your wards, your tariffs and what you use today. No obligation and no cost.',
	},
	{
		n: '2',
		title: 'We map it module by module',
		text: 'Which of the 23 modules you switch on, what migrates from your current system, and a dated implementation plan.',
	},
	{
		n: '3',
		title: 'Go live, then stay supported',
		text: 'Configuration, migration, training desk by desk, and a support line that stays open afterwards.',
	},
];

export default function ProfessionalSupport(): ReactNode {
	return (
		<Layout
			title="Support"
			description="Support for Ciyex HIMS from the team that builds it — implementation, data migration, staff training, ABDM setup, managed hosting and ongoing support for hospitals in India.">
			<main className={`${styles.supportPage} ${styles.supportWide}`}>
				<div className="container">

					{/* Hero */}
					<div className={styles.heroCard}>
						<div className={styles.heroContent}>
							<div className={styles.badges}>
								<span className={styles.badge}>First-party support</span>
							</div>
							<Heading as="h1" className={styles.heroTitle}>
								Support from the team<br />that builds Ciyex.
							</Heading>
							<p className={styles.heroSubtitle}>
								Implementation, migration, training and day-to-day support come from
								Qiaben — the people who write the software — rather than from a reseller
								who has to raise a ticket with us anyway.
							</p>
						</div>
					</div>

					{/* How it works */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								How It Works
							</Heading>
							<div className={styles.stepsGrid}>
								{STEPS.map((step) => (
									<div key={step.n} className={styles.stepCard}>
										<div className={styles.stepNumber}>{step.n}</div>
										<h3 className={styles.stepTitle}>{step.title}</h3>
										<p className={styles.stepText}>{step.text}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* What is covered */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								What Support Covers
							</Heading>
							<div className={styles.serviceGrid}>
								{SERVICES.map((service) => (
									<div key={service.title} className={styles.serviceCard}>
										<span className={styles.serviceIcon}>
											<HimsIcon name={service.icon} size={24} />
										</span>
										<h3 className={styles.serviceTitle}>{service.title}</h3>
										<p className={styles.serviceText}>{service.text}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Who you are dealing with */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								Talk to Us
							</Heading>
							<div className={styles.vendorCard}>
								<div className={styles.vendorHeader}>
									<div>
										<h3 className={styles.vendorName}>Qiaben Health</h3>
										<p className={styles.vendorCompany}>{OFFICE.company}</p>
									</div>
								</div>

								<p className={styles.vendorDescription}>
									Ciyex HIMS is built and supported by Qiaben. One team writes the
									software, implements it in your hospital and answers the phone when
									something is wrong with it.
								</p>

								<div className={styles.vendorDetails}>
									<div className={styles.detailBlock}>
										<h4 className={styles.detailTitle}>Office</h4>
										<div className={styles.contactInfo}>
											<p>{OFFICE.address}</p>
										</div>
									</div>

									<div className={styles.detailBlock}>
										<h4 className={styles.detailTitle}>Contact</h4>
										<div className={styles.contactInfo}>
											<p>
												<a href={`mailto:${OFFICE.email}`} className={styles.contactLink}>
													{OFFICE.email}
												</a>
											</p>
											{OFFICE.phone && (
												<p>
													<a
														href={`tel:${OFFICE.phone.replace(/\s/g, '')}`}
														className={styles.contactLink}>
														{OFFICE.phone}
													</a>
												</p>
											)}
											<p>
												<a
													href={OFFICE.website}
													target="_blank"
													rel="noopener noreferrer"
													className={styles.contactLink}>
													{OFFICE.website}
												</a>
											</p>
										</div>
									</div>

									<div className={styles.detailBlock}>
										<h4 className={styles.detailTitle}>Where we work</h4>
										<div className={styles.coverageTags}>
											{['India', 'United States'].map((region) => (
												<span key={region} className={styles.coverageTag}>
													{region}
												</span>
											))}
										</div>
									</div>
								</div>

								<div className={styles.vendorActions}>
									<Link
										to={OFFICE.booking}
										className={styles.bookingBtn}>
										Book a Free Consultation
									</Link>
									<Link to="/modules" className={styles.websiteBtn}>
										See all 23 modules
									</Link>
								</div>
							</div>
						</div>
					</section>

					{/* Partner programme */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<div className={styles.ctaCard}>
								<Heading as="h2" className={styles.ctaTitle}>
									Become an Implementation Partner
								</Heading>
								<p className={styles.ctaText}>
									Are you an IT services company working with hospitals in India? We are
									building a partner programme for implementation, training and local
									support, and would like to hear from you.
								</p>
								<a href={`mailto:${OFFICE.email}`} className={styles.ctaBtn}>
									Contact Us
								</a>
							</div>
						</div>
					</section>

				</div>
			</main>
		</Layout>
	);
}
