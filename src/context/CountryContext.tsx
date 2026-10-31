import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type CountryCode = 'US' | 'IN';

export type CountryConfig = {
  code: CountryCode;
  /** Where this country's site is served from. */
  root: string;
  label: string;
  flag: string;
  /** Product noun used across the site: "EHR" in the US, "HIMS" in India. */
  product: string;
  /** Full product title shown in the navbar. */
  title: string;
  /** Legal entity operating in this market. */
  entity: string;
};

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  US: {
    code: 'US',
    root: '/',
    label: 'United States',
    flag: '🇺🇸',
    product: 'EHR',
    title: 'Ciyex EHR',
    entity: 'Ciyex Inc.',
  },
  IN: {
    code: 'IN',
    root: '/en-in/',
    label: 'India',
    flag: '🇮🇳',
    product: 'HIMS',
    title: 'Ciyex HIMS',
    entity: 'Qiaben Healthcare Solutions Pvt Ltd',
  },
};

/** The country this site serves. The other copy of this file says 'IN'. */
export const CURRENT_COUNTRY: CountryCode = 'US';

/**
 * Pages both markets publish. Everything else exists on one site only, so a
 * switch of country from there lands on the other site's home page, not a 404.
 */
const SHARED_PATHS = new Set([
  '',
  'about',
  'blog',
  'impact',
  'privacy',
  'signup',
  'terms',
  'workspace',
]);

/** Whether a path, without its base URL or locale prefix, exists in both markets. */
export function isSharedPath(path: string): boolean {
  return SHARED_PATHS.has(path.replace(/^\/+|\/+$/g, ''));
}

/** Path on the other country's site: the same page if it has one, or its home. */
export function pathForCountry(country: CountryConfig, pathname: string, baseUrl: string): string {
  const rest = pathname.slice(baseUrl.length);
  return `${country.root}${isSharedPath(rest) ? rest : ''}`;
}

/** Remembers that the visitor declined the switch, so we ask only once. */
const DISMISS_KEY = 'ciyex-region-prompt-dismissed';

function isCountryCode(value: unknown): value is CountryCode {
  return value === 'US' || value === 'IN';
}

type CountryContextValue = {
  /** Country this site serves. */
  current: CountryConfig;
  /** Country inferred from the visitor's IP, once resolved. */
  detected: CountryConfig | null;
  promptDismissed: boolean;
  dismissPrompt: () => void;
  /** Path to this page on another country's site. */
  urlForCountry: (country: CountryConfig) => string;
};

const CountryContext = createContext<CountryContextValue | undefined>(undefined);

/**
 * Resolves the visitor's country from their IP.
 *
 * ipwho.is first — ipapi.co's free tier rate-limits aggressively and often
 * returns an error body instead of a country. Any failure resolves to null so
 * the visitor is simply left on the site they asked for.
 */
async function detectCountry(signal: AbortSignal): Promise<CountryCode | null> {
  const endpoints = ['https://ipwho.is/', 'https://ipapi.co/json/'];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) continue;
      const data = await res.json();
      const code = data?.country_code;
      if (isCountryCode(code)) return code;
      // A real country we don't run a dedicated site for — leave them be.
      if (typeof code === 'string' && code.length === 2) return null;
    } catch {
      if (signal.aborted) return null;
      // Try the next endpoint.
    }
  }
  return null;
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();

  const current = COUNTRIES[CURRENT_COUNTRY];

  const [detected, setDetected] = useState<CountryConfig | null>(null);
  const [promptDismissed, setPromptDismissed] = useState(true);

  // Read the dismissal flag on the client before considering the prompt.
  useEffect(() => {
    try {
      setPromptDismissed(window.localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setPromptDismissed(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    detectCountry(controller.signal).then((code) => {
      if (!controller.signal.aborted && code) {
        setDetected(COUNTRIES[code]);
      }
    });
    return () => controller.abort();
  }, []);

  const dismissPrompt = useCallback(() => {
    setPromptDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Flag simply won't persist.
    }
  }, []);

  const urlForCountry = useCallback(
    (country: CountryConfig) => typeof window === 'undefined'
      ? country.root
      : pathForCountry(country, window.location.pathname, baseUrl),
    [baseUrl],
  );

  const value = useMemo<CountryContextValue>(
    () => ({ current, detected, promptDismissed, dismissPrompt, urlForCountry }),
    [current, detected, promptDismissed, dismissPrompt, urlForCountry],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): CountryContextValue {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error('useCountry must be used inside a CountryProvider');
  }
  return ctx;
}
