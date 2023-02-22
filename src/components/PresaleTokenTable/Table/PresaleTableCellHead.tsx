import React from "react";
import { PresalesCols } from "../common/config";
import Tooltip, { TooltipPosY } from "../../common/Tooltip";
import { ArrowsSvg, StarSvg } from "../../CommonSvg";

const PresaleTableCellHead = ({ column, onClick = null }): JSX.Element => {
  const { id: columnId } = column;
  let isSortable = true;
  let cellContent;

  // const scoreRef = useRef();

  switch (columnId) {
    case PresalesCols.Watchlist: {
      cellContent = (
        <span className="pl-3 text-button-primary">
          <StarSvg />
        </span>
      );
      isSortable = false;
      break;
    }

    case PresalesCols.Score: {
      // const isOverflown = scoreRef.current && checkOverflow(scoreRef.current)
      cellContent = (
        <>
          {/* <div className="max-w-[40px] 4xl:max-w-max"> */}
          {/* <div className="flex flex-col flex-wrap overflow-hidden h-[10px]"> */}
          {/*  <div className={"h-[10px]"}>{column.render("Header")}</div> */}
          {/* <div className={`max-w-fit h-[13px] ${isOverflown && "max-w-min"} `} ref={scoreRef}> */}
          {column.render("Header")}
          {/* </div> */}
          <Tooltip
            message="DashScore scoring system is based on 5 main categories, and every category has its own weight, where the maximum total a project can score is 100"
            title="Dash Score"
            positionY={TooltipPosY.Bottom}
            icon
          />
        </>
      );
      break;
    }

    case PresalesCols.Tags: {
      cellContent = column.render("Header");
      isSortable = false;
      break;
    }

    case PresalesCols.SFollowing: {
      cellContent = (
        <>
          {column.render("Header")}
          <Tooltip
            message="Total social followers with 7 day percentage variation"
            title="Social Following"
            positionY={TooltipPosY.Bottom}
            icon
          />
        </>
      );
      break;
    }

    default: {
      cellContent = column.render("Header");
    }
  }

  const handleClick = () => onClick(columnId);

  const withSorting = (content) => (
    <div className="relative flex items-center text-start gap-2">
      {content}
      <span
        onClick={handleClick}
        className="cursor-pointer text-text-secondary dark:text-text-secondary-dark"
      >
        <ArrowsSvg />
      </span>
    </div>
  );

  return isSortable ? withSorting(cellContent) : cellContent;
};

export default PresaleTableCellHead;
