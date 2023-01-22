import { ChangeEvent, FC, useEffect, useState } from "react";
import cx from "classnames";

import { SwitchProps } from "./Switch.types";

import styles from "./Switch.module.css";

export const Switch: FC<SwitchProps> = ({
  disabled,
  checked = false,
  className = "",
  onChange = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label
      className={cx(styles.__wrapper, {
        [styles.__disabled]: disabled,
        [className]: className,
      })}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setIsChecked(e.currentTarget.checked);
          onChange(e.currentTarget.checked);
        }}
        disabled={disabled}
        className={styles.__content}
      />
      <span className={styles.__slider} />
    </label>
  );
};
