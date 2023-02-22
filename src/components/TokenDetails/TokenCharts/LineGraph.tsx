import { useState, useEffect } from "react";
import axios from "axios";

import DropdownList from "../../common/DropdownList";
import LineGraphChart from "../../common/LineGraphChart";

const periods = [
  { id: "1d", name: "Day" },
  { id: "1w", name: "Week" },
  { id: "2w", name: "2-Week" },
  { id: "1m", name: "Month" },
  { id: "3m", name: "3-Month" },
  { id: "1y", name: "Year" }
];

interface IInitData {
  data: any;
  name?: string;
}

const initData = [{ data: [] }];

const LineGraph = ({ type }) => {
  const [data, setData] = useState<IInitData[]>(initData);
  const [selectedPeriod, setSelectedPeriod] = useState(periods.at(0));

  const periodId = selectedPeriod.id;

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `/api/backend/tokens/historical?token_id=${type}&time_range=${periodId}`
        );

        if (response.data[type]) {
          const formattedData = response.data[type].map((item) => [
            item.timestamp,
            item.price
          ]);

          setData([
            {
              name: "Price",
              data: formattedData
            }
          ]);
        } else {
          setData(initData);
        }
      } catch (error) {
        setData(initData);
        console.log(error);
      }
    };

    fetchHistoricalData();
  }, [type, periodId]);

  const changePeriodHandler = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <>
      <div className="relative mb-3 z-[1] float-left">
        <DropdownList
          selected={selectedPeriod}
          items={periods}
          onChange={changePeriodHandler}
        />
      </div>
      <div className="mt-12 h-5/6">
        <LineGraphChart data={data} />
      </div>
    </>
  );
};

export default LineGraph;
