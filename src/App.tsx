import { useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";

import "./i18next";
import { router } from "./router";
import { balanceCheckWatcher } from "./api";
import { SwapDataContextProvider } from "./providers/SwapDataContextProvider";
import { JetTokensContextProvider } from "./providers/JetTokensContextProvider";
import { ExchangePairContextProvider } from "./providers/ExchangePairContextProvider";
// import { PurchaseTonContextProvider } from "./providers/PurchaseTonContextProvider";

export function App() {
  const intervalIdRef = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    router.navigate("/", { replace: true });
  }, []);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(async () => {
      await balanceCheckWatcher();
    }, 10000);

    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    };
  }, []);

  return (
    <ExchangePairContextProvider>
      <JetTokensContextProvider>
        <SwapDataContextProvider>
          <RouterProvider router={router} />
        </SwapDataContextProvider>
      </JetTokensContextProvider>
    </ExchangePairContextProvider>
  );
}
