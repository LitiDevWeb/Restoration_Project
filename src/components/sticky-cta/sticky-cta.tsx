import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

import { site } from '@webapp/data/site';
import { onDialClick } from '@webapp/helpers/dial-fallback';
import styles from './sticky-cta.module.scss';

/** Mobile-only call and email bar that appears once the visitor scrolls past the hero. */
const StickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div aria-hidden="true" className={styles['spacer']} />
      <div className={classNames(styles['bar'], { [styles['visible']]: visible })}>
        <a className={classNames(styles['action'], styles['call'])} href={site.phoneHref} onClick={onDialClick(site.phoneHref)}>
          <FaPhoneAlt aria-hidden="true" size={13} />
          <span>Call for estimate</span>
        </a>
 <a className={classNames(styles['action'], styles['email'])} href={site.emailHref}>
 <FaEnvelope aria-hidden="true" size={13} />
 <span>{site.email}</span>
 </a>
      </div>
    </>
  );
};

export default StickyCta;
