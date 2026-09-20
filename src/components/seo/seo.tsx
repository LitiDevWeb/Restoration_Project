import Head from 'next/head';
import { site } from '@webapp/data/site';
import { SITE_ORIGIN, type SchemaObject } from '@webapp/data/schema';

interface SeoProps {
  /** Page title without the brand suffix — the suffix is appended here. */
  title: string;
  description: string;
  /** Route path beginning with a slash, used for the canonical URL. */
  path: string;
  /** Absolute or public-relative social share image. */
  image?: string;
  noIndex?: boolean;
  structuredData?: SchemaObject | SchemaObject[];
}

const DEFAULT_IMAGE = '/images/miscellaneous/A3.jpg';

const Seo = ({ title, description, path, image = DEFAULT_IMAGE, noIndex = false, structuredData }: SeoProps) => {
  const fullTitle = `${title} | ${site.shortName}`;
  const canonical = `${SITE_ORIGIN}${path === '/' ? '' : path}`;
  const socialImage = image.startsWith('http') ? image : `${SITE_ORIGIN}${image}`;
  const schemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta content={description} name="description" />
      <link href={canonical} rel="canonical" />
      <meta content={noIndex ? 'noindex, nofollow' : 'index, follow'} name="robots" />
      <meta content={site.name} name="author" />
      <meta content={site.areaServed} name="geo.placename" />

      {/* Open Graph */}
      <meta content={fullTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={canonical} property="og:url" />
      <meta content={site.name} property="og:site_name" />
      <meta content={socialImage} property="og:image" />
      <meta content="Phoenix Valley general contractor and remodeling portfolio" property="og:image:alt" />
      <meta content="en_US" property="og:locale" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={fullTitle} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={socialImage} name="twitter:image" />

      {schemas.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`jsonld-${index}`}
          type="application/ld+json"
        />
      ))}
    </Head>
  );
};

export default Seo;
