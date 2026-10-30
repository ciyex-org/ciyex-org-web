export interface ServiceLandingSection {
	readonly title: string;
	readonly description: string;
	readonly items: readonly string[];
}

export interface ServiceLandingFAQ {
	readonly question: string;
	readonly answer: string;
}

export interface ServiceLandingData {
	readonly title: string;
	readonly description: string;
	readonly eyebrow: string;
	readonly heading: string;
	readonly lede: string;
	readonly image?: string;
	readonly imageAlt?: string;
	readonly pills?: readonly string[];
	readonly overview: string;
	readonly sections: readonly ServiceLandingSection[];
	readonly process: readonly { title: string; text: string }[];
	readonly responsibilityTitle?: string;
	readonly responsibility: string;
	readonly faqs: readonly ServiceLandingFAQ[];
	readonly specialtyLink?: boolean;
}

const BILLING_PROCESS = [
	{ title: 'Review the workflow', text: 'We learn your payers, billing system, current backlog and where this work stalls today.' },
	{ title: 'Set the scope', text: 'Agree on which queues we own, what stays with your staff and how exceptions come back to you.' },
	{ title: 'Start with secure access', text: 'Document the handoff and sign a business associate agreement before any PHI is shared.' },
	{ title: 'Work and review', text: 'We work the agreed queues, record each follow-up and review open items with your practice.' },
];

const CLINICAL_PROCESS = [
	{ title: 'Confirm the program', text: 'We review your patient population, billing providers, payer rules and current documentation.' },
	{ title: 'Set clinical boundaries', text: 'Your providers define protocols, escalation paths and what must always come back to them.' },
	{ title: 'Start with secure access', text: 'Agree on system access and sign a business associate agreement before any PHI is shared.' },
	{ title: 'Run and review', text: 'We work the agreed tasks, document each contact and review open items with your care team.' },
];

const TECH_PROCESS = [
	{ title: 'Assess what you have', text: 'We review your systems, users, data, vendors and the risks or gaps that matter most.' },
	{ title: 'Agree on the plan', text: 'Define scope, responsibilities, dates and who approves each change at your practice.' },
	{ title: 'Secure the access', text: 'Set up named access and sign a business associate agreement before any PHI is reachable.' },
	{ title: 'Deliver and maintain', text: 'We carry out the agreed work, record what changed and review what comes next with you.' },
];

