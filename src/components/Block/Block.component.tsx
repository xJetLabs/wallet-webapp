import { FC } from "react";
import cx from "classnames";

import { BlockProps } from "./Block.types";

import styles from "./Block.module.css";

export const Block: FC<BlockProps> = ({
  children,
  style = {},
  padding = 24,
  className = "",
  noBackground = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__with_background]: !noBackground,
        [className]: className,
      })}
      style={{ padding, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
