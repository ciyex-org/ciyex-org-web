import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import Threads from '@site/src/components/Threads';
import { CONTACT } from '@site/src/data/contact';
import styles from './index.module.css';

/**
 * The US home page leads with services, with software as part of the wider offer.
 *
 * <p>Claims here are held to what is true today. Keep out scale numbers,
 * guaranteed rates and "HIPAA compliant" badges. Planned services must remain
 * clearly labeled until they are available.
 */

function Hero() {
	return (
		<section className={styles.hero}>
			<Threads className={styles.heroThreads} />
			<div className={styles.heroInner}>
				<div className={styles.heroCopy}>
					<p className={styles.eyebrow}>Medical · Dental · Practice operations</p>
					<Heading as="h1" className={styles.heroTitle}>
						Medical and dental billing that keeps work moving.
					</Heading>
					<p className={styles.heroLede}>
						Claims, coding, credentialing and virtual assistants—handled by a service team
						that understands clinic workflows.
					</p>
					<div className={styles.heroActions}>
						<Link className={styles.btnPrimary} to="/services/medical-billing">Medical billing services</Link>
						<Link className={styles.btnSecondary} to="/contact">Book a consultation</Link>
					</div>
					<p className={styles.quietLink}>Prefer to talk? Call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
				</div>
				<HeroServices />
			</div>
		</section>
	);
}

const HERO_SERVICES = [
	{
		name: 'Medical billing',
		detail: 'Claims, payment posting and follow-up',
		image: '/img/services/medical-billing.jpg',
		alt: 'Medical billing coordinator reviewing insurance claims',
		to: '/services/medical-billing',
	},
	{
		name: 'Dental billing',
		detail: 'Claims and insurance A/R follow-up',
		image: '/img/services/dental-billing.jpg',
		alt: 'Dental office administrator and dentist reviewing insurance billing',
		to: '/services/dental-billing',
	},
	{
		name: 'Virtual assistant',
		detail: 'Phones, inboxes and EHR workflows',
		image: '/img/services/virtual-assistant.jpg',
		alt: 'Remote virtual assistant managing a practice calendar and office calls',
		to: '/services/virtual-assistant',
	},
] as const;

