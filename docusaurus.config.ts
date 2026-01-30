import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ciyex EHR',
  tagline: 'Open Source Electronic Health Records - Modern, Secure, Interoperable',
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
        },
        blog: {
          showReadingTime: true,
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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ciyex-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'oss_announcement',
      content: '⭐️ Ciyex EHR is now open source! <a target="_blank" rel="noopener noreferrer" href="https://github.com/ciyex-org/ciyex">Star us on GitHub</a>',
      backgroundColor: '#6b5ce7',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'Ciyex EHR',
      logo: {
        alt: 'Ciyex EHR Logo',
        src: 'img/Ciyex-logo-no-text.png',
        srcDark: 'img/Ciyex-logo-no-text.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/docs/api', label: 'API', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            { label: 'Contributing', to: '/docs/contributing' },
            { label: 'Code of Conduct', to: '/docs/code-of-conduct' },
            { label: 'Discussions', href: 'https://github.com/ciyex-org/ciyex/discussions' },
          ],
        },
        {
          href: 'https://github.com/ciyex-org/ciyex',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/installation' },
            { label: 'Configuration', to: '/docs/configuration' },
            { label: 'API Reference', to: '/docs/api' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Discussions', href: 'https://github.com/ciyex-org/ciyex/discussions' },
            { label: 'Discord', href: 'https://discord.gg/ciyex' },
            { label: 'Twitter', href: 'https://twitter.com/ciyexehr' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/ciyex-org/ciyex' },
            { label: 'Release Notes', to: '/docs/releases' },
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
      copyright: `Copyright © ${new Date().getFullYear()} Ciyex Organization. Open Source EHR - Licensed under AGPL-3.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
