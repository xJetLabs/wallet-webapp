import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";

import * as amplitude from '@amplitude/analytics-browser';

import { Button, Group, Input, Panel, Text } from "../../components";
import { ReactComponent as Copy20OutlineIcon } from "../../icons/Copy20Outline.svg";
import { ReactComponent as CopySuccess24OutlineIcon } from "../../icons/CopySuccess24Outline.svg";

import { checkDeposit, purchaseShortName } from "../../api";
import { useQuery } from "../../hooks/useQuery";
import {
  myServerData,
  myTonAddressSelector,
} from "../../store/reducers/user/user.selectors";
import styles from "./Receive.module.css";

export const ReceivePanel: FC = () => {
  const { t } = useTranslation();
  const query: any = useQuery();
  const myTonAddress = useSelector(myTonAddressSelector);
  const serverData = useSelector(myServerData);

  const [buttonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shortWalletCopySuccess, setShortWalletCopySuccess] =
    useState<boolean>(false);
  const [isShortWalletDisabled, setIsShortWalletDisabled] = useState<boolean>(
    query.get("tonAddress") === null /*? serverData.short_disabled : true*/ // TODO: Fix short names
  );

  const copyTimeoutRef = useRef<NodeJS.Timer | undefined>(undefined);

  function handleShowConfirm() {
    (window as any).Telegram.WebApp.showConfirm(
      t("Точно ли вы хотите разблокировать этот адрес за 1 TON?"),
      async (value: boolean) => {
        if (value) {
          await purchaseShortName().then((res) => {
            if (res.error) {
              (window as any).Telegram.WebApp.showAlert(res.error);
            } else {
              setIsShortWalletDisabled(value);
            }
          });
        }
      }
    );
  }

  useEffect(() => {
    amplitude.track("DepositPage.Launched");
    if (query.get("tonAddress") !== null) {
      document.body.style.setProperty("--tg-color-scheme", "dark");
      document.body.style.setProperty("--tg-theme-bg-color", "#212121");
      document.body.style.setProperty("--tg-theme-button-color", "#8774e1");
      document.body.style.setProperty(
        "--tg-theme-button-text-color",
        "#ffffff"
      );
      document.body.style.setProperty("--tg-theme-hint-color", "#aaaaaa");
      document.body.style.setProperty("--tg-theme-link-color", "#8774e1");
      document.body.style.setProperty(
        "--tg-theme-secondary-bg-color",
        "#181818"
      );
      document.body.style.setProperty("--tg-theme-text-color", "#fff");
      document.body.style.setProperty("--tg-viewport-height", "100vh");
      document.body.style.setProperty("--tg-viewport-stable-height", "100vh");
    }
  }, [query]);

  useEffect(() => {
    if (!(window as any).Telegram.WebApp.MainButton.isVisible && query.get("tonAddress") === null) {
      (window as any).Telegram.WebApp.MainButton.show();
    }
    (window as any)
      .Telegram
      .WebApp
      .MainButton
      .setText(t("Check deposit"))
      .onClick(check)
      .color = (window as any).Telegram.WebApp.themeParams.button_color;
  }, [])

  useEffect(() => {
    if (copySuccess) {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }

    if (shortWalletCopySuccess) {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setShortWalletCopySuccess(false);
      }, 1000);
    }

    return () => {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = undefined;
    };
  }, [copySuccess, shortWalletCopySuccess]);

  const copyAddress = () => {
    amplitude.track("DepositPage.CopyAddressButton.Pushed");
    setCopySuccess(true);

    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    try {
      navigator.clipboard.writeText(myTonAddress || query.get("tonAddress"));
    } catch (e: any) {
      throw new Error("Navigator.clipboard can't be used: ", e);
    }
  };

  const copyShortWallet = () => {
    setShortWalletCopySuccess(true);

    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    try {
      navigator.clipboard.writeText(serverData?.short_wallet);
    } catch (e: any) {
      throw new Error("Navigator.clipboard can't be used: ", e);
    }
  };

  const check = async () => {
    setIsButtonDisabled(true);

    amplitude.track("DepositPage.CheckButton.Pushed");

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
            value={`ton://transfer/${myTonAddress || query.get("tonAddress")}`}
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
          value={myTonAddress || query.get("tonAddress")}
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


        {false && query.get("tonAddress") === null && serverData.short_wallet && (
          <Input
            value={serverData.short_wallet}
            readonly
            selectAll
            disabled={isShortWalletDisabled}
            after={
              isShortWalletDisabled ? (
                <div
                  onClick={handleShowConfirm}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    padding: "8px 12px",
                    borderRadius: "18px",
                    background: "var(--accent)",
                  }}
                >
                  <Text size={14} color="var(--tg-theme-button-text-color)">
                    🔓 1 TON
                  </Text>
                </div>
              ) : shortWalletCopySuccess ? (
                <CopySuccess24OutlineIcon
                  style={{ cursor: "pointer", marginRight: -2 }}
                  color={"var(--accent)"}
                />
              ) : (
                <Copy20OutlineIcon
                  style={{ cursor: "pointer" }}
                  color={"var(--accent)"}
                  onClick={copyShortWallet}
                />
              )
            }
          />
        )}
      </Group>
    </Panel>
  );
};
