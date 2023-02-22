import React, { useMemo, useState } from "react";

import { tableColumnsConfig } from "./config";

import Table from "./Table";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Digital Buzz",
    rank: "-",
    award: "3,750 USDT",
    participants: "54",
    start: 1672741331,
    end: 1672741331,
  },
  {
    id: 2,
    name: "Weekly Battle #55",
    rank: "-",
    award: "3,750 USDT",
    participants: "54",
    start: 1672741331,
    end: 1672741331,
  },
];

const TableMain = (): JSX.Element => {
  const data = DUMMY_DATA;
  const tableColumns = useMemo(() => tableColumnsConfig, []);

  if (data.length === 0) return null;

  return (
    <>
      <Table data={DUMMY_DATA} columns={tableColumns} />
      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="w-[14rem] h-[3.5rem] rounded-lg py-2 px-3 mb-8 flex items-center justify-center cursor-pointer
            text-text-primary-dark border-1 border-button-primary "
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default TableMain;
