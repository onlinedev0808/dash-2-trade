/* eslint-disable no-nested-ternary */
import React from "react";

import Skeleton from "../common/shareableCard/Skeleton";
import { getDashScoreColor } from "../../utils";
import { ShieldSvg } from "../CommonSvg";
import SocialLogo, { CrossSign, Tag } from "./common";
import InternalCardWrapper from "../common/shareableCard/InternalCardWrapper";
import SocialCard from "../common/shareableCard/SocialCard";

const classes = [
  "bg-[#5DAE6E]",
  "bg-[#6E95B8]",
  "bg-[#E4B640]",
  "bg-[#DB6E75]",
  "bg-[#9C8DAC]",
  "bg-[#CFCADA]",
  "bg-[#C6F0D7]",
  "bg-[#446B71]",
  "bg-[#E2A1CA]",
  "bg-[#D57E36]",
  "bg-[#D6C2B3]",
  "bg-[#C3E1B2]",
  "bg-[#EBCBDC]",
  "bg-[#BED1D4]",
  "bg-[#E4AAA9]",
  "bg-[#94D5C2]",
  "bg-[#997862]",
];

const Shareable = ({
  social,
  name,
  symbol,
  logo,
  description,
  tokenMetrics,
  dashScore,
  listingOn,
  followers,
  engagements,
  sentiment,
  tags,
}): JSX.Element => {
  const scoreColor = getDashScoreColor(dashScore);

  return (
    <Skeleton title={name} subtitle={symbol} logo={logo}>
      <h4 className="text-lg mb-5 flex gap-3 text-sm">
        <img
          src={`/presale-token-info/${
            listingOn ? "thumb_up.svg" : "prohibited.svg"
          }`}
          alt="thumb up"
          className="min-w-3.5 w-3.5 pb-[0.125rem]"
        />
        {listingOn ? (
          <>
            Listing confirmed by
            <span className="text-button-primary-highlight">{listingOn}</span>
          </>
        ) : (
          <> No confirmed listings</>
        )}
      </h4>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-between gap-[inherit]">
          <p className="text-sm">{description}</p>

          <div className="self-end flex flex-col gap-[inherit]">
            <div className="flex gap-2">
              <Tag
                icon={tags?.kyc ? <ShieldSvg /> : <CrossSign />}
                text="External KYC"
                link={tags?.kycSource}
                className={` ${tags?.kyc ? "bg-green" : "bg-orange"} ${
                  tags?.kycSource ? "cursor-pointer" : ""
                }`}
              />
              <Tag
                icon={tags?.audit ? <ShieldSvg /> : <CrossSign />}
                text="Audit"
                link={tags?.auditSource}
                className={`${tags?.audit ? "bg-green" : "bg-orange"}  ${
                  tags?.auditSource ? "cursor-pointer" : ""
                }`}
              />
              <Tag
                icon={tags?.vcBacked ? <ShieldSvg /> : <CrossSign />}
                link={tags?.vcBackedSource}
                text="VC Backed"
                className={`${tags?.vcBacked ? "bg-green" : "bg-orange"}  ${
                  tags?.vcBackedSource ? "cursor-pointer" : ""
                }`}
              />
            </div>

            <InternalCardWrapper>
              <h3 className="mb-3 text-lg">Token Metrics</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {tokenMetrics?.map(({ g, d }, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <div className={`w-3.5 h-3.5 rounded ${classes[index]}`} />

                    <span>
                      {d}%&nbsp;
                      <span>
                        {g?.split("_")?.join(" ")?.replaceAll(" / ", "/")}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </InternalCardWrapper>
          </div>
        </div>

        <div className="flex flex-col gap-[inherit] self-end">
          <InternalCardWrapper classes="text-center absolute top-0 right-0 flex flex-col justify-center items-center gap-0 w-24 h-24 md:w-40 md:h-40 m-auto !p-0">
            <h5 className="text-text-secondary-dark mb-2 text-sm md:text-lg">
              Dash Score
            </h5>
            <h3
              className={`${scoreColor} font-semibold text-2xl leading-[1.5rem] md:text-6xl md:leading-[3.5rem]`}
            >
              {dashScore}
            </h3>
          </InternalCardWrapper>
          <h2 className="text-lg">Social Metrics</h2>
          <InternalCardWrapper>
            <SocialCard
              title="Social Followers"
              subtitle="Month"
              value={followers?.count}
              secondValue={followers?.change}
            />
          </InternalCardWrapper>
          <InternalCardWrapper>
            <SocialCard
              title="Social Engagement"
              subtitle="Month"
              value={engagements?.count}
              secondValue={engagements?.change}
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
          {social && (
            <InternalCardWrapper>
              <div className="flex gap-3">
                {Object.entries(social).map((item) =>
                  item[0] !== "total" ? (
                    <div
                      key={item[0]}
                      className="px-2.5 py-1.5 rounded bg-foreground dark:bg-foreground-dark"
                    >
                      {SocialLogo(item[0])}
                    </div>
                  ) : null
                )}
              </div>
            </InternalCardWrapper>
          )}
        </div>
      </div>
    </Skeleton>
  );
};

export default Shareable;
