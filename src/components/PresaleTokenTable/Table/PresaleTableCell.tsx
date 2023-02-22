/* eslint-disable  react/jsx-props-no-spreading */
/* eslint-disable   @typescript-eslint/no-unused-expressions */
import React from "react";
import { PresalesCols } from "../common/config";
import { StarSvg } from "../../CommonSvg";
import RoundedImage from "../../common/RoundedImage";
import {
  ChainLogo,
  PLACEHOLDER,
  RenderMetric,
  ScoreColor,
  TokenTags,
} from "../common/tokenUtils";
import Timer from "../../common/Timer";

const PresaleTableCell = ({ cell, onClick = () => {} }): JSX.Element => {
  const {
    value: columnValue,
    column: { id: columnId },
  } = cell;

  let isClickable = true;
  let cellContent;

  switch (columnId) {
    case PresalesCols.Watchlist: {
      const watchlistId = columnValue.watchlists.find((list) =>
        list.Tokens.includes(columnValue.id)
      )?.id;

      cellContent = (
        <span
          className="w-full pl-3"
          onClick={(e) => {
            e.stopPropagation();
            columnValue.handleWatchlistClick(columnValue.id, watchlistId);
          }}
        >
          <StarSvg
            stroke={cellContent ? null : "#5367FE"}
            fill={cellContent || watchlistId ? "#5367FE" : null}
          />
        </span>
      );
      isClickable = false;
      break;
    }

    case PresalesCols.Name: {
      cellContent = (
        <div className="flex gap-5 items-center w-full" onClick={onClick}>
          <div className="min-w-12 min-h-12 w-12 h-12 max-w-12 max-h-12">
            <RoundedImage
              logo={columnValue.logo}
              alt={columnValue.name}
              className="min-w-12 min-h-12 w-12 h-12 max-w-12 max-h-12"
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">{columnValue.name}</div>
            <div className="text-text-secondary">{columnValue.symbol}</div>
          </div>
        </div>
      );
      break;
    }

    case PresalesCols.Score: {
      cellContent = (
        // <div className="w-full flex justify-center">
        <div
          className={`flex items-center justify-center rounded-lg
           bg-highlight dark:bg-highlight-dark
            w-9 h-9 md:w-11 md:h-11 
            ${ScoreColor(columnValue)}`}
        >
          {columnValue[0]}
        </div>
        // </div>
      );
      break;
    }

    case PresalesCols.End: {
      cellContent = columnValue.end ? (
        <div className="flex flex-col h-full">
          <span>{columnValue.end}</span>
          <span>
            {columnValue.isActive ? (
              <Timer isEndDate date={columnValue.presaleStop} />
            ) : (
              "Ended"
            )}

            {/* {columnValue.left} */}
          </span>
        </div>
      ) : (
        <span>Unannounced</span>
      );
      break;
    }

    case PresalesCols.Tags: {
      cellContent = (
        <div className="!overflow-visible flex flex-wrap gap-1">
          <TokenTags
            audit={columnValue.audit}
            vcBacked={columnValue.vcBacked}
            kyc={columnValue.kyc}
            tokenDistribution={columnValue.tokenDistribution}
            tooltipYPos={columnValue.tooltipYPos}
          />
        </div>
      );
      break;
    }

    case PresalesCols.HardCap: {
      cellContent = (
        <div className="flex items-center gap-2">
          {columnValue.cap}
          {columnValue.currency && <span>{columnValue.currency}</span>}
        </div>
      );
      break;
    }

    case PresalesCols.SFollowing:
    case PresalesCols.SInteractions: {
      cellContent = columnValue.count ? (
        <RenderMetric
          count={+columnValue.count}
          change={+columnValue.change}
          className="flex-col"
        />
      ) : (
        PLACEHOLDER
      );
      break;
    }

    case PresalesCols.Chain: {
      cellContent = (
        <div className="flex flex-col gap-2">
          {columnValue.chain?.symbol ? (
            <ChainLogo
              chain={columnValue.chain.symbol}
              logo={columnValue.chain?.logo}
            />
          ) : (
            <ChainLogo chain="Own" logo={columnValue.tokenLogo} />
          )}
        </div>
      );
      break;
    }

    default: {
      cellContent = cell.render("Cell");
    }
  }
  //
  // if (columnId === PresalesCols.Watchlist) {
  //   const watchlistId = columnValue.watchlists.find((list) =>
  //     list.Tokens.includes(columnValue.id)
  //   )?.id;
  //
  //   cellContent = (
  //     <span
  //       className="w-full text-center"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         columnValue.handleWatchlistClick(columnValue.id, watchlistId);
  //       }}
  //     >
  //       <StarSvg
  //         stroke={cellContent ? null : "#5367FE"}
  //         fill={cellContent || watchlistId ? "#5367FE" : null}
  //       />
  //     </span>
  //   );
  // }
  //
  // if (columnId === PresalesCols.Name) {
  //   cellContent = (
  //     <div className="flex gap-5 items-center w-full" onClick={onClick}>
  //       <img src={columnValue.logo} alt="token" className="h-12 w-12" />
  //       <div className="flex flex-wrap">
  //         <div className="w-full">{columnValue.name}</div>
  //         <div className="text-text-secondary">{columnValue.symbol}</div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // if (columnId === PresalesCols.SFollowing) {
  //   let textColor = "text-text-secondary dark:text-text-secondary-dark";
  //   if (columnValue.change > 0) textColor = "text-green";
  //   else if (columnValue.change < 0) textColor = "text-red";
  //
  //   cellContent = (
  //     <div className="flex flex-wrap" onClick={onClick}>
  //       <span className="w-full  text-text-primary dark:text-text-primary-dark mb-[2px]">
  //         {formatNumber(columnValue.followers) ?? 0}
  //       </span>
  //       <span className={`w-full text-xs  ${textColor} `}>
  //         ({columnValue.change > 0 ? "+" : ""}
  //         {formatNumber(columnValue.change) ?? 0} %)
  //       </span>
  //     </div>
  //   );
  // }
  //
  // if (columnId === PresalesCols.SInteractions) {
  //   let textColor = "text-text-secondary dark:text-text-secondary-dark";
  //   if (columnValue.change > 0) textColor = "text-green";
  //   else if (columnValue.change < 0) textColor = "text-red";
  //
  //   cellContent = (
  //     <div className="flex flex-wrap" onClick={onClick}>
  //       <span className="w-full  text-text-primary dark:text-text-primary-dark mb-[2px]">
  //         {formatNumber(columnValue.interactions) ?? 0}
  //       </span>
  //       <span className={`w-full text-xs ${textColor} `}>
  //         ({columnValue.change > 0 ? "+" : ""}
  //         {formatNumber(columnValue.change) ?? 0} %)
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <div className="pr-4">
      <div
        {...cell.getCellProps()}
        className="h-full w-full p-2 !flex !items-center !justify-start text-text-primary dark:text-text-primary-dark"
        onClick={isClickable ? onClick : null}
      >
        {cellContent}
      </div>
    </div>
  );
};

export default PresaleTableCell;
