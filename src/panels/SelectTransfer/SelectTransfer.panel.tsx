import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { formatNumber } from "../../utils";

import {
  Avatar,
  Block,
  Cell,
  Group,
  Input,
  Panel,
  Text,
} from "../../components";

import { aviableTransferBalancesSelector } from "../../store/reducers/user/user.selectors";

import { ReactComponent as Search17Outline } from "../../icons/Search17Outline.svg";

import ton from "../../images/ton.jpeg";

import * as amplitude from '@amplitude/analytics-browser';

export const SelectTransferPanel: FC = () => {
  const { t } = useTranslation();
  
  const [filterValue, setFilterValue] = useState<string>("");

  const navigate = useNavigate();

  const allBalances = useSelector(aviableTransferBalancesSelector);

  const filtredAllBalances = useMemo(() => {
    return allBalances.filter((v: any) =>
      v?.currency.toLowerCase().startsWith(filterValue.toLowerCase())
    );
  }, [filterValue, allBalances]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value || "";

    setFilterValue(newValue);
  };

  useEffect(() => {
    amplitude.track('SendPage.ChooseToken.Launched');
  });

  useEffect(() => {
    if ((window as any).Telegram.WebApp.MainButton.isVisible) {
      (window as any).Telegram.WebApp.MainButton.hide();
    }
  }, []);

  return (
    <Panel>
      <Group space={12}>
        <Input
          placeholder={`${t("Search")}...`}
          after={<Search17Outline color="var(--accent)" />}
          onChange={onInputChange}
        />
        {filtredAllBalances.map((v: any, i: any) => {
          if (!v) {
            return null;
          }

          const imageURL = v.currency === "ton" ? ton : v.image;

          return (
            <Block
              key={i}
              padding={12}
              onClick={() => {
                try {
                  window.navigator.vibrate(70);
                } catch (e) {
                  (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(
                    "light"
                  );
                }

                amplitude.track("SendPage.ChooseToken.Selected", {
                  token: v.currency,
                });
                navigate("/send", {
                  state: {
                    currency: v.currency,
                  },
                });
              }}
            >
              <Cell
                before={
                  <Avatar
                    fallbackName={v.currency.slice(0, 1)}
                    size={42}
                    src={imageURL}
                  />
                }
                after={
                  <Text
                    weight="600"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--accent)"
                  >
                    {formatNumber(v.amount)} {v.currency.toUpperCase()}
                  </Text>
                }
              >
                {v.name}
              </Cell>
            </Block>
          );
        })}
      </Group>
    </Panel>
  );
};
