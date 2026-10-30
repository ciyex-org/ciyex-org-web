import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './about.module.css';

export default function About(): ReactNode {
  return (
    <Layout
      title="About Us"
      description="Ciyex offers medical billing, dental billing and virtual assistants for practices, and builds the open source Ciyex EHR and Workspace.">
      <main className={styles.aboutPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.heroCard}>
            <div className={styles.heroContent}>
              <div className={styles.badges}>
                <span className={styles.badge}>501(c)(3) Nonprofit</span>
                <span className={styles.badgeState}>Wyoming Corporation</span>
              </div>
              <Heading as="h1" className={styles.heroTitle}>
                About Ciyex Inc.
              </Heading>
              <p className={styles.heroSubtitle}>
                Practice services and open source healthcare software, from one team.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>
                Our Mission
              </Heading>
              <div className={styles.missionCard}>
                <p className={styles.missionText}>
                  Ciyex Inc. is a 501(c)(3) nonprofit organization. Ciyex does two things:
                  we take billing, coding, credentialing and front-office work off the plate
                  of medical and dental practices, and we build the open source Ciyex EHR and
                  Ciyex Workspace. We believe that access to high-quality healthcare
                  technology should not be limited by cost or geography.
                </p>
                <p className={styles.missionText}>
                  Our mission is to empower public health initiatives globally by
                  providing a complete EHR platform that is free to use, self-hostable,
                  built with encryption, audit logs and role-based access, and based on
                  open standards like FHIR R4 and HL7 v2. We
                  serve patients, clinics, hospitals, and healthcare organizations of all
                  sizes, from rural community health centers to large hospital networks.
                </p>
                <p className={styles.missionText}>
                  Revenue from our services helps fund that software. By making healthcare
                  technology open source, we aim to reduce barriers
                  to adoption, promote data interoperability, and enable healthcare
                  providers to focus on what matters most: patient care.
                </p>
              </div>
            </div>
          </section>

          {/* Donate Section */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>
                Support Our Mission
              </Heading>
              <div className={styles.donateCard}>
                <p className={styles.missionText}>
                  Service revenue and the generosity of our community fund our open source
                  healthcare technology. As a 501(c)(3) nonprofit, contributions are
                  tax-deductible and go directly to development.
                </p>
                <div className={styles.donateCta}>
                  <a
                    className={styles.donateBtn}
                    href="/donate"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate Info Section */}
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <Heading as="h2" className={styles.sectionTitle}>
                Corporate Information
              </Heading>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>&#x1f3e2;</div>
                  <h3 className={styles.infoLabel}>Registered Address</h3>
                  <p className={styles.infoValue}>
                    Ciyex Inc.<br />
                    30 N Gould St, Ste N<br />
                    Sheridan, WY 82801<br />
                    United States
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>&#x1f4e7;</div>
                  <h3 className={styles.infoLabel}>Contact</h3>
                  <p className={styles.infoValue}>
                    <a href="tel:+18448742236" className={styles.infoLink}>
                      (844) 874-2236
                    </a>
                    <br />
                    <a href="mailto:help@ciyex.org" className={styles.infoLink}>
                      help@ciyex.org
                    </a>
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>&#x1f4cb;</div>
                  <h3 className={styles.infoLabel}>Incorporation</h3>
                  <p className={styles.infoValue}>
                    State of Wyoming<br />
                    Incorporated January 12, 2026<br />
                    Filing #2026-001863987
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>&#x2696;&#xfe0f;</div>
                  <h3 className={styles.infoLabel}>Organization Type</h3>
                  <p className={styles.infoValue}>
                    501(c)(3) Nonprofit Corporation<br />
                    EIN: 41-3609665<br />
                    Licensed under AGPL-3.0
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
