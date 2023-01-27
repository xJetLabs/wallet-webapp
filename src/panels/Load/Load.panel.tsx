import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  apiInit,
  getAllCurrencies,
  getHistory,
  getMyBalance,
  getMyServerData,
  initMainnet,
  mainnetInited,
  setApiConfig,
} from "../../api";

import { userActions } from "../../store/reducers";

import { Panel } from "../../components";

import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import styles from "./Load.module.css";
import { ROUTE_NAMES } from "../../router/constants";

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

      if (response && response.data) {
        await setApiConfig({
          newConfigValue: response.data,
        });
      }
    };

    const requestAllCurrencies = async () => {
      const response = await getAllCurrencies();

      if (response instanceof Error && response.message === "busy") {
        return;
      }

      if (response && response.data) {
        dispatch(userActions.setAllCurrencies(response.data?.currencies));
      }
    };

    const requestMyServerData = async () => {
      const response = await getMyServerData();

      dispatch(userActions.setServerData(response.data));
    };

    const requestMyBalance = async () => {
      const response = await getMyBalance();

      dispatch(userActions.setBalances(response.data?.balances));

      navigate(ROUTE_NAMES.HOME, {
        replace: true,
      });
    };

    if (mainnetInited) {
      return;
    }

    initMainnet().then(() => {
      requestAllCurrencies();
      requestTokenData().then(() => {
        Promise.all([requestMyServerData(), requestMyBalance()]);
      });
    });
  }, [navigate, dispatch]);

  return (
    <Panel centerVertical centerHorizontal>
      <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
    </Panel>
  );
};
