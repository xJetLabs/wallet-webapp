import { FC, ReactNode, createContext, useState, useContext } from "react";

export const ExchangePair = createContext({});

export function useExchangePairContext(): any {
  return useContext(ExchangePair);
}

const initialState = {
  id: "647f771d6103be25ab2befb5",
  assets: ["exc", "ton"],
  providers: {
    dedust: {
      pool: "",
      fee: 0,
      reserves: ["", ""],
      cache_expire: 0,
    },
  },
  active: true,
  trading_data: {
    change_24h: 0,
    avg_price: 0,
  },
};

export const ExchangePairContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedExchangePair, setSelectedExchangePair] =
    useState(initialState);

  return (
    <ExchangePair.Provider
      value={{
        selectedExchangePair,
        updateSelectedExchangePair: setSelectedExchangePair,
      }}
    >
      {children}
    </ExchangePair.Provider>
  );
};
