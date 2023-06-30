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
  PurchaseTonPage,
  PurchaseFiatSelect,
  PurchaseTonFirstStep,
  NftDetailPanel,
} from "../panels";
import { SendNftPanel } from "../panels/SendNft";
import { SendNftSuccessPanel } from "../panels/SendNftSuccessPanel";
import { SelectLanguage } from "../panels/Settings/SelectLanguage";
import { SelectCurrency } from "../panels/Settings/SelectCurrency";
import { SellNftPanel } from "../panels/SellNft";
import { SellNftSuccessPanel } from "../panels/SellNftSuccess";
import { SellNftCurrencies } from "../panels/SellNft/SellNftCurrencies";
import { TradingPanel } from "../panels/Trading";
import { TradingSelectPanel } from "../panels/Trading/TradingSelect.panel";
import { TradingSuccessPanel } from "../panels/Trading/TradingSuccess";

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
    path: ROUTE_NAMES.SETTINGS_LANGUAGE,
    element: <SelectLanguage />,
  },
  {
    path: ROUTE_NAMES.SETTINGS_CURRENCY,
    element: <SelectCurrency />,
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
    path: ROUTE_NAMES.SEND_NFT,
    element: <SendNftPanel />,
  },
  {
    path: ROUTE_NAMES.SEND_NFT_SUCCESS,
    element: <SendNftSuccessPanel />,
  },
  {
    path: ROUTE_NAMES.SELL_NFT,
    element: <SellNftPanel />,
  },
  {
    path: ROUTE_NAMES.SELL_NFT_SELECTCURRENCY,
    element: <SellNftCurrencies />,
  },
  {
    path: ROUTE_NAMES.SELL_NFT_SUCCESS,
    element: <SellNftSuccessPanel />,
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
    path: ROUTE_NAMES.BUY_TON,
    element: <PurchaseTonPage />,
  },
  {
    path: ROUTE_NAMES.FIAT_SELECT,
    element: <PurchaseFiatSelect />,
  },
  {
    path: ROUTE_NAMES.BUY_TON_STEP1,
    element: <PurchaseTonFirstStep />,
  },
  {
    path: ROUTE_NAMES.NFT,
    element: <NftPanel />,
  },
  // {
  //   path: ROUTE_NAMES.NFT_DETAIL,
  //   element: <NftDetailPanel />,
  // },
  // {
  //   path: ROUTE_NAMES.SWAP,
  //   element: <SwapPanel />,
  // },
  // {
  //   path: ROUTE_NAMES.SWAP_SELECT,
  //   element: <SwapSelect />,
  // },
  {
    path: ROUTE_NAMES.SWAP,
    element: <TradingPanel />,
  },
  {
    path: ROUTE_NAMES.SWAP_SELECT,
    element: <TradingSelectPanel />,
  },
  {
    path: ROUTE_NAMES.SWAP_SUCCESS,
    element: <TradingSuccessPanel />,
  },
]);

router.subscribe((v) => {
  try {
    if (window.history.state.idx === 0 && v.historyAction != "PUSH") {
      (window as any).Telegram.WebApp.BackButton.hide();
    } else {
      (window as any).Telegram.WebApp.BackButton.show();
    }
  } catch (e) {
    console.log("[xJetWallet] Please login via Telegram!");
  }
});
