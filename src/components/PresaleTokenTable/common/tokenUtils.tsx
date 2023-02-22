import React, { Fragment, ReactNode } from "react";
import Link from "next/link";
import { LineWave } from "react-loader-spinner";
import { formatNumber, getChangeColor } from "../../../utils";
import { AddToListIcon, ShieldSvg, WatchlistIcon } from "../../CommonSvg";
import Tooltip from "../../common/Tooltip";
import RoundedImage from "../../common/RoundedImage";

export const PLACEHOLDER = "-";
export const dateFormat = "YYYY.MM.DD";

export const calcCliffVestingTooltip = (distribution) => {
  const cliff = [];
  const vesting = [];

  if (distribution) {
    distribution.forEach(({ g, c, v }) => {
      const name = g?.replaceAll("_", " ");

      const cliffItem = c && (
        <Fragment key={name}>
          {name}
          <span className="tooltip-message-value">{`${c} ${
            c === 1 ? "Month" : "Months"
          }`}</span>
        </Fragment>
      );

      const vestingItem = v && (
        <Fragment key={name}>
          {name}
          <span className="tooltip-message-value">{`${v} ${
            v === 1 ? "Month" : "Months"
          }`}</span>
        </Fragment>
      );

      if (cliffItem) cliff.push(cliffItem);
      if (vestingItem) vesting.push(vestingItem);
    });
  }

  return {
    cliff: cliff.length > 0 ? cliff : null,
    vesting: vesting.length > 0 ? vesting : null,
  };
};

export const Tag = ({ text, className, icon }) => (
  <span
    className={`flex p-[0.125rem] md:p-1 pb-[0.05rem] md:pb-[0.1875rem] gap-0.5 md:gap-1 items-center rounded-sm bg-green text-[0.6rem] md:text-[.63rem] text-navigation-background dark:text-primary ${className}`}
  >
    {icon && <div className="min-w-3 w-3">{icon}</div>} {text}
  </span>
);

export const MetricFormat = (metric) =>
  (metric && formatNumber(+metric)) ?? PLACEHOLDER;

export const TokenTags = ({
  audit,
  vcBacked,
  kyc,
  tokenDistribution,
  tooltipYPos,
}) => {
  const { vesting } = calcCliffVestingTooltip(tokenDistribution);

  const tooltipClasses = `
    [&_.tooltip-container]:h-full
    [&_.tooltip-content]:p-3
    [&_.tooltip-close]:top-3
    [&_.tooltip-close]:right-3
  `;

  const messageClasses = `
     grid grid-cols-[max-content_max-content]
     gap-x-6 gap-y-1 pt-3
     text-xs font-normal
     text-text-secondary-dark
     [&_.tooltip-message-value]:text-text-primary
     [&_.tooltip-message-value]:dark:text-text-primary-dark
  `;

  return (
    <>
      {audit && (
        <Tag
          icon={audit ? <ShieldSvg width="0.625rem" /> : null}
          text="Audit"
          className={`${audit ? "bg-green" : "bg-orange"}`}
        />
      )}
      {vcBacked && (
        <Tag
          icon={vcBacked ? <ShieldSvg width="0.625rem" /> : null}
          text="VC"
          className={`${vcBacked ? "bg-green" : "bg-orange"}`}
        />
      )}
      {kyc && (
        <Tag
          icon={kyc ? <ShieldSvg width="0.625rem" /> : null}
          text="External KYC"
          className={` ${kyc ? "bg-green" : "bg-orange"}`}
        />
      )}
      {vesting && (
        <Tooltip
          className={tooltipClasses}
          message={
            <div className={messageClasses}>
              {vesting || "No vesting periods"}
            </div>
          }
          positionY={tooltipYPos}
        >
          <Tag text="Vesting" icon={<ShieldSvg />} className="bg-yellow" />
        </Tooltip>
      )}
      {/* {cliff && (
        <Tooltip
          className={tooltipClasses}
          message={
            <div className={messageClasses}>{cliff || "No cliff periods"}</div>
          }
          positionY={tooltipYPos}
        >
          <Tag text="Cliff" icon={<ShieldSvg />} className="bg-yellow" />
        </Tooltip>
      )} */}
    </>
  );
};

export const LoadingLineWave = ({ width = "100%", height = "100%" }) => (
  <LineWave
    color="#5367FE"
    ariaLabel="line-wave"
    wrapperStyle={{
      position: "absolute",
      zIndex: "2",
      width,
      height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
    visible
  />
);

export const getChainLogo = (chainList, symbol) =>
  chainList.find((c) => c.label === symbol)?.logo;

export const ChainLogo = ({ chain, logo }) => (
  /* const src =
    chain === "Own L1" || chain === "Own"
      ? logo
      : `/chain-logos/${chain?.toLowerCase()}.svg`; */

  <>
    <RoundedImage logo={logo} alt={chain} className="h-5 w-5" />
    {chain}
  </>
);

export const AddWatchListButton = ({ onClick }) => (
  <button
    className="bg-button-primary hover:bg-highlight-button-primary rounded px-4 py-2.5 flex gap-3 items-center"
    onClick={onClick}
  >
    <AddToListIcon color="white" />
    <WatchlistIcon color="white" />
  </button>
);

export const ScoreColor = (score) => {
  let scoreColor;

  if (score >= 0 && score < 50) scoreColor = " text-red";
  else if (score >= 70) scoreColor = " text-green";
  else scoreColor = " text-[#C6A656]";

  return scoreColor;
};

export const CardTokenLink = ({
  tokenId,
  children,
}: {
  tokenId: string | number;
  children: ReactNode;
}) => (
  <Link
    href={{
      pathname: `/presale-token-info`,
      query: {
        tokenId, // pass the token id
      },
    }}
  >
    {children}
  </Link>
);

export const getCap = (row, type) => {
  const cap = row[`${type}cap`];

  if (!cap) return PLACEHOLDER;

  return (
    <div className="flex items-center gap-2">
      {formatNumber(+cap)}

      <span>{row.cap_currency}</span>
    </div>
  );
};

export const RenderMetric = ({
  count,
  change,
  className = "",
}: {
  count: number;
  change: number;
  className?: string;
}) => {
  const positiveChange = Math.abs(change);
  const rounded = positiveChange >= 10 ? 0 : 2;
  const prefix = change < 0 ? "-" : "+";

  const displayedValue =
    change === 0 ? 0 : `${prefix}${formatNumber(positiveChange, rounded)}`;

  return (
    <span className={`flex gap-0.5 ${className}`}>
      <span>{formatNumber(count)}</span>
      <span className={getChangeColor(change)}>({displayedValue}%)</span>
    </span>
  );
};
