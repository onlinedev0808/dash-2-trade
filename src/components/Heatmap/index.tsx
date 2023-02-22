import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../common/Card";
import { TokenVolumeSvg } from "../CommonSvg";

import HeatmapCell from "./HeatmapCell";
import HeatScale from "./HeatScale";

// Creates a heatmap with colors ranging from white for 0 volume, to dark blue for whatever the maximum volume is
const HEATMAP_TIMES = [
  {
    id: 1,
    time: "4:00 am",
  },
  {
    id: 2,
    time: "8:00 am",
  },
  {
    id: 3,
    time: "12:00 pm",
  },
  {
    id: 4,
    time: "4:00 pm",
  },
  {
    id: 5,
    time: "8:00 pm",
  },
  {
    id: 6,
    time: "12:00 am",
  },
];

const WEEKDAYS = [
  {
    id: 1,
    day: "Sun",
  },
  {
    id: 2,
    day: "Mon",
  },
  {
    id: 3,
    day: "Tue",
  },
  {
    id: 4,
    day: "Wed",
  },
  {
    id: 5,
    day: "Thu",
  },
  {
    id: 6,
    day: "Fri",
  },
  {
    id: 7,
    day: "Sat",
  },
];

const Heatmap = ({ data, isScaleVisible = true }) => {
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (data) {
      let max = 0;
      data.forEach((datum) => {
        if (datum.volume > max) max = datum.volume;
      });
      setMaxValue(max);
    }
  }, [data]);

  return (
    <Card title="Volume" icon={<TokenVolumeSvg />}>
      {data ? (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <div className="grid gap-1 grid-cols-7 grid-rows-6 grid-flow-col w-[90%]">
                {data.map((item) => (
                  <div key={uuidv4()} className="h-8">
                    <HeatmapCell
                      normalizedValue={item.volume / maxValue}
                      volume={item.volume}
                      time={item.hour}
                      date={item.day}
                      isScale={false}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1 ml-2 text-xs text-text-primary dark:text-text-primary-dark">
                {HEATMAP_TIMES.map((item) => (
                  <span
                    key={item.id}
                    className="h-8 flex items-center font-normal"
                  >
                    {item.time}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-1 mt-2 text-xs w-[90%] text-text-primary dark:text-text-primary-dark">
              {WEEKDAYS.map((item) => (
                <span
                  key={item.id}
                  className="font-normal w-[100%] text-center"
                >
                  {item.day}
                </span>
              ))}
            </div>
            {isScaleVisible && <HeatScale maxValue={maxValue} />}
          </div>
          <div className="text-text-secondary dark:text-text-secondary-dark mt-5 text-xs">
            * Times are in UTC
          </div>
        </>
      ) : (
        <span className="text-text-secondary dark:text-text-secondary-dark">
          No volume data available
        </span>
      )}
    </Card>
  );
};

export default Heatmap;
