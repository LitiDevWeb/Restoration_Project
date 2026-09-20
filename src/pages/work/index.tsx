import CtaBand from '@webapp/components/cta-band/cta-band';
import Layout from '@webapp/components/layout/layout';
import PageHero from '@webapp/components/page-hero/page-hero';
import ProjectGallery from '@webapp/components/project-gallery/project-gallery';
import Seo from '@webapp/components/seo/seo';
import { galleryStats, projects } from '@webapp/data/projects';
import { breadcrumbSchema, localBusinessSchema } from '@webapp/data/schema';
import { site } from '@webapp/data/site';
import heroImage from '@images/patio/9.jpg';

const Work = () => (
  <Layout>
    <Seo
      description={`Browse ${galleryStats.projects} documented Fennec Restoration projects and ${galleryStats.photos} job site photos from across the Phoenix Valley — kitchens, bathrooms, additions, outdoor living and restoration work, shown before, during and after.`}
      image="/images/patio/9.jpg"
      path="/work"
      structuredData={[
        localBusinessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/home' },
          { name: 'Our work', path: '/work' },
        ]),
      ]}
      title="Project Gallery: Kitchens, Bathrooms, Additions & More"
    />

    <PageHero
      eyebrow={`${galleryStats.projects} projects · ${galleryStats.photos} photos`}
      image={heroImage}
      imageAlt="Completed covered patio with pavers and a standing-seam roof built by Fennec Restoration"
      lede="No stock photos and no renders. Every image below was taken on a Fennec job site in the Phoenix Valley — including the rough, unfinished stages most contractors never show you."
      title={
        <>
          Work we have <span>actually finished</span>
        </>
      }
    />

    <ProjectGallery
      columns={3}
      headingEyebrow="Project gallery"
      headingLede={`Filter by category to find scope similar to yours. Open any project for the full photo set, the written scope of work and a direct before-and-after comparison. ${site.tagline}`}
      items={projects}
    />

    <CtaBand
      title={
        <>
          Want your project to look like this? <span>Let&apos;s scope it out.</span>
        </>
      }
    />
  </Layout>
);

export default Work;
