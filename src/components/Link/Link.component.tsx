import { FC } from "react";
import cx from "classnames";

import { LinkProps } from "./Link.types";

import styles from "./Link.module.css";

export const Link: FC<LinkProps> = ({
  href,
  children,
  target = "_blank",
  className = "",
}) => {
  return (
    <a
      className={cx(styles.__wrapper, {
        [className]: className,
      })}
      href={href}
      target={target}
    >
      {children}
    </a>
  );
};
