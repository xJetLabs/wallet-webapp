import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Group, Panel, Text, Filters, Separator } from "../../components";
import { ReactComponent as Star } from "../../icons/Star24.svg";
import { ReactComponent as StarDisabled } from "../../icons/Star24Outline.svg";
import { useSelector } from "react-redux";
import {
  exhangesPair,
  allCurrenciesSelector,
} from "../../store/reducers/user/user.selectors";
import { useExchangePairContext } from "../../providers/ExchangePairContextProvider";
import { ROUTE_NAMES } from "../../router/constants";
import { useEffect, useState } from "react";
import { IPair, IToken } from "./trading";
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

  function changeExchagePair(exchangePair: IPair) {
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
    });
  }, []);

  useEffect(() => {
    const cloudStorage = (window as any).Telegram.WebApp.CloudStorage;
    cloudStorage.setItem(
      "favoritePairs",
      JSON.stringify(favoritePairs),
      (error: Error, answer: string) => {}
    );
  }, [favoritePairs]);

  useEffect(() => {
    amplitude.track("SwapList.Launched");
    if ((window as any).Telegram.WebApp.initDataUnsafe.start_param != null) {
      const args = (
        window as any
      ).Telegram.WebApp.initDataUnsafe.start_param.split("_");
      navigate(ROUTE_NAMES.SWAP + "?pair=" + args[0] + "_" + args[1]);
      (window as any).Telegram.WebApp.initDataUnsafe.start_param = null;
    }
  }, []);

  function showVerified() {
    return exchangesPair.filter((pair: IPair) => {
      const assets: string[] = pair.assets;
      return (
        (favoritePairs ?? []).filter((item: string[]) => {
          return item[0] === assets[0] && item[1] === assets[1];
        }).length > 0
      );
    });
  }

  function showPairs(item: string) {
    switch (item) {
      case "All":
        return exchangesPair;
      case "Verified":
        return exchangesPair.filter((pair: IPair) => {
          return allJetTokens.some(
            (token: IToken) =>
              token.verified && token.name.toLowerCase() === pair.assets[0]
          );
        });
      case "NEW":
        return filterPairsByAssets([
          ["web3", "ton"],
          ["lky", "ton"],
          ["fish", "ton"],
        ]);
      case "HOT🔥":
        return filterPairsByAssets([
          ["scale", "ton"],
          ["bolt", "ton"],
        ]);
      default:
        return [];
    }
  }

  function filterPairsByAssets(assetPairs: string[][]) {
    return exchangesPair.filter((pair: IPair) => {
      const assets = pair.assets;
      return assetPairs.some((assetPair) => {
        return assetPair[0] === assets[0] && assetPair[1] === assets[1];
      });
    });
  }

  function pushFilter(item: string): void {
    const filterMappings: { [key: string]: string } = {
      All: "SwapList.FilterAll",
      Verified: "SwapList.FilterVerified",
      "⭐️": "SwapList.FilterFavorites",
      NEW: "SwapList.FilterNew",
      "HOT🔥": "SwapList.FilterHot",
    };

    const trackingEvent: string | undefined = filterMappings[item];
    if (trackingEvent) {
      amplitude.track(trackingEvent);
    }

    setItem(item);
  }

  function formatAvgPrice(avgPrice: number) {
    const formattedPrice = avgPrice.toLocaleString();
    return avgPrice === 0
      ? removeTrailingZeros(avgPrice.toFixed(7))
      : formattedPrice;
  }

  function removeTrailingZeros(num: string) {
    const number = parseFloat(num);

    return number * 1;
  }

  return (
    <Panel>
      <Group space={12}>
        <Filters
          setItem={pushFilter}
          selectedItem={item}
          menuItems={["Verified", "All", "NEW"]}
        />
        {item === "Verified" ? (
          <Text
            weight="600"
            size={18}
            style={{
              padding: "20px 0 0",
            }}
          >
            {t("Favorites")}
          </Text>
        ) : (
          <></>
        )}
        {item === "Verified" ? (
          showVerified().map((pair: IPair, index: number) => {
            if (pair.active) {
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {(favoritePairs ?? []).filter((i: string[]) => {
                      return i[0] === pair.assets[0] && i[1] === pair.assets[1];
                    }).length > 0 ? (
                      <Star
                        onClick={() => {
                          amplitude.track("SwapList.FavoriteRemoved", {
                            pair: pair.assets[0] + "_" + pair.assets[1],
                          });
                          setFavorite(
                            (favoritePairs ?? []).filter((i: string[]) => {
                              return (
                                i[0] !== pair.assets[0] ||
                                i[1] !== pair.assets[1]
                              );
                            })
                          );
                        }}
                      />
                    ) : (
                      <StarDisabled
                        onClick={() => {
                          amplitude.track("SwapList.FavoriteAdded", {
                            pair: pair.assets[0] + "_" + pair.assets[1],
                          });
                          setFavorite([...(favoritePairs ?? []), pair.assets]);
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        changeExchagePair(pair);
                      }}
                    >
                      <Text
                        weight="600"
                        size={16}
                        lineHeight={"17px"}
                        style={{ textTransform: "uppercase" }}
                      >
                        <span style={{ color: "var(--tg-theme-text-color)" }}>
                          {t(pair.assets[0])}
                        </span>
                        <span style={{ color: "var(--tg-theme-button-color)" }}>
                          /{t(pair.assets[1])}
                        </span>
                      </Text>
                      <div
                        style={{
                          maxWidth: "100%",
                          margin: "auto",
                        }}
                      ></div>
                      <Text
                        weight="500"
                        size={14}
                        lineHeight={"17px"}
                        color="var(--color_primary_color)"
                      >
                        {formatAvgPrice(pair.trading_data.avg_price)}
                      </Text>
                    </div>
                  </div>
                  <div style={{ height: "10px" }}></div>
                  <Separator className={cx(styles.__separator)} />
                </div>
              );
            }
          })
        ) : (
          <></>
        )}
        {item === "Verified" ? (
          <Text
            weight="600"
            size={18}
            color={"var(--accent)"}
            style={{
              padding: "20px 0 0",
            }}
          >
            {t("Verified")}
          </Text>
        ) : (
          <></>
        )}
        {showPairs(item) ? (
          showPairs(item).map((pair: IPair, index: number) => {
            if (pair.active) {
              return (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {(favoritePairs ?? []).filter((i: string[]) => {
                      return i[0] === pair.assets[0] && i[1] === pair.assets[1];
                    }).length > 0 ? (
                      <Star
                        onClick={() => {
                          setFavorite(
                            (favoritePairs ?? []).filter((i: string[]) => {
                              return (
                                i[0] !== pair.assets[0] ||
                                i[1] !== pair.assets[1]
                              );
                            })
                          );
                        }}
                      />
                    ) : (
                      <StarDisabled
                        onClick={() => {
                          setFavorite([...(favoritePairs ?? []), pair.assets]);
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        changeExchagePair(pair);
                      }}
                    >
                      <Text
                        weight="600"
                        size={16}
                        lineHeight={"17px"}
                        style={{ textTransform: "uppercase" }}
                      >
                        <span style={{ color: "var(--tg-theme-text-color)" }}>
                          {t(pair.assets[0])}
                        </span>
                        <span style={{ color: "var(--tg-theme-button-color)" }}>
                          /{t(pair.assets[1])}
                        </span>
                      </Text>
                      <div
                        style={{
                          maxWidth: "100%",
                          margin: "auto",
                        }}
                      ></div>
                      <Text
                        weight="500"
                        size={14}
                        lineHeight={"17px"}
                        color="var(--color_primary_color)"
                      >
                        {formatAvgPrice(pair.trading_data.avg_price)}
                      </Text>
                    </div>
                  </div>
                  <div style={{ height: "10px" }}></div>
                  <Separator className={cx(styles.__separator)} />
                </div>
              );
            }
            return <></>;
          })
        ) : (
          <></>
        )}
      </Group>
    </Panel>
  );
}
