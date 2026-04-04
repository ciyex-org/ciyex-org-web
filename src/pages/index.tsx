import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/* ── Inline SVG Icons ── */
const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconHeart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
    <path d="M12 6v4M10 8h4" />
  </svg>
);

const IconGlobe = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconCode = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const IconUsers = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconZap = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ── Dashboard Mockup (CSS-only) ── */
function DashboardMockup() {
  return (
    <div className={styles.mockupWrapper}>
      <div className={styles.mockupWindow}>
        <div className={styles.mockupBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
          <span className={styles.mockupTitle}>Ciyex EHR Dashboard</span>
        </div>
        <div className={styles.mockupBody}>
          {/* Sidebar */}
          <div className={styles.mockSidebar}>
            <div className={styles.mockLogo} />
            {[...Array(6)].map((_, i) => (
              <div key={i} className={clsx(styles.mockNavItem, i === 0 && styles.mockNavActive)} />
            ))}
          </div>
          {/* Main Content */}
          <div className={styles.mockMain}>
            {/* Top Stats */}
            <div className={styles.mockStatsRow}>
              {['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b'].map((color, i) => (
                <div key={i} className={styles.mockStatCard}>
                  <div className={styles.mockStatIcon} style={{ background: color }} />
                  <div className={styles.mockStatText}>
                    <div className={styles.mockStatValue} />
                    <div className={styles.mockStatLabel} />
                  </div>
                </div>
              ))}
            </div>
            {/* Chart area */}
            <div className={styles.mockChartArea}>
              <div className={styles.mockChartHeader} />
              <svg viewBox="0 0 400 120" className={styles.mockChart}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 Q50,60 100,65 T200,40 T300,55 T400,25 V120 H0 Z" fill="url(#chartGrad)" />
                <path d="M0,80 Q50,60 100,65 T200,40 T300,55 T400,25" fill="none" stroke="#06b6d4" strokeWidth="2" />
              </svg>
            </div>
            {/* Table rows */}
            <div className={styles.mockTable}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.mockTableRow}>
                  <div className={styles.mockAvatar} />
                  <div className={styles.mockRowText} />
                  <div className={styles.mockRowBadge} />
                  <div className={styles.mockRowText2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ── */
function HomepageHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          Open Source &middot; 501(c)(3) Nonprofit
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          Open source EHR<br />
          <span className={styles.heroGradient}>for every community.</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          30 million Americans lack access to modern health records software.
          We build the open source EHR so clinics and communities don't have to choose between paper charts and software they can't afford.
        </p>
        <div className={styles.heroCta}>
          <Link className={styles.btnPrimary} to="/about">
            Our Mission
          </Link>
          <Link className={styles.btnSecondary} to="https://github.com/ciyex-org/ciyex">
            View on GitHub &rarr;
          </Link>
        </div>
      </div>
      <DashboardMockup />
    </section>
  );
}

/* ── Features ── */
const features = [
  { icon: <IconHeart />, title: 'Patient-First Design', desc: 'Patients own their health data. Secure portal access to records, appointments, messaging, and prescriptions. Software that puts people in control.' },
  { icon: <IconUsers />, title: 'Community Health Centers', desc: 'Purpose-built EHR software for community health centers, free clinics, and rural providers who serve the most underserved populations.' },
  { icon: <IconGlobe />, title: 'Health Equity', desc: 'Multi-language, culturally responsive, and designed to remove technology barriers for immigrant, uninsured, and underserved communities.' },
  { icon: <IconShield />, title: 'Privacy & Trust', desc: 'HIPAA-compliant with enterprise-grade encryption. Every patient deserves the same level of data protection, regardless of which software their clinic uses.' },
  { icon: <IconCode />, title: 'Open Source', desc: 'AGPL-3.0 licensed. No vendor lock-in, no per-patient fees. Communities can self-host and own their healthcare infrastructure.' },
  { icon: <IconZap />, title: 'Interoperable', desc: 'FHIR R4 native. Connects with labs, pharmacies, and other systems so patients never have to repeat their story at every visit.' },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        <div className={styles.sectionLabel}>Why Ciyex</div>
        <Heading as="h2" className={styles.sectionTitle}>
          Technology that serves patients, not profits.
        </Heading>
        <p className={styles.sectionSubtitle}>
          Every feature is designed with one question: does this give clinics and patients better tools than what they have today?
        </p>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Product Showcase (Apple-style alternating sections) ── */
function ShowcaseSection() {
  return (
    <>
      {/* Section 1: Patient Care */}
      <section className={styles.showcase}>
        <div className={styles.showcaseInner}>
          <div className={styles.showcaseText}>
            <div className={styles.sectionLabel}>Better Tools</div>
            <Heading as="h2" className={styles.showcaseTitle}>
              Every clinic<br />deserves this.
            </Heading>
            <p className={styles.showcaseDesc}>
              Complete health records software, smart clinical documentation tools,
              and care coordination workflows. The same quality of technology
              whether you run a rural clinic or a major hospital.
            </p>
            <Link className={styles.showcaseLink} to="/docs/features/clinical-docs">
              Learn more &rarr;
            </Link>
          </div>
          <div className={styles.showcaseVisual}>
            <div className={styles.visualCard}>
              <div className={styles.visualCardHeader}>
                <div className={styles.visualCardDot} />
                <span>Patient Chart</span>
              </div>
              <div className={styles.visualCardRow}><span className={styles.vcLabel}>Name</span><span className={styles.vcValue}>Sarah Johnson</span></div>
              <div className={styles.visualCardRow}><span className={styles.vcLabel}>DOB</span><span className={styles.vcValue}>04/15/1985</span></div>
              <div className={styles.visualCardRow}><span className={styles.vcLabel}>MRN</span><span className={styles.vcValue}>CX-2024-0847</span></div>
              <div className={styles.visualCardDivider} />
              <div className={styles.visualVitals}>
                <div className={styles.vitalPill}><strong>120/80</strong><span>BP</span></div>
                <div className={styles.vitalPill}><strong>72</strong><span>HR</span></div>
                <div className={styles.vitalPill}><strong>98.6</strong><span>Temp</span></div>
                <div className={styles.vitalPill}><strong>99%</strong><span>SpO2</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interoperability */}
      <section className={clsx(styles.showcase, styles.showcaseReverse, styles.showcaseDark)}>
        <div className={styles.showcaseInner}>
          <div className={styles.showcaseText}>
            <div className={styles.sectionLabel}>Connected Care</div>
            <Heading as="h2" className={styles.showcaseTitle}>
              Your health data<br />should follow you.
            </Heading>
            <p className={styles.showcaseDesc}>
              Built on FHIR R4 open standards so patient records move seamlessly
              between providers, labs, pharmacies, and specialists. No more
              lost records or repeated tests.
            </p>
            <Link className={styles.showcaseLink} to="/docs/architecture/fhir-integration">
              Explore FHIR integration &rarr;
            </Link>
          </div>
          <div className={styles.showcaseVisual}>
            <div className={styles.interopVisual}>
              <div className={styles.interopCenter}>
                <img src="/img/Ciyex-logo-no-text.png" alt="Ciyex" width="40" height="40" />
              </div>
              {['Labs', 'Pharmacy', 'Insurance', 'HIE', 'Imaging', 'Billing'].map((label, i) => (
                <div key={i} className={styles.interopNode}>
                  <span>{label}</span>
                </div>
              ))}
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className={styles.interopLine} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Donate Section ── */
function DonateSection() {
  return (
    <section className={styles.donate}>
      <div className={styles.donateInner}>
        <div className={styles.sectionLabel}>501(c)(3) Nonprofit</div>
        <Heading as="h2" className={styles.donateTitle}>
          Help us build healthcare<br />
          <span className={styles.heroGradient}>technology for everyone.</span>
        </Heading>
        <p className={styles.donateDesc}>
          Ciyex is a nonprofit. Every dollar goes directly to building open source
          EHR software for clinics that cannot afford it. Your donation is tax-deductible.
        </p>
        <div className={styles.donateButtons}>
          <Link className={styles.btnDonate} to="/donate">
            Donate Now
          </Link>
          <Link className={styles.btnGhost} to="/about">
            Learn about our mission &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Recent Blogs Section ── */
const recentBlogs = [
  {
    title: 'Enhancing the Patient-Provider Relationship Through Transparent EHR Use',
    excerpt: 'For years, the EHR has been viewed as a "third party" in the exam room. At Ciyex, we believe transparency is the key — shifting from "silent charting" to "collaborative documentation."',
    slug: '/blog/transparent-ehr-patient-provider',
    date: 'April 4, 2026',
    image: '/img/blog/transparent-ehr.jpg',
  },
  {
    title: 'How Ciyex EHR Minimizes "Clicks" and Maximizes Patient Interaction',
    excerpt: 'Ciyex EHR was built to dismantle the digital barrier between doctor and patient. By prioritizing a "minimal-click" philosophy, our platform shifts focus back to the person in the exam room.',
    slug: '/blog/minimize-clicks-maximize-interaction',
    date: 'April 3, 2026',
    image: '/img/blog/minimize-clicks.jpg',
  },
  {
    title: '5 Ways Ciyex EHR Reduces Documentation Time for Clinicians',
    excerpt: 'Ciyex EHR is engineered to eliminate clinical bottlenecks through an intuitive interface and automated data management. Here are five specific ways Ciyex streamlines documentation.',
    slug: '/blog/reduce-documentation-time',
    date: 'April 2, 2026',
    image: '/img/blog/reduce-documentation.jpg',
  },
];

function RecentBlogsSection() {
  return (
    <section className={styles.recentBlogs}>
      <div className={styles.recentBlogsInner}>
        <div className={styles.sectionLabel}>From Our Blog</div>
        <Heading as="h2" className={styles.sectionTitle}>
          Latest insights &amp; updates.
        </Heading>
        <p className={styles.sectionSubtitle}>
          Read about open source healthcare, EHR technology, and our mission to bring health equity to every community.
        </p>
        <div className={styles.blogGrid}>
          {recentBlogs.map((blog, i) => (
            <Link key={i} to={blog.slug} className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <img src={blog.image} alt={blog.title} loading="lazy" />
              </div>
              <div className={styles.blogCardBody}>
                <span className={styles.blogCardDate}>{blog.date}</span>
                <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                <p className={styles.blogCardExcerpt}>{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.blogViewAll}>
          <Link className={styles.btnSecondary} to="/blog">
            View all posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */
function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <Heading as="h2" className={styles.ctaTitle}>
          Join the movement for<br />open source health records.
        </Heading>
        <p className={styles.ctaDesc}>
          Whether you run a community health center, volunteer at a free clinic, or believe every clinic deserves modern software, there is a place for you.
        </p>
        <div className={styles.ctaButtons}>
          <Link className={styles.btnPrimary} to="/donate">
            Support Our Mission
          </Link>
          <Link className={styles.btnGhost} to="/docs/installation/docker-setup">
            Deploy for Your Community &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Home(): ReactNode {
  return (
    <Layout
      title="Open Source EHR for Every Community"
      description="Ciyex is a 501(c)(3) nonprofit building free, open source EHR software so every clinic and community, no matter how underserved, has access to modern health records technology.">
      <HomepageHero />
      <FeaturesSection />
      <ShowcaseSection />
      <DonateSection />
      <RecentBlogsSection />
      <CtaSection />
    </Layout>
  );
}
