import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ciyex',
  tagline: 'Ciyex Workspace, the open source EHR, and free cloud storage — for every community clinic.',
  favicon: 'img/Ciyex-favicon-new.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ciyex.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ciyex-org', // Usually your GitHub org/user name.
  projectName: 'ciyex-org-web', // Usually your repo name.

  onBrokenLinks: 'warn',

  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NonprofitOrganization',
        name: 'Ciyex Inc.',
        alternateName: 'Ciyex',
        url: 'https://ciyex.org',
        logo: 'https://ciyex.org/img/Ciyex-logo-no-text.png',
        description: 'A 501(c)(3) nonprofit building open source Electronic Health Records. Modern, secure, FHIR-compliant, and built for healthcare interoperability.',
        foundingDate: '2025',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '30 N Gould St, Ste N',
          addressLocality: 'Sheridan',
          addressRegion: 'WY',
          postalCode: '82801',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'help@ciyex.org',
          contactType: 'customer support',
        },
        sameAs: [
          'https://github.com/ciyex-org/ciyex',
          'https://twitter.com/ciyexehr',
          'https://forum.ciyex.org',
        ],
        nonprofitStatus: 'https://schema.org/Nonprofit501c3',
        taxID: '41-3609665',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Ciyex',
        url: 'https://ciyex.org',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://ciyex.org/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Ciyex EHR',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web, Docker, Kubernetes',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Ciyex Workspace',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Windows, macOS, Linux',
        description: 'Ciyex Workspace is the open source desktop client for the Ciyex EHR. Bundled with free cloud storage and built on a VS Code foundation tuned for healthcare.',
        downloadUrl: 'https://ciyex.org/downloads',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
      }),
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ciyex-org/ciyex-org-web/tree/main/',
          versions: {
            current: {
              label: 'v1.0.0 (Unreleased)',
              banner: 'unreleased',
              noIndex: true,
            },
            '0.1.0': {
              label: 'v0.1.0',
              banner: 'none',
            },
          },
        },
        blog: {
          showReadingTime: true,
          sortPosts: 'descending',
          postsPerPage: 9,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ciyex-org/ciyex-org-web/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-26FYS5F4Y7',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  clientModules: [
    './src/clientModules/donateButton.ts',
    './src/clientModules/ga4Events.ts',
  ],

  scripts: [
    {
      src: 'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js',
      async: true,
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ciyex-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'nonprofit_announcement',
      content: 'Ciyex is now a 501(c)(3) nonprofit organization! Open source healthcare for everyone. <a target="_blank" rel="noopener noreferrer" href="https://github.com/ciyex-org/ciyex">Star us on GitHub</a>',
      backgroundColor: '#6b5ce7',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'Ciyex EHR',
      logo: {
        alt: 'Ciyex Logo',
        src: 'img/Ciyex-logo-no-text.png',
        srcDark: 'img/Ciyex-logo-no-text.png',
      },
      items: [
        { to: '/workspace', label: 'Workspace', position: 'left' },
        { to: '/downloads', label: 'Download', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/professional-support', label: 'Support', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://forum.ciyex.org', label: 'Forum', position: 'left' },
        {
          type: 'dropdown',
          label: 'Company',
          position: 'left',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Impact', to: '/impact' },
          ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ciyex-org/ciyex',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/donate',
          label: 'Donate',
          position: 'right',
          className: 'navbar-donate-btn',
          'aria-label': 'Donate to Ciyex',
        },
        {
          to: '/signup',
          label: "Sign up, it's Free",
          position: 'right',
          className: 'button button--primary navbar-signup-btn',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            { label: 'Ciyex Workspace', to: '/workspace' },
            { label: 'Download', to: '/downloads' },
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'Self-host (Docker)', to: '/docs/installation/docker-setup' },
            { label: 'API Reference', to: '/docs/api/rest-api' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Support', to: '/professional-support' },
            { label: 'GitHub Discussions', href: 'https://github.com/ciyex-org/ciyex/discussions' },
            { label: 'Forum', href: 'https://forum.ciyex.org' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Our Impact', to: '/impact' },
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/ciyex-org/ciyex' },
            { label: 'Donate', to: '/donate' },
            { label: 'Contributing', to: '/docs/development/contributing' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
            { label: 'License (AGPL-3.0)', href: 'https://github.com/ciyex-org/ciyex/blob/main/LICENSE' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ciyex Inc., a 501(c)(3) nonprofit (EIN: 41-3609665). Open Source EHR - Licensed under AGPL-3.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
