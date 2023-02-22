import { NextPage } from "next";
import { useState } from "react";

import { colourGradientor, formatNumber } from "../../utils";

const HeatmapCellTooltip = ({ volume, clientY = 0, clientX = 0 }) => (
  <div
    className="fixed p-[6px] z-10 text-sm text-text-primary-dark"
    style={{
      background: "rgba(30, 30, 30, 0.8)",
      borderRadius: "5px",
      boxShadow: "2px 2px 6px -4px #999",
      top: `${clientY - 30}px`,
      left: `${clientX + 10}px`,
    }}
  >
    Volume: <span>${formatNumber(volume)}</span>
  </div>
);

interface IHeatmapCellProps {
  normalizedValue: number;
  isScale: boolean;
  colorStart?: number[];
  colorEnd?: number[];
  volume?: number | null;
  // unused ??
  time?: number | string;
  date?: number | string;
}

const HeatmapCell: NextPage<IHeatmapCellProps> = ({
  normalizedValue,
  isScale,
  colorStart = [34, 61, 140],
  colorEnd = [134, 158, 233],
  volume = null,
}) => {
  // normalizedValue ranges from 0-1. It is calculated by dividing the cells value by the maximum value in the dataset
  const initStateTooltip = { clientX: 0, clientY: 0 };

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    ...initStateTooltip,
  });

  const hoverHandler = () => setShowTooltip(true);

  const mouseLeaveHandler = () => {
    setShowTooltip(false);
    setTooltipPosition({ ...initStateTooltip });
  };

  const moveMouseHandler = (event) => {
    setTooltipPosition({
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  let tooltip: JSX.Element | string = "";

  if (
    volume !== null &&
    showTooltip &&
    tooltipPosition.clientX !== 0 &&
    tooltipPosition.clientY !== 0
  ) {
    tooltip = (
      <HeatmapCellTooltip
        volume={volume}
        clientX={tooltipPosition.clientX}
        clientY={tooltipPosition.clientY}
      />
    );
  }

  return (
    <div
      className={`${
        !isScale ? "w-[100%] cursor-pointer" : "w-[100%]"
      } h-full relative rounded`}
      onMouseMove={moveMouseHandler}
      onMouseEnter={hoverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div
        style={{
          background: `rgb(${colourGradientor(
            normalizedValue,
            colorStart,
            colorEnd
          )})`,
        }}
        className={`w-[100%] h-[100%] rounded transition-all ${
          !isScale && "hover:scale-90 cursor-pointer"
        } relative`}
      />
      {tooltip}
    </div>
  );
};

export default HeatmapCell;
