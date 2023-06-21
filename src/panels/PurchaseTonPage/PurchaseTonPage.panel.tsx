import { FC, useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { App } from "../../App";
import { ROUTE_NAMES } from "../../router/constants";
import { getFiatRates } from "../../api";
import { SwapDataContext } from "../../providers/SwapDataContextProvider";
import { ReactComponent as Switch15OutlineIcon } from "../../icons/Switch15Outline.svg";
import { availableFiatsSelector } from "../../store/reducers/user/user.selectors";
import { useTranslation } from "react-i18next";

import { userActions } from "../../store/reducers";
import { Checkbox } from "antd";

import {
  AppTitle,
  BlockHeader,
  Button,
  Group,
  Input,
  Panel,
  Select,
  Text,
} from "../../components";
import styles from "./PurchaseTonPage.module.css";
import { userInfo } from "os";

export const PurchaseTonPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let availableFiats = useSelector(availableFiatsSelector);

  const { setData, ...data }: any = useContext(SwapDataContext);
  const { selectedTokens } = data;
  let outAmount: string = "",
    inAmount: string = "";

  const navigateToSelect = (position: string) => {
    navigate(ROUTE_NAMES.FIAT_SELECT, {
      state: {
        position,
      },
    });
  };

  const calculateOutput = (e: any) => {
    let value = document.getElementsByTagName("input")[0].value;
    inAmount = value; // e.target.value;

    for (let i = 0; i < availableFiats.length; i++) {
      if (
        availableFiats[i].base_symbol.toLowerCase() ==
        selectedTokens.first.toLowerCase()
      ) {
        outAmount = (Number(value.replace(",", ".")) / availableFiats[i].price)
          .toFixed(2)
          .toString();
      } else {
        outAmount = "0";
      }
    }
    document.getElementsByTagName("input")[1].value = outAmount;
    let inAmountNum: number;
    try {
      inAmountNum = parseInt(inAmount);
    } catch {
      inAmountNum = 0;
    }
    if (inAmountNum < availableFiats[0].minAmount) {
      return;
    }

    setData({
      ...data,
      selectedTokens: {
        ...selectedTokens,
        priceInTon: parseInt(outAmount) > 0 ? inAmountNum : 0,
      },
    });
  };

  const purchaseDisabled = () => {
    try {
      inAmount = document.getElementsByTagName("input")[0].value;
    } catch {
      return true;
    }

    if (inAmount.toString() === "0" || inAmount.toString() === "") return true;

    // try {
    // 	if (parseInt(outAmount) <= 0) {
    // 		return true;
    // 	}
    // } catch { return true; }

    if (availableFiats[0].minAmount > parseInt(inAmount)) {
      return true;
    }

    try {
      return !document.getElementsByTagName("input")[2].checked;
    } catch {
      return true;
    }
  };

  const purchase = () => {
    navigate(ROUTE_NAMES.BUY_TON_STEP1, {
      state: {
        currency: selectedTokens.first,
        inAmount: parseFloat(inAmount),
        outAmount: outAmount ? parseFloat(outAmount) : 0,
      },
    });
  };

  const PurchaseSecondTokenLoader: FC = () => {
    return (
      <ContentLoader
        speed={2}
        width={67}
        height={17}
        backgroundColor="var(--background_content)"
        foregroundColor="var(--background_block)"
      >
        <rect x="0" y="0" rx="6" ry="6" width="67" height="17" />
      </ContentLoader>
    );
  };

  useEffect(() => {
    const getDedustTokensRequest = async () => {
      const fiatRates = await getFiatRates();
      if (!("rub" in fiatRates)) throw new Error("No RUB rate");
      const newAvailableFiats = [
        {
          base_symbol: "RUB",
          last_price: 10000,
          price: fiatRates.rub,
          minAmount: 5,
        },
      ];
      dispatch(userActions.setAvailableFiats(newAvailableFiats));

      setTimeout(() => {
        setData((prev: any) => ({
          ...prev,
          selectedTokens: {
            ...prev.selectedTokens,
            first: newAvailableFiats[0]?.base_symbol,
            second: "TON",
            priceInTon: 0,
          },
          allTokens: newAvailableFiats,
        }));
      }, 1000);
    };

    getDedustTokensRequest();
  }, [setData]);

  return (
    <Panel>
      <Group space={24}>
        <Group space={12}>
          <br />
          <Input
            placeholder={t("From") as string}
            type={"string"}
            onChange={calculateOutput}
            after={
              <Select
                value="RUB"
                onClick={() => {
                  navigateToSelect("first");
                }}
              />
            }
          />
          <Input
            placeholder={t("To") as string}
            type={"string"}
            disabled={true}
            after={
              !selectedTokens.second ? (
                <PurchaseSecondTokenLoader />
              ) : (
                <Select value="TON" disabled={true} />
              )
            }
          />
          <div
            style={{
              width: "94%",
              margin: "auto",
            }}
          >
            <Text>
              {t(
                "Amount of cryptocurrency to receive is calculated only after the payment is processed. Minimum amount for deposit is 5 RUB."
              )}
            </Text>
            <br />
            <br />
            <br />
            <Checkbox style={{ fontSize: "16px" }} onChange={calculateOutput}>
              {t("I agree to")}{" "}
              <a href="https://xjet.app/terms" target={"_blank"}>
                {t("terms of use")}
              </a>
            </Checkbox>
          </div>
          <Group space={12}>
            <Button size="m" onClick={purchase} disabled={purchaseDisabled()}>
              {t("Buy with a card")}
            </Button>
          </Group>
        </Group>
      </Group>
    </Panel>
  );
};
