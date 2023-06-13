import { MouseEvent, ReactNode } from "react";

export interface GroupProps {
  space?: number;
  className?: string;
  children: ReactNode;
  onClick?(event: MouseEvent<HTMLDivElement>): any;
}
