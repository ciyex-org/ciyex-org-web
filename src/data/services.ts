/**
 * The US professional services catalogue.
 *
 * <p>Grouped by where the work sits in a clinic's day. `live` entries are what
 * we deliver today. Everything in `planned` comes from the expansion plan
 * and must stay out of the navbar and the home page until it can be delivered:
 * move an entry to `live` only when it can be sold.
 */

export interface Service {
	readonly name: string;
	readonly slug: string;
	readonly summary: string;
}

export interface ServiceGroup {
	readonly id: string;
	readonly label: string;
	readonly blurb: string;
	readonly live: readonly Service[];
	readonly planned: readonly Service[];
}

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
	{
		id: 'revenue-cycle',
		label: 'Revenue cycle',
		blurb: 'From the claim going out to the money coming in.',
		live: [
			{ name: 'Medical billing', slug: 'medical-billing', summary: 'Claim submission through appeals and payment processing.' },
			{ name: 'Dental billing', slug: 'dental-billing', summary: 'Full dental billing, including insurance A/R follow-up.' },
			{ name: 'Ambulance and EMS billing', slug: 'ambulance-ems-billing', summary: 'Transport coding, trip report matching, denials and A/R.' },
			{ name: 'Home health billing', slug: 'home-health-billing', summary: 'Billing for authorization-heavy home health plans.' },
			{ name: 'Patient billing', slug: 'patient-billing', summary: 'Clear statements and payment posting.' },
			{ name: 'Insurance verification', slug: 'insurance-verification', summary: 'Coverage and benefits checked before the visit.' },
			{ name: 'Prior authorization', slug: 'prior-authorization', summary: 'Submitting, tracking and following up on prior auths.' },
			{ name: 'Denial management and appeals', slug: 'denial-management', summary: 'Root-cause analysis, written appeals and corrected claims.' },
			{ name: 'Underpayment recovery', slug: 'underpayment-recovery', summary: 'Comparing paid amounts with contracted rates.' },
			{ name: 'Dental PPO fee schedule negotiation', slug: 'dental-ppo-negotiation', summary: 'Reviewing PPO mix and negotiating low-paying plans.' },
		],
		planned: [],
	},
	{
		id: 'specialty-billing',
		label: 'Specialty billing',
		blurb: 'Billing shaped around the rules of your specialty.',
		live: [
			{ name: 'Primary care billing', slug: 'primary-care-billing', summary: 'Office visits, preventive care and care management claims.' },
			{ name: 'Behavioral health billing', slug: 'behavioral-health-billing', summary: 'Therapy, psychiatry and authorization-heavy mental health claims.' },
			{ name: 'Cardiology billing', slug: 'cardiology-billing', summary: 'Diagnostic testing, procedures and prior authorization follow-up.' },
			{ name: 'Orthopedic billing', slug: 'orthopedic-billing', summary: 'Surgical global periods, implants, imaging and injections.' },
			{ name: 'OB-GYN billing', slug: 'ob-gyn-billing', summary: 'Global maternity care, gynecology visits and procedures.' },
			{ name: 'Dermatology billing', slug: 'dermatology-billing', summary: 'Lesion procedures, pathology and same-day visit modifiers.' },
			{ name: 'Gastroenterology billing', slug: 'gastroenterology-billing', summary: 'Endoscopy, screening versus diagnostic claims and pathology.' },
			{ name: 'Physical therapy billing', slug: 'physical-therapy-billing', summary: 'Timed units, plan-of-care certification and visit limits.' },
		],
		planned: [],
	},
	{
		id: 'documentation-coding',
		label: 'Documentation and coding',
		blurb: 'Accurate notes and codes, so claims start right.',
		live: [
			{ name: 'Medical coding', slug: 'medical-coding', summary: 'Certified coders for outpatient and inpatient work.' },
			{ name: 'Medical scribes', slug: 'medical-scribes', summary: 'Onsite or virtual scribes working in your EHR.' },
			{ name: 'Transcription', slug: 'transcription', summary: 'Spoken audio turned into organized written records.' },
			{ name: 'SOAP notes', slug: 'soap-notes', summary: 'Structured clinical documentation.' },
			{ name: 'Coding audits and CDI', slug: 'coding-audits-cdi', summary: 'Chart audits, documentation improvement and HCC coding.' },
		],
		planned: [],
	},
	{
		id: 'practice-readiness',
		label: 'Practice readiness',
		blurb: 'Credentials, audits and the running of the practice.',
		live: [
			{ name: 'Virtual assistants', slug: 'virtual-assistant', summary: 'Remote staff who work in your EHR, phones and inbox.' },
			{ name: 'Physician credentialing', slug: 'physician-credentialing', summary: 'Applications, document management and renewal tracking.' },
			{ name: 'MD Audit Shield', slug: 'md-audit-shield', summary: 'Audit readiness and documentation support.' },
			{ name: 'Practice management', slug: 'practice-management', summary: 'Billing, coding and support services under one team.' },
			{ name: 'Payer enrollment and maintenance', slug: 'payer-enrollment', summary: 'Enrollment, revalidation and CAQH attestations.' },
			{ name: 'HIPAA Security Risk Analysis', slug: 'hipaa-risk-analysis', summary: 'Annual risk assessment, policies and staff training.' },
			{ name: 'MIPS reporting', slug: 'mips-reporting', summary: 'Quality measure tracking and submission to CMS.' },
			{ name: 'Exclusion screening', slug: 'exclusion-screening', summary: 'Monthly OIG and SAM checks on staff and vendors.' },
		],
		planned: [],
	},
	{
		id: 'patient-care-support',
		label: 'Patient care support',
		blurb: 'Keeping patients assessed, followed up and coming back.',
		live: [
			{ name: 'Patient assessment', slug: 'patient-assessment', summary: 'Insurance-billable mental health assessments.' },
			{ name: 'Well-care services', slug: 'well-care', summary: 'Preventive care coordination, outreach and follow-ups.' },
			{ name: 'Chronic care management', slug: 'chronic-care-management', summary: 'Monthly check-ins and care plans for chronic conditions.' },
			{ name: 'Remote patient monitoring', slug: 'remote-patient-monitoring', summary: 'Device setup, reading review and alerts to the provider.' },
			{ name: 'Annual wellness visits and recall', slug: 'annual-wellness-visits', summary: 'Outreach, questionnaires and scheduling.' },
		],
		planned: [],
	},
	{
		id: 'software-technology',
		label: 'Software and technology',
		blurb: 'Getting the EHR running and keeping it that way.',
		live: [
			{ name: 'Ciyex EHR implementation', slug: 'ciyex-ehr-implementation', summary: 'Setup, data migration, training and support.' },
			{ name: 'AI front office agent', slug: 'ai-front-office-agent', summary: 'A voice and text agent with a person as backup.' },
			{ name: 'Managed IT and cybersecurity', slug: 'managed-it-cybersecurity', summary: 'Backups, endpoint protection and help desk.' },
			{ name: 'Rural clinic support', slug: 'rural-clinic-support', summary: 'Hosted EHR, cost reports, enrollment help and grant writing.' },
		],
		planned: [],
	},
];

