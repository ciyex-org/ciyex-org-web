import { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './donate.module.css';

function DonateForm() {
  const [height, setHeight] = useState(820);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin?.includes('zeffy.com') || !e.data) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data.type === 'zeffy-embed:step-changed') {
          setHeight(1600);
        }
      } catch {
        // not JSON
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={styles.formEmbed} style={{ height }}>
      <iframe
        ref={iframeRef}
        title="Donate to Ciyex EHR"
        src="https://www.zeffy.com/embed/donation-form/ciyex-ehr"
        allowTransparency={true}
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}

const helpItems = [
  'Keep all medical records in one secure location',
  'Access health information anytime, anywhere',
  'Share medical history easily with doctors and clinics',
  'Track medications, lab results, allergies, and vaccinations',
  'Manage health records for children and family members',
  'Help caregivers support elderly family members',
  'Provide accurate medical history during emergencies',
  'Reduce repeated tests and paperwork at hospitals',
  'Receive better and faster care from healthcare providers',
];

export default function DonatePage() {
  return (
    <Layout
      title="Donate"
      description="Support Ciyex EHR, a 501(c)(3) nonprofit building open source healthcare technology. Every dollar is tax-deductible.">

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>501(c)(3) Nonprofit &middot; EIN 41-3609665</div>
          <Heading as="h1" className={styles.title}>
            Help us build healthcare<br />
            <span className={styles.gradient}>for everyone.</span>
          </Heading>
          <p className={styles.subtitle}>
            Ciyex is a nonprofit. Every dollar goes directly to building open source
            healthcare technology. Your donation is tax-deductible.
          </p>
        </div>
      </section>

      {/* ── Donation Form ── */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <DonateForm />
        </div>
      </section>

      {/* ── Description ── */}
      <section className={styles.descSection}>
        <div className={styles.descInner}>
          <div className={styles.descHeader}>
            <Heading as="h2" className={styles.descTitle}>
              Fund Next-Generation Healthcare Technology
            </Heading>
            <p className={styles.descSubtitle}>
              Ciyex EHR — Your Health Records, In Your Control
            </p>
          </div>

          <div className={styles.descBody}>
            <p>
              Ciyex EHR is building a secure digital health platform that allows people to store, manage,
              and share their health records in one place — for free.
            </p>
            <p>
              Today, medical records are scattered across hospitals, clinics, labs, and pharmacies.
              This makes it difficult for individuals to access their own health information when they need it.
              Ciyex solves this by giving people a single, secure place to manage their entire medical history.
            </p>
            <p>
              Community support helps fund the development, testing, and ONC certification needed to ensure
              the platform meets modern healthcare technology standards and remains accessible to everyone.
            </p>
          </div>

          {/* How Ciyex Helps */}
          <div className={styles.helpBlock}>
            <Heading as="h3" className={styles.helpTitle}>How Ciyex Helps People</Heading>
            <p className={styles.helpIntro}>With Ciyex, individuals can:</p>
            <ul className={styles.helpList}>
              {helpItems.map((item) => (
                <li key={item} className={styles.helpItem}>
                  <span className={styles.helpBullet}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.helpClose}>
              By putting health records directly in the hands of individuals, Ciyex helps people stay
              informed, prepared, and in control of their health.
            </p>
          </div>
        </div>
      </section>

      {/* ── Where your donation goes ── */}
      <section className={styles.impact}>
        <div className={styles.impactInner}>
          <Heading as="h2" className={styles.impactTitle}>Where your donation goes</Heading>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Engineering</h3>
              <p>Full-time developers building FHIR-compliant, interoperable EHR features.</p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3>Security & Compliance</h3>
              <p>HIPAA compliance, security audits, and SOC 2 certification.</p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>Community Health</h3>
              <p>Free deployments for community health centers and rural clinics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Support Matters ── */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <Heading as="h2" className={styles.whyTitle}>Why Support Matters</Heading>
          <p className={styles.whySubtitle}>
            Community support helps build and certify a platform that keeps healthcare accessible, secure, and people-focused.
          </p>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Support</h3>
              <p>Build a free health record platform for individuals and families.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3>Empower</h3>
              <p>Give people full access and control over their medical information.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3>Innovate</h3>
              <p>Accelerate secure healthcare technology designed around patient care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Ciyex ── */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <Heading as="h2" className={styles.aboutTitle}>About Ciyex</Heading>
          <p>
            Ciyex Inc. is a 501(c)(3) nonprofit organization dedicated to building modern, secure, and interoperable
            open source electronic health record (EHR) systems. We believe that access to high-quality healthcare
            technology should not be limited by cost or geography.
          </p>
          <p>
            Our mission is to empower public health initiatives globally by providing a complete, HIPAA-compliant
            EHR platform that is free to use, self-hostable, and built on open standards like FHIR R4 and HL7 v2.
            We serve patients, clinics, hospitals, and healthcare organizations of all sizes — from rural community
            health centers to large hospital networks.
          </p>
          <p>
            By making healthcare technology open source, we aim to reduce barriers to adoption, promote data
            interoperability, and enable healthcare providers to focus on what matters most — patient care.
          </p>
        </div>
      </section>

    </Layout>
  );
}
