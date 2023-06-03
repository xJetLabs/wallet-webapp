import { useEffect, useState } from "react";

import styles from "./NftDetail.panel.module.css";
import { Avatar, Button, Text } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { getUserNFT } from "../../api";
import { NFT } from "../../types";
import { useSelector } from "react-redux";
import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { useTranslation } from "react-i18next";

export function NftDetailPanel() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentNft, setCurrentNtf] = useState<NFT>();
  const myTonAddress = useSelector(myTonAddressSelector);
  const { t } = useTranslation();

  const navigateToSendNtf = () => {
    try {
      window.navigator.vibrate(70);
    } catch (error) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(`/nft/${params.address}/send`);
  };

  useEffect(() => {
    getUserNFT(myTonAddress).then((data) => {
      const current = data.filter(
        (item: any) => item.address === params.address
      );
      setCurrentNtf(current[0]);
      setIsLoaded(true);
    });
  }, [params.address, myTonAddress]);

  if (!isLoaded) return <p>loading...</p>;

  return (
    <div className={styles.__wrapper}>
      <Avatar type="square" src={currentNft?.metadata.image} size={"100%"} />

      <Text weight="600" size={14} lineHeight={"17px"} color="var(--accent)">
        {currentNft?.metadata.name}
        <Text
          color="var(--color_black_color)"
          size={14}
          lineHeight={"17px"}
          style={{
            padding: "6px 12px",
            background: "var(--accent)",
            borderRadius: "9px",
            marginLeft: "12px",
          }}
        >
          NFT
        </Text>
      </Text>

      <Text
        weight="400"
        size={14}
        lineHeight={"17px"}
        color="var(--color_gray_color)"
        style={{ width: "100%" }}
      >
        {currentNft?.metadata.description}
      </Text>

      {currentNft?.collection && (
        <Text
          style={{ width: "100%" }}
          size={14}
          weight="400"
          color="var(--color_primary_color)"
        >
          {t("Collection")}{" "}
          <Text
            weight="600"
            size={14}
            lineHeight={"17px"}
            color="var(--accent)"
          >
            {currentNft.collection.name}
          </Text>
        </Text>
      )}

      <Button
        onClick={navigateToSendNtf}
        color="var(--color_black_color)"
        size="m"
        stretched
      >
        {t("Send")}
      </Button>
    </div>
  );
}
