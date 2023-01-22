import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiInit, setApiConfig } from "../../api";

import { Panel } from "../../components";

import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import styles from "./Load.module.css";

export const LoadPanel: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestTokenData = async () => {
      const response = await apiInit({
        payload: {
          init_data: (window as any).Telegram.WebApp.initData,
        },
      });

      if (response instanceof Error && response.message === "busy") {
        return;
      }

      console.log("response", response);

      if (response && response.data) {
        await setApiConfig({
          newConfigValue: response.data,
        });

        navigate("/home", {
          replace: true,
        });
      }
    };

    console.log("test");

    requestTokenData();
  }, [navigate]);

  return (
    <Panel centerVertical centerHorizontal>
      <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
    </Panel>
  );
};
