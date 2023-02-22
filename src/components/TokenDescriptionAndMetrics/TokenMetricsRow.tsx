import React from "react";
import Tooltip from "../common/Tooltip";
import { SocialTrend } from "../CommonSvg";

const TokenMetricsRow = ({
  title,
  secondTitle,
  value,
  secondValue,
  isTrend = false,
  hasTooltip = false,
  tooltipText = "",
}): JSX.Element => {
  const isDecreasing = secondValue[0] === "-";
  const isIncreasing = secondValue[0] === "+";

  const getClasses = () => {
    if (isTrend) {
      return secondValue === "up"
        ? "text-green scale-y-[-1]"
        : "text-red translate-y-[-2px]";
    }

    if (isDecreasing) return "text-red";
    if (isIncreasing) return "text-green";

    return "text-text-primary dark:text-text-primary-dark";
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
        <div className="flex items-center flex-wrap gap-2">
          {title}
          {hasTooltip && (
            <Tooltip
              title={title}
              message={tooltipText}
              className="text-white"
              icon
            />
          )}
        </div>
        {secondTitle}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-base">{value}</div>
        <div className={`${getClasses()} text-base`}>
          {isTrend ? <SocialTrend /> : secondValue}
        </div>
      </div>
    </div>
  );
};

export default TokenMetricsRow;
