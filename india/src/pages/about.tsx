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
		label: '23 modules',
		text: 'Front desk to final bill. A hospital switches on the ones it runs.',
	},
	{
		icon: 'insurance',
		label: 'ABDM-ready',
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
								<span className={styles.badge}>Hospital Software</span>
								<span className={styles.badgeState}>Coimbatore, Tamil Nadu</span>
							</div>
							<Heading as="h1" className={styles.heroTitle}>
								About Qiaben Healthcare Solutions Pvt Ltd
							</Heading>
							<p className={styles.heroSubtitle}>
								We build Ciyex HIMS — one system for the whole hospital, from the front
								desk to the final bill.
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
									Qiaben Healthcare Solutions Pvt Ltd builds Ciyex — a modern, secure
									hospital information management system. We believe a thirty-bed nursing
									home should run the same software as a three-hundred-bed hospital, and
									that the difference should be which modules you switch on rather than
									what you can afford.
								</p>
								<p className={styles.missionText}>
									The platform is built on open standards — FHIR R4 and HL7 v2 underneath,
									DICOM for imaging — with data practices aligned to the Digital Personal
									Data Protection Act, 2023. It runs as a managed cloud service or on a
									server inside the hospital, and serves everything from a single clinic
									to a multi-unit group under one login.
								</p>
								<p className={styles.missionText}>
									Our focus is straightforward: take the friction out of adoption, make the
									record genuinely portable, and let the people at the counter, the ward and
									the cash desk get on with the work in front of them.
									</p>
									<div className={styles.missionLinks}>
										<Link to="/modules" className={styles.missionLinkPrimary}>
											See all 23 modules
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
										Twenty-three modules covering registration and UHID, the queue, OPD,
										emergency, wards and theatre, laboratory, radiology, pharmacy, blood
										bank, GST billing, discharge and payroll — with ABDM connectivity built
										in.<br />
										<Link to="/modules" className={styles.infoLink}>
											See all modules
										</Link>
									</p>
								</div>
								<div className={styles.infoCard}>
									<div className={styles.infoIconGlyph}>
										<HimsIcon name="parameter" size={26} />
									</div>
									<h3 className={styles.infoLabel}>Ciyex Workspace</h3>
									<p className={styles.infoValue}>
										The desktop application your staff work in all day, for Windows, macOS
										and Linux. The sidebar shows only the modules your hospital has
										switched on.<br />
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
										Managed cloud on Azure or AWS, or a server inside the hospital.
										Setup, data migration, training desk by desk and ongoing support come
										from the team that writes the software.<br />
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
