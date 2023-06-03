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

            navigate(-3);
          }}
        >
          {t("Back")}
        </Button>
      </Group>
    </Panel>
  );
};
