import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import classNames from 'classnames';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import CtaLink from '@webapp/components/cta/cta-link';
import { site } from '@webapp/data/site';
import styles from './page-hero.module.scss';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  image: StaticImageData;
  imageAlt: string;
  showCta?: boolean;
}

/** Compact dark hero used at the top of every interior page. */
const PageHero = ({ eyebrow, title, lede, image, imageAlt, showCta = true }: PageHeroProps) => (
  <section className={classNames(styles['hero'])}>
    <div aria-hidden="true" className={styles['media']}>
      <Image alt={imageAlt} className={styles['image']} fill priority sizes="100vw" src={image} />
      <span className={styles['overlay']} />
    </div>

    <div className={styles['inner']}>
      <p className={styles['eyebrow']}>{eyebrow}</p>
      <h1 className={styles['title']}>{title}</h1>
      <p className={styles['lede']}>{lede}</p>

      {showCta && (
        <div className={styles['actions']}>
          <CtaLink href={site.phoneHref} size="md">
            <FaPhoneAlt aria-hidden="true" size={14} />
            Call for estimate
          </CtaLink>
 <CtaLink className={styles['actionEmail']} href={site.emailHref} size="md" variant="outline">
 <FaEnvelope aria-hidden="true" size={14} />
 {site.email}
 </CtaLink>
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
