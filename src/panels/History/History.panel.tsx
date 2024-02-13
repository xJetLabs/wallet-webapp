import { FC, useCallback, useEffect, useRef, useState } from "react";

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

import * as amplitude from '@amplitude/analytics-browser';

import { formatDate } from "../../utils";
import { getHistory } from "../../api";
import { useQuery } from "../../hooks/useQuery";

const historyAmountMap = (serverAmount: number, serverType: string) => {
  if (serverType.startsWith("incoming_")) {
    return {
      amount: serverAmount,
      sign: "+",
      color: "--color_positive",
    };
  } else {
    return {
      amount: serverAmount,
      sign: "-",
      color: "--color_negative",
    };
  }
};

const historyIconMap = (serverType: string) => {
  if (
    serverType === "incoming_activateCheque" ||
    serverType === "outgoing_createCheque"
  ) {
    return <Fire18OutlineIcon />;
  }

  if (serverType === "outgoing_invoicePayment" || 
  serverType === "incoming_invoicePayment") {
    return <Receipt18Outline />;
  }

  if (serverType === "incoming_send" || serverType === "deposit_onchain") {
    return <Get18OutlineIcon />;
  }

  if (serverType === "outgoing_send") {
    return <Send18OutlineIcon />;
  }

  if (serverType === "incoming_fire" || serverType === "outgoing_fire") {
    return <Receive18OutlineIcon />;
  }

  if (serverType === "outgoing_onchainSwap"){
    return <Cart18Outline />;
  }

  if (
    serverType === "withdrawal_onchain" ||
    serverType === "outgoing_apiDeposit"
  ) {
    return <BoxSend18OutlineIcon />;
  }

  if (serverType === "incoming_deleteCheque"){
    return <Bin18Outline />;
  }

  return null;
};

export const HistoryPanel: FC = () => {
  const { t } = useTranslation();
  const pageScrollRef = useRef<boolean>(false);
  const query: any = useQuery();
  const [history, setHistory] = useState<any>([]);
  const [isLoadingFirstBatch, setIsLoadingFirstBatch] = useState<boolean>(true);

  const isPanelCenter = history.length === 0 && isLoadingFirstBatch;

  const requestHistory = useCallback(async () => {
    pageScrollRef.current = true;

    const historyResponse = await getHistory(20, history.length || 0, query.get("apiKey"));
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
  }, [history.length]);

  useEffect(() => {
    amplitude.track("HistoryPage.Launched")
    const onScroll = () => {
      if (document.scrollingElement) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.scrollingElement;
        if (scrollTop + clientHeight === scrollHeight) {
          if (pageScrollRef.current) {
            return;
          }

          requestHistory();
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

  const historyTypeMap = (serverType: string) => {
    switch (serverType) {
      case "outgoing_apiDeposit":
        return t("Sent to api");
      case "deposit_onchain":
        return t("Received");
      case "withdrawal_onchain":
        return t("Transfer to wallet");
      case "outgoing_send":
        return t("Sent to User");
      case "incoming_send":
        return t("Received from User");
      case "incoming_activateCheque":
        return t("Cheque activation");
      case "outgoing_createCheque":
        return t("Cheque created");
      case "incoming_fire":
      case "outgoing_fire":
        return t("Fire jetton in chat");
      case "outgoing_invoicePayment":
        return t("Payment for invoice");
      case "incoming_invoicePayment":
        return t("Invoice payment");
      case "outgoing_onchainSwap":
        return t("Jetton swap");
      case "incoming_deleteCheque":
        return t("Cheque delete");
      default:
        return serverType;
    }
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
