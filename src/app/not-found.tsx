import { NotFound } from '@/components/templates';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found - SOPO',
  description:
    'Halaman yang Anda cari tidak ditemukan. Silakan coba lagi atau kembali ke halaman sebelumnya.',
  metadataBase: new URL('https://sopo.vercel.app'),
  openGraph: {
    title: '404 Not Found - SOPO',
    description:
      'Halaman yang Anda cari tidak ditemukan. Silakan coba lagi atau kembali ke halaman sebelumnya.',
    url: 'https://sopo.vercel.app/404',
    siteName: 'SOPO',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: '404 Not Found - SOPO',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 Not Found - SOPO',
    description:
      'Halaman yang Anda cari tidak ditemukan. Silakan coba lagi atau kembali ke halaman sebelumnya.',
    images: ['/og-image.webp'],
  },
  authors: [
    {
      name: 'Brilian Rachmad',
      url: 'https://brilianrachmad.vercel.app/',
    },
  ],
  publisher: 'SOPO',
  keywords: ['404 Not Found', 'Halaman Tidak Ditemukan', 'SOPO'],
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  themeColor: '#61BA44',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default NotFound;
