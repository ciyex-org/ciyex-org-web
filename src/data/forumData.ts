/**
 * Static forum data — categories, topics, and replies.
 *
 * Mirrors the structure of a Discourse-style community forum
 * (like community.open-emr.org). All data is hardcoded for the
 * static demo; the real forum lives at https://forum.ciyex.org.
 */

export type ForumCategory = {
  id: number;
  slug: string;
  title: string;
  description: string;
  color: string;
  icon: string; // icon key resolved on the client
};

export type ForumReply = {
  postNumber: number;
  authorName: string;
  authorHandle: string;
  authorTitle?: string;
  postedAt: string; // ISO date
  bodyHtml: string; // simple HTML, sanitized at author time
  likes?: number;
};

export type ForumTopic = {
  id: number;
  slug: string;
  categorySlug: string;
  title: string;
  authorName: string;
  authorHandle: string;
  authorTitle?: string;
  postedAt: string;
  views: number;
  // Templated original post fields, mirroring OpenEMR's bug-report template
  template: {
    situation: string;
    version: string;
    browser: string;
    os: string;
    searched: string;
    logs?: string;
  };
  tags?: string[];
  replies: ForumReply[];
};

export const categories: ForumCategory[] = [
  {
    id: 1,
    slug: 'support',
    title: 'Support',
    description:
      'Post your general support and troubleshooting questions here. Get help from the community and Ciyex team.',
    color: '#06b6d4',
    icon: 'support',
  },
  {
    id: 2,
    slug: 'installation-setup',
    title: 'Installation & Setup',
    description:
      'Help with installing, configuring, and deploying Ciyex EHR. Docker, Kubernetes, local setup, and database configuration.',
    color: '#10b981',
    icon: 'install',
  },
  {
    id: 3,
    slug: 'clinical-users',
    title: 'Clinical Users',
    description:
      'Day-to-day clinical workflow questions. How to accomplish tasks as a provider, nurse, or clinic administrator.',
    color: '#ef4444',
    icon: 'clinical',
  },
  {
    id: 4,
    slug: 'development',
    title: 'Development',
    description:
      'For contributors and developers. Discuss architecture, code changes, pull requests, and development workflows.',
    color: '#8b5cf6',
    icon: 'dev',
  },
  {
    id: 5,
    slug: 'feature-requests',
    title: 'Feature Requests',
    description:
      'Suggest and discuss new features. Vote on ideas and help shape the future of Ciyex EHR.',
    color: '#f59e0b',
    icon: 'feature',
  },
  {
    id: 6,
    slug: 'integrations',
    title: 'Integrations',
    description:
      'FHIR R4, HL7, lab systems, pharmacy, billing, and third-party integrations. Connect Ciyex with your ecosystem.',
    color: '#06b6d4',
    icon: 'integration',
  },
  {
    id: 7,
    slug: 'security-compliance',
    title: 'Security & Compliance',
    description:
      'HIPAA compliance, data encryption, audit logging, security best practices, and vulnerability discussions.',
    color: '#0d9488',
    icon: 'security',
  },
  {
    id: 8,
    slug: 'news',
    title: 'News & Announcements',
    description:
      'Official project updates, release notes, roadmap announcements, and community news.',
    color: '#3b82f6',
    icon: 'news',
  },
  {
    id: 9,
    slug: 'community-health-centers',
    title: 'Community Health Centers',
    description:
      'Discussions specific to community health centers, free clinics, and rural healthcare providers using Ciyex.',
    color: '#10b981',
    icon: 'communityHealth',
  },
  {
    id: 10,
    slug: 'foundation',
    title: 'Ciyex Foundation',
    description:
      'Nonprofit governance, mission discussions, volunteer opportunities, and organizational updates.',
    color: '#8b5cf6',
    icon: 'foundation',
  },
  {
    id: 11,
    slug: 'help-wanted',
    title: 'Help Wanted',
    description:
      'Looking for developers or volunteers for Ciyex-related work? Post opportunities and find collaborators.',
    color: '#f97316',
    icon: 'helpWanted',
  },
  {
    id: 12,
    slug: 'site-feedback',
    title: 'Site Feedback',
    description:
      'Suggestions and feedback about the Ciyex community, website, and documentation improvements.',
    color: '#64748b',
    icon: 'feedback',
  },
];