function HeroServices() {
	return (
		<div className={styles.heroServices} aria-label="Featured services">
			<p className={styles.railLabel}>Services for your practice</p>
			<div className={styles.serviceRail}>
				{HERO_SERVICES.map((service, index) => (
					<Link
						key={service.name}
						className={styles.railCard}
						to={service.to}
						style={{ animationDelay: `${index * 120}ms` }}>
						<img src={service.image} alt={service.alt} loading={index === 0 ? 'eager' : 'lazy'} />
						<span className={styles.railCopy}>
							<span className={styles.railName}>{service.name}</span>
							<span className={styles.railDetail}>{service.detail}</span>
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}

const PROOF: readonly { label: string; value: string }[] = [
	{ label: 'License', value: 'AGPL-3.0' },
	{ label: 'Source code', value: 'Public on GitHub' },
	{ label: 'Data standard', value: 'FHIR R4' },
	{ label: 'Deployment', value: 'Cloud or self-hosted' },
];

function ProofStrip() {
	return (
		<section className={styles.proof} aria-label="What you can verify">
			<dl className={styles.proofGrid}>
				{PROOF.map((item) => (
					<div key={item.label} className={styles.proofItem}>
						<dt>{item.label}</dt>
						<dd>{item.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

const LEAKS: readonly { title: string; text: string; link: string; to: string }[] = [
	{
		title: 'Denied claims',
		text: 'Denied claims need investigation, correction, and follow-up. Without clear ownership, that work can stall.',
		link: 'Denial management', to: '/services/denial-management',
	},
	{
		title: 'Front-end errors',
		text: 'A missed eligibility check at the desk becomes a rejected claim weeks later.',
		link: 'Insurance verification', to: '/services/insurance-verification',
	},
	{
		title: 'Coding and documentation',
		text: 'What the note says decides what can be billed, so the two have to agree.',
		link: 'Medical coding', to: '/services/medical-coding',
	},
];

function Leaks() {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.head}>
					<p className={styles.eyebrow}>Revenue cycle</p>
					<Heading as="h2" className={styles.title}>
						A claim moves through several hands before it is paid.
					</Heading>
					<p className={styles.lede}>
						From eligibility and documentation to coding, submission and follow-up, each
						handoff shapes what happens next. We take on the steps you hand us and follow each one through.
					</p>
				</div>
				<div className={styles.leakGrid}>
					{LEAKS.map((leak, i) => (
						<article key={leak.title} className={styles.leak}>
							<span className={styles.leakIndex}>0{i + 1}</span>
							<Heading as="h3" className={styles.cardTitle}>{leak.title}</Heading>
							<p>{leak.text}</p>
							<Link to={leak.to}>{leak.link} &rarr;</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function Services() {
	const featured = [
		{
			title: 'Medical billing',
			text: 'We move claims from charge review through submission, payment posting, A/R follow-up and denial resolution.',
			items: ['Eligibility and claim preparation', 'Submission and payer follow-up', 'Denials, appeals and payment posting'],
			to: '/services/medical-billing',
		},
		{
			title: 'Dental billing',
			text: 'We handle the insurance work behind a healthy schedule, from benefit checks to claim attachments and outstanding balances.',
			items: ['Eligibility and benefit checks', 'Dental claims and attachments', 'A/R follow-up and PPO review'],
			to: '/services/dental-billing',
		},
		{
			title: 'Virtual assistant',
			text: 'Give routine front-office tasks a clear owner while your in-office team stays focused on patients.',
			items: ['Phone and inbox support', 'Scheduling and reminders', 'EHR and referral workflows'],
			to: '/services/virtual-assistant',
		},
	];
	const additional = [
		{ label: 'Coding, scribes and documentation', to: '/services#documentation-coding' },
		{ label: 'Credentialing and practice readiness', to: '/services#practice-readiness' },
		{ label: 'Patient care support', to: '/services#patient-care-support' },
	];

	return (
		<section className={`${styles.section} ${styles.tinted}`} id="practice-services">
			<div className={styles.container}>
				<div className={styles.head}>
					<p className={styles.eyebrow}>Services for medical and dental practices</p>
					<Heading as="h2" className={styles.title}>
						A team that follows the work through.
					</Heading>
					<p className={styles.lede}>
						Start with one service or hand us the whole cycle. We work in Ciyex or your existing practice system, with responsibilities agreed before work begins.
					</p>
				</div>
				<div className={styles.featuredServices}>
					{featured.map((service, index) => (
						<Link key={service.title} className={styles.featuredService} to={service.to}>
							<span className={styles.featuredIndex}>0{index + 1}</span>
							<Heading as="h3" className={styles.cardTitle}>{service.title}</Heading>
							<p>{service.text}</p>
							<ul>
								{service.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
							<span className={styles.cardArrow}>Explore service details <span aria-hidden="true">→</span></span>
						</Link>
					))}
				</div>
				<div className={styles.additionalServices}>
					<strong>More services</strong>
					{additional.map((item) => <Link key={item.label} to={item.to}>{item.label} <span aria-hidden="true">→</span></Link>)}
				</div>
				<div className={styles.center}>
					<Link className={styles.btnSecondary} to="/services#specialties">See specialty coverage and all services</Link>
				</div>
			</div>
		</section>
	);
}

const MODULES: readonly { name: string; text: string }[] = [
	{ name: 'Schedule', text: 'A shared calendar for every provider and location.' },
	{ name: 'Chart', text: 'Encounters, notes, medications, labs and history.' },
	{ name: 'Telehealth', text: 'Video visits that start from the appointment.' },
	{ name: 'Messaging', text: 'One place for staff and patient conversations.' },
];

function Software() {
	return (
		<section className={styles.section}>
			<div className={`${styles.container} ${styles.split}`}>
				<div>
					<p className={styles.eyebrow}>Software</p>
					<Heading as="h2" className={styles.title}>
						An open source EHR your clinic can actually run.
					</Heading>
					<p className={styles.lede}>
						Ciyex Workspace is the desktop client for the Ciyex EHR. Download it free, host
						it yourself, or have our team set it up. Revenue from our services helps fund its development.
					</p>
					<div className={styles.inlineActions}>
						<Link className={styles.btnSecondary} to="/workspace">Explore Workspace</Link>
						<Link className={styles.textLink} to="/docs/intro">Read the docs &rarr;</Link>
					</div>
				</div>
				<ul className={styles.moduleList}>
					{MODULES.map((module) => (
						<li key={module.name}>
							<strong>{module.name}</strong>
							<span>{module.text}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

const STEPS: readonly { who: string; title: string; text: string }[] = [
	{ who: 'Software', title: 'The visit is recorded', text: 'The schedule and chart hold what happened.' },
	{ who: 'Services', title: 'The claim goes out', text: 'Coders and billers turn the note into a claim.' },
	{ who: 'Services', title: 'Denials are followed up', text: 'Rejected claims are corrected and appealed.' },
	{ who: 'Services', title: 'Payments are posted', text: 'Patients get clear statements for what remains.' },
];

function Together() {
	return (
		<section className={styles.band}>
			<Threads className={styles.bandThreads} />
			<div className={styles.container}>
				<div className={styles.head}>
					<p className={styles.eyebrowBand}>How they work together</p>
					<Heading as="h2" className={styles.titleBand}>
						One thread from the front desk to the final payment.
					</Heading>
				</div>
				<ol className={styles.steps}>
					{STEPS.map((step) => (
						<li key={step.title} className={styles.step}>
							<span className={styles.stepWho}>{step.who}</span>
							<Heading as="h3" className={styles.stepTitle}>{step.title}</Heading>
							<p>{step.text}</p>
						</li>
					))}
				</ol>
				<p className={styles.bandNote}>
					Already on another EHR? Our scribes and billers work in your existing system.
				</p>
			</div>
		</section>
	);
}

const AUDIENCES: readonly { title: string; text: string; to: string }[] = [
	{
		title: 'Medical practices',
		text: 'Medical billing, coding and insurance follow-up for independent and multi-provider practices.',
		to: '/services/medical-billing',
	},
	{
		title: 'Dental practices',
		text: 'Dental billing and insurance follow-up from a dedicated team.',
		to: '/services/dental-billing',
	},
	{
		title: 'Community clinics',
		text: 'Billing and documentation services shaped around your care team and the patients you serve.',
			to: '/services',
	},
];

function WhoWeServe() {
	return (
		<section id="who-we-serve" className={`${styles.section} ${styles.tinted}`}>
			<div className={styles.container}>
				<div className={styles.head}>
					<p className={styles.eyebrow}>Who we serve</p>
					<Heading as="h2" className={styles.title}>Start from where you are.</Heading>
				</div>
				<div className={styles.audienceGrid}>
					{AUDIENCES.map((audience) => (
						<Link key={audience.title} className={styles.audience} to={audience.to}>
							<Heading as="h3" className={styles.cardTitle}>{audience.title}</Heading>
							<p>{audience.text}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

function OpenAndSecure() {
	return (
		<section className={styles.section}>
			<div className={`${styles.container} ${styles.twoUp}`}>
				<div className={styles.note}>
					<p className={styles.eyebrow}>Open by design</p>
					<Heading as="h2" className={styles.noteTitle}>Read the code before you trust it.</Heading>
					<p>
						The EHR is licensed under AGPL-3.0 and developed in public, so you can inspect
						it, host it yourself, and keep your data if you ever leave.
					</p>
					<a href="https://github.com/ciyex-org/ciyex">View the source on GitHub &rarr;</a>
				</div>
				<div className={styles.note}>
					<p className={styles.eyebrow}>Security and accountability</p>
					<Heading as="h2" className={styles.noteTitle}>Ask us who touches your data.</Heading>
					<p>
						No patient information changes hands before a business associate agreement is
						signed. We will tell you which teams work on your account, and where.
					</p>
					<Link to="/contact">Talk to our team &rarr;</Link>
				</div>
			</div>
		</section>
	);
}

function Closing() {
	return (
		<section className={styles.closing}>
			<Threads className={styles.bandThreads} />
			<div className={styles.closingInner}>
				<Heading as="h2" className={styles.titleBand}>
					Put a dedicated team behind your practice.
				</Heading>
				<p>Tell us about your billing or front-office workflow. We’ll show you where our team fits.</p>
				<div className={styles.heroActions}>
					<Link className={styles.btnPrimary} to="/contact">Request a consultation</Link>
					<Link className={styles.btnOnBand} to="/services">Explore all services</Link>
				</div>
				<p className={styles.closingPhone}>Or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
				<p className={styles.closingNote}>Please do not send patient information through this site.</p>
			</div>
		</section>
	);
}

export default function Home(): ReactNode {
	return (
		<Layout
			title="Healthcare Software and Services"
			description="Ciyex combines an open source EHR and desktop workspace with medical billing, coding, credentialing and scribe services.">
			<Head>
				<link rel="alternate" hrefLang="en-us" href="https://ciyex.org/" />
				<link rel="alternate" hrefLang="en-in" href="https://ciyex.org/en-in/" />
			</Head>
			<main className={styles.page}>
				<Hero />
				<Services />
				<Leaks />
				<Together />
				<WhoWeServe />
				<OpenAndSecure />
				<Software />
				<ProofStrip />
				<Closing />
			</main>
		</Layout>
	);
}
