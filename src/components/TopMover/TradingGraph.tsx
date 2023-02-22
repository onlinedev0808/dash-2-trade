import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TradingGraph = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
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
            color: "#A330FF00",
            // opacity: 0
          },
          {
            offset: 100,
            color: "#BC3DCB",
            opacity: 1,
          },
        ],
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: { show: false },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: -26,
        right: 0,
        bottom: -26,
        left: 0,
      },
    },
  };
  return <Chart options={options} series={data} type="line" height="100%" />;
};

export default TradingGraph;
