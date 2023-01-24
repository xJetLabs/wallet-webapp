import { FC, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Button, Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";
import { ReactComponent as CopySuccess24OutlineIcon } from "../../icons/CopySuccess24Outline.svg";

import styles from "./Receive.module.css";
import { useSelector } from "react-redux";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { checkDeposit } from "../../api";

export const ReceivePanel: FC = () => {
  const [buttonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyTimeoutRef = useRef<NodeJS.Timer | undefined>(undefined);

  const myTonAddress = useSelector(myTonAddressSelector);

  useEffect(() => {
    if (copySuccess) {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }

    return () => {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = undefined;
    };
  }, [copySuccess]);

  const copyAddress = () => {
    setCopySuccess(true);

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
            copySuccess ? (
              <CopySuccess24OutlineIcon
                style={{ cursor: "pointer", marginRight: -2 }}
                color={"var(--accent)"}
              />
            ) : (
              <Copy20OutlineIcon
                style={{ cursor: "pointer" }}
                color={"var(--accent)"}
                onClick={copyAddress}
              />
            )
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
