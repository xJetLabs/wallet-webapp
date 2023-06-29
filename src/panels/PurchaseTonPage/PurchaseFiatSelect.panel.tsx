import { FC, useContext } from "react";

import { SwapDataContext } from "../../providers/SwapDataContextProvider";

import {
  Block,
  Cell,
  Group,
  Input,
  Panel,
} from "../../components";

import { ReactComponent as Search17OutlineIcon } from "../../icons/Search17Outline.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BankCard } from "../../icons/BankCard.svg";

export const PurchaseFiatSelect: FC = () => {
  const { setData, allTokens }: any =
    useContext(SwapDataContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { position } = state;

  const tokensToRender = allTokens.reduce(
    (result: object[], current: any) => {
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
