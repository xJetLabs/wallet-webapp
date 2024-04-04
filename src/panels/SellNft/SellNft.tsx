import { ChangeEvent, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { errorMapping } from "../../utils";
import {
  Avatar,
  Block,
  Button,
  Cell,
  ErrorBlock,
  Group,
  Input,
  Panel,
  Select,
  Text,
} from "../../components";

import { ReactComponent as Date24OutlineIcon } from "../../icons/Date24Outline.svg";

import { myTonAddressSelector } from "../../store/reducers/user/user.selectors";
import { ROUTE_NAMES } from "../../router/constants";
import { getUserNFT, sellNft } from "../../api";
import { NFT } from "../../types";
import { JetTokensContext } from "../../providers/JetTokensContextProvider";

export function SellNftPanel() {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<{
    nft_address: string;
    currency: string;
    price: number;
  }>({
    nft_address: params.address || "",
    currency: "",
    price: 0,
  });
  const [isAwaitResponse, setIsAwaitResponse] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [currentNft, setCurrentNtf] = useState<NFT>();
  const myTonAddress = useSelector(myTonAddressSelector);
  const { jetToken }: any = useContext(JetTokensContext);

  const isButtonDisabled =
    !formData.nft_address || !formData.currency || !formData.price;

  function navigateToCurrencySelect() {
    try {
      window.navigator.vibrate(70); // Вибрация
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SELL_NFT_SELECTCURRENCY);
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, currency: jetToken.symbol }));
  }, [jetToken.symbol]);

  useEffect(() => {
    getUserNFT(myTonAddress).then((data) => {
      const current = data.filter(
        (item: any) => item.address === params.address
      );
      setCurrentNtf(current[0]);
    });
  }, [params.address, myTonAddress]);

  async function nftSell() {
    // Включаем состояние загрузки
    setIsAwaitResponse(true);

    // Отпарвляем запрос в API с данными
    const response: any = await sellNft({ payload: formData }).finally(() => {
      // При успешной отправке завершаем загрузку
      setIsAwaitResponse(false);
    });

    if (response.data?.success) {
      // Редиректим юзера в старницу "Success" с данными текущего NFT
      navigate(ROUTE_NAMES.SELL_NFT_SUCCESS, {
        state: { ...formData, nftName: currentNft?.metadata.name },
      });
    } else if (response?.response?.data?.error || response?.data?.error) {
      try {
        window.navigator.vibrate(200); // Вибрация
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      }

      // Присваиваем ошибку в состояние error
      setError(response?.response?.data?.error || response?.data?.error);
    }

    // Отключаем загрузку
    setIsAwaitResponse(false);
  }

  return (
    <Panel>
      <Group space={24}>
        <Block padding={24}>
          <Cell before={<Avatar size={42} src={currentNft?.metadata.image} />}>
            <div style={{ display: "flex", gap: "6px", flexFlow: "column" }}>
              <Text
                weight={"600"}
                size={14}
                lineHeight={"17px"}
                color={"var(--color_primary_color)"}
                style={{ textTransform: "uppercase" }}
              >
                {currentNft?.metadata.name}
              </Text>
            </div>
          </Cell>
        </Block>

        <Group space={12}>
          <Input
            placeholder={t("Amount") as string}
            inputMode="numeric"
            after={
              <Select
                style={{ textTransform: "uppercase" }}
                value={jetToken.name}
                onClick={navigateToCurrencySelect}
              />
            }
            disabled={isAwaitResponse}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }));
            }}
          />
        </Group>

        <ErrorBlock
          text={`${t("Comission")} — 0.05 TON`}
          iconColor="var(--color_primary_color)"
          color="var(--background_block)"
          backgroundColor="transparent"
        />
        <Button
          size="m"
          mode="primary"
          disabled={isButtonDisabled}
          onClick={nftSell}
          before={isAwaitResponse ? <Date24OutlineIcon /> : null}
        >
          {isAwaitResponse ? `${t("Selling")}...` : t("Sell")}
        </Button>
        {error ? <ErrorBlock text={errorMapping(error)} /> : null}
      </Group>
    </Panel>
  );
}
