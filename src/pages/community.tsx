import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './community.module.css';

/* ── Category Icons (inline SVG) ── */
const IconSupport = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconInstall = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <polyline points="7 10 10 13 17 6" />
  </svg>
);

const IconClinical = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
    <path d="M12 6v4M10 8h4" />
  </svg>
);

const IconDev = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const IconFeature = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconIntegration = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconSecurity = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconNews = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
  </svg>
);

const IconCommunityHealth = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconFoundation = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconHelpWanted = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconFeedback = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="12" y1="7" x2="12" y2="13" />
  </svg>
);

/* ── Forum Categories ── */
const categories = [
  {
    icon: <IconSupport />,
    title: 'Support',
    description: 'Post your general support and troubleshooting questions here. Get help from the community and Ciyex team.',
    color: '#06b6d4',
    slug: 'support',
  },
  {
    icon: <IconInstall />,
    title: 'Installation & Setup',
    description: 'Help with installing, configuring, and deploying Ciyex EHR. Docker, Kubernetes, local setup, and database configuration.',
    color: '#10b981',
    slug: 'installation-setup',
  },
  {
    icon: <IconClinical />,
    title: 'Clinical Users',
    description: 'Day-to-day clinical workflow questions. How to accomplish tasks as a provider, nurse, or clinic administrator.',
    color: '#ef4444',
    slug: 'clinical-users',
  },
  {
    icon: <IconDev />,
    title: 'Development',
    description: 'For contributors and developers. Discuss architecture, code changes, pull requests, and development workflows.',
    color: '#8b5cf6',
    slug: 'development',
  },
  {
    icon: <IconFeature />,
    title: 'Feature Requests',
    description: 'Suggest and discuss new features. Vote on ideas and help shape the future of Ciyex EHR.',
    color: '#f59e0b',
    slug: 'feature-requests',
  },
  {
    icon: <IconIntegration />,
    title: 'Integrations',
    description: 'FHIR R4, HL7, lab systems, pharmacy, billing, and third-party integrations. Connect Ciyex with your ecosystem.',
    color: '#06b6d4',
    slug: 'integrations',
  },
  {
    icon: <IconSecurity />,
    title: 'Security & Compliance',
    description: 'HIPAA compliance, data encryption, audit logging, security best practices, and vulnerability discussions.',
    color: '#0d9488',
    slug: 'security-compliance',
  },
  {
    icon: <IconNews />,
    title: 'News & Announcements',
    description: 'Official project updates, release notes, roadmap announcements, and community news.',
    color: '#3b82f6',
    slug: 'news',
  },
  {
    icon: <IconCommunityHealth />,
    title: 'Community Health Centers',
    description: 'Discussions specific to community health centers, free clinics, and rural healthcare providers using Ciyex.',
    color: '#10b981',
    slug: 'community-health-centers',
  },
  {
    icon: <IconFoundation />,
    title: 'Ciyex Foundation',
    description: 'Nonprofit governance, mission discussions, volunteer opportunities, and organizational updates.',
    color: '#8b5cf6',
    slug: 'foundation',
  },
  {
    icon: <IconHelpWanted />,
    title: 'Help Wanted',
    description: 'Looking for developers or volunteers for Ciyex-related work? Post opportunities and find collaborators.',
    color: '#f97316',
    slug: 'help-wanted',
  },
  {
    icon: <IconFeedback />,
    title: 'Site Feedback',
    description: 'Suggestions and feedback about the Ciyex community, website, and documentation improvements.',
    color: '#64748b',
    slug: 'site-feedback',
  },
];

/* ── Stats ── */
const stats = [
  { label: 'Categories', value: '12' },
  { label: 'Open Source', value: 'AGPL-3.0' },
  { label: 'Response Time', value: '< 24h' },
  { label: 'Community', value: 'Global' },
];

/* ── Page ── */
export default function Community(): ReactNode {
  return (
    <Layout
      title="Community Forum"
      description="Join the Ciyex EHR community. Ask questions, share knowledge, and connect with healthcare professionals and developers building open source EHR software.">
      <main className={styles.communityPage}>
        <div className="container">
          {/* Hero */}
          <div className={styles.heroCard}>
            <div className={styles.heroContent}>
              <div className={styles.badges}>
                <span className={styles.badge}>Community Forum</span>
                <span className={styles.badge}>Ask &amp; Answer</span>
              </div>
              <Heading as="h1" className={styles.heroTitle}>
                Ciyex Community
              </Heading>
              <p className={styles.heroSubtitle}>
                Ask questions, share knowledge, and connect with healthcare professionals
                and developers building open source EHR software.
              </p>
              <div className={styles.heroCta}>
                <Link className={styles.btnPrimary} href="https://forum.ciyex.org">
                  Visit Forum
                </Link>
                <Link className={styles.btnSecondary} href="https://github.com/ciyex-org/ciyex/discussions">
                  GitHub Discussions
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Categories */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>
                Forum Categories
              </Heading>
              <p className={styles.sectionSubtitle}>
                Browse topics by category. Find answers, ask questions, and help others in the community.
              </p>
              <div className={styles.categoryGrid}>
                {categories.map((cat, i) => (
                  <Link
                    key={i}
                    className={styles.categoryCard}
                    to={`/community/category?c=${cat.slug}`}
                  >
                    <div className={styles.categoryIcon} style={{ color: cat.color }}>
                      {cat.icon}
                    </div>
                    <div className={styles.categoryBody}>
                      <h3 className={styles.categoryTitle}>{cat.title}</h3>
                      <p className={styles.categoryDesc}>{cat.description}</p>
                    </div>
                    <div className={styles.categoryArrow}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>
                How It Works
              </Heading>
              <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>1</div>
                  <h3 className={styles.stepTitle}>Choose a Category</h3>
                  <p className={styles.stepDesc}>
                    Browse the categories above and find the one that best matches your question or topic.
                  </p>
                </div>
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>2</div>
                  <h3 className={styles.stepTitle}>Ask Your Question</h3>
                  <p className={styles.stepDesc}>
                    Create a new topic with a clear title and detailed description. Include screenshots or code snippets if relevant.
                  </p>
                </div>
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>3</div>
                  <h3 className={styles.stepTitle}>Get Answers</h3>
                  <p className={styles.stepDesc}>
                    Community members and the Ciyex team will respond to your question. Mark the best answer to help others.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <div className={styles.ctaCard}>
                <Heading as="h2" className={styles.ctaTitle}>
                  Ready to join the conversation?
                </Heading>
                <p className={styles.ctaDesc}>
                  Whether you're a clinician, developer, or healthcare IT professional, there's a place for you in our community.
                </p>
                <div className={styles.ctaButtons}>
                  <Link className={styles.btnPrimary} href="https://forum.ciyex.org">
                    Join the Forum
                  </Link>
                  <Link className={styles.btnGhost} to="/docs/intro">
                    Read the Docs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
