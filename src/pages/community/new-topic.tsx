import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { categories, getCategoryBySlug } from '../../data/forumData';
import styles from './forum.module.css';

function NewTopicView(): ReactNode {
  const [slug, setSlug] = useState<string>('');
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [version, setVersion] = useState('');
  const [browser, setBrowser] = useState('');
  const [os, setOs] = useState('');
  const [searched, setSearched] = useState('Yes');
  const [logs, setLogs] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get('c') || 'support');
  }, []);

  if (!slug) return null;

  const category = getCategoryBySlug(slug);
  if (!category) {
    return (
      <div className={styles.forumWrap}>
        <div className={styles.notFoundCard}>
          <h2>Category not found</h2>
          <p>
            <Link to="/community">Back to all categories</Link>
          </p>
        </div>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={styles.forumWrap}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/community">Community</Link>
        <span className={styles.crumbSep}>›</span>
        <Link
          to={`/community/category?c=${category.slug}`}
          className={styles.crumbCategory}
          style={{ borderColor: category.color, color: category.color }}
        >
          {category.title}
        </Link>
        <span className={styles.crumbSep}>›</span>
        <span className={styles.crumbCurrent}>New Topic</span>
      </nav>

      <header className={styles.topicHeader}>
        <h1 className={styles.topicTitle}>New topic in {category.title}</h1>
        <p className={styles.composerNote}>
          Use the template below so the community can help you faster. This is a
          demo form — real posts go to{' '}
          <a href="https://forum.ciyex.org" target="_blank" rel="noreferrer">
            forum.ciyex.org
          </a>
          .
        </p>
      </header>

      {submitted ? (
        <div className={styles.successCard}>
          <h2>Thanks — your draft is ready!</h2>
          <p>
            In the live forum your topic would now appear in{' '}
            <Link to={`/community/category?c=${category.slug}`}>
              {category.title}
            </Link>
            . For this static demo we just validate the template.
          </p>
          <Link
            className={styles.btnPrimary}
            to={`/community/category?c=${category.slug}`}
          >
            Back to {category.title}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.newTopicForm}>
          <label className={styles.formLabel}>
            Category
            <select
              className={styles.formInput}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.formLabel}>
            Topic title
            <input
              required
              className={styles.formInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Describe your problem in one line"
            />
          </label>

          <label className={styles.formLabel}>
            Situation
            <textarea
              required
              rows={4}
              className={styles.formInput}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="What were you trying to do? What happened instead?"
            />
          </label>

          <div className={styles.formGrid}>
            <label className={styles.formLabel}>
              Ciyex version
              <input
                className={styles.formInput}
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g. v0.9.4"
              />
            </label>
            <label className={styles.formLabel}>
              Browser
              <input
                className={styles.formInput}
                value={browser}
                onChange={(e) => setBrowser(e.target.value)}
                placeholder="e.g. Chrome 124"
              />
            </label>
            <label className={styles.formLabel}>
              Operating system
              <input
                className={styles.formInput}
                value={os}
                onChange={(e) => setOs(e.target.value)}
                placeholder="e.g. Windows 11"
              />
            </label>
            <label className={styles.formLabel}>
              Searched first?
              <select
                className={styles.formInput}
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
          </div>

          <label className={styles.formLabel}>
            Logs (optional)
            <textarea
              rows={4}
              className={styles.formInput}
              value={logs}
              onChange={(e) => setLogs(e.target.value)}
              placeholder="Paste any relevant logs or error output"
            />
          </label>

          <div className={styles.composerActions}>
            <button type="submit" className={styles.btnPrimary}>
              Create topic
            </button>
            <Link
              className={styles.btnGhost}
              to={`/community/category?c=${slug}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function NewTopicPage(): ReactNode {
  return (
    <Layout
      title="New Forum Topic"
      description="Start a new topic in the Ciyex community forum."
    >
      <main className={styles.forumPage}>
        <BrowserOnly fallback={<div className={styles.forumWrap}>Loading…</div>}>
          {() => <NewTopicView />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
