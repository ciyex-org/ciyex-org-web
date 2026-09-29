import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Privacy(): ReactNode {
  return (
    <Layout
      title="Privacy Policy"
      description="Ciyex Privacy Policy - How we protect patient data and your personal information as a nonprofit open source EHR.">
      <main style={{ padding: '60px 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Heading as="h1">Privacy Policy</Heading>
          <p style={{ color: 'var(--cx-slate-500)', marginBottom: '2rem' }}>
            <strong>Effective Date:</strong> March 1, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> September 29, 2026
          </p>

          <p>
            Ciyex Inc. ("Ciyex," "we," "us," or "our") is a 501(c)(3) nonprofit organization
            (EIN: 41-3609665) dedicated to building open source healthcare technology that puts
            patients first. We believe every person deserves strong privacy protections, regardless
            of where they receive care. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website at{' '}
            <a href="https://ciyex.org">ciyex.org</a> and use our services.
          </p>

          <Heading as="h2">1. Our Commitment to Patients</Heading>
          <p>
            As a nonprofit building open source health records technology, we hold ourselves to the highest
            standard of data stewardship. Patients own their health data. Our platform is designed so that
            communities and healthcare providers maintain full control of patient information, with no data
            monetization, no advertising, and no selling of personal information to third parties.
          </p>

          <Heading as="h2">2. Information We Collect</Heading>

          <Heading as="h3">Information You Provide</Heading>
          <ul>
            <li><strong>Account Information:</strong> When you sign up for Ciyex EHR, we collect your name, email address, organization name, and role.</li>
            <li><strong>Donation Information:</strong> When you donate via our payment processor (Zeffy), your payment details are handled directly by Zeffy. We receive your name, email, and donation amount but never your credit card number.</li>
            <li><strong>Contact Information:</strong> When you contact us via email or our community forum, we collect your name, email, and message content.</li>
          </ul>

          <Heading as="h3">Information Collected Automatically</Heading>
          <ul>
            <li><strong>Usage Data:</strong> We may collect information about how you access and use our website, including your IP address, browser type, operating system, pages visited, and time spent on pages.</li>
            <li><strong>Cookies:</strong> We use essential cookies to maintain session state. We do not use tracking cookies for advertising purposes.</li>
          </ul>

          <Heading as="h2">3. How We Use Your Information</Heading>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our EHR platform and website</li>
            <li>Process donations and send tax receipts</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send important updates about our services (you may opt out at any time)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <Heading as="h2">4. HIPAA Compliance and Patient Data Protection</Heading>
          <p>
            Protecting patient health information is central to our mission. Ciyex EHR is designed to be
            HIPAA-compliant, ensuring that every patient's Protected Health Information (PHI) receives
            enterprise-grade protection, whether they receive care at a community health center, rural
            clinic, or urban hospital. PHI processed through the Ciyex EHR platform is handled in
            accordance with the Health Insurance Portability and Accountability Act (HIPAA). Healthcare
            organizations using Ciyex EHR are responsible for entering into a Business Associate Agreement
            (BAA) with Ciyex before processing PHI. Our website (ciyex.org) does not collect or process PHI.
          </p>

          <Heading as="h2">5. Data Sharing and Disclosure</Heading>
          <p>We do not sell, trade, or rent your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (e.g., Zeffy for donations, cloud hosting providers). These providers are contractually obligated to protect your data.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental regulation.</li>
            <li><strong>Nonprofit Reporting:</strong> Aggregate, anonymized data may be used in grant applications and annual reports.</li>
          </ul>

          <Heading as="h2" id="sms">6. Text Messaging (SMS)</Heading>
          <p>
            Clinics using Ciyex EHR may send patients appointment reminders, lab result, prescription
            refill and billing notifications by text message. Patients opt in on our{' '}
            <a href="/sms-consent">SMS consent page</a>, in their clinic's patient portal, or on a paper
            consent form at the clinic. We collect the mobile number and the date, time and method of
            consent so we can send the messages you asked for and honor opt-out requests.
          </p>
          <p>
            <strong>
              Mobile information will not be shared with third parties or affiliates for marketing or
              promotional purposes. Text messaging originator opt-in data and consent will not be shared
              with any third parties.
            </strong>
          </p>
          <p>
            You can opt out at any time by replying STOP. Reply HELP or email{' '}
            <a href="mailto:help@ciyex.org">help@ciyex.org</a> for help.
          </p>

          <Heading as="h2">7. Data Security</Heading>
          <p>
            We implement industry-standard security measures including encryption in transit (TLS/SSL),
            encryption at rest, role-based access controls, and audit logging. While we strive to
            protect your information, no method of electronic transmission or storage is 100% secure.
          </p>

          <Heading as="h2">8. Data Retention</Heading>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes
            outlined in this policy, comply with legal obligations, resolve disputes, and enforce
            our agreements. You may request deletion of your account and associated data at any time.
          </p>

          <Heading as="h2">9. Your Rights</Heading>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to or restrict certain processing of your data</li>
            <li>Data portability (receive your data in a structured format)</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:help@ciyex.org">help@ciyex.org</a>.</p>

          <Heading as="h2">10. Open Source Transparency</Heading>
          <p>
            Our source code is publicly available under the AGPL-3.0 license. This means anyone can
            inspect how we handle data, verify our security practices, and confirm that we do what we
            say. Transparency is fundamental to earning the trust of the patients and communities we serve.
          </p>

          <Heading as="h2">11. Third-Party Links</Heading>
          <p>
            Our website may contain links to third-party websites (e.g., GitHub, Zeffy, community forum).
            We are not responsible for the privacy practices of these external sites. We encourage you
            to review their privacy policies.
          </p>

          <Heading as="h2">12. Children's Privacy</Heading>
          <p>
            Our website and services are not directed to children under 13. We do not knowingly collect
            personal information from children under 13. If you believe we have collected such
            information, please contact us immediately.
          </p>

          <Heading as="h2">13. Changes to This Policy</Heading>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material
            changes by posting the updated policy on this page with a revised "Last Updated" date.
            Your continued use of our services after changes constitutes acceptance of the updated policy.
          </p>

          <Heading as="h2">14. Contact Us</Heading>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><strong>Ciyex Inc.</strong></li>
            <li>30 N Gould St, Ste N</li>
            <li>Sheridan, WY 82801</li>
            <li>Email: <a href="mailto:help@ciyex.org">help@ciyex.org</a></li>
          </ul>
        </div>
      </main>
    </Layout>
  );
}
