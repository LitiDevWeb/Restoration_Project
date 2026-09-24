import AboutPreview from '@webapp/components/about-preview/about-preview';
import Faq from '@webapp/components/faq/faq';
import Hero from '@webapp/components/hero/hero';
import Layout from '@webapp/components/layout/layout';
import ProcessSteps from '@webapp/components/process-steps/process-steps';
import ProjectGallery from '@webapp/components/project-gallery/project-gallery';
import Seo from '@webapp/components/seo/seo';
import ServiceGrid from '@webapp/components/service-grid/service-grid';
import WhyFennec from '@webapp/components/why-fennec/why-fennec';
import { featuredProjectIds, projects, type Project } from '@webapp/data/projects';
import { faqSchema, localBusinessSchema, websiteSchema } from '@webapp/data/schema';
import { faqs, site } from '@webapp/data/site';

const HOME_FAQ_COUNT = 4;

const Home = () => {
  const featured = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  return (
    <Layout>
      <Seo
        description="Fennec Restoration & Remodeling LLC is a licensed Phoenix Valley general contractor for kitchen and bathroom remodels, room additions, outdoor living and restoration. ROC 355657. Free itemized estimates."
        path="/home"
        structuredData={[localBusinessSchema, websiteSchema, faqSchema(faqs.slice(0, HOME_FAQ_COUNT))]}
        title="Remodeling, Additions & Restoration in the Phoenix Valley"
      />

      <Hero
        highlights={[
          'Free walkthrough and itemized estimate',
          'Permits, trades and inspections handled',
          `Call or text ${site.phoneDisplay}`,
        ]}
        lede="Comprehensive construction, renovation, and property improvement services tailored to your needs. From transformative renovations to large-scale residential projects, we bring precision, professionalism, and accountability to every job."
        title={
          <>
            Big or small — <span>we do it all.</span>
          </>
        }
      />

      <ServiceGrid />

      <WhyFennec />

      <ProjectGallery
        columns={3}
        headingEyebrow="Featured projects"
        headingLede="Real job sites, photographed before, during and after the work. Open any project to walk through the full set or compare the before and after side by side."
        items={featured}
        showFilters={false}
      />

      <ProcessSteps />

      <AboutPreview />

      <Faq limit={HOME_FAQ_COUNT} />
    </Layout>
  );
};

export default Home;
