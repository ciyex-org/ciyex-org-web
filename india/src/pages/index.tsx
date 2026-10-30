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
							Hospital Information Management System &middot; India
						</div>
						<Heading as="h1" className={styles.heroTitle}>
							Run the whole hospital<br />
							<span className={styles.heroGradient}>on one system.</span>
						</Heading>
						<p className={styles.heroSubtitle}>
							Ciyex HIMS covers the hospital end to end — registration and the queue at the
							front desk, OPD, casualty, wards and theatre, lab, radiology, pharmacy and
							blood bank, through to the final bill, the day book and the discharge summary.
							One system, one patient file, one set of numbers at day end.
						</p>
						<div className={styles.heroCta}>
							<Link className={styles.btnPrimary} to="/signup">
								Schedule a free demo
							</Link>
							<Link className={styles.btnGhost} to="/modules">
								See all modules
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
						<figcaption><span /> A live look inside Ciyex HIMS</figcaption>
					</figure>
				</div>
				<div className={styles.statStrip}>
					<div className={styles.stat}>
						<span className={styles.statValue}>{HIMS_MODULES.length} modules</span>
						<span className={styles.statLabel}>Switch on only what you run</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statValue}>ABDM-ready</span>
						<span className={styles.statLabel}>Connects to the ABDM gateway</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statValue}>&#8377; &amp; GST</span>
						<span className={styles.statLabel}>Indian billing, formats and April FY</span>
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
						Built in the order a patient moves.
					</Heading>
					<p className={styles.sectionSubtitle}>
						A receptionist and a lab technician do not think in modules. So the software
						is laid out by where the work happens — and the sidebar your staff open every
						morning is the same list you see here.
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
		caption: 'What needs somebody today, the patient flow, and the day\'s money, refreshed live.',
		alt: 'Ciyex HIMS dashboard showing items needing attention, OPD visits, revenue and patient flow',
	},
	{
		title: 'Patients', src: '/en-in/img/hims/patients.webp',
		caption: 'Who came, who is new, and which follow-ups are overdue.',
		alt: 'Ciyex HIMS patients overview with visit counts, overdue follow-ups and an arrivals chart',
	},
	{
		title: 'Pharmacy', src: '/en-in/img/hims/pharmacy.webp',
		caption: 'The dispensing queue, counter sale, returns, stock and purchase from one desk.',
		alt: 'Ciyex HIMS pharmacy desk with the dispensing queue and the day\'s till. Patient details are obscured',
	},
	{
		title: 'Laboratory', src: '/en-in/img/hims/laboratory.webp',
		caption: 'Every test tracked from collection to the released report.',
		alt: 'Ciyex HIMS laboratory bench showing tests to collect, on the bench, to release and released',
	},
	{
		title: 'Reports', src: '/en-in/img/hims/reports.webp',
		caption: 'Patients, finance, pharmacy and diagnostics, department by department.',
		alt: 'Ciyex HIMS reports overview with cards for patients, finance, pharmacy and lab',
	},
	{
		title: 'Expenses', src: '/en-in/img/hims/expenses.webp',
		caption: 'Electricity, rent and equipment bills, with GST recorded on each one.',
		alt: 'Ciyex HIMS expenses screen with bill categories, the month\'s spend and payment modes',
	},
];

function ProductTour() {
	const [active, setActive] = useState(0);

	return (
		<section className={styles.tour}>
			<div className={styles.container}>
				<div className={styles.journeyHead} data-reveal>
					<div className={styles.sectionLabel}>Inside Ciyex HIMS</div>
					<Heading as="h2" className={styles.sectionTitle}>
						See the desks your staff will use.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Each department works from its own desk, and every desk reads from the same
						patient file. Figures shown are from a test hospital.
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
					<div className={styles.sectionLabel}>Modules</div>
					<Heading as="h2" className={styles.sectionTitle}>
						Everything a hospital runs on.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Every module below ships today. A hospital switches on the ones it runs and
						never sees the rest — a clinic with no theatre never gets an OT menu.
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
						See all {HIMS_MODULES.length} modules
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
						ABDM, configured<br />by your own team.
					</Heading>
					<p className={styles.abdmDesc}>
						ABDM connectivity is part of the product, not a custom project. Your
						administrator enters the hospital&rsquo;s credentials in Ciyex, picks sandbox or
						production, and presses Test Connection — the app authenticates against the
						live ABDM gateway and tells you straight away whether the hospital is
						talking to it.
					</p>
					<ul className={styles.abdmList}>
						<li>Sandbox and production environments, switched per hospital</li>
						<li>HIP ID, facility name and callback URL configured in the app</li>
						<li>Client credentials encrypted at rest and never shown back</li>
						<li>Session tokens and the ABHA public key handled for you</li>
						<li>Health Facility Registry bridge registration tracked per facility</li>
					</ul>
					<p className={styles.abdmNote}>
						Available today: gateway configuration, credential management and verified
						connectivity. ABHA enrolment, verification and Scan &amp; Share build on this
						foundation and are rolling out module by module — we will show you exactly
						where each one stands on the demo.
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
		title: 'Modules you switch on and off',
		desc: 'Turn a module on in Hospital Setup and it appears in the sidebar without a restart. Turn it off and the hospital stops seeing it.',
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
					<div className={styles.sectionLabel}>Why Ciyex</div>
					<Heading as="h2" className={styles.sectionTitle}>
						The things that decide it.
					</Heading>
					<p className={styles.sectionSubtitle}>
						Not a feature list for its own sake — these are the questions a hospital
						actually asks before it changes systems.
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
						One window for<br />the whole shift.
					</Heading>
					<p className={styles.workspaceDesc}>
						Your staff do not work in a browser tab that reloads between patients. Ciyex
						Workspace is a desktop application — the queue, the chart, the ward and the
						bill open side by side, and the sidebar shows only the modules your hospital
						has switched on.
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
		q: 'Do we have to take every module?',
		a: 'No. Every module is a switch. A polyclinic can run registration, appointments, OPD, pharmacy and billing and nothing else; a 300-bed hospital switches on wards, theatre, blood bank and payroll as it needs them. Staff only ever see the modules that are on.',
	},
	{
		q: 'Is it billed per user?',
		a: 'No. Add as many users as the hospital needs. Access is governed by roles and permissions rather than by licence count, so a night receptionist does not cost extra.',
	},
	{
		q: 'Is Ciyex HIMS ABDM compliant?',
		a: 'Ciyex ships ABDM connectivity as a configurable module: your administrator sets the hospital’s credentials, chooses sandbox or production, and verifies the connection against the live ABDM gateway from inside the app. ABHA enrolment, verification and Scan & Share are being released module by module on top of that foundation — ask us on the demo and we will show you exactly what is live.',
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
		a: 'It depends on how many modules you switch on and how much history is migrated. A single-unit clinic on the core modules goes live far faster than a multi-speciality hospital with theatre, blood bank and payroll. We give you a dated plan after the demo rather than a number on a web page.',
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
						Browse the modules
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
