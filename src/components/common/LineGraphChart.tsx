import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineGraphChart = ({ data }) => {
  const graphOptions: ApexOptions = {
    //maintainAspectRatio: false,
    chart: {
      type: "line",
      toolbar: {
        show: true,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        colorStops: [
          {
            offset: 0,
            color: "#347184",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#3E4C97",
            opacity: 0,
          },
        ],
      },
    },
    colors: ["#1EE0AC"],
    xaxis: {
      tickPlacement: "on",
      type: "datetime",
      labels: {
        show: true,
        style: {
          colors: "#DBDFEA",
          fontWeight: "normal",
        },
      },
      axisTicks: { show: false },
      axisBorder: {
        show: true,
        color: "#1D1E2C",
        //height: 1,
        //width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      title: {
        text: "Price ($)",
        style: {
          color: "#fff",
          fontSize: "1vw",
          fontWeight: "medium",
        },
      },
      labels: {
        show: true,
        offsetX: -10,
        style: {
          colors: "#fff",
        },
        formatter: (value) =>
          "$" +
          Number(value).toLocaleString(
            "en-us",
            value < 1000
              ? {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              : {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
          ),
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) =>
          "$" +
          Number(value).toLocaleString("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    },
    grid: {
      show: true,
      borderColor: "#1D1E2C",
      strokeDashArray: 3,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <Chart options={graphOptions} series={data} type="area" height="100%" />
  );
};

export default LineGraphChart;
