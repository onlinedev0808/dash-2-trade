/* eslint-disable  react/jsx-props-no-spreading */

import React, { useEffect, useMemo, useState } from "react";
import { useElementSize } from "usehooks-ts";

import { Column, useBlockLayout, useColumnOrder, useTable } from "react-table";

import ColumnSelector from "./ColumnSelector";
import TokenTableRow from "./TokenTableRow";
import TokenTableHead from "./TokenTableHead";
import { SearchSvg } from "../../CommonSvg";

const TokenTable = ({
  data,
  columns,
  setHistoryInterval,
}: {
  data: Array<any>;
  columns: Array<Column>;
  setHistoryInterval: any;
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [columnWidth, setColumnWidth] = useState(150);

  const [tableRef, { width: tableWidth }] = useElementSize();

  const defaultColumn = React.useMemo(
    () => ({
      width: columnWidth > 0 ? columnWidth : 150,
      minWidth: 90,
    }),
    [columnWidth]
  );

  const columnsTable = useMemo(
    () =>
      // We recreate columnsTable array to create a new reference to table columns value by creating a new array.
      [...columns],
    [defaultColumn]
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    allColumns,
    setColumnOrder,
  } = useTable(
    {
      columns: columnsTable,
      data,
      defaultColumn,
    },
    useColumnOrder,
    useBlockLayout
  );

  useEffect(() => {
    if (tableWidth <= 0) return;

    const calculateDefaultWidth = () => {
      const { sumWidth: widthSum, count: num } = columns.reduce(
        (acc, column) => {
          let { sumWidth, count } = acc;
          if (column.minWidth) {
            // sumWidth += column.minWidth;
            // count++;
          } else if (column.width) {
            sumWidth += column.minWidth;
            count++;
          }
          return { sumWidth, count };
        },
        { sumWidth: 0, count: 0 }
      );

      const columnCount = columns.length - num;

      if (tableWidth && columnCount) {
        const width = (tableWidth - widthSum) / (columns.length - num);

        setColumnWidth(width);
      }
    };

    calculateDefaultWidth();
  }, [columns, tableWidth]);


  const handleHistoryChange = (result) => {
    setHistoryInterval(result);
  };

  return (
    <div className="flex flex-col gap-[inherit] text-sm">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl w-full pl-1">Tokens</h1>
        <div className="flex gap-3">
          <ColumnSelector
            columns={allColumns}
            btnClasses="  border-1 border-[#F1F3FF]
        bg-white dark:border-0"
          />
          <div
            className="flex items-center justify-start

            px-3 outline-none rounded
            bg-button-primary text-text-primary-dark
            placeholder:text-text-primary placeholder:dark:text-text-primary-dark"
          >
            <input
              type="search"
              className="w-[4.5rem] h-[2.5rem] py-1 font-semibold	text-sm outline-none rounded
            bg-button-primary
           "
              value={searchQuery}
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchSvg w={14} h={14} />
          </div>
        </div>
      </div>

      <div className="w-full overflow-auto box-content pb-7" ref={tableRef}>
        <div {...getTableProps()} className="w-full">
          <div className="relative z-[2]">
            <TokenTableHead
              headerGroups={headerGroups}
              setColumnOrder={setColumnOrder}
              allColumns={allColumns}
              onHistoryChange={handleHistoryChange}
              onHistoryGraphChange={handleHistoryChange}
            />
          </div>

          <div {...getTableBodyProps()} className="relative z-[1] box-">
            {rows?.map((row: any) => {
              prepareRow(row);
              return <TokenTableRow key={row.getRowProps().key} row={row} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
