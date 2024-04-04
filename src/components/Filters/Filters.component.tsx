import { FC } from "react";
import { FiltersProps } from "./Filters.types";
import cx from "classnames";
import styles from "./Filters.module.css";
import { Button } from "../Button";
import { useTranslation } from "react-i18next";

export const Filters: FC<FiltersProps> = ({
  setItem,
  selectedItem,
  menuItems,
  className = "",
}) => {
  const { t } = useTranslation();

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
                  key={id}
                  onClick={() => setItem(value)}
                  size="filter"
                  color={
                    selectedItem === value
                      ? "var(--tg-theme-text-color)"
                      : "var(--accent)"
                  }
                  mode={
                    selectedItem === value ? "primary" : "secondary_disabled"
                  }
                >
                  {t(value)}
                </Button>
            );
          })}
      </div>
    </>
  );
};

export default Filters;
