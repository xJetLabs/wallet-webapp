import { createBrowserRouter } from "react-router-dom";

import { ROUTE_NAMES } from "./constants";

import {
  HistoryPanel,
  HomePanel,
  LoadPanel,
  ReceivePanel,
  SelectTransferPanel,
  SendPanel,
  SendSuccessPanel,
  SettingsPanel,
} from "../panels";

export const router = createBrowserRouter([
  {
    path: ROUTE_NAMES.LOAD,
    element: <LoadPanel />,
  },
  {
    path: ROUTE_NAMES.HOME,
    element: <HomePanel />,
  },
  {
    path: ROUTE_NAMES.SETTINGS,
    element: <SettingsPanel />,
  },
  {
    path: ROUTE_NAMES.HISTORY,
    element: <HistoryPanel />,
  },
  {
    path: ROUTE_NAMES.RECEIVE,
    element: <ReceivePanel />,
  },
  {
    path: ROUTE_NAMES.SEND,
    element: <SendPanel />,
  },
  {
    path: ROUTE_NAMES.SEND_SELECT,
    element: <SelectTransferPanel />,
  },
  {
    path: ROUTE_NAMES.SEND_SUCCESS,
    element: <SendSuccessPanel />,
  },
]);

router.subscribe((v) => {
  const goBack = () => {
    window.history.back();
  };

  if (![ROUTE_NAMES.HOME, ROUTE_NAMES.LOAD].includes(v.location.pathname)) {
    (window as any).Telegram.WebApp.BackButton.show();
    (window as any).Telegram.WebApp.BackButton.onClick(goBack);
  } else {
    (window as any).Telegram.WebApp.BackButton.hide();
    (window as any).Telegram.WebApp.BackButton.offClick(goBack);
  }
});
