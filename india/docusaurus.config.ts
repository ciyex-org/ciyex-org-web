import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// The India site: Ciyex HIMS, sold by an Indian company. It is a separate
// Docusaurus site that shares nothing with the US site at the repo root except
// node_modules, and is built into build/en-in/ (see `npm run build`). It must
// never state nonprofit status, the EIN or tax-deductible giving.
const INDIA_ENTITY = 'Qiaben Healthcare Solutions Pvt Ltd';

const INDIA_HEAD_TAGS = [
  {
    tagName: 'script',
    attributes: { type: 'application/ld+json' },
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: INDIA_ENTITY,
      alternateName: 'Ciyex',
      url: 'https://ciyex.org/en-in/',
      logo: 'https://ciyex.org/en-in/img/Ciyex-logo-no-text.png',
      description: 'Hospital information management software for hospitals and clinics in India. Registration and UHID, OPD, wards, laboratory, pharmacy, billing and more.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1/39, Veerappanur',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        postalCode: '641105',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@qiaben.com',
        contactType: 'customer support',
      },
    }),
  },
  {
    tagName: 'script',
    attributes: { type: 'application/ld+json' },
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Ciyex HIMS',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web, Docker, Kubernetes',
    }),
  },
];

const config: Config = {
  title: 'Ciyex HIMS',
  tagline: 'Ciyex Workspace and the Ciyex HIMS — one platform for your whole hospital.',
  favicon: 'img/Ciyex-favicon-new.png',
  url: 'https://ciyex.org',
  baseUrl: '/en-in/',
  onBrokenLinks: 'throw',
  headTags: INDIA_HEAD_TAGS,

  i18n: {
    defaultLocale: 'en-in',
    locales: ['en-in'],
    localeConfigs: {
      'en-in': { label: 'India', htmlLang: 'en-IN' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
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
    './src/clientModules/ga4Events.ts',
    './src/clientModules/scrollReveal.ts',
  ],

  themeConfig: {
    image: 'img/ciyex-social-card-in.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'hims_announcement',
      content: 'Ciyex HIMS is available for hospitals across India. <a href="/en-in/signup">Talk to our team</a>',
      backgroundColor: '#1d4ed8',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'Ciyex HIMS',
      logo: {
        alt: 'Ciyex Logo',
        src: 'img/Ciyex-logo-no-text.png',
        srcDark: 'img/Ciyex-logo-no-text.png',
      },
      items: [
        { to: '/modules', label: 'Modules', position: 'left' },
        { to: '/workspace', label: 'Workspace', position: 'left' },
        { to: '/professional-support', label: 'Support', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        { to: '/impact', label: 'Impact', position: 'left' },
        { type: 'custom-countrySwitch', position: 'right' },
        {
          to: '/signup',
          label: 'Book a demo',
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
            { label: 'HIMS Modules', to: '/modules' },
            { label: 'Ciyex Workspace', to: '/workspace' },
          ],
        },
        {
          title: 'Company',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Our Impact', to: '/impact' },
            { label: 'Support', to: '/professional-support' },
          ],
        },
        {
          title: 'Contact',
          items: [
            { label: 'info@qiaben.com', href: 'mailto:info@qiaben.com' },
            { label: 'Book a Demo', to: '/signup' },
            { label: 'Coimbatore, Tamil Nadu', to: '/about' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${INDIA_ENTITY}. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
