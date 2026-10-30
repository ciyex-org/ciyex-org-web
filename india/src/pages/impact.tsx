import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/css/india/impact.module.css';

const stats = [
  { value: '23 modules', label: 'Registration to final bill in one system, switched on as you need them' },
  { value: 'ABDM', label: 'Connectivity built into the product, not sold as a custom project' },
  { value: '0', label: 'Per-user and per-patient fees — you pay for the platform, not your census' },
  { value: 'On-premise', label: 'Or our managed cloud — the same software either way, and your data stays yours' },
];

const programs = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6v4M10 8h4" />
      </svg>
    ),
    title: 'Small and single-unit hospitals',
    description: 'Nursing homes, polyclinics and district hospitals are the ones legacy vendors price out — per-bed licensing and paid module unlocks. They get the same 23 modules and the same software as a multi-speciality group.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Local languages and formats',
    description: 'Indian number grouping, dd/MM/yyyy dates, an April financial year and multi-language screens — so a receptionist in a district hospital is not fighting software written for somebody else\u2019s country.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'ABDM and national digital health',
    description: 'Engineers working on Ayushman Bharat Digital Mission connectivity — gateway configuration and verified credentials today, with ABHA enrolment and Scan & Share being released module by module.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Security and compliance',
    description: 'Encryption at rest and in transit, credential handling that never shows a secret back, audited access to records, and data practices aligned to the Digital Personal Data Protection Act, 2023.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Patient access',
    description: 'In build: patient self-service for appointments, reports and bills, so a family is not queueing at a counter for a report that is already signed. Not shipping yet — this is where the investment is going.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Telemedicine',
    description: 'In build: video consultation and remote follow-up, so a patient in a taluk does not travel half a day for a review. Not shipping yet — named here because it is funded, not because it is finished.',
  },
];

export default function Impact(): ReactNode {
  return (
    <Layout
      title="Our Impact"
      description="How Ciyex builds hospital software for Indian hospitals that legacy vendors price out — what we invest in, and what we are still building.">
      <main className={`${styles.impactPage} ${styles.impactWide}`}>
        <div className="container">
          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.badge}>Our Commitment</div>
              <Heading as="h1" className={styles.heroTitle}>
                One hospital system,<br />
                <span className={styles.gradient}>whatever your size.</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                A thirty-bed nursing home should run the same software as a
                three-hundred-bed hospital. Ciyex HIMS is built so the difference is
                which modules you switch on, not what you can afford.
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
              <Heading as="h2" className={styles.sectionTitle}>The Problem</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
                  Most Indian hospitals do not run one system. They run a billing package at the
                  counter, a separate ledger in the pharmacy, a lab register the technician keeps
                  by hand, and a case sheet that lives in a file the MRD clerk has to physically
                  find. Each was bought separately, none of them talk, and the numbers only meet
                  at day end if somebody types them in twice.
                </p>
                <p className={styles.contentText}>
                  The systems that do cover the whole hospital are priced per bed or per user, and
                  charge again to unlock a module. So the smaller the hospital, the more of it
                  stays on paper — and the patient is the one who repeats the test, carries the
                  file, and waits at the counter.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className={styles.section}>
            <div className={styles.sectionInnerWide}>
              <Heading as="h2" className={styles.sectionTitle}>Our Approach</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
                  Ciyex takes a different approach. Every module is a switch, not a line item. A
                  polyclinic runs registration, OPD, pharmacy and billing; a multi-speciality
                  hospital adds wards, theatre, blood bank and payroll. Same software, same price
                  basis, no licence renegotiation to turn something on.
                </p>
                <p className={styles.contentText}>
                  Underneath, the record is FHIR R4 and the interfaces are HL7 and DICOM, so
                  analysers and modalities on your network talk to it and anything you build later
                  talks to a documented standard. Run it on our managed cloud or on a server inside
                  the hospital — the same software either way, with no per-user licence, no
                  per-patient fee, and your data still yours.
                </p>
              </div>
            </div>
          </section>

          {/* Programs */}
          <section className={styles.section}>
            <div className={styles.sectionInnerWide}>
              <Heading as="h2" className={styles.sectionTitle}>Where We Invest</Heading>
              <p className={styles.sectionSubtitle}>
                What we build with the revenue our customers trust us with — and the areas
                we keep investing in as the platform grows.
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
                See it on your<br />own hospital.
              </Heading>
              <p className={styles.ctaDesc}>
                Nursing home, polyclinic or multi-speciality — tell us how your hospital runs
                today and we will map it module by module.
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
