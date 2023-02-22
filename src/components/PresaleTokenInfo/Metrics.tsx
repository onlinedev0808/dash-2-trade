import React from "react";
import Link from "next/link";

import Tooltip from "../common/Tooltip";
import { formatNumber, getChangeColor } from "../../utils";
import { Line, SocialTrend, VolumeSvg } from "../CommonSvg";
import Card from "../common/Card";
import { sentimentClassEnum, sentimentTitleEnum } from "../../types/enums";
import { ITokenSocial, ITokenSocialNumber } from "../../types/redux";
import ShareableCard from "../common/shareableCard";
import Skeleton from "../common/shareableCard/Skeleton";
import SocialLogo, { setPrefix } from "./common";

const SocialNetStat = ({ icon, url, value = "" }) => (
  <Link href={url}>
    <a target="_blank">
      <div className="flex gap-1 rounded-sm items-center p-1 text-xs text-navigation-background dark:text-white bg-highlight dark:bg-highlight-dark cursor-pointer">
        <div className="text-text-primary dark:text-white w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
        {value && (
          <div className="bg-button-primary-highlight rounded-sm py-1 px-2">
            {value}
          </div>
        )}
      </div>
    </a>
  </Link>
);

const SocialFollowers = ({
  devActivity,
  devActivityDelta,
  isTooltip = false,
}): JSX.Element => {
  return (
    <>
      <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
        <div className="flex items-center flex-wrap	gap-2">
          Social Followers
          {isTooltip && (
            <Tooltip
              title="Social Followers"
              message="How large the following is on social media for the project"
              className="text-white"
              icon
            />
          )}
        </div>
        Week
      </div>
      <div className="flex items-center justify-between">
        <div className="text-base">
          {devActivity != null ? formatNumber(devActivity) : "N/A"}
        </div>
        <div className={`${getChangeColor(+devActivityDelta)} text-base`}>
          {devActivityDelta != null
            ? `${setPrefix(+devActivityDelta)}${devActivityDelta}%`
            : "N/A"}
        </div>
      </div>
    </>
  );
};

const SocialEngagement = ({
  socialVolume,
  socialVolumeDelta,
  isTooltip = false,
}): JSX.Element => {
  return (
    <>
      <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
        <div className="flex items-center flex-wrap	gap-2">
          Social Engagement
          {isTooltip && (
            <Tooltip
              title="Social Engagement"
              message="How present the project is on social media"
              className="text-white"
              icon
            />
          )}
        </div>
        Week
      </div>
      <div className="flex items-center justify-between">
        <div className="text-base">
          {socialVolume != null ? formatNumber(socialVolume) : "N/A"}
        </div>
        <div className={`${getChangeColor(+socialVolumeDelta)} text-base`}>
          {socialVolumeDelta != null
            ? `${setPrefix(+socialVolumeDelta)}${socialVolumeDelta}%`
            : "N/A"}
        </div>
      </div>
    </>
  );
};

const SocialSentiment = ({
  socialSentiment,
  socialSentimentTrend,
}): JSX.Element => {
  const sentimentClass = sentimentClassEnum[socialSentiment] ?? "";

  let graphIcoClasses;
  switch (socialSentimentTrend) {
    case "up":
      graphIcoClasses = "text-green scale-y-[-1]";
      break;
    case "down":
      graphIcoClasses = "text-red translate-y-[-0.125rem]";
      break;
    case "flat":
      graphIcoClasses = "text-base";
      break;
  }

  return (
    <>
      <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
        Social Sentiment
        <span>Trend</span>
      </div>
      <div className="flex justify-between">
        <div className={`text-base ${sentimentClass}`}>
          {sentimentTitleEnum[socialSentiment] ?? "N/A"}
        </div>
        <div className={graphIcoClasses}>
          {socialSentimentTrend === "flat" ? <Line /> : <SocialTrend />}
        </div>
      </div>
    </>
  );
};

const Delimiter = (): JSX.Element => (
  <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />
);

const Metrics = ({
  name,
  logo,
  symbol,
  devActivity,
  devActivityDelta,
  socialVolume,
  socialVolumeDelta,
  socialSentiment,
  socialSentimentTrend,
  socialsNumbers,
  socials,
}: Props): JSX.Element => (
  <Card classes="h-full relative" title="Social Metrics" icon={<VolumeSvg />}>
    <span className="absolute right-3 top-3 md:right-3 md:top-4">
      <ShareableCard
        tokenName={name}
        className="w-full md:w-8/12 lg:w-6/12 max-w-[32rem]"
      >
        <Skeleton title={name} subtitle={symbol} logo={logo}>
          <div className="flex gap-2 items-center mb-5 md:mb-6">
            <h3 className="text-base md:text-lg">Crypto Social Activity</h3>
          </div>
          <div className="mb-6">
            <SocialFollowers
              devActivityDelta={devActivityDelta}
              devActivity={devActivity}
            />
            <Delimiter />
            <SocialEngagement
              socialVolumeDelta={socialVolumeDelta}
              socialVolume={socialVolume}
            />
            <Delimiter />
            <SocialSentiment
              socialSentiment={socialSentiment}
              socialSentimentTrend={socialSentimentTrend}
            />
          </div>
        </Skeleton>
      </ShareableCard>
    </span>
    <div className="mb-6">
      <SocialFollowers
        devActivityDelta={devActivityDelta}
        devActivity={devActivity}
        isTooltip
      />
      <Delimiter />
      <SocialEngagement
        socialVolumeDelta={socialVolumeDelta}
        socialVolume={socialVolume}
        isTooltip
      />
      <Delimiter />
      <SocialSentiment
        socialSentiment={socialSentiment}
        socialSentimentTrend={socialSentimentTrend}
      />
    </div>
    <div className="flex flex-wrap gap-4">
      {socials &&
        Object.entries(socials)?.map((social) => {
          const icon = SocialLogo(social[0]);

          return (
            icon && (
              <SocialNetStat icon={icon} url={social[1]} key={social[0]} />
            )
          );
        })}
    </div>
  </Card>
);
export default Metrics;

interface Props {
  name: string;
  symbol: string;
  logo: string;
  devActivity: number;
  devActivityDelta: number;
  socialVolume: number;
  socialVolumeDelta: number;
  socialSentiment: string;
  socialSentimentTrend: string;
  socialsNumbers?: ITokenSocialNumber;
  socials?: ITokenSocial;
}
