import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  apiInit,
  getAllCurrencies,
  getExchangesPair,
  getMyBalance,
  getMyServerData,
  initMainnet,
  mainnetInited,
  setApiConfig,
} from "../../api";

import { userActions } from "../../store/reducers";

import { ROUTE_NAMES } from "../../router/constants";

import { Panel } from "../../components";

import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import styles from "./Load.module.css";

export const LoadPanel: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

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

      const langCode = response.data.lang_code;
      i18n.changeLanguage(langCode);

      dispatch(userActions.setServerData(response.data));
    };

    const requestMyBalance = async () => {
      const response = await getMyBalance();

      dispatch(userActions.setBalances(response.data?.balances));

      navigate(ROUTE_NAMES.HOME, {
        replace: true,
      });
    };

    const requestExhangesPair = async () => {
      const response = await getExchangesPair();

      dispatch(userActions.setExchangesPair(response.pairs));
    };

    if (mainnetInited) {
      return;
    }

    initMainnet().then(() => {
      requestAllCurrencies();
      requestTokenData().then(() => {
        Promise.all([
          requestMyServerData(),
          requestExhangesPair(),
          requestMyBalance(),
        ]);
      });
    });
  }, [navigate, dispatch]);

  return (
    <Panel centerVertical centerHorizontal>
      <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
    </Panel>
  );
};
