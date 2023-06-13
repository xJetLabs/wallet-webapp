import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { useTranslation } from "react-i18next";

import { Avatar, Group, Panel, Text } from "../../components";
import { getUserNFT } from "../../api";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { NFT } from "../../types";
import styles from "./Nft.module.css";

function NftPanelLoader() {
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
}

export function NftPanel() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const navigate = useNavigate();
  const myTonAddress = useSelector(myTonAddressSelector);
  const { t } = useTranslation();

  function navigateToDetail(to: string) {
    try {
      window.navigator.vibrate(70);
    } catch (error) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(to);
  }

  useEffect(() => {
    getUserNFT(myTonAddress).then((data) => {
      setNfts(data);
      setIsLoaded(true);
      // console.log(data);
    });
  }, [myTonAddress]);

  return (
    <Panel>
      <Group space={12}>
        {/* <Input
          placeholder="Search"
          after={<Search17OutlineIcon color="var(--accent)" />}
          disabled={!isLoaded}
        /> */}

        {!isLoaded ? (
          <NftPanelLoader />
        ) : (
          <div className={styles.__wrapper}>
            {nfts.length === 0 ? (
              <Text
                weight="600"
                size={14}
                lineHeight={"17px"}
                color="var(--accent)"
                style={{ margin: "0 auto" }}
              >
                {t("You don't have NFTs!")}
              </Text>
            ) : (
              nfts.map((nft, index) => (
                <Group
                  onClick={() => navigateToDetail(`/nft/${nft.address}`)}
                  key={index}
                  space={6}
                  className={styles.__block}
                >
                  <Avatar type="square" src={nft.metadata.image} size={166} />
                  <Text
                    weight="600"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--accent)"
                  >
                    {nft.metadata.name}
                  </Text>
                  <Text
                    weight="400"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--color_gray_color)"
                  >
                    {nft.metadata.description}
                  </Text>
                </Group>
              ))
            )}
          </div>
        )}
      </Group>
    </Panel>
  );
}
