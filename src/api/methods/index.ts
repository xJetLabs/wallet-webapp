import axios from "axios";

import { sign_message } from "../utils";
import { store } from "../../store";
import { userActions } from "../../store/reducers";
import { NFT } from "../../types";

const RequestInProgress = new Set();

let config = {
  api_key: null,
  private_key: null,
};

let API_URL = "https://xjet.app/api/v1/";

export let apiInited = false;
export let mainnetInited = false;

export const initMainnet = async () => {
  const mainnetQuery = window.location.search
    ? new URLSearchParams(window.location.search)
    : null;

  if (mainnetQuery) {
    const isTest = mainnetQuery.get("test");

    if (isTest === "true") {
      API_URL = "https://testnet.xjet.app/api/v1/";
    }
  }

  mainnetInited = true;
};

export const balanceCheckWatcher = async () => {
  if (apiInited) {
    const responseBalance = await getMyBalance();

    if (responseBalance?.data) {
      store.dispatch(userActions.setBalances(responseBalance?.data?.balances));
    }
  }
};

export const setApiConfig = ({ newConfigValue }: { newConfigValue: any }) => {
  config = newConfigValue;
  apiInited = true;

  return;
};

export const apiInit = async ({
  payload,
}: {
  payload: { init_data: object };
}) => {
  if (RequestInProgress.has("webapp")) {
    throw new Error("busy");
  }

  RequestInProgress.add("webapp");

  const response = await axios
    .post(API_URL + "account.webapp", payload)
    .finally(() => {
      RequestInProgress.delete("webapp");
    });

  return response;
};

export const getMyServerData = async () => {
  if (RequestInProgress.has("me")) {
    throw new Error("busy");
  }

  RequestInProgress.add("me");

  const response = await axios
    .get(API_URL + "account.me", {
      headers: {
        "X-API-Key": config.api_key,
      },
    })
    .finally(() => {
      RequestInProgress.delete("me");
    });

  return response;
};

export const getMyBalance = async () => {
  if (RequestInProgress.has("balances")) {
    throw new Error("busy");
  }

  RequestInProgress.add("balances");

  const response = await axios
    .get(API_URL + "account.balances", {
      headers: {
        "X-API-Key": config.api_key,
      },
    })
    .finally(() => {
      RequestInProgress.delete("balances");
    });
  return response;
};

export const sendCoins = async ({
  payload,
}: {
  payload: {
    ton_address: string;
    currency: string;
    amount: number;
  };
}) => {
  if (RequestInProgress.has("withdraw")) {
    throw new Error("busy");
  }

  RequestInProgress.add("withdraw");

  try {
    const signedMessage = await sign_message(payload, config.private_key);

    const response = await axios
      .post(
        API_URL + "account.withdraw",
        {
          ...signedMessage,
        },
        {
          headers: {
            "X-API-Key": config.api_key,
          },
        }
      )
      .finally(() => {
        RequestInProgress.delete("withdraw");
      });

    return response;
  } catch (e) {
    RequestInProgress.delete("withdraw");

    return e;
  }
};

export const sendNft = async ({
  payload,
}: {
  payload: {
    nft_address: string;
    to_address: string;
  };
}) => {
  if (RequestInProgress.has("nft.transfer")) {
    throw new Error("busy");
  }

  RequestInProgress.add("nft.transfer");

  try {
    const signedMessage = await sign_message(payload, config.private_key);

    const response = await axios
      .post(
        API_URL + "nft.transfer",
        {
          ...signedMessage,
        },
        {
          headers: {
            "X-API-Key": config.api_key,
          },
        }
      )
      .finally(() => {
        RequestInProgress.delete("nft.transfer");
      });

    return response;
  } catch (e) {
    RequestInProgress.delete("nft.transfer");

    return e;
  }
};

export const sellNft = async ({
  payload,
}: {
  payload: {
    nft_address: string;
    currency: string;
    price: number;
  };
}) => {
  if (RequestInProgress.has("nft.castodialSell")) {
    throw new Error("busy");
  }

  RequestInProgress.add("nft.castodialSell");

  try {
    const signedMessage = await sign_message(payload, config.private_key);

    const response = await axios
      .post(
        API_URL + "nft.castodialSell",
        {
          ...signedMessage,
        },
        {
          headers: {
            "X-API-Key": config.api_key,
          },
        }
      )
      .finally(() => {
        RequestInProgress.delete("nft.castodialSell");
      });

    return response;
  } catch (e) {
    RequestInProgress.delete("nft.castodialSell");

    return e;
  }
};

