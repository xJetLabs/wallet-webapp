import { FC, ReactNode, createContext, useState } from "react";

export const JetTokensContext = createContext({});

const initialState = {
  selectedToken: {
    id: "6370a5a11f8246a8dde20adf",
    name: "TON",
    emoji: "💎",
    url: "https://ton.org/",
    symbol: "ton",
    master_contract: null,
    rates: null,
    verified: true,
    image: null,
  },
};

export const JetTokensContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jetToken, setJetToken] = useState(initialState.selectedToken);

  return (
    <JetTokensContext.Provider
      value={{
        jetToken,
        setJetToken,
      }}
    >
      {children}
    </JetTokensContext.Provider>
  );
};
