import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/css/india/signup.module.css';

function CalendlyEmbed() {
  return (
    <div className={styles.calendlyContainer}>
      <iframe
        src="https://calendly.com/qiaben/ciyex?hide_gdpr_banner=1"
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
      title="Sign Up - It's Free"
      description="Book a free demo of Ciyex HIMS — hospital management software for Indian hospitals and clinics, from registration and UHID through to the final bill.">
      <main className={styles.signupPage}>
        <div className="container">
          <div className={styles.signupCard}>
            <div className={styles.signupHeader}>
              <div className={styles.badges}>
                <span className={styles.badge}>Free</span>
                <span className={styles.badgeOpen}>FHIR R4 Native</span>
              </div>
              <Heading as="h1" className={styles.title}>
                Get Started with Ciyex HIMS
              </Heading>
              <p className={styles.subtitle}>
                Book a free consultation and we will walk your team through Ciyex HIMS
                using your wards, your tariffs and your number series — setup, the modules
                you would switch on, and whatever you want to ask.
              </p>
            </div>
            <CalendlyEmbed />
            <div className={styles.trustSection}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f512;</span>
                <span>DPDP Act 2023</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f4e6;</span>
                <span>Self-Hostable</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>&#x1f30d;</span>
                <span>ABDM-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
