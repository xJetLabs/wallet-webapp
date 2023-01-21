import { FC } from "react";
import cx from "classnames";

import { GroupProps } from "./Group.types";

import styles from "./Group.module.css";

export const Group: FC<GroupProps> = ({
  space = 0,
  children,
  className = "",
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [className]: className,
      })}
      style={{ gap: space }}
    >
      {children}
    </div>
  );
};
