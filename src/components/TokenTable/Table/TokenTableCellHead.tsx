import React from "react";
import { TokenCols } from "../common/config";
import PeriodSelectBox from "../common/PeriodSelectBox";
import Tooltip, { TooltipPosY } from "../../common/Tooltip";
import { StarSvg } from "../../CommonSvg";

const TokenTableCellHead = ({
  column,
  onHistoryChange = null,
  onHistoryGraphChange = null,
}): JSX.Element => {
  const { id: columnId } = column;
  let cellContent;

  // if (
  //   columnId === ID_LOGO ||
  //   columnId === ID_CONTRACT ||
  //   columnId === ID_SOCIAL
  // ) {
  //   cellContent = <>&nbsp;</>;
  // }

  if (columnId === TokenCols.Watchlist) {
    cellContent = (
      <span className="w-full text-center text-button-primary">
        <StarSvg />
      </span>
    );
  }

  if (columnId === TokenCols.Name) {
    cellContent = <span className="w-full flex">{column.Header}</span>;
  }

  if (columnId === TokenCols.MarketCap) {
    cellContent = (
      <span className="flex flex-nowrap gap-2 items-center">
        {column.Header}
        <div className="w-6 h-6 flex items-center cursor-pointer">
          <Tooltip
            title="Market Cap"
            message=""
            positionY={TooltipPosY.Bottom}
            icon
          />
        </div>
      </span>
    );
  }

  if (columnId === TokenCols.SFollowing) {
    cellContent = (
      <span className="flex flex-nowrap gap-2 text-start items-center">
        <span className="max-w-fit">{column.Header}</span>
        <div className="w-7 h-6 flex items-center cursor-pointer">
          <Tooltip
            title="Social following"
            message=""
            positionY={TooltipPosY.Bottom}
            icon
          />
        </div>
      </span>
    );
  }

  if (columnId === TokenCols.SInteractions) {
    cellContent = (
      <span className="flex flex-nowrap gap-2 text-start">
        <span className="">{column.Header}</span>
      </span>
    );
  }

  if (columnId === TokenCols.CirculatingSupply) {
    cellContent = (
      <span className="flex flex-nowrap gap-2 items-center">
        <span className="">{column.Header}</span>
        <div className="w-6 h-6 flex items-center cursor-pointer">
          <Tooltip
            title="Circulating supply"
            message=""
            positionY={TooltipPosY.Bottom}
            icon
          />
        </div>
      </span>
    );
  }

  if (columnId === TokenCols.History) {
    cellContent = (
      <div className="w-full cursor-pointer">
        <PeriodSelectBox onChange={onHistoryChange} />
      </div>
    );
  }

  if (columnId === TokenCols.HistoryGraph) {
    cellContent = (
      <div className="w-full cursor-pointer">
        <PeriodSelectBox onChange={onHistoryGraphChange} />
      </div>
    );
  }

  if (columnId === TokenCols.ExtraMenu) {
    cellContent = <>&nbsp;</>;
  }

  return cellContent ?? column.render("Header");
};

export default TokenTableCellHead;
