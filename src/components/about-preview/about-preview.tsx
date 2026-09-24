import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

import CtaLink from '@webapp/components/cta/cta-link';
import Reveal from '@webapp/components/reveal/reveal';
import SectionHeading from '@webapp/components/section-heading/section-heading';
import { galleryStats } from '@webapp/data/projects';
import { site } from '@webapp/data/site';
import bathroomBeforeAfter from '@images/miscellaneous/C12.png';
import styles from './about-preview.module.scss';

const credentials = [
  `Arizona licensed general contractor — ROC ${site.roc}`,
  'Bonded and insured, with permits handled in-house',
  'Residential and commercial scopes, from repairs to full builds',
  'Locally owned and operated in the Phoenix Valley',
];

const AboutPreview = () => (
  <section className={styles['section']} id="about">
    <div className={styles['inner']}>
      <div className={styles['media']}>
        <div className={styles['frame']}>
          <Image
            alt="Before and after view of a bathroom vanity rebuilt by Fennec Restoration in the Phoenix Valley"
            className={styles['image']}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            src={bathroomBeforeAfter}
          />
        </div>
        <div className={styles['stats']}>
          <div>
            <strong>{galleryStats.projects}</strong>
            <span>Documented projects</span>
          </div>
          <div>
            <strong>{galleryStats.photos}+</strong>
            <span>Job site photos</span>
          </div>
          <div>
            <strong>{galleryStats.categories}</strong>
            <span>Build categories</span>
          </div>
        </div>
      </div>

      <div className={styles['content']}>
        <SectionHeading
          eyebrow="About Fennec"
          lede={`${site.name} is a Phoenix Valley general contractor that handles remodeling, restoration, additions and outdoor construction. You work with the person running the job — not a call center — and every scope is priced in writing before a tool comes out.`}
          title={
            <>
              A contractor that shows up, <span>stays on schedule</span> and finishes
            </>
          }
        />

        <ul className={styles['credentials']}>
          {credentials.map((item, index) => (
            <Reveal as="li" delay={index * 70} key={item}>
              <FaCheck aria-hidden="true" className={styles['check']} size={12} />
              <span>{item}</span>
            </Reveal>
          ))}
        </ul>

        <div className={styles['actions']}>
          <CtaLink href="/about">More about us</CtaLink>
          <CtaLink href={site.phoneHref} variant="outline">
            Call {site.phoneDisplay}
          </CtaLink>
        </div>
      </div>
    </div>
  </section>
);

export default AboutPreview;
