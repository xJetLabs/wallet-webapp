import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";

import styles from "./Receive.module.css";
import { useSelector } from "react-redux";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";

export const ReceivePanel: FC = () => {
  const myTonAddress = useSelector(myTonAddressSelector);

  const copyAddress = () => {
    navigator.clipboard.writeText(myTonAddress);
  };

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
            value={`ton://transfer/${myTonAddress}`}
            fgColor="var(--color_qr)"
            bgColor="transparent"
          />
          <Text weight="600" size={14} lineHeight={"17px"}>
            Minimal amount — 0.1 TON
          </Text>
        </Group>
        <Input
          value={myTonAddress}
          after={
            <Copy20OutlineIcon
              style={{ cursor: "pointer" }}
              color={"var(--accent)"}
              onClick={copyAddress}
            />
          }
        />
      </Group>
    </Panel>
  );
};
