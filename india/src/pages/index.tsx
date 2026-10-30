import { useState, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { HIMS_MODULE_GROUPS, HIMS_MODULES } from '@site/src/data/himsModules';
import { HimsIcon, type HimsIconName } from '@site/src/data/himsIcons';
import styles from '@site/src/pages/hims.module.css';

/**
 * The India home page: Ciyex HIMS.
 *
 * <p>India buys a hospital information management system, not an EHR, and the
 * page is organised the way a hospital is — the patient journey first, the
 * module catalogue second. Both come from the same source as the product
 * (`src/data/himsModules.ts`), so the site cannot drift from what a hospital
 * can actually switch on.
 */

/* ── Hero ── */

function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.heroGrid}>
					<div className={styles.heroCopy}>
						<div className={styles.heroBadge}>
							Hospital management for Indian hospitals
						</div>
						<Heading as="h1" className={styles.heroTitle}>
							Every department.<br />
							<span className={styles.heroGradient}>One connected hospital.</span>
						</Heading>
						<p className={styles.heroSubtitle}>
							Bring registration, OPD, wards, diagnostics, pharmacy, billing and records into
							one hospital system. Ciyex HIMS helps teams follow each patient’s journey—from
							first registration to discharge—with shared information across departments.
						</p>
						<div className={styles.heroCta}>
							<Link className={styles.btnPrimary} to="/signup">
								Schedule a free demo
							</Link>
							<Link className={styles.btnGhost} to="/modules">
								Explore features
							</Link>
						</div>
					</div>
					<figure className={styles.heroVisual}>
						<img
							src="/en-in/img/hims/dashboard.webp"
							alt="Ciyex HIMS hospital dashboard showing patient flow, OPD visits and daily operations"
							width={2000}
							height={1234}
							fetchPriority="high"
						/>
						<figcaption><span /> Ciyex HIMS dashboard · sample hospital data</figcaption>
					</figure>
				</div>
				<div className={styles.statStrip}>
					<div className={styles.stat}>
						<span className={styles.statValue}>One connected system</span>
						<span className={styles.statLabel}>From registration to discharge</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statValue}>ABDM gateway</span>
						<span className={styles.statLabel}>Configure connection and check connectivity</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statValue}>&#8377; &amp; GST</span>
						<span className={styles.statLabel}>Indian currency, date and tax settings</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statValue}>Unlimited users</span>
						<span className={styles.statLabel}>No per-user licence cost</span>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── The patient journey ── */

const JOURNEY: readonly { title: string; icon: HimsIconName; entries: readonly string[] }[] = [
	{
		title: 'Front Desk', icon: 'front-desk',
		entries: ['Registration & UHID', 'Appointments & queue', 'Display board', 'Billing & cashier'],
	},
	{
		title: 'Patient Care', icon: 'opd',
		entries: ['OPD', 'Emergency', 'Admission & wards', 'Nursing station', 'Operation theatre'],
	},
	{
		title: 'Departments', icon: 'diagnostics',
		entries: ['Laboratory', 'Radiology & PACS', 'Pharmacy', 'Stores', 'Blood bank'],
	},
	{
		title: 'Records', icon: 'records',
		entries: ['Discharge checklist', 'Discharge summary', 'Final bill', 'Medical records'],
	},
	{
		title: 'Administration', icon: 'admin',
		entries: ['HR & payroll', 'Ambulance', 'Accounts & day book', 'Machines & interfaces'],
	},
];

