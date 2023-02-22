import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-named-as-default
import HighChartCandleStickVolume from "../common/highcharts/HighChartCandleStickVolume";

const CandleStick = ({ title, data = [], selectedIndicators }) => {
  const [OHLCData, setOHLCData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    if (data.length === 0) return;
    setOHLCData(
      data.map((item) => [item[0], item[1], item[2], item[3], item[4]])
    );

    setVolumeData(data.map((item) => [item[0], item[5]]));
  }, [data]);

  return (
    <div>
      {OHLCData?.length && volumeData?.length > 0 ? (
        <HighChartCandleStickVolume
          OHLC={OHLCData}
          volume={volumeData}
          title={title}
          selectedIndicators={selectedIndicators}
        />
      ) : null}
    </div>
  );
};

export default CandleStick;
