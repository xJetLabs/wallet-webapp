import { FC } from "react";
import cx from "classnames";

import { BlockProps } from "./Block.types";

import styles from "./Block.module.css";

export const Block: FC<BlockProps> = ({
  children,
  padding = 24,
  className = "",
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [className]: className,
      })}
      style={{ padding }}
    >
      {children}
    </div>
  );
};
