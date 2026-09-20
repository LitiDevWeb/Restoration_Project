import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="#0c0e10" name="theme-color" />
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
