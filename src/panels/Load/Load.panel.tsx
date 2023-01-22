import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiInit, getAllCurrencies, setApiConfig } from "../../api";

import { Panel } from "../../components";

import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import styles from "./Load.module.css";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers";

export const LoadPanel: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    const requestAllCurrencies = async () => {
      const response = await getAllCurrencies();

      if (response instanceof Error && response.message === "busy") {
        return;
      }

      console.log("response.data|||||response.data", response.data);

      if (response && response.data) {
        dispatch(userActions.setAllCurrencies(response.data?.currencies));
      }
    };

    console.log("test");

    requestAllCurrencies();
    requestTokenData();
  }, [navigate, dispatch]);

  return (
    <Panel centerVertical centerHorizontal>
      <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
    </Panel>
  );
};
