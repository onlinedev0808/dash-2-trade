/* eslint-disable  react/jsx-props-no-spreading */

import React, { useEffect, useMemo, useState } from "react";
import { useElementSize } from "usehooks-ts";

import { Row, useBlockLayout, useColumnOrder, useTable } from "react-table";
import PresaleTableRow from "./PresaleTableRow";
import PresaleTableHead from "./PresaleTableHead";

const PresaleTable = ({
  data,
  columns,
  colSelectorData,
  setColSelectorData,
  onHeaderClick,
}): JSX.Element => {
  const [columnWidth, setColumnWidth] = useState(150);

  const [tableRef, { width: tableWidth }] = useElementSize();

  useEffect(() => {
    if (tableWidth <= 0) return;

    const calculateDefaultWidth = () => {
      const { sumWidth: widthSum, count: num } = columns.reduce(
        (acc, column) => {
          let { sumWidth, count } = acc;
          // if (column.minWidth) {
          // } else
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
        const width = (tableWidth - widthSum - 220) / (columns.length - num);

        setColumnWidth(width);
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
    // useFlexLayout
  );

  useEffect(() => {
    if (allColumns) {
      setColSelectorData(allColumns);
    }
  }, [allColumns]);

  return (
    <div className="flex flex-col gap-[inherit] text-sm">
      <div className="w-full overflow-auto box-content pb-7" ref={tableRef}>
        <div {...getTableProps()} className="w-full">
          <div className="relative z-[2] w-max">
            <PresaleTableHead
              headerGroups={headerGroups}
              setColumnOrder={setColumnOrder}
              allColumns={colSelectorData}
              onHeaderClick={onHeaderClick}
            />
          </div>

          <div {...getTableBodyProps()} className="relative z-[1] box-">
            {rows?.map((row: Row) => {
              prepareRow(row);
              return <PresaleTableRow key={row.getRowProps().key} row={row} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleTable;
