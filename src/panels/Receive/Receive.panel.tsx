import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";

import styles from "./Receive.module.css";

export const ReceivePanel: FC = () => {
  return (
    <Panel>
      <Group space={12}>
        <Group space={24} className={styles.__qr_wrapper}>
          <Text weight="600" size={14} lineHeight={"17px"}>
            Scan this QR-code to transfer funds
          </Text>
          <QRCodeSVG
            width={144}
            height={144}
            value="test"
            fgColor="var(--color_qr)"
            bgColor="transparent"
          />
          <Text weight="600" size={14} lineHeight={"17px"}>
            Minimal amount — 0.1 TON
          </Text>
        </Group>
        <Input
          value="EQBbjda02da29dja2d9ja20d"
          after={
            <Copy20OutlineIcon
              style={{ cursor: "pointer" }}
              color={"var(--accent)"}
            />
          }
        />
      </Group>
    </Panel>
  );
};
