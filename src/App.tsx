import { FC, useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import { apiInited, balanceCheckWatcher } from "./api";

export const App: FC = () => {
  const intervalIdRef = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    if (window.location.pathname !== "/" && !apiInited) {
      router.navigate("/", {
        replace: true,
      });
    }
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

  return <RouterProvider router={router} />;
};
