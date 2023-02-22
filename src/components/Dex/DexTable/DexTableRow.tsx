/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";

import DexCell from "./DexCell";

const DexTableRow = ({ row, historyInterval = null }): JSX.Element => {
  return (
    <div
      {...row.getRowProps()}
      onClick={() => row.toggleRowExpanded()}
      className="border-b border-border-primary min-w-[100%] text-sm xl:text-base text-text-primary dark:text-text-primary-darke"
    >
      <div>
        <div className="h-[4.5rem] flex">
          {row.cells?.map((cell) => {
            return (
              <DexCell
                key={cell.getCellProps().key}
                cell={cell}
                isExpanded={row.isExpanded}
                historyInterval={historyInterval}
              />
            );
          })}
        </div>
        {row.isExpanded ? <div className="h-[7.5rem] py-2">&nbsp;</div> : null}
      </div>
    </div>
  );
};

export default DexTableRow;
