import { ReactNode } from "react";

export interface BlockProps {
  className?: string;
  padding?: number | string;
  children?: ReactNode;
  noBackground?: boolean;
  onClick?: () => void;
}
