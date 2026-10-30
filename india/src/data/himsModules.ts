/**
 * The Ciyex HIMS module catalogue, as advertised on the India site.
 *
 * <p>This mirrors the `hims_module` catalogue seeded in the backend
 * (V209__hims_config_engine.sql and the per-module migrations that follow it),
 * and the grouping the hospital sidebar uses in Ciyex Workspace
 * (`hospitalMenuPane.ts`) — Front Desk, Patient Care, Departments, Records,
 * Administration. The site and the product therefore describe the hospital in
 * the same order a patient actually moves through it.
 *
 * <p>Only modules whose catalogue row is marked `available` are listed here.
 * A module that a hospital cannot switch on today has no business appearing on
 * a page that invites them to book a demo.
 */

import type { HimsIconName } from './himsIcons';

export interface HimsModule {
	/** The module code in the backend catalogue. Not shown, but keeps the two lists honest. */
	readonly code: string;
	readonly name: string;
	/** One line, taken from the catalogue description. */
	readonly summary: string;
	/** What the module actually does day to day, as the workspace presents it. */
	readonly points: readonly string[];
	/** The same glyph the module carries in the workspace sidebar. */
	readonly icon: HimsIconName;
}

export interface HimsModuleGroup {
	readonly id: string;
	readonly label: string;
	/** Why this group exists, in the words of the people who work in it. */
	readonly blurb: string;
	readonly icon: HimsIconName;
	readonly modules: readonly HimsModule[];
}

