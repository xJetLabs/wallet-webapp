import { ChangeEvent, FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Block,
  Cell,
  Group,
  Input,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as Search17Outline } from "../../icons/Search17Outline.svg";
import { useSelector } from "react-redux";
import { myAllBalancesSelector } from "../../store/reducers/user/user.selectors";
import { formatNumber } from "../../utils";

export const SelectTransferPanel: FC = () => {
  const [filterValue, setFilterValue] = useState("");

  const navigate = useNavigate();

  const allBalances = useSelector(myAllBalancesSelector);

  const filtredAllBalances = useMemo(() => {
    return allBalances.filter((v: any) =>
      v?.currency.toLowerCase().startsWith(filterValue.toLowerCase())
    );
  }, [filterValue, allBalances]);

  const onInputChange = (e: any) => {
    const newValue = e.currentTarget.value;

    setFilterValue(newValue || "");
  };

  console.log(filtredAllBalances, "filtredAllBalances");

  return (
    <Panel>
      <Group space={12}>
        <Input
          placeholder="Search"
          after={<Search17Outline color="var(--accent)" />}
          onChange={onInputChange}
        />
        {filtredAllBalances.map((v: any, i: any) => {
          return (
            <Block
              key={i}
              padding={12}
              onClick={() => {
                navigate("/send", {
                  state: {
                    currency: v.currency,
                  },
                });
              }}
            >
              <Cell
                before={
                  <Avatar fallbackName={v.currency.slice(0, 1)} size={42} />
                }
                after={
                  <Text
                    weight="600"
                    size={14}
                    lineHeight={"17px"}
                    color="var(--accent)"
                  >
                    {formatNumber(v.amount)} {v.currency.toUpperCase()}
                  </Text>
                }
              >
                {v.name}
              </Cell>
            </Block>
          );
        })}
      </Group>
    </Panel>
  );
};
