import React from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import CtaLink from '@webapp/components/cta/cta-link';
import { site, trustPoints } from '@webapp/data/site';
import heroImage from '@images/home-a.png';
import styles from './hero.module.scss';

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  /** Small proof points rendered under the buttons. */
  highlights?: string[];
  showTrustBar?: boolean;
}

const Hero = ({
  eyebrow = `${site.classification} · ROC ${site.roc}`,
  title,
  lede,
  highlights,
  showTrustBar = true,
}: HeroProps) => (
  <section className={styles['hero']}>
    <div aria-hidden="true" className={styles['media']}>
      <Image
        alt="Completed covered addition with standing-seam metal roof built by Fennec Restoration in the Phoenix Valley"
        className={styles['image']}
        priority
        sizes="100vw"
        src={heroImage}
      />
      <span className={styles['overlay']} />
    </div>

    <div className={styles['inner']}>
      <p className={styles['eyebrow']}>{eyebrow}</p>
      <h1 className={styles['title']}>{title}</h1>
      {lede && <p className={styles['lede']}>{lede}</p>}

      <div className={styles['actions']}>
        <CtaLink href={site.phoneHref} size="lg">
          <FaPhoneAlt aria-hidden="true" size={14} />
          Call for estimate
        </CtaLink>
        <CtaLink className={styles['actionEmail']} href={site.emailHref} size="lg" variant="outline">
          <FaEnvelope aria-hidden="true" size={14} />
          {site.email}
        </CtaLink>
      </div>

      {highlights && (
        <ul className={styles['highlights']}>
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>

    {showTrustBar && (
      <div className={styles['trustbar']}>
        <ul className={styles['trustbar-inner']}>
          {trustPoints.map((point) => (
            <li key={point.value}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

export default Hero;
