import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import Threads from '@site/src/components/Threads';
import { SERVICE_GROUPS, serviceHref } from '@site/src/data/services';
import styles from './services.module.css';

const SPECIALTY_GROUPS = [
	{
		label: 'Primary and general care',
		items: ['Primary care', 'Family medicine', 'Internal medicine', 'Pediatrics', 'Geriatrics', 'Urgent care', 'Emergency medicine', 'Hospital medicine', 'Occupational medicine', 'Preventive medicine', 'Multi-specialty groups'],
	},
	{
		label: 'Medical specialties',
		items: ['Allergy and immunology', 'Anesthesiology', 'Cardiology', 'Cardiothoracic surgery', 'Colorectal surgery', 'Critical care', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'General surgery', 'Hematology', 'Infectious disease', 'Maternal-fetal medicine', 'Neonatology', 'Nephrology', 'Neurology', 'Neurosurgery', 'Obstetrics and gynecology', 'Oncology', 'Ophthalmology', 'Optometry', 'Orthopedics', 'Otolaryngology (ENT)', 'Pain management', 'Pathology', 'Physical medicine and rehabilitation', 'Plastic surgery', 'Podiatry', 'Pulmonology', 'Radiology', 'Rheumatology', 'Sleep medicine', 'Thoracic surgery', 'Transplant surgery', 'Urology', 'Vascular care', 'Wound care'],
	},
	{
		label: 'Behavioral health and therapy',
		items: ['Behavioral health', 'Psychiatry', 'Psychology', 'Mental health counseling', 'Substance use treatment', 'Addiction medicine', 'ABA therapy', 'Physical therapy', 'Occupational therapy', 'Speech therapy', 'Rehabilitation services', 'Chiropractic', 'Acupuncture'],
	},
	{
		label: 'Dental specialties and care settings',
		items: ['General dentistry', 'Pediatric dentistry', 'Oral and maxillofacial surgery', 'Orthodontics', 'Endodontics', 'Periodontics', 'Prosthodontics', 'Home health', 'Hospice and palliative care', 'Skilled nursing', 'Ambulance and EMS', 'Laboratory', 'Diagnostic imaging', 'Durable medical equipment', 'Ambulatory surgery centers', 'Rural health clinics', 'Community health centers', 'Telehealth'],
	},
];

const WORKFLOW = [
	{ number: '01', title: 'Understand your workflow', text: 'We start with your specialty, payer mix, current system, and the work that needs attention.' },
	{ number: '02', title: 'Agree on the scope', text: 'Define which queues we handle, what stays with your staff, and when clinical review or approval is needed.' },
	{ number: '03', title: 'Set up the handoff', text: 'Document the working process and required access. A business associate agreement is signed before any PHI is shared.' },
	{ number: '04', title: 'Work and review', text: 'Our team works the agreed tasks, records follow-up, and reviews open questions and priorities with your practice.' },
];

const FAQS = [
	{
		question: 'Do we need to switch to Ciyex EHR?',
		answer: 'No. Our billing and practice services work with Ciyex or your existing practice management system, based on the workflow and access you agree on.',
	},
	{
		question: 'Do you work with my specialty?',
		answer: 'We work with billing workflows across a broad range of specialties and care settings. Tell us your specialty, payer mix, and current process so we can confirm the right scope together.',
	},
	{
		question: 'Who is responsible for clinical documentation and claim approval?',
		answer: 'Your practice retains control of clinical documentation and final claim accuracy. Our team follows your records, coding guidance, and approval process; we do not change clinical facts to influence reimbursement.',
	},
	{
		question: 'How do you handle access to patient information?',
		answer: 'We agree on the workflow and access needed for the service. A business associate agreement is signed before any protected health information is shared. Please do not send patient information through this website.',
	},
	{
		question: 'Can you guarantee a collection rate or a specific result?',
		answer: 'No. Payment and turnaround depend on payer decisions, documentation, eligibility, timely review, and other factors. We focus on clear task ownership and documented follow-through, and we will discuss the measures that matter to your practice.',
	},
];

