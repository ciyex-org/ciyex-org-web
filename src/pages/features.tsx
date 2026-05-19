import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './features.module.css';

const featureGroups = [
  {
    category: 'Clinical Documentation',
    badge: 'Chart Faster',
    description: 'Spend less time typing and more time with your patients.',
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        ),
        title: 'Voice-to-Chart',
        description: 'Dictate notes in real-time with medical-terminology-aware transcription. Narrate findings while staying focused on your patient.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
          </svg>
        ),
        title: 'Specialty Templates',
        description: 'One-click, pre-configured templates tailored to your specialty that auto-populate common data points from previous encounters.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: 'Team-Based Documentation',
        description: 'Nurses and MAs complete intake and vitals simultaneously. By the time you enter the room, the note foundation is already built.',
      },
    ],
  },
  {
    category: 'Patient Journey',
    badge: 'End-to-End',
    description: 'A seamless experience from scheduling to follow-up.',
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        ),
        title: 'Self-Service Scheduling & Intake',
        description: 'Patients complete digital intake forms and insurance verification from their own devices before they arrive.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        title: 'Real-Time Patient Flow',
        description: 'Live dashboard showing who has arrived, who is running late, and which exam rooms are available—at a glance.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
          </svg>
        ),
        title: 'Automated Follow-Up',
        description: 'Clinical summaries push to the patient portal automatically. Ciyex flags records for outreach when follow-ups are due.',
      },
    ],
  },
  {
    category: 'Smart Automation',
    badge: 'Work Smarter',
    description: 'Let Ciyex handle the repetitive work so you can focus on care.',
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" />
          </svg>
        ),
        title: 'Auto-Populating Labs',
        description: 'Results flow directly into the chart with abnormalities flagged automatically—no more hunting for data.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
          </svg>
        ),
        title: 'Integrated Billing & Coding',
        description: 'Documentation and coding happen simultaneously. Faster claims processing and reduced denials without extra work.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 6 4-4 4 4" /><path d="M12 2v10.3" />
            <path d="M4.93 10.93 2 13.86 4 16h16l2-2.14-2.93-2.93" />
            <path d="m10 22 2-3 2 3" />
          </svg>
        ),
        title: 'E-Prescribing',
        description: 'Send prescriptions and lab orders with a few clicks. Next steps are already in motion before the patient stands up.',
      },
    ],
  },
  {
    category: 'Compliance & Security',
    badge: 'Always Protected',
    description: 'Built-in compliance so regulations become your safety net, not your headache.',
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
          </svg>
        ),
        title: 'HIPAA & GDPR Ready',
        description: 'Enterprise-grade encryption, Role-Based Access Control, and automated audit trails—security that is always on.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
        ),
        title: 'FHIR-Native Interoperability',
        description: 'Built on FHIR R4 from day one. Share data with hospitals, labs, and registries without expensive adapters.',
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
          </svg>
        ),
        title: 'MIPS/MACRA Tracking',
        description: 'Real-time performance dashboards track quality measures automatically during normal charting. No surprises at reporting time.',
      },
    ],
  },
];

const stats = [
  { value: '40%', label: 'Average reduction in documentation time' },
  { value: '360°', label: 'Patient history on a single screen' },
  { value: 'FHIR R4', label: 'Native interoperability standard' },
  { value: 'AGPL-3.0', label: 'Free and open source, forever' },
];

export default function Features(): ReactNode {
  return (
    <Layout
      title="Features"
      description="Explore Ciyex EHR features — voice-to-chart, specialty templates, FHIR-native interoperability, automated billing, and more.">
      <main className={styles.featuresPage}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Platform Features</span>
            <Heading as="h1" className={styles.heroTitle}>
              Everything your practice needs,{' '}
              <span className={styles.gradient}>nothing it doesn't</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              Ciyex EHR is designed to reduce the digital tax on providers—intuitive navigation,
              smart automation, and built-in compliance so you can focus on the patient in front of you.
            </p>
            <div className={styles.heroCta}>
              <Link className={styles.btnPrimary} to="https://calendly.com/qiaben/ciyex">
                Schedule a Demo
              </Link>
              <Link className={styles.btnSecondary} to="/docs/intro">
                Read the Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.value} className={styles.statCard}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Groups */}
        {featureGroups.map((group) => (
          <section key={group.category} className={styles.featureSection}>
            <div className="container">
              <div className={styles.sectionInner}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionBadge}>{group.badge}</span>
                  <Heading as="h2" className={styles.sectionTitle}>{group.category}</Heading>
                  <p className={styles.sectionSubtitle}>{group.description}</p>
                </div>
                <div className={styles.featureGrid}>
                  {group.features.map((feature) => (
                    <div key={feature.title} className={styles.featureCard}>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDesc}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <Heading as="h2" className={styles.ctaTitle}>
              Ready to reclaim your clinical hour?
            </Heading>
            <p className={styles.ctaDesc}>
              See how Ciyex can simplify your specific workflow. Free, open source, and built for practices of every size.
            </p>
            <div className={styles.ctaButtons}>
              <Link className={styles.btnPrimary} to="https://calendly.com/qiaben/ciyex">
                Schedule a Demo
              </Link>
              <Link className={styles.btnSecondary} to="/signup">
                Sign Up Free
              </Link>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
