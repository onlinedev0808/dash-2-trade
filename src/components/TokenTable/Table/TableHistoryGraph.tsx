import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TableHistoryGraph = ({ data }) => {

  const options: ApexOptions = {
    colors:['#5D5FEF'],
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
    dataLabels:{
      enabled:false
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 90, 100]
    //   }
    // },
    fill: {
      type: "gradient",
      opacity:0,
      gradient: {
        shadeIntensity: 1,
        // inverseColors: false,
        // opacityFrom:0.7,
        // opacityTo:0.1,
        colorStops: [
          {
            offset: 0,
            color: "#5D5FEF",
            opacity: 0.7
          },
          {
            offset: 100,
            color: "#5D5FEF",
            opacity: 0,
          },
        ],
      },
    },
    xaxis: {
      type: "numeric",
      labels: {
        show: false,
      },
      axisTicks: { show: false },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      // tickAmount: 6,
      // forceNiceScale:true
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: -26,
        right: 0,
        bottom: -20,
        left: 0,
      },
    },
  };

  return <Chart options={options} series={data} type="area" height="100%" />;
  // return <div />;
};

export default TableHistoryGraph;
