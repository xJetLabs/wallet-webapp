import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Block, Cell, Group, Panel, Text } from "../../components";
import { useSelector } from "react-redux";
import { exhangesPair } from "../../store/reducers/user/user.selectors";
import { useExchangePairContext } from "../../providers/ExchangePairContextProvider";
import { ROUTE_NAMES } from "../../router/constants";

export function TradingSelectPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const exchangesPair = useSelector(exhangesPair);
  const { updateSelectedExchangePair } = useExchangePairContext();

  function changeExchagePair(exchangePair: any) {
    try {
      window.navigator.vibrate(70); // Вибрация
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    } finally {
      updateSelectedExchangePair(exchangePair);
      navigate(
        ROUTE_NAMES.SWAP +
          "?pair=" +
          exchangePair.assets[0] +
          "_" +
          exchangePair.assets[1]
      );
    }
  }

  return (
    <Panel>
      <Group space={12}>
        {exchangesPair?.map((item: any, index: number) => {
          if (item.active) {
            return (
              <Block
                key={index}
                style={{ cursor: "pointer" }}
                padding={12}
                onClick={() => {
                  changeExchagePair(item);
                }}
              >
                <Cell
                  before={
                    <Text
                      weight="600"
                      size={16}
                      lineHeight={"17px"}
                      style={{ textTransform: "uppercase" }}
                    >
                      <span style={{ color: "var(--tg-theme-text-color)" }}>
                        {t(item.assets[0])}
                      </span>
                      <span style={{ color: "var(--tg-theme-button-color)" }}>
                        /{t(item.assets[1])}
                      </span>
                    </Text>
                  }
                  after={
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        gap: "2px",
                      }}
                    >
                      <Text
                        weight="500"
                        size={14}
                        lineHeight={"17px"}
                        color="var(--color_primary_color)"
                      >
                        {item.trading_data.avg_price}
                      </Text>
                      <Text
                        weight="400"
                        size={12}
                        lineHeight={"17px"}
                        color="#29B77F"
                      >
                        +
                        {Number(item.trading_data.change_24h).toFixed(2) + " %"}
                      </Text>
                    </div>
                  }
                />
              </Block>
            );
          }
          return <></>;
        })}
      </Group>
    </Panel>
  );
}
