import axios from "axios";

import { API_URL } from "../constants";
import { userActions } from "../../store/reducers";
import { store } from "../../store";

const RequestInProgress = new Set();

let config = {
  api_key: null,
  secret_key: null,
};

export let apiInited = false;

export const balanceCheckWatcher = async () => {
  if (apiInited) {
    const response = await getMyBalance();

    if (response?.data) {
      store.dispatch(
        userActions.setBalances(response?.data?.balanceCheckWatcher)
      );
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
  if (RequestInProgress.has("account.webapp")) {
    throw new Error("busy");
  }

  RequestInProgress.add("account.webapp");

  const response = await axios.post(API_URL + "account.webapp", payload);

  RequestInProgress.delete("account.webapp");

  return response;
};

export const getMyServerData = async () => {
  if (RequestInProgress.has("account.me")) {
    throw new Error("busy");
  }

  RequestInProgress.add("account.me");

  const response = await axios.get(API_URL + "account.me", {
    headers: {
      "X-API-Key": config.api_key,
    },
  });

  RequestInProgress.delete("account.me");

  return response;
};

export const getMyBalance = async () => {
  if (RequestInProgress.has("account.balances")) {
    throw new Error("busy");
  }

  RequestInProgress.add("account.balances");

  const response = await axios.get(API_URL + "account.balances", {
    headers: {
      "X-API-Key": config.api_key,
    },
  });

  RequestInProgress.delete("account.balances");

  return response;
};
