import { FC, useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  BlockHeader,
  Group,
  Panel,
  RichCell,
  Separator,
} from "../../components";

import { ReactComponent as Text24OutlineIcon } from "../../icons/Text24Outline.svg";
import { ReactComponent as File24OutlineIcon } from "../../icons/File24Outline.svg";
import { ReactComponent as Program24OutlineIcon } from "../../icons/Program24Outline.svg";

import styles from "./MenuExpanded.module.css";

export const MenuExpandedPanel: FC = () => {
  const { state } = useLocation();

  const MenuItemFallbackIcon = useMemo(() => {
    if (state.type === "tutorials") {
      return <Text24OutlineIcon />;
    }

    if (state.type === "news") {
      return <File24OutlineIcon />;
    }

    if (state.type === "apps") {
      return <Program24OutlineIcon />;
    }

    return null;
  }, [state]);

  return (
    <Panel>
      <Group space={24}>
        <BlockHeader>{state.type.toUpperCase()}</BlockHeader>
        <div className={styles.block_content}>
          <RichCell
            before={
              <Avatar
                fallbackName={MenuItemFallbackIcon}
                size={50}
                type="square"
              />
            }
            description="Voting wallet for real DAO, based on xJetConnect"
            className={styles.block_cell}
            withCursor
          >
            How to make Cheques
          </RichCell>
          <Separator />
          <RichCell
            before={
              <Avatar
                fallbackName={MenuItemFallbackIcon}
                size={50}
                type="square"
              />
            }
            description="Voting wallet for real DAO, based on xJetConnect"
            className={styles.block_cell}
            withCursor
          >
            DAY 32. BUY TONCOIN IN APP
          </RichCell>
          <Separator />
          <RichCell
            before={
              <Avatar
                fallbackName={MenuItemFallbackIcon}
                size={50}
                type="square"
              />
            }
            description="Voting wallet for real DAO, based on xJetConnect"
            className={styles.block_cell}
            withCursor
          >
            How to make fires
          </RichCell>
          <Separator />
          <RichCell
            before={
              <Avatar
                fallbackName={MenuItemFallbackIcon}
                size={50}
                type="square"
              />
            }
            description="Voting wallet for real DAO, based on xJetConnect"
            className={styles.block_cell}
            withCursor
          >
            DAY 21. VISUAL UPDATE
          </RichCell>
          <Separator />
          <RichCell
            before={
              <Avatar
                fallbackName={MenuItemFallbackIcon}
                size={50}
                type="square"
              />
            }
            description="Voting wallet for real DAO, based on xJetConnect"
            className={styles.block_cell}
            withCursor
          >
            TONCAP
          </RichCell>
        </div>
      </Group>
    </Panel>
  );
};
