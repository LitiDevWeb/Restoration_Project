import type { ReactNode } from 'react';

import SiteFooter from '@webapp/components/site-footer/site-footer';
import SiteHeader from '@webapp/components/site-header/site-header';
import StickyCta from '@webapp/components/sticky-cta/sticky-cta';
import styles from './layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

/** Shared chrome: skip link, sticky header, main landmark, footer and mobile action bar. */
const Layout = ({ children }: LayoutProps) => (
  <>
    <a className={styles['skip-link']} href="#main">
      Skip to main content
    </a>
    <SiteHeader />
    <main className={styles['main']} id="main">
      {children}
    </main>
    <SiteFooter />
    <StickyCta />
  </>
);

export default Layout;
