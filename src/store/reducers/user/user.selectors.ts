import { SLICE_NAMES } from "../../constants";

export const myAllBalancesSelector = (state: any) => {
  return [
    ...(state[SLICE_NAMES.USER].verifiedBalances || []),
    ...(state[SLICE_NAMES.USER].unverifiedBalances || []),
  ];
};

export const aviableTransferBalancesSelector = (state: any) => {
  return [
    ...(state[SLICE_NAMES.USER].verifiedBalances || []),
    ...(state[SLICE_NAMES.USER].unverifiedBalances || []),
  ]
    .filter((v: any) => {
      return v?.currency !== "ton" ? v?.amount && v?.amount > 0 : true;
    })
    .sort((a: any, b: any) => {
      if (b?.currency === "ton") {
        return 1;
      }

      if (a?.currency === "ton") {
        return -1;
      }

      return Number(b?.amount || 0) - Number(a?.amount || 0);
    });
};

export const myVerifiedBalancesSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].verifiedBalances || []).filter((v: any) => {
    return v.currency !== "ton" && v.amount > 0;
  });
};

export const myUnverifiedBalancesSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].unverifiedBalances || []).filter((v: any) => {
    return v.currency !== "ton" && v.amount > 0;
  });
};

export const myBalancesSelector = (state: any) => {
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
    return a + Number(b?.values?.usd || 0);
  }, 0);
};

export const totalTONValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "ton") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalEXCValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "exc") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalBOLTValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "bolt") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalLAVEValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "lave") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalTAKEValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "take") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalJUSDTValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "jusdt") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalJUSDCValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "jusdc") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalKISSValueSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    if (b.currency === "kiss") {
      return a + Number(b.amount || 0);
    }

    return a + Number(b?.values?.ton || 0);
  }, 0);
};

export const totalAmountsSelector = (state: any) => {
  return (state[SLICE_NAMES.USER].balances || []).reduce((a: any, b: any) => {
    return a + Number(isNaN(b.amount) ? 0 : b.amount);
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

export const allCurrenciesSelector = (state: any) => {
  return state[SLICE_NAMES.USER].allCurrencies || [];
};

export const availableFiatsSelector = (state: any) => {
  return state[SLICE_NAMES.USER].availableFiats;
};

export const myServerData = (state: any) => {
  return state[SLICE_NAMES.USER].serverData;
};

export const exhangesPair = (state: any) => {
  return state[SLICE_NAMES.USER].exchangesPair;
};
