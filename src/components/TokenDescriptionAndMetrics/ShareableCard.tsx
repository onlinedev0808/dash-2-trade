/* eslint-disable no-nested-ternary */
import React from "react";

import Skeleton from "../common/shareableCard/Skeleton";
import InternalCardWrapper from "../common/shareableCard/InternalCardWrapper";
import SocialCard from "../common/shareableCard/SocialCard";

const Shareable = ({
  name,
  symbol,
  logo,
  description,
  listingOn,
  devActivity,
  following,
  sentiment,
  price,
}): JSX.Element => {
  return (
    <Skeleton title={name} subtitle={symbol} logo={logo}>
      <h4 className="text-lg mb-5 flex text-sm">{listingOn}</h4>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-[inherit]">
          <h2 className="text-lg">Project Description</h2>
          <p className="text-sm">{description}</p>
        </div>

        <InternalCardWrapper classes="absolute top-0 right-0 flex flex-col justify-center items-center gap-5 w-40 h-40">
          <h5 className="text-text-secondary-dark">Price</h5>
          <h3 className={` font-semibold text-6xl leading-8`}>{price}</h3>
        </InternalCardWrapper>

        <div className="flex flex-col gap-[inherit] self-end">
          <h2 className="text-lg">Social Metrics</h2>
          <InternalCardWrapper>
            <SocialCard
              title="Developer Activity"
              subtitle="Month"
              value={devActivity?.count}
              secondValue={devActivity?.change}
            />
          </InternalCardWrapper>
          <InternalCardWrapper>
            <SocialCard
              title="Social Following"
              subtitle="Month"
              value={following?.count}
              secondValue={following?.change}
            />
          </InternalCardWrapper>
          <InternalCardWrapper>
            <SocialCard
              title="Social Sentiment"
              subtitle="Trend"
              value={sentiment?.value}
              secondValue={sentiment?.trend}
              isTrend
            />
          </InternalCardWrapper>
        </div>
      </div>
    </Skeleton>
  );
};

export default Shareable;
