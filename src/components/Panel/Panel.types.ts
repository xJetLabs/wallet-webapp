import { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  header?: any;
  className?: string;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
}
