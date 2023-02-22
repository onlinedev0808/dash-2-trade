import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { NextPage } from "next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ICandleStickChartProps {
  yTitle?: string;
  data: any;
  title?: string;
}

const CandleStickChart: NextPage<ICandleStickChartProps> = ({
  yTitle,
  data = [],
}) => {
  const state: ApexOptions = {
    chart: {
      // type: 'candlestick',
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          //   reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: "tradingchart",
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    tooltip: {
      theme: "dark", // available options light/dark
      // style: {
      //     fontSize: '12px',
      //     fontFamily: undefined
      //   },
    },
    title: {
      text: "CandleStick",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "normal",
        fontFamily: "Poppins, sans-serif",
        color: "#FFFFFF80",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF80",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    yaxis: {
      title: {
        text: yTitle,
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#FFFFFF80",
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
        },
      },
      // logarithmic: true,
      // forceNiceScale: true,
      // floating: true,
      // tickAmount: 0,
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
        align: "right",
        // minWidth: 0,
        // maxWidth: 160,
        style: {
          colors: ["#FFFFFF80"],
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      },
      opposite: true, // y axis position
    },
    grid: {
      show: true,
      strokeDashArray: 1,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#5367FE",
          downward: "#68DAB6",
        },
      },
    },
  };

  return (
    <Chart options={state} series={data} type="candlestick" height="600px" />
  );
};

export default CandleStickChart;
