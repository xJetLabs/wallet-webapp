import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Avatar, Block, Cell, Group, Panel, Text } from "../../components";
import { updateSettings } from "../../api";

export function SelectLanguage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  function changeLanguage(lang: "ru" | "en") {
    // Замыкание
    return () => {
      try {
        window.navigator.vibrate(70); // Вибрация
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }

      // Отправляем запрос в API
      // При успешной отправке меняем язык в самом сайте и переходим на главную страницу
      updateSettings({ langCode: lang }).then(() => {
        i18n.changeLanguage(lang); // Меняем язык глобально
        navigate(-2); // Возвращаем в главное меню
      });
    };
  }

  return (
    <Panel>
      <Group space={12}>
        {/* <Input
          placeholder="Search"
          after={<Search17Outline color="var(--accent)" />}
          onChange={onInputChange}
        /> */}
        <Block padding={12} onClick={changeLanguage("ru")}>
          <Cell
            before={
              <Avatar
                size={42}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg"
                }
              />
            }
            after={
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                {t("Russian")}
              </Text>
            }
          />
        </Block>

        <Block padding={12} onClick={changeLanguage("en")}>
          <Cell
            before={
              <Avatar
                size={42}
                src={
                  "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                }
              />
            }
            after={
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                {t("English")}
              </Text>
            }
          />
        </Block>
      </Group>
    </Panel>
  );
}
