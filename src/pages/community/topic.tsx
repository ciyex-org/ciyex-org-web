import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  getCategoryBySlug,
  getTopicBySlug,
  formatDate,
  formatRelative,
  type ForumReply,
  type ForumTopic,
} from '../../data/forumData';
import styles from './forum.module.css';

type DraftReply = ForumReply & { local: true };

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

function TopicView(): ReactNode {
  const [slug, setSlug] = useState<string>('');
  const [draftBody, setDraftBody] = useState<string>('');
  const [draftName, setDraftName] = useState<string>('');
  const [localReplies, setLocalReplies] = useState<DraftReply[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get('t') || '');
  }, []);

  const topic: ForumTopic | undefined = useMemo(
    () => (slug ? getTopicBySlug(slug) : undefined),
    [slug],
  );
  const category = topic ? getCategoryBySlug(topic.categorySlug) : undefined;

  if (!slug) return null;

  if (!topic || !category) {
    return (
      <div className={styles.forumWrap}>
        <div className={styles.notFoundCard}>
          <h2>Topic not found</h2>
          <p>
            We couldn't find a topic with slug <code>{slug}</code>.{' '}
            <Link to="/community">Back to all categories</Link>
          </p>
        </div>
      </div>
    );
  }

  const allReplies: ForumReply[] = [...topic.replies, ...localReplies].sort(
    (a, b) => a.postNumber - b.postNumber,
  );
  const lastPostNumber =
    allReplies.length > 0
      ? Math.max(...allReplies.map((r) => r.postNumber))
      : 1;

  function handleSubmitReply(e: FormEvent) {
    e.preventDefault();
    const body = draftBody.trim();
    const name = draftName.trim() || 'Anonymous';
    if (!body) return;
    const reply: DraftReply = {
      postNumber: lastPostNumber + 1,
      authorName: name,
      authorHandle: name.toLowerCase().replace(/\s+/g, ''),
      postedAt: new Date().toISOString(),
      bodyHtml: `<p>${body
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '</p><p>')}</p>`,
      likes: 0,
      local: true,
    };
    setLocalReplies((rs) => [...rs, reply]);
    setDraftBody('');
  }

  return (
    <div className={styles.forumWrap}>
      {/* Breadcrumbs */}
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
      </nav>

      {/* Topic title */}
      <header className={styles.topicHeader}>
        <h1 className={styles.topicTitle}>{topic.title}</h1>
        <div className={styles.topicHeaderMeta}>
          <span>
            {topic.views} views · {allReplies.length} replies · posted{' '}
            {formatRelative(topic.postedAt)}
          </span>
          {topic.tags && topic.tags.length > 0 && (
            <span className={styles.tags}>
              {topic.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      {/* Original post */}
      <article className={styles.postCard}>
        <aside className={styles.postSide}>
          <div className={styles.avatar}>{initials(topic.authorName)}</div>
          <div className={styles.authorName}>{topic.authorName}</div>
          {topic.authorTitle && (
            <div className={styles.authorTitle}>{topic.authorTitle}</div>
          )}
          <div className={styles.handle}>@{topic.authorHandle}</div>
        </aside>
        <div className={styles.postBody}>
          <div className={styles.postMetaRow}>
            <span className={styles.postNumber}>#1</span>
            <span className={styles.postDate}>{formatDate(topic.postedAt)}</span>
          </div>
          <div className={styles.templated}>
            <dl className={styles.templateGrid}>
              <dt>Situation</dt>
              <dd>{topic.template.situation}</dd>
              <dt>Ciyex version</dt>
              <dd>{topic.template.version}</dd>
              <dt>Browser</dt>
              <dd>{topic.template.browser}</dd>
              <dt>Operating system</dt>
              <dd>{topic.template.os}</dd>
              <dt>Searched the forum?</dt>
              <dd>{topic.template.searched}</dd>
              {topic.template.logs && (
                <>
                  <dt>Logs</dt>
                  <dd>
                    <pre className={styles.logBlock}>{topic.template.logs}</pre>
                  </dd>
                </>
              )}
            </dl>
          </div>
          <div className={styles.postActions}>
            <button type="button" className={styles.actionBtn}>
              ♥ Like
            </button>
            <button type="button" className={styles.actionBtn}>
              ↩ Reply
            </button>
            <button type="button" className={styles.actionBtn}>
              🔗 Share
            </button>
          </div>
        </div>
      </article>

      {/* Replies */}
      {allReplies.map((r) => (
        <article key={r.postNumber} className={styles.postCard}>
          <aside className={styles.postSide}>
            <div className={styles.avatar}>{initials(r.authorName)}</div>
            <div className={styles.authorName}>{r.authorName}</div>
            {r.authorTitle && (
              <div className={styles.authorTitle}>{r.authorTitle}</div>
            )}
            <div className={styles.handle}>@{r.authorHandle}</div>
          </aside>
          <div className={styles.postBody}>
            <div className={styles.postMetaRow}>
              <span className={styles.postNumber}>#{r.postNumber}</span>
              <span className={styles.postDate}>{formatDate(r.postedAt)}</span>
              {(r as DraftReply).local && (
                <span className={styles.draftBadge}>your draft</span>
              )}
            </div>
            <div
              className={styles.replyBody}
              // sanitized at author time; static demo only
              dangerouslySetInnerHTML={{ __html: r.bodyHtml }}
            />
            <div className={styles.postActions}>
              <button type="button" className={styles.actionBtn}>
                ♥ Like {r.likes ? `(${r.likes})` : ''}
              </button>
              <button type="button" className={styles.actionBtn}>
                ↩ Reply
              </button>
              <button type="button" className={styles.actionBtn}>
                🔗 Share
              </button>
            </div>
          </div>
        </article>
      ))}

      {/* Reply composer */}
      <section className={styles.composer}>
        <h3 className={styles.composerHeading}>Post a reply</h3>
        <p className={styles.composerNote}>
          Demo composer — replies are kept locally in your browser. Sign in at{' '}
          <a href="https://forum.ciyex.org" target="_blank" rel="noreferrer">
            forum.ciyex.org
          </a>{' '}
          to post for real.
        </p>
        <form onSubmit={handleSubmitReply} className={styles.composerForm}>
          <input
            type="text"
            className={styles.composerName}
            placeholder="Your name"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
          />
          <textarea
            className={styles.composerBody}
            placeholder="Write your reply…"
            rows={6}
            value={draftBody}
            onChange={(e) => setDraftBody(e.target.value)}
          />
          <div className={styles.composerActions}>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={!draftBody.trim()}
            >
              Reply
            </button>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => {
                setDraftBody('');
                setDraftName('');
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function TopicPage(): ReactNode {
  return (
    <Layout
      title="Forum Topic"
      description="Read and reply to a Ciyex community forum topic."
    >
      <main className={styles.forumPage}>
        <BrowserOnly fallback={<div className={styles.forumWrap}>Loading…</div>}>
          {() => <TopicView />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
