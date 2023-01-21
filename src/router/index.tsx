import { createBrowserRouter } from "react-router-dom";

import { HomePanel, LoadPanel, SettingsPanel } from "../panels";

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
]);
