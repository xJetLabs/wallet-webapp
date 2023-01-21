import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  ActionText,
  AppTitle,
  Avatar,
  Button,
  Cell,
  Group,
  Panel,
  PanelHeader,
  Text,
} from "../../components";

import { ReactComponent as LogoOutlineIcon } from "../../icons/LogoOutline.svg";
import { ReactComponent as Settings24OutlineIcon } from "../../icons/Settings24Outline.svg";
import { ReactComponent as Send24OutlineIcon } from "../../icons/Send24Outline.svg";
import { ReactComponent as Receive24OutlineIcon } from "../../icons/Receive24Outline.svg";
import { ReactComponent as History24OutlineIcon } from "../../icons/History24Outline.svg";
import { ReactComponent as Switching24OutlineIcon } from "../../icons/Switching24Outline.svg";

import styles from "./Home.module.css";

export const HomePanel: FC = () => {
  const navigate = useNavigate();

  return (
    <Panel
      header={
        <PanelHeader
          before={
            <Button
              before={<LogoOutlineIcon />}
              mode={"transparent_with_accent_text"}
            />
          }
          after={
            <Button
              before={<Settings24OutlineIcon color={"var(--accent)"} />}
              mode={"transparent_with_accent_text"}
              onClick={() => {
                navigate("/settings");
              }}
            />
          }
        >
          <AppTitle screenName={"Wallet"} />
        </PanelHeader>
      }
      // centerVertical
    >
      <Group space={24}>
        <div>
          <ActionText
            top="Current balance"
            middle="3, 100.53 TON"
            bottom="≈ 42, 255.84 $"
          />
          <div className={styles.__buttonGroup}>
            <Button
              stretched
              before={<Send24OutlineIcon />}
              mode={"secondary_with_accent_text"}
            >
              Send
            </Button>
            <Button
              stretched
              before={<Receive24OutlineIcon />}
              mode={"secondary_with_accent_text"}
            >
              Receive
            </Button>
            <Button
              before={<History24OutlineIcon />}
              mode={"secondary_with_accent_text"}
            />
            <Button
              before={<Switching24OutlineIcon />}
              mode={"secondary_with_accent_text"}
            />
          </div>
        </div>
        <Group space={12}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            JETTONS
          </Text>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                325.5 AMBR
              </Text>
            }
          >
            Ambra
          </Cell>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                21.52 TAKE
              </Text>
            }
          >
            TonTake
          </Cell>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                325.521 AMBR
              </Text>
            }
          >
            Ambra
          </Cell>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                21.525 TAKE
              </Text>
            }
          >
            TonTake
          </Cell>
        </Group>
        <Group space={12}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            UNVERIFIED
          </Text>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                3,000,000.42 LAVE
              </Text>
            }
          >
            Lavandos
          </Cell>
        </Group>
      </Group>
    </Panel>
  );
};
