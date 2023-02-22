import { NextPage } from "next";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ILineChartProps {
  data: any;
  restOptions?: any;
}

const LineChart: NextPage<ILineChartProps> = ({ data, restOptions }) => {
  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
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
      type: "datetime",
      labels: {
        show: true,
        style: {
          colors: "#DBDFEA",
          fontSize: "8px",
          fontWeight: "normal",
        },
      },
      axisTicks: { show: false },
      axisBorder: {
        show: true,
        color: "#1D1E2C",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      title: {
        style: {
          color: "#fff",
          fontSize: "1vw",
          fontWeight: "medium",
        },
      },
      labels: {
        offsetX: -10,
        show: true,
        style: {
          colors: "#DBDFEA",
          fontSize: "8px",
          fontWeight: "normal",
        },
        formatter: (value) =>
          "$" +
          Number(value).toLocaleString("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
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
    ...restOptions,
  };

  return (
    <div className="bg-[#24263A] h-[100%]">
      <Chart
        options={options}
        series={data}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default LineChart;
