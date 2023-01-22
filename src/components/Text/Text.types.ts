import { CSSProperties, ReactNode } from "react";

export interface TextProps {
  weight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800";
  size?: number;
  lineHeight?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
