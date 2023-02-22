/* eslint-disable no-case-declarations */
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
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

import { INITIAL_OPTIONS, THEME_BASE } from "./HighChartsOptions";
import { getOptions } from "./GetOptions";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  DragPanes(Highcharts);
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
}

const HighChartCandleStickVolume = ({
  OHLC = [],
  volume = [],
  title = "CandleStick",
  selectedIndicators,
}: {
  OHLC: number[][];
  volume: [number, number][];
  title: string;
  selectedIndicators: {
    name: string;
    value: string;
    isSelected?: boolean;
    params?: { name: string; value: string }[];
  }[];
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const initSeries = [
    {
      type: "candlestick",
      name: "",
      data: OHLC,
      id: title,
    },
  ];

  const getSelectedOptions = () => {
    const selectedItems = selectedIndicators.filter((item) => item.isSelected);
    if (!selectedItems.length) return [];
    return selectedItems.map((item) => ({
      value: item.value,
      params: item.params,
    }));
  };

  const [options, setOptions] = useState(
    getOptions(
      getSelectedOptions(),
      INITIAL_OPTIONS,
      initSeries,
      title,
      volume,
      selectedIndicators,
      isTabletOrMobile
    )
  );

  useEffect(() => {
    setOptions(
      getOptions(
        getSelectedOptions(),
        options,
        initSeries,
        title,
        volume,
        selectedIndicators,
        isTabletOrMobile
      )
    );
  }, [selectedIndicators]);

  Highcharts.setOptions(THEME_BASE);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType="stockChart"
      containerProps={{ style: { width: "100%", height: "600px" } }}
    />
  );
};

export default HighChartCandleStickVolume;
