import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { HimsIcon, type HimsIconName } from '@site/src/data/himsIcons';
import styles from '@site/src/css/india/workspace.module.css';

/**
 * Ciyex Workspace, described as the hospital application it is.
 *
 * <p>The sidebar, the two journeys and the module rows below are all taken from
 * the product — `hospitalMenuPane.ts` for the navigation and `journey.ts` for
 * the OPD and IPD flows, down to who does each step and what it posts to the
 * patient's account. The illustrations are drawn in markup rather than
 * photographed, which is deliberate: the screenshots this page used to carry
 * were of the US EHR, so an Indian hospital was being shown MRNs, insurance and
 * MM/DD/YYYY dates under HIMS captions.
 */

/* ── The hospital sidebar, as the workspace draws it ── */

const SIDEBAR: readonly {
	group: string;
	entries: readonly { label: string; icon: HimsIconName }[];
}[] = [
	{
		group: 'Front Desk',
		entries: [
			{ label: 'Registration / UHID', icon: 'uhid-card' },
			{ label: 'Appointments & Queue', icon: 'calendar' },
			{ label: 'Display Board', icon: 'front-desk' },
			{ label: 'Billing & Cashier', icon: 'receipt' },
		],
	},
	{
		group: 'Patient Care',
		entries: [
			{ label: 'OPD', icon: 'stethoscope' },
			{ label: 'Emergency', icon: 'casualty' },
			{ label: 'Inpatients', icon: 'ward-bed' },
			{ label: 'Bed Board', icon: 'bed-board' },
			{ label: 'Nursing Station', icon: 'nursing' },
			{ label: 'Operation Theatre', icon: 'theatre' },
		],
	},
	{
		group: 'Departments',
		entries: [
			{ label: 'Laboratory', icon: 'blood-tube' },
			{ label: 'Radiology', icon: 'x-ray' },
			{ label: 'Pharmacy Counter', icon: 'capsule' },
			{ label: 'Store & Management', icon: 'stores' },
			{ label: 'Blood Bank', icon: 'blood-drop' },
		],
	},
	{
		group: 'Records',
		entries: [
			{ label: 'Discharge', icon: 'discharge' },
			{ label: 'Medical Records', icon: 'records' },
		],
	},
	{
		group: 'Administration',
		entries: [
			{ label: 'HR & Payroll', icon: 'staff' },
			{ label: 'Ambulance', icon: 'ambulance' },
			{ label: 'Accounts & Finance', icon: 'ledger' },
		],
	},
];

function SidebarMock(): ReactNode {
	return (
		<div className={styles.shellWindow}>
			<div className={styles.mockupBar}>
				<span className={styles.dot} style={{ background: '#ff5f57' }} />
				<span className={styles.dot} style={{ background: '#febc2e' }} />
				<span className={styles.dot} style={{ background: '#28c840' }} />
				<span className={styles.mockupTitle}>Ciyex Workspace &mdash; Hospital</span>
			</div>
			<div className={styles.shellBody}>
				<div className={styles.shellNav}>
					{SIDEBAR.map((group) => (
						<div key={group.group} className={styles.shellGroup}>
							<div className={styles.shellGroupLabel}>{group.group}</div>
							{group.entries.map((entry, i) => (
								<div
									key={entry.label}
									className={
										group.group === 'Front Desk' && i === 1
											? `${styles.shellItem} ${styles.shellItemActive}`
											: styles.shellItem
									}>
									<HimsIcon name={entry.icon} size={15} />
									<span>{entry.label}</span>
								</div>
							))}
						</div>
					))}
				</div>
				<div className={styles.shellMain}>
					<div className={styles.shellMainHead}>
						<span>Appointments &amp; Queue</span>
						<span className={styles.shellPill}>Dr Anitha R &middot; General Medicine</span>
					</div>
					<div className={styles.queueRowHead}>
						<span>Token</span><span>Patient</span><span>UHID</span><span>Status</span>
					</div>
					{[
						['A-014', 'Meena Rajan', 'UH/26/004182', 'In consultation', true],
						['A-015', 'Suresh Kumar', 'UH/26/004183', 'Called', false],
						['A-016', 'Fathima Beevi', 'UH/26/001907', 'Waiting', false],
						['A-017', 'Karthik S', 'UH/26/004184', 'Waiting', false],
						['A-018', 'Lakshmi Devi', 'UH/24/000551', 'Waiting', false],
					].map(([token, name, uhid, status, active]) => (
						<div
							key={token as string}
							className={active ? `${styles.queueRow} ${styles.queueRowActive}` : styles.queueRow}>
							<span className={styles.queueToken}>{token}</span>
							<span>{name}</span>
							<span className={styles.queueUhid}>{uhid}</span>
							<span className={styles.queueStatus}>{status}</span>
						</div>
					))}
					<div className={styles.shellFoot}>
						5 waiting &middot; average wait 14 min &middot; display board live
					</div>
				</div>
			</div>
		</div>
	);
}

