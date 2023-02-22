import React from "react";
import { formatNumber } from "../../utils";
import Tooltip from "../common/Tooltip";
import RoundedImage from "../common/RoundedImage";

const TokenDescription = ({
  shortName,
  longName,
  description,
  logo,
  price,
  priceDelta = "",
  dashScore,
  listingInfo = "",
  socialMetrics,
}: Props): JSX.Element => {
  const hasPrice = price != null;
  const isDashScore = dashScore != null;

  const isDecreasing = priceDelta[0] === "-";
  const isIncreasing = Math.ceil(+priceDelta) !== 0 && !isDecreasing;

  let symbol;

  if (isDecreasing) {
    symbol = <span>&#8595;</span>;
  } else if (isIncreasing) {
    symbol = <span>&#8593;</span>;
  } else {
    symbol = "";
  }

  const calcPriceDeltaColor = () => {
    if (isDecreasing) return "bg-red";
    if (isIncreasing) return "bg-green";
    return priceDelta;
  };

  return (
    <div className="flex flex-col justify-between flex-auto p-4 rounded-card bg-foreground dark:bg-foreground-dark">
      <div className="mb-6">
        <div className="flex justify-between mb-6">
          <div className="flex gap-6">
            <RoundedImage logo={logo} alt="token logo" className="w-[4.5rem]" />
            <div className="flex flex-col justify-center">
              <p className="font-medium	text-[2rem]">{longName}</p>
              <p className="font-normal text-sm text-[#7A7F93]">{shortName}</p>
            </div>
          </div>
          {hasPrice && (
            <div className="mt-6 mr-3">
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                Price
              </p>
              <div className="flex items-center gap-3 rounded">
                <p className="text-lg text-text-primary dark:text-text-primary-dark">
                  ${formatNumber(+price)}
                </p>
                <p
                  className={`text-sm h-max rounded-sm px-0.5 text-text-primary dark:text-text-primary-dark tracking-wider ${calcPriceDeltaColor()}`}
                >
                  {symbol}
                  {priceDelta}%
                </p>
              </div>
            </div>
          )}
          {isDashScore && (
            <div className="rounded bg-highlight dark:bg-highlight-dark text-text-secondary dark:text-text-secondary-dark text-sm py-2 px-3">
              <div className="flex items-center gap-2">
                Dash Score
                <Tooltip
                  message="DashScore scoring system is based on 5 main categories, and every category has its own weight, where the maximum total a project can score is 100"
                  title="Dash Score"
                  icon
                />
              </div>
              <span className="text-xl text-text-secondary dark:text-text-secondary-dark">
                {dashScore > 0 ? dashScore : "N/A"}
              </span>
            </div>
          )}
        </div>
        <p className="font-normal leading-8">{description}</p>
      </div>

      <div className="flex text-xs justify-between gap-2 gap-y-4 flex-wrap">
        <div className="flex text-sm text-text-primary dark:text-text-primary-dark">
          {listingInfo}
        </div>

        {/* <ShareableCard>
          <Shareable
            name={longName}
            symbol={shortName}
            logo={logo}
            description={description}
            listingOn={listingInfo}
            devActivity={{
              count: socialMetrics?.devActivity,
              change: socialMetrics?.devActivityDelta,
            }}
            following={{
              count: socialMetrics?.socialVolume,
              change: socialMetrics?.socialVolumeDelta,
            }}
            sentiment={{
              value: socialMetrics?.socialSentiment,
              trend: socialMetrics?.socialSentimentTrend,
            }}
            price={price}
          />
        </ShareableCard> */}
      </div>
    </div>

    // <div className="py-2">
    //   <div className="px-5 py-4">
    //     <div className="flex justify-between">
    //       <div className="flex px-5">
    //         <div className="flex items-center">
    //           <img
    //             className="rounded-full"
    //             src={logo}
    //             alt="token logo"
    //             height={80}
    //             width={80}
    //           />
    //         </div>
    //         <div className="flex flex-col justify-center px-5 my-2">
    //           <p className="text-text-primary dark:text-text-primary-dark text-lg">
    //             {longName}
    //           </p>
    //           <p className="text-blue-500 text-base text-lg">{shortName}</p>
    //         </div>
    //       </div>
    //       {isPrice && (
    //         <div className="mt-6 mr-3">
    //           <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
    //             Price
    //           </p>
    //           <div className="flex items-center gap-3">
    //             <p className="text-lg text-text-primary dark:text-text-primary-dark">
    //               ${formatNumber(+price)}
    //             </p>
    //             <p
    //               className={`text-sm h-max rounded-sm px-0.5 py-px text-text-primary dark:text-text-primary-dark tracking-wider ${calcPriceDeltaColor()}`}
    //             >
    //               {symbol}{" "}
    //               {symbol && isDecreasing ? priceDelta.slice(1) : priceDelta}%
    //             </p>
    //           </div>
    //         </div>
    //       )}
    //       {isDashScore && (
    //         <div className="rounded-lg bg-highlight dark:bg-highlight-dark p-3 pb-2 mt-3 mr-3">
    //           <div className="flex items-center gap-2">
    //             <p className="text-base 2xl:text-lg text-text-primary dark:text-text-primary-dark">
    //               Dash Score
    //             </p>
    //             <Tooltip
    //               message="DashScore scoring system is based on 5 main categories, and every category has its own weight, where the maximum total a project can score is 100"
    //               title="Dash Score"
    //               icon
    //             />
    //           </div>
    //           {/* <p className="text-center text-2xl 2xl:text-3xl">{dashScore}</p> */}
    //           <p className="text-center	text-lg text-text-primary dark:text-text-primary-dark">
    //             {dashScore}
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //     <p className="text-text-secondary dark:text-text-secondary-dark text-sm md:text-base px-6 py-2">
    //       {description}
    //     </p>
    //     <div className="flex px-6 pt-4 mb-4 text-sm text-text-primary dark:text-text-primary-dark">
    //       {listingInfo}
    //     </div>
    //   </div>
    // </div>
  );
};

export default TokenDescription;

interface Props {
  shortName: string;
  longName: string;
  description: string;
  logo: string;
  price?: string | number;
  priceDelta?: string;
  dashScore?: string | number;
  listingInfo?: string | JSX.Element;
  socialMetrics: {
    devActivity: number;
    devActivityDelta: number;
    socialVolume: number;
    socialVolumeDelta: number;
    socialSentiment: string;
    socialSentimentTrend: string;
    socials?: [];
  };
}
