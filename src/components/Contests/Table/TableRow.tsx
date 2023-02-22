import React from "react";

import Cell from "./TableCell";

const Row = ({ row }) => {
  const handleClick = () => {};

  return (
    <div
      {...row.getRowProps()}
      className="min-w-[100%] h-[4.92rem] flex items-center text-sm xl:text-base text-text-primary dark:text-text-primary-dark cursor-pointer"
    >
      <div>
        <div className="h-[4.5rem] flex border-b-1 border-border-primary">
          {row.cells?.map((cell) => (
            <Cell
              key={cell.getCellProps().key}
              cell={cell}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
