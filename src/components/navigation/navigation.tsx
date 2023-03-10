import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import { useRouter } from 'next/router';

const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles['container']}>
      <div>
        <Link href='/home'>Home</Link>
        {pathname === '/home' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/about'>about us</Link>
        {pathname === '/about' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/services'>services</Link>
        {pathname === '/services' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/work'>our work</Link>
        {pathname === '/work' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/contact'>contact</Link>
        {pathname === '/contact' && <div className={styles['active-bar']}></div>}
      </div>
    </div>
  );
};

export default Navigation;
