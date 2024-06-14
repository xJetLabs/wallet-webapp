import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, Group, Input, Panel, Text } from "../../components";
import { ReactComponent as Error } from "../../icons/cross.svg";
import style from "./ErrorDeposit.module.css";

export const ErrorDeposit: FC = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Group space={24} className={style.error}>
        <Text weight="600" size={20} lineHeight={"17px"}>
          {t("Deposits are no longer available")}
        </Text>
        <Error className={style.img} />
      </Group>
    </Panel>
  );
};
