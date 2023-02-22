/* eslint-disable import/prefer-default-export */
export const getOptions = (
  types,
  options,
  initialSeries,
  chartTitle,
  volume,
  indicators,
  isMobile = false
) => {
  let series = [...initialSeries];

  const axises = [...types, ...initialSeries];

  const baseHeight = 100 / axises.length;
  const heightDelta = 30;
  const heightTop = types.length ? baseHeight + heightDelta : 100;
  const height = types.length ? (100 - heightTop) / types.length : 0;

  let yAxis: {
    labels: { align: string; x?: number; enabled?: boolean };
    top?: string;
    height: string;
    resize?: { enabled: boolean };
    offset?: number;
  }[] = [];

  try {
    types.forEach((type, index) => {
      const axis = index + 1;
      switch (type.value) {
        case "ema": {
          const val = type.params.find(
            (param) => param.name === "period"
          )?.value;
          series = [
            ...series,
            {
              yAxis: axis,
              type: "ema",
              linkedTo: chartTitle,
            },
            {
              yAxis: axis,
              type: "ema",
              linkedTo: chartTitle,
              params: {
                period: +val || 50,
              },
            },
          ];
          break;
        }
        case "macd": {
          const val = type.params.find(
            (param) => param.name === "period"
          )?.value;
          series = [
            ...series,
            {
              yAxis: axis,
              type: "macd",
              linkedTo: chartTitle,
              params: {
                shortPeriod: 12,
                longPeriod: +val || 26,
                signalPeriod: 9,
                period: +val || 26,
              },
            },
          ];
          break;
        }
        case "bb":
          series = [
            ...series,
            {
              yAxis: axis,
              type: "bb",
              linkedTo: chartTitle,
            },
          ];
          break;
        case "ikh":
          series = [
            ...series,
            {
              yAxis: axis,
              type: "ikh",
              linkedTo: chartTitle,
              tenkanLine: {
                styles: {
                  lineColor: "lightblue",
                },
              },
              kijunLine: {
                styles: {
                  lineColor: "darkred",
                },
              },
              chikouLine: {
                styles: {
                  lineColor: "lightgreen",
                },
              },
              senkouSpanA: {
                styles: {
                  lineColor: "green",
                },
              },
              senkouSpanB: {
                styles: {
                  lineColor: "red",
                },
              },
              senkouSpan: {
                color: "rgba(0, 255, 0, 0.3)",
                styles: {
                  fill: "rgba(0, 0, 255, 0.1)",
                },
              },
            },
          ];
          break;
        case "rsi":
          series = [
            ...series,
            {
              yAxis: axis,
              type: "rsi",
              linkedTo: chartTitle,
            },
          ];
          break;
        case "stochastic":
          series = [
            ...series,
            {
              yAxis: axis,
              type: "stochastic",
              linkedTo: chartTitle,
            },
          ];
          break;
        case "obv": {
          series = [
            ...series,
            {
              linkedTo: chartTitle,
              type: "obv",
              params: {
                volumeSeriesID: `${chartTitle}-volume`,
              },
              showInLegend: true,
              yAxis: axis,
            },
          ];
          break;
        }
        case "sma": {
          const val = type.params.find(
            (param) => param.name === "period"
          )?.value;
          series = [
            ...series,
            {
              yAxis: axis,
              type: "sma",
              linkedTo: chartTitle,
            },
            {
              yAxis: axis,
              type: "sma",
              linkedTo: chartTitle,
              params: {
                period: +val || 50,
              },
            },
          ];
          break;
        }
        case "dmi": {
          const val = type.params.find(
            (param) => param.name === "period"
          )?.value;
          series = [
            ...series,
            {
              type: "dmi",
              linkedTo: chartTitle,
              yAxis: axis,
              params: {
                period: +val || 9,
              },
            },
          ];
          break;
        }
        case "aroon": {
          const val = type.params.find(
            (param) => param.name === "period"
          )?.value;
          series = [
            ...series,
            {
              yAxis: axis,
              type: "aroon",
              linkedTo: chartTitle,
              color: "green",
              lineWidth: 1,
              aroonDown: {
                styles: {
                  lineColor: "red",
                },
              },
              params: {
                period: +val || 25,
              },
            },
          ];
          break;
        }
        case "volume":
          series = [
            ...series,
            {
              type: "column",
              name: "Volume",
              data: volume,
              yAxis: axis,
              id: `${chartTitle}-volume`,
            },
          ];
          break;
        default:
          series = [...series];
      }
    });

    yAxis = [
      {
        labels: {
          enabled: !isMobile,
          align: "right",
          x: 35,
        },
        height: `${heightTop}%`,
        resize: {
          enabled: true,
        },
        offset: 0,
      },
    ];

    indicators.forEach((type, index) =>
      yAxis.push({
        labels: {
          enabled: !isMobile,
          align: "left",
        },
        top: `${heightTop + height * index}%`,
        height: `${height}%`,
        resize: {
          enabled: true,
        },
        offset: 0,
      })
    );
  } catch (err) {
    console.log(err);
  }

  return {
    ...options,
    title: {
      text: chartTitle,
      align: "left",
    },
    yAxis,
    series,
    exporting: {
      enabled: !isMobile,
    },
    chart: {
      marginRight: isMobile ? 0 : 40,
      // NOTE: Highcharts doesn't allow to set chart height in rems
      height: isMobile ? "400px" : "600px",
    },
  };
};
