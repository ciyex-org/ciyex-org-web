import type { ReactNode } from 'react';

/**
 * The hospital's own icons, on the website.
 *
 * <p>Lifted verbatim from `himsIcons.ts` in Ciyex Workspace, so a bed with a
 * drip stand means the ward here and in the product, and the lab is the same
 * blood tube on both. Generic icon sets draw the laboratory as a chemistry
 * beaker and the ambulance as a rocket; a ward clerk reads neither.
 *
 * <p>Line drawings on a 24-unit grid at a constant 1.7 stroke, inheriting
 * `currentColor`, so the set reads as one hand at 18px in a list and at 34px on
 * a card. Geometry only — nothing here needs translating.
 *
 * <p>Only the glyphs the site actually draws are carried. Regenerate by
 * re-extracting from the workspace file if a module gains an icon.
 */

interface Glyph {
	readonly paths?: readonly string[];
	readonly circles?: readonly (readonly [number, number, number])[];
	readonly rects?: readonly (readonly [number, number, number, number, number])[];
	/** Filled, not stroked. Pupils, tablets, drops. */
	readonly dots?: readonly (readonly [number, number, number])[];
}

export type HimsIconName =
	'front-desk' | 'opd' | 'diagnostics' | 'records' | 'admin' | 'uhid-card' | 'calendar' |
	'receipt' | 'stethoscope' | 'casualty' | 'ward-bed' | 'bed-board' | 'nursing' | 'theatre' |
	'blood-tube' | 'x-ray' | 'capsule' | 'stores' | 'blood-drop' | 'discharge' | 'staff' |
	'ambulance' | 'ledger' | 'microscope' | 'parameter' | 'branch' | 'insurance' | 'lock' |
	'clock' | 'refresh' | 'phone' | 'hospital';

