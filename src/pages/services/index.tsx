import CtaBand from '@webapp/components/cta-band/cta-band';
import Faq from '@webapp/components/faq/faq';
import Layout from '@webapp/components/layout/layout';
import PageHero from '@webapp/components/page-hero/page-hero';
import ProcessSteps from '@webapp/components/process-steps/process-steps';
import Seo from '@webapp/components/seo/seo';
import ServiceGrid from '@webapp/components/service-grid/service-grid';
import WhyFennec from '@webapp/components/why-fennec/why-fennec';
import { breadcrumbSchema, localBusinessSchema, servicePageSchema } from '@webapp/data/schema';
import { coreServices, site } from '@webapp/data/site';
import heroImage from '@images/bathroom/3.jpg';

const Services = () => (
  <Layout>
    <Seo
      description="Kitchen and bathroom remodeling, restoration, room additions, outdoor living and new construction from a licensed Phoenix Valley general contractor. ROC 355657. Free itemized estimates."
      image="/images/bathroom/3.jpg"
      path="/services"
      structuredData={[
        localBusinessSchema,
        servicePageSchema(coreServices.map((service) => ({ name: service.title, description: service.summary }))),
        breadcrumbSchema([
          { name: 'Home', path: '/home' },
          { name: 'Services', path: '/services' },
        ]),
      ]}
      title="Remodeling, Restoration & Construction Services"
    />

    <PageHero
      eyebrow={`${site.classification} · ROC ${site.roc}`}
      image={heroImage}
      imageAlt="Finished walk-in shower with large-format tile installed during a Fennec Restoration bathroom remodel"
      lede="Kitchens, bathrooms, structural repairs, room additions, outdoor structures and ground-up builds — all delivered by the same licensed contractor, with the same written scope and itemized pricing."
      title={
        <>
          Services built around <span>real scopes and real budgets</span>
        </>
      }
    />

    <ServiceGrid />

    <WhyFennec />

    <ProcessSteps />

    <Faq />

    <CtaBand
      title={
        <>
          Not sure which service fits your project? <span>Ask us — we will tell you straight.</span>
        </>
      }
    />
  </Layout>
);

export default Services;
