/* eslint-disable no-nested-ternary */
import React from "react";
import Link from "next/link";
import Tooltip from "../common/Tooltip";
import { formatNumber, getChangeColor } from "../../utils";
import {
  LinkSvg,
  SocialTrend,
  TelegramSvg,
  TwitterSvg,
  VolumeSvg,
} from "../CommonSvg";
import Card from "../common/Card";
import { setPrefix } from "../PresaleTokenInfo/common";
import { sentimentClassEnum, sentimentTitleEnum } from "../../types/enums";

const SocialNetStat = ({ icon, url, value = "N/A" }) => (
  <Link href={url}>
    <div className="flex gap-1 rounded-sm items-center p-1 text-xs text-navigation-background dark:text-white bg-highlight dark:bg-highlight-dark cursor-pointer">
      <div className="text-text-primary dark:text-white w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      {/* <div className="bg-button-primary-highlight rounded-sm py-1 px-2">
        {value}
      </div> */}
    </div>
  </Link>
);

const TokenSocialMetrics = ({
  devActivity,
  devActivityDelta,
  socialVolume,
  socialVolumeDelta,
  socialSentiment,
  socialSentimentTrend,
  socials,
}: Props): JSX.Element => {
  const sentimentClass = sentimentClassEnum[socialSentiment] ?? "";

  const graphIcoClasses =
    socialSentimentTrend === "up"
      ? "text-green scale-y-[-1]"
      : socialSentimentTrend === "down"
      ? "text-red translate-y-[-0.125rem]"
      : "text-text-secondary dark:text-text-secondary-dark flex items-center";

  return (
    <Card title="Social Metrics" icon={<VolumeSvg />} classes="h-full">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
          <div className="flex items-center flex-wrap	gap-2">
            Developer Activity
            <Tooltip
              title="Developer Activity"
              message="How active developers are with the project if there are any public code repositories"
              className="text-white"
              icon
            />
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

        <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />

        <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
          <div className="flex items-center flex-wrap	gap-2">
            Social Following
            <Tooltip
              title="Social Following"
              message="How present the project is on social media"
              className="text-white"
              icon
            />
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

        <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />

        <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary-dark mb-2">
          Social Sentiment
          <span>Trend</span>
        </div>
        <div className="flex justify-between">
          <div className={`text-base ${sentimentClass}`}>
            {sentimentTitleEnum[socialSentiment] ?? "N/A"}
          </div>

          <div className={graphIcoClasses}>
            {socialSentimentTrend === "flat" ? (
              <div className="border-text-secondary dark:border-text-secondary-dark border-t-solid border-t-2 w-5 h-0.5" />
            ) : (
              <SocialTrend />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {socials?.telegram && (
          <SocialNetStat
            icon={<TelegramSvg w="0.875rem" h="0.75rem" />}
            url={socials.telegram}
          />
        )}
        {socials?.twitter && (
          <SocialNetStat
            icon={<TwitterSvg w="0.94rem" h="0.75rem" />}
            url={socials.twitter}
          />
        )}
        {socials?.linkedin && (
          <SocialNetStat icon={<LinkSvg />} url={socials.linkedin} />
        )}
      </div>
    </Card>
  );
};

export default TokenSocialMetrics;

interface Props {
  devActivity: number;
  devActivityDelta: number;
  socialVolume: number;
  socialVolumeDelta: number;
  socialSentiment: string;
  socialSentimentTrend: string;
  socials?: {
    linkedin?: string;
    telegram?: string;
    twitter?: string;
    medium?: string;
  };
}
