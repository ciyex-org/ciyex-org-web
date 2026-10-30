import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BookingCalendar from '@site/src/components/BookingCalendar';
import styles from '@site/src/css/india/signup.module.css';

export default function Signup(): ReactNode {
  return (
    <Layout
      title="Book a Ciyex HIMS Demo"
      description="Schedule a Ciyex HIMS product demo for your hospital. Explore registration, patient care, diagnostics, billing and deployment options with the Qiaben team.">
      <main className={styles.signupPage}>
        <div className="container">
          <div className={styles.signupCard}>
            <div className={styles.signupHeader}>
              <div className={styles.badges}>
                <span className={styles.badge}>Product demo</span>
                <span className={styles.badgeOpen}>FHIR R4</span>
              </div>
              <Heading as="h1" className={styles.title}>
                See Ciyex HIMS in a demo built around your hospital.
              </Heading>
              <p className={styles.subtitle}>
                Tell us about your departments and current systems. We’ll walk your team
                through relevant Ciyex HIMS workflows, configuration options and
                implementation questions.
              </p>
            </div>
            <div className={styles.calendlyContainer}>
              <BookingCalendar />
            </div>
            <div className={styles.trustSection}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f512;</span>
                <span>Data protection</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f4e6;</span>
                <span>Self-Hostable</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f30d;</span>
                <span>ABDM connectivity</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
