import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";

import { checkDeposit } from "../../api";

import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";

import { Button, Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";
import { ReactComponent as CopySuccess24OutlineIcon } from "../../icons/CopySuccess24Outline.svg";

import styles from "./Receive.module.css";
import { useTranslation } from "react-i18next";

export const ReceivePanel: FC = () => {
  const { t } = useTranslation();

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

    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    try {
      navigator.clipboard.writeText(myTonAddress);
    } catch (e: any) {
      throw new Error("Navigator.clipboard can't be used: ", e);
    }
  };

  const check = async () => {
    setIsButtonDisabled(true);

    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

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
            {t("Scan this QR-code to transfer funds")}
          </Text>
          <QRCodeSVG
            width={256}
            height={256}
            value={`ton://transfer/${myTonAddress}`}
            fgColor="var(--color_qr)"
            bgColor="transparent"
          />
          <Text weight="600" size={14} lineHeight={"17px"}>
            {t(
              "TON deposit from 0.1 TON, deposit with any jettons - unlimited."
            )}
          </Text>
        </Group>
        <Input
          value={myTonAddress}
          readonly
          selectAll
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
          {t("Check deposit")}
        </Button>
      </Group>
    </Panel>
  );
};
