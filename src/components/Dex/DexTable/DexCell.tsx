/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";
import { formatNumber } from "../../../utils";

import PriceRange from "../../PricesRange";
import PriceChange from "../common/PriceChange";
import DexPair from "../common/DexPair";

import { ContractIcon, ExclamationIcon } from "../../CommonSvg";
import Timer from "../../common/Timer";
import {
  ID_CONTRACT,
  ID_LIQUIDITY,
  ID_LOGO,
  ID_MARKET,
  ID_PAIR,
  ID_PRICE,
  ID_PRICE_CHANGE,
  ID_REMAINING,
  ID_SINCE,
  ID_SOCIAL,
  ID_VARIATION,
} from "../configs";

import PriceHistory from "../common/PriceHistory";
import Social from "../common/Social";
import SocialItem from "../common/Social/SocialItem";

const DexCell = ({ cell, isExpanded, historyInterval = null }): JSX.Element => {
  const {
    value: columnValue,
    column: { id: columnId },
  } = cell;

  let cellContent;

  if (columnId === ID_REMAINING) {
    cellContent = (
      <div className="overflow-hidden w-full h-[100%] flex items-end">
        <PriceRange current={columnValue.current} max={columnValue.max} />
      </div>
    );
  }

  if (columnId === ID_LOGO) {
    cellContent = (
      <DexPair
        fistDex={columnValue.at(0)}
        secondDex={columnValue.at(1)}
        img={cell.row.original.img}
      />
    );
  }

  if (columnId === ID_PAIR) {
    cellContent = (
      <span className="text-sm text-[#7482F2]">
        {columnValue.at(0)}/{columnValue.at(1)}
      </span>
    );
  }

  if (columnId === ID_PRICE) {
    cellContent = (
      <span className="text-text-primary dark:text-text-primary-dark">
        ${formatNumber(columnValue)}
      </span>
    );
  }

  if (columnId === ID_PRICE_CHANGE) {
    const { id: interval } = historyInterval;

    const prices = Object.entries(columnValue).map((item) => +item.at(1));

    cellContent = (
      <div className="relative">
        <PriceChange
          price={Math.abs(columnValue[interval])}
          up={columnValue[interval] > 0}
          suffix="%"
        />
        {isExpanded ? (
          <div className="absolute bottom-0 left-0 -translate-x-[38%] translate-y-[120%]">
            <PriceHistory prices={prices} />
          </div>
        ) : null}
      </div>
    );
  }

  if (columnId === ID_SINCE) {
    cellContent = <Timer date={columnValue} />;
  }

  if (columnId === ID_LIQUIDITY) {
    cellContent = (
      <span className="text-text-primary dark:text-text-primary-dark">
        ${formatNumber(columnValue)}
      </span>
    );
  }

  if (columnId === ID_VARIATION) {
    cellContent = (
      <PriceChange
        price={Math.abs(columnValue)}
        up={columnValue > 0}
        suffix="%"
      />
    );
  }

  if (columnId === ID_MARKET) {
    cellContent = <span>${formatNumber(columnValue)}</span>;
  }

  if (columnId === ID_CONTRACT) {
    cellContent = (
      <div className="relative">
        {columnValue ? <ContractIcon /> : <ExclamationIcon color="#FABF2C" />}
        {isExpanded ? (
          <div className="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[120%]">
            {columnValue ? (
              <Social />
            ) : (
              <SocialItem text="Contract unverified" color="yellow" />
            )}
          </div>
        ) : null}
      </div>
    );
  }

  if (columnId === ID_SOCIAL) {
    cellContent = "ICONS";
  }

  return (
    <div {...cell.getCellProps()}>
      <div className="h-[100%] p-2 flex items-center justify-center text-text-primary dark:text-text-primary-dark">
        {cellContent ?? cell.render("Cell")}
      </div>
    </div>
  );
};

export default DexCell;
