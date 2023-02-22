/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";

import { useRouter } from "next/router";
import TokenTableCell from "./TokenTableCell";

const TokenTableRow = ({ row }): JSX.Element => {
  const router = useRouter();

  const handleCellClick = () => {
    router.push(`/tokens/${row.original.id}`);
  };

  return (
    <div
      {...row.getRowProps()}
      className="min-w-[100%] h-[4.92rem] flex items-center text-sm xl:text-base text-text-primary dark:text-text-primary-dark cursor-pointer"
    >
      <div>
        <div className="h-[4.5rem] flex">
          {row.cells?.map((cell) => (
            <TokenTableCell
              key={cell.getCellProps().key}
              cell={cell}
              onClick={handleCellClick}
            />
          ))}
        </div>
        {row.isExpanded ? <div className="h-[7.5rem] py-2">&nbsp;</div> : null}
      </div>
    </div>
  );
};

export default TokenTableRow;
