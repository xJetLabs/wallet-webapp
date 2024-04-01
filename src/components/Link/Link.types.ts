import { HTMLAttributeAnchorTarget, ReactNode } from "react";

export interface LinkProps {
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  children?: ReactNode;
  href?: string;
  withCursor?: boolean;
  onClick?: () => void;
}
