import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ActionText, Group, Panel } from "../../components";

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

  useEffect(() => {
    if (!(window as any).Telegram.WebApp.MainButton.isVisible) {
      (window as any).Telegram.WebApp.MainButton.show();
    }
    (window as any)
      .Telegram
      .WebApp
      .MainButton
      .setText(t("Back"))
      .onClick(buttonAction)
      .color = (window as any).Telegram.WebApp.themeParams.button_color;
    
    return () => {
      (window as any)
        .Telegram
        .WebApp
        .MainButton
        .offClick(buttonAction);
    }
  });

  function buttonAction() {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(
        "light"
      );
    }

    navigate(-2);
  }

  return (
    <Panel centerVertical>
      <Group space={24}>
        <ActionText
          top={""}
          middle={t("Order successfully created") as string}
          bottom={t("In a few minutes the funds will arrive on your balance") as string}
        />
      </Group>
    </Panel>
  );
};
