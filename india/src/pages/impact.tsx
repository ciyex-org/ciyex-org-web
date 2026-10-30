import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/css/india/impact.module.css';

const stats = [
	{ value: 'One connected system', label: 'Workflows spanning registration, care, departments and administration' },
	{ value: 'ABDM', label: 'Gateway configuration and connection checks in Ciyex HIMS' },
	{ value: 'No per-user fee', label: 'Add staff accounts with access controlled by roles and permissions' },
	{ value: 'Two deployment options', label: 'Discuss managed cloud or on-premise deployment with our team' },
];

const programs = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6v4M10 8h4" />
      </svg>
    ),
		title: 'A system that can start with your needs',
		description: 'Nursing homes, polyclinics and larger hospitals can configure Ciyex HIMS around the departments they operate, then review additional workflows as their needs change.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
		title: 'Settings for Indian operations',
		description: 'Use rupee formatting, Indian number grouping, dd/MM/yyyy dates and an April financial year. GST and facility settings can be configured for the hospital.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
		title: 'ABDM connectivity',
		description: 'Configure gateway credentials, choose sandbox or production, and check connectivity in Ciyex HIMS. ABHA enrolment, verification and Scan & Share are in development.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
		title: 'Security and data practices',
		description: 'Ciyex HIMS uses encryption for stored and transmitted data, protects configured credentials and records access to patient information. Discuss your responsibilities and deployment needs with our team.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
		title: 'Patient self-service · in development',
		description: 'Patient access for appointments, reports and bills is in development and is not available yet.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
		title: 'Telemedicine · in development',
		description: 'Video consultations and remote follow-up are planned for a future release and are not available yet.',
  },
];

export default function Impact(): ReactNode {
  return (
    <Layout
      title="Our Impact"
      description="See how Qiaben is developing Ciyex HIMS for hospitals in India, including the workflows available today and areas still in development.">
      <main className={`${styles.impactPage} ${styles.impactWide}`}>
        <div className="container">
          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroContent}>
				<div className={styles.badge}>Our focus</div>
              <Heading as="h1" className={styles.heroTitle}>
					Hospital workflows,<br />
					<span className={styles.gradient}>connected in one system.</span>
              </Heading>
              <p className={styles.heroSubtitle}>
					Ciyex HIMS brings registration, patient care, diagnostics, pharmacy, billing
					and administration into one configurable system. Hospitals can choose a
					deployment and feature setup to suit their operations.
              </p>
            </div>
          </div>

          {/* Stats */}
          <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* The Problem */}
          <section className={styles.section}>
            <div className={styles.sectionInnerWide}>
								<Heading as="h2" className={styles.sectionTitle}>The operational challenge</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
					When hospital departments rely on separate tools and paper records, staff may
					need to enter the same information more than once or search across systems to
					answer a simple operational question.
                </p>
                <p className={styles.contentText}>
					A hospital information system should support the workflows a facility needs
					today and make it practical to review what comes next—without adding unnecessary
					steps for staff or patients.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className={styles.section}>
            <div className={styles.sectionInnerWide}>
								<Heading as="h2" className={styles.sectionTitle}>How we approach it</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
					Ciyex HIMS brings hospital functions into one platform, with features for the
					front desk, patient care, departments, records and administration. During
					implementation, our team works with each hospital to configure the relevant
					workflows and responsibilities.
                </p>
                <p className={styles.contentText}>
					Ciyex HIMS uses FHIR R4 and supports HL7 v2 and DICOM workflows. Hospitals can
					discuss managed cloud or on-premise deployment, integration requirements and
					data handling with the Qiaben team.
                </p>
              </div>
            </div>
          </section>

          {/* Programs */}
          <section className={styles.section}>
            <div className={styles.sectionInnerWide}>
								<Heading as="h2" className={styles.sectionTitle}>What we’re building toward</Heading>
              <p className={styles.sectionSubtitle}>
					See what is available now and which capabilities remain in development as
					Ciyex HIMS evolves.
              </p>
              <div className={styles.programsGrid}>
                {programs.map((program, i) => (
                  <div key={i} className={styles.programCard}>
                    <div className={styles.programIcon}>{program.icon}</div>
                    <h3 className={styles.programTitle}>{program.title}</h3>
                    <p className={styles.programDesc}>{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaInner}>
              <Heading as="h2" className={styles.ctaTitle}>
								See how it fits<br />your hospital.
              </Heading>
              <p className={styles.ctaDesc}>
					Tell us about your departments, current systems and priorities. We’ll show
					you the relevant Ciyex HIMS workflows in a product demo.
              </p>
              <div className={styles.ctaButtons}>
                <Link className={styles.btnSecondary} to="/signup">
                  Book a demo
                </Link>
                <Link className={styles.btnGhost} to="/professional-support">
                  Talk to our team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
