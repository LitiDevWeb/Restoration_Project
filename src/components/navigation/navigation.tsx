import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface NavigationProps {
  absolute?: boolean;
}

const Navigation = ({ absolute = false }: NavigationProps) => {
  const { pathname } = useRouter();

  return (
    <div className={classNames(styles['container'], { [styles['absolute']]: absolute })}>
      <div>
        <Link href='/home'>Home</Link>
        {pathname === '/home' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/about'>about</Link>
        {pathname === '/about' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/services'>services</Link>
        {pathname === '/services' && <div className={styles['active-bar']}></div>}
      </div>
      <div>
        <Link href='/work'>work</Link>
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
