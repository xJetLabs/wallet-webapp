interface selectOption {
  id: number;
  title: string;
  listKey: string | number;
}

export interface SelectProps {
  defaultValue?: selectOption;
  className?: string;
  disabled?: boolean;
  options?: Array<selectOption>;
  onChange?: (newSelectedOption: selectOption) => void;
}
