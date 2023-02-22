import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ICandleChartProps {
  data: any;
  restOptions?: any;
}

const CandleChart: NextPage<ICandleChartProps> = ({ data, restOptions }) => {
  const options = {
    chart: {
      type: "candlestick",
      toolbar: {
        show: false,
        offsetY: "-10",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "hh",
        show: true,
        style: {
          colors: "#AAA",
          fontSize: "0.625rem",
          fontWeight: "normal",
        },
      },
    },
    yaxis: [
      {
        forceNiceScale: true,
        seriesName: "Price",
        opposite: false,
        min: 6550,
        max: 6650,
        labels: {
          show: true,
          offsetX: -10,
          style: {
            fontSize: "0.625rem",
            colors: ["#AAA"],
          },
          formatter: (value) => `${(value - 6600).toFixed(0)}%`,
        },
      },
      {
        tooltip: {
          enabled: true,
        },
        forceNiceScale: true,
        seriesName: "Price",
        opposite: true,
        min: 6550,
        max: 6650,
        labels: {
          show: true,
          offsetX: -10,
          style: {
            fontSize: "0.625rem",
            colors: ["#AAA"],
          },
          formatter: (value) => value.toFixed(1),
        },
      },
    ],
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) =>
          `$${Number(value).toLocaleString("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
    grid: {
      show: true,
      borderColor: "#4d4e51",
      strokeDashArray: 0,
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
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#5367fe",
          downward: "#68dab6",
        },
      },
    },
    ...restOptions,
  };

  return (
    <Chart
      options={options}
      series={data}
      height="100%"
      width="100%"
      type="candlestick"
    />
  );
};

const data = [
  {
    x: new Date(1538778600000),
    y: [6629.81, 6650.5, 6623.04, 6633.33],
  },
  {
    x: new Date(1538780400000),
    y: [6632.01, 6643.59, 6620, 6630.11],
  },
  {
    x: new Date(1538782200000),
    y: [6630.71, 6648.95, 6623.34, 6635.65],
  },
  {
    x: new Date(1538784000000),
    y: [6635.65, 6651, 6629.67, 6638.24],
  },
  {
    x: new Date(1538785800000),
    y: [6638.24, 6640, 6620, 6624.47],
  },
  {
    x: new Date(1538787600000),
    y: [6624.53, 6636.03, 6621.68, 6624.31],
  },
  {
    x: new Date(1538789400000),
    y: [6624.61, 6632.2, 6617, 6626.02],
  },
  {
    x: new Date(1538791200000),
    y: [6627, 6627.62, 6584.22, 6603.02],
  },
  {
    x: new Date(1538793000000),
    y: [6605, 6608.03, 6598.95, 6604.01],
  },
  {
    x: new Date(1538794800000),
    y: [6604.5, 6614.4, 6602.26, 6608.02],
  },
  {
    x: new Date(1538796600000),
    y: [6608.02, 6610.68, 6601.99, 6608.91],
  },
  {
    x: new Date(1538798400000),
    y: [6608.91, 6618.99, 6608.01, 6612],
  },
  {
    x: new Date(1538800200000),
    y: [6612, 6615.13, 6605.09, 6612],
  },
  {
    x: new Date(1538802000000),
    y: [6612, 6624.12, 6608.43, 6622.95],
  },
  {
    x: new Date(1538803800000),
    y: [6623.91, 6623.91, 6615, 6615.67],
  },
  {
    x: new Date(1538805600000),
    y: [6618.69, 6618.74, 6610, 6610.4],
  },
  {
    x: new Date(1538807400000),
    y: [6611, 6622.78, 6610.4, 6614.9],
  },
  {
    x: new Date(1538809200000),
    y: [6614.9, 6626.2, 6613.33, 6623.45],
  },
  {
    x: new Date(1538811000000),
    y: [6623.48, 6627, 6618.38, 6620.35],
  },
  {
    x: new Date(1538812800000),
    y: [6619.43, 6620.35, 6610.05, 6615.53],
  },
  {
    x: new Date(1538814600000),
    y: [6615.53, 6617.93, 6610, 6615.19],
  },
  {
    x: new Date(1538816400000),
    y: [6615.19, 6621.6, 6608.2, 6620],
  },
  {
    x: new Date(1538818200000),
    y: [6619.54, 6625.17, 6614.15, 6620],
  },
  {
    x: new Date(1538820000000),
    y: [6620.33, 6634.15, 6617.24, 6624.61],
  },
  {
    x: new Date(1538821800000),
    y: [6625.95, 6626, 6611.66, 6617.58],
  },
  {
    x: new Date(1538823600000),
    y: [6619, 6625.97, 6595.27, 6598.86],
  },
  {
    x: new Date(1538825400000),
    y: [6598.86, 6598.88, 6570, 6587.16],
  },
  {
    x: new Date(1538827200000),
    y: [6588.86, 6600, 6580, 6593.4],
  },
  {
    x: new Date(1538829000000),
    y: [6593.99, 6598.89, 6585, 6587.81],
  },
  {
    x: new Date(1538830800000),
    y: [6587.81, 6592.73, 6567.14, 6578],
  },
  {
    x: new Date(1538832600000),
    y: [6578.35, 6581.72, 6567.39, 6579],
  },
  {
    x: new Date(1538834400000),
    y: [6579.38, 6580.92, 6566.77, 6575.96],
  },
  {
    x: new Date(1538836200000),
    y: [6575.96, 6589, 6571.77, 6588.92],
  },
  {
    x: new Date(1538838000000),
    y: [6588.92, 6594, 6577.55, 6589.22],
  },
  {
    x: new Date(1538839800000),
    y: [6589.3, 6598.89, 6589.1, 6596.08],
  },
  {
    x: new Date(1538841600000),
    y: [6597.5, 6600, 6588.39, 6596.25],
  },
  {
    x: new Date(1538843400000),
    y: [6598.03, 6600, 6588.73, 6595.97],
  },
  {
    x: new Date(1538845200000),
    y: [6595.97, 6602.01, 6588.17, 6602],
  },
  {
    x: new Date(1538847000000),
    y: [6602, 6607, 6596.51, 6599.95],
  },
  {
    x: new Date(1538848800000),
    y: [6600.63, 6601.21, 6590.39, 6591.02],
  },
  {
    x: new Date(1538850600000),
    y: [6591.02, 6603.08, 6591, 6591],
  },
  {
    x: new Date(1538852400000),
    y: [6591, 6601.32, 6585, 6592],
  },
  {
    x: new Date(1538854200000),
    y: [6593.13, 6596.01, 6590, 6593.34],
  },
  {
    x: new Date(1538856000000),
    y: [6593.34, 6604.76, 6582.63, 6593.86],
  },
  {
    x: new Date(1538857800000),
    y: [6593.86, 6604.28, 6586.57, 6600.01],
  },
  {
    x: new Date(1538859600000),
    y: [6601.81, 6603.21, 6592.78, 6596.25],
  },
  {
    x: new Date(1538861400000),
    y: [6596.25, 6604.2, 6590, 6602.99],
  },
  {
    x: new Date(1538863200000),
    y: [6602.99, 6606, 6584.99, 6587.81],
  },
  {
    x: new Date(1538865000000),
    y: [6587.81, 6595, 6583.27, 6591.96],
  },
  {
    x: new Date(1538866800000),
    y: [6591.97, 6596.07, 6585, 6588.39],
  },
  {
    x: new Date(1538868600000),
    y: [6587.6, 6598.21, 6587.6, 6594.27],
  },
  {
    x: new Date(1538870400000),
    y: [6596.44, 6601, 6590, 6596.55],
  },
  {
    x: new Date(1538872200000),
    y: [6598.91, 6605, 6596.61, 6600.02],
  },
  {
    x: new Date(1538874000000),
    y: [6600.55, 6605, 6589.14, 6593.01],
  },
  {
    x: new Date(1538875800000),
    y: [6593.15, 6605, 6592, 6603.06],
  },
  {
    x: new Date(1538877600000),
    y: [6603.07, 6604.5, 6599.09, 6603.89],
  },
  {
    x: new Date(1538879400000),
    y: [6604.44, 6604.44, 6600, 6603.5],
  },
  {
    x: new Date(1538881200000),
    y: [6603.5, 6603.99, 6597.5, 6603.86],
  },
  {
    x: new Date(1538883000000),
    y: [6603.85, 6605, 6600, 6604.07],
  },
  {
    x: new Date(1538884800000),
    y: [6604.98, 6606, 6604.07, 6606],
  },
];

const TradingSignalDialog = ({ isOpen, close }) => (
  <div
    onClick={close}
    className={`fixed inset-0 flex justify-center overflow-y-auto z-50 bg-black/50 backdrop-blur-sm ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-[#121318] rounded-xl w-[42.75rem] mx-auto text-white flex flex-col my-10 h-fit"
    >
      <div className="flex flex-row justify-between items-center p-5">
        <div className="flex items-center gap-5">
          <p className="text-lg leading-[1.75rem]">Trading Signal:</p>
          <div className="text-white bg-[#5D5FEF] px-4 py-1 text-base leading-[1.3rem] rounded-[0.5rem]">
            D2T
          </div>
        </div>
        <button className="h-fit" onClick={close}>
          <FontAwesomeIcon icon={faXmark} className="w-[1rem]" />
        </button>
      </div>

      <div className="w-full p-5 h-[18.75rem]">
        <CandleChart
          data={[
            {
              name: "Price",
              data,
            },
          ]}
        />
      </div>

      <hr className="w-full border-white/[0.1]" />

      <div className="p-8">
        <div className="border-white/[0.1] border-1 bg-[#444444]/[0.2] flex flex-col gap-4 rounded px-6 py-4">
          <div className="flex justify-between">
            <div className="w-[50%] flex justify-between">
              <p>Trader</p>
              <p>:</p>
            </div>
            <p>WarrentBCrypto</p>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%] flex justify-between">
              <p>Metrics</p>
              <p>:</p>
            </div>
            <p>RSI</p>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%] flex justify-between">
              <p>Direction</p>
              <p>:</p>
            </div>
            <p>Bearish</p>
          </div>
        </div>
      </div>

      <hr className="w-full border-white/[0.1]" />

      <div className="w-full py-5 px-10 flex justify-between items-center text-lg leading-[1.625rem]">
        <p className="">Wins</p>
        <div className="bg-[#50E3C2]/[0.2] border-1 border-[#50E3C2] rounded w-[5.3rem] py-1 text-center">
          11
        </div>
      </div>

      <hr className="w-full border-white/[0.1]" />

      <div className="w-full py-5 px-10 flex justify-between items-center text-base leading-[1.625rem]">
        <p className="">Losses</p>
        <div className="bg-[#E3507A]/[0.2] border-1 border-[#E3507A] rounded w-[5.3rem] py-1 text-center">
          10
        </div>
      </div>

      <hr className="w-full border-white/[0.1]" />

      <div className="w-full py-5 px-10 flex justify-between items-center text-base leading-[1.625rem]">
        <p className="">Return</p>
        <div className="bg-[#50E3C2]/[0.2] border-1 border-[#50E3C2] rounded w-[5.3rem] py-1 text-center">
          +5%
        </div>
      </div>

      <hr className="w-full border-white/[0.1]" />

      <div className="w-full flex justify-end gap-5 p-5 items-center">
        <p className="text-base leading-[1.625rem]">Share</p>

        <button
          type="button"
          className={`text-sm leading-[1.3rem] text-white bg-button-primary px-5 py-2.5 rounded hover:bg-highlight-button-primary flex items-center justify-center gap-2 duration-300 `}
        >
          <FontAwesomeIcon icon={faCaretRight} />
          <p>dash2.trade/test/t1231</p>
        </button>
      </div>
    </div>
  </div>
);

export default TradingSignalDialog;
