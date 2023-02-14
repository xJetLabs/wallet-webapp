import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";

import { ROUTE_NAMES } from "../../router/constants";

import { getDedustTokens } from "../../api";

import { SwapDataContext } from "../../providers/SwapDataContextProvider";

import {
  BlockHeader,
  Button,
  Group,
  Input,
  Panel,
  Select,
  Text,
} from "../../components";

import { ReactComponent as Switch15OutlineIcon } from "../../icons/Switch15Outline.svg";

import styles from "./Swap.module.css";
import { formatNumber } from "../../utils";

const SwapSecondTokenLoader: FC = () => {
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

const SwapPriceTokenLoader: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={118}
      height={17}
      backgroundColor="var(--background_block)"
      foregroundColor="var(--background_content)"
    >
      <rect x="0" y="0" rx="6" ry="6" width="118" height="17" />
    </ContentLoader>
  );
};

export const SwapPanel: FC = () => {
  const navigate = useNavigate();
  const { setData, ...data }: any = useContext(SwapDataContext);
  const { selectedTokens } = data;

  const exchange = () => {
    navigate(ROUTE_NAMES.SEND_SUCCESS, {
      state: {
        type: "sexcahnged",
        amount: 3.53,
        currency: "ton",
        ton_address: "Received",
      },
    });
  };

  const navigateToSelect = (position: string) => {
    navigate(ROUTE_NAMES.SWAP_SELECT, {
      state: {
        position,
      },
    });
  };

  const switchTokens = () => {
    setData((prev: any) => ({
      ...prev,
      selectedTokens: {
        ...prev.selectedTokens,
        first: prev.selectedTokens.second,
        second: prev.selectedTokens.first,
      },
    }));
  };

  useEffect(() => {
    const getDedustTokensRequest = async () => {
      const response = await getDedustTokens();

      const allPossibleTokensArray: any = Object.values(response.data) || [];

      setData((prev: any) => ({
        ...prev,
        selectedTokens: {
          ...prev.selectedTokens,
          second:
            prev.selectedTokens.second ||
            allPossibleTokensArray[0]?.base_symbol,
          priceInTon:
            prev.selectedTokens.priceInTon ||
            Number(allPossibleTokensArray[0]?.last_price),
        },
        allTokens: allPossibleTokensArray,
      }));
    };

    getDedustTokensRequest();
  }, [setData]);

  return (
    <Panel>
      <Group space={24}>
        <Group space={12}>
          <Input
            placeholder="From"
            indicator={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
                style={{ cursor: "pointer" }}
              >
                Max
              </Text>
            }
            after={
              <Select
                value={selectedTokens.first}
                disabled={selectedTokens.first === "TON"}
                onClick={() => {
                  if (selectedTokens.first === "TON") {
                    return;
                  }

                  navigateToSelect("first");
                }}
              />
            }
          />
          <div className={styles.__button_group}>
            <Button
              before={
                <Text
                  color="var(--accent)"
                  lineHeight={"15px"}
                  weight="600"
                  size={12}
                >
                  Impact
                </Text>
              }
              mode={"secondary"}
              stretched
              hasHover={false}
            >
              1.7%
            </Button>
            <Button
              before={
                <Text
                  color="var(--accent)"
                  lineHeight={"15px"}
                  weight="600"
                  size={12}
                >
                  Fee
                </Text>
              }
              mode={"secondary"}
              stretched
              hasHover={false}
            >
              0.7 TON
            </Button>
            <Button
              mode="secondary"
              before={<Switch15OutlineIcon />}
              className={styles.__switch_button}
              onClick={switchTokens}
            />
          </div>
          <Input
            placeholder="To"
            after={
              !selectedTokens.second ? (
                <SwapSecondTokenLoader />
              ) : (
                <Select
                  value={selectedTokens.second}
                  disabled={selectedTokens.second === "TON"}
                  onClick={() => {
                    if (selectedTokens.second === "TON") {
                      return;
                    }

                    navigateToSelect("second");
                  }}
                />
              )
            }
          />
        </Group>
        <Group space={12}>
          <BlockHeader
            after={
              selectedTokens.priceInTon ? (
                `1 TON ~ ${formatNumber(1 / selectedTokens.priceInTon)} ${
                  selectedTokens.second === "TON"
                    ? selectedTokens.first
                    : selectedTokens.second
                }`
              ) : (
                <SwapPriceTokenLoader />
              )
            }
            className={styles.__price_block_header}
          >
            Price
          </BlockHeader>
          <Button size="m" onClick={exchange}>
            Exchange
          </Button>
        </Group>
      </Group>
    </Panel>
  );
};
