import { useState, type FormEvent, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './sms-consent.module.css';

export default function SmsConsent(): ReactNode {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const digits = phone.replace(/\D/g, '');
  const validPhone = digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validPhone && agreed) {
      setSubmitted(true);
    }
  }

  return (
    <Layout
      title="SMS Consent"
      description="Opt in to receive appointment reminders, lab result, prescription refill and billing notifications from Ciyex EHR by text message.">
      <main style={{ padding: '60px 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Heading as="h1">Ciyex EHR Text Message Notifications</Heading>
          <p>
            Clinics using Ciyex EHR can send patients text messages about their care: appointment
            reminders, lab result notifications, prescription refill notifications and billing
            notifications. Messages are sent only to patients who opt in. Patients opt in on this
            form, in their clinic's Ciyex patient portal, or on a paper consent form at the clinic's
            front desk. All three use the same consent wording shown below.
          </p>

          <div className={styles.card}>
            <Heading as="h2" className={styles.cardTitle}>Opt in to text messages</Heading>
            {submitted ? (
              <p className={styles.success} role="status">
                Thank you. You have agreed to receive text messages from Ciyex EHR. You can
                reply STOP at any time to opt out, or HELP for help.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="sms-phone" className={styles.label}>Mobile phone number</label>
                <input
                  id="sms-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                  required
                />

                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    I agree to receive appointment reminders, lab result, prescription refill and
                    billing notifications from Ciyex EHR by text at the number provided. Message
                    frequency varies. Msg &amp; data rates may apply. Reply HELP for help, STOP to
                    opt out. Consent is not a condition of receiving care.{' '}
                    <Link to="/privacy#sms">Privacy Policy</Link> | <Link to="/terms#sms">Terms</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!validPhone || !agreed}>
                  Submit
                </button>
              </form>
            )}
          </div>

          <Heading as="h2">What to expect</Heading>
          <ul>
            <li><strong>Program:</strong> Ciyex EHR patient notifications.</li>
            <li><strong>Messages:</strong> appointment reminders, lab result notifications, prescription refill notifications and billing notifications from your clinic.</li>
            <li><strong>Frequency:</strong> message frequency varies with your appointments and care.</li>
            <li><strong>Cost:</strong> message and data rates may apply.</li>
            <li><strong>Help:</strong> reply HELP, or email <a href="mailto:help@ciyex.org">help@ciyex.org</a>.</li>
            <li><strong>Opt out:</strong> reply STOP at any time. You will get one confirmation message and no further texts.</li>
          </ul>
          <p>
            Your mobile number and consent are not shared with third parties or affiliates for
            marketing or promotional purposes. See our <Link to="/privacy#sms">Privacy Policy</Link>{' '}
            and <Link to="/terms#sms">SMS Terms</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
