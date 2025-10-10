import { GlobalProvider, SessionProvider } from '@/shared/providers';
import '@/shared/styles/globals.css';
import '@/shared/styles/tailwind.css';
import 'moment/locale/id';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'SOPO | Ekosistem Pertanian Sacha Inchi Terintegrasi',
  description:
    'SOPO adalah platform ekosistem pertanian digital yang berfokus pada sacha inchi. Mempertemukan petani, pemilik lahan, pemodal, pembibit, trainer, dan konsumen dalam satu aplikasi. Dari bibit, modal, pasar hingga produk turunan sacha inchi tersedia dalam satu ekosistem.',
  metadataBase: new URL('https://sopo.vercel.app'),
  openGraph: {
    title: 'SOPO | Ekosistem Pertanian Sacha Inchi Terintegrasi',
    description:
      'Gabung bersama SOPO, platform ekosistem pertanian digital yang mendukung petani, pemodal, dan konsumen dengan solusi bibit, lahan, modal, hingga produk turunan sacha inchi. Transparan, berkelanjutan, dan ramah lingkungan.',
    url: 'https://sopo.vercel.app',
    siteName: 'SOPO',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'SOPO - Ekosistem Pertanian Sacha Inchi',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOPO | Ekosistem Pertanian Sacha Inchi Terintegrasi',
    description:
      'Platform pertanian digital berfokus pada sacha inchi. Mempertemukan petani, pemilik lahan, pemodal, pembibit, trainer, dan konsumen dalam satu aplikasi ekosistem pertanian modern.',
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
    'Sacha Inchi',
    'Pertanian Sacha Inchi',
    'Minyak Sacha Inchi',
    'Produk Turunan Sacha Inchi',
    'Petani Sacha Inchi',
    'Pertanian Digital',
    'Petani',
    'Pemilik Lahan',
    'Pemodal',
    'Pembibit',
    'Trainer Pertanian',
    'Konsumen',
    'Pasar Hasil Panen',
    'Agritech Indonesia',
    'Pertanian Berkelanjutan',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
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

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" className={poppins.variable}>
      <body suppressHydrationWarning>
        <SessionProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
