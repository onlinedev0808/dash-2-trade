import React, { useEffect, useState } from "react";
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
import { ColorString } from "highcharts/highcharts.src";
import bollingerBands from "highcharts/indicators/bollinger-bands";
import ichimokuKinkoHyo from "highcharts/indicators/ichimoku-kinko-hyo";
import rsi from "highcharts/indicators/rsi";
import stochastic from "highcharts/indicators/stochastic";

import Papa from "papaparse";

import { THEME_BASE } from "../../common/highcharts/HighChartsOptions";

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

const Graph = () => {
  const [options, setOptions] = useState<any>();
  Highcharts.setOptions(THEME_BASE);

  const defaultColor = Highcharts.getOptions().colors[0];
  const transparentColor = Highcharts.color(defaultColor)
    .setOpacity(0)
    .get("rgba");

  const [parsedData, setParsedData] = useState([]);

  // State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  // State to store the values
  const [values, setValues] = useState([]);
  const [values2, setValues2] = useState([]);

  const changeHandler = () => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(`${window.location.origin}/placeholder_test2.csv`, {
      header: true,
      download: true,
      delimiter: ",",
      complete(results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values

        setOptions({
          xAxis: {
            categories: valuesArray.map((val) => val[0]),
          },
          rangeSelector: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          colors: ["#5367FE", "#68dab6"],
          chart: {
            backgroundColor: "transparent",
            style: {
              fontFamily: "Poppins, sans-serif",
            },
            marginRight: 40,
          },
          yAxis: {
            gridLineColor: "#737373",
          },

          series: [
            {
              data: valuesArray.map((val) => +val[2]),
            },
            {
              data: valuesArray.map((val) => +val[3]),
            },
          ],
        });
      },
    });
  };

  useEffect(() => {
    changeHandler();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-8">Equity Curve</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType="stockChart"
        containerProps={{
          style: { width: "100%", height: "600px" },
        }}
      />
    </div>
  );
};

export default Graph;
