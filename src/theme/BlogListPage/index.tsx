import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogListPage';
import styles from './styles.module.css';

function BlogPostCard({ content }: { content: any }) {
  const { metadata } = content;
  const {
    permalink,
    title,
    description,
    date,
    formattedDate,
    readingTime,
    frontMatter,
    authors,
    tags,
  } = metadata;

  const image = frontMatter.image;

  return (
    <Link to={permalink} className={styles.cardLink}>
      <article className={styles.card}>
        {image && (
          <div className={styles.cardImageWrapper}>
            <img
              src={image}
              alt={title}
              className={styles.cardImage}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardExcerpt}>{description}</p>
          <div className={styles.cardMeta}>
            {authors?.length > 0 && (
              <span className={styles.cardAuthor}>
                {authors[0].imageURL && (
                  <img
                    src={authors[0].imageURL}
                    alt={authors[0].name}
                    className={styles.authorAvatar}
                  />
                )}
                {authors[0].name}
              </span>
            )}
            <span className={styles.cardDate}>{formattedDate}</span>
            {readingTime && (
              <span className={styles.cardReadingTime}>
                {Math.ceil(readingTime)} min read
              </span>
            )}
          </div>
          {tags?.length > 0 && (
            <div className={styles.cardTags}>
              {tags.slice(0, 3).map((tag: any) => (
                <span key={tag.permalink} className={styles.tag}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function BlogListPaginator({ metadata }: { metadata: any }) {
  const { previousPage, nextPage } = metadata;

  if (!previousPage && !nextPage) return null;

  return (
    <nav className={styles.pagination} aria-label="Blog list pagination">
      {previousPage && (
        <Link to={previousPage} className={styles.paginationLink}>
          &larr; Newer Posts
        </Link>
      )}
      {nextPage && (
        <Link
          to={nextPage}
          className={clsx(styles.paginationLink, styles.paginationNext)}
        >
          Older Posts &rarr;
        </Link>
      )}
    </nav>
  );
}

export default function BlogListPage(props: Props): React.JSX.Element {
  const { items, metadata } = props;

  return (
    <Layout title="News & Blogs" description="Latest news, insights, and updates from the Ciyex team.">
      {/* Hero Header */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>News &amp; Blogs</h1>
          <p className={styles.heroSubtitle}>
            Insights on open source healthcare, EHR technology, and health equity.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={styles.blogSection}>
        <div className={styles.blogGrid}>
          {items.map(({ content }) => (
            <BlogPostCard key={content.metadata.permalink} content={content} />
          ))}
        </div>
        <BlogListPaginator metadata={metadata} />
      </section>
    </Layout>
  );
}
