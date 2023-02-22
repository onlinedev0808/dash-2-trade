import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import useCcxt from "../../../hooks/useCcxt";

import DropdownList from "../../common/DropdownList";
import CandleStickChart from "../../common/CandleStickChart";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { cleanExchangeStore } from "../../../redux/reducers/ExchangeSlice";

/* const intervals = [
  { time: '1m', name: '1 min' },
  { time: '5m', name: '5 min' },
  { time: '15m', name: '15 min' },
  { time: '30m', name: '30 min' },
  { time: '1h', name: '1 Hour' },
  { time: '2h', name: '2 Hours' },
  { time: '4h', name: '4 Hours' },
  { time: '8h', name: '8 Hours' },
  { time: '12h', name: '12 Hours' },
  { time: '1d', name: '1 Day' },
  { time: '1w', name: '1 Week' },
  { time: '1m', name: '1 Month' }
]; */

const CandleStick = ({ symbol }) => {
  const exchangesList = useAppSelector((state) => state.exchanges.items);
  const timeframesStore = useAppSelector((state) => state.exchanges.timeframes);
  const dispatch = useAppDispatch();

  const [intervals, setIntervals] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(null);

  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const [data, setData] = useState([{ data: [] }]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const {
    // exchange,
    // timeframes,
    isLoading: isLoadingExchange,
    hasError: hasErrorExchange,
  } = useCcxt(symbol);

  const exchange = exchangesList[symbol]?.exchange ?? null;
  const timeframes = useMemo(
    () =>
      exchange && timeframesStore[exchange] ? timeframesStore[exchange] : [],
    [exchange, timeframesStore]
  );

  // const availableMarkets = exchangesList[symbol]?.markets;
  const availableMarkets = useMemo(
    () => exchangesList[symbol]?.markets,
    [symbol, exchangesList]
  );

  const intervalValue = selectedInterval?.time;
  const marketValue = selectedMarket?.name;

  // Fill In Intervals Filter
  useEffect(() => {
    if (timeframes.length === 0) return;

    setIntervals(timeframes);
    setSelectedInterval(timeframes.at(0));
  }, [timeframes]);

  // Fill In Markets Filter
  useEffect(() => {
    if (!availableMarkets || availableMarkets.length === 0) return;

    setMarkets(availableMarkets);
    setSelectedMarket(availableMarkets.at(0));
  }, [availableMarkets]);

  useEffect(() => {
    if (!exchange || !intervalValue || !marketValue) return;

    const fetchData = async (exchangeMarket, symbolName, interval) => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await axios.get(
          `/api/backend/ccxt/${exchangeMarket}?symbol=${symbolName}&time_range=${interval}`
        );

        if (response.data) {
          const dataArray = response.data.map((item, key) => {
            const time = new Date(item[0]);

            return {
              x: time,
              y: [
                Number.parseFloat(item[1]).toFixed(2),
                Number.parseFloat(item[2]).toFixed(2),
                Number.parseFloat(item[3]).toFixed(2),
                Number.parseFloat(item[4]).toFixed(2),
              ],
            };
          });

          setData([{ data: dataArray }]);
          setIsLoading(false);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.message);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchData(exchange, marketValue, intervalValue);
  }, [exchange, intervalValue, marketValue]);

  // if exchange has stopped working try to find a New one
  useEffect(() => {
    if (!hasError) return;
    dispatch(cleanExchangeStore(symbol));
  }, [dispatch, hasError, symbol]);

  const changeIntervalHandler = (interval) => {
    setSelectedInterval(interval);
  };

  let candleStickData = <CandleStickChart data={data} title="Bitcoin Price" />;

  if (isLoadingExchange || isLoading) {
    candleStickData = (
      <div className="w-[100%] text-center clear-both text-text-secondary dark:text-text-secondary-dark">
        Loading ...
      </div>
    );
  }

  if (hasErrorExchange || hasError) {
    candleStickData = (
      <div className="w-[100%] text-center clear-both text-text-secondary dark:text-text-secondary-dark">
        Something goes wrong
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-3 z-[1] float-left">
        <div className="flex gap-3 z-[2]">
          {intervals.length !== 0 && (
            <DropdownList
              selected={selectedInterval}
              items={intervals}
              onChange={changeIntervalHandler}
            />
          )}
          {markets.length !== 0 && (
            <DropdownList
              selected={selectedMarket}
              items={markets}
              onChange={setSelectedMarket}
            />
          )}
        </div>
      </div>
      <div className="mt-12">{candleStickData}</div>
    </>
  );
};

export default CandleStick;
