import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import cx from "classnames";
import { Navigate } from "react-router-dom";

import {
  Button,
  Cell,
  ErrorBlock,
  Input,
  Panel,
  Select,
  Text,
} from "../../components";
import { ReactComponent as SwitcherIcon } from "../../icons/Switcher.svg";
import { ReactComponent as InfoIcon } from "../../icons/Info.svg";
import { ReactComponent as MinusSmallIcon } from "../../icons/MinusSmall.svg";
import { ReactComponent as PlusSmallIcon } from "../../icons/PlusSmall.svg";
import { ROUTE_NAMES } from "../../router/constants";
import { useExchangePairContext } from "../../providers/ExchangePairContextProvider";
import { errorMapping, formatNumber } from "../../utils";
import {
  exhangesPair,
  totalBOLTValueSelector,
  totalEXCValueSelector,
  totalJUSDCValueSelector,
  totalJUSDTValueSelector,
  totalKISSValueSelector,
  totalLAVEValueSelector,
  totalTAKEValueSelector,
  totalTONValueSelector,
} from "../../store/reducers/user/user.selectors";
import styles from "./Trading.module.css";
import { createOrder, getExchangesEstimate } from "../../api";
import { useQuery } from "../../hooks/useQuery";

export function TradingPanel() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query: any = useQuery();

  const { selectedExchangePair, updateSelectedExchangePair } =
    useExchangePairContext();
  const localExchangesPair = useSelector(exhangesPair);

  const total: { [key: string]: number } = {
    ton: useSelector(totalTONValueSelector),
    exc: useSelector(totalEXCValueSelector),
    bolt: useSelector(totalBOLTValueSelector),
    lave: useSelector(totalLAVEValueSelector),
    take: useSelector(totalTAKEValueSelector),
    jusdc: useSelector(totalJUSDCValueSelector),
    jusdt: useSelector(totalJUSDTValueSelector),
    kiss: useSelector(totalKISSValueSelector),
  };

  const [activeSwitch, setActiveSwitch] = useState<"buy" | "sell">("buy");
  const [select, setSelect] = useState<"Market" | "Limit">("Market");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const [buy, setBuy] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [price, setPrice] = useState<number>();
  const [error, setError] = useState(null);

  function navigateToSelectExchangePair() {
    vibrate();

    navigate(ROUTE_NAMES.SWAP_SELECT, {
      state: { isPairParam: query.get("pair") !== null },
    });
  }

  function vibrate() {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  }

  async function handleSubmit() {
    vibrate();

    createOrder({
      type: activeSwitch,
      amount: buy,
      // price: price,
      pair:
        activeSwitch === "buy"
          ? [selectedExchangePair?.assets[0], selectedExchangePair?.assets[1]]
          : [selectedExchangePair?.assets[1], selectedExchangePair?.assets[0]],
      min_expected_amount: 0.001,
    }).then((res) => {
      if (res.error) {
        return setError(res.error);
      }

      if (res.success) {
        return navigate(ROUTE_NAMES.SWAP_SUCCESS);
      }
    });
  }

  useEffect(() => {
    if (query.get("pair") !== null) {
      localExchangesPair.forEach((item: any) => {
        if (
          item?.assets[0] === query.get("pair").split("_")[0] &&
          item?.assets[1] === query.get("pair").split("_")[1]
        ) {
          updateSelectedExchangePair(item);
        }
      });
    }

    if (Number(buy) === Number(0)) return;

    getExchangesEstimate({
      type: activeSwitch,
      amount: buy,
      pair:
        activeSwitch === "buy"
          ? [selectedExchangePair?.assets[0], selectedExchangePair?.assets[1]]
          : [selectedExchangePair?.assets[1], selectedExchangePair?.assets[0]],
    }).then((res) => setEstimate(Number(res.out)));
  }, [
    activeSwitch,
    selectedExchangePair,
    price,
    buy,
    navigate,
    query,
    localExchangesPair,
    updateSelectedExchangePair,
  ]);

  return (
    <>
      {/* {!selectedExchangePair.hasOwnProperty("assets") ? ( */}
      {query.get("pair") === null ? (
        <Navigate to={ROUTE_NAMES.SWAP_SELECT} />
      ) : (
        <Panel>
          <div className={styles.__header}>
            <SwitcherIcon
              color="var(--tg-theme-hint-color)"
              width={18}
              height={18}
            />

            <Cell
              before={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    style={{ marginRight: "8px", textTransform: "uppercase" }}
                    size={24}
                    weight="700"
                  >
                    {selectedExchangePair?.assets[0]}/
                    {selectedExchangePair?.assets[1]}
                  </Text>
                  <Text weight="500" size={14}>
                    {selectedExchangePair?.trading_data.avg_price.toFixed(5)}
                  </Text>
                </div>
              }
              // after={
              //   <Text weight="500" size={12} color="#29B77F">
              //     +
              //     {Number(
              //       selectedExchangePair?.trading_data.change_24h
              //     ).toFixed(2) + " %"}
              //   </Text>
              // }
              onClick={navigateToSelectExchangePair}
            />
          </div>

          <div className={styles.__switcher}>
            <button
              className={cx(styles.__switcher_button, {
                [styles.buy]: activeSwitch === "buy",
              })}
              onClick={() => {
                vibrate();
                setActiveSwitch("buy");
                setBuy(0);
                setEstimate(0);
              }}
              style={
                activeSwitch === "buy"
                  ? {
                      color: "var(--tg-theme-bg-color)",
                    }
                  : {}
              }
            >
              {t("Buy")}
            </button>

            <button
              className={cx(styles.__switcher_button, {
                [styles.sell]: activeSwitch === "sell",
              })}
              style={
                activeSwitch === "sell"
                  ? {
                      color: "var(--tg-theme-bg-color)",
                    }
                  : {}
              }
              onClick={() => {
                vibrate();
                setActiveSwitch("sell");
                setBuy(0);
                setEstimate(0);
              }}
            >
              {t("Sell")}
            </button>

            <div
              className={cx(styles.__active_switch, {
                [styles.buy]: activeSwitch === "buy",
                [styles.sell]: activeSwitch === "sell",
              })}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 12px",
              background: "var(--tg-theme-secondary-bg-color)",
              marginTop: "12px",
              borderRadius: "14px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <InfoIcon
              color="var(--tg-theme-hint-color)"
              width={24}
              height={24}
            />

            <div
              style={{
                cursor: "default",
                color: "#fff",
                fontFamily: "var(--text_font)",
              }}
            >
              {select}
            </div>

            <div
              style={{
                position: "relative",
              }}
            >
              <svg
                onClick={() => setIsSelectOpen((prev) => !prev)}
                style={{
                  cursor: "pointer",
                  width: "18px",
                  height: "18px",
                  color: "var(--tg-theme-hint-color)",
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>

              <div
                hidden={!isSelectOpen}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "0px",
                  background: "var(--tg-theme-bg-color)",
                  color: "var(--color_primary_color)",
                  padding: "4px 0",
                  width: "116px",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    padding: "8px 14px",
                    fontFamily: "var(--text_font)",
                    fontSize: "16px",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    setSelect("Market");
                    setIsSelectOpen(false);
                  }}
                >
                  Market
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    padding: "8px 14px",
                    fontFamily: "var(--text_font)",
                    fontSize: "16px",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    setSelect("Limit");
                    setIsSelectOpen(false);
                  }}
                >
                  Limit
                </div>
              </div>
            </div>

            {/* <select
              style={{
                background: "none",
                color: "var(--color_primary_color)",
                outline: "none",
                border: "none",
                fontFamily: "var(--text_font)",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                textAlign: "center",
              }}
              defaultValue={select}
              onChange={(e) => {
                vibrate();
                setSelect(e.currentTarget.value as "Market" | "Limit");
              }}
            >
              <option value="Market">Market</option>
              <option value="Limit">Limit</option>
            </select> */}
          </div>

          <div
            style={{
              padding: "12px",
              background: "var(--tg-theme-secondary-bg-color)",
              marginTop: "6px",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{
                background: "none",
                color: "var(--color_primary_color)",
                outline: "none",
                border: "none",
                fontFamily: "var(--text_font)",
                fontSize: "16px",
                textAlign: "center",
              }}
              inputMode="numeric"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={select === "Market" ? "" : price}
              placeholder="Market Price"
              disabled={select === "Market"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div>
              <div
                style={{
                  padding: "12px",
                  background: "var(--tg-theme-secondary-bg-color)",
                  marginTop: "12px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MinusSmallIcon
                  width={28}
                  height={28}
                  strokeWidth="2"
                  style={{
                    cursor: "pointer",
                    color: "var(--color_primary_color)"
                  }}
                  onClick={() => {
                    vibrate();

                    setBuy((prev) => prev - 1);
                  }}
                />
                <NumericFormat
                  style={{
                    background: "none",
                    width: "100%",
                    color: "var(--color_primary_color)",
                    outline: "none",
                    border: "none",
                    fontFamily: "var(--text_font)",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                  inputMode="numeric"
                  onChange={(e) => {
                    setBuy(
                      Number(
                        e.target.value
                          .toLowerCase()
                          .replace(
                            ` ${
                              activeSwitch === "sell"
                                ? selectedExchangePair?.assets[0] || "ton"
                                : selectedExchangePair?.assets[1] || "exc"
                            }`,
                            ""
                          )
                      )
                    );
                  }}
                  value={buy}
                  suffix={` ${
                    activeSwitch === "sell"
                      ? String(
                          selectedExchangePair?.assets[0] || "ton"
                        ).toUpperCase()
                      : String(
                          selectedExchangePair?.assets[1] || "exc"
                        ).toUpperCase()
                  }`}
                />
                <PlusSmallIcon
                  width={28}
                  height={28}
                  strokeWidth="2"
                  style={{
                    cursor: "pointer",
                    color: "var(--color_primary_color)",
                  }}
                  onClick={() => {
                    vibrate();

                    setBuy((prev) => prev + 1);
                  }}
                />
              </div>

              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyle: "none",
                  padding: "0",
                  gap: "4px",
                  margin: "0",
                  marginTop: "6px",
                }}
              >
                <li style={{ width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setBuy(
                        total[
                          activeSwitch === "sell"
                            ? selectedExchangePair?.assets[0] || "ton"
                            : selectedExchangePair?.assets[1] || "exc"
                        ] * 0.25
                      );
                    }}
                  >
                    <div
                      style={{
                        background: "var(--tg-theme-secondary-bg-color)",
                        height: "16px",
                        borderRadius: "9999px",
                        width: "100%",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "var(--color_primary_color)",
                        fontSize: "14px",
                      }}
                    >
                      25%
                    </span>
                  </div>
                </li>

                <li style={{ width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setBuy(
                        total[
                          activeSwitch === "sell"
                            ? selectedExchangePair?.assets[0] || "ton"
                            : selectedExchangePair?.assets[1] || "exc"
                        ] * 0.5
                      );
                    }}
                  >
                    <div
                      style={{
                        background: "var(--tg-theme-secondary-bg-color)",
                        height: "16px",
                        borderRadius: "9999px",
                        width: "100%",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "var(--color_primary_color)",
                        fontSize: "14px",
                      }}
                    >
                      50%
                    </span>
                  </div>
                </li>

                <li style={{ width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setBuy(
                        total[
                          activeSwitch === "sell"
                            ? selectedExchangePair?.assets[0] || "ton"
                            : selectedExchangePair?.assets[1] || "exc"
                        ] * 0.75
                      );
                    }}
                  >
                    <div
                      style={{
                        background: "var(--tg-theme-secondary-bg-color)",
                        height: "16px",
                        borderRadius: "9999px",
                        width: "100%",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "var(--color_primary_color)",
                        fontSize: "14px",
                      }}
                    >
                      75%
                    </span>
                  </div>
                </li>

                <li style={{ width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setBuy(
                        total[
                          activeSwitch === "sell"
                            ? selectedExchangePair?.assets[0] || "ton"
                            : selectedExchangePair?.assets[1] || "exc"
                        ]
                      );
                    }}
                  >
                    <div
                      style={{
                        background: "var(--tg-theme-secondary-bg-color)",
                        height: "16px",
                        borderRadius: "9999px",
                        width: "100%",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "var(--color_primary_color)",
                        fontSize: "14px",
                      }}
                    >
                      100%
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div
              style={{
                padding: "12px",
                background: "var(--tg-theme-secondary-bg-color)",
                marginTop: "12px",
                borderRadius: "14px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <NumericFormat
                style={{
                  background: "none",
                  width: "100%",
                  color: "var(--color_primary_color)",
                  outline: "none",
                  border: "none",
                  fontFamily: "var(--text_font)",
                  fontSize: "16px",
                  textAlign: "center",
                }}
                inputMode="numeric"
                value={estimate}
                suffix={` ${
                  activeSwitch === "buy"
                    ? String(
                        selectedExchangePair?.assets[0] || "ton"
                      ).toUpperCase()
                    : String(
                        selectedExchangePair?.assets[1] || "exc"
                      ).toUpperCase()
                }`}
                // onChange={(e) => }
                disabled
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ color: "var(--color_primary_color)", fontSize: "14px" }}
            >
              Balance
            </span>
            <span
              style={{ color: "var(--color_primary_color)", fontSize: "14px" }}
            >
              {`${
                activeSwitch === "sell"
                  ? formatNumber(
                      (total[
                        selectedExchangePair.assets[0] || "ton"
                      ] as number) || 0
                    )
                  : formatNumber(
                      (total[
                        selectedExchangePair.assets[1] || "exc"
                      ] as number) || 0
                    )
              } ${
                activeSwitch === "sell"
                  ? String(
                      selectedExchangePair?.assets[0] || "ton"
                    ).toUpperCase()
                  : String(
                      selectedExchangePair?.assets[1] || "exc"
                    ).toUpperCase()
              }`}
            </span>
          </div>

          <Button
            size="m"
            style={{
              marginTop: "12px",
              background: activeSwitch === "sell" ? "red" : "#29B77F",
              width: "100%",
              textTransform: "uppercase",
            }}
            onClick={handleSubmit}
          >
            {activeSwitch} {selectedExchangePair?.assets[0] || "ton"}
          </Button>

          <div style={{ margin: "16px 0", width: "100%" }}></div>

          {error ? <ErrorBlock text={errorMapping(error)} /> : null}
        </Panel>
      )}
    </>
  );
}
