import { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  categories,
  getCategoryBySlug,
  getTopicsByCategory,
  formatRelative,
  type ForumCategory,
  type ForumTopic,
} from '../../data/forumData';
import styles from './forum.module.css';

function CategoryView(): ReactNode {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get('c') || 'support');
  }, []);

  if (!slug) return null;

  const category: ForumCategory | undefined = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className={styles.forumWrap}>
        <div className={styles.notFoundCard}>
          <h2>Category not found</h2>
          <p>
            No category with slug <code>{slug}</code>.{' '}
            <Link to="/community">Back to all categories</Link>
          </p>
        </div>
      </div>
    );
  }

  const topicList: ForumTopic[] = getTopicsByCategory(slug);

  return (
    <div className={styles.forumWrap}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/community">Community</Link>
        <span className={styles.crumbSep}>›</span>
        <span
          className={styles.crumbCategory}
          style={{ borderColor: category.color, color: category.color }}
        >
          {category.title}
        </span>
      </nav>

      {/* Header */}
      <header className={styles.categoryHeader}>
        <h1 className={styles.categoryHeading}>
          <span
            className={styles.categoryDot}
            style={{ background: category.color }}
            aria-hidden
          />
          {category.title}
        </h1>
        <p className={styles.categoryDescription}>{category.description}</p>
        <div className={styles.headerActions}>
          <Link
            className={styles.btnPrimary}
            to={`/community/new-topic?c=${category.slug}`}
          >
            + New Topic
          </Link>
          <Link className={styles.btnGhost} to="/community">
            All Categories
          </Link>
        </div>
      </header>

      {/* Topic table */}
      <section className={styles.topicTableWrap}>
        {topicList.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No topics yet in this category.</p>
            <Link
              className={styles.btnPrimary}
              to={`/community/new-topic?c=${category.slug}`}
            >
              Be the first to post
            </Link>
          </div>
        ) : (
          <table className={styles.topicTable}>
            <thead>
              <tr>
                <th className={styles.colTopic}>Topic</th>
                <th className={styles.colMeta}>Replies</th>
                <th className={styles.colMeta}>Views</th>
                <th className={styles.colActivity}>Activity</th>
              </tr>
            </thead>
            <tbody>
              {topicList.map((t) => (
                <tr key={t.id} className={styles.topicRow}>
                  <td className={styles.cellTopic}>
                    <Link
                      to={`/community/topic?t=${t.slug}`}
                      className={styles.topicLink}
                    >
                      {t.title}
                    </Link>
                    <div className={styles.topicMetaLine}>
                      <span className={styles.author}>by {t.authorName}</span>
                      {t.tags && t.tags.length > 0 && (
                        <span className={styles.tags}>
                          {t.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={styles.cellMeta}>{t.replies.length}</td>
                  <td className={styles.cellMeta}>{t.views}</td>
                  <td className={styles.cellActivity}>
                    {formatRelative(
                      t.replies.length > 0
                        ? t.replies[t.replies.length - 1].postedAt
                        : t.postedAt,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Sibling categories */}
      <section className={styles.siblingSection}>
        <h3 className={styles.siblingHeading}>Other Categories</h3>
        <div className={styles.siblingGrid}>
          {categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 6)
            .map((c) => (
              <Link
                key={c.slug}
                to={`/community/category?c=${c.slug}`}
                className={styles.siblingChip}
                style={{ borderColor: `${c.color}55` }}
              >
                <span
                  className={styles.siblingDot}
                  style={{ background: c.color }}
                  aria-hidden
                />
                {c.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default function CategoryPage(): ReactNode {
  return (
    <Layout
      title="Forum Category"
      description="Browse topics in this Ciyex community forum category."
    >
      <main className={styles.forumPage}>
        <BrowserOnly fallback={<div className={styles.forumWrap}>Loading…</div>}>
          {() => <CategoryView />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
