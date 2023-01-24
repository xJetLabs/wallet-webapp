import { CSSProperties, ReactNode } from "react";

export interface BlockProps {
  className?: string;
  style?: CSSProperties;
  padding?: number | string;
  children?: ReactNode;
  noBackground?: boolean;
  onClick?: () => void;
}
