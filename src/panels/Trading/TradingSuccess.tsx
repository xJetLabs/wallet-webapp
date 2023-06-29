import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ActionText, Button, Group, Panel } from "../../components";

import { useTranslation } from "react-i18next";

export const TradingSuccessPanel: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      window.navigator.vibrate(200);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
  }, []);

  return (
    <Panel centerVertical>
      <Group space={24}>
        <ActionText
          top={""}
          middle={t("Order successfully created") as string}
          bottom={t("In a few minutes the funds will arrive on your balance") as string}
        />
        <Button
          size={"m"}
          mode={"secondary"}
          onClick={() => {
            try {
              window.navigator.vibrate(70);
            } catch (e) {
              (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(
                "light"
              );
            }

            navigate(-2);
          }}
        >
          {t("Back")}
        </Button>
      </Group>
    </Panel>
  );
};
