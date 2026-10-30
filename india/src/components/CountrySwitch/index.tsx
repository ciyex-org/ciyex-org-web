import React, { type ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { COUNTRIES, CURRENT_COUNTRY, pathForCountry, type CountryCode } from '@site/src/context/CountryContext';

const ORDER: readonly CountryCode[] = ['US', 'IN'];

function Flag({ code }: { code: CountryCode }) {
  if (code === 'IN') {
    return (
      <svg className="locale-flag" viewBox="0 0 24 16" aria-hidden="true">
        <path fill="#FF9933" d="M0 0h24v5.34H0z" />
        <path fill="#fff" d="M0 5.33h24v5.34H0z" />
        <path fill="#138808" d="M0 10.66h24V16H0z" />
        <circle cx="12" cy="8" r="2.05" fill="none" stroke="#000080" strokeWidth=".65" />
        <circle cx="12" cy="8" r=".35" fill="#000080" />
      </svg>
    );
  }
  return (
    <svg className="locale-flag" viewBox="0 0 24 16" aria-hidden="true">
      <path fill="#fff" d="M0 0h24v16H0z" />
      <path fill="#b22234" d="M0 0h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24V16H0z" />
      <path fill="#3c3b6e" d="M0 0h10.5v8.62H0z" />
      <path fill="#fff" d="m1.5 1 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zm3.4 0 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zm3.4 0 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zM3.2 3.15l.3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zm3.4 0 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zM1.5 5.3l.3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zm3.4 0 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05zm3.4 0 .3.72.78.05-.6.48.2.75-.68-.42-.67.42.2-.75-.6-.48.78-.05z" />
    </svg>
  );
}

function Option({ code }: { code: CountryCode }) {
  return (
    <span className="locale-option">
      <Flag code={code} />
      <span>{COUNTRIES[code].label}</span>
    </span>
  );
}

/**
 * Country menu: shows the site being viewed and lists both. Each country is a
 * separate Docusaurus site, so these must stay plain anchors: a router link
 * would look for the page in this site and land on Page Not Found.
 */
export default function CountrySwitch({ mobile }: { mobile?: boolean }): ReactNode {
  const { pathname } = useLocation();
  const { siteConfig: { baseUrl } } = useDocusaurusContext();
  const hrefFor = (code: CountryCode) => (code === CURRENT_COUNTRY
    ? pathname
    : pathForCountry(COUNTRIES[code], pathname, baseUrl));

  if (mobile) {
    return (
      <>
        {ORDER.map((code) => (
          <li key={code} className="menu__list-item">
            <a
              className={`menu__link${code === CURRENT_COUNTRY ? ' menu__link--active' : ''}`}
              aria-current={code === CURRENT_COUNTRY ? 'true' : undefined}
              href={hrefFor(code)}>
              <Option code={code} />
            </a>
          </li>
        ))}
      </>
    );
  }

  return (
    <div className="navbar__item dropdown dropdown--hoverable dropdown--right">
      <a
        className="navbar__link"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-label={`Country: ${COUNTRIES[CURRENT_COUNTRY].label}`}
        onClick={(event) => event.preventDefault()}>
        <Option code={CURRENT_COUNTRY} />
      </a>
      <ul className="dropdown__menu">
        {ORDER.map((code) => (
          <li key={code}>
            <a
              className={`dropdown__link${code === CURRENT_COUNTRY ? ' dropdown__link--active' : ''}`}
              aria-current={code === CURRENT_COUNTRY ? 'true' : undefined}
              href={hrefFor(code)}>
              <Option code={code} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
