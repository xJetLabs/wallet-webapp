import { ReactNode } from "react";

export interface AvatarProps {
  size?: number | string;
  fallbackName?: ReactNode;
  src?: string;
  className?: string;
  alt?: string;
  type?: "square" | "circle";
}
