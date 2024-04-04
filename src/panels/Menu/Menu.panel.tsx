import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { useTranslation } from "react-i18next";

import { ROUTE_NAMES } from "../../router/constants";

import * as amplitude from '@amplitude/analytics-browser';

import {
  Avatar,
  Block,
  BlockHeader,
  Button,
  Group,
  Link,
  Panel,
  RichCell,
  Separator,
} from "../../components";

import { ReactComponent as History24OutlineIcon } from "../../icons/History24Outline.svg";
import { ReactComponent as Swap24OutlineIcon } from "../../icons/Swap24Outline.svg";
import { ReactComponent as Picture24OutlineIcon } from "../../icons/Picture24Outline.svg";
import { ReactComponent as Text24OutlineIcon } from "../../icons/Text24Outline.svg";
import { ReactComponent as File24OutlineIcon } from "../../icons/File24Outline.svg";
import { ReactComponent as Program24OutlineIcon } from "../../icons/Program24Outline.svg";

import styles from "./Menu.module.css";
import {
  SWAP_DATA_DEFAULT_STATE,
  SwapDataContext,
} from "../../providers/SwapDataContextProvider";

import menuData from "../../constants/menu.json";

interface CellData {
  id: string;
  title: string;
  cells: object[];
}

const MenuLoader: FC = () => {
  return (
    <>
      <Group space={12}>
        <ContentLoader
          speed={2}
          width="100%"
          height={17}
          backgroundColor="var(--background_block)"
          foregroundColor="var(--background_content)"
        >
          <rect x="12" y="0" rx="6" ry="6" width="100" height="17" />
        </ContentLoader>
        <div className={styles.block_content}>
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
          <Separator />
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
          <Separator />
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
        </div>
      </Group>
      <Group space={12}>
        <ContentLoader
          speed={2}
          width="100%"
          height={17}
          backgroundColor="var(--background_block)"
          foregroundColor="var(--background_content)"
        >
          <rect x="12" y="0" rx="6" ry="6" width="100" height="17" />
        </ContentLoader>
        <div className={styles.block_content}>
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
          <Separator />
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
          <Separator />
          <Block padding={12} className={styles.block_cell}>
            <ContentLoader
              speed={2}
              width="100%"
              height={50}
              backgroundColor="var(--background_content)"
              foregroundColor="var(--background_block)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="50" height="50" />
              <rect x="62" y="0" rx="6" ry="6" width="160" height="15" />
              <rect x="62" y="21" rx="6" ry="6" width="200" height="15" />
            </ContentLoader>
          </Block>
        </div>
      </Group>
    </>
  );
};

export const MenuPanel: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setData }: any = useContext(SwapDataContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [filtredData, setFiltredData] = useState<CellData[]>([]);

  const navigateToHistory = () => {
    amplitude.track("MenuPage.HistoryButton.Pushed");
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.HISTORY);
  };

  const navigateToNFT = () => {
    amplitude.track("MenuPage.NFTButton.Pushed");
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.NFT);
  };

  const navigateToSwap = () => {
    amplitude.track("MenuPage.SwapButton.Pushed");
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SWAP_SELECT);
  };

  const navigateToPurchaseTon = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.BUY_TON);
  };

  const navigateToExpandedMenu = (type: string) => {
    amplitude.track("MenuPage.ExpandButton.Pushed");
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

  useEffect(() => {
    amplitude.track("MenuPage.Launched");
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setData(SWAP_DATA_DEFAULT_STATE);
  }, [setData]);

  useEffect(() => {
    const filtred = menuData.content.reduce((result: any, current: any) => {
      const cellsFiltred = current.cells.slice(0, current.showedOnMainScreen);

      result.push({
        id: current.id,
        title: current.title,
        cells: cellsFiltred || [],
      });

      return result;
    }, []);

    setFiltredData(filtred);
    setIsLoaded(true);
  }, []);

  const getCellAvatar = (type: string) => {
    if (type === "text") {
      return <Text24OutlineIcon />;
    }

    if (type === "file") {
      return <File24OutlineIcon />;
    }

    if (type === "program") {
      return <Program24OutlineIcon />;
    }
  };

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
              {t("History")}
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Swap24OutlineIcon />}
              onClick={navigateToSwap}
            >
              {t("Swap")}
            </Button>
            <Button
              stretched
              mode={"secondary_with_accent_text"}
              before={<Picture24OutlineIcon />}
              onClick={navigateToNFT}
            >
              {t("NFT")}
            </Button>
          </div>
        </Group>
        {!isLoaded ? (
          <MenuLoader />
        ) : (
          filtredData.map((tabData: CellData, index: number) => {
            return (
              <Group space={12} key={index}>
                <BlockHeader
                  after={
                    <span
                      className={styles.block_header_button}
                      onClick={() => navigateToExpandedMenu(tabData.id)}
                    >
                      {t("Show all")}
                    </span>
                  }
                  className={styles.__block_header}
                >
                  {tabData.title.toUpperCase()}
                </BlockHeader>
                <div className={styles.block_content}>
                  {tabData.cells.map((cellData: any, index: number) => {
                    const CellAvatar = getCellAvatar(cellData.type);
                    const urlTarget = cellData.action?.startsWith(
                      "https://t.me/"
                    )
                      ? "_self"
                      : "_blank";

                    return (
                      <Link
                        key={index}
                        href={cellData.action}
                        target={urlTarget}
                        className={styles.block_cell}
                        onClick={() => {
                          amplitude.track("MenuPage.MenuCell.Pushed", {
                            cellTitle: cellData.title,
                          })
                        }}
                      >
                        <RichCell
                          before={
                            <Avatar
                              fallbackName={CellAvatar}
                              size={50}
                              type="square"
                              src={cellData.imageUrl}
                            />
                          }
                          description={
                            <span className={styles.block_cell_description}>
                              {cellData.subtitle}
                            </span>
                          }
                          withCursor
                        >
                          <span className={styles.block_cell_title}>
                            {cellData.title}
                          </span>
                        </RichCell>
                        {index < tabData.cells.length - 1 ? (
                          <Separator />
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </Group>
            );
          })
        )}
      </Group>
    </Panel>
  );
};
