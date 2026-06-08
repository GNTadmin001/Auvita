import { Cormorant_Garamond, Cormorant_SC } from 'next/font/google';
import './colors_and_type.css';
import './auvita.css';
import './site.css';
import './overrides.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant-sc',
  display: 'swap',
});

const NOTO_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;500;600;700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap';

const fontVars = [cormorantGaramond.variable, cormorantSC.variable].join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="5HC5M-WSGkv7RSjujU8xOLEf_vOVNPjzExnkeAncYp4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={NOTO_FONTS_URL} />
      </head>
      <body className={fontVars} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