/** Shared category photography for the catalogue and every service detail page. */
export const SERVICE_GROUP_ART: Readonly<Record<string, { src: string; alt: string }>> = {
	'revenue-cycle': {
		src: '/img/services/medical-billing-team.jpg',
		alt: 'Billing specialist and clinician reviewing a claim workflow together',
	},
	'specialty-billing': {
		src: '/img/services/specialty-coding.jpg',
		alt: 'Clinician and coding specialist reviewing clinical documentation',
	},
	'documentation-coding': {
		src: '/img/services/specialty-coding.jpg',
		alt: 'Clinician and coding specialist reviewing clinical documentation',
	},
	'practice-readiness': {
		src: '/img/services/virtual-assistant.jpg',
		alt: 'Virtual assistant coordinating a practice calendar and office workflow',
	},
	'patient-care-support': {
		src: '/img/services/patient-care-coordination.jpg',
		alt: 'Nurse care coordinator reviewing a care plan with a patient',
	},
	'software-technology': {
		src: '/img/services/healthcare-technology-support.jpg',
		alt: 'Healthcare technology specialist and clinic lead planning a software workflow',
	},
};

/** The headline services, shown first in the navbar menu and the footer. */
export const PRIMARY_SERVICE_SLUGS: readonly string[] = ['medical-billing', 'dental-billing', 'virtual-assistant'];

export const serviceHref = (slug: string): string => `/services/${slug}`;

export const groupOfService = (slug: string): ServiceGroup | undefined =>
	SERVICE_GROUPS.find((group) => group.live.some((service) => service.slug === slug));

export const LIVE_SERVICE_COUNT = SERVICE_GROUPS.reduce((n, g) => n + g.live.length, 0);