export const SERVICE_LANDING: Record<string, ServiceLandingData> = {
	'medical-billing': {
		title: 'Medical Billing Services',
		description: 'Medical billing for practices across specialties, from claim preparation and submission through payment posting, A/R follow-up and denials.',
		eyebrow: 'Medical billing · Revenue cycle',
		heading: 'Medical billing that follows each claim through.',
		lede: 'Give your claims, payer follow-up and billing work a clear owner. We shape the service around your specialty, payer mix, current system and the tasks your staff wants help with.',
		image: '/img/services/medical-billing.jpg',
		imageAlt: 'Medical billing coordinator reviewing an insurance claim',
		overview: 'A complete billing workflow connects front-end details, accurate documentation, clean submission and persistent follow-up. We take on the full cycle or focus on the work queue that is putting the most pressure on your team.',
		sections: [
			{
				title: 'Prepare the claim',
				description: 'Catch missing information early and make sure the billing record is ready for the next step.',
				items: ['Eligibility and benefit verification', 'Prior authorization tracking', 'Charge review and coding', 'Claim edits and submission'],
			},
			{
				title: 'Work the payer response',
				description: 'Keep outstanding claims visible and move issues toward a clear next action.',
				items: ['Rejection correction and resubmission', 'Denial review and appeal preparation', 'Payer calls and documented follow-up', 'Underpayment and variance review'],
			},
			{
				title: 'Keep the account current',
				description: 'Connect payer payments and adjustments to the right account and flag unresolved balances.',
				items: ['ERA and EOB payment posting', 'Adjustment posting and reconciliation', 'A/R follow-up by agreed priority', 'Patient balance and statement workflows'],
			},
		],
		process: [
			{ title: 'Review the workflow', text: 'We learn your specialty, payer mix, billing system and where work is getting stuck.' },
			{ title: 'Set the scope', text: 'Agree on queues, responsibilities, approvals and how exceptions come back to your team.' },
			{ title: 'Start with secure access', text: 'Document the handoff and sign a business associate agreement before any PHI is shared.' },
			{ title: 'Work and review', text: 'Our team handles the agreed tasks and reviews open issues and priorities with your practice.' },
		],
		responsibility: 'Clinical documentation and final claim accuracy stay with the treating provider and practice. Our billing team follows your records and approval process, and brings questions back to the right person instead of changing clinical facts to influence payment.',
		faqs: [
			{ question: 'Can you work with our existing EHR or practice system?', answer: 'Yes. We deliver billing services in Ciyex or the practice system you already use, once the workflow, access and responsibilities are agreed.' },
			{ question: 'Which medical specialties do you work with?', answer: 'We work on billing workflows across medical specialties and care settings. See the specialty directory, then tell us your service mix and payer requirements so we can shape the right scope.' },
			{ question: 'Do you guarantee faster payment or a collection percentage?', answer: 'No. Payers, documentation, eligibility and timely clinical review all affect outcomes. We focus on the agreed billing work and documented follow-through, without promising a specific reimbursement result.' },
		],
		specialtyLink: true,
	},
	'dental-billing': {
		title: 'Dental Billing Services',
		description: 'Dental billing for benefit verification, claims, attachments, payment posting, A/R follow-up and denial appeals.',
		eyebrow: 'Dental billing · Insurance follow-up',
		heading: 'Dental billing that keeps claims moving after the visit.',
		lede: 'Connect benefit checks, claim preparation, attachments and insurance follow-up in one clear workflow, with your clinical team in control of treatment and final claim review.',
		image: '/img/services/dental-billing.jpg',
		imageAlt: 'Dental office team reviewing insurance billing together',
		overview: 'Dental insurance work spans plan details, frequencies, waiting periods, documentation and patient estimates. We help organize the administrative work around your office process and return clinical questions to the treating dentist.',
		sections: [
			{
				title: 'Before and around the visit',
				description: 'Give the front office better information for benefit conversations and claim readiness.',
				items: ['Eligibility and active coverage review', 'Benefits, deductibles and annual maximum checks', 'Frequency limits and waiting-period review', 'Predeterminations and patient estimates'],
			},
			{
				title: 'Claims and documentation',
				description: 'Prepare the administrative pieces that help a claim represent the care recorded by the dentist.',
				items: ['Dental claim preparation and submission', 'Narratives, X-rays and supporting attachments', 'Claim status tracking and payer follow-up', 'Denial review, correction and appeals'],
			},
			{
				title: 'Payments and plan economics',
				description: 'Keep payment information organized and give the practice a clearer view of insurance balances.',
				items: ['Insurance payment and adjustment posting', 'EOB review and reconciliation', 'Outstanding insurance A/R follow-up', 'PPO fee schedule review and negotiation'],
			},
		],
		process: [
			{ title: 'Map your office flow', text: 'We learn your practice system, payer mix, front-desk process and how clinical questions are reviewed.' },
			{ title: 'Agree on responsibilities', text: 'Set who verifies benefits, prepares claims, tracks outstanding items and approves clinical details.' },
			{ title: 'Set up the handoff', text: 'Document the workflow and required access. A business associate agreement is signed before PHI is shared.' },
			{ title: 'Follow claims through', text: 'Work the agreed queues, record payer follow-up and bring exceptions to your office team.' },
		],
		responsibility: 'The treating dentist remains responsible for assuring the accuracy of claims submitted on their behalf. Our team works from the clinical record and your office’s review process; procedure descriptions and clinical facts are never changed to influence reimbursement.',
		faqs: [
			{ question: 'Can you work in our dental practice management system?', answer: 'We work with your current system, based on its capabilities and the agreed access and workflow. You do not have to move to Ciyex to discuss dental billing support.' },
			{ question: 'Can you help with dental claim attachments?', answer: 'Yes. When it is in scope, we organize and submit supporting documentation such as narratives and X-rays, following your office’s clinical review process.' },
			{ question: 'Can you negotiate our PPO fees?', answer: 'As part of an agreed engagement, we review your PPO mix and work on fee schedule negotiation. Network participation and contract decisions remain with your practice.' },
		],
	},
	'virtual-assistant': {
		title: 'Virtual Assistant for Medical and Dental Practices',
		description: 'Remote virtual assistants for practice phones, inboxes, scheduling, referrals and routine EHR workflows.',
		eyebrow: 'Virtual assistant · Practice operations',
		heading: 'More room for patient care. Less front-office work left waiting.',
		lede: 'Add remote administrative help for routine, nonclinical practice tasks. We agree on the schedule, boundaries and escalation path with your team before work begins.',
		image: '/img/services/virtual-assistant.jpg',
		imageAlt: 'Virtual assistant managing a practice calendar and office calls',
		overview: 'A virtual assistant can take on defined administrative tasks that compete with the day’s patient-facing work. Your practice sets the service hours, scripts, access and decision boundaries; clinical decisions stay with your staff.',
		sections: [
			{
				title: 'Calls and messages',
				description: 'Help patients and other offices reach the right person through a consistent process.',
				items: ['Phone answering and message routing', 'Inbox monitoring and task assignment', 'Appointment confirmations and reminders', 'Escalation of urgent or clinical questions'],
			},
			{
				title: 'Scheduling and coordination',
				description: 'Keep routine coordination tasks moving between visits and across office teams.',
				items: ['Appointment scheduling and rescheduling', 'Referral follow-up and records coordination', 'Recall and follow-up outreach', 'Administrative forms and document organization'],
			},
			{
				title: 'EHR and front-office workflows',
				description: 'Handle defined administrative steps inside the tools and workflow your practice already uses.',
				items: ['Routine EHR updates and work queues', 'Patient intake task follow-up', 'Coordination with billing and office staff', 'Status notes and handoff to in-office team'],
			},
		],
		process: [
			{ title: 'Choose the tasks', text: 'Identify what can be handled remotely and which items must stay with your in-office team.' },
			{ title: 'Set hours and boundaries', text: 'Agree on coverage windows, scripts, escalation rules and how urgent messages are routed.' },
			{ title: 'Configure access', text: 'Define system access for the tasks. Sign a business associate agreement before any PHI is shared.' },
			{ title: 'Keep the handoff clear', text: 'Use agreed notes and escalation paths so your staff can see what was handled and what needs their attention.' },
		],
		responsibility: 'Virtual assistants perform administrative, nonclinical tasks. Your practice keeps control of clinical advice, triage decisions, treatment and patient care. Do not route emergency messages to a virtual assistant; your team should define and own the urgent-care escalation plan.',
		faqs: [
			{ question: 'What can a virtual assistant handle?', answer: 'Common tasks include calls, inboxes, scheduling, reminders, referral coordination, records requests and routine EHR updates. The exact list is defined with your practice.' },
			{ question: 'Can the assistant work in our current EHR?', answer: 'We review your existing EHR or practice tools first. Access, permissions and task boundaries are agreed before the assistant begins.' },
			{ question: 'Does the virtual assistant provide clinical advice?', answer: 'No. The service is administrative. Clinical questions and urgent situations are routed according to the escalation process your practice sets.' },
		],
	},
	'ambulance-ems-billing': {
		title: 'Ambulance and EMS Billing Services',
		description: 'Ambulance and EMS billing for transport coding, trip report review, medical necessity documentation, denials and A/R follow-up.',
		eyebrow: 'Ambulance and EMS billing · Revenue cycle',
		heading: 'Ambulance billing built around the trip report.',
		lede: 'Every transport claim depends on what the crew wrote. We match trip reports to billing details, code each run from the record and follow the claim until it closes.',
		overview: 'EMS billing turns on level of service, mileage, origin and destination, and documented medical necessity. We keep those details connected from the run report to the remittance, and send gaps back to your agency before a claim goes out.',
		sections: [
			{
				title: 'Review the run',
				description: 'Check that each transport has what the claim will need.',
				items: ['Trip report and dispatch record matching', 'Level of service review from crew documentation', 'Loaded mileage and origin-destination modifiers', 'Physician Certification Statement tracking'],
			},
			{
				title: 'File the claim',
				description: 'Send clean claims to the right payer the first time.',
				items: ['Medicare, Medicaid and commercial claim submission', 'Insurance discovery for missing coverage', 'Facility follow-up for patient details', 'Secondary claim filing'],
			},
			{
				title: 'Close the account',
				description: 'Keep every open transport moving toward a final balance.',
				items: ['Medical necessity denial appeals', 'Payment posting and reconciliation', 'A/R follow-up by payer and age', 'Patient statements under your policy'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Crews and your medical director own the patient care report. We code from what is documented and return incomplete runs to your agency. We do not rewrite a narrative or change a level of service to fit a payer.',
		faqs: [
			{ question: 'What happens when a Physician Certification Statement is missing?', answer: 'We flag the run, request the form from the sending facility and keep the claim on a tracked hold under the rules your payers apply.' },
			{ question: 'Do you work with both municipal and private EMS?', answer: 'Yes. We set the billing workflow around your agency type, payer mix, patient balance policy and run volume.' },
			{ question: 'Can you work with our ePCR system?', answer: 'We work from your ePCR exports or within your billing software once access and the handoff are agreed.' },
		],
	},
	'home-health-billing': {
		title: 'Home Health Billing Services',
		description: 'Home health billing for PDGM periods, Notices of Admission, authorizations, Medicare Advantage plans and A/R follow-up.',
		eyebrow: 'Home health billing · Revenue cycle',
		heading: 'Home health billing that stays ahead of the authorization.',
		lede: 'Home health claims can fail before the first bill drops. We track notices, authorizations, visits and documentation so each period is ready to bill on time.',
		overview: 'Home health work moves in periods of care, not single visits. We connect intake, the plan of care, visit counts and payer authorizations, then tell your agency what is holding each claim.',
		sections: [
			{
				title: 'Before the period starts',
				description: 'Set up each admission so the claim has a clean start.',
				items: ['Eligibility and episode overlap checks', 'Notice of Admission submission', 'Managed care authorization tracking', 'Face-to-face and referral document follow-up'],
			},
			{
				title: 'Before the claim drops',
				description: 'Hold claims only for reasons your team can see and fix.',
				items: ['Pre-bill review of visits and orders', 'Signed plan of care tracking', 'PDGM period and diagnosis checks', 'Authorized versus delivered visit review'],
			},
			{
				title: 'After submission',
				description: 'Work payer responses until each period is resolved.',
				items: ['Medicare and Medicare Advantage claim follow-up', 'Denial review and appeal preparation', 'Payment posting and reconciliation', 'A/R reporting by payer and period'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your clinicians own the assessment, OASIS, plan of care and visit notes. We bill from the signed record and return gaps to your agency. We do not alter clinical documentation to change a payment group.',
		faqs: [
			{ question: 'Do you handle Medicare Advantage home health plans?', answer: 'Yes. We track each plan’s authorization requirements, visit limits and renewal dates separately from your traditional Medicare work.' },
			{ question: 'Can you work in our home health software?', answer: 'We work in your agency system once access and responsibilities are agreed, so your intake and clinical teams keep their current process.' },
		],
	},
	'patient-billing': {
		title: 'Patient Billing Services',
		description: 'Patient billing for clear statements, balance questions, payment plans and accurate payment posting.',
		eyebrow: 'Patient billing · Revenue cycle',
		heading: 'Patient statements people can understand and pay.',
		lede: 'A confusing bill turns into a phone call, a delay or an unhappy patient. We send clear statements, answer balance questions and post payments to the right account.',
		overview: 'Patient balances are now a real part of practice revenue, and they need a different tone from payer follow-up. We check that insurance has finished before a statement goes out, then keep the conversation clear and respectful.',
		sections: [
			{
				title: 'Check the balance',
				description: 'Bill patients only for amounts that are ready to bill.',
				items: ['Insurance adjudication review', 'Patient responsibility checks against the EOB', 'Secondary coverage review', 'Hold rules for open disputes'],
			},
			{
				title: 'Send and explain',
				description: 'Give patients a plain statement and a person to ask.',
				items: ['Statement cycles on your schedule', 'Balance questions by phone and message', 'Payment plan setup under your policy', 'Reminders in the channels you approve'],
			},
			{
				title: 'Post and report',
				description: 'Keep balances accurate and visible to your office.',
				items: ['Patient payment posting', 'Refund and credit balance review', 'Aging reports by balance band', 'Accounts referred back for your decision'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Financial policy stays with your practice.',
		responsibility: 'You set discounts, payment plan terms, financial hardship rules and when an account is written off. We apply those rules and bring exceptions back to you. We do not act as a collection agency.',
		faqs: [
			{ question: 'Who do patients talk to?', answer: 'Patients reach our billing team through the phone or message route agreed with you, using the wording and escalation rules your practice approves.' },
			{ question: 'Do you send accounts to collections?', answer: 'No. We show you which accounts are past your policy. Whether to write off, keep working or refer an account is your decision.' },
		],
	},
	'insurance-verification': {
		title: 'Insurance Verification Services',
		description: 'Insurance eligibility and benefits verification before the visit, covering active coverage, deductibles, copays, referrals and network status.',
		eyebrow: 'Insurance verification · Front-end revenue cycle',
		heading: 'Know the coverage before the patient arrives.',
		lede: 'A wrong plan or missed referral at the front desk becomes a rejected claim weeks later. We check coverage ahead of the schedule and put the answer where your staff will see it.',
		overview: 'Verification only pays off if it happens early enough to act on. We work from your upcoming schedule, confirm the details each visit type needs and flag problems while your office can still call the patient.',
		sections: [
			{
				title: 'Confirm coverage',
				description: 'Check the plan on file is the one that will pay.',
				items: ['Active coverage and effective dates', 'Primary and secondary order', 'Plan type and network status', 'New insurance capture from the patient'],
			},
			{
				title: 'Confirm benefits',
				description: 'Give your staff the numbers behind patient conversations.',
				items: ['Deductible and out-of-pocket status', 'Copay and coinsurance amounts', 'Visit limits and service exclusions', 'Referral and authorization requirements'],
			},
			{
				title: 'Flag what needs action',
				description: 'Turn verification results into tasks before the visit.',
				items: ['Results recorded in your system', 'Same-day add-on checks by agreed cutoff', 'Inactive coverage alerts to the front desk', 'Handoff to prior authorization'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Benefit details reflect what the payer reports on the day and are not a promise of payment. Your practice decides how to handle patient estimates, financial conversations and whether to reschedule a visit.',
		faqs: [
			{ question: 'How far ahead do you verify?', answer: 'We agree a window around your schedule, specialty and appointment volume, with a cutoff for same-day and add-on patients.' },
			{ question: 'Where do the results go?', answer: 'We record results in your practice system or the agreed work queue, so the front desk does not need another tool.' },
		],
	},
	'prior-authorization': {
		title: 'Prior Authorization Services',
		description: 'Prior authorization submission, tracking and payer follow-up for procedures, imaging, medications and specialty referrals.',
		eyebrow: 'Prior authorization · Front-end revenue cycle',
		heading: 'Prior auths with an owner from request to decision.',
		lede: 'Authorizations eat staff hours and hold up care. We prepare each request from the chart, submit it, chase the payer and tell your team where it stands.',
		overview: 'Every payer has its own rules, forms and portals. We check whether a service needs authorization, assemble what the payer asks for from your records and keep every open request on one tracked list.',
		sections: [
			{
				title: 'Check and prepare',
				description: 'Find out what is needed before the visit is at risk.',
				items: ['Authorization requirement checks by payer', 'Clinical records gathered from the chart', 'Payer forms and portal entry', 'Missing documentation requests to your team'],
			},
			{
				title: 'Submit and follow up',
				description: 'Keep every request moving until the payer decides.',
				items: ['Portal, fax and phone submission', 'Status checks on an agreed cadence', 'Additional information requests', 'Approved units and date tracking'],
			},
			{
				title: 'Handle the decision',
				description: 'Make sure the outcome reaches the schedule and the claim.',
				items: ['Approval numbers recorded for billing', 'Denial notices routed to the provider', 'Peer-to-peer scheduling for your provider', 'Renewals tracked before they expire'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your providers decide what is medically necessary and speak to payers on peer-to-peer calls. We submit what the chart supports and ask your team when information is missing. We never add clinical detail to win an approval.',
		faqs: [
			{ question: 'Do you handle medication prior auths?', answer: 'Yes, once your prescribers and workflow are set up. Your provider remains the one who prescribes and attests to the clinical information.' },
			{ question: 'What if an authorization is denied?', answer: 'We send the decision and payer reason to your provider, schedule a peer-to-peer if you want one and prepare the appeal paperwork from the record.' },
		],
	},
	'denial-management': {
		title: 'Denial Management and Appeals Services',
		description: 'Denial management with root-cause review of CARC and RARC codes, corrected claims, written appeals and prevention feedback.',
		eyebrow: 'Denial management · Revenue cycle',
		heading: 'Work every denial, then fix why it happened.',
		lede: 'Denied claims stall when nobody owns them. We sort denials by cause and deadline, correct or appeal what the record supports, and show you the patterns behind them.',
		overview: 'A denial is both a claim to recover and a clue about the process. We read the CARC and RARC codes, confirm what really went wrong and decide the next step against your payer’s timely filing and appeal limits.',
		sections: [
			{
				title: 'Sort the denials',
				description: 'Put the work with the deadline or balance first.',
				items: ['CARC and RARC code review', 'Sorting by payer, reason and age', 'Timely filing and appeal deadline tracking', 'Priority rules agreed with your practice'],
			},
			{
				title: 'Resolve the claim',
				description: 'Choose the right path for each denial and document it.',
				items: ['Corrected claim submission', 'Written appeals with supporting records', 'Payer calls and reference numbers', 'Second-level appeal preparation'],
			},
			{
				title: 'Stop the repeat',
				description: 'Send the lesson back to the step that caused it.',
				items: ['Root-cause trends by payer and service', 'Front-desk and coding feedback', 'Payer rule changes shared with your team', 'Regular review of open denials'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'We appeal only what the medical record supports. Your providers keep responsibility for documentation and final claim accuracy, and questions about clinical facts come back to them.',
		faqs: [
			{ question: 'Will you take on an existing denial backlog?', answer: 'Yes. We review the backlog first, separate what is still within appeal limits and agree the order of work with you.' },
			{ question: 'Can you promise a recovery amount?', answer: 'No. Results depend on the payer, documentation and filing dates. We will tell you what is recoverable once we have seen the backlog.' },
		],
		specialtyLink: true,
	},
	'underpayment-recovery': {
		title: 'Underpayment Recovery Services',
		description: 'Underpayment recovery that compares paid amounts with contracted rates and follows up with payers on variances.',
		eyebrow: 'Underpayment recovery · Revenue cycle',
		heading: 'Find out whether payers paid what they agreed to.',
		lede: 'A paid claim is not always a correctly paid claim. We compare what came in with your contracted rates and take the differences back to the payer.',
		overview: 'Underpayments are easy to miss because the claim looks finished. We load your contract terms, review remittances against them and separate true payer errors from setup problems on your side.',
		sections: [
			{
				title: 'Build the baseline',
				description: 'Start from what each contract actually says.',
				items: ['Payer contract and fee schedule review', 'Expected amounts by code and modifier', 'Fee schedule update tracking', 'Contract gaps flagged for your team'],
			},
			{
				title: 'Compare the payments',
				description: 'Find the differences that are worth chasing.',
				items: ['ERA and EOB variance review', 'Multiple procedure and modifier checks', 'Patterns by payer and code', 'Low-dollar thresholds agreed with you'],
			},
			{
				title: 'Recover and report',
				description: 'Take clean evidence to the payer and track the answer.',
				items: ['Payer reconsideration requests', 'Follow-up with reference numbers', 'Variance reports for contract talks', 'Recovered and closed item tracking'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Contract decisions stay with your practice.',
		responsibility: 'Your practice holds the payer contracts and decides whether to dispute a pattern, renegotiate or accept it. Our work is limited to what those contracts and your remittances show, and legal disputes go to your own counsel.',
		faqs: [
			{ question: 'What do you need to start?', answer: 'Your current payer contracts, fee schedules and access to remittance data for the period you want reviewed.' },
			{ question: 'What if we do not have our contracts?', answer: 'We request fee schedules from payers with you and use actual payment history to spot likely variances until the contracts arrive.' },
		],
	},
	'dental-ppo-negotiation': {
		title: 'Dental PPO Fee Schedule Negotiation',
		description: 'Dental PPO fee schedule review and negotiation, including payer mix analysis, low-paying plan review and network decision data.',
		eyebrow: 'Dental PPO negotiation · Plan economics',
		heading: 'Know which PPO plans are worth keeping.',
		lede: 'Most offices never see how their PPO fees compare across plans. We show you what each plan pays on the procedures you actually do, then take your case to the low payers.',
		overview: 'A fee schedule only matters in relation to your procedure mix. We put your plans side by side, identify the ones holding you back and prepare the request for higher fees, while network decisions stay yours.',
		sections: [
			{
				title: 'See the numbers',
				description: 'Compare plans on what your office really produces.',
				items: ['Current fee schedule collection', 'PPO mix by patient and production', 'Plan comparison on top procedure codes', 'Write-off review by plan'],
			},
			{
				title: 'Make the request',
				description: 'Bring each plan a clear, documented case.',
				items: ['Target plans ranked by likely effect', 'Fee increase request preparation', 'Provider relations contact and follow-up', 'Response tracking by plan'],
			},
			{
				title: 'Put it to work',
				description: 'Make sure new terms actually reach your claims.',
				items: ['New fee schedule loading checks', 'First-payment review after a change', 'Network participation decision data', 'Periodic plan review'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Network decisions stay with your practice.',
		responsibility: 'You decide your fees, which plans to join or leave and how to communicate with patients. A plan is not obliged to accept a request, and contract terms should be reviewed with your own advisers before you sign.',
		faqs: [
			{ question: 'Will every plan raise our fees?', answer: 'No. Some plans will not move, and others respond only at set times. We tell you where a request is worth making and what we hear back.' },
			{ question: 'Do we have to drop a plan?', answer: 'No. Dropping a plan is one possible outcome. We give you the data on patients and production at stake so you can make that call.' },
		],
	},
	'medical-coding': {
		title: 'Medical Coding Services',
		description: 'Medical coding with certified coders for outpatient and inpatient work, covering CPT, ICD-10-CM, HCPCS and modifiers.',
		eyebrow: 'Medical coding · Documentation and coding',
		heading: 'Codes that match the note, every time.',
		lede: 'Certified coders review your documentation and assign the CPT, ICD-10-CM and HCPCS codes it supports, so claims go out accurate and your providers get clear feedback.',
		overview: 'Good coding starts with reading the note, not guessing from a charge sheet. We code outpatient and inpatient work from the signed record, query your providers when documentation is unclear and keep a steady turnaround.',
		sections: [
			{
				title: 'Code the encounter',
				description: 'Assign codes the documentation supports.',
				items: ['CPT, ICD-10-CM and HCPCS coding', 'E/M level review from the note', 'Modifier and bundling checks', 'Outpatient and inpatient work'],
			},
			{
				title: 'Check before billing',
				description: 'Catch problems while they are cheap to fix.',
				items: ['Payer and NCCI edit review', 'Charge review against documentation', 'Medical necessity diagnosis links', 'Coding holds with clear reasons'],
			},
			{
				title: 'Close the loop',
				description: 'Give providers answers they can use.',
				items: ['Provider queries for unclear notes', 'Feedback on recurring gaps', 'Annual code change updates', 'Coding notes your billers can follow'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Codes reflect what the treating provider documented. Your providers remain responsible for the record and final claim accuracy. We query them when a note is unclear and never code for a service that is not documented.',
		faqs: [
			{ question: 'Do you code from our EHR or from uploaded files?', answer: 'Either, based on your setup. We usually work directly in your EHR or coding queue once access is agreed.' },
			{ question: 'Can you take only part of our coding?', answer: 'Yes. We take one specialty, a backlog or overflow volume while your in-house coders handle the rest.' },
		],
		specialtyLink: true,
	},
	'medical-scribes': {
		title: 'Medical Scribe Services',
		description: 'Onsite and virtual medical scribes who document encounters in your EHR for provider review and signature.',
		eyebrow: 'Medical scribes · Documentation',
		heading: 'Finish the note before the day is over.',
		lede: 'Onsite or virtual scribes document the visit in your EHR as it happens, so your providers can face the patient and spend less of their evening charting.',
		overview: 'A scribe is only useful once they know how your provider works. We match each scribe to the provider’s specialty, note style and EHR templates, then keep the routine steady across clinic days.',
		sections: [
			{
				title: 'During the visit',
				description: 'Capture the encounter as the provider leads it.',
				items: ['History and exam dictated by the provider', 'Assessment and plan as stated', 'Orders and follow-ups queued for review', 'Onsite or secure virtual attendance'],
			},
			{
				title: 'Before sign-off',
				description: 'Hand the provider a draft that is ready to review.',
				items: ['Notes drafted in your EHR templates', 'Open items listed for the provider', 'Chart preparation before clinic', 'Same-day draft completion'],
			},
			{
				title: 'Keep it consistent',
				description: 'Make the scribe fit the provider, not the reverse.',
				items: ['Provider preference notes', 'Specialty and template onboarding', 'Backup coverage planning', 'Periodic documentation feedback'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'Scribes record what the provider says and does. They do not diagnose, give advice or act on orders independently. The provider reviews, edits and signs every note and stays responsible for its content.',
		faqs: [
			{ question: 'Do patients know a virtual scribe is listening?', answer: 'They should. We work with your practice to set up how patients are told and what happens if a patient prefers no scribe for a visit.' },
			{ question: 'How do you choose onsite or virtual?', answer: 'It depends on your room setup, connectivity and clinic schedule. We talk through both and start with the one that fits your providers.' },
		],
	},
	transcription: {
		title: 'Medical Transcription Services',
		description: 'Medical transcription that turns provider dictation and recorded audio into organized written records for review.',
		eyebrow: 'Transcription · Documentation',
		heading: 'Dictation turned into records your team can use.',
		lede: 'Send us recorded dictation and get organized, readable documents back in your preferred format, ready for your provider to review and sign.',
		overview: 'Providers who dictate should not have to change how they work. We take audio through a secure route, turn it into structured text using your templates and return it within the turnaround you agree.',
		sections: [
			{
				title: 'Receive the audio',
				description: 'Keep the handoff simple and secure.',
				items: ['Secure audio upload or dictation line', 'Encounter and visit notes', 'Consult letters and reports', 'Provider-specific instructions'],
			},
			{
				title: 'Build the document',
				description: 'Turn speech into a clear, structured record.',
				items: ['Formatting to your templates', 'Specialty terminology review', 'Unclear audio flagged, not guessed', 'Proofreading before return'],
			},
			{
				title: 'Return it',
				description: 'Put the finished text where your providers work.',
				items: ['Delivery to your EHR or document queue', 'Agreed turnaround by document type', 'Corrections from provider review', 'Priority handling for urgent items'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'A transcript reflects the provider’s dictation and is not final until the provider reviews and signs it. We mark anything we cannot hear clearly and leave clinical meaning to the provider.',
		faqs: [
			{ question: 'What audio can you work from?', answer: 'Dictation recordings from a phone line, handheld recorder or secure app. We agree the format and upload route when we set up your account.' },
			{ question: 'What happens if a word is unclear?', answer: 'We flag it in the document for the provider to confirm. We do not guess at medications, doses or findings.' },
		],
	},
	'soap-notes': {
		title: 'SOAP Note Documentation Services',
		description: 'SOAP note preparation in Subjective, Objective, Assessment and Plan format from provider input, for review and signature.',
		eyebrow: 'SOAP notes · Documentation',
		heading: 'Structured SOAP notes without the after-hours charting.',
		lede: 'We turn provider input into complete Subjective, Objective, Assessment and Plan notes in your templates, ready for the clinician to review and sign.',
		overview: 'Therapists, physicians and other clinicians share the same problem: the visit ends and the note is still waiting. We organize what the clinician gives us into a consistent structure, without adding anything they did not say.',
		sections: [
			{
				title: 'Gather the input',
				description: 'Work from the clinician’s own record of the visit.',
				items: ['Dictation or session summary', 'Intake and history in the chart', 'Prior note continuity', 'Template and format preferences'],
			},
			{
				title: 'Draft the note',
				description: 'Put each detail in the section where it belongs.',
				items: ['Subjective: reported concerns', 'Objective: findings and measures provided', 'Assessment as stated by the clinician', 'Plan and next steps as stated'],
			},
			{
				title: 'Finish the record',
				description: 'Get the draft signed and into the chart.',
				items: ['Draft delivered for clinician review', 'Edits made on request', 'Missing details flagged', 'Filing in your EHR'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'We organize what the clinician provides and do not form an assessment or plan. The clinician reviews, corrects and signs each note, and remains responsible for the record and any billing that relies on it.',
		faqs: [
			{ question: 'Which clinicians use this?', answer: 'Any clinician who documents in SOAP format, including therapy, behavioral health, chiropractic and primary care providers, based on the workflow we agree.' },
			{ question: 'Do you use AI to write the notes?', answer: 'Ask us how a note is produced for your account. We will explain the workflow and tools used, and PHI only goes through what your agreement covers.' },
		],
	},
	'coding-audits-cdi': {
		title: 'Coding Audits and CDI Services',
		description: 'Medical coding audits, clinical documentation improvement and HCC coding review with non-leading provider queries.',
		eyebrow: 'Coding audits and CDI · Documentation and coding',
		heading: 'Find coding and documentation risk before a payer does.',
		lede: 'We audit a sample of your charts, show where codes and notes disagree in both directions, and give your providers specific ways to document more clearly.',
		overview: 'An audit is only useful if it changes the next chart. We review against the code sets and payer rules that apply to you, report both over-coding and under-coding, and turn findings into education your providers can act on.',
		sections: [
			{
				title: 'Audit the charts',
				description: 'Test a defined sample against the record.',
				items: ['Provider and service-line chart sampling', 'E/M level and modifier review', 'Diagnosis specificity checks', 'Over-coding and under-coding findings'],
			},
			{
				title: 'Improve documentation',
				description: 'Help the note say what the provider actually means.',
				items: ['Non-leading provider queries', 'HCC diagnosis review against the note', 'Query templates and tracking', 'Documentation gaps by provider'],
			},
			{
				title: 'Act on the findings',
				description: 'Turn the report into changes that stick.',
				items: ['Written audit report', 'Provider education sessions', 'Follow-up audits on agreed topics', 'Issues needing refunds raised with your compliance lead'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Queries ask providers to clarify and never point them toward an answer that pays more. Only documented, supported diagnoses are reported. If an audit finds possible overpayments, your practice and its counsel decide how to respond.',
		faqs: [
			{ question: 'Is this a legal audit?', answer: 'No. It is a coding and documentation review. If you want privileged review of a sensitive issue, your attorney should direct that work.' },
			{ question: 'Do you only look for missed revenue?', answer: 'No. An honest audit reports errors in both directions, including codes the documentation does not support.' },
		],
		specialtyLink: true,
	},
	'physician-credentialing': {
		title: 'Physician Credentialing Services',
		description: 'Physician credentialing with application preparation, document management, CAQH profiles and renewal tracking.',
		eyebrow: 'Physician credentialing · Practice readiness',
		heading: 'Get providers ready to see patients and bill.',
		lede: 'Credentialing delays cost real visits. We gather the documents, complete the applications, follow up with payers and facilities, and track every expiry date for you.',
		overview: 'Credentialing is mostly detail and persistence. We build one complete file for each provider, keep it current and use it for every application so nobody has to hunt for the same document twice.',
		sections: [
			{
				title: 'Build the file',
				description: 'Start from one complete record per provider.',
				items: ['License, DEA and board certification records', 'Malpractice and work history', 'NPI and CAQH profile setup', 'Document storage with expiry dates'],
			},
			{
				title: 'Submit applications',
				description: 'Move each application until it is decided.',
				items: ['Payer credentialing applications', 'Hospital and facility privileges', 'Group and location additions', 'Payer status follow-up'],
			},
			{
				title: 'Stay current',
				description: 'Catch renewals before they interrupt billing.',
				items: ['License and DEA renewal reminders', 'Malpractice certificate updates', 'Recredentialing tracking', 'Status report for each provider'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Provider attestations stay with your practice.',
		responsibility: 'Each provider confirms and attests to their own information. We prepare and track the paperwork, but payers and facilities set their own timelines and make the final decision.',
		faqs: [
			{ question: 'How long does credentialing take?', answer: 'It varies by payer, state and application quality, and it is often measured in months. Start as early as you can before a provider’s first day.' },
			{ question: 'Can a new provider see patients before approval?', answer: 'That depends on the payer. We will tell you what each payer says about effective dates so you can plan the schedule.' },
		],
	},
	'md-audit-shield': {
		title: 'MD Audit Shield',
		description: 'MD Audit Shield gives medical practices audit readiness and documentation help before and during a payer records request.',
		eyebrow: 'MD Audit Shield · Practice readiness',
		heading: 'Be ready before the records request arrives.',
		lede: 'MD Audit Shield finds documentation weak spots early and gives your team an organized way to respond if a payer asks for records.',
		overview: 'A payer audit is stressful mostly because it arrives with a deadline and no plan. We work with your team on the documentation habits that matter ahead of time, and organize the response when a request lands.',
		sections: [
			{
				title: 'Prepare ahead',
				description: 'Find the weak spots while there is time to fix them.',
				items: ['Documentation readiness review', 'High-risk service and code checks', 'Signature and attestation gaps', 'Record retention checklist'],
			},
			{
				title: 'When a request arrives',
				description: 'Meet the deadline with a complete, organized file.',
				items: ['Audit letter review and deadline tracking', 'Requested record collection', 'Packet indexing and submission', 'Communication log with the payer'],
			},
			{
				title: 'Learn from the result',
				description: 'Use the outcome to protect the next claim.',
				items: ['Findings summary for your team', 'Appeal deadline tracking', 'Documentation education', 'Follow-up review of affected services'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Audit decisions stay with your practice.',
		responsibility: 'MD Audit Shield is administrative and documentation help, not legal representation or insurance against repayment. Records are never altered or back-dated. Any government investigation or fraud allegation should go straight to your attorney.',
		faqs: [
			{ question: 'Does this stop us from being audited?', answer: 'No. Payers choose who to audit. The goal is to be prepared and to answer a request completely and on time.' },
			{ question: 'Do you replace our healthcare attorney?', answer: 'No. We handle the documentation and logistics. Legal advice and representation stay with your attorney.' },
		],
	},
	'practice-management': {
		title: 'Practice Management Services',
		description: 'Practice management services that bring billing, coding, front-office and reporting work under one team.',
		eyebrow: 'Practice management · Practice readiness',
		heading: 'One team behind the business side of your practice.',
		lede: 'Stop juggling separate vendors for billing, coding and office tasks. We bring the work under one team, with one set of priorities and one view of how the practice is doing.',
		overview: 'Most practices grow into a patchwork of people, tools and vendors. We map who does what, close the gaps between them and give you a regular picture of the numbers that need a decision.',
		sections: [
			{
				title: 'Bring the work together',
				description: 'Give each recurring task one clear owner.',
				items: ['Billing and coding coordination', 'Front-office task ownership', 'Credentialing and enrollment tracking', 'Vendor and software coordination'],
			},
			{
				title: 'Run the routines',
				description: 'Keep the weekly and monthly work from slipping.',
				items: ['Standard procedures for common tasks', 'Staff task queues and handoffs', 'Fee schedule and payer updates', 'Month-end checklists'],
			},
			{
				title: 'See how it is going',
				description: 'Give the owner numbers worth acting on.',
				items: ['Collections and A/R reporting', 'Denial and aging trends', 'Schedule and no-show review', 'Regular review meetings'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Your practice stays yours.',
		responsibility: 'Owners keep control of clinical care, hiring, contracts and financial decisions. We carry out the agreed operational work and bring decisions to you. Clinical judgment is never part of our scope.',
		faqs: [
			{ question: 'Do we need to replace our office manager?', answer: 'No. We often work alongside an office manager, taking the billing and administrative load so they can run the day.' },
			{ question: 'Can we start with one service?', answer: 'Yes. Many practices start with billing, then add other functions once the handoffs are working.' },
		],
	},
	'payer-enrollment': {
		title: 'Payer Enrollment and Maintenance Services',
		description: 'Payer enrollment and maintenance including Medicare PECOS, CMS-855 forms, Medicaid, commercial plans, revalidation and CAQH attestations.',
		eyebrow: 'Payer enrollment · Practice readiness',
		heading: 'Stay enrolled, current and able to get paid.',
		lede: 'A missed revalidation can stop payments. We handle new enrollments, keep your Medicare, Medicaid and commercial records current, and attest CAQH on time.',
		overview: 'Enrollment does not end at approval. Addresses, tax details, groups and providers change, and each change has to reach every payer. We keep one record of your enrollments and work through updates as they happen.',
		sections: [
			{
				title: 'Enroll',
				description: 'Set up each provider and location with the right payers.',
				items: ['Medicare enrollment through PECOS and CMS-855 forms', 'State Medicaid applications', 'Commercial plan requests', 'Group and provider linkage'],
			},
			{
				title: 'Get paid correctly',
				description: 'Connect enrollment to the money.',
				items: ['EDI, ERA and EFT enrollment', 'Effective date checks', 'Roster and directory updates', 'Follow-up on stalled applications'],
			},
			{
				title: 'Keep it current',
				description: 'Handle changes before a payer finds them first.',
				items: ['Revalidation tracking and filing', 'CAQH reattestations', 'Address, ownership and tax ID changes', 'Enrollment status report by payer'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Attestations stay with your practice.',
		responsibility: 'Your authorized officials and providers review and sign what is filed, and they are responsible for its accuracy. Payers set the timelines and decide whether to approve, and ownership disclosures should be accurate and complete.',
		faqs: [
			{ question: 'How is this different from credentialing?', answer: 'Credentialing confirms a provider’s qualifications. Enrollment sets them up with a payer so claims can be billed and paid. The two usually run together.' },
			{ question: 'Can you fix an enrollment that has lapsed?', answer: 'Yes. We review what lapsed, what the payer needs and which dates can be restored. Some payers will not backdate, so we will tell you what to expect.' },
		],
	},
	'hipaa-risk-analysis': {
		title: 'HIPAA Security Risk Analysis Services',
		description: 'HIPAA Security Risk Analysis for medical and dental practices, with an annual risk assessment, policies, staff training and a remediation plan.',
		eyebrow: 'HIPAA Security Risk Analysis · Practice readiness',
		heading: 'A real risk analysis, not a form on a shelf.',
		lede: 'The HIPAA Security Rule expects you to assess risks to electronic PHI. We map where your data lives, score the risks, and give you a written plan to reduce them.',
		overview: 'Most small practices know they need a risk analysis but do not know where to begin. We walk through your systems, devices, vendors and habits, and leave you with documentation and a clear list of what to fix first.',
		pills: ['Plain findings, ranked by risk', 'Written documentation you keep', 'BAA before PHI access'],
		sections: [
			{
				title: 'Map the risk',
				description: 'Find every place electronic PHI lives and moves.',
				items: ['Systems, devices and data flow inventory', 'Vendor and business associate review', 'Threat and vulnerability assessment', 'Risk scoring by likelihood and impact'],
			},
			{
				title: 'Fix the gaps',
				description: 'Turn findings into a plan your team can finish.',
				items: ['Written risk management plan', 'Security policy templates for your practice', 'Priority fixes with owners and dates', 'Incident response outline'],
			},
			{
				title: 'Keep it alive',
				description: 'Keep the analysis current as the practice changes.',
				items: ['Annual risk assessment refresh', 'Staff security training', 'Training and sign-off records', 'Reviews after major system changes'],
			},
		],
		process: TECH_PROCESS,
		responsibilityTitle: 'Security decisions stay with your practice.',
		responsibility: 'A risk analysis is not a certification and it is not legal advice. Your practice decides how to address each risk, remains responsible for HIPAA obligations and should take legal questions to your counsel.',
		faqs: [
			{ question: 'Does this make us HIPAA certified?', answer: 'No. There is no official HIPAA certification. You get a documented analysis and a plan, and you remain responsible for carrying it out.' },
			{ question: 'Do we need this if our EHR is in the cloud?', answer: 'Yes. A vendor covers its own systems. Your devices, staff access, habits and other vendors remain part of your own analysis.' },
		],
	},
	'mips-reporting': {
		title: 'MIPS Reporting Services',
		description: 'MIPS reporting help with eligibility review, quality measure tracking and data submission to CMS.',
		eyebrow: 'MIPS reporting · Practice readiness',
		heading: 'Track MIPS through the year, not in the last week.',
		lede: 'We check how CMS has classified your clinicians, pick measures that fit your work, track performance through the year and submit your data before the deadline.',
		overview: 'MIPS goes wrong when it starts in December. We choose realistic measures with you early, watch the gaps as the year goes on and keep the documentation behind what you submit.',
		sections: [
			{
				title: 'Plan the year',
				description: 'Start from what CMS says applies to you.',
				items: ['Eligibility status review', 'Individual or group reporting choice', 'Quality measure selection', 'Exception and hardship review'],
			},
			{
				title: 'Track performance',
				description: 'Find gaps while there is time to close them.',
				items: ['Measure tracking from your EHR data', 'Promoting Interoperability measures', 'Improvement activity records', 'Gap lists for your care team'],
			},
			{
				title: 'Submit and keep proof',
				description: 'File on time and keep the evidence.',
				items: ['Data validation before filing', 'Submission to CMS', 'Performance feedback review', 'Supporting documents retained'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Reported data stays your responsibility.',
		responsibility: 'CMS sets eligibility, measures and scoring each year, and final scores and payment adjustments come from CMS. Your clinicians are responsible for the care and for the accuracy of the data submitted in their name.',
		faqs: [
			{ question: 'Do all clinicians have to report?', answer: 'No. CMS sets eligibility each year based on clinician type and volume. We check your status before planning any work.' },
			{ question: 'Can you promise a score?', answer: 'No. Your score depends on your performance data and CMS scoring rules. We work to submit complete, accurate data on time.' },
		],
	},
	'exclusion-screening': {
		title: 'OIG and SAM Exclusion Screening Services',
		description: 'Monthly OIG LEIE and SAM.gov exclusion screening for practice staff, providers and vendors, with documented results.',
		eyebrow: 'Exclusion screening · Practice readiness',
		heading: 'Monthly exclusion checks, documented every time.',
		lede: 'Employing or contracting with an excluded person can put federal program payments at risk. We screen your staff and vendors each month and keep the records.',
		overview: 'Exclusion screening is simple, repetitive and easy to miss. We keep your roster current, run the OIG and SAM.gov checks on schedule and follow up on any possible match so it does not sit unnoticed.',
		sections: [
			{
				title: 'Set up the roster',
				description: 'Know exactly who needs to be checked.',
				items: ['Employees and contracted clinicians', 'Vendors and entities', 'New hire checks before start dates', 'Roster updates from your office'],
			},
			{
				title: 'Screen each month',
				description: 'Run the same checks on a fixed schedule.',
				items: ['OIG List of Excluded Individuals and Entities', 'SAM.gov exclusions', 'State Medicaid lists where you require them', 'Monthly results log'],
			},
			{
				title: 'Handle possible matches',
				description: 'Resolve name matches quickly and carefully.',
				items: ['Identity details checked against the source', 'False positive documentation', 'Same-day notice to your contact', 'Retained records for your compliance file'],
			},
		],
		process: BILLING_PROCESS,
		responsibilityTitle: 'Employment decisions stay with your practice.',
		responsibility: 'We report what the sources show on the day we check. Your practice decides what to do about a confirmed match and should take questions about repayment or disclosure to your compliance lead or attorney.',
		faqs: [
			{ question: 'Why check every month?', answer: 'OIG updates its exclusion list monthly and recommends periodic checks, so a one-time check at hiring can miss someone added later.' },
			{ question: 'What do you need from us?', answer: 'A current roster with the identifying details needed to confirm a match. We agree on a secure way to exchange it.' },
		],
	},
	'patient-assessment': {
		title: 'Patient Assessment Services',
		description: 'Insurance-billable mental health assessment services coordinated with your clinicians, including standardized screening and results for provider review.',
		eyebrow: 'Patient assessment · Patient care',
		heading: 'Mental health assessments your care team can act on.',
		lede: 'We coordinate insurance-billable mental health assessments for your patients and send the results to your provider for review, follow-up and any treatment decision.',
		overview: 'Primary care teams often know a patient needs a closer look but lack the time. We organize who is eligible, how the assessment is delivered and how the result reaches the right clinician.',
		sections: [
			{
				title: 'Identify patients',
				description: 'Find who should be assessed under your criteria.',
				items: ['Eligibility and coverage checks', 'Patient lists from your criteria', 'Outreach and scheduling', 'Consent and forms'],
			},
			{
				title: 'Complete the assessment',
				description: 'Use a consistent, documented process.',
				items: ['Standardized screening tools you approve', 'Telehealth or in-office delivery', 'Secure capture of responses', 'Immediate safety concerns escalated'],
			},
			{
				title: 'Return the result',
				description: 'Make sure findings reach someone who can act.',
				items: ['Results sent to the treating provider', 'Documentation for the chart', 'Follow-up referral tracking', 'Billing preparation under payer rules'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'A screening result is not a diagnosis. Your licensed clinicians interpret results, make diagnoses, decide on treatment and sign what is billed. Payer coverage and billing rules vary, and patients in crisis follow your emergency protocol.',
		faqs: [
			{ question: 'Will insurance cover every assessment?', answer: 'No. Coverage depends on the plan, the service and medical necessity. We check benefits first and bill only what the record and payer rules support.' },
			{ question: 'What if a patient reports thoughts of self-harm?', answer: 'Your practice sets the safety protocol before we start, and any concern goes to your clinical team immediately under that protocol.' },
		],
	},
	'well-care': {
		title: 'Well-Care Coordination Services',
		description: 'Preventive and well-care coordination with patient outreach, care gap follow-up, appointment scheduling and reminders.',
		eyebrow: 'Well-care services · Patient care',
		heading: 'Bring patients back before care gaps grow.',
		lede: 'Your patients are due for screenings and check-ups, and nobody has time to call them. We find who is overdue, reach out and get them on your schedule.',
		overview: 'Preventive care depends on follow-through outside the visit. We work from your chart and quality lists, make the outreach personal and leave your providers with a fuller, better-prepared schedule.',
		sections: [
			{
				title: 'Find who is due',
				description: 'Build a working list from your own data.',
				items: ['Overdue well visits and screenings', 'Care gap lists from your EHR', 'Payer quality gap reports', 'Immunization and pediatric well-child recalls'],
			},
			{
				title: 'Reach out',
				description: 'Contact patients through approved channels.',
				items: ['Phone, text and letter outreach', 'Scripts your providers approve', 'Appointment scheduling', 'Reminders before the visit'],
			},
			{
				title: 'Close the gap',
				description: 'Make sure the outreach ends in a recorded result.',
				items: ['Referral and screening follow-up', 'Results recorded when received', 'Attempt history in the chart', 'Regular progress reports'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'Your providers decide which screenings each patient needs and what any result means. Outreach staff schedule and remind; they do not give medical advice, and clinical questions go to your care team.',
		faqs: [
			{ question: 'Who do patients think is calling?', answer: 'Outreach uses the script and caller identity agreed with your practice, so patients know the call relates to your office.' },
			{ question: 'Does this help with quality programs?', answer: 'It can. We work from the measures that matter to your payers, and we track closed gaps so your team can see progress.' },
		],
	},
	'chronic-care-management': {
		title: 'Chronic Care Management Services',
		description: 'Chronic care management with patient consent, comprehensive care plans, monthly check-ins and documented time under the billing practitioner.',
		eyebrow: 'Chronic care management · Patient care',
		heading: 'Monthly care between visits for patients who need it.',
		lede: 'Patients with chronic conditions need attention beyond the office visit. We work with your care team to run a monthly program of check-ins, care plans and the documentation Medicare expects.',
		overview: 'Chronic care management only works when it runs every month. We organize enrollment, consent, check-ins and time tracking under the direction of your billing practitioner, and keep the record ready for review.',
		sections: [
			{
				title: 'Enroll patients',
				description: 'Start with the right patients and a clear yes.',
				items: ['Eligible patient lists', 'Patient consent and documentation', 'Cost-sharing explained to the patient', 'Initiating visit tracking'],
			},
			{
				title: 'Run the month',
				description: 'Keep regular contact and a current plan.',
				items: ['Comprehensive care plan upkeep', 'Monthly check-in calls', 'Medication and appointment follow-up', 'Coordination with other providers'],
			},
			{
				title: 'Document and bill',
				description: 'Make each month’s work easy to verify.',
				items: ['Clinical staff time logs', 'Escalations to the provider', 'Monthly billing summary', 'Records ready for payer review'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'Chronic care management is billed by your practitioner, who oversees the care plan and supervision requirements. Patient consent, eligibility and clinical staff time must be documented, and clinical work is limited to appropriately qualified staff under your direction.',
		faqs: [
			{ question: 'Which patients qualify?', answer: 'Generally, patients with multiple chronic conditions expected to last at least a year who are at significant risk without management. Your provider makes the decision under current payer rules.' },
			{ question: 'Can a patient say no?', answer: 'Yes. Participation is voluntary and patients can stop. We explain the service and any cost-sharing before consent is recorded.' },
		],
	},
	'remote-patient-monitoring': {
		title: 'Remote Patient Monitoring Services',
		description: 'Remote patient monitoring with device setup, reading review, provider alerts and documentation for program billing rules.',
		eyebrow: 'Remote patient monitoring · Patient care',
		heading: 'See what happens to patients between visits.',
		lede: 'We help patients get connected devices working, review incoming readings against your rules and alert your provider when a reading needs attention.',
		overview: 'A monitoring program fails when patients stop using the device or readings pile up unseen. We handle setup, adherence follow-up and the daily review, so your team sees only what needs a clinical decision.',
		sections: [
			{
				title: 'Get patients started',
				description: 'Make setup simple for the patient.',
				items: ['Eligible patient lists from your provider', 'Consent and enrollment', 'Device setup and teaching', 'Coverage and cost-sharing review'],
			},
			{
				title: 'Watch the readings',
				description: 'Apply the thresholds your providers set.',
				items: ['Blood pressure, weight, glucose or oxygen data', 'Out-of-range alerts to your provider', 'Missed reading follow-up', 'Device troubleshooting'],
			},
			{
				title: 'Document the program',
				description: 'Keep what payers ask to see.',
				items: ['Device-day tracking', 'Interactive time logs', 'Patient contact notes', 'Monthly billing summary'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'Your provider orders monitoring, sets thresholds and makes all treatment decisions. This is not emergency monitoring: patients are told to call emergency services when needed. Payer rules for device use and time vary and change.',
		faqs: [
			{ question: 'Is someone watching readings around the clock?', answer: 'No. Readings are reviewed during agreed hours. Patients should never rely on monitoring in an emergency.' },
			{ question: 'Which devices do you use?', answer: 'We agree the devices and platform with your practice based on the conditions you are monitoring and your patients’ needs.' },
		],
	},
	'annual-wellness-visits': {
		title: 'Annual Wellness Visit and Recall Services',
		description: 'Annual wellness visit outreach, health risk questionnaires, eligibility checks, recall lists and scheduling for medical practices.',
		eyebrow: 'Annual wellness visits · Patient care',
		heading: 'Fill your schedule with the wellness visits patients are due.',
		lede: 'Eligible patients often do not know they are due for an annual wellness visit. We check who is due, call them, collect the questionnaire and book the visit.',
		overview: 'The annual wellness visit depends on preparation and timing. We manage the recall list, confirm eligibility dates and get pre-visit paperwork ready so your provider starts the visit prepared.',
		sections: [
			{
				title: 'Build the recall list',
				description: 'Know who is due and when.',
				items: ['Medicare eligibility date checks', 'Last visit date review', 'Recall lists by provider', 'Medicare Advantage plan rules'],
			},
			{
				title: 'Book the visit',
				description: 'Make it easy for the patient to say yes.',
				items: ['Phone and text outreach', 'Plain explanation of the visit', 'Scheduling into your templates', 'Reminder calls'],
			},
			{
				title: 'Prepare the provider',
				description: 'Have the groundwork ready before the patient arrives.',
				items: ['Health risk assessment questionnaires', 'Care team and medication lists gathered', 'Open care gaps flagged', 'No-show rebooking'],
			},
		],
		process: CLINICAL_PROCESS,
		responsibility: 'Your provider conducts the visit, reviews the assessment and creates the prevention plan. Outreach staff schedule and collect information only. Patients should hear clearly what the visit covers and that other services may have cost-sharing.',
		faqs: [
			{ question: 'Is this the same as an annual physical?', answer: 'No. An annual wellness visit focuses on a prevention plan and health risk review. Our scripts explain that difference, using wording your practice approves.' },
			{ question: 'Who fills out the questionnaire?', answer: 'The patient, by phone with our staff or on a form you choose. Your provider reviews it at the visit.' },
		],
	},
	'ciyex-ehr-implementation': {
		title: 'Ciyex EHR Implementation Services',
		description: 'Ciyex EHR implementation with setup, data migration, staff training, go-live help and ongoing assistance.',
		eyebrow: 'Ciyex EHR implementation · Software and technology',
		heading: 'Get Ciyex running in your clinic with a team beside you.',
		lede: 'We set up Ciyex around your schedule, templates and users, move your data, train your staff and stay with you through go-live.',
		overview: 'Open source software gives you control, and a working clinic needs someone to make it run. We plan the move around your practice, test before the switch and leave your team able to run the system day to day.',
		pills: ['Built on open source Ciyex', 'Plan agreed before go-live', 'BAA before PHI access'],
		sections: [
			{
				title: 'Set it up',
				description: 'Fit the system to how your clinic works.',
				items: ['Ciyex Cloud account setup', 'Users, roles and locations', 'Schedule and visit templates', 'Clinical forms and billing settings'],
			},
			{
				title: 'Move your data',
				description: 'Bring your history across with a tested plan.',
				items: ['Export review from your current system', 'Patient and appointment migration', 'Test load and validation', 'Cutover plan with your team'],
			},
			{
				title: 'Go live',
				description: 'Keep the clinic moving through the switch.',
				items: ['Role-based staff training', 'Go-live day help', 'Issue tracking after launch', 'Ongoing help as you grow'],
			},
		],
		process: TECH_PROCESS,
		responsibilityTitle: 'Go-live decisions stay with your practice.',
		responsibility: 'What can be migrated depends on what your current vendor can export. Your team validates migrated data before go-live and remains responsible for clinical use of the system and its records.',
		faqs: [
			{ question: 'Can you move data from our current EHR?', answer: 'Usually yes for core data, depending on your vendor’s export. We review a sample first and tell you what will move and what will not.' },
			{ question: 'Where is Ciyex hosted?', answer: 'We host and maintain Ciyex for you on Ciyex Cloud, so your team has no servers to manage.' },
		],
	},
	'ai-front-office-agent': {
		title: 'AI Front Office Agent',
		description: 'An AI front office voice and text agent that answers routine patient requests and hands off to a person as backup.',
		eyebrow: 'AI front office agent · Software and technology',
		heading: 'Answer routine calls, with a person ready as backup.',
		lede: 'A voice and text agent takes routine requests such as hours, directions and scheduling, so patients get a faster answer and your staff get fewer repeat calls.',
		overview: 'An AI agent is only useful with clear limits. We define what it can answer, connect it to the approved information and give it a fast way to pass the conversation to a person.',
		sections: [
			{
				title: 'Handle routine requests',
				description: 'Cover the calls that repeat all day.',
				items: ['Hours, location and general questions', 'Appointment requests and changes', 'Message taking and routing', 'Voice and text channels'],
			},
			{
				title: 'Hand off to a person',
				description: 'Keep a clear path to your team or ours.',
				items: ['Transfer on patient request', 'Handoff when the agent is unsure', 'Clinical questions sent to your staff', 'Summary passed with the handoff'],
			},
			{
				title: 'Stay in control',
				description: 'See and change what the agent does.',
				items: ['Scripts and answers you approve', 'Agent identifies itself as automated', 'Conversation review and corrections', 'Changes logged and tested'],
			},
		],
		process: TECH_PROCESS,
		responsibilityTitle: 'Patient care stays with your people.',
		responsibility: 'The agent tells patients it is automated and gives no clinical advice, triage or diagnosis. Anyone with an emergency is told to call emergency services. Your practice approves its content and owns patient communication rules.',
		faqs: [
			{ question: 'Will patients know it is AI?', answer: 'Yes. The agent says it is automated, and patients can ask for a person.' },
			{ question: 'Does it replace our front desk?', answer: 'No. It takes routine requests so your staff have more time for patients who need a person.' },
		],
	},
	'managed-it-cybersecurity': {
		title: 'Managed IT and Cybersecurity for Clinics',
		description: 'Managed IT and cybersecurity for medical and dental practices, including backups, endpoint protection, patching and help desk.',
		eyebrow: 'Managed IT and cybersecurity · Software and technology',
		heading: 'Keep clinic systems running and better protected.',
		lede: 'When a workstation fails or a phishing email lands, the schedule cannot wait. We keep your devices patched and protected, your backups tested and a help desk within reach.',
		overview: 'Most clinics do not need an IT department, but they need someone responsible. We take on day-to-day IT and security tasks, and give you plain answers about what is protected and what still needs attention.',
		pills: ['One point of contact for IT', 'Backups tested, not assumed', 'BAA before PHI access'],
		sections: [
			{
				title: 'Protect',
				description: 'Reduce the most common routes into a clinic.',
				items: ['Endpoint protection', 'Patch and update management', 'Email security and multi-factor sign-in', 'Security awareness training'],
			},
			{
				title: 'Recover',
				description: 'Be ready for the bad day.',
				items: ['Managed backups', 'Regular restore testing', 'Downtime planning', 'Incident response coordination'],
			},
			{
				title: 'Keep it running',
				description: 'Give staff someone to call.',
				items: ['Help desk for staff', 'Device and account setup', 'Network and Wi-Fi management', 'Software vendor coordination'],
			},
		],
		process: TECH_PROCESS,
		responsibilityTitle: 'Security decisions stay with your practice.',
		responsibility: 'No security service can prevent every incident. We carry out the agreed controls and report on them, while your practice remains responsible for its HIPAA obligations, breach decisions and notifications with help from your counsel.',
		faqs: [
			{ question: 'Do you work with our current IT vendor?', answer: 'We take over fully or cover defined gaps alongside them. We agree who does what at the start.' },
			{ question: 'Can you help after a ransomware attack?', answer: 'Contact your insurer and counsel first. For an existing client, we follow the agreed incident plan and work to restore from tested backups.' },
		],
	},
	'rural-clinic-support': {
		title: 'Rural Clinic Support Services',
		description: 'Rural clinic support including hosted EHR, Medicare cost reports, enrollment help and grant writing for rural health clinics.',
		eyebrow: 'Rural clinic support · Software and technology',
		heading: 'Practical help for clinics with small teams.',
		lede: 'Rural clinics carry the same paperwork as large systems with far fewer people. We bring hosted EHR, cost report preparation, enrollment help and grant writing to one team.',
		overview: 'In a rural clinic, one person often holds five jobs. We take on the technical and administrative work that needs specialist time and shape it around your staff, budget and funding.',
		sections: [
			{
				title: 'Run the systems',
				description: 'Reliable software without a server room.',
				items: ['Hosted Ciyex EHR', 'Setup and staff training', 'Help for low-bandwidth locations', 'Data migration planning'],
			},
			{
				title: 'Handle the filings',
				description: 'Prepare what regulators and payers ask for.',
				items: ['Medicare cost report preparation', 'Rural health clinic enrollment help', 'Medicare and Medicaid enrollment updates', 'Documents your clinic reviews and signs'],
			},
			{
				title: 'Find funding',
				description: 'Pursue the grants that fit your clinic.',
				items: ['Grant opportunity research', 'Application writing', 'Budget narrative preparation', 'Deadline and reporting tracking'],
			},
		],
		process: TECH_PROCESS,
		responsibilityTitle: 'Decisions and signatures stay with your clinic.',
		responsibility: 'Your clinic’s authorized official reviews and signs each cost report and application and is responsible for its accuracy. Funders make their own decisions, so we do not promise a grant award or a cost report outcome.',
		faqs: [
			{ question: 'Do we have to use Ciyex to get the other services?', answer: 'No. Cost report, enrollment and grant work can be arranged separately from the hosted EHR.' },
			{ question: 'Do you guarantee we will win a grant?', answer: 'No. Funders decide. We find a good fit with you and submit a clear, complete application on time.' },
		],
	},
	'primary-care-billing': {
		title: 'Primary Care Billing Services',
		description: 'Primary care billing for visits, preventive care, vaccines, in-office tests, care management and payer follow-up.',
		eyebrow: 'Primary Care billing · Specialty billing',
		heading: 'Primary care billing built for a full daily schedule.',
		lede: 'High visit volume leaves little room for rework. We keep preventive visits, sick visits, vaccines and in-office tests moving from the schedule to posted payment.',
		overview: 'Primary care claims are small, frequent and easy to let slip. A preventive visit and a problem visit on the same day, a vaccine with its administration, or a capitated panel each need their own handling, and small errors repeat across hundreds of claims.',
		sections: [
			{
				title: 'Visits and preventive care',
				description: 'Keep preventive and problem-oriented work billed the way it was documented.',
				items: ['Office visit charge review', 'Preventive and same-day problem visits', 'Annual wellness visit billing', 'Telehealth visit claims'],
			},
			{
				title: 'Vaccines, tests and programs',
				description: 'Capture the smaller services that are easy to miss on a busy day.',
				items: ['Vaccine and administration charges', 'In-office lab and point-of-care tests', 'Care management program claims', 'Referral and authorization checks'],
			},
			{
				title: 'Payer follow-up',
				description: 'Keep repeat errors from turning into a steady stream of denials.',
				items: ['Eligibility issues at the front desk', 'Denial trends by payer and reason', 'Capitation and panel reconciliation', 'Patient balance follow-up'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your clinicians choose the visit level and document the care. We bill from the record, bring unclear notes back to them and never change clinical facts to influence payment.',
		faqs: [
			{ question: 'Do you handle capitated contracts?', answer: 'Yes, within an agreed scope. We review panel and payment reports and flag discrepancies. Contract decisions stay with your practice.' },
			{ question: 'Our volume is high. Where do you start?', answer: 'We start with the queue causing the most rework, then look for the repeat errors behind it.' },
		],
		specialtyLink: true,
	},
	'behavioral-health-billing': {
		title: 'Behavioral Health Billing Services',
		description: 'Behavioral health billing for therapy, psychiatry and group services, with authorizations, session tracking and payer follow-up.',
		eyebrow: 'Behavioral Health billing · Specialty billing',
		heading: 'Behavioral health billing that keeps up with every session.',
		lede: 'Recurring sessions, authorization limits and different license types make this billing easy to fall behind on. We track each of them and follow every claim through.',
		overview: 'Behavioral health billing turns on details that repeat every week: session time, who delivered the service, how many visits remain and which plan manages the benefit. We keep those details visible so a lapsed authorization does not surprise you months later.',
		sections: [
			{
				title: 'Benefits and authorizations',
				description: 'Know what the plan covers before sessions add up.',
				items: ['Behavioral benefit verification', 'Carved-out plan identification', 'Authorization and visit-limit tracking', 'Renewal reminders'],
			},
			{
				title: 'Session claims',
				description: 'Bill each session the way it was documented.',
				items: ['Individual and family therapy claims', 'Group session claims', 'Psychiatric visit and medication management claims', 'Telehealth place-of-service review'],
			},
			{
				title: 'Follow-up and balances',
				description: 'Keep recurring balances from growing unnoticed.',
				items: ['Denial review and appeals', 'Payer record requests', 'Payment posting and reconciliation', 'Patient statements and balances'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your clinicians own diagnosis, treatment notes and session times. Psychotherapy notes stay with your practice unless a valid process requires otherwise, and we request only the minimum information needed for billing.',
		faqs: [
			{ question: 'Do you work with solo therapists?', answer: 'Yes. We set the scope around your caseload, payers and practice system.' },
			{ question: 'Can you bill for different license types?', answer: 'Yes. We follow each payer’s rules for the rendering clinician, and we flag any enrollment gap that could affect payment.' },
			{ question: 'Do you see therapy notes?', answer: 'Only what the agreed workflow requires. We set access with you before work begins.' },
		],
		specialtyLink: true,
	},
	'cardiology-billing': {
		title: 'Cardiology Billing Services',
		description: 'Cardiology billing for office visits, diagnostic testing, device checks, procedures and hospital services.',
		eyebrow: 'Cardiology billing · Specialty billing',
		heading: 'Cardiology billing across the office, the lab and the hospital.',
		lede: 'Cardiology claims cross settings and often split between professional and technical work. We keep each one tied to the right place of service and the right authorization.',
		overview: 'One cardiology patient can generate an office visit, an echo, a stress test, a device check and a hospital consult. Each has its own authorization, modifier and documentation needs, and multi-site groups have to keep all of it straight.',
		sections: [
			{
				title: 'Before the test',
				description: 'Clear coverage and authorization before the study is scheduled.',
				items: ['Imaging prior authorization', 'Eligibility and benefit checks', 'Medical necessity documentation requests', 'Referral tracking'],
			},
			{
				title: 'Tests and procedures',
				description: 'Bill diagnostic and interventional work for the setting where it happened.',
				items: ['Echo, stress and nuclear study claims', 'Professional and technical component billing', 'Device check claims', 'Catheterization and procedure claims'],
			},
			{
				title: 'Hospital and follow-up',
				description: 'Keep hospital work from falling out of the billing cycle.',
				items: ['Hospital charge capture', 'Multi-location claim review', 'Denial review and appeals', 'A/R follow-up by payer'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your cardiologists document medical necessity, interpret studies and confirm what was performed. We bill from those records and bring gaps back to them rather than filling them in.',
		faqs: [
			{ question: 'Can you bill for more than one location?', answer: 'Yes. We set up the workflow so each claim reflects the right site and place of service.' },
			{ question: 'Do you capture hospital charges?', answer: 'We work from the charge process you use, and we reconcile it against schedules and census information where you provide them.' },
		],
		specialtyLink: true,
	},
	'orthopedic-billing': {
		title: 'Orthopedic Billing Services',
		description: 'Orthopedic billing for office visits, surgery, injections, imaging, braces, workers’ compensation and auto claims.',
		eyebrow: 'Orthopedic billing · Specialty billing',
		heading: 'Orthopedic billing from the first visit through the global period.',
		lede: 'Surgery, global periods, implants, injections and third-party claims all meet in one practice. We track each of them so billable work is not lost and global work is not billed.',
		overview: 'Orthopedic billing depends on timing. Whether a visit falls inside a global period, whether a second procedure was related, and whether a claim belongs to workers’ compensation or auto insurance all change how it should be handled.',
		sections: [
			{
				title: 'Surgery',
				description: 'Turn operative notes into complete, accurate claims.',
				items: ['Surgical charge review', 'Global period tracking', 'Modifier review', 'Implant invoice coordination'],
			},
			{
				title: 'In-office services',
				description: 'Capture the office work around the surgery.',
				items: ['Injection and supply charges', 'In-office imaging claims', 'Brace and DME claims', 'Fracture care billing'],
			},
			{
				title: 'Third-party claims',
				description: 'Keep liability cases moving alongside commercial claims.',
				items: ['Workers’ compensation claims', 'Auto and liability claims', 'Authorization tracking', 'Denial review and appeals'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your surgeons document what was done and why. We work from the operative report and bring questions about procedures or relatedness back to them. We never change clinical facts to influence payment.',
		faqs: [
			{ question: 'Do you bill workers’ compensation?', answer: 'Yes. We work with the claim details and authorizations your office provides, and we follow the claim through with the carrier.' },
			{ question: 'Can you bill for our PA or surgical assistant?', answer: 'Yes. We follow each payer’s rules for assistants and the documentation your providers supply.' },
		],
		specialtyLink: true,
	},
	'ob-gyn-billing': {
		title: 'OB-GYN Billing Services',
		description: 'OB-GYN billing for global maternity care, ultrasounds, well-woman visits, gynecologic procedures and surgery.',
		eyebrow: 'OB-GYN billing · Specialty billing',
		heading: 'OB-GYN billing that follows the whole pregnancy.',
		lede: 'Maternity care runs for months and can change payers or providers along the way. We track each episode through delivery, alongside your gynecology visits and procedures.',
		overview: 'An obstetric practice bills across long episodes. Global maternity care, services billed outside the global, high-risk visits and a patient who changes insurance mid-pregnancy each need tracking from the first prenatal visit, not after delivery.',
		sections: [
			{
				title: 'Maternity episodes',
				description: 'Track each pregnancy from the first visit to the postpartum visit.',
				items: ['Global maternity tracking', 'Insurance change monitoring', 'Split billing when care transfers', 'Delivery and postpartum claims'],
			},
			{
				title: 'Ultrasounds and added services',
				description: 'Bill what falls outside the global package correctly.',
				items: ['Obstetric ultrasound claims', 'High-risk visit documentation requests', 'Services outside the global', 'Authorization tracking'],
			},
			{
				title: 'Gynecology',
				description: 'Keep preventive, office and surgical work separated properly.',
				items: ['Well-woman visit billing', 'Office procedure claims', 'Gynecologic surgery claims', 'Denial review and appeals'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your providers document care and confirm what was delivered and when. We work from that record, keep the billing history for each episode and never change clinical facts to influence payment.',
		faqs: [
			{ question: 'What happens if a patient changes insurance during pregnancy?', answer: 'We watch for coverage changes through the episode and bill according to the rules of each plan involved.' },
			{ question: 'Do you bill for our midwives?', answer: 'Yes. We follow each payer’s enrollment and billing rules for midwives and flag any gap that could affect payment.' },
		],
		specialtyLink: true,
	},
	'dermatology-billing': {
		title: 'Dermatology Billing Services',
		description: 'Dermatology billing for office visits, biopsies, excisions, Mohs surgery, pathology and cosmetic separation.',
		eyebrow: 'Dermatology billing · Specialty billing',
		heading: 'Dermatology billing that keeps medical and cosmetic work apart.',
		lede: 'Busy clinics mix visits, minor procedures, pathology and cosmetic care. We keep each one billed the right way, and we keep what insurance will not cover out of insurance claims.',
		overview: 'Dermatology claims often carry several procedures from one short visit. Lesion details, a visit billed with a procedure, pathology results and cosmetic services all affect the claim, and missing documentation is usually the reason it stalls.',
		sections: [
			{
				title: 'Visits and procedures',
				description: 'Bill what was done, lesion by lesion.',
				items: ['Office visit and same-day procedure review', 'Biopsy and destruction claims', 'Excision and repair claims', 'Modifier review'],
			},
			{
				title: 'Surgery and pathology',
				description: 'Keep surgical work tied to its results.',
				items: ['Mohs surgery claims', 'In-house pathology claims', 'Pathology result matching', 'Prior authorization tracking'],
			},
			{
				title: 'Cosmetic and patient balances',
				description: 'Give patients clear answers before they get a statement.',
				items: ['Medical and cosmetic separation', 'Patient financial notices where required', 'Patient balance follow-up', 'Denial review and appeals'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your dermatologists document lesions, sizes, sites and medical necessity, and they decide what is cosmetic. We bill from that record and bring anything unclear back to them.',
		faqs: [
			{ question: 'Do you bill cosmetic services?', answer: 'We keep cosmetic services out of insurance claims and post them according to the process your practice sets.' },
			{ question: 'Can you work with our in-house pathology lab?', answer: 'Yes. We set the workflow around how your lab reports results and charges.' },
		],
		specialtyLink: true,
	},
	'gastroenterology-billing': {
		title: 'Gastroenterology Billing Services',
		description: 'Gastroenterology billing for office visits, endoscopy, colonoscopy, ambulatory surgery center claims, pathology and infusions.',
		eyebrow: 'Gastroenterology billing · Specialty billing',
		heading: 'GI billing for the office, the endoscopy suite and the ASC.',
		lede: 'A screening colonoscopy that turns diagnostic can change the claim and the patient’s bill. We handle that detail, along with facility, pathology and infusion work.',
		overview: 'Gastroenterology claims depend on why a procedure was scheduled and what was found. Screening and diagnostic rules, facility and professional claims, pathology and biologic infusions all need to line up before the claim goes out.',
		sections: [
			{
				title: 'Before the procedure',
				description: 'Set clear expectations with patients and payers.',
				items: ['Benefit verification for procedures', 'Screening or diagnostic coverage checks', 'Prior authorization tracking', 'Patient responsibility estimates'],
			},
			{
				title: 'Procedures and facility claims',
				description: 'Bill the physician and facility sides from the same record.',
				items: ['Endoscopy and colonoscopy claims', 'Screening converted to diagnostic review', 'Ambulatory surgery center claims', 'Pathology claim coordination'],
			},
			{
				title: 'Infusions and follow-up',
				description: 'Keep high-cost therapies from stalling.',
				items: ['Infusion and biologic claims', 'Drug authorization tracking', 'Denial review and appeals', 'Patient balance follow-up'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your physicians document the indication, findings and services performed. We bill from that record, including how a procedure began and ended, and never change clinical facts to influence payment.',
		faqs: [
			{ question: 'Do you handle ASC claims?', answer: 'Yes, within an agreed scope. We set up how facility and professional claims are worked so each one reflects the same case.' },
			{ question: 'How do you handle a screening that becomes diagnostic?', answer: 'We review the record and the plan’s rules, then bill as the documentation shows. Your physicians confirm the clinical details.' },
		],
		specialtyLink: true,
	},
	'physical-therapy-billing': {
		title: 'Physical Therapy Billing Services',
		description: 'Physical therapy billing for evaluations, timed treatment, plans of care, visit limits, workers’ compensation and auto claims.',
		eyebrow: 'Physical Therapy billing · Specialty billing',
		heading: 'Physical therapy billing that keeps up with every visit.',
		lede: 'Timed treatment, visit limits and plan-of-care dates all change how a therapy claim is paid. We track them so patients keep moving through care without billing surprises.',
		overview: 'Therapy claims repeat many times per patient, so one missed detail repeats too. Timed units, authorizations, plan-of-care certification and visit limits need watching throughout an episode, not only at the first visit.',
		sections: [
			{
				title: 'Before and during the episode',
				description: 'Keep coverage and visit counts in view.',
				items: ['Therapy benefit verification', 'Visit limit tracking', 'Authorization and renewal tracking', 'Referral and certification dates'],
			},
			{
				title: 'Treatment claims',
				description: 'Bill each visit from the therapist’s documentation.',
				items: ['Evaluation and re-evaluation claims', 'Timed treatment review', 'Therapy modifier review', 'Group and co-treatment rules'],
			},
			{
				title: 'Third-party and balances',
				description: 'Keep liability cases and copays from aging.',
				items: ['Workers’ compensation claims', 'Auto and liability claims', 'Denial review and appeals', 'Copay and patient balance follow-up'],
			},
		],
		process: BILLING_PROCESS,
		responsibility: 'Your therapists document treatment, minutes and the plan of care, and they obtain any required certification. We bill from those records and bring gaps back to them.',
		faqs: [
			{ question: 'Do you track visit limits?', answer: 'Yes. We track limits and authorizations from the benefits information we verify, and we alert your team before they run out.' },
			{ question: 'Do you work with multi-clinic therapy groups?', answer: 'Yes. We set up the workflow so each clinic and therapist is billed correctly.' },
		],
		specialtyLink: true,
	},
};
