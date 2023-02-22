/* eslint-disable  no-restricted-syntax */

import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  updateExchangeStore,
  updateTimeframesStore,
} from "../redux/reducers/ExchangeSlice";

const useCcxt = (symbol) => {
  const exchangesStore = useAppSelector((state) => state.exchanges.items);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    if (exchangesStore[symbol]) return;

    const findExchange = async (symboltem) => {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await axios.get(
          `/api/backend/ccxt/find-exchange?symbol=${symboltem}`
        );

        if (response.data.exchange) {
          const exchange = response.data.exchange;

          // Generate appropriate timeframes
          const timeframes = [];
          if (response.data.timeframes) {
            for (const [key, value] of Object.entries(
              response.data.timeframes
            )) {
              // maybe it's needed to be swapped
              timeframes.push({ time: key, name: value });
            }
          }

          // Generate markets
          const markets = response.data.availableMarkets.map((item) => ({
            name: item,
          }));

          dispatch(
            updateExchangeStore({
              symbol: symboltem,
              exchange,
              markets: markets ?? [],
            })
          );
          dispatch(updateTimeframesStore({ exchange, timeframes }));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHasError(error);
      }
    };

    findExchange(symbol);
  }, [dispatch, symbol, exchangesStore]);

  return { isLoading, hasError };
};

export default useCcxt;
