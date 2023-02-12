import { FC } from "react";

import { Avatar, Group, Input, Panel, Text } from "../../components";

import { ReactComponent as Search17OutlineIcon } from "../../icons/Search17Outline.svg";

import styles from "./Nft.module.css";

export const NftPanel: FC = () => {
  return (
    <Panel>
      <Group space={12}>
        <Input
          placeholder="Search"
          after={<Search17OutlineIcon color="var(--accent)" />}
        />
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
      </Group>
    </Panel>
  );
};
