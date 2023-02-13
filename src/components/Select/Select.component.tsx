import { FC, useEffect, useRef, useState } from "react";
import cx from "classnames";

import { Text } from "../Text";

import { SelectProps } from "./Select.types";

import { ReactComponent as ArrowDown15OutlineIcon } from "../../icons/ArrowDown15Outline.svg";

import styles from "./Select.module.css";

export const Select: FC<SelectProps> = ({
  disabled,
  value = "",
  className = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__disabled]: disabled,
        [className]: className,
      })}
    >
      <div className={styles.__wrapepr_in}>
        <div className={styles.__content} onClick={onClick}>
          <Text
            className={styles.__content_in}
            weight="600"
            size={14}
            lineHeight={"17px"}
          >
            {value}
          </Text>
          {!disabled ? (
            <div className={styles.__content_icon}>
              <ArrowDown15OutlineIcon color="var(--accent)" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
