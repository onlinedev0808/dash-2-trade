/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { v4 as uuidv4 } from "uuid";

import TokenDescription from "./TokenDescription";
import TokenSocialMetrics from "./TokenSocialMetrics";
import SmallInfoCard from "../SmallInfoCard";

const TokenDescriptionAndMetrics = ({
  basicInfo,
  additionalInfo,
  metricsData,
}) => {
  console.log(metricsData);
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="w-full flex justify-between gap-x-6 h-max">
        <div className="w-2/3 flex-auto rounded-lg bg-foreground dark:bg-foreground-dark">
          <TokenDescription
            socialMetrics={metricsData}
            shortName={basicInfo?.shortName}
            longName={basicInfo?.longName}
            description={basicInfo?.description}
            logo={basicInfo?.logo}
            price={basicInfo?.price}
            priceDelta={basicInfo?.priceDelta}
            dashScore={basicInfo?.dashScore}
            listingInfo={basicInfo?.listingInfo}
          />
        </div>

        <div className="w-1/3 flex grow justify-between">
          <TokenSocialMetrics
            devActivity={metricsData.devActivity}
            devActivityDelta={metricsData.devActivityDelta}
            socialVolume={metricsData.socialVolume}
            socialVolumeDelta={metricsData.socialVolumeDelta}
            socialSentiment={metricsData.socialSentiment}
            socialSentimentTrend={metricsData.socialSentimentTrend}
            socials={metricsData.socials}
          />
        </div>
      </div>
      <div className="flex w-full justify-between gap-x-6">
        {additionalInfo.map((item) => (
          <SmallInfoCard key={uuidv4()} {...item} />
        ))}
      </div>
    </div>
    // <div className="flex max-w-full gap-x-6">
    //   <div className="w-[69.5%] flex flex-col justify-between">
    //     <div className="flex-auto mb-6 rounded-lg bg-foreground dark:bg-foreground-dark">
    //       <TokenDescription {...basicInfo} />
    //     </div>
    //     <div className="flex justify-between gap-x-6">
    //       {additionalInfo.map((item) => (
    //         <SmallInfoCard key={uuidv4()} {...item} />
    //       ))}
    //     </div>
    //   </div>
    //   <div className="w-[23.3%] flex flex-col justify-between">
    //     <TokenSocialMetrics {...metricsData} />
    //   </div>
    // </div>
  );
};

export default TokenDescriptionAndMetrics;
