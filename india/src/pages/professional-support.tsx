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
		text: 'Upgrades, additional features as you grow, and configuration changes as the hospital changes. Unlimited users throughout.',
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
		title: 'Start with your hospital',
		text: 'Walk us through your departments, facilities, tariffs and current systems so we understand your priorities.',
	},
	{
		n: '2',
		title: 'Plan the configuration',
		text: 'Review relevant features, migration needs, responsibilities and a proposed implementation timeline.',
	},
	{
		n: '3',
		title: 'Prepare teams and go live',
		text: 'Configure the agreed workflows, train staff for their roles and stay connected with our support team after launch.',
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
				Implementation and support<br />from the team behind Ciyex.
							</Heading>
							<p className={styles.heroSubtitle}>
				Qiaben builds Ciyex HIMS and works with your hospital on implementation,
				data migration, staff training and ongoing support—from the first setup
				conversation through day-to-day use.
							</p>
						</div>
					</div>

					{/* How it works */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								From planning to ongoing support
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
								Support for each stage of HIMS
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
										Qiaben Healthcare Solutions builds and supports Ciyex HIMS from
										Coimbatore. Our team can help plan implementation, configure hospital
										workflows and support your staff after go-live.
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
									Book a free demo
									</Link>
									<Link to="/modules" className={styles.websiteBtn}>
										Explore hospital workflows
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
									Work with us on hospital implementation
								</Heading>
								<p className={styles.ctaText}>
									Do you provide hospital IT, implementation or training services in India?
									Contact us to discuss opportunities to support Ciyex HIMS deployments.
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
