import {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

export interface InputProps {
  value?: string;
  defaultValue?: string;
  after?: ReactNode;
  indicator?: ReactNode;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  selectAll?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: CSSProperties;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
}
