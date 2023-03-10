import React from 'react';
import styles from './container.module.scss';

import classNames from 'classnames';

interface ContainerProps {
  page: string;
  children: React.ReactElement[] | React.ReactElement;
}

const Container = ({ page, children }: ContainerProps) => {
  return <div className={classNames(styles['container'], styles[`image-${page}`])}>{children}</div>;
};

export default Container;
