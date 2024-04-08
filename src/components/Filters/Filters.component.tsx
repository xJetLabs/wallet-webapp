import { FC } from "react";
import { FiltersProps } from "./Filters.types";
import cx from "classnames";
import styles from "./Filters.module.css";
import { Button } from "../Button";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
        <Swiper spaceBetween={10} slidesPerView={"auto"}>
          {menuItems.map((value, id) => {
            return (
              <SwiperSlide>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Filters;
