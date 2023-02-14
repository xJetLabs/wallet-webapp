import { FC, useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";

import { Avatar, Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Search17OutlineIcon } from "../../icons/Search17Outline.svg";

import styles from "./Nft.module.css";

const NftPanelLoader: FC = () => {
  return (
    <div className={styles.__wrapper}>
      <ContentLoader
        className={styles.__block}
        height={212}
        backgroundColor="var(--background_block)"
        foregroundColor="var(--background_content)"
        speed={2}
      >
        <rect x="0" y="0" rx="18" ry="18" width="100%" height="160" />
        <rect x="0" y="172" rx="6" ry="6" width="100" height="17" />
        <rect x="0" y="195" rx="6" ry="6" width="50" height="17" />
      </ContentLoader>
      <ContentLoader
        className={styles.__block}
        height={212}
        backgroundColor="var(--background_block)"
        foregroundColor="var(--background_content)"
        speed={2}
      >
        <rect x="0" y="0" rx="18" ry="18" width="100%" height="160" />
        <rect x="0" y="172" rx="6" ry="6" width="100" height="17" />
        <rect x="0" y="195" rx="6" ry="6" width="50" height="17" />
      </ContentLoader>
      <ContentLoader
        className={styles.__block}
        height={212}
        backgroundColor="var(--background_block)"
        foregroundColor="var(--background_content)"
        speed={2}
      >
        <rect x="0" y="0" rx="18" ry="18" width="100%" height="160" />
        <rect x="0" y="172" rx="6" ry="6" width="100" height="17" />
        <rect x="0" y="195" rx="6" ry="6" width="50" height="17" />
      </ContentLoader>
    </div>
  );
};

export const NftPanel: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Panel>
      <Group space={12}>
        <Input
          placeholder="Search"
          after={<Search17OutlineIcon color="var(--accent)" />}
          disabled={!isLoaded}
        />
        {!isLoaded ? (
          <NftPanelLoader />
        ) : (
          <div className={styles.__wrapper}>
            <Group space={6} className={styles.__block}>
              <Avatar
                type="square"
                src="https://www.flippies.art/penguins/Flipper1.png"
                size={166}
              />
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                NFT NAME #21412
              </Text>
              <Text
                weight="400"
                size={14}
                lineHeight={"17px"}
                color="var(--color_gray_color)"
              >
                Small description of this item
              </Text>
            </Group>
            <Group space={6} className={styles.__block}>
              <Avatar
                type="square"
                src="https://www.flippies.art/penguins/Flipper1.png"
                size={166}
              />
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                NFT NAME #21412
              </Text>
              <Text
                weight="400"
                size={14}
                lineHeight={"17px"}
                color="var(--color_gray_color)"
              >
                Small description of this item
              </Text>
            </Group>
            <Group space={6} className={styles.__block}>
              <Avatar
                type="square"
                src="https://www.flippies.art/penguins/Flipper1.png"
                size={166}
              />
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                NFT NAME #21412
              </Text>
              <Text
                weight="400"
                size={14}
                lineHeight={"17px"}
                color="var(--color_gray_color)"
              >
                Small description of this item
              </Text>
            </Group>
            <Group space={6} className={styles.__block}>
              <Avatar
                type="square"
                src="https://www.flippies.art/penguins/Flipper1.png"
                size={166}
              />
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                NFT NAME #21412
              </Text>
              <Text
                weight="400"
                size={14}
                lineHeight={"17px"}
                color="var(--color_gray_color)"
              >
                Small description of this item
              </Text>
            </Group>
            <Group space={6} className={styles.__block}>
              <Avatar
                type="square"
                src="https://www.flippies.art/penguins/Flipper1.png"
                size={166}
              />
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
              >
                NFT NAME #21412
              </Text>
              <Text
                weight="400"
                size={14}
                lineHeight={"17px"}
                color="var(--color_gray_color)"
              >
                Small description of this item
              </Text>
            </Group>
          </div>
        )}
      </Group>
    </Panel>
  );
};
