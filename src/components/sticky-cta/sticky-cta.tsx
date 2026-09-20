import { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { FaClipboardList, FaPhoneAlt } from 'react-icons/fa';

import { site } from '@webapp/data/site';
import styles from './sticky-cta.module.scss';

/** Mobile-only call / estimate bar that appears once the visitor scrolls past the hero. */
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
        <a className={classNames(styles['action'], styles['call'])} href={site.phoneHref}>
          <FaPhoneAlt aria-hidden="true" size={13} />
          <span>Call {site.phoneDisplay}</span>
        </a>
        <Link className={classNames(styles['action'], styles['estimate'])} href="/estimate">
          <FaClipboardList aria-hidden="true" size={13} />
          <span>Free estimate</span>
        </Link>
      </div>
    </>
  );
};

export default StickyCta;
