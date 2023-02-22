import { useState, useEffect } from "react";
import axios from "axios";
import { endOfDay, startOfDay, subDays } from "date-fns";

import Filters from "../common/candlestickFilters/Filters";
import CandleStick from "./CandleStick";
import tokens from "../../data/tokens.json";
import timeframes from "../../data/timeframes.json";
import HighChartLine from "../common/highcharts/HighChartLine";
import { INDICATORS } from "../common/highcharts/indicators";
import Card from "../common/Card";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const PERIODS = [
  { name: "Day", value: "1d" },
  { name: "Week", value: "1w" },
  { name: "2 Weeks", value: "2w" },
  { name: "Month", value: "1m" },
  { name: "3 Months", value: "3m" },
  { name: "Year", value: "1y" },
  { name: "Custom", value: "" },
];

const TOKENS = [
  { name: "BTC", value: "bitcoin" },
  { name: "ETH", value: "ethereum" },
  { name: "BNB", value: "bnb" },
  { name: "XRP", value: "ripple" },
  { name: "DOGE", value: "dogecoin" },
  { name: "ADA", value: "cardano" },
  { name: "MATIC", value: "polygon" },
  { name: "DOT", value: "polkadot" },
  { name: "SOL", value: "sol" },
  { name: "SHIB", value: "shiba inu" },
];

const CHART_OPTIONS = [
  { id: 1, name: "candlestick" },
  { id: 2, name: "graph" },
];

interface IDropdownOption {
  name: string;
  value: string;
  exchanges?: string[];
  isSelected?: boolean;
  isDefault?: boolean;
  hasCustomValue?: boolean;
  placeholder?: string;
  params?: { name: string; value: string }[];
}

const MarketOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[0]);
  const [customPeriod, setCustomPeriod] = useState("");

  const [petrolPrice, setPetrolPrice] = useState(18);

  const [selectedCrypto, setSelectedCrypto] = useState(TOKENS[0]);
  const [selectedChart, setSelectedChart] = useState(CHART_OPTIONS[0]);

  // const [chartData, setChartData] = useState([]);

  const [since, setSince] = useState<number>();
  const [until, setUntil] = useState<number>();

  const [exchangesList, setExchangesList] = useState<IDropdownOption[]>([]);
  const [selectedExchange, setSelectedExchange] = useState<IDropdownOption>();
  const [erroredExchanges, setErroredExchanges] = useState<IDropdownOption[]>(
    []
  );

  const [markets, setMarkets] = useState<IDropdownOption[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<IDropdownOption>();

  const [intervals, setIntervals] = useState<IDropdownOption[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<IDropdownOption>();

  const [indicators, setIndicators] = useState(INDICATORS);
  // const [selectedIndicator, setSelectedIndicator] = useState<IDropdownOption>(
  //   INDICATORS[0]
  // );

  const [data, setData] = useState([{ data: [] }]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  /* async function fetchPrice() {
    if (!(selectedChart.name === CHART_OPTIONS[1].name)) return;

    const tokenId = selectedCrypto.value; // tokenIds[selectedCrypto];
    try {
      const timeRange =
        selectedPeriod.name === "Custom" ? customPeriod : selectedPeriod.value;

      const { data } = await axios.get(
        `/api/backend/tokens/historical?token_id=${tokenId}&time_range=${timeRange}`
      );
      setChartData([
        {
          name: "Price",
          data,
        },
      ]);
    } catch (error) {
      setChartData(initData);
      console.log(error);
    }
  } */

  /* useEffect(() => {
    fetchPrice();
  }, [selectedPeriod, selectedChart, selectedCrypto]); */

  const symbol = selectedCrypto.name;

  useEffect(() => {
    if (selectedPeriod.name === "Custom") {
      const period = customPeriod.split(",");
      setSince(startOfDay(new Date(period[0])).getTime());

      if (period[0] !== period[1]) {
        setUntil(endOfDay(new Date(period[1])).getTime());
      }
    } else {
      if (selectedPeriod.name === "Year") {
        setSince(subDays(new Date(), 365).getTime());
        setUntil(new Date().getTime());
      }

      if (selectedPeriod.name === "3 Months") {
        setSince(subDays(new Date(), 90).getTime());
        setUntil(new Date().getTime());
      }

      if (selectedPeriod.name === "Month") {
        setSince(subDays(new Date(), 30).getTime());
        setUntil(new Date().getTime());
      }

      if (selectedPeriod.name === "2 Weeks") {
        setSince(subDays(new Date(), 14).getTime());
        setUntil(new Date().getTime());
      }

      if (selectedPeriod.name === "Week") {
        setSince(subDays(new Date(), 7).getTime());
        setUntil(new Date().getTime());
      }

      if (selectedPeriod.name === "Day") {
        // setSince(subDays(new Date(), 1).getTime());
        // setUntil(new Date().getTime());
      }
    }
  }, [customPeriod, selectedPeriod]);

  useEffect(() => {
    const fileData = JSON.parse(JSON.stringify(tokens)).tokens[symbol]
      .exchanges;
    const exchanges = fileData.map((exchange) => ({
      name: exchange.name,
      value: exchange.name,
      exchanges: exchange.quotesAvailable,
    }));

    setExchangesList(exchanges);
    setErroredExchanges([]);
    setSelectedExchange(null);
  }, [symbol]);

  useEffect(() => {
    if (!selectedExchange) return;

    const availableMarkets = selectedExchange?.exchanges.map((item) => ({
      name: `${symbol}/${item}`,
      value: `${symbol}/${item}`,
    }));
    setMarkets(availableMarkets);
    setSelectedMarket(availableMarkets[0]);

    const availableIntervals = JSON.parse(JSON.stringify(timeframes))[
      selectedExchange.value
    ];

    const availableTimeframes =
      (typeof availableIntervals === "object" &&
        availableIntervals !== null &&
        Object.keys(availableIntervals).map((prop) => ({
          name: prop,
          value: availableIntervals[prop],
        }))) ||
      [];

    setIntervals(availableTimeframes);
    setSelectedInterval(
      availableTimeframes?.find((item) => item.name === "1h") ||
        availableTimeframes[0]
    );
  }, [selectedExchange, symbol]);

  useEffect(() => {
    if (!intervals?.length) return;
    setSelectedInterval(
      intervals.find((item) => item.name === "1h") || intervals[0]
    );
  }, [intervals]);

  useEffect(() => {
    if (
      !selectedExchange ||
      !selectedMarket ||
      !selectedExchange.exchanges.includes(
        selectedMarket.value.split("/")[1]
      ) ||
      !selectedInterval
    )
      return;

    const fetchData = async (exchangeMarket, symbolName, interval) => {
      try {
        setIsLoading(true);
        setHasError(false);

        let url = `/api/backend/ccxt/${exchangeMarket.value}?symbol=${symbolName}&time_range=${interval}`;

        if (since) {
          url += `&since=${since}`;
        }

        if (until) {
          url += `&until=${until}`;
        }

        const response = await axios.get(url);

        if (response.data) {
          const dataArray = response.data.map((item, key) => [
            item[0],
            +Number.parseFloat(item[1]).toFixed(2), // Open
            +Number.parseFloat(item[2]).toFixed(2), // High
            +Number.parseFloat(item[3]).toFixed(2), // Low
            +Number.parseFloat(item[4]).toFixed(2), // Close
            +Number.parseFloat(item[5]).toFixed(2), // Volume
          ]);

          if (response.data.length === 0) {
            const index = intervals?.findIndex(
              (item) => item.name === selectedInterval.name
            );
            if (index === -1 || index === intervals.length - 1) {
              setData([{ data: dataArray }]);
              setIsLoading(false);
            } else {
              setSelectedInterval(intervals[index + 1]);
            }
          } else {
            setData([{ data: dataArray }]);
            setIsLoading(false);
          }
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.message);
        setErrorCode(e.response.status);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchData(selectedExchange, selectedMarket.name, selectedInterval.name);
  }, [selectedMarket, since, symbol, selectedInterval]);

  // if exchange has stopped working try to find a New one
  useEffect(() => {
    if (!hasError || errorCode === 429) return;

    setErroredExchanges([...erroredExchanges, selectedExchange]);
    //   setSelectedExchange(null);
  }, [hasError, errorCode]);

  useEffect(() => {
    setSelectedExchange(
      exchangesList.find((item) => !erroredExchanges.includes(item)) || null
    );
  }, [erroredExchanges]);

  const ccxtData = data.at(0)?.data;

  return (
    <Card>
      <div className="relative z-[2] mb-3">
        <Filters
          onChangeToken={setSelectedCrypto}
          token={selectedCrypto}
          tokens={TOKENS}
          charts={CHART_OPTIONS}
          selectedChart={selectedChart}
          onChangeChart={setSelectedChart}
          onSelectPeriod={setSelectedPeriod}
          periods={PERIODS}
          onSetCustomPeriod={setCustomPeriod}
          exchangesList={exchangesList}
          selectedExchange={selectedExchange}
          setSelectedExchange={setSelectedExchange}
          markets={markets}
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          intervals={intervals}
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
          indicators={indicators}
          setIndicators={setIndicators}
        />
      </div>

      <div className="w-full md:min-h-[20vw] min-h-[15.625rem] h-fit text-text-primary dark:text-text-primary-dark">
        {isLoading ? (
          <div className="w-[100%] text-center clear-both text-text-secondary dark:text-text-secondary-dark mt-5">
            Loading ...
          </div>
        ) : null}

        {hasError && !isLoading ? (
          <div className="w-[100%] text-center clear-both text-text-secondary dark:text-text-secondary-dark mt-5">
            {errorCode === 429 ? "Too Many Requests" : "Something went wrong"}
          </div>
        ) : null}

        <div className="md:mt-10 mt-5 mb-8">
          {!hasError &&
            !isLoading &&
            ccxtData.length > 0 &&
            selectedChart.name === CHART_OPTIONS[0].name && (
              <CandleStick
                title={selectedMarket?.name}
                data={ccxtData}
                selectedIndicators={indicators}
              />
            )}
          {!hasError &&
            !isLoading &&
            ccxtData.length > 0 &&
            selectedChart.name === CHART_OPTIONS[1].name && (
              <HighChartLine
                title={selectedMarket?.name}
                data={ccxtData.map((item) => [item[0], item[4]])}
                selectedIndicators={indicators}
                volume={ccxtData.map((item) => [item[0], item[5]])}
              />
            )}
        </div>
      </div>
    </Card>
  );
};

export default MarketOverview;
