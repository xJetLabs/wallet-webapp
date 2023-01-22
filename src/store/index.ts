import { configureStore } from "@reduxjs/toolkit";

import { SLICE_NAMES } from "./constants";
import { userReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    [SLICE_NAMES.USER]: userReducer,
  },
});
