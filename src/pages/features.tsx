import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './features.module.css';

const features = [
  {
    title: 'Appointments & Scheduling',
    description: `Manage your entire schedule from a single visual calendar. Patients can self-book online, and the system automatically sends email and SMS reminders to reduce no-shows.

Support for multiple appointment types — in-person, telehealth, follow-up, and new patient visits — with waitlist management and recurring scheduling built in.

Real-time availability tracking lets front-office staff see who has arrived, who is running late, and which exam rooms are open at a glance.`,
    image: '/img/features/appointments-placeholder.jpg',
    imageAlt: 'Ciyex Appointments Module',
    flip: false,
  },
  {
    title: 'Patient Management',
    description: `Every patient's full story — demographics, medical history, allergies, medications, vitals, and lab results — on one clean screen. Search by name, MRN, date of birth, phone, or email in seconds.

Encounter history, imaging, and specialist notes are linked directly to the patient record, so context is never more than a click away.

Insurance and claim management are built into each profile, keeping billing and clinical work in sync without switching systems.`,
    image: '/img/features/patients-placeholder.jpg',
    imageAlt: 'Ciyex Patient Management Module',
    flip: true,
  },
  {
    title: 'Clinical Documentation',
    description: `Structured SOAP notes with specialty-specific templates that auto-populate from previous encounters — so you start every note ahead, not from scratch.

Voice dictation with medical-terminology-aware speech-to-chart lets you narrate findings in real-time while staying focused on the patient in front of you.

ICD-10 and CPT code search is built directly into the encounter workflow. Nurses and MAs can complete intake simultaneously, so the note foundation is ready before you walk in.`,
    image: '/img/features/documentation-placeholder.jpg',
    imageAlt: 'Ciyex Clinical Documentation Module',
    flip: false,
  },
  {
    title: 'Telehealth',
    description: `HD video consultations launch directly from a scheduled appointment — no separate app, no setup, no friction. Fully browser-based and works on any device.

Secure JWT-based room access gives providers full moderator controls while patients join as participants with a single click from their notification link.

Document SOAP notes in real-time during the session, so by the time the call ends, the chart is already complete. WCAG 2.1 accessible across desktop, tablet, and mobile.`,
    image: '/img/features/telehealth-placeholder.jpg',
    imageAlt: 'Ciyex Telehealth Module',
    flip: true,
  },
  {
    title: 'Secure Messaging',
    description: `HIPAA-compliant messaging between providers, staff, and patients — all in one place. Real-time delivery via WebSocket with read receipts, file attachments, and urgent priority flagging.

Whether it's a provider-to-provider consultation, a care coordination note between staff, or a follow-up message to a patient, every conversation is end-to-end encrypted.

Full audit logging and configurable 6-year message retention keep your practice compliant without any manual effort.`,
    image: '/img/features/messaging-placeholder.jpg',
    imageAlt: 'Ciyex Secure Messaging Module',
    flip: false,
  },
  {
    title: 'Labs & Reports',
    description: `Order labs directly from within an encounter and track results as they arrive — abnormal values are automatically flagged in the patient chart so nothing gets missed.

Built-in reporting covers appointments, encounters, patients, and payments in one dashboard. Financial analytics show revenue collected, collection rates, outstanding balances, and aging reports at a glance.

Provider-level performance metrics and care gap identification help practices stay ahead of quality measures without extra administrative work.`,
    image: '/img/features/labs-placeholder.jpg',
    imageAlt: 'Ciyex Labs and Reports Module',
    flip: true,
  },
];

export default function Features(): ReactNode {
  return (
    <Layout
      title="Features"
      description="Explore Ciyex EHR modules — appointments, patient management, clinical documentation, telehealth, secure messaging, labs and reports.">
      <main className={styles.featuresPage}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Platform Features</span>
            <Heading as="h1" className={styles.heroTitle}>
              Built for clinicians,{' '}
              <span className={styles.gradient}>not administrators</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              Every module in Ciyex EHR is designed to reduce the steps between you and your patient —
              from scheduling to charting to billing, all in one place.
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

        {/* Feature Rows */}
        <section className={styles.featuresSection}>
          <div className="container">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`${styles.featureRow} ${feature.flip ? styles.featureRowFlip : ''}`}
              >
                <div className={styles.featureImage}>
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderLabel}>{feature.title}</span>
                  </div>
                </div>
                <div className={styles.featureText}>
                  <Heading as="h2" className={styles.featureTitle}>
                    {feature.title}
                  </Heading>
                  {feature.description.split('\n\n').map((para, j) => (
                    <p key={j} className={styles.featureDesc}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <Heading as="h2" className={styles.ctaTitle}>
              Ready to see it in action?
            </Heading>
            <p className={styles.ctaDesc}>
              Every module works together out of the box. Free, open source, and built for practices of every size.
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
