import React from 'react';
import styles from './container.module.scss';

import classNames from 'classnames';

interface ContainerProps {
  home: string;
  children: React.ReactElement[] | React.ReactElement;
}

const Container = ({ home, children }: ContainerProps) => {
  return <div className={classNames(styles['container'], styles[`image-${home}`])}>{children}</div>;
};

export default Container;
