import { useEffect, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

function RedirectToForum(): ReactNode {
  useEffect(() => {
    window.location.replace('https://forum.ciyex.org/');
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: '#f1f5f9' }}>
      <p>
        Redirecting to{' '}
        <a href="https://forum.ciyex.org/" style={{ color: '#06b6d4' }}>
          forum.ciyex.org
        </a>
        …
      </p>
    </div>
  );
}

export default function TopicPage(): ReactNode {
  return (
    <Layout
      title="Forum Topic"
      description="Read and reply to a Ciyex community forum topic.">
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <BrowserOnly fallback={<div />}>
          {() => <RedirectToForum />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
