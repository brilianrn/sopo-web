import { AuthLayout } from '@/components/templates';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'SOPO | Bersama Membangun Ekosistem Agribisnis Berkelanjutan',
  description:
    'SOPO adalah ekosistem pertanian digital berbasis Sacha Inchi yang mempertemukan petani, pemilik lahan, pemodal, pembibit, trainer, dan konsumen. Dari marketplace produk, carbon credit, manajemen lahan hingga training digital tersedia dalam satu aplikasi.',
  metadataBase: new URL('https://.sopo.co.id'),
  openGraph: {
    title: 'SOPO | Ekosistem Pertanian Digital Berbasis Sacha Inchi',
    description:
      'Gabung bersama SOPO, platform pertanian digital untuk membangun ekosistem agribisnis berkelanjutan. Hadir dengan fitur marketplace, carbon credit, manajemen lahan, dan training digital.',
    url: 'https://sopo.co.id',
    siteName: 'SOPO',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'SOPO - Ekosistem Pertanian Digital Berbasis Sacha Inchi',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOPO | Bersama Membangun Ekosistem Agribisnis Berkelanjutan',
    description:
      'SOPO, ekosistem pertanian digital berbasis Sacha Inchi yang mempertemukan petani, pemilik lahan, pemodal, pembibit, trainer, dan konsumen dalam satu aplikasi.',
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
    'SOPO',
    'Ekosistem Agribisnis Berkelanjutan',
    'Pertanian Digital',
    'Sacha Inchi',
    'Marketplace Pertanian',
    'Carbon Credit',
    'Manajemen Lahan',
    'Training Digital Petani',
    'Petani',
    'Pemilik Lahan',
    'Pemodal',
    'Pembibit',
    'Trainer',
    'Konsumen',
    'Agritech Indonesia',
    'Pertanian Modern',
    'Produk Turunan Sacha Inchi',
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

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => <AuthLayout>{children}</AuthLayout>;

export default Layout;
