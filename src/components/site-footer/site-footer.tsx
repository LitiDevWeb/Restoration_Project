import Link from 'next/link';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

import { coreServices, navLinks, site, specializedServices } from '@webapp/data/site';
import styles from './site-footer.module.scss';

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles['footer']}>
      <div className={styles['inner']}>
        <div className={styles['brand']}>
          <Link className={styles['logo']} href="/home">
            <span className={styles['logo-mark']}>Fennec</span>
            <span className={styles['logo-sub']}>Restoration &amp; Remodeling</span>
          </Link>
          <p className={styles['blurb']}>
            {site.tagline} A licensed Arizona general contractor handling remodeling, restoration, additions and
            outdoor construction across the {site.areaShort}.
          </p>

          <ul className={styles['contact']}>
            <li>
              <FaPhoneAlt aria-hidden="true" size={12} />
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li>
              <FaEnvelope aria-hidden="true" size={12} />
              <a href={site.emailHref}>{site.email}</a>
            </li>
            <li>
              <FaMapMarkerAlt aria-hidden="true" size={12} />
              <span>{site.areaServed}</span>
            </li>
          </ul>
        </div>

        <nav aria-label="Services" className={styles['column']}>
          <h3 className={styles['column-title']}>Services</h3>
          <ul>
            {coreServices.map((service) => (
              <li key={service.key}>
                <Link href="/services">{service.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/work">Project gallery</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Specialties" className={styles['column']}>
          <h3 className={styles['column-title']}>Specialties</h3>
          <ul>
            {specializedServices.slice(0, 9).map((service) => (
              <li key={service.key}>
                <Link href="/services">{service.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className={styles['column']}>
          <h3 className={styles['column-title']}>Company</h3>
          <ul>
            {navLinks
              .filter((link) => link.href !== '/services')
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            <li>
              <Link href="/estimate">Free estimate</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles['bottom']}>
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>
          Arizona ROC {site.roc} · Licensed, bonded &amp; insured {site.classification.toLowerCase()}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
