import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { formatNumber } from "../../utils";

import {
  myTonBalanceSelector,
  myUnverifiedBalancesSelector,
  myVerifiedBalancesSelector,
  totalTONValueSelector,
  totalUSDValueSelector,
} from "../../store/reducers/user/user.selectors";

import {
  ActionText,
  Avatar,
  Button,
  Cell,
  Group,
  Link,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as Settings24OutlineIcon } from "../../icons/Settings24Outline.svg";
import { ReactComponent as Send24OutlineIcon } from "../../icons/Send24Outline.svg";
import { ReactComponent as Receive24OutlineIcon } from "../../icons/Receive24Outline.svg";
import { ReactComponent as Chains20OutlineIcon } from "../../icons/Chains20Outline.svg";

import ton from "../../images/ton.jpeg";

import styles from "./Home.module.css";

export const HomePanel: FC = () => {
  const navigate = useNavigate();

  const myVerifiedBalances = useSelector(myVerifiedBalancesSelector);
  const myUnverifiedBalances = useSelector(myUnverifiedBalancesSelector);
  const myTonBalance = useSelector(myTonBalanceSelector);
  const totalTONValue = useSelector(totalTONValueSelector);
  const totalUSDValue = useSelector(totalUSDValueSelector);

  return (
    <Panel>
      <Group space={24}>
        <Group space={24}>
          <ActionText
            top="Total balance"
            middle={`${formatNumber(totalTONValue || 0)} TON`}
            bottom={`≈ ${formatNumber(totalUSDValue || 0, {
              minimumFractionDigits: 3,
            })} $`}
          />
          <div className={styles.__buttonGroup}>
            <Button
              stretched
              before={<Send24OutlineIcon />}
              mode={"secondary_with_accent_text"}
              onClick={() => {
                if ((myTonBalance?.amount || 0) < 0.05) {
                  (window as any).Telegram.WebApp.showAlert(
                    "You don't have enough TON"
                  );

                  return;
                }

                navigate("/send/select");
              }}
            >
              Send
            </Button>
            <Button
              stretched
              before={<Receive24OutlineIcon />}
              mode={"secondary_with_accent_text"}
              onClick={() => {
                navigate("/receive");
              }}
            >
              Receive
            </Button>
            <Button
              before={<Settings24OutlineIcon />}
              mode={"secondary_with_accent_text"}
              onClick={() => {
                navigate("/settings");
              }}
            />
          </div>
        </Group>
        {myTonBalance ? (
          <Link href={myTonBalance?.url} target={"_self"} withCursor>
            <Cell
              before={<Avatar fallbackName={"T"} size={42} src={ton} />}
              after={
                <>
                  <Text
                    weight={"600"}
                    size={14}
                    lineHeight={"17px"}
                    color={"var(--accent)"}
                  >
                    {formatNumber(myTonBalance.amount || 0)} TON
                  </Text>
                  {myTonBalance?.values?.usd ? (
                    <Text
                      weight={"400"}
                      size={14}
                      lineHeight={"17px"}
                      color={"var(--color_gray_color)"}
                    >
                      ≈ $ {formatNumber(myTonBalance?.values?.usd || 0)}
                    </Text>
                  ) : null}
                </>
              }
              afterStyles={{
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div className={styles.__jetton_with_url_title}>
                TON{" "}
                {myTonBalance?.url ? (
                  <Chains20OutlineIcon color="var(--accent)" />
                ) : null}
              </div>
            </Cell>
          </Link>
        ) : null}
        {myVerifiedBalances.length > 0 ? (
          <Group space={12}>
            <Text
              weight={"600"}
              size={14}
              lineHeight={"17px"}
              color={"var(--accent)"}
            >
              JETTONS
            </Text>
            {myVerifiedBalances.map((v: any, i: any) => {
              if (!v) {
                return null;
              }

              return (
                <Link href={v?.url} target={"_self"} withCursor>
                  <Cell
                    key={i}
                    before={
                      <Avatar
                        fallbackName={v.currency.slice(0, 1)}
                        size={42}
                        src={v?.image}
                      />
                    }
                    after={
                      <>
                        <Text
                          weight={"600"}
                          size={14}
                          lineHeight={"17px"}
                          color={"var(--accent)"}
                        >
                          {formatNumber(v.amount || 0)}{" "}
                          {v.currency.toUpperCase()}
                        </Text>
                        {v?.values?.usd ? (
                          <Text
                            weight={"400"}
                            size={14}
                            lineHeight={"17px"}
                            color={"var(--color_gray_color)"}
                          >
                            ≈ $ {formatNumber(v?.values?.usd || 0)}
                          </Text>
                        ) : null}
                      </>
                    }
                    afterStyles={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className={styles.__jetton_with_url_title}>
                      {v.name}{" "}
                      {v?.url ? (
                        <Chains20OutlineIcon color="var(--accent)" />
                      ) : null}
                    </div>
                  </Cell>
                </Link>
              );
            })}
          </Group>
        ) : null}
        {myUnverifiedBalances.length > 0 ? (
          <Group space={12}>
            <Text
              weight={"600"}
              size={14}
              lineHeight={"17px"}
              color={"var(--accent)"}
            >
              UNVERIFIED
            </Text>
            {myUnverifiedBalances.map((v: any, i: any) => {
              if (!v) {
                return null;
              }

              return (
                <Link href={v?.url} target={"_self"} withCursor>
                  <Cell
                    key={i}
                    before={
                      <Avatar
                        fallbackName={v.currency.slice(0, 1)}
                        size={42}
                        src={v?.image}
                      />
                    }
                    after={
                      <>
                        <Text
                          weight={"600"}
                          size={14}
                          lineHeight={"17px"}
                          color={"var(--accent)"}
                        >
                          {formatNumber(v.amount || 0)}{" "}
                          {v.currency.toUpperCase()}
                        </Text>
                        {v?.values?.usd ? (
                          <Text
                            weight={"400"}
                            size={14}
                            lineHeight={"17px"}
                            color={"var(--color_gray_color)"}
                          >
                            ≈ $ {formatNumber(v?.values?.usd || 0)}
                          </Text>
                        ) : null}
                      </>
                    }
                    afterStyles={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className={styles.__jetton_with_url_title}>
                      {v.name}{" "}
                      {v?.url ? (
                        <Chains20OutlineIcon color="var(--accent)" />
                      ) : null}
                    </div>
                  </Cell>
                </Link>
              );
            })}
          </Group>
        ) : null}
      </Group>
    </Panel>
  );
};
