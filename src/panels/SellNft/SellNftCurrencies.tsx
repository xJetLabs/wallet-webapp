import { useContext, useMemo, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Block, Cell, Group, Input, Panel, Text } from "../../components";
import { allCurrenciesSelector } from "../../store/reducers/user/user.selectors";
import { JetTokensContext } from "../../providers/JetTokensContextProvider";

import { ReactComponent as Search17Outline } from "../../icons/Search17Outline.svg";

export function SellNftCurrencies() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const allJetTokens = useSelector(allCurrenciesSelector);
  const { _, setJetToken }: any = useContext(JetTokensContext);

  const [filterValue, setFilterValue] = useState<string>("");

  const filtredJetTokens = useMemo(() => {
    return allJetTokens.filter((v: any) =>
      v?.name.toLowerCase().startsWith(filterValue.toLowerCase())
    );
  }, [filterValue, allJetTokens]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value || "";

    setFilterValue(newValue);
  }

  function changeCurrency(currency: string) {
    // Замыкание
    return () => {
      try {
        window.navigator.vibrate(70); // Вибрация
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }

      // Логика изменения токена
      setJetToken(currency);
      navigate(-1); // Возвращаемся назад
    };
  }

  return (
    <Panel>
      <Group space={12}>
        <Input
          placeholder="Search"
          after={<Search17Outline color="var(--accent)" />}
          onChange={onInputChange}
        />

        {filtredJetTokens.map((currency: any, index: any) => (
          <Block
            style={{ cursor: "pointer" }}
            padding={16}
            onClick={changeCurrency(currency)}
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
                  {currency.emoji}
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
