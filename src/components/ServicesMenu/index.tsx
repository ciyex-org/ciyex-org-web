import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';

import { PRIMARY_SERVICE_SLUGS, SERVICE_GROUPS, serviceHref } from '@site/src/data/services';
import styles from './styles.module.css';

const ALL_SERVICES = SERVICE_GROUPS.flatMap((group) => group.live);
const PRIMARY_SERVICES = PRIMARY_SERVICE_SLUGS.map((slug) => ALL_SERVICES.find((service) => service.slug === slug)!);

/** The Services menu: headline services, then the rest by group. Phones get the catalogue page. */
export default function ServicesMenu({ mobile }: { mobile?: boolean }): ReactNode {
	if (mobile) {
		return (
			<li className="menu__list-item">
				<Link className="menu__link" to="/services">Services</Link>
			</li>
		);
	}

	return (
		<div className={`navbar__item dropdown dropdown--hoverable ${styles.root}`}>
			<Link className="navbar__link" activeClassName="navbar__link--active" isNavLink to="/services">
				Services
			</Link>
			<div className={`dropdown__menu ${styles.panel}`}>
				<div className={styles.primary}>
					{PRIMARY_SERVICES.map((service) => (
						<Link key={service.slug} className={styles.primaryCard} to={serviceHref(service.slug)}>
							<strong>{service.name}</strong>
							<span>{service.summary}</span>
						</Link>
					))}
				</div>
				<div className={styles.grid}>
					{SERVICE_GROUPS.map((group) => (
						<div key={group.id}>
							<Link className={styles.groupLink} to={`/services#${group.id}`}>{group.label}</Link>
							<ul className={styles.list}>
								{group.live.filter((service) => !PRIMARY_SERVICE_SLUGS.includes(service.slug)).map((service) => (
									<li key={service.slug}>
										<Link className={styles.link} to={serviceHref(service.slug)}>{service.name}</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<Link className={styles.all} to="/services">All services <span aria-hidden="true">→</span></Link>
			</div>
		</div>
	);
}
