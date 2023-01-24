import { FC } from "react";

import { ErrorBlockProps } from "./ErrorBlock.types";

import { ReactComponent as Security24OutlineIcon } from "../../icons/Security24Outline.svg";

import styles from "./ErrorBlock.module.css";
import { Block } from "../Block";
import { Cell } from "../Cell";

export const ErrorBlock: FC<ErrorBlockProps> = ({
  color,
  iconColor,
  backgroundColor,
  text = "",
}) => {
  return (
    <Block
      padding={18}
      className={styles.__wrapper}
      style={{
        ...(color ? { border: `2px solid ${color}` } : {}),
        ...(backgroundColor ? { background: backgroundColor } : {}),
      }}
    >
      <Cell
        before={
          <Security24OutlineIcon
            color={iconColor ? iconColor : "var(--color_error)"}
          />
        }
      >
        {text}
      </Cell>
    </Block>
  );
};
