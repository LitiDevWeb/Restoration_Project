import AboutPreview from '@webapp/components/about-preview/about-preview';
import CtaBand from '@webapp/components/cta-band/cta-band';
import Faq from '@webapp/components/faq/faq';
import Layout from '@webapp/components/layout/layout';
import PageHero from '@webapp/components/page-hero/page-hero';
import ProcessSteps from '@webapp/components/process-steps/process-steps';
import Seo from '@webapp/components/seo/seo';
import WhyFennec from '@webapp/components/why-fennec/why-fennec';
import { breadcrumbSchema, localBusinessSchema } from '@webapp/data/schema';
import { site } from '@webapp/data/site';
import heroImage from '@images/miscellaneous/F2.jpg';

const About = () => (
  <Layout>
    <Seo
      description={`Fennec Restoration & Remodeling LLC is a locally owned, Arizona-licensed general contractor (ROC ${site.roc}) serving the Phoenix Valley with remodeling, restoration, additions and outdoor construction.`}
      image="/images/miscellaneous/A3.jpg"
      path="/about"
      structuredData={[
        localBusinessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/home' },
          { name: 'About', path: '/about' },
        ]),
      ]}
      title="About Fennec Restoration & Remodeling LLC"
    />

    <PageHero
      eyebrow={`Locally owned · ROC ${site.roc}`}
      image={heroImage}
      imageAlt="Covered addition with a standing-seam metal roof completed by Fennec Restoration in the Phoenix Valley"
      lede="Fennec Restoration & Remodeling LLC is a Phoenix Valley general contractor that handles the whole project — framing, trades, permits, finishes and cleanup — instead of handing you off between crews."
      title={
        <>
          One licensed contractor, <span>start to finish</span>
        </>
      }
    />

    <AboutPreview />

    <WhyFennec />

    <ProcessSteps />

    <Faq />

    <CtaBand
      title={
        <>
          Ready to talk about your project? <span>We will walk it with you for free.</span>
        </>
      }
    />
  </Layout>
);

export default About;