const GLYPHS: Record<HimsIconName, Glyph> = {
	'front-desk': {
		paths: ["M2.5 20h19", "M4 20v-5.5h16V20", "M4 14.5 5.5 11h13L20 14.5"],
		circles: [[12, 6.5, 2.6]],
	},
	'opd': {
		paths: ["M2.2 18.6c0-3.1 2.4-5.1 5.2-5.1 1.15 0 2.2.33 3.05.92", "M16.9 12.2v3.2l2.3 1.4"],
		circles: [[7.4, 6.4, 2.9], [16.9, 15.4, 5.4]],
	},
	'diagnostics': {
		paths: ["M8 3h7", "M9.5 3v13.5a2.8 2.8 0 0 0 5.6 0V3", "M9.5 10.5h5.6", "M18.6 18.6 21.5 21.5"],
		circles: [[16.2, 16.2, 3.4]],
	},
	'records': {
		paths: ["M2.8 7.5A1.7 1.7 0 0 1 4.5 5.8h4.6l2 2.4h8.4a1.7 1.7 0 0 1 1.7 1.7v8.3a1.7 1.7 0 0 1-1.7 1.7H4.5a1.7 1.7 0 0 1-1.7-1.7Z", "M7.5 14h9"],
	},
	'admin': {
		paths: ["M12.9 2.1h-1.8a1.6 1.6 0 0 0-1.6 1.6v.32a1.6 1.6 0 0 1-.8 1.38l-.6.35a1.6 1.6 0 0 1-1.6 0l-.28-.16a1.6 1.6 0 0 0-2.18.58l-.9 1.56a1.6 1.6 0 0 0 .58 2.18l.28.16a1.6 1.6 0 0 1 .8 1.38v.7a1.6 1.6 0 0 1-.8 1.38l-.28.16a1.6 1.6 0 0 0-.58 2.18l.9 1.56a1.6 1.6 0 0 0 2.18.58l.28-.16a1.6 1.6 0 0 1 1.6 0l.6.35a1.6 1.6 0 0 1 .8 1.38v.32a1.6 1.6 0 0 0 1.6 1.6h1.8a1.6 1.6 0 0 0 1.6-1.6v-.32a1.6 1.6 0 0 1 .8-1.38l.6-.35a1.6 1.6 0 0 1 1.6 0l.28.16a1.6 1.6 0 0 0 2.18-.58l.9-1.56a1.6 1.6 0 0 0-.58-2.18l-.28-.16a1.6 1.6 0 0 1-.8-1.38v-.7a1.6 1.6 0 0 1 .8-1.38l.28-.16a1.6 1.6 0 0 0 .58-2.18l-.9-1.56a1.6 1.6 0 0 0-2.18-.58l-.28.16a1.6 1.6 0 0 1-1.6 0l-.6-.35a1.6 1.6 0 0 1-.8-1.38V3.7a1.6 1.6 0 0 0-1.6-1.6Z"],
		circles: [[12, 12, 3.1]],
	},
	'uhid-card': {
		paths: ["M13.5 10h5M13.5 13.5h5", "M6 16c0-1.7 1.3-2.6 2.8-2.6S11.6 14.3 11.6 16"],
		circles: [[8.8, 9.6, 1.9]],
		rects: [[2.5, 4.5, 19, 15, 2]],
	},
	'calendar': {
		paths: ["M3.2 10.2h17.6", "M8 3.2v4.4", "M16 3.2v4.4"],
		rects: [[3.2, 5.5, 17.6, 15.3, 2]],
		dots: [[8.2, 13.6, 1], [12, 13.6, 1], [15.8, 13.6, 1], [8.2, 17.1, 1], [12, 17.1, 1]],
	},
	'receipt': {
		paths: ["M5.5 2.8h13v18.4l-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6-2.2-1.6-2.1 1.6Z", "M9 7.5h6M9 11.5h6M9 15.2h3.5"],
	},
	'stethoscope': {
		paths: ["M6 3v5.5a4.2 4.2 0 0 0 8.4 0V3", "M4.4 3h3.2M12.8 3H16", "M10.2 12.7v3.1a4 4 0 0 0 8 0v-1.3"],
		circles: [[18.2, 12.2, 2.2]],
	},
	'casualty': {
		paths: ["M12 2.8 21.4 19a1.6 1.6 0 0 1-1.4 2.4H4a1.6 1.6 0 0 1-1.4-2.4Z", "M12 9.5v4.2M10 11.6h4"],
	},
	'ward-bed': {
		paths: ["M2.6 20.6V9.8", "M2.6 16.4h18.8", "M2.6 19.8h18.8", "M21.4 20.6v-4.2", "M11 16.4a3 3 0 0 1 3-3h4.6a3 3 0 0 1 3 3", "M5 16.4v-1.9a1.5 1.5 0 0 1 1.5-1.5h2.4a1.5 1.5 0 0 1 1.5 1.5v1.9"],
		circles: [[7.7, 11.1, 2.1]],
	},
	'bed-board': {
		rects: [[2.5, 4.5, 8, 6, 1.2], [13.5, 4.5, 8, 6, 1.2], [2.5, 13.5, 8, 6, 1.2], [13.5, 13.5, 8, 6, 1.2]],
		dots: [[6.5, 7.5, 1.3], [17.5, 16.5, 1.3]],
	},
	'nursing': {
		paths: ["M12 20.5S3.5 15.4 3.5 9.6A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8.5 1.8c0 5.8-8.5 10.9-8.5 10.9Z", "M12 10.4v3.4M10.3 12.1h3.4"],
	},
	'theatre': {
		paths: ["M3 21 9.5 14.5", "M9 15.2 15.8 8.4a5.5 5.5 0 0 1 4.6-1.6l1.1.2-1 4.6a5.5 5.5 0 0 1-1.5 2.7L12 21 9 15.2Z"],
	},
	'blood-tube': {
		paths: ["M8 2.8h8", "M9.6 2.8v14.4a2.4 2.4 0 0 0 4.8 0V2.8", "M9.6 11.5h4.8"],
	},
	'x-ray': {
		paths: ["M12 6.5v11", "M8 9.5c1.4.9 2.7 1.3 4 1.3s2.6-.4 4-1.3", "M8.4 13.2c1.2.8 2.4 1.1 3.6 1.1s2.4-.3 3.6-1.1"],
		rects: [[3, 3, 18, 18, 2.2]],
	},
	'capsule': {
		paths: ["M8.4 15.6 15.6 8.4a5.1 5.1 0 0 0-7.2-7.2v0L1.2 8.4a5.1 5.1 0 0 0 7.2 7.2Z", "M4.8 4.8 11.9 11.9"],
	},
	'stores': {
		paths: ["M2.5 9.5h19M2.5 15h19", "M8 4v5.5M14.5 9.5V15M8 15v5"],
		rects: [[2.5, 4, 19, 16, 1.8]],
	},
	'blood-drop': {
		paths: ["M12 2.8s6 6.6 6 10.6a6 6 0 0 1-12 0c0-4 6-10.6 6-10.6Z"],
	},
	'discharge': {
		paths: ["M14 3.5H5.5A1.5 1.5 0 0 0 4 5v14a1.5 1.5 0 0 0 1.5 1.5H14", "M11 12h10", "M17.5 8.2 21.2 12l-3.7 3.8"],
	},
	'staff': {
		paths: ["M2.8 20.5c0-2.6 2.2-4.2 5-4.2s5 1.6 5 4.2", "M15.5 20.5c0-2.4-1-3.7-2.4-4.5", "M15 7.6a2.7 2.7 0 0 1 0 5.3"],
		circles: [[7.8, 10.2, 3.2]],
	},
	'ambulance': {
		paths: ["M2.5 16.5V8a1.4 1.4 0 0 1 1.4-1.4h9.4V16.5", "M13.3 10h3.6l3.6 3.9v2.6", "M2.5 16.5h1.8M10.2 16.5h4.2M19.5 16.5h2", "M6.4 10.2v3M4.9 11.7h3"],
		circles: [[7, 18, 1.9], [17.5, 18, 1.9]],
	},
	'ledger': {
		paths: ["M4 4.5A1.7 1.7 0 0 1 5.7 2.8H20v18.4H5.7A1.7 1.7 0 0 1 4 19.5Z", "M4 17.4h16", "M8 7h8M8 10.5h5"],
	},
	'microscope': {
		paths: ["M4 21h16", "M7 21c-1.6-1.5-2.5-3.4-2.5-5.6 0-4 2.9-7 7-7", "M10.5 4.5 15 9l-3 3-4.5-4.5Z", "M13.5 21a6.5 6.5 0 0 0 4.2-8.6", "M12.5 17.5h6"],
	},
	'parameter': {
		paths: ["M3 16.5h18", "M6 16.5v-4M12 16.5V6.5M18 16.5v-7"],
	},
	'branch': {
		paths: ["M3 21h18", "M6 21V6.5l6-3.5 6 3.5V21", "M9.5 11h5M12 8.5v5"],
	},
	'insurance': {
		paths: ["M12 2.5 20 5.6v6c0 4.6-3.3 8-8 9.9-4.7-1.9-8-5.3-8-9.9v-6Z", "M12 9v5M9.5 11.5h5"],
	},
	'lock': {
		paths: ["M8 10.5V7.8a4 4 0 0 1 8 0v2.7"],
		rects: [[4.5, 10.5, 15, 10, 2]],
	},
	'clock': {
		paths: ["M12 6.8V12l3.6 2.2"],
		circles: [[12, 12, 8.6]],
	},
	'refresh': {
		paths: ["M20.5 12a8.5 8.5 0 1 1-2.6-6.1", "M20.8 4.2v4.6h-4.6"],
	},
	'phone': {
		paths: ["M7.6 3.2 9.8 8 7.4 9.8a12.4 12.4 0 0 0 6.8 6.8l1.8-2.4 4.8 2.2v3.6a2 2 0 0 1-2.2 2C10.4 21 3 13.6 2.2 5.4a2 2 0 0 1 2-2.2Z"],
	},
	'hospital': {
		paths: ["M3 21h18", "M5 21V8l7-4 7 4v13", "M12 9.5v4M10 11.5h4", "M9.5 21v-4h5v4"],
	},
};

/**
 * An unknown name draws nothing rather than throwing, so a mistyped icon costs
 * a blank square and not a blank page.
 */
export function HimsIcon({
	name,
	size = 24,
	className,
}: {
	name: HimsIconName;
	size?: number;
	className?: string;
}): ReactNode {
	const glyph = GLYPHS[name];
	if (!glyph) {
		return null;
	}
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			className={className}>
			{glyph.paths?.map((d) => (
				<path key={d} d={d} />
			))}
			{glyph.circles?.map(([cx, cy, r]) => (
				<circle key={`c${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />
			))}
			{glyph.rects?.map(([x, y, w, h, r]) => (
				<rect key={`r${x}-${y}`} x={x} y={y} width={w} height={h} rx={r} ry={r} />
			))}
			{glyph.dots?.map(([cx, cy, r]) => (
				<circle key={`d${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
			))}
		</svg>
	);
}