export default function Services(): ReactNode {
	return (
		<Layout
			title="Medical Billing, Dental Billing and Practice Services"
			description="Medical and dental billing, specialty billing, coding, virtual assistant, credentialing and practice services for US clinics.">
			<main className={styles.page}>
				<header className={styles.hero}>
					<Threads className={styles.threads} />
					<div className={styles.container}>
						<p className={styles.eyebrow}>Medical · Dental · Practice operations</p>
						<Heading as="h1" className={styles.title}>
							Billing services built around the way your practice works.
						</Heading>
						<p className={styles.lede}>
							Medical billing, dental billing, specialty billing and virtual assistance from a team that works in Ciyex or your existing practice system.
						</p>
						<div className={styles.heroActions}>
							<Link className={styles.button} to="/contact">Talk through your billing</Link>
							<a className={styles.secondaryButton} href="#specialties">Explore specialty billing</a>
						</div>
						<div className={styles.spotlight}>
							<Link className={styles.spotlightCard} to="/services/medical-billing">
								<img src="/img/services/medical-billing.jpg" alt="Medical billing coordinator reviewing an insurance claim" />
								<span><strong>Medical billing</strong><small>Claims, denials, posting and A/R follow-up</small></span>
							</Link>
							<Link className={styles.spotlightCard} to="/services/dental-billing">
								<img src="/img/services/dental-billing.jpg" alt="Dental office team reviewing insurance billing" />
								<span><strong>Dental billing</strong><small>Benefits, claims, attachments and insurance follow-up</small></span>
							</Link>
							<Link className={styles.spotlightCard} to="/services/virtual-assistant">
								<img src="/img/services/virtual-assistant.jpg" alt="Virtual assistant managing a practice calendar and office calls" />
								<span><strong>Virtual assistant</strong><small>Phones, inbox, scheduling and EHR tasks</small></span>
							</Link>
						</div>
						<div className={styles.trustRow}>
							<span>Works with your current system</span>
							<span>Responsibilities agreed upfront</span>
							<span>BAA before PHI access</span>
						</div>
					</div>
				</header>

				<section className={styles.detailSection}>
					<div className={styles.container}>
						<div className={styles.sectionIntro}>
							<p className={styles.eyebrow}>Revenue cycle management</p>
							<Heading as="h2" className={styles.sectionTitle}>Fewer loose ends between the visit and the payment.</Heading>
							<p>Billing is a chain of small decisions and follow-ups. A missed step early on can leave your team sorting out an avoidable rejection or an aging balance later. We help practices keep the work moving and know what needs their attention.</p>
						</div>
						<div className={styles.billingGrid}>
							<article id="medical-billing" className={styles.billingCard}>
								<span className={styles.cardKicker}>For medical practices</span>
								<Heading as="h3" className={styles.billingTitle}>Medical billing and revenue cycle</Heading>
								<p>From patient and coverage details through claim resolution, give each step a clear owner. The exact mix is shaped around your specialty, payer rules, and team workflow.</p>
								<ul>
									<li>Eligibility and benefit verification</li>
									<li>Charge review, coding and claim submission</li>
									<li>Payment and adjustment posting</li>
									<li>Rejection correction, denial follow-up and appeals</li>
									<li>A/R follow-up and underpayment review</li>
									<li>Prior authorization and payer enrollment</li>
								</ul>
							</article>
							<article id="dental-billing" className={styles.billingCard}>
								<span className={styles.cardKicker}>For dental offices</span>
								<Heading as="h3" className={styles.billingTitle}>Dental billing and insurance follow-up</Heading>
								<p>Connect the front-desk insurance workflow to claims and collections, with clear handoffs to the treating dentist whenever clinical review is needed.</p>
								<ul>
									<li>Eligibility, benefits and plan-limit review</li>
									<li>Dental claim preparation and submission</li>
									<li>Attachments, narratives and predeterminations</li>
									<li>Outstanding claim follow-up and denial appeals</li>
									<li>Insurance payment posting and reconciliation</li>
									<li>PPO fee schedule review and negotiation</li>
								</ul>
							</article>
						</div>
						<p className={styles.responsibilityNote}><strong>Clinical accuracy stays with your practice.</strong> Our team follows the treating provider’s documentation and approval process. We do not change clinical details or procedure descriptions to affect payment.</p>
					</div>
				</section>

				<section id="specialties" className={styles.specialtySection}>
					<div className={styles.container}>
						<div className={styles.sectionIntro}>
							<p className={styles.eyebrow}>Specialty billing</p>
							<Heading as="h2" className={styles.sectionTitle}>Medical billing for every specialty and care setting.</Heading>
							<p>Different specialties bring different codes, documentation, payer rules, and work queues. We shape the billing workflow around your services and payer mix. The list below highlights the range of specialties and care settings we support.</p>
						</div>
						<div className={styles.specialtyGrid}>
							{SPECIALTY_GROUPS.map((group) => (
								<section key={group.label} className={styles.specialtyCard}>
									<Heading as="h3" className={styles.specialtyTitle}>{group.label}</Heading>
									<div className={styles.specialtyTags}>
										{group.items.map((item) => <span key={item}>{item}</span>)}
									</div>
								</section>
							))}
						</div>
						<p className={styles.specialtyFoot}>Have a specialty or service setting that is not listed? The list is a guide, not a limit. <Link to="/contact">Talk with our team about your billing workflow.</Link></p>
					</div>
				</section>

				<section className={styles.detailSection}>
					<div className={styles.container}>
						<div className={styles.sectionIntro}>
							<p className={styles.eyebrow}>A clear start, then steady follow-through</p>
							<Heading as="h2" className={styles.sectionTitle}>How a service engagement begins.</Heading>
							<p>Every practice has different systems, staffing, and payer requirements. We start by understanding those details before we define the work.</p>
						</div>
						<ol className={styles.workflow}>
							{WORKFLOW.map((step) => (
								<li key={step.number}>
									<span>{step.number}</span>
									<Heading as="h3" className={styles.workflowTitle}>{step.title}</Heading>
									<p>{step.text}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section id="virtual-assistant" className={styles.virtualSection}>
					<div className={`${styles.container} ${styles.virtualInner}`}>
						<div>
							<p className={styles.eyebrow}>Practice operations</p>
							<Heading as="h2" className={styles.sectionTitle}>Virtual assistants for the work around the visit.</Heading>
							<p>Extend your front-office capacity with remote help for routine, nonclinical tasks. We agree on responsibilities, escalation paths, and what should always return to your in-office team.</p>
						</div>
						<ul className={styles.virtualList}>
							<li>Phone and inbox triage</li>
							<li>Appointment scheduling and reminders</li>
							<li>Referral and records coordination</li>
							<li>Routine EHR and practice-system tasks</li>
							<li>Follow-up queues and patient communications</li>
						</ul>
					</div>
				</section>

				<section className={styles.catalogue}>
					<div className={styles.container}>
						<div className={styles.sectionIntro}>
							<p className={styles.eyebrow}>Full service catalogue</p>
							<Heading as="h2" className={styles.sectionTitle}>Services for the whole practice workflow.</Heading>
							<p>Start with one need or combine services as your operation requires. We’ll identify the right responsibilities and handoffs together.</p>
						</div>
						<nav className={styles.jump} aria-label="Service groups">
							{SERVICE_GROUPS.map((group) => <a key={group.id} href={`#${group.id}`}>{group.label}</a>)}
						</nav>
						{SERVICE_GROUPS.map((group) => (
							<section key={group.id} id={group.id} className={styles.group}>
								<div className={styles.groupHead}>
									<Heading as="h3" className={styles.groupTitle}>{group.label}</Heading>
									<p>{group.blurb}</p>
								</div>
								<ul className={styles.list}>
									{group.live.map((service) => (
										<li key={service.name}>
											<Link className={styles.serviceLink} to={serviceHref(service.slug)}>
												<Heading as="h4" className={styles.name}>{service.name}</Heading>
												<p>{service.summary}</p>
											</Link>
										</li>
									))}
								</ul>
							</section>
						))}
					</div>
				</section>

				<section className={styles.faqSection}>
					<div className={`${styles.container} ${styles.faqLayout}`}>
						<div>
							<p className={styles.eyebrow}>Good to know</p>
							<Heading as="h2" className={styles.sectionTitle}>Questions practice owners ask.</Heading>
						</div>
						<div className={styles.faqList}>
							{FAQS.map((faq) => (
								<details key={faq.question}>
									<summary>{faq.question}</summary>
									<p>{faq.answer}</p>
								</details>
							))}
						</div>
					</div>
				</section>

				<section className={styles.closing}>
					<div className={styles.container}>
						<Heading as="h2" className={styles.closingTitle}>Let’s start with your biggest billing bottleneck.</Heading>
						<p>We’ll learn how your practice works, discuss the tasks you want help with, and outline a sensible next step.</p>
						<Link className={styles.button} to="/contact">Request a consultation</Link>
						<p className={styles.small}>Please do not send patient information through this site.</p>
					</div>
				</section>
			</main>
		</Layout>
	);
}
