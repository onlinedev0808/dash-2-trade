/* eslint-disable  react/jsx-props-no-spreading */
import React from "react";

import moment from "moment/moment";
import { TableCols as Cols } from "./config";
import { ContestSvg } from "../../CommonSvg";

const NameCell = ({ name }) => {
  return (
    <>
      <ContestSvg />
      <span className="pl-5">{name}</span>
    </>
  );
};

const DateCell = ({ timestamp }): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="uppercase">
        {moment.unix(timestamp).format("DD MMM, YYYY")}
      </div>
      <div className="text-text-secondary-dark text-xs">00:00:00</div>
    </div>
  );
};

const TokenTableCell = ({ cell, onClick }): JSX.Element => {
  const {
    value: columnValue,
    column: { id: columnId },
  } = cell;

  let cellContent;

  if (columnId === Cols.Name) {
    cellContent = <NameCell name={columnValue} />;
  }

  if ([Cols.EndDate, Cols.StartDate].includes(columnId)) {
    cellContent = <DateCell timestamp={+columnValue} />;
  }

  if (columnId === Cols.Action) {
    cellContent = (
      <button
        type="button"
        className="font-semibold leading-5 text-white bg-button-primary rounded py-4 px-4"
      >
        Details
      </button>
    );
  }

  return (
    <div {...cell.getCellProps()}>
      <div className="h-full p-2 flex items-center justify-start text-text-primary dark:text-text-primary-dark">
        {cellContent ?? cell.render("Cell")}
      </div>
    </div>
  );
};

export default TokenTableCell;
