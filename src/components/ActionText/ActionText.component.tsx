import { FC } from "react";
import cx from "classnames";

import { ActionTextProps } from "./ActionText.types";

import styles from "./ActionText.module.css";
import { Text } from "../Text";

export const ActionText: FC<ActionTextProps> = ({
  top,
  middle,
  bottom,
  withoutPadding,
  className = "",
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__with_padding]: !withoutPadding,
        [className]: className,
      })}
    >
      {top ? (
        <Text
          color={"var(--accent)"}
          size={14}
          lineHeight={"17px"}
          weight={"600"}
        >
          {top}
        </Text>
      ) : null}
      {middle ? (
        <Text size={36} lineHeight={"44px"} weight={"700"}>
          {middle}
        </Text>
      ) : null}
      {bottom ? (
        <Text
          color={"var(--accent)"}
          size={14}
          lineHeight={"17px"}
          weight={"600"}
        >
          {bottom}
        </Text>
      ) : null}
    </div>
  );
};
