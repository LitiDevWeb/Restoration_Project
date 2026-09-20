import React from 'react';
import classNames from 'classnames';
import styles from './section-heading.module.scss';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
  className?: string;
}

const SectionHeading = ({ eyebrow, title, lede, align = 'left', tone = 'light', id, className }: SectionHeadingProps) => (
  <div
    className={classNames(styles['heading'], styles[align], styles[tone], className)}
  >
    {eyebrow && <p className={styles['eyebrow']}>{eyebrow}</p>}
    <h2 className={styles['title']} id={id}>
      {title}
    </h2>
    {lede && <p className={styles['lede']}>{lede}</p>}
  </div>
);

export default SectionHeading;
