import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Privacy(): ReactNode {
  return (
    <Layout
      title="Privacy Policy"
      description="Ciyex Privacy Policy - How Qiaben Healthcare Solutions Pvt Ltd protects patient data and your personal information.">
      <main style={{ padding: '60px 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Heading as="h1">Privacy Policy</Heading>
          <p style={{ color: 'var(--cx-slate-500)', marginBottom: '2rem' }}>
            <strong>Effective Date:</strong> March 1, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 12, 2026
          </p>

          <p>
            Qiaben Healthcare Solutions Pvt Ltd ("Ciyex," "we," "us," or "our") builds healthcare technology that puts
            patients first. We believe every person deserves strong privacy protections, regardless
            of where they receive care. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website at{' '}
            <a href="https://ciyex.org/en-in/">ciyex.org</a> and use our services.
          </p>

          <Heading as="h2">1. Our Commitment to Patients</Heading>
          <p>
            We hold ourselves to the highest standard of data stewardship. Patients own their health
            data. Our platform is designed so that healthcare providers maintain full control of patient
            information, with no data monetization, no advertising, and no selling of personal
            information to third parties.
          </p>

          <Heading as="h2">2. Information We Collect</Heading>

          <Heading as="h3">Information You Provide</Heading>
          <ul>
            <li><strong>Account Information:</strong> When you sign up for Ciyex HIMS, we collect your name, email address, organization name, and role.</li>
            <li><strong>Billing Information:</strong> When you subscribe, payment details are handled directly by our payment processor. We receive your name, email, and billing amount but never your full card number.</li>
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
            <li>Provide, operate, and maintain our HIMS platform and website</li>
            <li>Process payments and send invoices and receipts</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send important updates about our services (you may opt out at any time)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <Heading as="h2">4. Health Data Protection under Indian Law</Heading>
          <p>
            Protecting patient health information is central to our mission. Health data is sensitive
            personal data under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the
            Information Technology Act, 2000 together with the rules made under it. Where a hospital or
            clinic processes patient data through Ciyex HIMS, that organisation is the Data Fiduciary and
            we act as a Data Processor on its instructions under a written data processing agreement.
            Patient data is handled with enterprise-grade protection, whether care is delivered at a
            single-doctor clinic or a multi-facility hospital network. The Data Fiduciary remains
            responsible for obtaining valid patient consent and issuing notices required by the DPDP Act.
            Our website (ciyex.org) does not collect or process patient health records.
          </p>

          <Heading as="h2">5. Data Sharing and Disclosure</Heading>
          <p>We do not sell, trade, or rent your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (e.g., payment processing, cloud hosting providers). These providers are contractually obligated to protect your data.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental regulation.</li>
            <li><strong>Business Reporting:</strong> Aggregate, anonymized data may be used in internal analytics and company reporting.</li>
          </ul>

          <Heading as="h2">6. Data Security</Heading>
          <p>
            We implement industry-standard security measures including encryption in transit (TLS/SSL),
            encryption at rest, role-based access controls, and audit logging. While we strive to
            protect your information, no method of electronic transmission or storage is 100% secure.
          </p>

          <Heading as="h2">7. Data Retention</Heading>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes
            outlined in this policy, comply with legal obligations, resolve disputes, and enforce
            our agreements. You may request deletion of your account and associated data at any time.
          </p>

          <Heading as="h2">8. Your Rights as a Data Principal</Heading>
          <p>
            As a Data Principal under the DPDP Act, 2023, you have the right to:
          </p>
          <ul>
            <li>Obtain a summary of the personal data we process about you and the processing activities undertaken</li>
            <li>Request correction, completion, or updating of inaccurate or misleading personal data</li>
            <li>Request erasure of your personal data, where retention is no longer necessary or required by law</li>
            <li>Nominate another individual to exercise your rights in the event of your death or incapacity</li>
            <li>Withdraw your consent at any time, as easily as it was given</li>
            <li>Have a readily available means of grievance redressal</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:info@qiaben.com">info@qiaben.com</a>. We will respond within the timelines
            prescribed under the DPDP Act. If your concern is not resolved to your satisfaction, you may
            escalate it to the Data Protection Board of India.
          </p>

          <Heading as="h2">8a. Grievance Officer</Heading>
          <p>
            In accordance with the DPDP Act, 2023 and the Information Technology (Intermediary
            Guidelines) Rules, grievances regarding the processing of your personal data may be addressed
            to our Grievance Officer at <a href="mailto:info@qiaben.com">info@qiaben.com</a>, or by post
            to Qiaben Healthcare Solutions Pvt Ltd, 1/39, Veerappanur, Coimbatore, Tamil Nadu 641105,
            India.
          </p>

          <Heading as="h2">9. Transparency and Audits</Heading>
          <p>
            We document how we handle data and make our security practices available for customer
            review under NDA, including audit logs, subprocessor lists, and incident response
            procedures. Transparency is fundamental to earning the trust of the patients and providers
            we serve.
          </p>

          <Heading as="h2">10. Third-Party Links</Heading>
          <p>
            Our website may contain links to third-party websites (e.g., GitHub, community forum).
            We are not responsible for the privacy practices of these external sites. We encourage you
            to review their privacy policies.
          </p>

          <Heading as="h2">11. Children's Privacy</Heading>
          <p>
            Under the DPDP Act, 2023, a child is any individual under the age of 18. Our website and
            marketing services are not directed to children. We do not knowingly collect personal data
            from a child without verifiable consent from a parent or lawful guardian, and we do not
            undertake tracking, behavioural monitoring, or targeted advertising directed at children.
            Where patient records of minors are processed through Ciyex HIMS, that processing is carried
            out on the instructions of the treating hospital or clinic as Data Fiduciary. If you believe
            we have collected such data, please contact us immediately.
          </p>

          <Heading as="h2">12. Changes to This Policy</Heading>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material
            changes by posting the updated policy on this page with a revised "Last Updated" date.
            Your continued use of our services after changes constitutes acceptance of the updated policy.
          </p>

          <Heading as="h2">13. Contact Us</Heading>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us:
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
