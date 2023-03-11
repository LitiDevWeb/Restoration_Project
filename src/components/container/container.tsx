import React from 'react';
import styles from './container.module.scss';

import classNames from 'classnames';

interface ContainerProps {
  page: string;
  children: React.ReactElement[] | React.ReactElement;
  calculatedHeight?: boolean;
}

const Container = ({ page, children, calculatedHeight = false }: ContainerProps) => {
  return <div className={classNames(styles['container'], styles[`image-${page}`], { [styles['calculated-height']]: calculatedHeight })}>{children}</div>;
};

export default Container;
