import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Cell, Group, Panel, Text } from "../../components";

import { ReactComponent as Fire18OutlineIcon } from "../../icons/Fire18Outline.svg";
import { ReactComponent as Get18OutlineIcon } from "../../icons/Get18Outline.svg";
import { ReactComponent as Receive18OutlineIcon } from "../../icons/Receive18Outline.svg";
import { ReactComponent as Send18OutlineIcon } from "../../icons/Send18Outline.svg";
import { ReactComponent as BoxSend18OutlineIcon } from "../../icons/BoxSend18Outline.svg";
import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import { formatDate } from "../../utils";
import { getHistory } from "../../api";

import styles from "./History.module.css";

const historyTypeMap = (serverType: string) => {
  switch (serverType) {
    case "withdrawal_onchain":
      return "Transfer to wallet";
    case "outgoing_send":
      return "Sent to User";
    case "incoming_send":
      return "Received from User";
    case "incoming_activateCheque":
      return "Cheque activation";
    case "outgoing_createCheque":
      return "Cheque created";
    case "incoming_fire":
    case "outgoing_fire":
      return "Fire jetton in chat";
    default:
      return serverType;
  }
};

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

  if (serverType === "incoming_send") {
    return <Get18OutlineIcon />;
  }

  if (serverType === "outgoing_send") {
    return <Send18OutlineIcon />;
  }

  if (serverType === "incoming_fire" || serverType === "outgoing_fire") {
    return <Receive18OutlineIcon />;
  }

  if (serverType === "withdrawal_onchain") {
    return <BoxSend18OutlineIcon />;
  }

  return null;
};

export const HistoryPanel: FC = () => {
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
          if (!curr._id) {
            return prev;
          }

          const transferExist = prev.find((v: any) => v._id === curr._id);

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

    return () => {
      document.body.removeEventListener("scroll", onScroll);
    };
  }, [requestHistory]);

  useEffect(() => {
    if (history.length === 0) {
      requestHistory().then(() => {
        setIsLoadingFirstBatch(false);
      });
    }
  }, [history.length, requestHistory]);

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
              Loading...
            </Text>
          ) : null}
        </Group>
      ) : (
        <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
      )}
    </Panel>
  );
};
