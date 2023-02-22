import React from "react";
import { TextColorEnum } from "../../types/enums";
import Card from "../common/Card";

import Tooltip from "../common/Tooltip";

const InfoCard = ({
  titleFirst,
  titleSecond = "",
  textFirst,
  textFirstColor = TextColorEnum.Neutral,
  textSecond = "",
  textSecondColor = TextColorEnum.Neutral,
  tooltip = null,
}: InfoCardProps): JSX.Element => {
  const isDecreasing = textSecond[0] === "-";
  const isIncreasing = textSecond[0] === "+";

  let symbol;

  if (isDecreasing) {
    symbol = <span>&#8595;</span>;
  } else if (isIncreasing) {
    symbol = <span>&#8593;</span>;
  } else {
    symbol = "";
  }

  const calcSecondTextColor = () => {
    if (isDecreasing) return TextColorEnum.Red;
    if (isIncreasing) return TextColorEnum.Green;

    return textSecondColor;
  };

  return (
    <div className="rounded-card p-4 bg-foreground dark:bg-foreground-dark flex grow flex-col gap-y-2 justify-between">
      <div className="flex justify-between text-sm text-text-primary dark:text-text-primary-dark">
        <div className="flex items-center gap-2">
          <div className="text-text-secondary dark:text-text-secondary-dark">
            {titleFirst}
          </div>
          {tooltip && (
            <Tooltip title={tooltip.title} message={tooltip.message} icon />
          )}
        </div>
        <div className="text-text-secondary dark:text-text-secondary-dark">
          {titleSecond}
        </div>
      </div>
      <div className="flex font-medium justify-between 2xl:text-lg lg:text-base text-sm text-text-primary dark:text-text-primary-dark">
        <div className={`mr-2 ${textFirstColor}`}>{textFirst}</div>
        <div className={`${calcSecondTextColor()}`}>
          {symbol} {symbol ? textSecond.slice(1) : textSecond}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

interface InfoCardProps {
  titleFirst: string;
  titleSecond?: string;
  textFirst: any;
  textSecond?: any;
  textFirstColor?: TextColorEnum;
  textSecondColor?: TextColorEnum;
  className?: string;
  tooltip?: { title: string; message: string } | null;
}
