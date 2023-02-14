import { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ContentLoader from "react-content-loader";

import {
  Avatar,
  Block,
  BlockHeader,
  Group,
  Link,
  Panel,
  RichCell,
  Separator,
} from "../../components";

import { ReactComponent as Text24OutlineIcon } from "../../icons/Text24Outline.svg";
import { ReactComponent as File24OutlineIcon } from "../../icons/File24Outline.svg";
import { ReactComponent as Program24OutlineIcon } from "../../icons/Program24Outline.svg";

import styles from "./MenuExpanded.module.css";

import menuData from "../../constants/menu.json";

interface CellData {
  title: string;
  cells: object[];
}

const MenuExpandedLoader: FC = () => {
  return (
    <>
      <Group space={24}>
        <ContentLoader
          speed={2}
          width="100%"
          height={17}
          backgroundColor="var(--background_block)"
          foregroundColor="var(--background_content)"
        >
          <rect x="0" y="0" rx="6" ry="6" width="100" height="17" />
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

export const MenuExpandedPanel: FC = () => {
  const { state } = useLocation();
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const [filtredData, setFiltredData] = useState<CellData>({
    title: "",
    cells: [],
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  useEffect(() => {
    if (!state.type) {
      return;
    }

    const neededContent: any = menuData.content.find(
      (v: any) => v.id === state.type
    );

    const filtred = neededContent || {};

    setFiltredData(filtred);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [state.type]);

  return (
    <Panel>
      <Group space={24}>
        {isLoaded ? (
          <BlockHeader className={styles.__block_header}>
            {filtredData?.title.toUpperCase()}
          </BlockHeader>
        ) : null}
        {!isLoaded ? (
          <MenuExpandedLoader />
        ) : (
          <div className={styles.block_content}>
            {filtredData.cells.map((cellData: any, index: number) => {
              const CellAvatar = getCellAvatar(cellData.type);
              const urlTarget = cellData.action?.startsWith("https://t.me/")
                ? "_self"
                : "_blank";

              return (
                <Link
                  href={cellData.action}
                  target={urlTarget}
                  className={styles.block_cell}
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
                  {index < filtredData.cells.length - 1 ? <Separator /> : null}
                </Link>
              );
            })}
          </div>
        )}
      </Group>
    </Panel>
  );
};
