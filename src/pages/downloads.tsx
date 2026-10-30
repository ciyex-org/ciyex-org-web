import { useEffect, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './downloads.module.css';

type OS = 'mac' | 'windows' | 'linux';

const nameToOS: Record<string, OS> = {
  Windows: 'windows',
  macOS: 'mac',
  Linux: 'linux',
};

function useDetectedOS(): OS | null {
  const [os, setOs] = useState<OS | null>(null);
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent;
    if (/Mac/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua)) setOs('mac');
    else if (/Windows/i.test(ua)) setOs('windows');
    else if (/Linux/i.test(ua) && !/Android/i.test(ua)) setOs('linux');
  }, []);
  return os;
}

const GITHUB_RELEASES = 'https://github.com/ciyex-org/ciyex/releases/latest';

/* ── Platform SVG Icons ── */
const WindowsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
    {/* Feet */}
    <ellipse cx="22" cy="58" rx="8" ry="3" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
    <ellipse cx="42" cy="58" rx="8" ry="3" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
    {/* Body */}
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#1c1c1c" stroke="#94a3b8" strokeWidth="0.6" />
    {/* Flippers */}
    <ellipse cx="13" cy="38" rx="4" ry="11" fill="#1c1c1c" stroke="#94a3b8" strokeWidth="0.6" transform="rotate(-15 13 38)" />
    <ellipse cx="51" cy="38" rx="4" ry="11" fill="#1c1c1c" stroke="#94a3b8" strokeWidth="0.6" transform="rotate(15 51 38)" />
    {/* White belly */}
    <ellipse cx="32" cy="42" rx="11" ry="15" fill="#ffffff" />
    {/* Head */}
    <circle cx="32" cy="18" r="13" fill="#1c1c1c" stroke="#94a3b8" strokeWidth="0.6" />
    {/* Eye whites */}
    <ellipse cx="27" cy="16" rx="3.5" ry="4.5" fill="#ffffff" />
    <ellipse cx="37" cy="16" rx="3.5" ry="4.5" fill="#ffffff" />
    {/* Pupils */}
    <circle cx="28" cy="17" r="1.6" fill="#000000" />
    <circle cx="36" cy="17" r="1.6" fill="#000000" />
    {/* Beak */}
    <path d="M27 23 Q32 30 37 23 Q34 27 32 27 Q30 27 27 23 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.6" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
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
  recommended?: boolean;
}

/* ── Platform Card ── */
function PlatformCard({ icon, name, subtitle, primaryLabel, primaryHref, groups, accentColor, recommended }: PlatformCardProps) {
  return (
    <div className={`${styles.platformCard} ${recommended ? styles.platformCardRecommended : ''}`}>
      {recommended && <div className={styles.platformRecommendedBadge}>Recommended for you</div>}
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
];

/* ── Page ── */
export default function Downloads(): ReactNode {
  const detectedOS = useDetectedOS();
  const orderedPlatforms = detectedOS
    ? [...platforms].sort((a, b) => {
        const aMatch = nameToOS[a.name] === detectedOS ? 0 : 1;
        const bMatch = nameToOS[b.name] === detectedOS ? 0 : 1;
        return aMatch - bMatch;
      })
    : platforms;

  return (
    <Layout
      title="Download Ciyex Workspace"
      description="Download Ciyex Workspace for Windows, Linux, and macOS. Connects to the Ciyex EHR, hosted for your clinic on Ciyex Cloud.">

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Ciyex Workspace</div>
          <Heading as="h1" className={styles.heroTitle}>Download Ciyex Workspace</Heading>
          <p className={styles.heroSubtitle}>
            Getting started takes two steps: <strong>install Workspace</strong> on your computer,
            then <strong>connect it to Ciyex Cloud</strong>, where we host the EHR for your clinic.
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
              Encrypted in Transit
            </span>
          </div>
        </div>
      </section>

      {/* Step 1: Install Workspace */}
      <section className={styles.sectionHeader}>
        <div className={styles.sectionHeaderInner}>
          <span className={styles.sectionEyebrow}>Step 1</span>
          <Heading as="h2" className={styles.sectionHeaderTitle}>Install Workspace</Heading>
          <p className={styles.sectionHeaderDesc}>
            Pick your platform. Workspace is a free, open source desktop app for clinicians.
          </p>
        </div>
      </section>

      {/* Platform Cards */}
      <section className={styles.platformSection}>
        <div className={styles.platformGrid}>
          {orderedPlatforms.map((p) => (
            <PlatformCard
              key={p.name}
              {...p}
              recommended={nameToOS[p.name] === detectedOS}
            />
          ))}
        </div>
      </section>

      {/* Step 2: Pick a backend */}
      <section className={styles.sectionHeader}>
        <div className={styles.sectionHeaderInner}>
          <span className={styles.sectionEyebrow}>Step 2</span>
          <Heading as="h2" className={styles.sectionHeaderTitle}>Connect to Ciyex Cloud</Heading>
          <p className={styles.sectionHeaderDesc}>
            Workspace needs an EHR server to store and sync your clinic's data. We host and
            maintain it for you.
          </p>
        </div>
      </section>

      {/* Hosting */}
      <section className={styles.backendSection}>
        <div className={styles.backendGrid} style={{ gridTemplateColumns: 'minmax(0, 620px)', justifyContent: 'center' }}>
          <div className={`${styles.backendCard} ${styles.backendCardRecommended}`}>
            <div className={styles.backendIcon} style={{ color: '#0d9488' }}>
              <CloudIcon />
            </div>
            <h3 className={styles.backendTitle}>Ciyex Cloud</h3>
            <p className={styles.backendDesc}>
              We host and run the EHR for your clinic, so there are no servers to manage. Tell us
              about your practice and we'll set up your account. Pricing is a fixed monthly price for your provider range.
            </p>
            <ul className={styles.backendList}>
              <li>Managed hosting &middot; encrypted at rest &amp; in transit</li>
              <li>Automatic backups &amp; cross-device sync</li>
              <li>Setup, data migration and training available</li>
            </ul>
            <Link to="/pricing" className={styles.cloudBtn}>
              See Ciyex Cloud pricing
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