/* ── The two journeys the hospital actually runs ── */

interface JourneyStep {
	readonly title: string;
	readonly who: string;
	readonly screen: string;
	readonly charge: string;
}

const OPD_JOURNEY: readonly JourneyStep[] = [
	{
		title: 'Patient reaches the front desk',
		who: 'Reception',
		screen: 'Registration / UHID',
		charge: 'None, or a registration fee if the hospital charges one',
	},
	{
		title: 'Department and doctor chosen, token issued',
		who: 'Reception',
		screen: 'Appointments & Queue',
		charge: 'Consultation fee posted',
	},
	{
		title: 'Patient waits, then is called in',
		who: 'Reception, seen by everyone waiting',
		screen: 'Appointments & Queue, Display Board',
		charge: 'None',
	},
	{
		title: 'The consultation',
		who: 'Doctor',
		screen: 'OPD Visits',
		charge: 'Doctor’s fee, and a follow-up inside the free window posts nothing',
	},
	{
		title: 'Tests ordered, medicines prescribed',
		who: 'Doctor orders; lab, radiology and pharmacy act',
		screen: 'OPD Visits, then Laboratory, Radiology, Pharmacy',
		charge: 'Lab, radiology and pharmacy charges posted',
	},
	{
		title: 'Payment at the counter',
		who: 'Billing assistant',
		screen: 'Billing & Cashier',
		charge: 'Everything above, collected and receipted',
	},
];

const IPD_JOURNEY: readonly JourneyStep[] = [
	{
		title: 'The doctor advises admission',
		who: 'Doctor',
		screen: 'OPD Visits or Emergency',
		charge: 'Nothing new yet',
	},
	{
		title: 'Admission opened, IP number given',
		who: 'Reception',
		screen: 'Inpatients',
		charge: 'Admission charge, if the hospital levies one',
	},
	{
		title: 'Bed allocated, and the clock starts',
		who: 'Reception or ward nurse',
		screen: 'Inpatients, Bed Board',
		charge: 'Room rent, automatic, per day',
	},
	{
		title: 'Advance deposit collected',
		who: 'Billing assistant',
		screen: 'Inpatients, Add deposit',
		charge: 'A credit, not a charge. Receipt printed',
	},
	{
		title: 'Daily treatment: rounds, nursing, monitoring',
		who: 'Doctor and ward nurses',
		screen: 'Nursing Station, Inpatients',
		charge: 'Doctor visit fee per round, nursing procedures',
	},
	{
		title: 'Laboratory and radiology',
		who: 'Lab technician, radiographer, radiologist',
		screen: 'Laboratory, Radiology',
		charge: 'One charge per test and per scan',
	},
	{
		title: 'Pharmacy issues medicines to the ward',
		who: 'Pharmacist',
		screen: 'Pharmacy, Stores & Inventory',
		charge: 'Each drug charged at its batch rate',
	},
	{
		title: 'Operation, if there is one',
		who: 'Surgeon, anaesthetist, theatre staff',
		screen: 'Operation Theatre',
		charge: 'Surgeon, anaesthetist, theatre time, implants, consumables — each its own head',
	},
	{
		title: 'Discharge and the final bill',
		who: 'Doctor writes the summary; billing closes the account',
		screen: 'Discharge, Billing & Cashier',
		charge: 'Everything totalled, deposits deducted, balance settled',
	},
];

