/* eslint-disable no-nested-ternary */
import { sentimentTitleEnum } from "../../../types/enums";
import { formatNumber, getChangeColor } from "../../../utils";
import { SocialTrend } from "../../CommonSvg";
import { setPrefix } from "../../PresaleTokenInfo/common";

const SocialCard = ({
  title,
  subtitle,
  classes = "",
  value,
  secondValue,
  isTrend = false,
}) => {
  const graphIcoClasses =
    secondValue === "up"
      ? "text-green scale-y-[-1]"
      : secondValue === "down"
      ? "text-red translate-y-[-0.125rem]"
      : "text-text-secondary dark:text-text-secondary-dark flex items-center";

  return (
    <div className={`flex flex-col gap-2 ${classes}`}>
      <div className="flex justify-between">
        <span className="text-text-secondary dark:text-text-secondary-dark">
          {title}
        </span>
        <span className="text-text-secondary dark:text-text-secondary-dark">
          {subtitle}
        </span>
      </div>

      {!isTrend && (
        <div className="flex justify-between">
          <span className="text-lg">{value && formatNumber(value)}</span>
          <span className={`text-lg ${getChangeColor(+secondValue)}`}>
            {setPrefix(+secondValue)}
            {secondValue}%
          </span>
        </div>
      )}
      {isTrend && (
        <div className="flex justify-between items-center">
          <span className="text-lg">{sentimentTitleEnum[value]}</span>
          <span className="text-lg">
            <div className={graphIcoClasses}>
              {secondValue === "flat" ? (
                <div className="border-text-secondary dark:border-text-secondary-dark border-t-solid border-t-2 w-5 h-0.5" />
              ) : (
                <SocialTrend />
              )}
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default SocialCard;
