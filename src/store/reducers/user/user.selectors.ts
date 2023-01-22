import { SLICE_NAMES } from "../../constants";

export const myAllBalancesSelector = (state: any) => {
  return state[SLICE_NAMES.USER].balances || [];
};

export const myBalancesSelector = (state: any) => {
  console.log(state);
  return (state[SLICE_NAMES.USER].balances || []).filter(
    (v: any) => v?.currency !== "ton"
  );
};

export const myTonBalanceSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).find(
    (v: any) => v?.currency === "ton"
  );
};

export const totalUSDValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    return a + b?.price;
  }, 0);
};

export const myTonAddressSelector = (state: any) => {
  return state[SLICE_NAMES.USER].serverData?.service_wallet || "";
};

export const currencyDataSelector = (state: any, currency: string) => {
  return (state[SLICE_NAMES.USER].balances || []).find(
    (v: any) => v?.currency === currency
  );
};
