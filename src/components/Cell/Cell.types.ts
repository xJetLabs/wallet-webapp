import { ReactNode } from "react";

export interface CellProps {
  before?: ReactNode;
  children?: string;
  description?: string;
  after?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  withCursor?: boolean;
}
