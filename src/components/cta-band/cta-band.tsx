import type { ReactNode } from 'react';
import { FaEnvelope } from 'react-icons/fa';

import CtaLink from '@webapp/components/cta/cta-link';
import { site } from '@webapp/data/site';
import styles from './cta-band.module.scss';

interface CtaBandProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
 /** Renders the email CTA beside the primary button, matching the home hero. */
 showEmail?: boolean;
}

const CtaBand = ({
  eyebrow = 'Free estimate',
  title,
  lede = `${site.tagline} Call, text or email and we will set up a free walkthrough.`,
  primary = { label: 'Call for estimate', href: site.phoneHref },
  secondary,
 showEmail = true,
}: CtaBandProps) => (
  <section className={styles['band']}>
    <div className={styles['inner']}>
      <p className={styles['eyebrow']}>{eyebrow}</p>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['lede']}>{lede}</p>
      <div className={styles['actions']}>
        <CtaLink href={primary.href}>{primary.label}</CtaLink>
 {showEmail && (
 <CtaLink className={styles['actionEmail']} href={site.emailHref} variant="outline">
 <FaEnvelope aria-hidden="true" size={14} />
 {site.email}
 </CtaLink>
 )}
        {secondary && (
          <CtaLink href={secondary.href} variant="outlineDark">
            {secondary.label}
          </CtaLink>
        )}
      </div>
    </div>
  </section>
);

export default CtaBand;
