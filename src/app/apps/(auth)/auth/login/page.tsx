import { LoginView } from '@/packages/apps/auth/presentation/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk ke SOPO | Akses Ekosistem Pertanian Digital Anda',
  description:
    'Masuk ke akun SOPO Anda. Akses fitur manajemen lahan, carbon credit, marketplace Sacha Inchi, dan pelatihan petani. Masuk mudah dengan email atau akun Google/Apple.',
  metadataBase: new URL('https://sopo-gamma.vercel.app'),
  manifest: '/manifest.json',
  openGraph: {
    title: 'Masuk ke SOPO',
    description:
      'Lanjutkan ke SOPO, platform agritech yang mempertemukan petani, investor, dan pembibit untuk pertanian Sacha Inchi yang berkelanjutan.',
    url: 'https://sopo-gamma.vercel.app/login',
    siteName: 'SOPO',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'SOPO - Masuk ke Ekosistem Pertanian Digital',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masuk SOPO',
    description: 'Masuk untuk mengakses dashboard SOPO Anda.',
    images: ['/og-image.webp'],
  },
  authors: [
    {
      name: 'Brilian Rachmad',
      url: 'https://brilianrachmad.vercel.app/',
    },
  ],
  publisher: 'SOPO',
  keywords: [
    'SOPO login',
    'Masuk SOPO',
    'Akun Petani Digital',
    'Masuk Sacha Inchi',
    'Pertanian Digital Masuk',
    'Masuk Google',
    'Masuk Apple',
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  themeColor: '#61BA44',
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

export default LoginView;
