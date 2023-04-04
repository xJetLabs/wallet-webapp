import { FC, ReactNode, createContext, useState } from "react";

export const PurchaseTonContext = createContext({});

export const PURCHASE_TON_DEFAULT_STATE = {
  allTokens: [],
  selectedTokens: {
    first: "RUB",
    second: null,
    priceInTon: 0,
  },
  selectionToken: {
    type: null,
    position: null,
  },
};

export const PurchaseTonContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(PURCHASE_TON_DEFAULT_STATE);

  return (
    <PurchaseTonContext.Provider
      value={{
        ...data,
        setData,
      }}
    >
      {children}
    </PurchaseTonContext.Provider>
  );
};
