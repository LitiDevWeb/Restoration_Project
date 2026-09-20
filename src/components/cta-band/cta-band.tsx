import type { ReactNode } from 'react';

import CtaLink from '@webapp/components/cta/cta-link';
import { site } from '@webapp/data/site';
import styles from './cta-band.module.scss';

interface CtaBandProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

const CtaBand = ({
  eyebrow = 'Free estimate',
  title,
  lede = `${site.tagline} Send your project details or call and we will set up a free walkthrough.`,
  primary = { label: 'Request a free estimate', href: '/estimate' },
  secondary = { label: `Call ${site.phoneDisplay}`, href: site.phoneHref },
}: CtaBandProps) => (
  <section className={styles['band']}>
    <div className={styles['inner']}>
      <p className={styles['eyebrow']}>{eyebrow}</p>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['lede']}>{lede}</p>
      <div className={styles['actions']}>
        <CtaLink href={primary.href}>{primary.label}</CtaLink>
        <CtaLink href={secondary.href} variant="outlineDark">
          {secondary.label}
        </CtaLink>
      </div>
    </div>
  </section>
);

export default CtaBand;
