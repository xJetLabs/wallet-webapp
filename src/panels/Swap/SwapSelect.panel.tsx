import { FC, useContext } from "react";

import { SwapDataContext } from "../../providers/SwapDataContextProvider";

import {
  Avatar,
  Block,
  Cell,
  Group,
  Input,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as Search17OutlineIcon } from "../../icons/Search17Outline.svg";
import ton from "../../images/ton.jpeg";

import { useSelector } from "react-redux";
import { allCurrenciesSelector } from "../../store/reducers/user/user.selectors";
import { formatNumber } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";

export const SwapSelect: FC = () => {
  const { setData, allTokens, selectedTokens }: any =
    useContext(SwapDataContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { position } = state;

  const invertPositions: any = {
    first: "second",
    second: "first",
  };

  const allJetTokens = useSelector(allCurrenciesSelector);

  const tokensToRender = allTokens.reduce(
    (result: object[], current: any, index: number) => {
      const jetToken = allJetTokens.find(
        (v: any) =>
          v.symbol?.toLowerCase() === current.base_symbol?.toLowerCase()
      );

      if (
        index === 0 &&
        selectedTokens[invertPositions[position]] !== "TON" &&
        selectedTokens[position] !== "TON"
      ) {
        const tonData = allJetTokens.find(
          (v: any) => v.symbol?.toLowerCase() === "ton"
        );

        result.push(tonData);
      }

      if (
        typeof jetToken !== "undefined" &&
        selectedTokens[invertPositions[position]] !==
          jetToken.symbol?.toUpperCase() &&
        selectedTokens[position] !== jetToken.symbol?.toUpperCase() &&
        current?.quote_symbol === "JTON"
      ) {
        result.push({ ...jetToken, ...current });
      }

      return result;
    },
    []
  );

  const tokenSelected = (currency: string, lastPrice: number) => {
    setData((prev: any) => ({
      ...prev,
      selectedTokens: {
        ...prev.selectedTokens,
        [position]: currency,
        priceInTon: lastPrice,
      },
    }));

    navigate(-1);
  };

  return (
    <Panel>
      <Group space={12}>
        <Input placeholder="Search" after={<Search17OutlineIcon />} />
        {tokensToRender.map((v: any, index: number) => {
          const src = v.symbol === "ton" ? ton : v?.image;

          return (
            <Block padding={12}>
              <Cell
                key={index}
                before={
                  <Avatar
                    size={42}
                    fallbackName={v?.currency?.split(0, 1)}
                    src={src}
                  />
                }
                after={
                  v.symbol !== "ton" ? (
                    <Text
                      weight="600"
                      size={14}
                      lineHeight={"17px"}
                      color="var(--accent)"
                    >
                      {formatNumber(Number(v.quote_volume))}{" "}
                      {v.symbol?.toUpperCase()}
                    </Text>
                  ) : null
                }
                onClick={() =>
                  tokenSelected(v.symbol?.toUpperCase(), Number(v.last_price))
                }
              >
                {v?.symbol?.toUpperCase()}
              </Cell>
            </Block>
          );
        })}
      </Group>
    </Panel>
  );
};
