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
	/** One plain sentence on why the module matters to the hospital. */
	readonly summary: string;
	/** What the module does day to day, in plain words for hospital decision-makers. */
	readonly points: readonly string[];
	/** The same glyph the module carries in the workspace sidebar. */
	readonly icon: HimsIconName;
}

export interface HimsModuleGroup {
	readonly id: string;
	readonly label: string;
	/** Why this group matters, in plain words. */
	readonly blurb: string;
	readonly icon: HimsIconName;
	readonly modules: readonly HimsModule[];
}

export const HIMS_MODULE_GROUPS: readonly HimsModuleGroup[] = [
	{
		id: 'front-desk',
		icon: 'front-desk',
		label: 'Front Desk',
		blurb: 'Help front-desk teams register patients, manage queues and handle payments.',
		modules: [
			{
				code: 'REGISTRATION',
				icon: 'uhid-card',
				name: 'Patient Registration / UHID',
				summary: 'Create a consistent patient record and UHID that staff can find across visits.',
				points: [
					'UHID numbers follow your own series',
					'A warning before a second file is created for the same patient',
					'Patient categories, referral source and ID cards',
					'Find a patient by name, phone, UHID or IP number',
				],
			},
			{
				code: 'APPOINTMENT',
				icon: 'calendar',
				name: 'Appointments & Queue',
				summary: 'Coordinate appointments, tokens and waiting-room updates from one queue.',
				points: [
					'Book by doctor, department or time slot',
					'Issue tokens and call the next patient',
					'A display board for the waiting area',
					'SMS and email reminders to patients',
				],
			},
			{
				code: 'BILLING',
				icon: 'receipt',
				name: 'Billing & Cashier',
				summary: 'Bring hospital charges, receipts, advances and refunds into the billing workflow.',
				points: [
					'Your own rates for each patient category and payer',
					'Charges come in from OPD, ward, lab, radiology and pharmacy',
					'GST on bills, receipts, advances and refunds',
					'Day-end cash report by payment mode',
				],
			},
		],
	},
	{
		id: 'patient-care',
		icon: 'opd',
		label: 'Patient Care',
		blurb: 'Support patient care from outpatient visits and emergency intake through admission and theatre.',
		modules: [
			{
				code: 'OPD',
				icon: 'stethoscope',
				name: 'OPD Management',
				summary: 'Organise OPD visits, consultation fees, follow-ups and diagnostic results.',
				points: [
					'Start a new visit in one click, with the fee applied',
					'Free follow-up periods applied by your own rule',
					'Doctors see who is waiting and who to see next',
					'Lab and imaging results come back to one place',
				],
			},
			{
				code: 'EMERGENCY',
				icon: 'casualty',
				name: 'Emergency / Casualty',
				summary: 'Record emergency arrivals, manage casualty workflows and maintain MLC details.',
				points: [
					'Register a patient who arrives without papers',
					'The most serious cases are seen first',
					'MLC register with police intimation details',
					'Record whether the patient was admitted, discharged or referred',
				],
			},
			{
				code: 'IPD',
				icon: 'ward-bed',
				name: 'IPD / Admission (ADT)',
				summary: 'Manage admissions, transfers, deposits and the running account throughout a stay.',
				points: [
					'Admit a patient with IP number, bed and consultant',
					'Deposits and advances adjusted against the running bill',
					'Move patients between wards, beds and consultants',
					'See the running bill from the day of admission',
				],
			},
			{
				code: 'BED_MANAGEMENT',
				icon: 'bed-board',
				name: 'Bed & Ward Management',
				summary: 'Give teams a current view of bed availability, occupancy and room rates.',
				points: [
					'All wards, floors, room types and beds in one place',
					'An occupancy board that is easy to read',
					'The right room rate applied when a bed is given',
					'Mark beds as blocked, being cleaned or under maintenance',
				],
			},
			{
				code: 'NURSING',
				icon: 'nursing',
				name: 'Nursing Management',
				summary: 'Keep vitals, medication rounds and nursing notes together for clearer handovers.',
				points: [
					'Record vitals bed by bed',
					'See which medicines are due on each round',
					'Nursing notes and intake/output records',
					'Shift handovers the next nurse can actually use',
				],
			},
			{
				code: 'OT',
				icon: 'theatre',
				name: 'Operation Theatre',
				summary: 'Coordinate theatre schedules, checklists, consumables and operation notes.',
				points: [
					'Theatre lists by surgeon and room',
					'Surgical safety checklist',
					'Implants and consumables recorded and added to the bill',
					'Operation notes saved to the patient record',
				],
			},
		],
	},
	{
		id: 'departments',
		icon: 'diagnostics',
		label: 'Departments',
		blurb: 'Connect diagnostic, pharmacy and inventory workflows with patient care and billing.',
		modules: [
			{
				code: 'LABORATORY',
				icon: 'blood-tube',
				name: 'Laboratory / LIS',
				summary: 'Track laboratory samples, review results and prepare signed reports.',
				points: [
					'Your list of tests and profiles, with normal ranges',
					'Sample collection, barcodes and rejected samples',
					'Enter, check and sign results',
					'Results arrive directly from connected lab machines',
				],
			},
			{
				code: 'RADIOLOGY',
				icon: 'x-ray',
				name: 'Radiology / RIS & PACS',
				summary: 'Keep imaging requests, studies and radiology reports linked to the patient record.',
				points: [
					'Patient details are sent to the imaging machine',
					'Images are saved against the doctor’s request',
					'Report templates for each type of scan',
					'Signed reports go to the doctor and the patient',
				],
			},
			{
				code: 'PHARMACY',
				icon: 'capsule',
				name: 'Pharmacy',
				summary: 'Manage dispensing, billing, batch details, returns and stock alerts in one workflow.',
				points: [
					'Batch and expiry tracked on every sale or issue',
					'Counter sales, ward supply and inpatient requests',
					'Pharmacy billing and returns',
					'Alerts for stock that is expiring soon or running low',
				],
			},
			{
				code: 'INVENTORY',
				icon: 'stores',
				name: 'Inventory / Stores',
				summary: 'Follow supplies from purchase request and receipt through stores and department use.',
				points: [
					'Follow each item from request to purchase order to goods received',
					'Separate sub-stores, with issues and usage recorded',
					'Stock counts, adjustments and losses',
					'Supplier list with agreed rates',
				],
			},
			{
				code: 'BLOOD_BANK',
				icon: 'blood-drop',
				name: 'Blood Bank',
				summary: 'Maintain donor, component-stock, compatibility and issue records together.',
				points: [
					'Donor list with deferral history',
					'Stock by blood group and component',
					'Cross-match and compatibility records',
					'A register of blood issued, returned or discarded',
				],
			},
		],
	},
	{
		id: 'records',
		icon: 'records',
		label: 'Records',
		blurb: 'Keep discharge information and medical records organised for future reference.',
		modules: [
			{
				code: 'DISCHARGE',
				icon: 'discharge',
				name: 'Discharge & Final Bill',
				summary: 'Coordinate discharge steps, deposit adjustments, final bills and summaries.',
				points: [
					'A checklist to finish before the bed is released',
					'Discharge summary printed and filed',
					'Deposits adjusted against the final bill',
					'Bills checked before the patient leaves',
				],
			},
			{
				code: 'MRD',
				icon: 'records',
				name: 'Medical Records (MRD)',
				summary: 'Track case files, record requests, releases and retention settings.',
				points: [
					'An index of case files, showing where each one is',
					'ICD codes added to completed records',
					'Record requests and releases are logged',
					'Retention rules set for each type of record',
				],
			},
		],
	},
	{
		id: 'administration',
		icon: 'admin',
		label: 'Administration',
		blurb: 'Coordinate staff, ambulance, accounts and connected equipment from the administrative side.',
		modules: [
			{
				code: 'HR_PAYROLL',
				icon: 'staff',
				name: 'HR & Payroll',
				summary: 'Manage staff information, rosters, attendance, leave and payroll workflows.',
				points: [
					'Staff details, credentials and documents',
					'Duty rosters by department and shift',
					'Attendance and leave',
					'Payroll with salary slips',
				],
			},
			{
				code: 'AMBULANCE',
				icon: 'ambulance',
				name: 'Ambulance Management',
				summary: 'Record ambulance assignments, trips, crew details, charges and vehicle documents.',
				points: [
					'Vehicle list with fitness and insurance expiry dates',
					'Send out vehicles and keep a log of each trip',
					'Assign drivers and crew',
					'Add trip charges to the patient’s bill',
				],
			},
			{
				code: 'ACCOUNTS',
				icon: 'ledger',
				name: 'Accounts & Finance',
				summary: 'Bring billing, pharmacy, cash, bank and expense entries into the hospital accounts workflow.',
				points: [
					'A day book that matches the cash counter',
					'Cash and bank reconciliation',
					'Billing and pharmacy entries reach the ledger',
					'Record expenses under heads you define',
				],
			},
			{
				code: 'INTEGRATION',
				icon: 'microscope',
				name: 'Machines & Interfaces',
				summary: 'Connect diagnostic equipment and external systems, and review messages when an interface needs attention.',
				points: [
					'Lab and imaging machines connected to Ciyex HIMS',
					'Open connections for software you build yourself',
					'Your service and test names matched to standard codes',
					'A record of messages, to help trace a failed connection',
				],
			},
		],
	},
	{
		id: 'platform',
		icon: 'parameter',
		label: 'Platform',
		blurb: 'Configure Ciyex HIMS to reflect your facilities, numbering, modules and operating rules.',
		modules: [
			{
				code: 'CONFIGURATION',
				icon: 'parameter',
				name: 'Configuration & Settings',
				summary: 'Set module access, numbering, formats, taxes and other hospital-specific options.',
				points: [
					'Switch modules on or off for your hospital, with no restart',
					'Your own numbering for UHID, IP, bills and receipts',
					'₹, Indian number format, dd/MM/yyyy dates and April financial year',
					'Your own tax rates and rounding rules',
				],
			},
			{
				code: 'FACILITY',
				icon: 'branch',
				name: 'Facility & Branch',
				summary: 'Manage multiple facilities under one login with separate facility details and settings.',
				points: [
					'More than one unit under one login',
					'GSTIN, drug licence and registration for each unit',
					'Separate lists, rates and numbering for each unit',
					'Reports for one unit or all of them',
				],
			},
			{
				code: 'ABDM',
				icon: 'insurance',
				name: 'ABDM Gateway Connection',
				summary: 'Configure hospital credentials and check connectivity with the ABDM gateway.',
				points: [
					'Test and live connections, chosen for each hospital',
					'Your hospital’s ABDM details are set up inside the software',
					'Login credentials are stored securely and not shown again',
					'A one-click test checks the connection to ABDM',
				],
			},
		],
	},
];

/** Every advertised module, flattened — used for counts and the landing-page grid. */
export const HIMS_MODULES: readonly HimsModule[] =
	HIMS_MODULE_GROUPS.flatMap((group) => group.modules);
