import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_NAMES } from "../../router/constants";

import {
  BlockHeader,
  Button,
  Group,
  Input,
  Panel,
  RichCell,
  Switch,
  Text,
} from "../../components";

import { ReactComponent as Switch15OutlineIcon } from "../../icons/Switch15Outline.svg";

import styles from "./Swap.module.css";

export const SwapPanel: FC = () => {
  const navigate = useNavigate();

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
            />
          </div>
          <Input placeholder="To" />
        </Group>
        <Group space={12}>
          <BlockHeader after={`1 TON ~ 10 AMBR`}>Price</BlockHeader>
          <Button size="m" onClick={exchange}>
            Exchange
          </Button>
        </Group>
        <RichCell
          after={<Switch />}
          description="We will help you choose the most profitable exchange option"
          className={styles.__dex_info}
        >
          Automatic DEX
        </RichCell>
      </Group>
    </Panel>
  );
};
