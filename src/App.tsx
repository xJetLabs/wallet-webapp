import { FC } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
