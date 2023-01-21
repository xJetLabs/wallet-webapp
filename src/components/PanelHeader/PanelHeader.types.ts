import { ReactNode } from "react";

export interface PanelHeaderProps {
  children: ReactNode;
  after?: ReactNode;
  before?: ReactNode;
  className?: string;
}
