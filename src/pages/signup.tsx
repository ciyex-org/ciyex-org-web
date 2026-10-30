import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CONTACT } from '@site/src/data/contact';
import styles from './signup.module.css';

function CalendlyEmbed() {
  return (
    <div className={styles.calendlyContainer}>
      <iframe
        src={`${CONTACT.bookingUrl}?hide_gdpr_banner=1`}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a meeting with Ciyex"
        className={styles.calendlyEmbed}
      />
    </div>
  );
}

export default function Signup(): ReactNode {
  return (
    <Layout
      title="Book a Consultation"
      description="Book a consultation with the Ciyex team about practice services or the open source Ciyex EHR.">
      <main className={styles.signupPage}>
        <div className="container">
          <div className={styles.signupCard}>
            <div className={styles.signupHeader}>
              <div className={styles.badges}>
                <span className={styles.badge}>Free consultation</span>
              </div>
              <Heading as="h1" className={styles.title}>
                Talk to the Ciyex team
              </Heading>
              <p className={styles.subtitle}>
                Book a free consultation about billing, virtual assistants or the
                Ciyex EHR. We'll learn about your goals and walk through the next steps.
              </p>
            </div>
            <CalendlyEmbed />
            <div className={styles.trustSection}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f512;</span>
                <span>BAA before PHI access</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f4e6;</span>
                <span>Works with your current system</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f30d;</span>
                <span>501(c)(3) Nonprofit</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
