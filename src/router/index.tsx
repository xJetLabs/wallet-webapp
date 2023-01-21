import { createBrowserRouter } from "react-router-dom";

import {
  HistoryPanel,
  HomePanel,
  LoadPanel,
  SendSuccessPanel,
  SettingsPanel,
} from "../panels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoadPanel />,
  },
  {
    path: "/home",
    element: <HomePanel />,
  },
  {
    path: "/settings",
    element: <SettingsPanel />,
  },
  {
    path: "/history",
    element: <HistoryPanel />,
  },
  {
    path: "/send/success",
    element: <SendSuccessPanel />,
  },
]);
