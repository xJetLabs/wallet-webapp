import { FC } from "react";

import {
  Block,
  Cell,
  Group,
  Link,
  Panel,
  Switch,
  Text,
} from "../../components";

import { ReactComponent as GoArrow24OutlineIcon } from "../../icons/GoArrow24Outline.svg";
import { ReactComponent as AstralyxLogoIcon } from "../../icons/AstralyxLogo.svg";

import styles from "./Settings.module.css";

export const SettingsPanel: FC = () => {
  return (
    <Panel>
      <Group space={24}>
        <Group space={24}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            WALLET
          </Text>
          <Cell after={<Switch />}>Static theme</Cell>
        </Group>
        <Group space={24}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            JETTONS
          </Text>
          <Cell after={<Switch />}>Show unverified</Cell>
        </Group>
        <Group space={24}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            OTHER
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
              Channel
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
              Support
            </Cell>
          </Link>
        </Group>
        <Link href="https://astralyx.dev/">
          <Block className={styles.__astalyx_info}>
            <Text weight={"600"} size={14} lineHeight={"17px"}>
              Powered by
            </Text>
            <AstralyxLogoIcon />
          </Block>
        </Link>
      </Group>
    </Panel>
  );
};
