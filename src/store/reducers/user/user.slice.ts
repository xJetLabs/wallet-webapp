import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../../constants";

const initialState: any = {
  serverData: null,
  balances: null,
};

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    setServerData(draft, action) {
      draft.serverData = action.payload;
    },
    setBalances(draft, action) {
      if (!action.payload) {
        return;
      }

      draft.balances = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
