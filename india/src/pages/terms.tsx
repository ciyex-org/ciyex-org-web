import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Terms(): ReactNode {
  return (
    <Layout
      title="Terms of Service"
      description="Ciyex Terms of Service - Terms governing use of the Ciyex HIMS platform provided by Qiaben Healthcare Solutions Pvt Ltd.">
      <main style={{ padding: '60px 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Heading as="h1">Terms of Service</Heading>
          <p style={{ color: 'var(--cx-slate-500)', marginBottom: '2rem' }}>
            <strong>Effective Date:</strong> March 1, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 12, 2026
          </p>

          <p>
            These Terms of Service ("Terms") govern your use of the Ciyex HIMS platform, website
            (<a href="https://ciyex.org/en-in/">ciyex.org</a>), and related services (collectively, the "Services")
            provided by Qiaben Healthcare Solutions Pvt Ltd ("Ciyex," "we," "us," or "our"). By accessing or using
            our Services, you agree to be bound by these Terms.
          </p>

          <Heading as="h2">1. Acceptance of Terms</Heading>
          <p>
            By accessing or using our Services, you confirm that you are at least 18 years old (or the
            age of majority in your jurisdiction) and agree to comply with these Terms. If you are using
            the Services on behalf of an organization, you represent that you have authority to bind that
            organization to these Terms.
          </p>

          <Heading as="h2">2. Our Mission and Services</Heading>
          <p>
            Ciyex provides modern health records technology to clinics and hospitals of every size.
            We license a commercial Electronic Health Records (HIMS) platform, available as a managed
            cloud service or self-hosted on your own infrastructure. Our Services include:
          </p>
          <ul>
            <li>The Ciyex HIMS cloud-hosted platform, provided under a commercial subscription</li>
            <li>Self-hosted HIMS software and documentation for organizations that want full control</li>
            <li>A patient portal so individuals can access and manage their own health records</li>
            <li>The Ciyex website and community forum</li>
            <li>Developer tools, APIs, and SDKs for interoperability</li>
          </ul>

          <Heading as="h2">3. User Accounts</Heading>
          <p>
            To access certain features, you must create an account. You are responsible for maintaining
            the confidentiality of your credentials and for all activities under your account. You agree
            to provide accurate, current, and complete information and to notify us immediately of any
            unauthorized use.
          </p>

          <Heading as="h2">4. Acceptable Use</Heading>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for any unlawful purpose or in violation of any applicable regulations (including the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000)</li>
            <li>Attempt to gain unauthorized access to any part of the Services or related systems</li>
            <li>Interfere with or disrupt the integrity or performance of the Services</li>
            <li>Upload or transmit viruses, malware, or other harmful code</li>
            <li>Collect or harvest user data without consent</li>
            <li>Use the Services to store or process patient data without a valid data processing agreement and lawful consent</li>
          </ul>

          <Heading as="h2">5. Healthcare Disclaimer</Heading>
          <p>
            Ciyex HIMS is a software tool designed to support healthcare providers in delivering better
            care to their communities. It is <strong>not</strong> a substitute for professional medical
            judgment. Ciyex does not provide medical advice, diagnosis, or treatment. Healthcare providers
            using Ciyex HIMS are solely responsible for clinical decisions and compliance with applicable
            healthcare regulations. Patients should always consult their healthcare provider for medical concerns.
          </p>

          <Heading as="h2">6. Patient Data Protection</Heading>
          <p>
            Every patient deserves the same level of data protection, regardless of where they receive care.
            Health data is sensitive personal data under Indian law. Where your organisation processes
            patient data through Ciyex HIMS, you act as the Data Fiduciary and we act as a Data Processor
            on your behalf, in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act)
            and the Information Technology Act, 2000 together with the rules made under it. A data
            processing agreement setting out each party's obligations forms part of your subscription.
            The platform is built with enterprise-grade security, so single-site clinics get the same
            protections as large hospital networks. Your organisation remains responsible for obtaining
            valid patient consent and for its own compliance obligations, including any requirements under
            the Clinical Establishments Act and applicable State medical records rules.
          </p>

          <Heading as="h2">7. Software License</Heading>
          <p>
            The Ciyex HIMS software is licensed, not sold. Subject to these Terms and your active
            subscription, Qiaben Healthcare Solutions Pvt Ltd grants you a non-exclusive, non-transferable, revocable license to
            use the software for your organization's internal healthcare operations. You may not
            sublicense, resell, reverse engineer, or redistribute the software without our prior written
            consent. All rights not expressly granted are reserved.
          </p>

          <Heading as="h2">8. Intellectual Property</Heading>
          <p>
            The Ciyex name, logo, and branding are trademarks of Qiaben Healthcare Solutions Pvt Ltd. The software, and all
            content on the website (documentation, blog posts, design), is the property of Qiaben Healthcare Solutions Pvt Ltd
            unless otherwise noted.
          </p>

          <Heading as="h2">9. Fees and Payment</Heading>
          <p>
            Access to the Services is provided under a paid subscription. Fees, billing frequency, and
            included capacity are set out in your order form or subscription plan. Unless stated
            otherwise, fees are payable in advance and are exclusive of GST and other applicable taxes,
            which will be charged at the prevailing rate. Fees are non-refundable except where required by law.
            We may change pricing on renewal with prior written notice. Contact{' '}
            <a href="mailto:info@qiaben.com">info@qiaben.com</a> with billing questions.
          </p>

          <Heading as="h2">10. Disclaimer of Warranties</Heading>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. CIYEX DOES NOT WARRANT THAT THE SERVICES WILL
            BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </p>

          <Heading as="h2">11. Limitation of Liability</Heading>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CIYEX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE
            SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO CIYEX IN THE TWELVE (12)
            MONTHS PRECEDING THE CLAIM.
          </p>

          <Heading as="h2">12. Indemnification</Heading>
          <p>
            You agree to indemnify, defend, and hold harmless Qiaben Healthcare Solutions Pvt Ltd, its directors, officers, and
            contributors from any claims, damages, losses, or expenses (including reasonable attorneys' fees)
            arising from your use of the Services or violation of these Terms.
          </p>

          <Heading as="h2">13. Termination</Heading>
          <p>
            We may suspend or terminate your access to the Services at any time for any reason, including
            violation of these Terms. Upon termination, your right to use the Services ceases immediately.
            Provisions that by their nature should survive termination shall remain in effect.
          </p>

          <Heading as="h2">14. Governing Law</Heading>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without
            regard to its conflict of law provisions. Any disputes arising under these Terms shall be
            subject to the exclusive jurisdiction of the courts at Coimbatore, Tamil Nadu.
          </p>

          <Heading as="h2">15. Changes to Terms</Heading>
          <p>
            We may update these Terms from time to time. We will notify you of material changes by posting
            the updated Terms on this page with a revised date. Continued use of the Services after changes
            constitutes acceptance of the updated Terms.
          </p>

          <Heading as="h2">16. Contact Us</Heading>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><strong>Qiaben Healthcare Solutions Pvt Ltd</strong></li>
            <li>1/39, Veerappanur</li>
            <li>Coimbatore, Tamil Nadu 641105, India</li>
            <li>Email: <a href="mailto:info@qiaben.com">info@qiaben.com</a></li>
          </ul>
        </div>
      </main>
    </Layout>
  );
}
