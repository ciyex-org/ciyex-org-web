import { useEffect, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

const FORUM_URL = 'https://forum.ciyex.org';

function Redirector() {
  useEffect(() => {
    window.location.replace(FORUM_URL);
  }, []);
  return null;
}

export default function Community(): ReactNode {
  return (
    <Layout
      title="Community Forum"
      description="Redirecting to the Ciyex community forum at forum.ciyex.org">
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${FORUM_URL}`} />
        <link rel="canonical" href={FORUM_URL} />
      </Head>
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p>
          Redirecting to{' '}
          <a href={FORUM_URL}>forum.ciyex.org</a>…
        </p>
        <BrowserOnly>{() => <Redirector />}</BrowserOnly>
      </main>
    </Layout>
  );
}
