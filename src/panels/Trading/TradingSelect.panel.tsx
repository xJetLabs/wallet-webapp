import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Cell, Group, Panel, Text, Filters, Separator } from "../../components";
import { useSelector } from "react-redux";
import { exhangesPair, allCurrenciesSelector } from "../../store/reducers/user/user.selectors";
import { useExchangePairContext } from "../../providers/ExchangePairContextProvider";
import { ROUTE_NAMES } from "../../router/constants";
import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Trading.module.css";

import * as amplitude from "@amplitude/analytics-browser";

export function TradingSelectPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const exchangesPair = useSelector(exhangesPair);

  const { updateSelectedExchangePair } = useExchangePairContext();

  const allJetTokens = useSelector(allCurrenciesSelector);

  function changeExchagePair(exchangePair: any) {
    try {
      window.navigator.vibrate(70); // Вибрация
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    } finally {
      amplitude.track("SwapList.PairSelected", {
        pair: exchangePair.assets[0] + "_" + exchangePair.assets[1],
      });
      updateSelectedExchangePair(exchangePair);
      navigate(
        ROUTE_NAMES.SWAP +
          "?pair=" +
          exchangePair.assets[0].toLowerCase() +
          "_" +
          exchangePair.assets[1].toLowerCase()
      );
    }
  }

  useEffect(() => {
    if ((window as any).Telegram.WebApp.MainButton.isVisible) {
      (window as any).Telegram.WebApp.MainButton.hide();
    }
  }, []);

  useEffect(() => {
    amplitude.track("SwapList.Launched");
    if ((window as any).Telegram.WebApp.initDataUnsafe.start_param != null) {
      const args = (window as any).Telegram.WebApp.initDataUnsafe.start_param.split("_");
      navigate(
        ROUTE_NAMES.SWAP +
          "?pair=" +
          args[0] +
          "_" +
          args[1]
      );
      (window as any).Telegram.WebApp.initDataUnsafe.start_param = null;
    }
  }, [navigate]);

  const [item, setItem] = useState("All");

  function showPairs() {
    if (item == "All") {
      return exchangesPair;
    } else if (item == "Verified") {
      return exchangesPair
        .filter((item: any) => { 
          return (allJetTokens
            .filter((item: any) => { 
              return item.verified 
            }).map((item: any) => { 
              return item.name.toLowerCase() 
            }) as [string])
          .includes(item.assets[0] as string) 
        });
    }
  }

  function pushFilter(item: string) {
    if (item == "All") {
      amplitude.track("SwapList.FilterAll");
    } else if (item == "Verified") {
      amplitude.track("SwapList.FilterVerified");
    }
    setItem(item);
  }

  return (
    <Panel>
      <Group space={12}>
        <Filters
          setItem={pushFilter}
          selectedItem={item}
          menuItems={["All", "Verified"]}
        />
        {showPairs().map((item: any, index: number) => {
          if (item.active) {
            return (
              // <Block
              //   key={index}
              //   style={{ cursor: "pointer" }}
              //   padding={12}
              //   onClick={() => {
              //     changeExchagePair(item);
              //   }}
              // >
                <div style={{
                  cursor: "pointer",
                  padding: "8px 0px 0px",
                }}>
                  <Cell
                    before={
                      <Text
                        weight="600"
                        size={16}
                        lineHeight={"17px"}
                        style={{ textTransform: "uppercase" }}
                      >
                        <span style={{ color: "var(--tg-theme-text-color)" }}>
                          {t(item.assets[0])}
                        </span>
                        <span style={{ color: "var(--tg-theme-button-color)" }}>
                          /{t(item.assets[1])}
                        </span>
                      </Text>
                    }
                    after={
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          gap: "2px",
                        }}
                      >
                        <Text
                          weight="500"
                          size={14}
                          lineHeight={"17px"}
                          color="var(--color_primary_color)"
                        >
                          {item.trading_data.avg_price.toFixed(5) }
                        </Text>
                        {/* <Text
                          weight="400"
                          size={12}
                          lineHeight={"17px"}
                          color="#29B77F"
                        >
                          +
                          {Number(item.trading_data.change_24h).toFixed(2) + " %"}
                        </Text> */}
                      </div>
                    }
                  />
                  <div style={{ height: "10px" }}></div>
                  <Separator className={cx(styles.__separator)}/>
                </div>
              // </Block>
            );
          }
          return <></>;
        })}
      </Group>
    </Panel>
  );
}
