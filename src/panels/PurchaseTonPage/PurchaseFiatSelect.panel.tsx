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
import { all } from "axios";
import { ReactComponent as BankCard } from "../../icons/BankCard.svg";

export const PurchaseFiatSelect: FC = () => {
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
      result.push({
        symbol: current.base_symbol?.toLowerCase(),
        image: current.image,
       });
      return result;
    },
    []
  );

  const tokenSelected = (currency: string) => {
    setData((prev: any) => ({
      ...prev,
      selectedTokens: {
        ...prev.selectedTokens,
        [position]: currency,
        priceInTon: 0,
      },
    }));

    navigate(-1);
  };

  return (
    <Panel>
      <Group space={12}>
        <Input placeholder="Search" after={<Search17OutlineIcon />} />
        {tokensToRender.map((v: any, index: number) => {
          const src = v.image;
          return (
            <Block padding={12}>
              <Cell
                key={index}
                before={
                  <BankCard width={42} height={42} />
                }
                onClick={() =>
                  tokenSelected(v.symbol?.toUpperCase())
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
