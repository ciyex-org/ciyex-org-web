import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './workspace.module.css';

const modules = [
  {
    title: 'Appointments & Scheduling',
    description: `Manage your entire schedule from a single visual calendar. Patients can self-book online, and the system automatically sends email and SMS reminders to reduce no-shows.

Support for multiple appointment types — in-person, telehealth, follow-up, and new patient visits — with waitlist management and recurring scheduling built in.

Real-time availability tracking lets front-office staff see who has arrived, who is running late, and which exam rooms are open at a glance.`,
    image: '/img/features/appointments.png',
    imageAlt: 'Appointments module shown inside the Ciyex Workspace desktop client',
    flip: false,
  },
  {
    title: 'Patient Management',
    description: `Every patient's full story — demographics, medical history, allergies, medications, vitals, and lab results — on one clean screen. Search by name, MRN, date of birth, phone, or email in seconds.

Encounter history, imaging, and specialist notes are linked directly to the patient record, so context is never more than a click away.

Insurance and claim management are built into each profile, keeping billing and clinical work in sync without switching systems.`,
    image: '/img/features/patients.png',
    imageAlt: 'Patient management module shown inside the Ciyex Workspace desktop client',
    flip: true,
  },
  {
    title: 'Clinical Documentation',
    description: `Structured SOAP notes with specialty-specific templates that auto-populate from previous encounters — so you start every note ahead, not from scratch.

Voice dictation with medical-terminology-aware speech-to-chart lets you narrate findings in real-time while staying focused on the patient in front of you.

ICD-10 and CPT code search is built directly into the encounter workflow. Nurses and MAs can complete intake simultaneously, so the note foundation is ready before you walk in.`,
    image: '/img/features/prescriptions.png',
    imageAlt: 'Clinical documentation module shown inside the Ciyex Workspace desktop client',
    flip: false,
  },
  {
    title: 'Telehealth',
    description: `HD video consultations launch directly from a scheduled appointment — no separate app, no setup, no friction. Fully browser-based and works on any device.

Secure JWT-based room access gives providers full moderator controls while patients join as participants with a single click from their notification link.

Document SOAP notes in real-time during the session, so by the time the call ends, the chart is already complete. WCAG 2.1 accessible across desktop, tablet, and mobile.`,
    image: '/img/features/telehealth.png',
    imageAlt: 'Telehealth module shown inside the Ciyex Workspace desktop client',
    flip: true,
  },
  {
    title: 'Secure Messaging',
    description: `HIPAA-compliant messaging between providers, staff, and patients — all in one place. Real-time delivery via WebSocket with read receipts, file attachments, and urgent priority flagging.

Whether it's a provider-to-provider consultation, a care coordination note between staff, or a follow-up message to a patient, every conversation is end-to-end encrypted.

Full audit logging and configurable 6-year message retention keep your practice compliant without any manual effort.`,
    image: '/img/features/messaging.png',
    imageAlt: 'Secure messaging module shown inside the Ciyex Workspace desktop client',
    flip: false,
  },
  {
    title: 'Labs & Reports',
    description: `Order labs directly from within an encounter and track results as they arrive — abnormal values are automatically flagged in the patient chart so nothing gets missed.

Built-in reporting covers appointments, encounters, patients, and payments in one dashboard. Financial analytics show revenue collected, collection rates, outstanding balances, and aging reports at a glance.

Provider-level performance metrics and care gap identification help practices stay ahead of quality measures without extra administrative work.`,
    image: '/img/features/labs.png',
    imageAlt: 'Labs and reports module shown inside the Ciyex Workspace desktop client',
    flip: true,
  },
];

