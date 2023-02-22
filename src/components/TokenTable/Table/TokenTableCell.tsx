/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";
import { formatNumber } from "../../../utils";
import { TokenCols } from "../common/config";
import { StarSvg, VerticalDotsSvg } from "../../CommonSvg";
import TableHistoryGraph from "./TableHistoryGraph";

const TokenTableCell = ({ cell, onClick }): JSX.Element => {
  const {
    value: columnValue,
    column: { id: columnId },
  } = cell;

  let cellContent;

  if (columnId === TokenCols.Watchlist) {
    const watchlistId = columnValue.watchlists.find((list) =>
      list.Tokens.includes(columnValue.id)
    )?.id;

    cellContent = (
      <span
        className="w-full text-center"
        onClick={(e) => {
          e.stopPropagation();
          columnValue.handleWatchlistClick(columnValue.id, watchlistId);
        }}
      >
        <StarSvg
          stroke={cellContent ? null : "#5367FE"}
          fill={cellContent || watchlistId ? "#5367FE" : null}
        />
      </span>
    );
  }

  if (columnId === TokenCols.Name) {
    cellContent = (
      <div className="flex gap-5 items-center w-full" onClick={onClick}>
        <img src={columnValue.logo} alt="token" className="h-12 w-12" />
        <div className="flex flex-wrap">
          <div className="w-full">{columnValue.name}</div>
          <div className="text-text-secondary">{columnValue.symbol}</div>
        </div>
      </div>
    );
  }

  if (columnId === TokenCols.History) {
    const differencePercent = (columnValue.at(-1) / columnValue[0]) * 100 - 100;
    const formatted = formatNumber(differencePercent);

    let textColor = "text-text-secondary dark:text-text-secondary-dark";
    if (formatted > 0) textColor = "text-green";
    else if (formatted < 0) textColor = "text-red";

    cellContent = (
      <span className={textColor} onClick={onClick}>
        {formatted > 0 ? "+" : ""}
        {formatted}%
      </span>
    );
  }

  if (columnId === TokenCols.Price) {
    cellContent = (
      <span
        className="text-text-primary dark:text-text-primary-dark"
        onClick={onClick}
      >
        ${formatNumber(columnValue)}
      </span>
    );
  }

  if (columnId === TokenCols.MarketCap) {
    cellContent = <span onClick={onClick}>${formatNumber(columnValue)}</span>;
  }

  if (columnId === TokenCols.Volume) {
    let textColor = "text-text-secondary dark:text-text-secondary-dark";
    if (columnValue.change > 0) textColor = "text-green";
    else if (columnValue.change < 0) textColor = "text-red";

    cellContent = (
      <div className="flex flex-wrap" onClick={onClick}>
        <span className="w-full  text-text-primary dark:text-text-primary-dark">
          ${formatNumber(columnValue.currentUSD)}
        </span>
        <span className="w-full text-xs text-text-secondary dark:text-text-secondary-dark mb-[2px]">
          {`${formatNumber(columnValue.current)} ${columnValue.symbol}`}
        </span>
        <span className={`w-full text-xs  ${textColor} `}>
          ({columnValue.change > 0 ? "+" : ""}
          {formatNumber(columnValue.change) ?? 0} %)
        </span>
      </div>
    );
  }

  if (columnId === TokenCols.CirculatingSupply) {
    const percent = columnValue.max / 100;
    const percentage = Math.round(columnValue.current / percent);

    cellContent = (
      <div
        className=" w-full h-full flex gap-y-2 flex-wrap items-end"
        onClick={onClick}
      >
        <span>{`${formatNumber(columnValue.current)} ${
          columnValue.symbol
        }`}</span>

        <div className="w-full h-full relative">
          <span className="absolute h-[6px] w-full flex rounded bg-bg-t-table dark:bg-bg-t-table-dark" />
          <span
            style={{ width: `${percentage}%` }}
            className="absolute z-10 h-[6px] rounded bg-button-wallet"
          />
        </div>
        {/* <PriceRange current={columnValue.current} max={columnValue.max} /> */}
      </div>
    );
  }

  if (columnId === TokenCols.SFollowing) {
    let textColor = "text-text-secondary dark:text-text-secondary-dark";
    if (columnValue.change > 0) textColor = "text-green";
    else if (columnValue.change < 0) textColor = "text-red";

    cellContent = (
      <div className="flex flex-wrap" onClick={onClick}>
        <span className="w-full  text-text-primary dark:text-text-primary-dark mb-[2px]">
          {formatNumber(columnValue.followers) ?? 0}
        </span>
        <span className={`w-full text-xs  ${textColor} `}>
          ({columnValue.change > 0 ? "+" : ""}
          {formatNumber(columnValue.change) ?? 0} %)
        </span>
      </div>
    );
  }

  if (columnId === TokenCols.SInteractions) {
    let textColor = "text-text-secondary dark:text-text-secondary-dark";
    if (columnValue.change > 0) textColor = "text-green";
    else if (columnValue.change < 0) textColor = "text-red";

    cellContent = (
      <div className="flex flex-wrap" onClick={onClick}>
        <span className="w-full  text-text-primary dark:text-text-primary-dark mb-[2px]">
          {formatNumber(columnValue.interactions) ?? 0}
        </span>
        <span className={`w-full text-xs ${textColor} `}>
          ({columnValue.change > 0 ? "+" : ""}
          {formatNumber(columnValue.change) ?? 0} %)
        </span>
      </div>
    );
  }

  if (columnId === TokenCols.HistoryGraph) {
    const formattedData = columnValue.map((stamp, i) => [i, stamp]);

    cellContent = <TableHistoryGraph data={[{ data: formattedData }]} />;
  }

  if (columnId === TokenCols.ExtraMenu) {
    cellContent = (
      <div
        className="ml-2 w-8 h-8 flex items-center justify-center
     text-text-primary dark:text-text-primary-dark
     border-1 border-border-secondary rounded-lg
     cursor-pointer
     "
      >
        <VerticalDotsSvg />
      </div>
    );
  }

  return (
    <div {...cell.getCellProps()}>
      <div className="h-full p-2 flex items-center justify-start text-text-primary dark:text-text-primary-dark">
        {cellContent ?? cell.render("Cell")}
      </div>
    </div>
  );
};

export default TokenTableCell;
