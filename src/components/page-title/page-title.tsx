import React from 'react';
import styles from './page-title.module.scss';

interface PageTitleProps {
  children: React.ReactElement | React.ReactElement[];
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <>
      <div className={styles['divider']}></div>
      <p className={styles['text']}>{children}</p>
      <div className={styles['divider']}></div>
    </>
  );
};

export default PageTitle;
