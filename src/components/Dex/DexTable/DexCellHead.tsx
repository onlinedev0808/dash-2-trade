import React from "react";

import {
  ID_LOGO,
  ID_REMAINING,
  ID_SOCIAL,
  ID_VARIATION,
  ID_MARKET,
  ID_PRICE_CHANGE,
  ID_CONTRACT,
} from "../configs";

import Tooltip, { TooltipPosY } from "../../common/Tooltip";
import PriceSelectBox from "../common/PriceSelectBox";

const DexCellHead = ({ column, onChange = null }): JSX.Element => {
  const { id: columnId } = column;

  let cellContent;

  if (
    columnId === ID_LOGO ||
    columnId === ID_CONTRACT ||
    columnId === ID_SOCIAL
  ) {
    cellContent = <>&nbsp;</>;
  }

  if (columnId === ID_REMAINING) {
    cellContent = (
      <span className="flex flex-nowrap gap-1 items-center">
        <span className="text-center">{column.Header}</span>
        <Tooltip
          title="Pool Remaining"
          message="Pool Remaining ........."
          positionY={TooltipPosY.Bottom}
          icon
        />
      </span>
    );
  }

  if (columnId === ID_VARIATION) {
    cellContent = (
      <span className="flex flex-nowrap gap-1 items-center">
        <span className="text-center">{column.Header}</span>
        <Tooltip
          title="Pool Variation"
          message="Pool Variation ........."
          positionY={TooltipPosY.Bottom}
          icon
        />
      </span>
    );
  }

  if (columnId === ID_MARKET) {
    cellContent = (
      <span className="flex flex-nowrap gap-1 items-center">
        <span className="text-center">{column.Header}</span>
        <Tooltip
          title="Market Cap"
          message="Market Cap ........."
          positionY={TooltipPosY.Bottom}
          icon
        />
      </span>
    );
  }

  if (columnId === ID_PRICE_CHANGE) {
    cellContent = <PriceSelectBox onChange={onChange} />;
  }

  return cellContent ?? column.render("Header");
};

export default DexCellHead;
