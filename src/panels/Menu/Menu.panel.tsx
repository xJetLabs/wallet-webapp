import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_NAMES } from "../../router/constants";

import {
  Avatar,
  BlockHeader,
  Button,
  Group,
  Panel,
  RichCell,
  Separator,
} from "../../components";

import { ReactComponent as History24OutlineIcon } from "../../icons/History24Outline.svg";
import { ReactComponent as Swap24OutlineIcon } from "../../icons/Swap24Outline.svg";
import { ReactComponent as Picture24OutlineIcon } from "../../icons/Picture24Outline.svg";
import { ReactComponent as Cheque24OutlineIcon } from "../../icons/Cheque24Outline.svg";
import { ReactComponent as Invoice24OutlineIcon } from "../../icons/Invoice24Outline.svg";
import { ReactComponent as Burn24OutlineIcon } from "../../icons/Burn24Outline.svg";
import { ReactComponent as Text24OutlineIcon } from "../../icons/Text24Outline.svg";
import { ReactComponent as File24OutlineIcon } from "../../icons/File24Outline.svg";
import { ReactComponent as Program24OutlineIcon } from "../../icons/Program24Outline.svg";

import styles from "./Menu.module.css";
import {
  SWAP_DATA_DEFAULT_STATE,
  SwapDataContext,
} from "../../providers/SwapDataContextProvider";

export const MenuPanel: FC = () => {
  const navigate = useNavigate();
  const { setData }: any = useContext(SwapDataContext);

  const navigateToHistory = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.HISTORY);
  };

  const navigateToNFT = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.NFT);
  };

  const navigateToExpandedMenu = (type: string) => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.MENU_EXPANDED, {
      state: {
        type,
      },
    });
  };

  const navigateToSwap = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SWAP);
  };

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setData(SWAP_DATA_DEFAULT_STATE);
  }, [setData]);

  return (
    <Panel>
      <Group space={24}>
        <Group space={12}>
          <div className={styles.button_group}>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<History24OutlineIcon />}
              onClick={navigateToHistory}
            >
              History
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Swap24OutlineIcon />}
              onClick={navigateToSwap}
            >
              Swap
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Picture24OutlineIcon />}
              onClick={navigateToNFT}
            >
              NFT
            </Button>
          </div>
          <div className={styles.button_group}>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Cheque24OutlineIcon />}
              disabled
            >
              Cheque
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Invoice24OutlineIcon />}
              disabled
            >
              Invoice
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Burn24OutlineIcon />}
              disabled
            >
              Buy
            </Button>
          </div>
        </Group>
        <Group space={12}>
          <BlockHeader
            after={
              <span
                className={styles.block_header_button}
                onClick={() => navigateToExpandedMenu("tutorials")}
              >
                View All
              </span>
            }
            className={styles.__block_header}
          >
            TUTORIALS
          </BlockHeader>
          <div className={styles.block_content}>
            <RichCell
              before={
                <Avatar
                  fallbackName={<Text24OutlineIcon />}
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
                  fallbackName={<Text24OutlineIcon />}
                  size={50}
                  type="square"
                />
              }
              description="Voting wallet for real DAO, based on xJetConnect"
              className={styles.block_cell}
              withCursor
            >
              How to make Invoices
            </RichCell>
          </div>
        </Group>
        <Group space={12}>
          <BlockHeader
            after={
              <span
                className={styles.block_header_button}
                onClick={() => navigateToExpandedMenu("news")}
              >
                View All
              </span>
            }
            className={styles.__block_header}
          >
            NEWS
          </BlockHeader>
          <div className={styles.block_content}>
            <RichCell
              before={
                <Avatar
                  fallbackName={<File24OutlineIcon />}
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
                  fallbackName={<File24OutlineIcon />}
                  size={50}
                  type="square"
                />
              }
              description="Voting wallet for real DAO, based on xJetConnect"
              className={styles.block_cell}
              withCursor
            >
              DAY 29. EXCHANGE JETTONS
            </RichCell>
            <Separator />
            <RichCell
              before={
                <Avatar
                  fallbackName={<File24OutlineIcon />}
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
          </div>
        </Group>
        <Group space={12}>
          <BlockHeader
            after={
              <span
                className={styles.block_header_button}
                onClick={() => navigateToExpandedMenu("apps")}
              >
                View All
              </span>
            }
            className={styles.__block_header}
          >
            APPS
          </BlockHeader>
          <div className={styles.block_content}>
            <RichCell
              before={
                <Avatar
                  src="https://www.flippies.art/penguins/Flipper1.png"
                  size={50}
                  type="square"
                />
              }
              description="Voting wallet for real DAO, based on xJetConnect"
              className={styles.block_cell}
              withCursor
            >
              DEVDAO WALLET
            </RichCell>
            <Separator />
            <RichCell
              before={
                <Avatar
                  src="https://www.flippies.art/penguins/Flipper1.png"
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
            <Separator />
            <RichCell
              before={
                <Avatar
                  fallbackName={<Program24OutlineIcon />}
                  size={50}
                  type="square"
                />
              }
              description="Voting wallet for real DAO, based on xJetConnect"
              className={styles.block_cell}
              withCursor
            >
              PAYC
            </RichCell>
          </div>
        </Group>
      </Group>
    </Panel>
  );
};
