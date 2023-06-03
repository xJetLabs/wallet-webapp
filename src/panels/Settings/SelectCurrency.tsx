import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Avatar, Block, Cell, Group, Panel, Text } from "../../components";
import { updateSettings } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers";
import { myServerData } from "../../store/reducers/user/user.selectors";

export function SelectCurrency() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const myData = useSelector(myServerData);

  const allCurrencies = [
    {
      name: "usd",
      symbol: "$",
    },
    {
      name: "rub",
      symbol: "₽",
    },
    {
      name: "cny",
      symbol: "¥",
    },
    {
      name: "uah",
      symbol: "₴",
    },
    {
      name: "kzt",
      symbol: "₸",
    },
    {
      name: "eur",
      symbol: "€",
    },
    {
      name: "gbp",
      symbol: "£",
    },
  ];

  function changeCurrency(currency: string) {
    // Замыкание
    return () => {
      try {
        window.navigator.vibrate(70); // Вибрация
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }

      // Логика изменения валюты глобально
      updateSettings({ langCode: i18n.language, currency }).then(() => {
        dispatch(
          userActions.setServerData({
            ...myData,
            localCurrency: currency,
            lang_code: i18n.language,
          })
        );
      });
      navigate(-2); // Возвращаем в главное меню
    };
  }

  return (
    <Panel>
      <Group space={12}>
        {allCurrencies.map((currency, index) => (
          <Block
            style={{ cursor: "pointer" }}
            padding={16}
            onClick={changeCurrency(currency.name)}
            key={index}
          >
            <Cell
              before={
                <Text
                  weight="600"
                  size={24}
                  lineHeight={"17px"}
                  color="var(--accent)"
                >
                  {currency.symbol}
                </Text>
              }
              after={
                <Text
                  weight="600"
                  size={14}
                  lineHeight={"17px"}
                  color="var(--accent)"
                  style={{ textTransform: "uppercase" }}
                >
                  {t(currency.name)}
                </Text>
              }
            />
          </Block>
        ))}
      </Group>
    </Panel>
  );
}
