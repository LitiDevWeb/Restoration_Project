import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

import EstimateForm from '@webapp/components/estimate-form/estimate-form';
import SectionHeading from '@webapp/components/section-heading/section-heading';
import { site } from '@webapp/data/site';
import styles from './estimate-section.module.scss';

const EstimateSection = () => (
  <section className={styles['section']} id="estimate">
    <div className={styles['inner']}>
      <div className={styles['intro']}>
        <SectionHeading
          eyebrow="Free estimate"
          lede="Send the details and Fennec calls or texts back to book a free walkthrough. No obligation, no pressure and no charge for coming out to look at the project."
          title={
            <>
              Tell us what you want built — <span>we price it in writing</span>
            </>
          }
          tone="dark"
        />

        <ul className={styles['contacts']}>
          <li>
            <span className={styles['icon']}>
              <FaPhoneAlt aria-hidden="true" size={13} />
            </span>
            <div>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <p>Call or text — the fastest way to reach us</p>
            </div>
          </li>
          <li>
            <span className={styles['icon']}>
              <FaEnvelope aria-hidden="true" size={13} />
            </span>
            <div>
              <a href={site.emailHref}>{site.email}</a>
              <p>Send photos, plans or a previous bid to compare</p>
            </div>
          </li>
          <li>
            <span className={styles['icon']}>
              <FaMapMarkerAlt aria-hidden="true" size={13} />
            </span>
            <div>
              <span className={styles['plain']}>{site.areaServed}</span>
              <p>Residential and commercial projects across the Valley</p>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles['card']}>
        <p className={styles['card-eyebrow']}>Estimate request</p>
        <EstimateForm />
      </div>
    </div>
  </section>
);

export default EstimateSection;
