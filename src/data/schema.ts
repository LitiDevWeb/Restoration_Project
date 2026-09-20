import { site } from '@webapp/data/site';

const SITE_URL = site.url;

export type SchemaObject = Record<string, unknown>;

/**
 * Primary entity for the site: Fennec Restoration & Remodeling LLC as an
 * Arizona-licensed general contractor serving the Phoenix Valley.
 */
export const localBusinessSchema: SchemaObject = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  legalName: site.legalName,
  description:
    'Fennec Restoration & Remodeling LLC is a licensed, bonded and insured general contractor serving the Phoenix Valley with kitchen and bathroom remodeling, room additions, outdoor living structures, roofing and restoration work.',
  url: SITE_URL,
  telephone: '+1-602-245-1768',
  email: site.email,
  image: `${SITE_URL}/images/miscellaneous/A3.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  identifier: {
    '@type': 'PropertyValue',
    name: 'Arizona Registrar of Contractors License',
    value: `ROC ${site.roc}`,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: site.areaServed,
  },
  knowsAbout: [
    'Kitchen remodeling',
    'Bathroom remodeling',
    'Room additions',
    'Garage conversions',
    'Patio covers and ramadas',
    'Pergolas',
    'Pavers and concrete',
    'Roofing and metal roofing',
    'Water and fire damage restoration',
    'Drywall and texture',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction and remodeling services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Room additions and garage conversions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outdoor living: patios, ramadas and pergolas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roofing and structural repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restoration after water or fire damage' } },
    ],
  },
};

export const websiteSchema: SchemaObject = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: site.name,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export const servicePageSchema = (services: { name: string; description: string }[]): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Services offered by Fennec Restoration & Remodeling LLC',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'AdministrativeArea', name: site.areaServed },
    },
  })),
});

export const faqSchema = (items: { question: string; answer: string }[]): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path}`,
  })),
});

export const SITE_ORIGIN = SITE_URL;
