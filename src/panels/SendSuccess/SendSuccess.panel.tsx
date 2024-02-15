import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ActionText, Button, Group, Panel } from "../../components";
import { useTranslation } from "react-i18next";

import { formatNumber, formatToken } from "../../utils";

export const SendSuccessPanel: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { state } = useLocation();

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

    navigate(-3);
  }

  return (
    <Panel centerVertical>
      <Group space={24}>
        <ActionText
          top={`Successfully ${state?.type || "sent"}`}
          middle={`${formatNumber(
            state?.amount || 0
          )} ${state?.currency?.toUpperCase()}`}
          bottom={formatToken(state?.ton_address || "")}
        />
      </Group>
    </Panel>
  );
};
