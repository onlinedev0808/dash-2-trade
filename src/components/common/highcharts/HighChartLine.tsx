import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import { ColorString } from "highcharts/highcharts.src";
import { useMediaQuery } from "react-responsive";
import { INITIAL_OPTIONS } from "./HighChartsOptions";
import { getOptions } from "./GetOptions";
import HighChartReact from "./HighChartsReact";

const HighChartLine = ({
  data,
  title = "Line",
  selectedIndicators,
  volume,
}: {
  data: [number, number][];
  title: string;
  selectedIndicators: {
    name: string;
    value: string;
    isSelected?: boolean;
    params?: { name: string; value: string }[];
  }[];
  volume: [number, number][];
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const defaultColor = Highcharts.getOptions().colors[0];
  const transparentColor = Highcharts.color(defaultColor)
    .setOpacity(0)
    .get("rgba");

  const initSeries = [
    {
      id: title,
      name: "Price",
      data,
      type: "areaspline",
      threshold: null,
      tooltip: {
        valueDecimals: 2,
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, defaultColor as ColorString],
          [1, transparentColor as ColorString],
        ],
      },
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

export default HighChartLine;