export default function Workspace(): ReactNode {
  return (
    <Layout
      title="Ciyex Workspace"
      description="Ciyex Workspace is the open source desktop client for the Ciyex EHR. Bundled with free cloud storage and every clinical module — appointments, charts, telehealth, messaging, labs — in one download for Windows, macOS, and Linux.">
      <main className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroBadge}>Free &middot; Open Source &middot; Cloud Included</span>
            <Heading as="h1" className={styles.heroTitle}>
              Ciyex Workspace.<br />
              <span className={styles.heroGradient}>Your clinic's command center.</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              A modern desktop app, the open source Ciyex EHR, and free cloud storage —
              built on the same VS Code foundation millions of developers trust, but tuned for healthcare.
            </p>
            <div className={styles.heroCta}>
              <Link className={styles.btnPrimary} to="/downloads">Download Workspace</Link>
              <Link className={styles.btnSecondary} to="/signup">Claim free cloud account &rarr;</Link>
            </div>
          </div>

          <div className={styles.mockupWrapper}>
            <div className={styles.mockupWindow}>
              <div className={styles.mockupBar}>
                <span className={styles.dot} style={{ background: '#ff5f57' }} />
                <span className={styles.dot} style={{ background: '#febc2e' }} />
                <span className={styles.dot} style={{ background: '#28c840' }} />
                <span className={styles.mockupTitle}>Ciyex Workspace — Schedule</span>
              </div>
              <div className={styles.mockupBody}>
                <img
                  src="/img/workspace-schedule.png"
                  alt="Ciyex Workspace desktop client showing the EHR schedule view"
                  className={styles.mockupImg}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stack: how the pieces fit */}
        <section className={styles.stack}>
          <div className={styles.stackInner}>
            <div className={styles.stackText}>
              <div className={styles.sectionLabel}>How the pieces fit</div>
              <Heading as="h2" className={styles.stackTitle}>
                One download.<br />Three things working together.
              </Heading>
              <p className={styles.stackDesc}>
                Most EHR vendors sell you a website. We give you a desktop app, the open source
                server that powers it, and the cloud to host your data — all together, all free.
              </p>
              <ul className={styles.stackList}>
                <li>
                  <strong>Workspace (desktop)</strong> — the app clinicians use day to day.
                </li>
                <li>
                  <strong>Ciyex EHR (server)</strong> — open source, AGPL-3.0, runs in the cloud
                  we host for you or on your own infrastructure.
                </li>
                <li>
                  <strong>Ciyex Cloud</strong> — free HIPAA-grade storage and sync, funded by donations.
                </li>
              </ul>
              <div className={styles.stackCta}>
                <Link className={styles.btnPrimary} to="/downloads">Get Workspace</Link>
                <Link className={styles.btnGhost} to="/docs/installation/docker-setup">
                  Self-host the server &rarr;
                </Link>
              </div>
            </div>
            <div className={styles.stackVisual}>
              <div className={styles.stackLayer} data-layer="desktop">
                <span className={styles.layerLabel}>Workspace Desktop</span>
                <span className={styles.layerSub}>Windows &middot; macOS &middot; Linux</span>
              </div>
              <div className={styles.stackLayer} data-layer="cloud">
                <span className={styles.layerLabel}>Ciyex Cloud (free)</span>
                <span className={styles.layerSub}>HIPAA-grade storage &middot; sync &middot; backups</span>
              </div>
              <div className={styles.stackLayer} data-layer="ehr">
                <span className={styles.layerLabel}>Ciyex EHR Server</span>
                <span className={styles.layerSub}>Open source &middot; AGPL-3.0 &middot; FHIR R4</span>
              </div>
            </div>
          </div>
        </section>

        {/* Module deep-dives (formerly /features) */}
        <section className={styles.modulesSection}>
          <div className={styles.modulesIntro}>
            <div className={styles.sectionLabel}>Every module, in the box</div>
            <Heading as="h2" className={styles.sectionTitle}>
              Built for clinicians, not administrators.
            </Heading>
            <p className={styles.sectionSubtitle}>
              Every module below runs inside Ciyex Workspace — one download, every feature.
              Designed to reduce the steps between you and your patient.
            </p>
          </div>
          <div className={styles.moduleRows}>
            {modules.map((m) => (
              <div
                key={m.title}
                className={`${styles.moduleRow} ${m.flip ? styles.moduleRowFlip : ''}`}
              >
                <div className={styles.moduleImage}>
                  <img
                    src={m.image}
                    alt={m.imageAlt}
                    className={styles.moduleScreenshot}
                    loading="lazy"
                  />
                </div>
                <div className={styles.moduleText}>
                  <Heading as="h3" className={styles.moduleTitle}>
                    {m.title}
                  </Heading>
                  {m.description.split('\n\n').map((para, j) => (
                    <p key={j} className={styles.moduleDesc}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <Heading as="h2" className={styles.ctaTitle}>
              Free, forever.<br />Because clinics deserve it.
            </Heading>
            <p className={styles.ctaDesc}>
              Ciyex is a 501(c)(3) nonprofit. Workspace, the EHR, and cloud storage are free
              because tax-deductible donations from supporters keep them that way.
            </p>
            <div className={styles.ctaButtons}>
              <Link className={styles.btnPrimary} to="/downloads">Download Workspace</Link>
              <Link className={styles.btnGhost} to="/donate">Support the project &rarr;</Link>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
