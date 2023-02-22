import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import DragPanes from "highcharts/modules/drag-panes";
// HighCharts indicators
import indicators from "highcharts/indicators/indicators";
import ema from "highcharts/indicators/ema";
import obv from "highcharts/indicators/obv";
import dmi from "highcharts/indicators/dmi";
import aroon from "highcharts/indicators/aroon";
import macd from "highcharts/indicators/macd";
import bollingerBands from "highcharts/indicators/bollinger-bands";
import ichimokuKinkoHyo from "highcharts/indicators/ichimoku-kinko-hyo";
import rsi from "highcharts/indicators/rsi";
import stochastic from "highcharts/indicators/stochastic";

import { THEME_BASE } from "./HighChartsOptions";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  indicators(Highcharts);
  ema(Highcharts);
  macd(Highcharts);
  bollingerBands(Highcharts);
  ichimokuKinkoHyo(Highcharts);
  rsi(Highcharts);
  stochastic(Highcharts);
  obv(Highcharts);
  dmi(Highcharts);
  aroon(Highcharts);
  DragPanes(Highcharts);
}

const HighChartReact = ({ options }) => {
  Highcharts.setOptions(THEME_BASE);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType="stockChart"
      containerProps={{
        style: { width: "100%", height: "100%" },
      }}
    />
  );
};

export default HighChartReact;
