import { FC } from "react";
import { useNavigate } from "react-router-dom";

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

export const HomePanel: FC = () => {
  const navigate = useNavigate();

  return (
    <Panel
    // centerVertical
    >
      <Group space={24}>
        <Group space={24}>
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
              onClick={() => {
                navigate("/send");
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
              before={<History24OutlineIcon />}
              mode={"secondary_with_accent_text"}
              onClick={() => {
                navigate("/history");
              }}
            />
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
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <>
                <Text
                  weight={"600"}
                  size={14}
                  lineHeight={"17px"}
                  color={"var(--accent)"}
                >
                  325.5 AMBR
                </Text>
                <Text
                  weight={"400"}
                  size={14}
                  lineHeight={"17px"}
                  color={"var(--color_gray_color)"}
                >
                  ≈ $ 25.4
                </Text>
              </>
            }
            afterStyles={{
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            Ambra
          </Cell>
          <Cell
            before={<Avatar fallbackName="j" size={42} src="" />}
            after={
              <>
                <Text
                  weight={"600"}
                  size={14}
                  lineHeight={"17px"}
                  color={"var(--accent)"}
                >
                  21.52 TAKE
                </Text>
                <Text
                  weight={"400"}
                  size={14}
                  lineHeight={"17px"}
                  color={"var(--color_gray_color)"}
                >
                  ≈ $ 234.476
                </Text>
              </>
            }
            afterStyles={{
              flexDirection: "column",
              alignItems: "flex-end",
            }}
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
