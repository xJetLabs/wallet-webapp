import { SLICE_NAMES } from "../../constants";

export const myAllBalancesSelector = (state: any) => {
  const balances = state[SLICE_NAMES.USER].balances || [];

  return balances.map((v: any) => {
    const currencyData = (state[SLICE_NAMES.USER].allCurrencies || []).find(
      (x: any) => {
        return x.symbol === v.currency;
      }
    );

    return {
      ...v,
      ...(currencyData || {}),
      name: currencyData?.name || v?.currency.toUpperCase() || "",
    };
  });
};

export const myBalancesSelector = (state: any) => {
  const balances = (state[SLICE_NAMES.USER].balances || []).filter(
    (v: any) => v?.currency !== "ton"
  );
  return balances.map((v: any) => {
    const currencyData = (state[SLICE_NAMES.USER].allCurrencies || []).find(
      (x: any) => {
        return x.symbol === v.currency;
      }
    );

    return {
      ...v,
      ...(currencyData || {}),
      name: currencyData?.name || v?.currency.toUpperCase() || "",
    };
  });
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
  const currencyData = (state[SLICE_NAMES.USER].balances || []).find(
    (v: any) => v?.currency === currency
  );

  const moreInfoAboutCurrency = (
    state[SLICE_NAMES.USER].allCurrencies || []
  ).find((x: any) => {
    return x.symbol === currencyData?.currency;
  });

  return {
    ...currencyData,
    ...moreInfoAboutCurrency,
    name:
      moreInfoAboutCurrency?.name || currencyData?.currency.toUpperCase() || "",
  };
};
