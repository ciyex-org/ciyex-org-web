import React, { type ReactNode } from 'react';
import '@fontsource-variable/newsreader/opsz.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { CountryProvider } from '@site/src/context/CountryContext';
import CountryPrompt from '@site/src/components/CountryPrompt';

/**
 * Wraps the whole app so the country is available everywhere. The region prompt
 * is browser-only: it reads the stored preference and the visitor's IP, neither
 * of which exists during the static build.
 */
export default function Root({ children }: { children: ReactNode }) {
  return (
    <CountryProvider>
      {children}
      <BrowserOnly>{() => <CountryPrompt />}</BrowserOnly>
    </CountryProvider>
  );
}
