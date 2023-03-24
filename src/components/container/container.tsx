import React from "react";
import styles from "./container.module.scss";

import classNames from "classnames";

interface ContainerProps {
  page: string;
  children: React.ReactElement[] | React.ReactElement;
  calculatedHeight?: boolean;
  moreCalculatedHeight?: boolean;
}

const Container = ({ page, children, calculatedHeight = false, moreCalculatedHeight = false }: ContainerProps) => {
  return (
    <div
      className={classNames(styles["container"], styles[`image-${page}`], {
        [styles["calculated-height"]]: calculatedHeight,
        [styles["more-calculated-height"]]: moreCalculatedHeight,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
