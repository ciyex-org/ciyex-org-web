import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <div className={styles.badges}>
              <span className={styles.badge}>Open Source</span>
              <span className={styles.badgeFhir}>FHIR R4</span>
              <span className={styles.badgeHl7}>HL7 v2</span>
            </div>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              A complete, modern Electronic Health Records system built for clinics,
              hospitals, and healthcare organizations. HIPAA-compliant, interoperable,
              and designed for the future of healthcare.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Get Started
              </Link>
              <Link
                className="button button--outline button--lg"
                to="https://github.com/ciyex-org/ciyex">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Open Source EHR"
      description="Ciyex EHR - Open Source Electronic Health Records system. Modern, secure, FHIR-compliant, and built for healthcare interoperability.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
