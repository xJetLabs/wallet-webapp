import { FC } from "react";
import { FiltersProps } from "./Filters.types";
import cx from "classnames";
import styles from "./Filters.module.css";
import { Button } from "../Button";

export const Filters: FC<FiltersProps> = ({ 
  setItem, 
  selectedItem,
  menuItems,
  className = "",
}) => {
  return (
    <>
      <div 
        className={cx(styles.__wrapper, {
          [className]: className,
        })}
      >
        {menuItems.map((value, id) => {
          return (
            <Button
              onClick={() => setItem(value)}
              color={selectedItem == value ? "var(--tg-theme-text-color)" : "var(--accent)" }
              mode={selectedItem == value ? "primary" : "secondary_disabled"}
            >
              {value}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default Filters;