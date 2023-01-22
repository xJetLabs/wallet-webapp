import { createBrowserRouter } from "react-router-dom";

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
    path: "/receive",
    element: <ReceivePanel />,
  },
  {
    path: "/send",
    element: <SendPanel />,
  },
  {
    path: "/send/select",
    element: <SelectTransferPanel />,
  },
  {
    path: "/send/success",
    element: <SendSuccessPanel />,
  },
]);

router.subscribe((v) => {
  const goBack = () => {
    window.history.back();
  };

  if (!["/home", "/"].includes(v.location.pathname)) {
    (window as any).Telegram.WebApp.BackButton.show();
    (window as any).Telegram.WebApp.BackButton.onClick(goBack);
  } else {
    (window as any).Telegram.WebApp.BackButton.hide();
    (window as any).Telegram.WebApp.BackButton.offClick(goBack);
  }
});
