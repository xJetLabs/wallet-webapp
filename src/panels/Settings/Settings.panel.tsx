import { useNavigate } from "react-router-dom";

import {
  Block,
  Cell,
  Group,
  Input,
  Link,
  Panel,
  Select,
  Text,
} from "../../components";

import { ReactComponent as GoArrow24OutlineIcon } from "../../icons/GoArrow24Outline.svg";
import { ReactComponent as AstralyxLogoIcon } from "../../icons/AstralyxLogo.svg";

import styles from "./Settings.module.css";
import { ROUTE_NAMES } from "../../router/constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { myServerData } from "../../store/reducers/user/user.selectors";

export function SettingsPanel() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const navigateToLanguageSelect = () => {
    try {
      window.navigator.vibrate(70); // Вибрация
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SETTINGS_LANGUAGE);
  };

  const navigateToCurrencySelect = () => {
    try {
      window.navigator.vibrate(70); // Вибрация
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SETTINGS_CURRENCY);
  };

  const myData = useSelector(myServerData);

  return (
    <Panel>
      <Group space={24}>
        <Group space={12}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            {t("Wallet")}
          </Text>

          <Input
            value={t("Language") as string}
            readonly
            after={
              <Select
                value={
                  i18n.language === "en"
                    ? t("English")
                    : i18n.language === "ru"
                    ? t("Russian")
                    : ""
                }
                onClick={navigateToLanguageSelect}
              />
            }
          />

          <Input
            value={t("Currency") as string}
            readonly
            after={
              <Select
                style={{ textTransform: "uppercase" }}
                value={myData.localCurrency}
                onClick={navigateToCurrencySelect}
              />
            }
          />
        </Group>

        <Group space={24}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            {t("OTHER")}
          </Text>
          <Link href="https://github.com/xJetLabs">
            <Cell
              after={<GoArrow24OutlineIcon color={"var(--accent)"} />}
              withCursor
            >
              Github
            </Cell>
          </Link>
          <Link href="https://xJetNews.t.me" target={"_self"}>
            <Cell
              after={<GoArrow24OutlineIcon color={"var(--accent)"} />}
              withCursor
            >
              {t("Channel")}
            </Cell>
          </Link>
          <Link href="https://teletype.in/@xjetswap/faq">
            <Cell
              after={<GoArrow24OutlineIcon color={"var(--accent)"} />}
              withCursor
            >
              F.A.Q.
            </Cell>
          </Link>
          <Link href="https://xJetSupportBot.t.me" target={"_self"}>
            <Cell
              after={<GoArrow24OutlineIcon color={"var(--accent)"} />}
              withCursor
            >
              {t("Support")}
            </Cell>
          </Link>
        </Group>

        <Group space={12}>
        <Link href="https://beta.redoubt.online/">
            <Block className={styles.__redoubt_info}>
              <Text weight={"600"} size={14} lineHeight={"17px"}>
                Data from
              </Text>
              <Text weight={"600"} size={18} lineHeight={"17px"} color={"var(--accent)"}>
                re:doubt
              </Text>
            </Block>
          </Link>

          <Link href="https://astralyx.dev/">
            <Block className={styles.__astalyx_info}>
              <Text weight={"600"} size={14} lineHeight={"17px"}>
                Powered by
              </Text>
              <AstralyxLogoIcon />
            </Block>
          </Link>
        </Group>
      </Group>
    </Panel>
  );
}
