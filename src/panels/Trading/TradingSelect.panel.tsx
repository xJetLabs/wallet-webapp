import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Cell, Group, Panel, Text, Filters, Separator } from "../../components";
import { ReactComponent as Star } from "../../icons/Star24.svg";
import { ReactComponent as StarDisabled } from "../../icons/Star24Outline.svg";
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
  const allJetTokens = useSelector(allCurrenciesSelector);

  const { updateSelectedExchangePair } = useExchangePairContext();

  const [favoritePairs, setFavorite] = useState<Array<string[]>>();
  const [item, setItem] = useState<string>("Verified");

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
    const cloudStorage = (window as any).Telegram.WebApp.CloudStorage;
    cloudStorage.getItem("favoritePairs", (error: Error, response: string) => {
      if (response != null) {
        setFavorite(JSON.parse(response));
      }
    })
  }, []);

  useEffect(() => {
    const cloudStorage = (window as any).Telegram.WebApp.CloudStorage;
    cloudStorage.setItem(
      "favoritePairs", 
      JSON.stringify(favoritePairs), (error: Error, answer: string) => { }
    )
  }, [favoritePairs])

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
  }, []);

  function showVerified() {
    return exchangesPair
      .filter((item: any) => {
        const assets: string[] = item.assets;
        return (favoritePairs ?? [])
          .filter((item: string[]) => {
            return item[0] == assets[0] && item[1] == assets[1]
          }).length > 0
      })
  }

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
    } else if (item == "NEW") {    
      return exchangesPair
        .filter((item: any) => {
          const assets: string[] = item.assets;
          return [["web3", "ton"], ["lky", "ton"], ["fish", "ton"]]
            .filter((item: string[]) => {
              return item[0] == assets[0] && item[1] == assets[1]
            }).length > 0
        })
      } else if (item == "HOT🔥") {
        return exchangesPair
        .filter((item: any) => {
          const assets: string[] = item.assets;
          return [["scale", "ton"], ["bolt", "ton"]]
            .filter((item: string[]) => {
              return item[0] == assets[0] && item[1] == assets[1]
            }).length > 0
        })
      }
  }

  function pushFilter(item: string) {
    if (item == "All") {
      amplitude.track("SwapList.FilterAll");
    } else if (item == "Verified") {
      amplitude.track("SwapList.FilterVerified");
    } else if (item == "⭐️") {
      amplitude.track("SwapList.FilterFavorites");
    } else if (item == "NEW") {
      amplitude.track("SwapList.FilterNew");
    } else if (item == "HOT🔥") {
      amplitude.track("SwapList.FilterHot");
    }
    setItem(item);
  }

  return (
    <Panel>
      <Group space={12}>
        <Filters
          setItem={pushFilter}
          selectedItem={item}
          menuItems={["Verified", "All", "NEW"]}
        />
        {item == "Verified" ?
          <Text
            weight="600"
            size={18}
            style={{ 
              padding: "20px 0 0",
            }}
          >
            {t("Favorites")}
          </Text> : <></>
        }
        {item == "Verified" ? showVerified().map((item: any, index: number) => {
          if (item.active) {
            return (
              <div>
                <div style={{
                  display: "flex",
                  flexFlow: "row",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer"
                  }}
                >
                  {
                    (favoritePairs ?? [])
                      .filter((i: string[]) => {
                        return i[0] == item.assets[0] && i[1] == item.assets[1]
                      }).length > 0 ? <Star 
                        onClick={() => {
                          setFavorite((favoritePairs ?? [])
                            .filter((i: string[]) => {
                              return i[0] !== item.assets[0] || i[1] !== item.assets[1]
                            }
                          ))
                        }} /> : <StarDisabled 
                        onClick={() => {
                          setFavorite([...(favoritePairs ?? []), item.assets]);
                        }}
                    />
                  }
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      width: "100%",
                      cursor: "pointer"
                    
                    }}
                    onClick={() => {
                      changeExchagePair(item);
                    }}
                  >
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
                    <div style={{ 
                      maxWidth: "100%",
                      margin: "auto"
                    }}></div>
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
                </div>
                <div style={{ height: "10px" }}></div>
                <Separator className={cx(styles.__separator)}/>
              </div>
            );
          }
        }) : <></>}
        {item == "Verified" ?
          <Text
            weight="600"
            size={18}
            color={"var(--accent)"}
            style={{ 
              padding: "20px 0 0",
            }}
          >
            {t("Verified")}
          </Text> : <></>
        }
        {showPairs() ? showPairs().map((item: any, index: number) => {
          if (item.active) {
            return (
              <div>
                <div style={{
                  display: "flex",
                  flexFlow: "row",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer"
                  }}
                >
                  {
                    (favoritePairs ?? [])
                      .filter((i: string[]) => {
                        return i[0] == item.assets[0] && i[1] == item.assets[1]
                      }).length > 0 ? <Star 
                        onClick={() => {
                          setFavorite((favoritePairs ?? [])
                            .filter((i: string[]) => {
                              return i[0] !== item.assets[0] || i[1] !== item.assets[1]
                            }
                          ))
                        }} /> : <StarDisabled 
                        onClick={() => {
                          setFavorite([...(favoritePairs ?? []), item.assets]);
                        }}
                    />
                  }
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      width: "100%",
                      cursor: "pointer"
                    
                    }}
                    onClick={() => {
                      changeExchagePair(item);
                    }}
                  >
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
                    <div style={{ 
                      maxWidth: "100%",
                      margin: "auto"
                    }}></div>
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
                </div>
                <div style={{ height: "10px" }}></div>
                <Separator className={cx(styles.__separator)}/>
              </div>
            );
          }
          return <></>;
        }) : <></>}
      </Group>
    </Panel>
  );
}
