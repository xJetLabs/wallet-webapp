import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Block,
  Button,
  Cell,
  Group,
  Input,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as QRCopy17OutlineIcon } from "../../icons/QRCopy17Outline.svg";

// FIXME:
import { useSelector } from "react-redux";
import { currencyDataSelector } from "../../store/reducers/user/user.selectors";
import { countCharts, formatNumber } from "../../utils";
import { sendCoins } from "../../api";

export const SendPanel: FC = () => {
  const [formData, setFormData] = useState({
    receiverToken: "",
    amount: "",
  });

  const { state: locationState }: { state: any } = useLocation();

  const currencyData = useSelector((state) =>
    currencyDataSelector(state, locationState.currency)
  );

  const navigate = useNavigate();

  const openQRScanner = () => {
    (window as any).showQRScanner();
  };

  useEffect(() => {
    const handlerQRText = ({ data }: { data: string }) => {
      setFormData((prev) => ({
        ...prev,
        receiverToken: data.split("ton://transfer/")[1],
      }));

      (window as any).Telegram.WebApp.closeScanQrPopup();
    };

    (window as any).Telegram.WebApp.onEvent("qrTextReceived", handlerQRText);

    return () => {
      (window as any).Telegram.WebApp.offEvent("qrTextReceived", handlerQRText);
    };
  }, []);

  const selectMaxAmount = () => {
    setFormData({
      ...formData,
      amount: formatNumber(currencyData?.amount || 0) || "",
    });
  };

  const withdraw = async () => {
    const payload = {
      ton_address: formData.receiverToken,
      amount: Number(formData.amount),
      currency: locationState.currency,
    };

    const response: any = await sendCoins({
      payload,
    });

    console.log("response", response);

    if (response?.data && !response?.data.error) {
      navigate("/send/success");
    }
  };

  return (
    <Panel>
      <Group space={24}>
        <Block padding={24}>
          <Cell
            after={
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--accent)"}
              >
                {formatNumber(currencyData?.amount)}{" "}
                {currencyData?.currency.toUpperCase()}
              </Text>
            }
            before={
              <Avatar
                size={42}
                fallbackName={currencyData?.currency.slice(0, 1)}
              />
            }
          >
            {currencyData?.name}
          </Cell>
        </Block>
        <Group space={12}>
          <Input
            placeholder="Enter receiver address"
            after={
              <QRCopy17OutlineIcon
                style={{ cursor: "pointer" }}
                color="var(--accent)"
                onClick={openQRScanner}
              />
            }
            value={formData.receiverToken}
            onChange={(e) => {
              const newValue = e?.currentTarget.value;

              setFormData({
                ...formData,
                receiverToken: newValue || "",
              });
            }}
          />
          <Input
            placeholder="Amount"
            after={
              <div onClick={selectMaxAmount}>
                <Text
                  weight={"600"}
                  size={14}
                  lineHeight={"17px"}
                  color={"var(--accent)"}
                  style={{ cursor: "pointer" }}
                >
                  Max
                </Text>
              </div>
            }
            value={formData.amount}
            onChange={(e) => {
              let newValue = (e?.currentTarget.value || "").replace(
                /[^\d.-]+/g,
                ""
              );

              if (countCharts(newValue || "", ".") > 1) {
                return;
              }

              if (countCharts(newValue || "", ".") === 1) {
                const chartsAfterDot = newValue.split(".")[1];

                if (chartsAfterDot.length > 3) {
                  return;
                }
              }

              if (Number(newValue) > currencyData?.amount) {
                newValue = formatNumber(currencyData?.amount);
              }

              setFormData({
                ...formData,
                amount: newValue,
              });
            }}
          />
        </Group>
        <Button size="m" mode="primary" onClick={withdraw}>
          Send
        </Button>
      </Group>
    </Panel>
  );
};
