/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { INITIAL_OPTIONS } from "./HighChartsOptions";
import { getOptions } from "./GetOptions";
import HighChartReact from "./HighChartsReact";

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

  return <HighChartReact options={options} />;
};

export default HighChartCandleStickVolume;
