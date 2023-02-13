import { FC, ReactNode, createContext, useState } from "react";

export const SwapDataContext = createContext({});

export const SWAP_DATA_DEFAULT_STATE = {
  allTokens: [],
  selectedTokens: {
    first: "TON",
    second: null,
    priceInTon: 0,
  },
  selectionToken: {
    type: null,
    position: null,
  },
};

export const SwapDataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(SWAP_DATA_DEFAULT_STATE);

  return (
    <SwapDataContext.Provider
      value={{
        ...data,
        setData,
      }}
    >
      {children}
    </SwapDataContext.Provider>
  );
};
