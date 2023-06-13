import { FC, ReactNode, createContext, useState, useContext } from "react";

export const ExchangePair = createContext({});

export function useExchangePairContext(): any {
  return useContext(ExchangePair);
}

const initialState = {};

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
