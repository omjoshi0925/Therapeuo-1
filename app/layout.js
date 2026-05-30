import './globals.css';
import localFont from 'next/font/local';

const zodiak = localFont({
  src: [
    {
      path: '../public/fonts/Zodiak-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Zodiak-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Zodiak-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const archivo = localFont({
  src: [
    {
      path: '../public/fonts/Archivo-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Archivo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = 'https://therapeuo.xyz';
const SITE_TITLE = "Therapeuo | World's First Smart Insole";
const SITE_DESCRIPTION =
  'A smart insole that tracks weight-bearing for physical therapy patients to accelerate the healing process by nearly 2x. Designed by Engineers from UC Berkeley, Purdue & the NHS.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Therapeuo',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Therapeuo',
  generator: 'Next.js',
  keywords: [
    'smart insole',
    'physical therapy',
    'weight-bearing sensor',
    'wearable medical device',
    'pressure sensor insole',
    'rehabilitation technology',
    'post-op recovery',
    'gait analysis',
    'PT recovery wearable',
    'orthopedic recovery',
    'Therapeuo',
  ],
  authors: [{ name: 'Therapeuo' }],
  creator: 'Therapeuo',
  publisher: 'Therapeuo',
  category: 'Health & Medical Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Therapeuo',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // og:image auto-injected from app/opengraph-image.js
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // twitter:image auto-injected from app/twitter-image.js
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  verification: {
    // Add your Google Search Console verification token here once issued:
    // google: 'xxxxxxxxxxxxxxxx',
  },
};

export const viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Therapeuo',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/Therapeuo.svg`,
  description: SITE_DESCRIPTION,
  email: 'contact@therapeuo.xyz',
  founder: [
    { '@type': 'Organization', name: 'UC Berkeley' },
    { '@type': 'Organization', name: 'Purdue University' },
    { '@type': 'Organization', name: 'NHS' },
  ],
  sameAs: [],
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "Therapeuo Smart Insole",
  description:
    "The world's first smart insole that tracks weight-bearing for physical therapy patients in real time, accelerating the healing process by nearly 2x.",
  brand: { '@type': 'Brand', name: 'Therapeuo' },
  category: 'Medical Wearable / Rehabilitation Device',
  image: [`${SITE_URL}/insole%20mockup/layer-1-top_liner.png`],
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/#preorder`,
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
    availabilityStarts: '2026-09-01',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE_URL,
  name: 'Therapeuo',
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${zodiak.variable} ${archivo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
