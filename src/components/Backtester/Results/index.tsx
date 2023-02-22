import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { format } from "date-fns";
import Card from "../../common/Card";
import CardWrapper from "../../common/Wrapper";
import { TrendingDown, VolumeSvg } from "../../CommonSvg";
import PriceRange from "../../PricesRange";
import InnerLayout from "../common/InnerLayout";
import Graph from "./Graph";
import TradeHistory from "./TradeHistory";

const History = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [rows, setRows] = useState([]);

  const changeHandler = () => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(`${window.location.origin}/placeholder_test2.csv`, {
      header: true,
      download: true,
      delimiter: ",",
      complete(results) {
        const rowsArray = [];
        let valuesArray = [];

        // Iterating data to get column name and their values
        results.data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        valuesArray = valuesArray.splice(0, 4);

        setRows(
          valuesArray.map((row) => ({
            start: format(new Date(row[0]), "dd MMM yyyy"),
            end: format(new Date(row[1]), "dd MMM yyyy"),
            entry: row[2],
            exit: row[3],
            gain: Math.round(row[6] * 100) / 100,
            change: Math.round(row[5] * 100) / 100,
            startTime: format(new Date(row[0]), "hh:mm:ss"),
            endTime: format(new Date(row[1]), "hh:mm:ss"),
          }))
        );
      },
    });
  };

  useEffect(() => {
    changeHandler();
  }, []);

  return (
    <InnerLayout isMobile={isMobile}>
      <h2 className="my-8 text-2xl">Results</h2>
      <CardWrapper>
        <div className="grid grid-cols-[30%_minmax(0,_1fr)] gap-[inherit] ">
          <div>
            <Card title="Overview" hasBorder classes="h-full">
              <div className="grid grid-cols-2 justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Start Date
                  </span>
                  <span className="">10.10.2022</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    End Date
                  </span>
                  <span>10.10.2022</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Risk
                  </span>
                  <span className="text-red">High Risk</span>
                </div>
                <div className="flex flex-col gap-2 self-center">
                  <TrendingDown />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Type
                  </span>
                  <span className="">Spot Trader</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Backtester
                  </span>
                  <span>Backtester 1</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Pair
                  </span>
                  <span>BTC / USDT</span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Exchange
                  </span>
                  <span className="">Binance</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Exposure
                  </span>
                  <span>1000.00 USDT</span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    Fees
                  </span>
                  <span className="">Not Included</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-[inherit]">
              <Card title="Total gain" hasBorder classes="h-full">
                <div className="flex justify-between">
                  <div className="flex justify-between flex-col gap-2">
                    <span className="text-2xl">$627965.93</span>
                    <span className="text-sm text-green">627.97%</span>
                  </div>
                </div>
              </Card>
              <Card title="Asset Performance" hasBorder classes="h-full">
                <div className="flex justify-between">
                  <div className="flex justify-between flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <img src="/btc.png" alt="btc" className="w-10 h-10" />
                      <span className="text-2xl">BTC</span>
                    </div>

                    <span className="text-sm text-green">56.22%</span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-2 gap-[inherit]">
              <Card title="Trade Ratio" hasBorder classes="h-full">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h6 className="text-3xl">22.67%</h6>
                      <span className="text-sm text-green">7 Positive</span>
                    </div>
                    <div>
                      <h6 className="text-3xl">{100 - 22.67}%</h6>
                      <span className="text-sm text-red">3 Negative</span>
                    </div>
                  </div>

                  <div className="overflow-hidden w-full h-[100%] flex items-end">
                    <PriceRange
                      current={22.67}
                      max={100}
                      hideDetails
                      variant="large"
                    />
                  </div>
                </div>
              </Card>
              <Card title="Trades Win/Loss" hasBorder classes="h-full">
                <div className="grid grid-cols-2 justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      Average Win
                    </span>
                    <span className="text-green">3.52%</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      Trades
                    </span>
                    <span>470</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      Average Loss
                    </span>
                    <span className="text-red">-0.85%</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      Trades
                    </span>
                    <span>1602</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Graph />

        <TradeHistory rows={rows} />
      </CardWrapper>
    </InnerLayout>
  );
};

export default History;
