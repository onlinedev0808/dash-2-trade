/* eslint-disable  react/jsx-props-no-spreading */

import React, { useMemo, useState, useEffect } from "react";
import { useElementSize } from "usehooks-ts";

import {
  Column,
  useTable,
  useExpanded,
  useColumnOrder,
  useBlockLayout,
} from "react-table";

import ColumnSelector from "./ColumnSelector";
import DexTableRow from "./DexTableRow";
import DexTableHead from "./DexTableHead";
import ChainFilter from "../common/ChainFilter";
import CardWrapper from "../../common/Wrapper";

const DexTable = ({
  columns,
  data,
}: {
  data: Array<any>;
  columns: Array<Column>;
}): JSX.Element => {
  const [columnWidth, setColumnWidth] = useState(150);
  const [historyInterval, setHistoryInterval] = useState();

  const [tableRef, { width: tableWidth }] = useElementSize();

  useEffect(() => {
    if (tableWidth <= 0) return;

    const calculateDefaultWidth = () => {
      const { sumWidth: widthSum, count: num } = columns.reduce(
        (acc, column) => {
          let { sumWidth, count } = acc;
          if (column.minWidth) {
            //sumWidth += column.minWidth;
            //count++;
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

        setColumnWidth(Math.floor(width));
      }
    };

    calculateDefaultWidth();
  }, [columns, tableWidth]);

  const defaultColumn = React.useMemo(
    () => ({
      width: columnWidth > 0 ? columnWidth : 150,
      minWidth: 90,
    }),
    [columnWidth]
  );

  const columnsTable = useMemo(() => {
    // We recreate columnsTable array to create a new reference to table columns value by creating a new array.
    return [...columns];
  }, [defaultColumn]);

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
    useExpanded,
    useColumnOrder,
    useBlockLayout
  );

  const handleHistoryChange = (result) => {
    setHistoryInterval(result);
  };

  return (
    <div className="flex flex-col gap-[inherit]">
      <div className="flex gap-3">
        <ColumnSelector columns={allColumns} />
        <ChainFilter />
      </div>

      <div className="w-full overflow-auto" ref={tableRef}>
        <div {...getTableProps()} className="w-full">
          <div className="relative z-[2]">
            <DexTableHead
              headerGroups={headerGroups}
              setColumnOrder={setColumnOrder}
              allColumns={allColumns}
              onPriceHistoryChange={handleHistoryChange}
            />
          </div>

          <div {...getTableBodyProps()} className="relative z-[1]">
            {rows?.map((row: any) => {
              prepareRow(row);
              return (
                <DexTableRow
                  key={row.getRowProps().key}
                  row={row}
                  historyInterval={historyInterval}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexTable;
