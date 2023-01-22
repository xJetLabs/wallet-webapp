import { FC } from "react";
import cx from "classnames";

import { InputProps } from "./Input.types";

import styles from "./Input.module.css";

export const Input: FC<InputProps> = ({
  disabled,
  defaultValue,
  value,
  after,
  indicator,
  readonly,
  placeholder,
  type = "text",
  className = "",
  onChange = () => {},
}) => {
  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__disabled]: disabled,
        [className]: className,
      })}
    >
      <div className={styles.__wrapper_in}>
        <input
          className={styles.__content}
          onChange={onChange}
          readOnly={readonly}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          spellCheck={false}
          type={type}
        />
        {indicator ? (
          <div className={styles.__indicator}>{indicator}</div>
        ) : null}
        {after ? <div className={styles.__after}>{after}</div> : null}
      </div>
    </div>
  );
};