function JourneyColumn({
	kind, lead, steps, icon,
}: {
	kind: string;
	lead: string;
	steps: readonly JourneyStep[];
	icon: HimsIconName;
}): ReactNode {
	return (
		<div className={styles.journeyCol}>
			<div className={styles.journeyColHead}>
				<span className={styles.journeyColIcon}>
					<HimsIcon name={icon} size={22} />
				</span>
				<div>
					<h3 className={styles.journeyColTitle}>{kind}</h3>
					<p className={styles.journeyColLead}>{lead}</p>
				</div>
			</div>
			<ol className={styles.stepList}>
				{steps.map((step, i) => (
					<li key={step.title} className={styles.step}>
						<span className={styles.stepNum}>{i + 1}</span>
						<div className={styles.stepBody}>
							<div className={styles.stepTitle}>{step.title}</div>
							<div className={styles.stepMeta}>
								<span><strong>Who</strong> {step.who}</span>
								<span><strong>Screen</strong> {step.screen}</span>
								<span><strong>Posts</strong> {step.charge}</span>
							</div>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
}

/* ── Module rows ── */

const modules: readonly {
	title: string;
	icon: HimsIconName;
	description: string;
	panel: { head: string; rows: readonly (readonly [string, string])[] };
}[] = [
	{
		title: 'Registration & UHID',
		icon: 'uhid-card',
		description: `A returning patient is found on phone number or UHID; a new one is typed in once and given a UHID they keep for life, across every visit and every branch.

Duplicate detection runs before a second file can be created, so one patient does not end up as three. The number comes from your own series, in your own format.

Visits, admissions, imaging and reports all hang off that one record — which is what makes a case sheet retrievable years later without sending a clerk to the record room.`,
		panel: {
			head: 'Registration / UHID',
			rows: [
				['UHID', 'UH/26/004182'],
				['Name', 'Meena Rajan'],
				['Age / Sex', '34 / F'],
				['Category', 'General'],
				['Branch', 'Coimbatore Unit'],
			],
		},
	},
	{
		title: 'Appointments & Queue',
		icon: 'calendar',
		description: `Book by doctor, department or slot, and send the reminder over SMS or email from the hospital’s own sender.

Tokens are issued at the counter and called from the queue console, with the waiting-area display board driven by the same list — so nobody has to shout a number across a corridor.

The front desk sees who has arrived, who is still waiting and which doctor is running late, without walking to the OPD to find out.`,
		panel: {
			head: 'Queue console',
			rows: [
				['Now serving', 'A-014'],
				['Waiting', '5 patients'],
				['Average wait', '14 min'],
				['Doctor', 'Dr Anitha R'],
				['Display board', 'Live'],
			],
		},
	},
	{
		title: 'Inpatients, Wards & Theatre',
		icon: 'ward-bed',
		description: `Admission allocates an IP number and a bed, and the room rent starts posting per day on its own. Deposits are taken as credits and shown against the running bill from day one.

The bed board reads at a glance — occupied, free, blocked, cleaning — and the nursing station carries vitals, the medication round and the shift handover bed by bed.

Theatre lists, the safety checklist and implant and consumable capture all reach the same bill, so what was used in the theatre is on the account before the patient leaves it.`,
		panel: {
			head: 'Bed Board — Ward 3',
			rows: [
				['Occupied', '18 of 24'],
				['Free', '4'],
				['Cleaning', '2'],
				['Admissions today', '6'],
				['Discharges due', '3'],
			],
		},
	},
	{
		title: 'Laboratory, Radiology & Pharmacy',
		icon: 'blood-tube',
		description: `Orders raised inside the visit reach the department directly. Samples are tracked through collection, result entry and verification, and values outside the reference range are flagged rather than left to be noticed.

Analysers return results over HL7 and modalities pick up their worklist over DICOM, so a technician is not retyping a number a machine already printed.

The pharmacy dispenses against batch and expiry, supplies the wards on indent, and every issue reaches the patient’s account at its own batch rate.`,
		panel: {
			head: 'Laboratory worklist',
			rows: [
				['Samples collected', '42'],
				['Awaiting result', '11'],
				['Awaiting verification', '4'],
				['Flagged abnormal', '3'],
				['Analyser link', 'Connected'],
			],
		},
	},
	{
		title: 'Billing, Discharge & Accounts',
		icon: 'receipt',
		description: `Charges land on the account as the work happens — consultation, ward, lab, radiology, theatre, pharmacy — so the running bill is never a reconstruction at the end.

Discharge runs a checklist, prints the summary, deducts the deposits and settles the balance. GST, receipts, advances and refunds all follow your tariff and your number series.

The day book ties out to what the cashier actually holds, and the ledger postings come from billing and pharmacy rather than from somebody typing them again.`,
		panel: {
			head: 'Final bill — IP/26/0917',
			rows: [
				['Room & nursing', '₹ 18,400.00'],
				['Procedures & theatre', '₹ 46,750.00'],
				['Pharmacy & consumables', '₹ 11,280.00'],
				['GST', '₹ 4,321.00'],
				['Less deposits', '− ₹ 50,000.00'],
			],
		},
	},
];

export default function Workspace(): ReactNode {
	return (
		<Layout
			title="Ciyex Workspace"
			description="Ciyex Workspace is the desktop client for the Ciyex HIMS — registration and UHID, the queue and display board, OPD, emergency, wards and theatre, laboratory, radiology, pharmacy, billing and discharge, in one app for Windows, macOS and Linux.">
			<main className={styles.page}>

				{/* Hero */}
				<section className={styles.hero}>
					<div className={styles.heroInner}>
						<span className={styles.heroBadge}>Desktop app &middot; Cloud or hospital-hosted</span>
						<Heading as="h1" className={styles.heroTitle}>
							Ciyex Workspace.<br />
							<span className={styles.heroGradient}>One workspace for every team.</span>
						</Heading>
						<p className={styles.heroSubtitle}>
							Bring front-desk, clinical, ward, diagnostic and billing work into one desktop
							application. Your hospital’s configured features are organised in a shared
							workspace for the teams using them every day.
						</p>
						<div className={styles.heroCta}>
							<Link className={styles.btnPrimary} to="/signup">Book a demo &rarr;</Link>
						</div>
					</div>

					<div className={styles.mockupWrapper}>
						<SidebarMock />
					</div>
				</section>

				{/* Stack */}
				<section className={styles.stack}>
					<div className={styles.stackInner}>
						<div className={styles.stackText}>
							<div className={styles.sectionLabel}>How the pieces fit</div>
							<Heading as="h2" className={styles.stackTitle}>
								One download.<br />Three things working together.
							</Heading>
							<p className={styles.stackDesc}>
							Workspace is the desktop app your staff use. Ciyex HIMS provides the hospital
							workflows behind it, with a choice of managed cloud or deployment on your
							own hospital infrastructure.
							</p>
							<ul className={styles.stackList}>
								<li>
									<strong>Workspace (desktop)</strong> &mdash; what reception, nursing,
									the lab, the pharmacy and the cash counter work in all day.
								</li>
								<li>
									<strong>Ciyex HIMS (server)</strong> &mdash; runs in the cloud we host
									for you or on a server inside the hospital.
								</li>
								<li>
									<strong>Ciyex Cloud</strong> &mdash; encrypted storage, sync and backups.
								</li>
							</ul>
							<div className={styles.stackCta}>
								<Link className={styles.btnPrimary} to="/modules">Explore hospital workflows &rarr;</Link>
							</div>
						</div>
						<div className={styles.stackVisual}>
							<div className={styles.stackLayer} data-layer="desktop">
								<span className={styles.layerLabel}>Workspace Desktop</span>
								<span className={styles.layerSub}>Windows &middot; macOS &middot; Linux</span>
							</div>
							<div className={styles.stackLayer} data-layer="cloud">
								<span className={styles.layerLabel}>Ciyex Cloud</span>
								<span className={styles.layerSub}>Encrypted storage &middot; sync &middot; backups</span>
							</div>
							<div className={styles.stackLayer} data-layer="hims">
								<span className={styles.layerLabel}>Ciyex HIMS Server</span>
								<span className={styles.layerSub}>FHIR R4 &middot; HL7 v2 &middot; DPDP-aligned</span>
							</div>
						</div>
					</div>
				</section>

				{/* The two journeys */}
				<section className={styles.journeys}>
					<div className={styles.journeysIntro}>
						<div className={styles.sectionLabel}>Two journeys, end to end</div>
						<Heading as="h2" className={styles.sectionTitle}>
							OPD and IPD, step by step.
						</Heading>
						<p className={styles.sectionSubtitle}>
							Two things run through an Indian hospital and they are not the same. OPD walks
							in, sees a doctor and goes home. IPD is given a bed and stays. Everything
							else — lab, radiology, pharmacy, theatre, billing — hangs off one of the two.
							Ciyex is built around both, and every step below names who does it, which
							screen it happens on, and what it posts to the patient&rsquo;s account.
						</p>
					</div>
					<div className={styles.journeyGrid}>
						<JourneyColumn
							kind="OPD"
							icon="stethoscope"
							lead="Fever, a follow-up, a second opinion. In and out in a couple of hours."
							steps={OPD_JOURNEY}
						/>
						<JourneyColumn
							kind="IPD"
							icon="ward-bed"
							lead="A bed, a consultant and a stay. The bill builds from the day of admission."
							steps={IPD_JOURNEY}
						/>
					</div>
				</section>

				{/* Module deep-dives */}
				<section className={styles.modulesSection}>
					<div className={styles.modulesIntro}>
						<div className={styles.sectionLabel}>Inside the application</div>
						<Heading as="h2" className={styles.sectionTitle}>
							Built for the people at the counter.
						</Heading>
						<p className={styles.sectionSubtitle}>
							A closer look at key workflows. Explore the full feature catalogue on the{' '}
							<Link to="/modules">features page</Link>, and a hospital configures the ones
							it runs.
						</p>
					</div>
					<div className={styles.moduleRows}>
						{modules.map((m, i) => (
							<div
								key={m.title}
								className={`${styles.moduleRow} ${i % 2 ? styles.moduleRowFlip : ''}`}>
								<div className={styles.modulePanel}>
									<div className={styles.modulePanelHead}>
										<HimsIcon name={m.icon} size={18} />
										<span>{m.panel.head}</span>
									</div>
									{m.panel.rows.map(([label, value]) => (
										<div key={label} className={styles.modulePanelRow}>
											<span className={styles.modulePanelKey}>{label}</span>
											<span className={styles.modulePanelValue}>{value}</span>
										</div>
									))}
								</div>
								<div className={styles.moduleText}>
									<span className={styles.moduleIcon}>
										<HimsIcon name={m.icon} size={26} />
									</span>
									<Heading as="h3" className={styles.moduleTitle}>
										{m.title}
									</Heading>
									{m.description.split('\n\n').map((para, j) => (
										<p key={j} className={styles.moduleDesc}>{para}</p>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className={styles.cta}>
					<div className={styles.ctaInner}>
						<Heading as="h2" className={styles.ctaTitle}>
							Bring your hospital workflows together.
						</Heading>
						<p className={styles.ctaDesc}>
							Explore how Workspace and Ciyex HIMS could fit your hospital’s departments,
							deployment requirements and day-to-day work.
						</p>
						<div className={styles.ctaButtons}>
							<Link className={styles.btnPrimary} to="/signup">Book a demo &rarr;</Link>
						</div>
					</div>
				</section>

			</main>
		</Layout>
	);
}
