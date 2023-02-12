import { createBrowserRouter } from "react-router-dom";

import { ROUTE_NAMES } from "./constants";

import {
  HistoryPanel,
  HomePanel,
  LoadPanel,
  MenuExpandedPanel,
  MenuPanel,
  NftPanel,
  ReceivePanel,
  SelectTransferPanel,
  SendPanel,
  SendSuccessPanel,
  SettingsPanel,
  SwapPanel,
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
  {
    path: ROUTE_NAMES.MENU,
    element: <MenuPanel />,
  },
  {
    path: ROUTE_NAMES.MENU_EXPANDED,
    element: <MenuExpandedPanel />,
  },
  {
    path: ROUTE_NAMES.NFT,
    element: <NftPanel />,
  },
  {
    path: ROUTE_NAMES.SWAP,
    element: <SwapPanel />,
  },
]);

router.subscribe((v) => {
  if (![ROUTE_NAMES.HOME, ROUTE_NAMES.LOAD].includes(v.location.pathname)) {
    (window as any).Telegram.WebApp.BackButton.show();
  } else {
    (window as any).Telegram.WebApp.BackButton.hide();
  }
});
