import { FC, useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { SwapDataContext } from "../../providers/SwapDataContextProvider";
import { initFiatPayment } from "../../api/methods";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppTitle,
  BlockHeader,
  Button,
  Group,
  Input,
  Panel,
  Select,
  Text,
} from "../../components";
import { Timeline } from "antd";
import { render } from "react-dom";
import { useTranslation } from "react-i18next";

export const PurchaseTonFirstStep: FC = () => {
  const navigate = useNavigate();
  const { setData, ...data }: any = useContext(SwapDataContext);
  const { selectedTokens } = data;
  const { t } = useTranslation();
  const { state } = useLocation();

  const renderStep = (step: string) => {
    return <Text size={16}>{step}</Text>;
  };
  const [paymentState, setPaymentState] = useState({
    renderSteps: [renderStep(t("Creating a payment") as string)],
    pendingStep: <Text size={16}>Waiting for details</Text>,
    paymentId: "",
    paymentUrl: "",
  });

  const wasPaid = () => {
    window.open(paymentState.paymentUrl, "_blank");
  };

  useEffect(() => {
    const initPayment = async () => {
      const payment = (await initFiatPayment(state.inAmount)).data;

      if (!("id" in payment)) throw new Error("No payment id");
      if (typeof payment.id != "string")
        throw new Error("Payment id is not a string");

      setPaymentState({
        renderSteps: [
          ...paymentState.renderSteps,
          renderStep(
            t("Waiting for details. Created payment with id ") + payment.id
          ),
        ],
        pendingStep: (
          <Group>
            <Text size={16}>
              Please pay {state.inAmount} {state.currency} using button below:
            </Text>
            <br />
          </Group>
        ),
        paymentId: payment.id,
        paymentUrl: payment.fiat_gateway,
      });
    };

    initPayment();
  }, [setPaymentState]);

  return (
    <Panel
      className={
        (window as any).Telegram.WebApp.colorScheme == "dark" ? "darktheme" : ""
      }
    >
      <AppTitle
        screenName={
          t("Fiat Exchange") +
          (paymentState.paymentId ? " – " + paymentState.paymentId : "")
        }
      ></AppTitle>{" "}
      <br />
      <Timeline
        pending={paymentState.pendingStep}
        reverse={false}
        style={{
          ...((window as any).Telegram.WebApp.colorScheme == "dark"
            ? { color: "white" }
            : {}),
          marginTop: "20px",
        }}
        items={paymentState.renderSteps.map((step, index) => {
          return {
            children: step,
          };
        })}
      />
      {document.body.innerText.indexOf(t("Waiting for details")) != -1 ? (
        <Group space={24}>
          <Button size="m" onClick={wasPaid}>
            {t("Open in browser")}
          </Button>
        </Group>
      ) : null}
    </Panel>
  );
};
