/* eslint-disable  no-bitwise */
import React, { Fragment, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ApexOptions } from "apexcharts";
import ThemeContext, { THEMES } from "../../theme";
import { ShieldSvg } from "../CommonSvg";

import Tooltip from "../common/Tooltip";
import { IPresaleTokenDistribution } from "../../types/redux";
import { basicColors } from "./common";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Tag = ({ text, className, icon }) => (
  <span
    className={`flex px-1.5 py-1 gap-1.5 items-center rounded-sm text-xs dark:text-primary ${className}`}
  >
    {icon && <div className="min-w-3 w-3">{icon}</div>} {text}
    <span className="mt-[-.6rem]">+</span>
  </span>
);

const CrossSign = () => <FontAwesomeIcon icon={faClose} className="w-3" />;

const noDataColor = ["#737373"];

const TokenMetricsChart = ({
  metrics,
}: {
  metrics: IPresaleTokenDistribution[] | null;
}) => {
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  const [data, setData] = useState([]);
  const [isCliff, setIsCliff] = useState(false);
  const [isVesting, setIsVesting] = useState(false);
  useEffect(() => {
    const metricsFormatting = (metricsData: IPresaleTokenDistribution[]) => {
      const convertedMetrics = [];

      for (let i = 0; i < Object.entries(metricsData)?.length; i++) {
        const [, { g: title, d: value, c = null, v = null }] =
          Object.entries(metricsData)[i];

        convertedMetrics.push({
          name: title?.split("_").join(" ") || "",
          value: +value,
          c: c === null ? c : +c,
          v: v === null ? v : +v,
        });
      }

      return convertedMetrics;
    };

    if (metrics === null || metrics?.length === 0) return;

    const finalMetrics = metricsFormatting(metrics);

    const cliff = finalMetrics?.filter((item) => item.c > 0);
    const vesting = finalMetrics?.filter((item) => item.v > 0);

    setData(finalMetrics);
    setIsCliff(cliff.length > 0);
    setIsVesting(vesting.length > 0);
  }, [metrics]);

  const state: ChartState = {
    series: data?.length === 0 ? [100] : data?.map((item) => +item.value),
    options: {
      colors: data?.length === 0 ? noDataColor : basicColors,
      labels:
        data?.length === 0 ? ["undefined"] : data?.map((item) => item.name),
      extraTooltips:
        data?.length === 0
          ? []
          : data?.map((item) => ({ c: item.c, v: item.v })),
      dataLabels: {
        enabled: false,
      },
      chart: {
        foreColor: isLightTheme ? "#545A75" : "#FFFFFF",
      },
      fill: {
        type: "gradient",
        gradient: {
          stops: [0, 50, 100],
        },
      },
      legend: {
        position: "top",
        fontSize: "15px",
        fontWeight: 500,
        horizontalAlign: "left",
        formatter: (seriesName, opts) => {
          const legendArray = [`<span class="mx-3">${seriesName}</span>`];
          if (seriesName !== "undefined") {
            legendArray?.unshift("%");
            legendArray?.unshift(opts?.w?.globals?.series[opts?.seriesIndex]);
          }

          return legendArray?.join(" ");
        },
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }) => {
          const { labels, colors } = w.globals;
          const { extraTooltips } = w.config;

          let tooltipValue = `<div class="p-2 flex flex-col text-sm " 
            style="background-color: ${colors[seriesIndex]}">
            <div class="leading-6"><b>${labels[seriesIndex]}</b>: ${series[seriesIndex]} %</div>`;

          if (extraTooltips?.length > 0) {
            const { c, v } = extraTooltips[seriesIndex];

            if (c)
              tooltipValue += `<div class="leading-6"><b>Cliff</b>: ${c} ${
                c === 1 ? "Month" : "Months"
              }</div>`;
            if (v)
              tooltipValue += `<div class="leading-6"><b>Vesting</b>: ${v} ${
                v === 1 ? "Month" : "Months"
              }</div>`;
          }

          tooltipValue += `</div>`;

          return tooltipValue;
        },
      },

      stroke: {
        colors: [isLightTheme ? "#F1EDF9" : "#121618"],
        width: 2,
        dashArray: 0,
        curve: "smooth",
        lineCap: "round",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
          },
        },
      },
      noData: {
        text: "No data",
        style: {
          color: isLightTheme ? "#121318" : "#FFFFFF",
          fontSize: "12px",
        },
      },
      responsive: [
        {
          breakpoint: 700,
          options: {
            legend: {
              fontSize: "10px",
              fontWeight: 500,
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            legend: {
              fontSize: "12px",
              fontWeight: 500,
            },
          },
        },
        {
          breakpoint: 2561,
          options: {
            legend: {
              fontSize: "13px",
              fontWeight: 500,
            },
          },
        },
      ],
    },
  };

  const renderCliffTag = () => (
    <Tooltip
      className="
            [&_.tooltip-container]:h-full
            [&_.tooltip-content]:p-3
            [&_.tooltip-content]:min-w-full
            [&_.tooltip-close]:top-3
            [&_.tooltip-close]:right-3
            "
      message={
        <div
          className="
              grid grid-cols-[max-content_max-content]
              gap-x-6 gap-y-1 pt-3
              text-xs font-normal
              text-text-secondary-dark
              [&_.tooltip-message-value]:text-text-primary
              [&_.tooltip-message-value]:dark:text-text-primary-dark
              "
        >
          {isCliff
            ? data?.map(
                (metric) =>
                  metric.c && (
                    <Fragment key={metric.name}>
                      {metric.name}
                      <span className="tooltip-message-value">{`${metric.c} ${
                        metric.c === 1 ? "Month" : "Months"
                      }`}</span>
                    </Fragment>
                  )
              )
            : "No cliff periods"}
        </div>
      }
    >
      <Tag
        text="Cliff"
        icon={isCliff ? <ShieldSvg /> : <CrossSign />}
        className={isCliff ? "bg-yellow" : "bg-gray-600 dark:bg-"}
      />
    </Tooltip>
  );

  const renderVestingTag = () => (
    <Tooltip
      className="
            [&_.tooltip-container]:h-full
            [&_.tooltip-content]:p-3
            [&_.tooltip-content]:min-w-full
            [&_.tooltip-close]:top-3
            [&_.tooltip-close]:right-3
            "
      message={
        <div
          className="
              grid grid-cols-[max-content_max-content]
              gap-x-6 gap-y-1 pt-3
              text-xs font-normal
              text-text-secondary-dark
              [&_.tooltip-message-value]:text-text-primary
              [&_.tooltip-message-value]:dark:text-text-primary-dark
              "
        >
          {isVesting
            ? data?.map(
                (metric) =>
                  metric.v && (
                    <Fragment key={metric.name}>
                      {metric.name}
                      <span className="tooltip-message-value">{`${metric.v} ${
                        metric.v === 1 ? "Month" : "Months"
                      }`}</span>
                    </Fragment>
                  )
              )
            : "No vesting periods"}
        </div>
      }
    >
      <Tag
        text="Vesting"
        icon={isVesting ? <ShieldSvg /> : <CrossSign />}
        className={isVesting ? "bg-yellow" : "bg-gray-600 dark:bg-"}
      />
    </Tooltip>
  );

  return (
    <div
      className="bg-transparent rounded-lg h-full min-h-[50vh] sm:min-h-0
     [&_.apexcharts-legend]:!w-full
     [&_.apexcharts-legend]:md:!flex
     [&_.apexcharts-legend-series]:!w-full
     [&_.apexcharts-legend-series]:!min-w-fit
     [&_.apexcharts-legend-series]:lg:!w-[45%]
     [&_.apexcharts-legend-series]:!flex
     [&_.apexcharts-legend]:md:!flex
     [&_.apexcharts-legend]:!p-0
     [&_.apexcharts-legend-text]:ml-1"
    >
      {metrics ? (
        <>
          <Chart
            options={state?.options}
            series={state?.series}
            type="donut"
            height="100%"
            width="100%"
          />
          <div className="flex gap-2">
            {renderCliffTag()}
            {renderVestingTag()}
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center mt-8">
          Tokenomics information is not available
        </div>
      )}
    </div>
  );
};

export default TokenMetricsChart;

interface ChartOptions extends ApexOptions {
  extraTooltips: { c: number | null; v: number | null }[];
}

interface ChartState {
  series: ApexOptions["series"];
  options: ChartOptions;
}
