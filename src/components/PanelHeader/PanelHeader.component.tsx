import { FC } from "react";
import cx from "classnames";

import { PanelHeaderProps } from "./PanelHeader.types";

import styles from "./PanelHeader.module.css";

export const PanelHeader: FC<PanelHeaderProps> = ({
  children,
  after,
  before,
  className = "",
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [className]: className,
      })}
    >
      <div className={styles.__wrapper_in}>
        {before ? <div className={styles.__before}>{before}</div> : null}
        <div className={styles.__content}>{children}</div>
        {after ? <div className={styles.__after}>{after}</div> : null}
      </div>
    </div>
  );
};
