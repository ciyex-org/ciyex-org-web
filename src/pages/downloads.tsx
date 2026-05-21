import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './downloads.module.css';

const GITHUB_RELEASES = 'https://github.com/ciyex-org/ciyex/releases/latest';
const DOCKER_HUB = 'https://hub.docker.com/r/ciyexorg/ciyex';

/* ── Platform SVG Icons ── */
const WindowsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
    <path d="M12 1C8.691 1 6 3.691 6 7c0 1.797.75 3.408 1.953 4.562C5.418 12.586 4 14.617 4 17v1c0 .551.449 1 1 1h.086A2.493 2.493 0 007.5 21.5c.826 0 1.55-.406 2-1.027A2.493 2.493 0 0011.914 21.5H12h.086A2.493 2.493 0 0014.5 20.473 2.493 2.493 0 0016.914 21.5c1.379 0 2.5-1.121 2.5-2.5 0-.203-.023-.402-.066-.59H19.5c.551 0 1-.449 1-1V17c0-2.383-1.418-4.414-3.953-5.438A6.954 6.954 0 0018 7c0-3.309-2.691-6-6-6zm0 2c2.207 0 4 1.793 4 4s-1.793 4-4 4-4-1.793-4-4 1.793-4 4-4zm-1.5 1.5a.5.5 0 100 1 .5.5 0 000-1zm3 0a.5.5 0 100 1 .5.5 0 000-1zM12 12c3.312 0 6 2.016 6 5v1H6v-1c0-2.984 2.688-5 6-5zm-4.5 7a.5.5 0 110 1 .5.5 0 010-1zm9 0a.5.5 0 110 1 .5.5 0 010-1z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.185H2.1a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ── Types ── */
interface SubLink {
  label: string;
  href: string;
}

interface PlatformCardProps {
  icon: ReactNode;
  name: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  groups: { label: string; links: SubLink[] }[];
  accentColor: string;
}

/* ── Platform Card ── */
function PlatformCard({ icon, name, subtitle, primaryLabel, primaryHref, groups, accentColor }: PlatformCardProps) {
  return (
    <div className={styles.platformCard}>
      <div className={styles.platformIconWrap} style={{ color: accentColor }}>
        {icon}
      </div>
      <h3 className={styles.platformName}>{name}</h3>
      <p className={styles.platformSubtitle}>{subtitle}</p>
      <Link href={primaryHref} className={styles.primaryDownloadBtn}>
        <DownloadIcon />
        {primaryLabel}
      </Link>
      <div className={styles.subLinksSection}>
        {groups.map((group, gi) => (
          <div key={gi} className={styles.subLinkGroup}>
            <span className={styles.subLinkLabel}>{group.label}</span>
            <div className={styles.subLinkPills}>
              {group.links.map((link, li) => (
                <Link key={li} href={link.href} className={styles.subLinkPill}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Data ── */
const platforms: PlatformCardProps[] = [
  {
    icon: <WindowsIcon />,
    name: 'Windows',
    subtitle: 'Windows 10, 11',
    primaryLabel: 'Download for Windows',
    primaryHref: `${GITHUB_RELEASES}`,
    accentColor: '#0078d4',
    groups: [
      {
        label: 'Installer',
        links: [
          { label: 'x64', href: GITHUB_RELEASES },
          { label: 'Arm64', href: GITHUB_RELEASES },
        ],
      },
      {
        label: '.zip',
        links: [
          { label: 'x64', href: GITHUB_RELEASES },
          { label: 'Arm64', href: GITHUB_RELEASES },
        ],
      },
    ],
  },
  {
    icon: <LinuxIcon />,
    name: 'Linux',
    subtitle: 'Debian, Ubuntu, Fedora, RHEL',
    primaryLabel: 'Download for Linux',
    primaryHref: `${GITHUB_RELEASES}`,
    accentColor: '#e95420',
    groups: [
      {
        label: '.deb',
        links: [
          { label: 'x64', href: GITHUB_RELEASES },
          { label: 'Arm32', href: GITHUB_RELEASES },
          { label: 'Arm64', href: GITHUB_RELEASES },
        ],
      },
      {
        label: '.rpm',
        links: [
          { label: 'x64', href: GITHUB_RELEASES },
          { label: 'Arm32', href: GITHUB_RELEASES },
          { label: 'Arm64', href: GITHUB_RELEASES },
        ],
      },
      {
        label: '.tar.gz',
        links: [
          { label: 'x64', href: GITHUB_RELEASES },
          { label: 'Arm32', href: GITHUB_RELEASES },
          { label: 'Arm64', href: GITHUB_RELEASES },
        ],
      },
    ],
  },
  {
    icon: <AppleIcon />,
    name: 'macOS',
    subtitle: 'macOS 12.0+',
    primaryLabel: 'Download for macOS',
    primaryHref: `${GITHUB_RELEASES}`,
    accentColor: '#555555',
    groups: [
      {
        label: '.dmg',
        links: [
          { label: 'Intel chip', href: GITHUB_RELEASES },
          { label: 'Apple silicon', href: GITHUB_RELEASES },
          { label: 'Universal', href: GITHUB_RELEASES },
        ],
      },
    ],
  },
];

/* ── Page ── */
export default function Downloads(): ReactNode {
  return (
    <Layout
      title="Download Ciyex EHR"
      description="Download Ciyex EHR for Windows, Linux, and macOS. Free, open source electronic health records software for every community.">

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Open Source &middot; Free Forever</div>
          <Heading as="h1" className={styles.heroTitle}>Download Ciyex EHR</Heading>
          <p className={styles.heroSubtitle}>
            Available for Windows, Linux, and macOS. Deploy on your own infrastructure with one command.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.metaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
              AGPL-3.0 License
            </span>
            <span className={styles.metaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              FHIR R4 Native
            </span>
            <span className={styles.metaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              HIPAA Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className={styles.platformSection}>
        <div className={styles.platformGrid}>
          {platforms.map((p) => (
            <PlatformCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* Docker Section */}
      <section className={styles.dockerSection}>
        <div className={styles.dockerInner}>
          <div className={styles.dockerIcon}>
            <DockerIcon />
          </div>
          <div className={styles.dockerText}>
            <h2 className={styles.dockerTitle}>Deploy with Docker</h2>
            <p className={styles.dockerDesc}>
              The fastest way to run Ciyex EHR. One command gets you a fully working stack with PostgreSQL and all services.
            </p>
            <div className={styles.codeBlock}>
              <code>docker pull ciyexorg/ciyex:latest</code>
            </div>
            <div className={styles.dockerLinks}>
              <Link href={DOCKER_HUB} className={styles.dockerBtn}>
                View on Docker Hub
              </Link>
              <Link to="/docs/installation/docker-setup" className={styles.dockerBtnGhost}>
                Docker Setup Guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements note */}
      <section className={styles.noteSection}>
        <div className={styles.noteInner}>
          <p className={styles.noteText}>
            Looking for Kubernetes, Helm charts, or bare-metal installation?{' '}
            <Link to="/docs/installation/local-setup">See the full installation guide &rarr;</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