export const HIMS_MODULE_GROUPS: readonly HimsModuleGroup[] = [
	{
		id: 'front-desk',
		icon: 'front-desk',
		label: 'Front Desk',
		blurb: 'Where the patient arrives, waits, and pays.',
		modules: [
			{
				code: 'REGISTRATION',
				icon: 'uhid-card',
				name: 'Patient Registration / UHID',
				summary: 'Patient registration, UHID allocation, patient categories and ID cards.',
				points: [
					'UHID allocated from your own number series',
					'Duplicate detection before a second file is created',
					'Patient categories, referral source and ID cards',
					'Search across name, phone, UHID and IP number',
				],
			},
			{
				code: 'APPOINTMENT',
				icon: 'calendar',
				name: 'Appointments & Queue',
				summary: 'Appointment booking, token generation, queue console and display board.',
				points: [
					'Book by doctor, department or slot',
					'Token issue and call-next queue console',
					'Waiting-area display board',
					'SMS and email reminders',
				],
			},
			{
				code: 'BILLING',
				icon: 'receipt',
				name: 'Billing & Cashier',
				summary: 'Service master, tariffs, charge capture, bills, receipts, GST and refunds.',
				points: [
					'Service master with tariff plans per category and payer',
					'Charges captured from OPD, ward, lab, radiology and pharmacy',
					'GST on bills, receipts, advances and refunds',
					'Cashier day-end with mode-wise collection',
				],
			},
		],
	},
	{
		id: 'patient-care',
		icon: 'opd',
		label: 'Patient Care',
		blurb: 'Consultation, casualty, the ward and the theatre.',
		modules: [
			{
				code: 'OPD',
				icon: 'stethoscope',
				name: 'OPD Management',
				summary: 'Outpatient visits, consultation fees, follow-up rules and OPD workflow.',
				points: [
					'One-click new visit with the consultation fee applied',
					'Free follow-up window enforced by your own rule',
					'Doctor’s day: who is waiting, who to round',
					'Results inbox for lab and imaging that came back',
				],
			},
			{
				code: 'EMERGENCY',
				icon: 'casualty',
				name: 'Emergency / Casualty',
				summary: 'Casualty registration, triage and MLC handling.',
				points: [
					'Register a patient who arrives without papers',
					'Triage category drives the order of the queue',
					'MLC register with police intimation details',
					'Disposition to admission, discharge or referral',
				],
			},
			{
				code: 'IPD',
				icon: 'ward-bed',
				name: 'IPD / Admission (ADT)',
				summary: 'Admission, discharge and transfer, IP number allocation and case sheets.',
				points: [
					'Admission with IP number, bed and consultant',
					'Deposits and advance adjustment against the running bill',
					'Transfers between wards, beds and consultants',
					'Running bill visible from the day of admission',
				],
			},
			{
				code: 'BED_MANAGEMENT',
				icon: 'bed-board',
				name: 'Bed & Ward Management',
				summary: 'Wards, room categories, bed master, allocation and occupancy board.',
				points: [
					'Ward, floor, room category and bed master',
					'Occupancy board you can read at a glance',
					'Category-wise tariff applied on allocation',
					'Blocked, cleaning and maintenance states',
				],
			},
			{
				code: 'NURSING',
				icon: 'nursing',
				name: 'Nursing Management',
				summary: 'Nursing notes, vitals charting, medication administration and shift handover.',
				points: [
					'Vitals charting bed by bed',
					'Medication administration round with what is due',
					'Nursing notes and intake/output',
					'Shift handover the next nurse can actually use',
				],
			},
			{
				code: 'OT',
				icon: 'theatre',
				name: 'Operation Theatre',
				summary: 'OT scheduling, surgery notes, consumables and OT charge capture.',
				points: [
					'Theatre lists by surgeon and room',
					'Surgical safety checklist',
					'Implant and consumable capture that reaches the bill',
					'Operation notes filed to the patient record',
				],
			},
		],
	},
	{
		id: 'departments',
		icon: 'diagnostics',
		label: 'Departments',
		blurb: 'Diagnostics, medicines and the stores behind them.',
		modules: [
			{
				code: 'LABORATORY',
				icon: 'blood-tube',
				name: 'Laboratory / LIS',
				summary: 'Lab test master, sample collection, result entry and lab billing.',
				points: [
					'Test and profile master with reference ranges',
					'Sample collection, barcoding and rejection',
					'Result entry, verification and signed reports',
					'Analyser interfaces so results arrive by themselves',
				],
			},
			{
				code: 'RADIOLOGY',
				icon: 'x-ray',
				name: 'Radiology / RIS & PACS',
				summary: 'Radiology orders, reporting templates and PACS integration.',
				points: [
					'Modality worklist pushed to the machine',
					'DICOM images received and linked to the order',
					'Reporting templates per study',
					'Signed reports released to the doctor and the patient',
				],
			},
			{
				code: 'PHARMACY',
				icon: 'capsule',
				name: 'Pharmacy',
				summary: 'Drug master, batch/expiry, dispensing, pharmacy billing and returns.',
				points: [
					'Batch and expiry tracked on every dispense',
					'Counter sale, ward supply and IP indent',
					'Pharmacy billing and returns',
					'Near-expiry and short-stock alerts',
				],
			},
			{
				code: 'INVENTORY',
				icon: 'stores',
				name: 'Inventory / Stores',
				summary: 'Indents, purchase orders, GRN, stock issue and consumption.',
				points: [
					'Indent to purchase order to GRN',
					'Sub-stores, issue and consumption',
					'Physical stock, adjustment and loss',
					'Supplier master with rate contracts',
				],
			},
			{
				code: 'BLOOD_BANK',
				icon: 'blood-drop',
				name: 'Blood Bank',
				summary: 'Donor registry, blood stock, cross-matching and issue.',
				points: [
					'Donor registry with deferral history',
					'Component separation and stock by group',
					'Cross-match and compatibility record',
					'Issue, return and discard register',
				],
			},
		],
	},
	{
		id: 'records',
		icon: 'records',
		label: 'Records',
		blurb: 'What the hospital has to be able to produce later.',
		modules: [
			{
				code: 'DISCHARGE',
				icon: 'discharge',
				name: 'Discharge & Final Bill',
				summary: 'Discharge summary, bill reconciliation, deposits adjustment and final bill.',
				points: [
					'Discharge checklist before the bed is released',
					'Discharge summary printed and filed',
					'Deposits adjusted against the final bill',
					'Bill reconciliation before the patient leaves',
				],
			},
			{
				code: 'MRD',
				icon: 'records',
				name: 'Medical Records (MRD)',
				summary: 'Case file tracking, ICD coding, record requests and retention.',
				points: [
					'Case file index and movement tracking',
					'ICD coding on the completed record',
					'Record requests and release with an audit trail',
					'Retention rules applied per record type',
				],
			},
		],
	},
	{
		id: 'administration',
		icon: 'admin',
		label: 'Administration',
		blurb: 'Staff, fleet, money and the machines on the network.',
		modules: [
			{
				code: 'HR_PAYROLL',
				icon: 'staff',
				name: 'HR & Payroll',
				summary: 'Staff master, duty roster, attendance and payroll.',
				points: [
					'Staff master with credentials and documents',
					'Duty roster by department and shift',
					'Attendance and leave',
					'Payroll runs with salary slips',
				],
			},
			{
				code: 'AMBULANCE',
				icon: 'ambulance',
				name: 'Ambulance Management',
				summary: 'Vehicle master, trip logs and ambulance charges.',
				points: [
					'Fleet master with fitness and insurance expiry',
					'Dispatch and trip log',
					'Driver and crew assignment',
					'Trip charges posted to the patient bill',
				],
			},
			{
				code: 'ACCOUNTS',
				icon: 'ledger',
				name: 'Accounts & Finance',
				summary: 'Day book, cash/bank reconciliation and ledger postings.',
				points: [
					'Day book that ties out to the cashier',
					'Cash and bank reconciliation',
					'Ledger postings from billing and pharmacy',
					'Expense entry against heads you define',
				],
			},
			{
				code: 'INTEGRATION',
				icon: 'microscope',
				name: 'Machines & Interfaces',
				summary: 'ABDM/ABHA, HL7/FHIR, payment gateway and third-party integrations.',
				points: [
					'Analyser and modality interfaces (HL7, DICOM)',
					'FHIR R4 APIs for anything you build yourself',
					'Code mapping between your masters and the standards',
					'A message log you can debug an interface from',
				],
			},
		],
	},
	{
		id: 'platform',
		icon: 'parameter',
		label: 'Platform',
		blurb: 'The parts that make it your hospital rather than a generic one.',
		modules: [
			{
				code: 'CONFIGURATION',
				icon: 'parameter',
				name: 'Configuration & Settings',
				summary: 'Module switches, hospital settings, number series, tax rates and facilities.',
				points: [
					'Switch modules on and off per hospital, no restart',
					'Number series for UHID, IP, bill and receipt',
					'₹ currency, Indian number grouping, dd/MM/yyyy, April financial year',
					'Tax rates and rounding rules',
				],
			},
			{
				code: 'FACILITY',
				icon: 'branch',
				name: 'Facility & Branch',
				summary: 'Hospital branches/units, GSTIN, drug licence and registration details.',
				points: [
					'More than one unit under one login',
					'GSTIN, drug licence and registration per facility',
					'Facility-scoped masters, tariffs and number series',
					'Reports for one unit or for all of them',
				],
			},
			{
				code: 'ABDM',
				icon: 'insurance',
				name: 'ABDM / ABHA Integration',
				summary: 'Ayushman Bharat Digital Mission connectivity, configured per hospital.',
				points: [
					'Sandbox and production environments, switched per hospital',
					'HIP ID, facility identity and callback configured in the app',
					'Client credentials encrypted at rest, never shown back',
					'Test Connection authenticates against the live ABDM gateway',
				],
			},
		],
	},
];

/** Every advertised module, flattened — used for counts and the landing-page grid. */
export const HIMS_MODULES: readonly HimsModule[] =
	HIMS_MODULE_GROUPS.flatMap((group) => group.modules);
