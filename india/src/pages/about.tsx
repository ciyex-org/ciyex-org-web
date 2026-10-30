import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { HimsIcon, type HimsIconName } from '@site/src/data/himsIcons';
import styles from '@site/src/css/india/about.module.css';

/**
 * About, for the India market.
 *
 * <p>Two things were wrong here. The Corporate Information block printed the
 * Coimbatore address twice — "Registered Address" and "India Office" were the
 * same building, left over from the US layout where the registered office is in
 * Wyoming. And the mission paragraph had "like FHIR R4 and HL7 v2" stranded
 * after the DPDP clause, so it modified the wrong noun.
 */

const FACTS: readonly { icon: HimsIconName; label: string; text: string }[] = [
	{
		icon: 'hospital',
		label: 'Connected workflows',
		text: 'Link the front desk, patient care, diagnostics, billing and records.',
	},
	{
		icon: 'insurance',
		label: 'ABDM gateway',
		text: 'Gateway credentials and connectivity configured per hospital.',
	},
	{
		icon: 'receipt',
		label: '₹ and GST',
		text: 'Indian number grouping, dd/MM/yyyy, April financial year.',
	},
	{
		icon: 'microscope',
		label: 'FHIR R4, HL7 v2, DICOM',
		text: 'Analysers and modalities on your network talk to it directly.',
	},
	{
		icon: 'staff',
		label: 'Unlimited users',
		text: 'Access by role and permission, not by licence count.',
	},
	{
		icon: 'lock',
		label: 'Cloud or on-premise',
		text: 'The same software either way, and your data stays yours.',
	},
	{
		icon: 'branch',
		label: 'Coimbatore and Sheridan',
		text: 'Offices in India and the United States.',
	},
];

export default function About(): ReactNode {
	return (
		<Layout
			title="About Us"
			description="Qiaben Healthcare Solutions Pvt Ltd builds Ciyex HIMS — hospital information management software for hospitals and clinics in India, from a single nursing home to a multi-unit group.">
			<main className={`${styles.aboutPage} ${styles.aboutWide}`}>
				<div className="container">

					{/* Hero */}
					<div className={styles.heroCard}>
						<div className={styles.heroContent}>
							<div className={styles.badges}>
								<span className={styles.badge}>Hospital technology · Coimbatore</span>
								<span className={styles.badgeState}>Coimbatore, Tamil Nadu</span>
							</div>
							<Heading as="h1" className={styles.heroTitle}>
								Hospital software shaped around real workflows.
							</Heading>
							<p className={styles.heroSubtitle}>
								Qiaben Healthcare Solutions builds Ciyex HIMS to connect the work of hospital
								teams—from registration and patient care to diagnostics, billing and records.
							</p>
						</div>
					</div>

					{/* Mission */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								Our Mission
							</Heading>
							<div className={styles.missionLayout}>
								<div className={styles.missionCard}>
								<p className={styles.missionText}>
									Qiaben Healthcare Solutions builds Ciyex HIMS for hospitals that want their
					front desk, care teams, departments and administration working from connected
					records. Hospitals can configure the features and workflows that fit their needs.
								</p>
								<p className={styles.missionText}>
									Ciyex HIMS uses FHIR R4 and supports HL7 v2 and DICOM workflows for connected
									clinical and diagnostic systems. Hospitals can discuss managed cloud or
									on-premise deployment, multi-unit configuration and data handling with our team.
								</p>
								<p className={styles.missionText}>
									Our focus is practical: make implementation understandable, keep hospital
									workflows connected and help each team find the information it needs to do its work.
									</p>
									<div className={styles.missionLinks}>
										<Link to="/modules" className={styles.missionLinkPrimary}>
											Explore hospital workflows
										</Link>
										<Link to="/signup" className={styles.missionLinkGhost}>
											Book a demo
										</Link>
									</div>
								</div>
								<aside className={styles.factPanel}>
									<p className={styles.factPanelTitle}>At a glance</p>
									{FACTS.map((fact) => (
										<div key={fact.label} className={styles.factRow}>
											<span className={styles.factIcon}>
												<HimsIcon name={fact.icon} size={19} />
											</span>
											<span>
												<span className={styles.factLabel}>{fact.label}</span>
												<span className={styles.factText}>{fact.text}</span>
											</span>
										</div>
									))}
								</aside>
							</div>
						</div>
					</section>

					{/* What we build */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								What We Build
							</Heading>
							<div className={styles.infoGridThree}>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="hospital" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Ciyex HIMS</h3>
									<p className={styles.infoValue}>
											A hospital information system spanning registration, OPD, emergency,
											wards, theatre, diagnostics, pharmacy, billing, discharge and administration.<br />
										<Link to="/modules" className={styles.infoLink}>
										Explore features
										</Link>
									</p>
								</div>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="parameter" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Ciyex Workspace</h3>
									<p className={styles.infoValue}>
											A desktop application for Windows, macOS and Linux, bringing configured
											hospital workflows into one workspace.<br />
										<Link to="/workspace" className={styles.infoLink}>
											Explore Workspace
										</Link>
									</p>
								</div>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="lock" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Deployment &amp; support</h3>
									<p className={styles.infoValue}>
											Discuss managed cloud or on-premise deployment, data migration, staff
											training and ongoing support with the team that builds Ciyex.<br />
										<Link to="/professional-support" className={styles.infoLink}>
											How support works
										</Link>
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Corporate information */}
					<section className={styles.section}>
						<div className={styles.sectionInnerWide}>
							<Heading as="h2" className={styles.sectionTitle}>
								Corporate Information
							</Heading>
							<div className={styles.infoGridThree}>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="branch" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Registered Office</h3>
									<p className={styles.infoValue}>
										Qiaben Healthcare Solutions Pvt Ltd<br />
										1/39, Veerappanur<br />
										Coimbatore, Tamil Nadu 641105<br />
										India
									</p>
								</div>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="phone" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Contact</h3>
									<p className={styles.infoValue}>
										<a href="mailto:info@qiaben.com" className={styles.infoLink}>
											info@qiaben.com
										</a>
										<br />
										<a
											href="https://qiaben.com"
											target="_blank"
											rel="noopener noreferrer"
											className={styles.infoLink}>
											qiaben.com
										</a>
										<br />
										<Link to="/professional-support" className={styles.infoLink}>
											Support
										</Link>
									</p>
								</div>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="branch" size={26} />
									</div>
									<h3 className={styles.infoLabel}>United States</h3>
									<p className={styles.infoValue}>
										Qiaben LLC<br />
										1309 Coffeen Avenue, STE 1200<br />
										Sheridan, WY 82801<br />
										United States
									</p>
								</div>
							</div>
						</div>
					</section>

				</div>
			</main>
		</Layout>
	);
}
