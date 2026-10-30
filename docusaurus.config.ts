import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// The India site is a separate Docusaurus site in india/. This one is the US
// site: the 501(c)(3), its open source EHR and its services.

const config: Config = {
  title: 'Ciyex',
  tagline: 'Healthcare software and services: an open source EHR, backed by our services team.',
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
          telephone: '+1-844-874-2236',
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

  // Each country is a locale with its own URL space and its own pages. The
  // default locale (en-us) is served unprefixed at /, India at /en-in/.
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us'],
    localeConfigs: {
      'en-us': { label: 'United States', htmlLang: 'en-US' },
    },
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
          customCss: ['./src/css/custom.css', './src/css/theme.css'],
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
    './src/clientModules/scrollReveal.ts',
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
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'services_announcement',
      content: 'Medical billing, dental billing and virtual assistants for US practices. <a href="/services">Explore our services</a>',
      backgroundColor: '#6b5ce7',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'Ciyex',
      logo: {
        alt: 'Ciyex Logo',
        src: 'img/Ciyex-logo-no-text.png',
        srcDark: 'img/Ciyex-logo-no-text.png',
      },
      items: [
        { type: 'custom-servicesMenu', position: 'left' },
        {
          type: 'dropdown',
          label: 'Software',
          position: 'left',
          items: [
            { label: 'Ciyex Workspace', to: '/workspace' },
            { label: 'Download', to: '/downloads' },
            { label: 'Documentation', to: '/docs/intro' },
          ],
        },
        { to: '/#who-we-serve', label: 'Who We Serve', position: 'left', activeBaseRegex: '^$' },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'Forum', href: 'https://forum.ciyex.org' },
            { label: 'Support', to: '/contact' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Company',
          position: 'left',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Impact', to: '/impact' },
            { label: 'Donate', to: '/donate' },
            { label: 'Contact', to: '/contact' },
          ],
        },
        {
          type: 'html',
          position: 'right',
          value: '<a class="navbar__link nav-phone" href="tel:+18448742236">(844) 874-2236</a>',
        },
        { type: 'custom-countrySwitch', position: 'right' },
        {
          to: '/contact',
          label: 'Book a consultation',
          position: 'right',
          className: 'button button--primary navbar-signup-btn',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Services',
          items: [
            { label: 'Medical billing', to: '/services/medical-billing' },
            { label: 'Dental billing', to: '/services/dental-billing' },
            { label: 'Virtual assistants', to: '/services/virtual-assistant' },
            { label: 'Medical coding', to: '/services/medical-coding' },
            { label: 'Credentialing', to: '/services/physician-credentialing' },
            { label: 'All services', to: '/services' },
          ],
        },
        {
          title: 'Software',
          items: [
            { label: 'Ciyex Workspace', to: '/workspace' },
            { label: 'Download', to: '/downloads' },
            { label: 'Documentation', to: '/docs/intro' },
            { label: 'GitHub', href: 'https://github.com/ciyex-org/ciyex' },
          ],
        },
        {
          title: 'Company',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Our Impact', to: '/impact' },
            { label: 'Blog', to: '/blog' },
            { label: 'Donate', to: '/donate' },
            { label: 'Contact', to: '/contact' },
          ],
        },
        {
          title: 'Contact',
          items: [
            { html: '<a class="footer__link-item" href="tel:+18448742236">(844) 874-2236</a>' },
            { html: '<a class="footer__link-item" href="mailto:help@ciyex.org">help@ciyex.org</a>' },
            { html: '<span class="footer__address">30 N Gould St, Ste N<br />Sheridan, WY 82801</span>' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
            { label: 'SMS Consent', to: '/sms-consent' },
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
