import type { ReactNode } from 'react';
import Link from 'next/link';
import { FaBuilding, FaExpand, FaHouseDamage, FaSun, FaTools } from 'react-icons/fa';

import SectionHeading from '@webapp/components/section-heading/section-heading';
import { coreServices, site, specializedServices } from '@webapp/data/site';
import styles from './service-grid.module.scss';

const icons: Record<string, ReactNode> = {
  remodeling: <FaTools aria-hidden="true" size={22} />,
  restoration: <FaHouseDamage aria-hidden="true" size={22} />,
  additions: <FaExpand aria-hidden="true" size={22} />,
  outdoor: <FaSun aria-hidden="true" size={22} />,
  'new-builds': <FaBuilding aria-hidden="true" size={22} />,
};

interface ServiceGridProps {
  withHeading?: boolean;
}

const ServiceGrid = ({ withHeading = true }: ServiceGridProps) => (
  <section className={styles['section']} id="services">
    <div className={styles['inner']}>
      {withHeading && (
        <SectionHeading
          eyebrow="What we do"
          lede={`${site.tagline} From a single room remodel to a ground-up addition, Fennec Restoration & Remodeling handles design, trades, permits and finish work under one contract.`}
          title={
            <>
              Remodeling, restoration and construction <span>under one roof</span>
            </>
          }
        />
      )}

      <ul className={styles['grid']}>
        {coreServices.map((service, index) => (
          <li className={styles['card']} key={service.key}>
            <div className={styles['card-top']}>
              <span className={styles['icon']}>{icons[service.key]}</span>
              <span className={styles['number']}>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className={styles['card-title']}>{service.title}</h3>
            <p className={styles['card-text']}>{service.summary}</p>
            <ul className={styles['bullets']}>
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link className={styles['card-link']} href="/estimate">
              Start an estimate
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles['specialized']}>
        <p className={styles['specialized-label']}>Specialized services</p>
        <ul className={styles['tags']}>
          {specializedServices.map((service) => (
            <li key={service.key}>{service.label}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ServiceGrid;
