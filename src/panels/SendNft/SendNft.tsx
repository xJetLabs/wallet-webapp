import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorMapping } from "../../utils";

import {
  Avatar,
  Block,
  Button,
  Cell,
  ErrorBlock,
  Group,
  Input,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as QRCopy17OutlineIcon } from "../../icons/QRCopy17Outline.svg";
import { ReactComponent as Date24OutlineIcon } from "../../icons/Date24Outline.svg";
import { ROUTE_NAMES } from "../../router/constants";
import { getUserNFT, sendNft } from "../../api";
import { NFT } from "../../types";
import axios from "axios";
import { useSelector } from "react-redux";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { useTranslation } from "react-i18next";

export const SendNftPanel: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    nft_address: string;
    to_address: string;
  }>({
    nft_address: params.address || "",
    to_address: "",
  });
  const [isAwaitResponse, setIsAwaitResponse] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentNft, setCurrentNtf] = useState<NFT>();
  const myTonAddress = useSelector(myTonAddressSelector);

  const isButtonDisabled = !formData.nft_address || !formData.to_address;

  function openQRScanner() {
    try {
      (window as any).Telegram.WebApp.showScanQrPopup({
        text: t("Scan token"),
      });
    } catch (error) {
      console.error("[WebApp] Can't open Camera!");
    }
  }

  async function nftTransfer() {
    // https://xjet.app/api/v1/nft.transfer
    setIsAwaitResponse(true);

    const response: any = await sendNft({ payload: formData }).finally(() => {
      setIsAwaitResponse(false);
    });

    if (
      response?.data &&
      !response?.response?.data.error &&
      !response?.data.error
    ) {
      navigate(ROUTE_NAMES.SEND_NFT_SUCCESS, {
        state: { ...formData, nftName: currentNft?.metadata.name },
      });
    } else if (response?.response?.data?.error || response?.data?.error) {
      try {
        window.navigator.vibrate(200);
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      }

      setError(response?.response?.data?.error || response?.data?.error);
    }

    setIsAwaitResponse(false);
  }

  useEffect(() => {
    getUserNFT(myTonAddress).then((data) => {
      const current = data.filter(
        (item: any) => item.address === params.address
      );
      setCurrentNtf(current[0]);
      setIsLoaded(true);
    });
  }, [params.address, myTonAddress]);

  useEffect(() => {
    const handlerQRText = ({ data }: { data: string }) => {
      try {
        window.navigator.vibrate(70);
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }

      setFormData((prev) => ({
        ...prev,
        receiverToken: data.split("ton://transfer/")[1],
      }));

      (window as any).Telegram.WebApp.closeScanQrPopup();
    };

    (window as any).Telegram.WebApp.onEvent("qrTextReceived", handlerQRText);
    (window as any).Telegram.WebApp.enableClosingConfirmation();

    return () => {
      (window as any).Telegram.WebApp.offEvent("qrTextReceived", handlerQRText);
      (window as any).Telegram.WebApp.disableClosingConfirmation();
    };
  }, []);
  // const [error, setError] = useState<null | string>(null);

  // const myProfile = useSelector(myTonBalanceSelector);

  // useEffect(() => {
  //   if (error) {
  //     if (errorBlockTimeoutRef.current) {
  //       clearTimeout(errorBlockTimeoutRef.current);
  //     }

  //     errorBlockTimeoutRef.current = setTimeout(() => {
  //       setError(null);
  //     }, 3000);
  //   }

  //   return () => {
  //     clearTimeout(errorBlockTimeoutRef.current);
  //     errorBlockTimeoutRef.current = undefined;
  //   };
  // }, [error]);

  return (
    <Panel>
      <Group space={24}>
        <Block padding={24}>
          <Cell
            // after={}
            before={
              <Avatar
                size={42}
                // fallbackName={currencyData?.currency.slice(0, 1)}
                src={
                  currentNft?.metadata.image
                  // currencyData.currency === "ton" ? ton : currencyData?.image
                }
              />
            }
          >
            <div style={{ display: "flex", gap: "6px", flexFlow: "column" }}>
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--color_primary_color)"}
                style={{ textTransform: "uppercase" }}
              >
                {currentNft?.metadata.name}
              </Text>
            </div>
          </Cell>
        </Block>
        <Group space={12}>
          <Input
            placeholder={t("Enter receiver address") as string}
            after={
              <QRCopy17OutlineIcon
                style={{ cursor: "pointer" }}
                color="var(--accent)"
                onClick={openQRScanner}
              />
            }
            value={formData.to_address}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                to_address: event?.currentTarget.value || "",
              })
            }
            disabled={isAwaitResponse}
          />
        </Group>
        <ErrorBlock
          text={`${t("Comission")} — 0.15 TON`}
          iconColor="var(--color_primary_color)"
          color="var(--background_block)"
          backgroundColor="transparent"
        />
        <Button
          size="m"
          mode="primary"
          disabled={isButtonDisabled}
          onClick={nftTransfer}
          before={isAwaitResponse ? <Date24OutlineIcon /> : null}
        >
          {isAwaitResponse ? `${t("Sending")}...` : t("Send")}
        </Button>
        {error ? <ErrorBlock text={errorMapping(error)} /> : null}
      </Group>
    </Panel>
  );
};
