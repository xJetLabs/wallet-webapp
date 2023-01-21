import { FC } from "react";
import cx from "classnames";

import { PanelProps } from "./Panel.types";

import styles from "./Panel.module.css";

export const Panel: FC<PanelProps> = ({
  children,
  header,
  className = "",
  centerVertical = false,
  centerHorizontal = false,
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__with_header]: header,
        [styles.__center]: centerVertical || centerHorizontal,
        [styles.__center_vertical]: centerVertical,
        [styles.__center_horizontal]: centerHorizontal,
        [className]: className,
      })}
    >
      {header ? header : null}
      <div className={styles.__wrapper_in}>{children}</div>
    </div>
  );
};
