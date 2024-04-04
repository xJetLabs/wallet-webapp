import { FC } from "react";
import cx from "classnames";

import { LinkProps } from "./Link.types";

import styles from "./Link.module.css";

export const Link: FC<LinkProps> = ({
  href,
  children,
  withCursor = false,
  target = "_blank",
  className = "",
  onClick = () => {},
}) => {
  if (!href) {
    return <>{children}</>;
  }

  return (
    <a
      className={cx(styles.__wrapper, {
        [styles.__with_cursor]: withCursor,
        [className]: className,
      })}
      href={href}
      target={target}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
