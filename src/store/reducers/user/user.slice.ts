import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../../constants";

const initialState: any = {
  serverData: null,
  balances: null,
  allCurrencies: null,
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

      draft.balances = action.payload.sort((a: any, b: any) => {
        return b?.amount - a?.amount;
      });
    },
    setAllCurrencies(draft, action) {
      if (!action.payload) {
        return;
      }

      draft.allCurrencies = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
