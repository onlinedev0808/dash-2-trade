import React, { useEffect, useMemo, useState } from "react";

import { Column, useBlockLayout, useColumnOrder, useTable } from "react-table";
import { useElementSize } from "usehooks-ts";

import Row from "./TableRow";
import Head from "./TableHead";

const defaultWidth = 150;

const Table = ({
  data,
  columns,
}: {
  data: Array<any>;
  columns: Array<Column>;
}): JSX.Element => {
  const [columnWidth, setColumnWidth] = useState(defaultWidth);
  const [tableRef, { width: tableWidth }] = useElementSize();

  const defaultColumn = React.useMemo(
    () => ({
      width: columnWidth > 0 ? columnWidth : defaultWidth,
      minWidth: 90,
    }),
    [columnWidth]
  );

  useEffect(() => {
    if (tableWidth <= 0) return;

    const calculateDefaultWidth = () => {
      const { sumWidth: widthSum, count: num } = columns.reduce(
        (acc, column) => {
          let { sumWidth, count } = acc;
          if (column.width) {
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

  const columnsTable = useMemo(() => [...columns], [defaultColumn]);

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

  return (
    <div className="w-full overflow-auto box-content pb-7" ref={tableRef}>
      <div {...getTableProps()} className="w-full">
        <div className="relative z-[2]">
          <Head
            headerGroups={headerGroups}
            setColumnOrder={setColumnOrder}
            allColumns={allColumns}
          />
        </div>

        <div {...getTableBodyProps()} className="relative z-[1] box">
          {rows?.map((row: any) => {
            prepareRow(row);
            return <Row key={row.getRowProps().key} row={row} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
