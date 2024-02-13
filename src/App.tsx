import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./i18next";
import { router } from "./router";
import { balanceCheckWatcher } from "./api";
import { SwapDataContextProvider } from "./providers/SwapDataContextProvider";
import { JetTokensContextProvider } from "./providers/JetTokensContextProvider";
import { ExchangePairContextProvider } from "./providers/ExchangePairContextProvider";

import * as amplitude from '@amplitude/analytics-browser';
import { Analytics } from '@vercel/analytics/react';

import {
  apiInit,
  getAllCurrencies,
  getExchangesPair,
  getMyBalance,
  getMyServerData,
  initMainnet,
  mainnetInited,
  setApiConfig,
} from "./api";

import { userActions } from "./store/reducers";

export function App() {
  const intervalIdRef = useRef<NodeJS.Timer | undefined>(undefined);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (
      window.location.pathname.includes("/receive?tonAddress=") ||
      window.location.pathname.includes("/history?apiKey=") ||
      (window.location.pathname.includes("/nft/") &&
        window.location.pathname.includes("?tonAddress="))
    ) {
      return;
    }

    if (
      window.location.pathname.includes("/receive") ||
      window.location.pathname.includes("/nft") ||
      window.location.pathname.includes("/swap") ||
      window.location.pathname.includes("/market") ||
	  window.location.pathname.includes("/history")
    ) {
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
        try {
          const response = await getMyServerData();

          const langCode = response.data.lang_code;
          i18n.changeLanguage(langCode);

          dispatch(userActions.setServerData(response.data));
        } catch (error: any) {
          if (error.response.data.error === "Unauthorized") {
            console.log("[xJetWallet] You are not authorized!");
          }
        }
      };

      const requestMyBalance = async () => {
        try {
          const response = await getMyBalance();

          dispatch(userActions.setBalances(response.data?.balances));
        } catch (e) {
          console.log("[xJetWallet | Balance] You are not authorized!");
        }
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

      return;
    }

    router.navigate("/", { replace: true });
  }, [dispatch, i18n]);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(async () => {
      await balanceCheckWatcher();
    }, 10000);

    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    console.log('Amplitude API Key:', process.env.AMPLITUDE_API_KEY);
    amplitude.init(process.env.AMPLITUDE_API_KEY as string);
    amplitude.track('App Opened');
  }, []);

  return (
    <ExchangePairContextProvider>
      <JetTokensContextProvider>
        <SwapDataContextProvider>
          <RouterProvider router={router} />
          <Analytics />
        </SwapDataContextProvider>
      </JetTokensContextProvider>
    </ExchangePairContextProvider>
  );
}
