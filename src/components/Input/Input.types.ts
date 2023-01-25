import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";

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
}
