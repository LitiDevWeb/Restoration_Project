import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './cta.module.scss';

export type CtaVariant = 'primary' | 'dark' | 'light' | 'outline' | 'outlineDark';
export type CtaSize = 'sm' | 'md' | 'lg';

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  block?: boolean;
  className?: string;
  /** When true the link opens in a new tab with a safe rel. */
  newTab?: boolean;
}

const isExternal = (href: string) => /^(https?:|tel:|mailto:|sms:)/.test(href);

const CtaLink = ({ href, children, variant = 'primary', size = 'md', block = false, className, newTab = false }: CtaLinkProps) => {
  const classes = classNames(
    styles['cta'],
    styles[variant],
    styles[size],
    { [styles['block']]: block },
    className
  );

  if (isExternal(href)) {
    return (
      <a className={classes} href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
};

export default CtaLink;