function JourneySection() {
	return (
		<section className={styles.journey}>
			<div className={styles.container}>
				<div className={styles.journeyHead} data-reveal>
					<div className={styles.sectionLabel}>How Ciyex HIMS works</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Connected around the patient journey.
					</Heading>
					<p className={styles.sectionSubtitle}>
						From first registration to the final bill, each team works in the part of HIMS
						that fits its role, while information stays connected across the hospital.
					</p>
				</div>
				<div className={styles.journeyRow} data-reveal>
					{JOURNEY.map((step, i) => (
						<div key={step.title} className={styles.journeyStep}>
							<div className={styles.journeyTop}>
								<span className={styles.journeyIcon}>
									<HimsIcon name={step.icon} size={20} />
								</span>
								<div className={styles.journeyIndex}>STEP {i + 1}</div>
							</div>
							<h3 className={styles.journeyTitle}>{step.title}</h3>
							<ul className={styles.journeyList}>
								{step.entries.map((entry) => (
									<li key={entry}>{entry}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Product tour ── */

/**
 * Real screens from the test hospital. Names, mobile numbers and UHIDs are
 * replaced with test labels before capture, so never swap one for a raw capture
 * from a live tenant.
 */
const TOUR: readonly { title: string; caption: string; src: string; alt: string }[] = [
	{
		title: 'Dashboard', src: '/en-in/img/hims/dashboard.webp',
					caption: 'See patient flow, department activity and key items for the day in one view.',
		alt: 'Ciyex HIMS dashboard showing items needing attention, OPD visits, revenue and patient flow',
	},
	{
		title: 'Patients', src: '/en-in/img/hims/patients.webp',
					caption: 'Review arrivals, new registrations and follow-ups from the patient list.',
		alt: 'Ciyex HIMS patients overview with visit counts, overdue follow-ups and an arrivals chart',
	},
	{
		title: 'Pharmacy', src: '/en-in/img/hims/pharmacy.webp',
					caption: 'Manage dispensing, counter sales, returns and stock from the pharmacy desk.',
		alt: 'Ciyex HIMS pharmacy desk with the dispensing queue and the day\'s till. Patient details are obscured',
	},
	{
		title: 'Laboratory', src: '/en-in/img/hims/laboratory.webp',
					caption: 'Follow each test from sample collection through review and report release.',
		alt: 'Ciyex HIMS laboratory bench showing tests to collect, on the bench, to release and released',
	},
	{
		title: 'Reports', src: '/en-in/img/hims/reports.webp',
					caption: 'Review patient, finance, pharmacy and diagnostic activity across departments.',
		alt: 'Ciyex HIMS reports overview with cards for patients, finance, pharmacy and lab',
	},
	{
		title: 'Expenses', src: '/en-in/img/hims/expenses.webp',
					caption: 'Record hospital expenses and applicable GST in the finance workflow.',
		alt: 'Ciyex HIMS expenses screen with bill categories, the month\'s spend and payment modes',
	},
];

function ProductTour() {
	const [active, setActive] = useState(0);

	return (
		<section className={styles.tour}>
			<div className={styles.container}>
				<div className={styles.journeyHead} data-reveal>
					<div className={styles.sectionLabel}>A look inside Ciyex HIMS</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Explore the screens behind each department.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Browse sample screens from the dashboard, patient records, pharmacy, laboratory
						and reports. The figures shown are from a test hospital.
					</p>
				</div>
				<div className={styles.tourTabs} role="tablist" aria-label="Screens in Ciyex HIMS" data-reveal>
					{TOUR.map((shot, index) => (
						<button
							key={shot.title}
							type="button"
							role="tab"
							aria-selected={index === active}
							className={`${styles.tourTab} ${index === active ? styles.tourTabActive : ''}`}
							onClick={() => setActive(index)}>
							{shot.title}
						</button>
					))}
				</div>
				<figure className={styles.tourStage} data-reveal>
					<div className={styles.tourChrome} aria-hidden="true"><span /><span /><span /></div>
					{TOUR.map((shot, index) => (
						<img
							key={shot.title}
							className={styles.tourImage}
							hidden={index !== active}
							src={shot.src}
							alt={shot.alt}
							width={2000}
							height={1234}
						/>
					))}
				</figure>
				<p className={styles.tourCaption}>
					<strong>{TOUR[active].title}.</strong> {TOUR[active].caption}
				</p>
			</div>
		</section>
	);
}

/* ── Module catalogue preview ── */

/** The modules a hospital asks about first, in the order they come up in a demo. */
const HIGHLIGHT_CODES: readonly string[] = [
	'REGISTRATION', 'APPOINTMENT', 'OPD', 'IPD',
	'BED_MANAGEMENT', 'NURSING', 'OT', 'EMERGENCY',
	'LABORATORY', 'RADIOLOGY', 'PHARMACY', 'BLOOD_BANK',
	'BILLING', 'DISCHARGE', 'ACCOUNTS', 'HR_PAYROLL',
];

function ModulesPreview() {
	const byCode = new Map(HIMS_MODULES.map((m) => [m.code, m]));
	const highlights = HIGHLIGHT_CODES.map((code) => byCode.get(code)).filter(Boolean);

	return (
		<section className={styles.modulesPreview}>
			<div className={styles.container}>
				<div className={styles.journeyHead} data-reveal>
					<div className={styles.sectionLabel}>Hospital features</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Core workflows, connected in one HIMS.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Ciyex HIMS includes features for the front desk, care teams, diagnostics and
						administration. Choose the areas your hospital uses and expand as needs change.
					</p>
				</div>
				<div className={styles.moduleGrid} data-reveal>
					{highlights.map((module) => (
						<div key={module!.code} className={styles.moduleCard}>
							<span className={styles.moduleCardIcon}>
								<HimsIcon name={module!.icon} size={24} />
							</span>
							<h3 className={styles.moduleCardName}>{module!.name}</h3>
							<p className={styles.moduleCardSummary}>{module!.summary}</p>
						</div>
					))}
				</div>
				<div className={styles.centerCta}>
					<Link className={styles.btnGhost} to="/modules">
						Explore all hospital workflows
					</Link>
				</div>
			</div>
		</section>
	);
}

/* ── ABDM ── */

function AbdmSection() {
	return (
		<section className={styles.abdm}>
			<div className={styles.abdmInner}>
				<div>
					<div className={styles.sectionLabel}>Ayushman Bharat Digital Mission</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Configure your ABDM<br />connection in HIMS.
					</Heading>
					<p className={styles.abdmDesc}>
						Set up the hospital’s ABDM gateway details inside Ciyex HIMS. An administrator
						can select the sandbox or production environment and check connectivity from
						the application, with credentials managed in the hospital configuration.
					</p>
					<ul className={styles.abdmList}>
						<li>Sandbox and production environments, switched per hospital</li>
						<li>HIP ID, facility name and callback URL configured in the app</li>
						<li>Client credentials encrypted at rest and never shown back</li>
						<li>Session tokens and the ABHA public key handled for you</li>
						<li>Health Facility Registry bridge registration tracked per facility</li>
					</ul>
					<p className={styles.abdmNote}>
						Gateway configuration and connection checks are available today. ABHA
						enrolment, verification and Scan &amp; Share are in development; ask us during a
						demo for the latest status of each workflow.
					</p>
					<Link className={styles.btnPrimary} to="/signup">
						Talk to us about ABDM
					</Link>
				</div>
				<div className={styles.abdmPanel} data-reveal>
					<div className={styles.abdmPanelHead}>
						<span>ABDM Integration</span>
						<span className={styles.abdmPill}>Active</span>
					</div>
					<div className={styles.abdmRow}>
						<span className={styles.abdmKey}>Environment</span>
						<span className={styles.abdmValue}>Production</span>
					</div>
					<div className={styles.abdmRow}>
						<span className={styles.abdmKey}>HIP ID</span>
						<span className={styles.abdmValue}>IN0210000123</span>
					</div>
					<div className={styles.abdmRow}>
						<span className={styles.abdmKey}>Facility</span>
						<span className={styles.abdmValue}>Coimbatore Unit</span>
					</div>
					<div className={styles.abdmRow}>
						<span className={styles.abdmKey}>Client secret</span>
						<span className={styles.abdmValue}>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
					</div>
					<div className={styles.abdmRow}>
						<span className={styles.abdmKey}>Bridge registered</span>
						<span className={styles.abdmValue}>Yes</span>
					</div>
					<div className={styles.abdmStatus}>
						<span className={styles.abdmDot} />
						Test Connection succeeded &mdash; gateway responded in 412&nbsp;ms
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── Capabilities ── */

const CAPABILITIES: readonly { title: string; desc: string }[] = [
	{
		title: 'Features configured around your hospital',
		desc: 'Configure the workflows your teams use. Staff see the areas relevant to their roles in the workspace.',
	},
	{
		title: 'More than one unit',
		desc: 'Branches and units under one login, each with its own GSTIN, drug licence, tariffs and number series. Report on one or on all of them.',
	},
	{
		title: 'Unlimited users',
		desc: 'Add every receptionist, nurse and technician you need. Access is controlled by role and permission, not by how many licences you bought.',
	},
	{
		title: 'Indian formats throughout',
		desc: '₹ currency with Indian grouping (12,34,567.00), dd/MM/yyyy dates, Asia/Kolkata time and a financial year that starts in April.',
	},
	{
		title: 'GST on the bill',
		desc: 'Tax rates on your service master, GST applied at billing, and receipts, advances and refunds that reconcile at day end.',
	},
	{
		title: 'Your own number series',
		desc: 'UHID, IP number, bill and receipt numbering follow the pattern your hospital already uses, including financial-year tokens.',
	},
	{
		title: 'Machines on the network',
		desc: 'Lab analysers over HL7 and modalities over DICOM, with a worklist pushed to the machine and results that come back on their own.',
	},
	{
		title: 'FHIR R4 native',
		desc: 'The clinical record is FHIR R4 underneath, so anything you or a partner builds later talks to a documented standard rather than a private table.',
	},
	{
		title: 'Desktop workspace',
		desc: 'Ciyex Workspace is a real desktop application for Windows, macOS and Linux — fast on the hardware a hospital already owns.',
	},
	{
		title: 'Print what you have to produce',
		desc: 'Bills, receipts, discharge summaries, lab and radiology reports and registers, printed or saved as PDF.',
	},
	{
		title: 'SMS and email built in',
		desc: 'Appointment reminders, report-ready notices and intake forms sent from the hospital’s own sender, per branch.',
	},
	{
		title: 'Cloud or your own server',
		desc: 'Hosted by us, or deployed on hardware inside the hospital. Same software either way, and your data stays yours.',
	},
];

function CapabilitiesSection() {
	return (
		<section className={styles.capabilities}>
			<div className={styles.container}>
				<div className={styles.capHead} data-reveal>
					<div className={styles.sectionLabel}>Designed for hospital operations</div>
					<Heading as="h2" className={styles.sectionTitle}>
						A practical fit for your hospital.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Explore the Indian workflows, flexible deployment and connected departments
						that matter when choosing a hospital information system.
					</p>
				</div>
				<div className={styles.capGrid} data-reveal>
					{CAPABILITIES.map((cap) => (
						<div key={cap.title} className={styles.capItem}>
							<h3 className={styles.capTitle}>{cap.title}</h3>
							<p className={styles.capDesc}>{cap.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Workspace ── */

function WorkspaceSection() {
	return (
		<section className={styles.workspace}>
			<div className={styles.workspaceInner}>
				<div>
					<div className={styles.sectionLabel}>Ciyex Workspace</div>
					<Heading as="h2" className={styles.sectionTitle}>
						One workspace<br />for the hospital day.
					</Heading>
					<p className={styles.workspaceDesc}>
						Ciyex Workspace brings the queue, patient chart, ward and billing workflows
						into one desktop application. Teams can work across the features configured
						for their hospital from a single workspace.
					</p>
					<Link className={styles.btnGhost} to="/workspace">
						Explore Ciyex Workspace
					</Link>
				</div>
				<div className={styles.mockupWindow} data-reveal>
					<div className={styles.mockupBar}>
						<span className={styles.dot} style={{ background: '#ff5f57' }} />
						<span className={styles.dot} style={{ background: '#febc2e' }} />
						<span className={styles.dot} style={{ background: '#28c840' }} />
						<span className={styles.mockupTitle}>Ciyex Workspace &mdash; Schedule</span>
					</div>
					<img
						src="/en-in/img/workspace-schedule.png"
						alt="Ciyex Workspace desktop client showing the HIMS schedule view"
						className={styles.screenshotImg}
					/>
				</div>
			</div>
		</section>
	);
}

/* ── FAQ ── */

const FAQ: readonly { q: string; a: string }[] = [
	{
		q: 'Can Ciyex HIMS run more than one hospital or branch?',
		a: 'Yes. Branches and units sit under one login, each with its own GSTIN, drug licence, registration details, tariffs and number series. Masters can be shared or kept per facility, and reports run for one unit or across all of them.',
	},
	{
		q: 'Can we choose which features to use?',
		a: 'Yes. Ciyex HIMS can be configured around your hospital’s departments and workflows. A polyclinic may prioritise registration, appointments, OPD, pharmacy and billing; a larger hospital may also need wards, theatre, blood bank and payroll.',
	},
	{
		q: 'Is it billed per user?',
		a: 'No. Add as many users as the hospital needs. Access is governed by roles and permissions rather than by licence count, so a night receptionist does not cost extra.',
	},
	{
		q: 'Is Ciyex HIMS ABDM compliant?',
		a: 'Ciyex includes configurable ABDM gateway connectivity: your administrator sets the hospital’s credentials, chooses sandbox or production, and checks the connection from inside the app. ABHA enrolment, verification and Scan & Share are in development; ask us on the demo to confirm what is currently available.',
	},
	{
		q: 'Can we host it ourselves?',
		a: 'Yes. Ciyex runs as a managed cloud deployment or on hardware inside the hospital. It is the same software in both cases, and there is no per-patient fee and no lock-in on your data.',
	},
	{
		q: 'Will it talk to our lab analysers and imaging machines?',
		a: 'Lab analysers connect over HL7 and imaging modalities over DICOM, with a worklist pushed to the machine and results and images returning against the right order. There is a message log so an interface can be debugged rather than guessed at.',
	},
	{
		q: 'What about our existing patient data?',
		a: 'Patient master, visit history and outstanding balances can be migrated as part of the implementation. We will scope it with you against your current export before anything is committed.',
	},
	{
		q: 'How long does implementation take?',
		a: 'It depends on the features and workflows in scope and how much history is migrated. We review your requirements and provide an implementation timeline after the demo.',
	},
];

function FaqSection() {
	return (
		<section className={styles.faq}>
			<div className={styles.container}>
				<div className={styles.faqHead} data-reveal>
					<div className={styles.sectionLabel}>FAQ</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Questions hospitals ask us.
					</Heading>
				</div>
				<div className={styles.faqList} data-reveal>
					{FAQ.map((item) => (
						<details key={item.q} className={styles.faqItem}>
							<summary>{item.q}</summary>
							<p className={styles.faqAnswer}>{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Closing CTA ── */

function CtaSection() {
	return (
		<section className={styles.cta}>
			<div className={styles.container}>
				<Heading as="h2" className={styles.ctaTitle}>
					See it on your own hospital.
				</Heading>
				<p className={styles.ctaDesc}>
					Book a demo and we will walk your team through registration to final bill using
					your wards, your tariffs and your number series — not a canned dataset.
				</p>
				<div className={styles.heroCta}>
					<Link className={styles.btnPrimary} to="/signup">
						Schedule a free demo
					</Link>
					<Link className={styles.btnGhost} to="/modules">
						Explore features
					</Link>
				</div>
			</div>
		</section>
	);
}

export default function Home(): ReactNode {
	return (
		<Layout
			title="Hospital Management Software in India"
			description="Ciyex HIMS is a complete hospital information management system for Indian hospitals and clinics — registration and UHID, OPD, IPD, wards, theatre, laboratory, radiology, pharmacy, blood bank, GST billing, discharge and payroll, with ABDM connectivity built in.">
			<Head>
				<link rel="alternate" hrefLang="en-us" href="https://ciyex.org/" />
				<link rel="alternate" hrefLang="en-in" href="https://ciyex.org/en-in/" />
			</Head>
			<main className={styles.page}>
				<Hero />
				<JourneySection />
				<ProductTour />
				<ModulesPreview />
				<AbdmSection />
				<CapabilitiesSection />
				<WorkspaceSection />
				<FaqSection />
				<CtaSection />
			</main>
		</Layout>
	);
}