export const checkDeposit = async () => {
  if (RequestInProgress.has("submitDeposit")) {
    throw new Error("busy");
  }

  RequestInProgress.add("submitDeposit");

  const response = await axios
    .post(API_URL + "account.submitDeposit", null, {
      headers: {
        "X-API-Key": config.api_key,
      },
    })
    .finally(() => {
      RequestInProgress.delete("submitDeposit");
    });

  return response;
};

export const getAllCurrencies = async () => {
  if (RequestInProgress.has("currencies")) {
    throw new Error("busy");
  }

  RequestInProgress.add("currencies");

  const response = await axios
    .get(API_URL + "system.currencies")
    .finally(() => {
      RequestInProgress.delete("currencsies");
    });

  return response;
};

export const getHistory = async (limit = 20, offset = 0) => {
  if (RequestInProgress.has("operations")) {
    throw new Error("busy");
  }

  RequestInProgress.add("operations");

  const response = await axios
    .post(
      API_URL + "account.operations",
      {
        limit,
        offset,
      },
      {
        headers: {
          "X-API-Key": config.api_key,
        },
      }
    )
    .finally(() => {
      RequestInProgress.delete("operations");
    });

  return response;
};

export async function updateSettings({
  langCode,
  currency,
}: {
  langCode?: string;
  currency?: string;
}) {
  if (RequestInProgress.has("updateSettings")) {
    throw new Error("busy");
  }

  RequestInProgress.add("updateSettings");

  const response = await axios
    .post(
      API_URL + "webapp.updateSettings",
      { language: langCode, localCurrency: currency },
      {
        headers: {
          "X-API-Key": config.api_key,
        },
      }
    )
    .finally(() => {
      RequestInProgress.delete("updateSettings");
    });

  return response;
}

export const getFiatRates = async () => {
  if (RequestInProgress.has("fiatRates")) {
    throw new Error("busy");
  }

  RequestInProgress.add("fiatRates");

  const response = await axios
    .get(API_URL + "fiatExchange.rates")
    .finally(() => {
      RequestInProgress.delete("fiatRates");
    });

  return response.data;
};

export const initFiatPayment = async (amount: number) => {
  if (RequestInProgress.has("initFiatPayment")) {
    throw new Error("busy");
  }

  RequestInProgress.add("initFiatPayment");

  const response = await axios
    .post(
      API_URL + "fiatExchange.init",
      {
        paySource: 1,
        amount: amount,
      },
      {
        headers: {
          "X-API-Key": config.api_key,
        },
      }
    )
    .finally(() => {
      RequestInProgress.delete("initFiatPayment");
    });

  return response;
};

export const getDedustTokens = async () => {
  if (RequestInProgress.has("dedust")) {
    throw new Error("busy");
  }

  RequestInProgress.add("dedust");

  const response = await axios
    .get("https://api.dedust.io/cmc/dex")
    .finally(() => {
      RequestInProgress.delete("dedust");
    });

  return response;
};

export async function getUserNFT(tonAddress: string): Promise<NFT[]> {
  if (RequestInProgress.has("userNFT")) {
    throw new Error("busy");
  }

  RequestInProgress.add("userNFT");

  const response = await axios
    .get(
      // `https://tonapi.io/v2/accounts/EQCklgUMBy2QgQdKcXVRjpMTcUwD7gPOOsINRPSt2E4delpy/nfts?limit=1000&offset=0&indirect_ownership=false`
      `https://tonapi.io/v2/accounts/${tonAddress}/nfts?limit=1000&offset=0&indirect_ownership=false`
    )
    .finally(() => {
      RequestInProgress.delete("userNFT");
    });

  return response.data.nft_items as NFT[];
}

export async function getExchangesPair() {
  if (RequestInProgress.has("exchanges.pair")) {
    throw new Error("busy");
  }

  RequestInProgress.add("exchanges.pairs");

  const response = await axios.get(API_URL + "exchanges.pairs").finally(() => {
    RequestInProgress.delete("exchanges.pairs");
  });

  return response.data;
}

export async function getExchangesEstimate(data: {
  pair: string[];
  type: "buy" | "sell";
  amount: number;
}) {
  const response = await axios.post(API_URL + "exchanges.estimate", data, {
    headers: {
      "X-API-Key": config.api_key,
    },
  });

  return response.data;
}

export async function createOrder(data: {
  pair: string[];
  type: "buy" | "sell";
  amount: number;
  price?: number;
}) {
  if (RequestInProgress.has("exchanges.createOrder")) {
    throw new Error("busy");
  }

  const response = await axios
    .post(API_URL + "exchanges.createOrder", data, {
      headers: {
        "X-API-Key": config.api_key,
      },
    })
    .finally(() => {
      RequestInProgress.delete("exchanges.createOrder");
    });

  return response.data;
}