export const topics: ForumTopic[] = [
  // ── Support ──
  {
    id: 101,
    slug: 'fax-integration-json-error',
    categorySlug: 'support',
    title: 'Fax integration error: Unexpected token in JSON',
    authorName: 'Dr. Todd Leleux',
    authorHandle: 'toddleleux',
    authorTitle: 'Family Medicine',
    postedAt: '2026-04-06T15:00:00Z',
    views: 142,
    template: {
      situation:
        'Receiving a SyntaxError when sending faxes from the chart. The send dialog hangs and no fax is delivered.',
      version: 'Ciyex EHR v0.9.4',
      browser: 'Chrome 124',
      os: 'Windows 11 Pro',
      searched: 'Yes — searched the forum and docs before posting.',
      logs: 'Error: SyntaxError: Unexpected token \'E\', "Error: Aut"… is not valid JSON',
    },
    tags: ['fax', 'integration', 'bug'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Stephen Waite',
        authorHandle: 'stephenwaite',
        authorTitle: 'Core Maintainer',
        postedAt: '2026-04-06T15:18:00Z',
        bodyHtml:
          '<p>That error usually means the fax provider returned a plain-text auth failure instead of JSON. Double-check your API key in <strong>Admin → Integrations → Fax</strong> and confirm the account is still active.</p>',
        likes: 4,
      },
      {
        postNumber: 3,
        authorName: 'Dr. Todd Leleux',
        authorHandle: 'toddleleux',
        postedAt: '2026-04-06T16:42:00Z',
        bodyHtml:
          '<p>That fixed it — the API key had been rotated last week. Thanks Stephen!</p>',
        likes: 1,
      },
    ],
  },
  {
    id: 102,
    slug: 'patient-portal-login-loop',
    categorySlug: 'support',
    title: 'Patient portal stuck in login redirect loop',
    authorName: 'Maria Chen',
    authorHandle: 'mariac',
    authorTitle: 'Practice Admin',
    postedAt: '2026-04-08T09:12:00Z',
    views: 87,
    template: {
      situation:
        'Patients log in successfully but get bounced back to the login screen. Started after upgrading to v0.9.4.',
      version: 'Ciyex EHR v0.9.4',
      browser: 'Safari 17, Chrome 124',
      os: 'macOS, iOS, Windows',
      searched: 'Yes',
      logs: '[portal] auth redirect: state mismatch, expected csrf token',
    },
    tags: ['portal', 'auth'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-04-08T10:05:00Z',
        bodyHtml:
          '<p>Known issue with cross-site cookies after the v0.9.4 upgrade. Patch v0.9.5 ships this week — in the meantime set <code>SAMESITE=Lax</code> in the portal env file.</p>',
        likes: 6,
      },
    ],
  },

  // ── Installation & Setup ──
  {
    id: 201,
    slug: 'kubernetes-helm-postgres-init',
    categorySlug: 'installation-setup',
    title: 'Helm install fails on Postgres init job',
    authorName: 'Arjun Patel',
    authorHandle: 'arjunp',
    authorTitle: 'DevOps Engineer',
    postedAt: '2026-04-05T18:30:00Z',
    views: 203,
    template: {
      situation:
        'Running `helm install ciyex ./charts/ciyex` on a fresh EKS cluster. The postgres-init job crash-loops with a permissions error.',
      version: 'Ciyex Helm chart 0.4.1',
      browser: 'n/a',
      os: 'Amazon EKS 1.29',
      searched: 'Yes',
      logs: 'ERROR: permission denied for schema fhir',
    },
    tags: ['kubernetes', 'helm', 'postgres'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-04-05T19:14:00Z',
        bodyHtml:
          '<p>The init job needs to run as the database owner. Set <code>postgres.initUser: postgres</code> in your values.yaml — the default <code>app</code> user does not have schema-create privileges.</p>',
        likes: 9,
      },
    ],
  },

  // ── Clinical Users ──
  {
    id: 301,
    slug: 'how-to-merge-duplicate-charts',
    categorySlug: 'clinical-users',
    title: 'How do I merge duplicate patient charts?',
    authorName: 'Nurse Linda',
    authorHandle: 'lindarn',
    authorTitle: 'RN',
    postedAt: '2026-04-07T13:20:00Z',
    views: 64,
    template: {
      situation:
        'A patient was registered twice (once at front desk, once during telehealth). I need to merge the charts so labs and visits all live in one place.',
      version: 'Ciyex EHR v0.9.4',
      browser: 'Chrome 124',
      os: 'Windows 10',
      searched: 'Yes',
    },
    tags: ['workflow', 'patients'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Dr. Sara Kim',
        authorHandle: 'sarak',
        authorTitle: 'Internal Medicine',
        postedAt: '2026-04-07T14:02:00Z',
        bodyHtml:
          '<p>Go to <strong>Admin → Patient Tools → Merge Patients</strong>, pick the surviving record on the left and the duplicate on the right. The merge is audit-logged so you can roll it back if needed.</p>',
        likes: 3,
      },
    ],
  },

  // ── Development ──
  {
    id: 401,
    slug: 'how-to-add-custom-fhir-resource',
    categorySlug: 'development',
    title: 'How do I expose a custom FHIR resource?',
    authorName: 'Sam Rivera',
    authorHandle: 'samr',
    authorTitle: 'Contributor',
    postedAt: '2026-04-04T20:15:00Z',
    views: 118,
    template: {
      situation:
        'I want to add a custom FHIR Questionnaire resource for our intake forms. What\'s the cleanest way to register it without forking the core?',
      version: 'Ciyex EHR main branch',
      browser: 'n/a',
      os: 'Linux',
      searched: 'Yes',
    },
    tags: ['fhir', 'plugins'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-04-04T21:00:00Z',
        bodyHtml:
          '<p>Use the plugin SDK — drop a module into <code>plugins/</code> implementing <code>FhirResourceProvider</code>. The loader auto-registers it. There\'s an example under <code>plugins/ciyex-lab/</code>.</p>',
        likes: 5,
      },
    ],
  },

  // ── Feature Requests ──
  {
    id: 501,
    slug: 'request-bulk-message-templates',
    categorySlug: 'feature-requests',
    title: 'Bulk message templates for patient outreach',
    authorName: 'Practice Manager Jen',
    authorHandle: 'jenpm',
    postedAt: '2026-04-03T11:00:00Z',
    views: 56,
    template: {
      situation:
        'Would love to be able to save reusable message templates and send to a filtered cohort (e.g., all diabetic patients overdue for A1c).',
      version: 'Ciyex EHR v0.9.4',
      browser: 'n/a',
      os: 'n/a',
      searched: 'Yes',
    },
    tags: ['messaging', 'population-health'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-04-03T12:30:00Z',
        bodyHtml:
          '<p>This is on the roadmap for v1.1 — tracked in GitHub issue #482. Upvotes welcome there.</p>',
        likes: 12,
      },
    ],
  },

  // ── Integrations ──
  {
    id: 601,
    slug: 'epic-fhir-bulk-export',
    categorySlug: 'integrations',
    title: 'Importing patient data from Epic via FHIR Bulk Export',
    authorName: 'Kevin Tran',
    authorHandle: 'kevint',
    authorTitle: 'Integration Specialist',
    postedAt: '2026-04-02T16:45:00Z',
    views: 91,
    template: {
      situation:
        'Migrating 8,000 patients from Epic. Has anyone used the FHIR Bulk Data Export ($export) flow with Ciyex\'s import tool?',
      version: 'Ciyex EHR v0.9.4',
      browser: 'n/a',
      os: 'Linux',
      searched: 'Yes',
    },
    tags: ['fhir', 'epic', 'migration'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Maria Chen',
        authorHandle: 'mariac',
        postedAt: '2026-04-02T17:30:00Z',
        bodyHtml:
          '<p>Yes — we did 12k patients last month. Use the <code>ciyex-import bulk-fhir</code> CLI. Plan for ~1 hour per 1k patients on a 4-core box. The polling interval defaults to 30s; bump it to 5s for faster ingestion.</p>',
        likes: 7,
      },
    ],
  },

  // ── Security & Compliance ──
  {
    id: 701,
    slug: 'audit-log-retention-hipaa',
    categorySlug: 'security-compliance',
    title: 'Recommended audit-log retention for HIPAA?',
    authorName: 'Compliance Officer Dana',
    authorHandle: 'danac',
    postedAt: '2026-04-01T10:00:00Z',
    views: 73,
    template: {
      situation:
        'What\'s the recommended retention period for the audit log table? HIPAA says 6 years but our DB is growing fast.',
      version: 'Ciyex EHR v0.9.3',
      browser: 'n/a',
      os: 'n/a',
      searched: 'Yes',
    },
    tags: ['hipaa', 'audit', 'retention'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-04-01T11:15:00Z',
        bodyHtml:
          '<p>Keep 6 years of audit logs hot, then archive to S3/object storage with the <code>audit-archiver</code> job. Restored archives are queryable through the same admin UI.</p>',
        likes: 8,
      },
    ],
  },

  // ── News ──
  {
    id: 801,
    slug: 'v0-9-4-released',
    categorySlug: 'news',
    title: 'Ciyex EHR v0.9.4 released',
    authorName: 'Ciyex Team',
    authorHandle: 'ciyex-team',
    authorTitle: 'Maintainer',
    postedAt: '2026-03-30T09:00:00Z',
    views: 412,
    template: {
      situation:
        'v0.9.4 is out! Highlights: faster patient search, FHIR R4 Coverage resource, telehealth waiting room, and the new plugin SDK.',
      version: 'Ciyex EHR v0.9.4',
      browser: 'n/a',
      os: 'n/a',
      searched: 'n/a',
    },
    tags: ['release'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Arjun Patel',
        authorHandle: 'arjunp',
        postedAt: '2026-03-30T09:45:00Z',
        bodyHtml: '<p>The plugin SDK is a game changer — thank you team!</p>',
        likes: 14,
      },
    ],
  },

  // ── Community Health Centers ──
  {
    id: 901,
    slug: 'fqhc-uds-reporting',
    categorySlug: 'community-health-centers',
    title: 'UDS reporting for FQHCs — what\'s supported today?',
    authorName: 'FQHC Director Lisa',
    authorHandle: 'lisafqhc',
    postedAt: '2026-03-28T14:20:00Z',
    views: 88,
    template: {
      situation:
        'We\'re an FQHC evaluating Ciyex. Does it generate UDS tables natively, or do we need to export and use a separate tool?',
      version: 'Ciyex EHR v0.9.4',
      browser: 'n/a',
      os: 'n/a',
      searched: 'Yes',
    },
    tags: ['fqhc', 'uds', 'reporting'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-03-28T15:00:00Z',
        bodyHtml:
          '<p>Tables 3A, 3B, 4, 5, 6A, and 7 are supported natively. Tables 6B and 9 are in beta — feedback welcome.</p>',
        likes: 5,
      },
    ],
  },

  // ── Foundation ──
  {
    id: 1001,
    slug: 'foundation-board-election',
    categorySlug: 'foundation',
    title: '2026 Ciyex Foundation board election — call for nominations',
    authorName: 'Ciyex Foundation',
    authorHandle: 'ciyex-foundation',
    postedAt: '2026-03-25T08:00:00Z',
    views: 156,
    template: {
      situation:
        'We\'re opening nominations for two board seats. Self-nominations welcome. Voting opens May 1.',
      version: 'n/a',
      browser: 'n/a',
      os: 'n/a',
      searched: 'n/a',
    },
    tags: ['governance', 'election'],
    replies: [],
  },

  // ── Help Wanted ──
  {
    id: 1101,
    slug: 'looking-for-fhir-developer-contract',
    categorySlug: 'help-wanted',
    title: 'Looking for a FHIR developer (contract, remote)',
    authorName: 'Rural Clinic Network',
    authorHandle: 'rcn',
    postedAt: '2026-03-27T12:00:00Z',
    views: 102,
    template: {
      situation:
        '5-clinic rural network is looking for a contractor to build a custom intake plugin on top of Ciyex. Remote OK. ~80 hours.',
      version: 'Ciyex EHR v0.9.4',
      browser: 'n/a',
      os: 'n/a',
      searched: 'Yes',
    },
    tags: ['contract', 'remote'],
    replies: [],
  },

  // ── Site Feedback ──
  {
    id: 1201,
    slug: 'docs-search-results',
    categorySlug: 'site-feedback',
    title: 'Docs search returns too many old version results',
    authorName: 'Sam Rivera',
    authorHandle: 'samr',
    postedAt: '2026-03-29T19:30:00Z',
    views: 41,
    template: {
      situation:
        'When I search the docs the v0.1.0 results are mixed in with v1.0.0 results. Could the search default to current?',
      version: 'docs site',
      browser: 'Firefox 124',
      os: 'Linux',
      searched: 'Yes',
    },
    tags: ['docs', 'search'],
    replies: [
      {
        postNumber: 2,
        authorName: 'Ciyex Team',
        authorHandle: 'ciyex-team',
        authorTitle: 'Maintainer',
        postedAt: '2026-03-29T20:00:00Z',
        bodyHtml:
          '<p>Good catch — we\'ll add a version filter. Tracked in site repo issue #57.</p>',
        likes: 2,
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): ForumCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTopicsByCategory(slug: string): ForumTopic[] {
  return topics.filter((t) => t.categorySlug === slug);
}

export function getTopicBySlug(slug: string): ForumTopic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function formatRelative(iso: string, now = new Date()): string {
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
