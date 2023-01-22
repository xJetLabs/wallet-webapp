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
import { formatNumber } from "../../utils";

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
        receiverToken: data,
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
            {currencyData?.currency.toUpperCase()}
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
              const newValue = e?.currentTarget.value;

              setFormData({
                ...formData,
                amount: newValue || "",
              });
            }}
          />
        </Group>
        <Button
          size="m"
          mode="primary"
          onClick={() => {
            navigate("/send/success");
          }}
        >
          Send
        </Button>
      </Group>
    </Panel>
  );
};
