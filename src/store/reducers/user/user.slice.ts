import { createSlice, current } from "@reduxjs/toolkit";

import { SLICE_NAMES } from "../../constants";

const initialState: any = {
  serverData: null,
  balances: null,
  verifiedBalances: null,
  unverifiedBalances: null,
  allCurrencies: null,
  history: [],
  availableFiats: [
    { base_symbol: "RUB", last_price: 10000, price: 10000, minAmount: 5 },
  ],
  exchangesPair: [],
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

      draft.balances = action.payload.reduce(
        (res: Array<object>, value: any) => {
          const currencyData = (draft.allCurrencies || []).find((v: any) => {
            return v.symbol === value.currency;
          });

          if (currencyData) {
            res.push({ ...value, ...currencyData, values: value?.values });
          }

          return res;
        },
        []
      );
      draft.verifiedBalances = action.payload
        .reduce((res: Array<object>, value: any) => {
          const currencyData = (current(draft.allCurrencies) || []).find(
            (v: any) => {
              return v.symbol === value.currency;
            }
          );

          if (currencyData && currencyData.verified === true) {
            res.push({ ...value, ...currencyData, values: value?.values });
          }

          return res;
        }, [])
        .sort((a: any, b: any) => {
          return Number(!a?.values?.usd || 0) - Number(!b?.values?.usd || 0);
        });
      draft.unverifiedBalances = action.payload
        .reduce((res: Array<object>, value: any) => {
          const currencyData = (current(draft.allCurrencies) || []).find(
            (v: any) => {
              return v.symbol === value.currency;
            }
          );

          if (currencyData && currencyData.verified === false) {
            res.push({ ...value, ...currencyData, values: value?.values });
          }

          return res;
        }, [])
        .sort((a: any, b: any) => {
          return Number(!a?.values?.ton || 0) - Number(!b?.values?.ton || 0);
        });
    },
    setAllCurrencies(draft, action) {
      if (!action.payload) {
        return;
      }

      draft.allCurrencies = action.payload;
    },
    setAvailableFiats(draft, action) {
      if (!action.payload) {
        return;
      }

      draft.availableFiats = action.payload;
    },

    setExchangesPair(draft, action) {
      if (!action.payload) {
        return;
      }

      draft.exchangesPair = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
