import { FC, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Button, Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";

import styles from "./Receive.module.css";
import { useSelector } from "react-redux";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { checkDeposit } from "../../api";

export const ReceivePanel: FC = () => {
  const [buttonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const myTonAddress = useSelector(myTonAddressSelector);

  const copyAddress = () => {
    navigator.clipboard.writeText(myTonAddress);
  };

  const check = async () => {
    setIsButtonDisabled(true);

    await checkDeposit().finally(() => {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
    });
  };

  return (
    <Panel>
      <Group space={12}>
        <Group space={24} className={styles.__qr_wrapper}>
          <Text weight="600" size={14} lineHeight={"17px"}>
            Scan this QR-code to transfer funds
          </Text>
          <QRCodeSVG
            width={256}
            height={256}
            value={`ton://transfer/${myTonAddress}`}
            fgColor="var(--color_qr)"
            bgColor="transparent"
          />
          <Text weight="600" size={14} lineHeight={"17px"}>
            TON deposit from 0.1 TON, deposit with any jettons - unlimited.
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
        <Button
          size="m"
          mode="secondary"
          onClick={check}
          disabled={buttonDisabled}
        >
          Check deposit
        </Button>
      </Group>
    </Panel>
  );
};
