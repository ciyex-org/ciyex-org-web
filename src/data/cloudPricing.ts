/**
 * Ciyex Cloud pricing: a fixed monthly price for each provider range.
 *
 * <p>`monthlyPrice` is one fixed price for the whole account, in US dollars, for
 * any provider count in the range. Null shows "Talk to us" on the pricing page.
 */

export interface CloudPriceTier {
	readonly id: string;
	readonly name: string;
	readonly providers: string;
	readonly monthlyPrice: number | null;
}

export const CLOUD_PRICE_TIERS: readonly CloudPriceTier[] = [
	{ id: 'solo', name: 'Solo practice', providers: '1–2 providers', monthlyPrice: 349 },
	{ id: 'small', name: 'Small practice', providers: '3–5 providers', monthlyPrice: 749 },
	{ id: 'group', name: 'Group practice', providers: '6–15 providers', monthlyPrice: 1599 },
	{ id: 'multi', name: 'Multi-specialty', providers: '16–50 providers', monthlyPrice: 3999 },
	{ id: 'large', name: 'Large organization', providers: '51+ providers', monthlyPrice: null },
];

export const CLOUD_INCLUDED: readonly string[] = [
	'Managed hosting, encrypted at rest and in transit',
	'Automatic backups and cross-device sync',
	'Ciyex Workspace for Windows, macOS and Linux',
];
