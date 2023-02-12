import React from "react";
import cx from "classnames";

import { Text } from "../Text";

import { BlockHeaderProps } from "./BlockHeader.types";

import styles from "./BlockHeader.module.css";

export const BlockHeader: React.FC<BlockHeaderProps> = ({
  children,
  after,
  className = "",
}) => {
  return (
    <div
      className={cx(styles._wrapper, {
        [className]: className,
      })}
    >
      {children ? (
        <Text
          className={styles._content}
          size={14}
          lineHeight={"17px"}
          weight="600"
        >
          {children}
        </Text>
      ) : null}
      {after ? (
        <Text
          className={styles._after}
          size={14}
          lineHeight={"17px"}
          weight="600"
        >
          {after}
        </Text>
      ) : null}
    </div>
  );
};
