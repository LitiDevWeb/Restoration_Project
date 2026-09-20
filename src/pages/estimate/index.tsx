import EstimateSection from '@webapp/components/estimate-section/estimate-section';
import Faq from '@webapp/components/faq/faq';
import Layout from '@webapp/components/layout/layout';
import PageHero from '@webapp/components/page-hero/page-hero';
import Seo from '@webapp/components/seo/seo';
import { breadcrumbSchema, localBusinessSchema } from '@webapp/data/schema';
import { site } from '@webapp/data/site';
import heroImage from '@images/kitchen/A1.jpg';

const Estimate = () => (
  <Layout>
    <Seo
      description={`Request a free, no-obligation estimate from Fennec Restoration & Remodeling LLC. Licensed Phoenix Valley general contractor, ROC ${site.roc}. Call or text ${site.phoneDisplay}.`}
      image="/images/kitchen/A1.jpg"
      path="/estimate"
      structuredData={[
        localBusinessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/home' },
          { name: 'Free estimate', path: '/estimate' },
        ]),
      ]}
      title="Request a Free Estimate"
    />

    <PageHero
      eyebrow={`Free estimate · ROC ${site.roc}`}
      image={heroImage}
      imageAlt="Finished kitchen with new cabinetry and countertops installed by Fennec Restoration"
      lede="Send the project details below or call directly. We review the scope, ask the questions that matter, then walk the site with you and price the work in writing — at no charge."
      showCta={false}
      title={
        <>
          Tell us what you want built — <span>we price it in writing</span>
        </>
      }
    />

    <EstimateSection />

    <Faq />
  </Layout>
);

export default Estimate;
