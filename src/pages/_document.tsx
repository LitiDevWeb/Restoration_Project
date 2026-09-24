import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="#0c0e10" name="theme-color" />
        {/* Brand mark used as the tab/bookmark icon — sources live in scripts/generate-favicon.js */}
        <link href="/images/logo.png" rel="icon" type="image/png" />
        <link href="/icon-32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/icon-192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/icon-512.png" rel="icon" sizes="512x512" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
<link as="font" crossOrigin="anonymous" href="/fonts/dm-serif-display-latin-400-normal.woff2" rel="preload" type="font/woff2" />
<link as="font" crossOrigin="anonymous" href="/fonts/manrope-latin-400-normal.woff2" rel="preload" type="font/woff2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
