import { FC, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import { apiInited, balanceCheckWatcher } from "./api";

export const App: FC = () => {
  if (window.location.pathname !== "/" && !apiInited) {
    router.navigate("/", {
      replace: true,
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      balanceCheckWatcher();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <RouterProvider router={router} />;
};
