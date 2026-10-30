import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * The signature motif: two threads taken from the knot in the logo, one for
 * software and one for services, crossing wherever the two meet in a clinic's
 * day. Decorative, so it stays hidden from assistive technology.
 */
export default function Threads({ className }: { className?: string }): ReactNode {
	return (
		<svg
			className={`${styles.threads} ${className ?? ''}`}
			viewBox="0 0 1200 420"
			fill="none"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
			focusable="false">
			<path
				className={styles.pine}
				d="M-40 330 C 140 330, 210 90, 400 90 S 640 330, 820 330 S 1060 90, 1260 90"
			/>
			<path
				className={styles.ember}
				d="M-40 90 C 140 90, 210 330, 400 330 S 640 90, 820 90 S 1060 330, 1260 330"
			/>
			<path
				className={styles.pineSoft}
				d="M-40 240 C 180 240, 260 150, 420 180 S 700 300, 860 240 S 1080 150, 1260 200"
			/>
		</svg>
	);
}
