import { FC } from "react";

import cx from "classnames";

import { TextProps } from "./Text.types";

export const Text: FC<TextProps> = ({
  weight = "",
  size,
  lineHeight,
  children,
  className = "",
  color = "",
}) => {
  return (
    <span
      className={cx({ [className]: className })}
      style={{ fontWeight: weight, fontSize: size, lineHeight, color }}
    >
      {children}
    </span>
  );
};
