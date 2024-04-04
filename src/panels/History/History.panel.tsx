import { useCallback, useEffect, useRef, useState } from "react";

import { Cell, Group, Panel, Text } from "../../components";

import { ReactComponent as Fire18OutlineIcon } from "../../icons/Fire18Outline.svg";
import { ReactComponent as Get18OutlineIcon } from "../../icons/Get18Outline.svg";
import { ReactComponent as Receive18OutlineIcon } from "../../icons/Receive18Outline.svg";
import { ReactComponent as Send18OutlineIcon } from "../../icons/Send18Outline.svg";
import { ReactComponent as BoxSend18OutlineIcon } from "../../icons/BoxSend18Outline.svg";
import { ReactComponent as Cart18Outline } from "../../icons/Cart18Outline.svg";
import { ReactComponent as Bin18Outline } from "../../icons/Bin18Outline.svg";
import { ReactComponent as Receipt18Outline } from "../../icons/Receipt18Outline.svg";

import { useTranslation } from "react-i18next";

import * as amplitude from "@amplitude/analytics-browser";

import { formatDate } from "../../utils";
import { getHistory, apiInited } from "../../api";

const historyAmountMap = (amount: number, type: string) => {
  const isIncomeOrDeposit =
    type.startsWith("incoming_") || type.startsWith("deposit_");

  return {
    amount,
    sign: isIncomeOrDeposit ? "+" : "-",
    color: isIncomeOrDeposit ? "--color_positive" : "--color_negative",
  };
};

const historyIconMap = (type: string) => {
  switch (type) {
    case "incoming_activateCheque":
    case "outgoing_createCheque":
      return <Fire18OutlineIcon />;
    case "outgoing_invoicePayment":
    case "incoming_invoicePayment":
      return <Receipt18Outline />;
    case "incoming_send":
    case "deposit_onchain":
      return <Get18OutlineIcon />;
    case "outgoing_send":
      return <Send18OutlineIcon />;
    case "incoming_fire":
    case "outgoing_fire":
      return <Receive18OutlineIcon />;
    case "outgoing_onchainSwap":
      return <Cart18Outline />;
    case "withdrawal_onchain":
    case "outgoing_apiDeposit":
      return <BoxSend18OutlineIcon />;
    case "incoming_deleteCheque":
      return <Bin18Outline />;
    default:
      return null;
  }
};

export const HistoryPanel: React.FC = () => {
  const { t } = useTranslation();
  const pageScrollRef = useRef<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [isLoadingFirstBatch, setIsLoadingFirstBatch] = useState<boolean>(true);

  const isPanelCenter = history.length === 0 && isLoadingFirstBatch;

  const requestHistory = useCallback(async () => {
    pageScrollRef.current = true;
    const historyResponse = await getHistory(20, history.length || 0);
    const operations = historyResponse?.data?.operations;

    if (operations) {
      setHistory((prev: any) => {
        return [...prev, ...operations].reduce((prev, curr) => {
          if (!curr.id) {
            return prev;
          }

          const transferExist = prev.find((v: any) => v.id === curr.id);

          if (!transferExist) {
            prev.push(curr);
          }
          return prev;
        }, []);
      });
    }

    pageScrollRef.current = false;
  }, [apiInited]);

  useEffect(() => {
    amplitude.track("HistoryPage.Launched");
    requestHistory();

    const onScroll = () => {
      if (document.scrollingElement) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.scrollingElement;
        if (scrollTop + clientHeight === scrollHeight) {
          if (pageScrollRef.current) {
            return;
          }
        }
      }
    };

    document.body.addEventListener("scroll", onScroll);
    if (history.length === 0) {
      requestHistory().then(() => {
        setIsLoadingFirstBatch(false);
      });
    }

    return () => {
      document.body.removeEventListener("scroll", onScroll);
    };
  }, [requestHistory, history.length]);

  const historyTypeMap = (type: string) => {
    return t(type);
  };

  return (
    <Panel centerVertical={isPanelCenter} centerHorizontal={isPanelCenter}>
      {history.length > 0 ? (
        <Group space={24}>
          {history.map((value: any, index: number) => {
            const title = historyTypeMap(value?.type);
            const { amount, sign, color } = historyAmountMap(
              value?.amount,
              value?.type
            );
            const Icon = historyIconMap(value?.type);
            const date = new Date(value?.timestamp);

            return (
              <Cell
                key={index}
                before={Icon}
                description={formatDate(date)}
                after={
                  <Text
                    weight="600"
                    size={14}
                    lineHeight={"17px"}
                    color={`var(${color})`}
                  >
                    {sign} {amount} {value?.currency?.toUpperCase()}
                  </Text>
                }
              >
                {title}
              </Cell>
            );
          })}
          {pageScrollRef.current ? (
            <Text
              size={14}
              weight="600"
              lineHeight={"17px"}
              style={{ textAlign: "center" }}
            >
              {t("Loading")}...
            </Text>
          ) : null}
        </Group>
      ) : (
        <Text
          weight="600"
          size={14}
          lineHeight={"17px"}
          color="var(--accent)"
          style={{ margin: "0 auto" }}
        >
          {t("Your history is empty. Send or receive tokens to see it here.")}
        </Text>

        // <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
      )}
    </Panel>
  );
};

export default HistoryPanel;
