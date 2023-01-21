import { FC } from "react";

import { Text } from "../Text";

import { AppTitleProps } from "./AppTitle.types";

import { ReactComponent as Arrow15OutlineIcon } from "../../icons/Arrow15Outline.svg";

import styles from "./AppTitle.module.css";

export const AppTitle: FC<AppTitleProps> = ({ screenName }) => {
  return (
    <div className={styles.__wrapper}>
      <Text weight={"600"} size={14} lineHeight={"17px"}>
        xJet
      </Text>
      <Arrow15OutlineIcon color={"var(--accent)"} />
      <Text weight={"600"} size={14} lineHeight={"17px"}>
        {screenName}
      </Text>
    </div>
  );
};
