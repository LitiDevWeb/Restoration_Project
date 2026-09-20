import type { GetServerSideProps } from 'next';

import { SITE_ORIGIN } from '@webapp/data/schema';

type SitemapRoute = {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
};

const ROUTES: SitemapRoute[] = [
  { path: '/home', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/work', changefreq: 'weekly', priority: '0.9' },
  { path: '/estimate', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/calendar', changefreq: 'weekly', priority: '0.5' },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_ORIGIN}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join('\n');

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
  res.end();

  return { props: {} };
};

/** The sitemap is served straight from the response — no component tree is rendered. */
const Sitemap = () => null;

export default Sitemap;
