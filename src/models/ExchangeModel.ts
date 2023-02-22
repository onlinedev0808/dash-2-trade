interface ITimeframe {
  name: string;
  time: string;
}

interface IMarket {
  name: string;
}

export interface ExchangePayload {
  symbol: string;
  exchange: string;
  markets: Array<IMarket>;
}

export interface TimeframesPayload {
  exchange: string;
  timeframes: Array<ITimeframe>;
}

interface ExchangeModel {
  exchange: string;
  markets: Array<IMarket>;
}

interface ExchangeMap {
  [key: string]: ExchangeModel;
}

interface TimeframesMap {
  [key: string]: Array<ITimeframe>;
}

export interface IInitialState {
  items: ExchangeMap;
  timeframes: TimeframesMap;
}
