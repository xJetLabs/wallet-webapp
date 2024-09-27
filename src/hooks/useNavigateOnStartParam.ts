import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { ROUTE_NAMES } from "../router/constants";
import { useNavigate } from "react-router-dom";

export function useNavigateOnStartParam() {
  const navigate = useNavigate();

  useEffect(() => {
    const { initDataUnsafe } = WebApp;
    if (initDataUnsafe.start_param != null) {
      const params = initDataUnsafe.start_param.split("_");
      if (!params[0] || !params[1]) {
        throw new Error("Недостаточно параметров для навигации");
      }
      navigate(`${ROUTE_NAMES.SWAP}?pair=${params[0]}_${params[1]}`);
      initDataUnsafe.start_param = '';
    }
  }, [navigate]);
}
