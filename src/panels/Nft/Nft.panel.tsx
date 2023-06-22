import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { useTranslation } from "react-i18next";

import { Avatar, Group, Panel, Text, Button } from "../../components";
import { getUserNFT } from "../../api";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { NFT } from "../../types";
import { ROUTE_NAMES } from "../../router/constants";
import styles from "./Nft.module.css";

import { ReactComponent as Receive24OutlineIcon } from "../../icons/Receive24Outline.svg";

import Lottie from 'lottie-react';
import animationData from '../../lotties/loading-plane.json';


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

  function handleImageError(e: any) {
    console.log("error", e);
  }

  useEffect(() => {
    getUserNFT(myTonAddress).then((data) => {
      setNfts(data);
      setIsLoaded(true);
    });
  }, [myTonAddress]);

  const navigateToReceive = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.RECEIVE);
  };

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
              <div> {/*TODO: Center*/}
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                />
                <Text
                  weight="600"
                  size={14}
                  lineHeight={"17px"}
                  color="var(--accent)"
                  style={{ margin: "0 auto" }}
                >
                  {t("You don't have any NFT. Try transferring it to your deposit wallet and it will show up here.")}
                </Text>
                <Button
                  stretched
                  before={<Receive24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToReceive}
                >
                  {t("Receive")}
                </Button>  {/*TODO: Center*/}
              </div>
            ) : (
              nfts.map((nft, index) => (
                <Group
                  onClick={() => {
                    let nftAddress = nft.address;
                    navigateToDetail(`/nft/${nftAddress}`);
                  }}
                  key={index}
                  space={6}
                  className={styles.__block}
                >
                  <Avatar
                    type="square"
                    src={nft.metadata.image ? nft.metadata.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/") : ''}
                    size={166}
                    fallbackName={t("Error")}
                  />
                  <Text
                    weight="600"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--accent)"
                    style={{ padding: 4 }}
                  >
                    {nft.metadata.name}
                  </Text>
                  <Text
                    weight="400"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--tg-theme-text-color)"
                    style={{ paddingInline: 4 }}
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
