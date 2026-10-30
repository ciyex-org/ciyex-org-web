import React from 'react';
import { useCountry } from '@site/src/context/CountryContext';
import styles from './styles.module.css';

/**
 * Shown when the visitor's IP resolves to a country whose site they are not on
 * — e.g. someone in India landing on the US site. Offers to move them to the
 * matching country site, which is a real navigation: different pages, pricing, and
 * legal entity.
 *
 * Declining is remembered, so nobody is asked twice.
 */
export default function CountryPrompt(): React.ReactElement | null {
  const { current, detected, promptDismissed, dismissPrompt, urlForCountry } = useCountry();

  if (promptDismissed || !detected || detected.code === current.code) {
    return null;
  }

  return (
    <div className={styles.backdrop} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="country-prompt-title"
        aria-describedby="country-prompt-body">
        <div className={styles.flag} aria-hidden="true">
          {detected.flag}
        </div>

        <h2 className={styles.title} id="country-prompt-title">
          Looks like you&rsquo;re in {detected.label}
        </h2>

        <p className={styles.body} id="country-prompt-body">
          You&rsquo;re viewing the {current.label} site ({current.title}). Switch to{' '}
          {detected.label} for {detected.title}, local pricing, and regional information.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.primary}
            href={urlForCountry(detected)}
            onClick={dismissPrompt}>
            Go to {detected.label} site
          </a>
          <button type="button" className={styles.secondary} onClick={dismissPrompt}>
            Stay on {current.label}
          </button>
        </div>
      </div>
    </div>
  );
}
