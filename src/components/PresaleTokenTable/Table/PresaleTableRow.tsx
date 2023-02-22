/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";

import { useRouter } from "next/router";
import PresaleTableCell from "./PresaleTableCell";

const PresaleTableRow = ({ row }): JSX.Element => {
  const router = useRouter();

  const handleCellClick = () => {
    router.push(`/presale-token-info?tokenId=${row.original.id}`);
  };

  return (
    <div
      {...row.getRowProps()}
      className="min-w-[100%] h-[4.92rem] flex items-center text-sm xl:text-base text-text-primary dark:text-text-primary-dark cursor-pointer"
    >
      <div className="h-[4.5rem] flex w-full">
        {row.cells?.map((cell) => (
          <PresaleTableCell
            key={cell.getCellProps().key}
            cell={cell}
            onClick={handleCellClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PresaleTableRow;
