import React from 'react';
import classNames from 'classnames';
import styles from './cta.module.scss';

import type { CtaSize, CtaVariant } from './cta-link';

interface CtaButtonProps {
  children: React.ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  block?: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const CtaButton = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
}: CtaButtonProps) => (
  <button
    className={classNames(styles['cta'], styles[variant], styles[size], { [styles['block']]: block }, className)}
    disabled={disabled || loading}
    onClick={onClick}
    type={type}
  >
    {loading && <span aria-hidden="true" className={styles['spinner']} />}
    {children}
  </button>
);

export default CtaButton;
