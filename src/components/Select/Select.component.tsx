import { FC, useEffect, useRef, useState } from "react";
import cx from "classnames";

import { Text } from "../Text";

import { SelectProps } from "./Select.types";

import { ReactComponent as ArrowDown15OutlineIcon } from "../../icons/ArrowDown15Outline.svg";

import styles from "./Select.module.css";

export const Select: FC<SelectProps> = ({
  disabled,
  defaultValue = {
    id: 0,
    title: "",
    listKey: "",
  },
  options = [],
  className = "",
  onChange = () => {},
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isListOptionShowed, setIsListOptionShowed] = useState(false);

  const optionListRef = useRef(null);

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption, onChange]);

  const toggleOptionList = () => {
    setIsListOptionShowed((prev) => !prev);
  };

  return (
    <div
      className={cx(styles.__wrapper, {
        [styles.__disabled]: disabled,
        [className]: className,
      })}
    >
      <div className={styles.__wrapepr_in}>
        <div className={styles.__content} onClick={toggleOptionList}>
          <Text
            className={styles.__content_in}
            weight="600"
            size={14}
            lineHeight={"17px"}
          >
            {selectedOption.title}
          </Text>
          <div className={styles.__content_icon}>
            <ArrowDown15OutlineIcon color="var(--accent)" />
          </div>
        </div>
        {isListOptionShowed ? (
          <div className={styles.__list_popout} ref={optionListRef}>
            {options
              .filter((v) => v.listKey !== selectedOption.listKey)
              .map((v) => {
                return (
                  <div
                    className={styles.__list_option}
                    key={v.id}
                    onClick={() => {
                      setSelectedOption(v);
                      setIsListOptionShowed(false);
                    }}
                  >
                    <Text weight="600" size={14} lineHeight={"17px"}>
                      {v.title}
                    </Text>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
