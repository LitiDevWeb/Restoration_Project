import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { FaBars, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from 'react-icons/fa';

import CtaLink from '@webapp/components/cta/cta-link';
import { headerNavLinks, site } from '@webapp/data/site';
import styles from './site-header.module.scss';

const LOGO_SIZE = 46;

const isActive = (href: string, pathname: string) => {
  if (href === '/home') return pathname === '/home' || pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

const SiteHeader = () => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes the drawer, including browser back/forward.
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className={classNames(styles['header'], { [styles['scrolled']]: scrolled })}>
      <div className={styles['topbar']}>
        <div className={styles['topbar-inner']}>
          <span className={styles['topbar-item']}>
            <FaMapMarkerAlt aria-hidden="true" size={12} />
            {site.areaShort}
          </span>
          <span className={styles['topbar-item']}>
            ROC {site.roc} · Licensed, Bonded &amp; Insured
          </span>
        </div>
      </div>

      <div className={styles['bar']}>
        <div className={styles['bar-inner']}>
          <Link className={styles['brand']} href="/home">
            <Image alt={`${site.shortName} logo`} className={styles['logo']} height={LOGO_SIZE} priority src="/images/logo.png" width={LOGO_SIZE} />
            <span className={styles['brand-text']}>
              <strong>Fennec</strong>
              <small>{site.headerLine}</small>
            </span>
          </Link>

          <nav aria-label="Primary" className={styles['nav']}>
            {headerNavLinks.map((link) => (
              <Link
                aria-current={isActive(link.href, pathname) ? 'page' : undefined}
                className={classNames(styles['nav-link'], { [styles['active']]: isActive(link.href, pathname) })}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles['actions']}>
            <CtaLink className={styles['call']} href={site.phoneHref} size="sm">
              <FaPhoneAlt aria-hidden="true" size={12} />
              Call for estimate
            </CtaLink>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={styles['burger']}
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? <FaTimes aria-hidden="true" size={20} /> : <FaBars aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={classNames(styles['drawer'], { [styles['drawer-open']]: menuOpen })}
        id="mobile-navigation"
      >
        <nav aria-label="Mobile" className={styles['drawer-nav']}>
          {headerNavLinks.map((link) => (
            <Link
              aria-current={isActive(link.href, pathname) ? 'page' : undefined}
              className={classNames(styles['drawer-link'], { [styles['active']]: isActive(link.href, pathname) })}
              href={link.href}
              key={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles['drawer-actions']}>
          <CtaLink block href={site.phoneHref} size="md">
            <FaPhoneAlt aria-hidden="true" size={14} />
            Call for estimate
          </CtaLink>
          <a className={styles['drawer-contact']} href={site.emailHref}>
            <FaEnvelope aria-hidden="true" size={14} />
            {site.email}
          </a>
          <p className={styles['drawer-note']}>
            ROC {site.roc} · {site.areaShort}
          </p>
        </div>
      </div>

      {menuOpen && <button aria-label="Close menu" className={styles['backdrop']} onClick={closeMenu} type="button" />}
    </header>
  );
};

export default SiteHeader;
