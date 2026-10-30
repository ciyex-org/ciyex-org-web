import { useEffect, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

/** Old address of the partner page, kept because older links and search results point here. */
const TARGET = '/services';

function Redirector() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);
  return null;
}

export default function ProfessionalSupport(): ReactNode {
  return (
    <Layout title="Services" description="Medical billing, dental billing, virtual assistants and practice services.">
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://ciyex.org${TARGET}`} />
      </Head>
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p>
          This page has moved to <Link to={TARGET}>our services</Link>.
        </p>
        <BrowserOnly>{() => <Redirector />}</BrowserOnly>
      </main>
    </Layout>
  );
}
