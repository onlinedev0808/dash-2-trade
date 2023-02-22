import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import LineChart from "./LineChart";
import SelectBox from "./SelectBox";

const TimeButton = ({ active, children, onClick }) => (
  <div
    className={`${
      active ? "bg-[white] text-black " : "text-white "
    }text-sm text-center py-1 rounded-[3px] cursor-pointer hover:bg-highlight dark:hover:bg-highlight-dark w-[30px]`}
    onClick={onClick}
  >
    {children}
  </div>
);

const PriceGraphs = () => {
  const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y", "10Y"];
  const [selectedPeriod, setSelectedPeriod] = useState(periods[2]);
  const [selectedData, setSelectedData] = useState({ label: "Liquidity" });
  const handleSelectData = (data) => {
    setSelectedData(data);
  };

  return (
    <div className="bg-[#111112] rounded-[8px] md:p-5 text-[#DBDFEA] w-full">
      <div className="bg-[#24263A] rounded-[10px] p-5">
        <div className="flex justify-between">
          <div className="flex items-center mb-3">
            <div className="flex flex-column items-center mr-[20px]">
              <div className="w-[6px] h-[6px] bg-[#1EE0AC] rounded-[100%] mr-[6px]" />
              <div className="text-sm leading-[12px]">Price</div>
            </div>
            <div className="flex flex-column items-center">
              <div className="w-[6px] h-[6px] bg-[#29568B] rounded-[100%] mr-[6px]" />
              <div className="text-sm leading-[12px]">{selectedData.label}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {periods.map((period) => (
            <TimeButton
              key={uuidv4()}
              active={period === selectedPeriod}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </TimeButton>
          ))}
        </div>
        <div className="lg:w-[500px] h-[230px] w-full">
          <LineChart
            data={[
              {
                name: "Price",
                data: [
                  [1654480394495, 24.67],
                  [1654476798656, 24.87],
                  [1654473196109, 24.35],
                  [1654469593732, 24.56],
                  [1654465994076, 24.7],
                  [1654462395377, 24.2],
                  [1654458795225, 24.16],
                  [1654455194391, 24.96],
                ],
              },
            ]}
          />
        </div>
        <div className="py-[13px] ml-[36px]">
          <SelectBox
            onChange={handleSelectData}
            value={selectedData}
            options={[
              { label: "Market Cap" },
              { label: "Volume" },
              { label: "Liquidity" },
              { label: "MACD" },
              { label: "RSI" },
            ]}
          />
        </div>
        <div className="lg:w-[500px] h-[160px] w-full">
          <LineChart
            data={[
              {
                name: "Price",
                data: [
                  [1654480394495, 24.56],
                  [1654476798656, 24.87],
                  [1654473196109, 24.2],
                  [1654469593732, 24.67],
                  [1654465994076, 24.7],
                  [1654462395377, 24.35],
                  [1654458795225, 24.16],
                  [1654455194391, 24.96],
                ],
              },
            ]}
            restOptions={{
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  inverseColors: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#292C77",
                      opacity: 1,
                    },
                    {
                      offset: 100,
                      color: "#7B439700",
                      opacity: 0,
                    },
                  ],
                },
              },
              colors: ["#29568B"],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceGraphs;
