import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { LIVE_SERVICE_COUNT } from '@site/src/data/services';
import styles from './impact.module.css';

const stats = [
  { value: `${LIVE_SERVICE_COUNT}`, label: 'Practice services that help fund the software' },
  { value: '100%', label: 'Open source EHR code, public on GitHub' },
  { value: 'FHIR R4', label: 'Open data standard, so records can move' },
  { value: 'AGPL-3.0', label: 'Licensed so communities own their infrastructure' },
];

const programs = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6v4M10 8h4" />
      </svg>
    ),
    title: 'Community Health Centers',
    description: 'EHR deployments for federally qualified health centers (FQHCs), free clinics, and rural health facilities that serve uninsured and underinsured populations.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Health Equity',
    description: 'Multi-language support and culturally responsive design to remove barriers for immigrant, refugee, and underserved communities who face the greatest disparities in healthcare access.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Open Source Development',
    description: 'Full-time engineers building FHIR R4-compliant, interoperable features so patient data flows seamlessly between providers, labs, pharmacies, and specialists.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Security and Compliance',
    description: 'Encryption, audit logs, and role-based access so every patient receives the same level of data protection regardless of where they receive care.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Patient Portal',
    description: 'Giving patients direct access to their own health records, appointments, messaging, and prescriptions. People in control of their care, not locked out of it.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Telehealth',
    description: 'Built-in video visits so patients in rural and remote areas can connect with providers without traveling hours. Healthcare should come to people, not the other way around.',
  },
];

export default function Impact(): ReactNode {
  return (
    <Layout
      title="Our Impact"
      description="How Ciyex is building open source healthcare technology to serve 30 million Americans who lack access to basic health records. Programs, impact areas, and how you can help.">
      <main className={styles.impactPage}>
        <div className="container">
          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.badge}>501(c)(3) Nonprofit</div>
              <Heading as="h1" className={styles.heroTitle}>
                Building healthcare access<br />
                <span className={styles.gradient}>for every community.</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Practices get billing and front-office teams they can rely on. The revenue
                helps build an open source EHR that every community can use.
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
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>The Problem</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
                  Healthcare technology in America is broken. Proprietary EHR systems charge
                  per-patient fees that put modern health records out of reach for the clinics
                  that serve the most vulnerable populations. Community health centers, free
                  clinics, and rural providers are forced to choose between outdated paper records
                  and software they cannot afford.
                </p>
                <p className={styles.contentText}>
                  The result: patients in underserved communities receive fragmented care. Their
                  records are lost between providers. They repeat the same tests at every visit.
                  They fall through the cracks of a system that was never designed for them.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>Our Approach</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
                  Ciyex takes a fundamentally different approach. We build healthcare technology
                  as public infrastructure, not a product. Our EHR is open source and
                  designed from the ground up for the communities that need it most.
                </p>
                <p className={styles.contentText}>
                  By building on open standards like FHIR R4, we ensure patient data flows
                  seamlessly between providers, ending the cycle of lost records and repeated
                  tests. By licensing under AGPL-3.0, we keep the code open, with no vendor lock-in.
                </p>
              </div>
            </div>
          </section>

          {/* Services fund the software */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>How Our Services Help</Heading>
              <div className={styles.contentCard}>
                <p className={styles.contentText}>
                  Medical practices and dental offices pay for the billing, coding, credentialing
                  and virtual assistant work we do for them. That revenue helps fund the continued
                  development of Ciyex, so the software can stay open source.
                </p>
                <p className={styles.contentText}>
                  You do not have to use Ciyex to work with us, and you do not have to work with
                  us to use Ciyex. <Link to="/services">See our services</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Programs */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>Where Your Support Goes</Heading>
              <p className={styles.sectionSubtitle}>
                Service revenue and donations fund the work of building and maintaining
                open source healthcare technology for communities that need it most.
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
                Better billing helps build<br />more open healthcare.
              </Heading>
              <p className={styles.ctaDesc}>
                Hand us the work your team is behind on, run the software, or back the
                mission. Each one moves open healthcare forward.
              </p>
              <div className={styles.ctaButtons}>
                <Link className={styles.btnPrimary} to="/services">
                  Explore Our Services
                </Link>
                <Link className={styles.btnSecondary} to="/donate">
                  Support Our Mission
                </Link>
                <Link className={styles.btnGhost} to="https://github.com/ciyex-org/ciyex">
                  Contribute on GitHub
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
