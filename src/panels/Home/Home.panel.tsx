import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getMyBalance, getMyServerData } from "../../api";

import {
  ActionText,
  Avatar,
  Button,
  Cell,
  Group,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as Settings24OutlineIcon } from "../../icons/Settings24Outline.svg";
import { ReactComponent as Send24OutlineIcon } from "../../icons/Send24Outline.svg";
import { ReactComponent as Receive24OutlineIcon } from "../../icons/Receive24Outline.svg";
import { ReactComponent as History24OutlineIcon } from "../../icons/History24Outline.svg";

import styles from "./Home.module.css";

// FIXME:
import { userActions } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  myBalancesSelector,
  myTonBalanceSelector,
  totalUSDValueSelector,
} from "../../store/reducers/user/user.selectors";
import { formatNumber } from "../../utils";

export const HomePanel: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myBalances = useSelector(myBalancesSelector);
  const myTonBalance = useSelector(myTonBalanceSelector);
  const totalUSDValue = useSelector(totalUSDValueSelector);

  useEffect(() => {
    const requestMyServerData = async () => {
      const response = await getMyServerData();

      dispatch(userActions.setServerData(response.data));

      console.debug("myserverdata", response);
    };

    const requestMyBalance = async () => {
      const response = await getMyBalance();

      dispatch(userActions.setBalances(response.data.balances));

      console.debug("mybalance", response);
    };

    requestMyServerData();
    requestMyBalance();
  }, [dispatch]);

  return (
    <Panel
    // centerVertical
    >
      <Group space={24}>
        <Group space={24}>
          <ActionText
            top="Current balance"
            middle={`${formatNumber(myTonBalance?.amount || 0)} TON`}
            bottom={`≈ ${formatNumber(totalUSDValue || 0)} $`}
          />
          <div className={styles.__buttonGroup}>
            <Button
              stretched
              before={<Send24OutlineIcon />}
              mode={"secondary_with_accent_text"}
              onClick={() => {
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
        <Group space={12}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            JETTONS
          </Text>
          {myBalances.map((v: any, i: any) => {
            return (
              <Cell
                key={i}
                before={
                  <Avatar
                    fallbackName={v.currency.slice(0, 1)}
                    size={42}
                    src=""
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
                      {v.amount} {v.currency.toUpperCase()}
                    </Text>
                    {v.price ? (
                      <Text
                        weight={"400"}
                        size={14}
                        lineHeight={"17px"}
                        color={"var(--color_gray_color)"}
                      >
                        ≈ $ {v.price}
                      </Text>
                    ) : null}
                  </>
                }
                afterStyles={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {v.currency}
              </Cell>
            );
          })}
        </Group>
      </Group>
    </Panel>
  );
};
