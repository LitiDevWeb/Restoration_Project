import Image from 'next/image';
import SectionHeading from '@webapp/components/section-heading/section-heading';
import { whyFennec } from '@webapp/data/site';
import galleryImage from '@images/bathroom/3.jpg';
import detailImage from '@images/patio/8.jpg';
import styles from './why-fennec.module.scss';

const WhyFennec = () => (
  <section className={styles['section']} id="why-fennec">
    <div className={styles['inner']}>
      <SectionHeading
        eyebrow="Why Fennec"
        lede="One licensed general contractor, one point of contact and one written scope — so the project you approve is the project you get."
        title={
          <>
            Built on straight answers and <span>finished work</span>
          </>
        }
        tone="dark"
      />

      <div className={styles['layout']}>
        <ul className={styles['items']}>
          {whyFennec.map((item, index) => (
            <li key={item.title}>
              <span className={styles['number']}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={styles['item-title']}>{item.title}</h3>
                <p className={styles['item-text']}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles['media']}>
          <div className={styles['media-main']}>
            <Image
              alt="Completed walk-in shower with slate tile and glass enclosure"
              className={styles['image']}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              src={galleryImage}
            />
          </div>
          <div className={styles['media-side']}>
            <Image
              alt="Finished steel-slat pergola built over an outdoor seating area"
              className={styles['image']}
              fill
              sizes="(max-width: 1024px) 50vw, 20vw"
              src={detailImage}
            />
          </div>
          <p className={styles['caption']}>Real projects from the Fennec Restoration archives — Phoenix Valley, AZ</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyFennec;
