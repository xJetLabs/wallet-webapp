import React from "react";
import cx from "classnames";

import { SeparatorProps } from "./Separator.types";

import styles from "./Separator.module.css";

export const Separator: React.FC<SeparatorProps> = ({ className = "" }) => {
  return (
    <div
      className={cx(styles._wrapper, {
        [className]: className,
      })}
    />
  );
};
