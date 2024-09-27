export interface IToken {
    id: string;
    image: string;
    master_contract: string;
    name: string;
    rates: null;
    symbol: string;
    url: null;
    verified: boolean;
}

export interface IPair {
    id: string;
    assets: string[];
    providers: {
      [key: string]: {
        pool: string;
        fee: number;
        reserves: string[];
        cache_expire: number;
      };
    };
    active: boolean;
    trading_data: {
      avg_price: number;
      change_24h: number;
    };
  }
  
