import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppTitle,
  Block,
  Button,
  Cell,
  Group,
  Link,
  Panel,
  PanelHeader,
  Text,
} from "../../components";

import { ReactComponent as Back24OutlineIcon } from "../../icons/Back24Outline.svg";
import { ReactComponent as GoArrow24OutlineIcon } from "../../icons/GoArrow24Outline.svg";
import { ReactComponent as AstralyxLogoIcon } from "../../icons/AstralyxLogo.svg";

import styles from "./Settings.module.css";

export const SettingsPanel: FC = () => {
  const navigate = useNavigate();

  return (
    <Panel
      header={
        <PanelHeader
          before={
            <Button
              mode={"transparent_with_accent_text"}
              before={<Back24OutlineIcon />}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          after
        >
          <AppTitle screenName="Settings" />
        </PanelHeader>
      }
    >
      <Group space={24}>
        <Group space={24}>
          <Text
            weight={"600"}
            size={14}
            lineHeight={"17px"}
            color={"var(--accent)"}
          >
            JETTONS
          </Text>
          <Cell>Show unverified</Cell>
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
          <Link href="https://github.com/">
            <Cell after={<GoArrow24OutlineIcon />} withCursor>
              Github
            </Cell>
          </Link>
          <Link href="https://mikhailmat_dev.t.me/">
            <Cell after={<GoArrow24OutlineIcon />} withCursor>
              Channel
            </Cell>
          </Link>
          <Link href="https://faq.t.me/">
            <Cell after={<GoArrow24OutlineIcon />} withCursor>
              F.A.Q.
            </Cell>
          </Link>
          <Link href="https://support.t.me/">
            <Cell after={<GoArrow24OutlineIcon />} withCursor>
              Support
            </Cell>
          </Link>
        </Group>
        <Block className={styles.__astalyx_info}>
          <Text weight={"600"} size={14} lineHeight={"17px"}>
            Powered by
          </Text>
          <AstralyxLogoIcon />
        </Block>
      </Group>
    </Panel>
  );
};
