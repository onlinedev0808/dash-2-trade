import React from "react";
import { useRouter } from "next/router";
import Tooltip, { TooltipPosX, TooltipPosY } from "../common/Tooltip";
import { ShieldSvg } from "../CommonSvg";
import ShareableCard from "../common/shareableCard";
import Shareable from "./Shareable";
import { getDashScoreColor } from "../../utils";
import { CrossSign, Tag } from "./common";
import {
  developmentColor,
  marketingColor,
  productColor,
  teamColor,
  tokenomicsColor,
} from "./utils";
import RoundedImage from "../common/RoundedImage";

const Description = ({
  name,
  symbol,
  description,
  logo,
  scores,
  listingOn,
  kyc,
  kycSource,
  audit,
  auditSource,
  vcBacked,
  vcBackedSource,
  socialMetrics,
  metrics,
}: Props): JSX.Element => {
  const scoreColor = getDashScoreColor(scores.dash[0]);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-between flex-auto h-full mb-6 p-4 rounded-card bg-foreground dark:bg-foreground-dark">
      <div className="mb-6">
        <div className="flex justify-between mb-6">
          <div className="flex gap-6">
            <RoundedImage logo={logo} alt="token logo" className="w-[4.5rem]" />
            <div className="flex flex-col justify-center">
              <p className="font-medium	text-[2rem]">{name}</p>
              <p className="font-normal text-sm text-[#7A7F93]">{symbol}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Tooltip
              className="
            [&>div>.tooltip-content]:p-3
            [&>div>.tooltip-content]:min-w-full
            [&>div>.tooltip-content>.tooltip-close]:top-3
            [&>div>.tooltip-content>.tooltip-close]:right-3
            [&>div.w-full.cursor-pointer]:h-full
            "
              message={
                <div>
                  <div className="whitespace-nowrap font-bold">Scores:</div>
                  <div
                    className="grid grid-cols-[min-content_min-content]
              gap-x-6 gap-y-1 pt-3
              text-xs font-normal text-text-secondary-dark justify-between
              "
                  >
                    Team
                    <span
                      className={`${teamColor(scores?.team[0])} text-right`}
                    >
                      {scores?.team[0] != null
                        ? `${scores?.team[0]}/${scores?.team[1]}`
                        : "N/A"}
                    </span>
                    Product
                    <span
                      className={`text-right ${productColor(
                        scores?.product[0]
                      )}`}
                    >
                      {scores?.product[0] != null
                        ? `${scores?.product[0]}/${scores?.product[1]}`
                        : "N/A"}
                    </span>
                    Marketing
                    <span
                      className={`text-right ${marketingColor(
                        scores?.marketing[0]
                      )}`}
                    >
                      {scores.marketing[0] != null
                        ? `${scores.marketing[0]}/${scores.marketing[1]}`
                        : "N/A"}
                    </span>
                    Development
                    <span
                      className={`text-right ${developmentColor(
                        scores?.dev[0]
                      )}`}
                    >
                      {scores?.dev[0] != null
                        ? `${scores.dev[0]}/${scores.dev[1]}`
                        : "N/A"}
                    </span>
                    Tokenomics
                    <span
                      className={`text-right ${tokenomicsColor(
                        scores?.tokenomics[0]
                      )}`}
                    >
                      {scores?.tokenomics[0] != null
                        ? `${scores?.tokenomics[0]}/${scores?.tokenomics[1]}`
                        : "N/A"}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      router.push("/getting-started/scoring-guide")
                    }
                    className={`mt-3 mx-auto text-sm leading-4 text-white bg-button-primary px-3 py-2 rounded hover:bg-highlight-button-primary flex items-center justify-center gap-5 duration-300 `}
                  >
                    Scoring Guide
                  </button>
                </div>
              }
              title=""
              positionY={TooltipPosY.Middle}
              positionX={TooltipPosX.Left}
            >
              <div className="rounded bg-highlight dark:bg-highlight-dark text-text-secondary dark:text-text-secondary-dark text-sm py-2 px-3 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  Dash Score
                  <Tooltip
                    message="DashScore scoring system is based on 5 main categories, and every category has its own weight, where the maximum total a project can score is 100"
                    title="Dash Score"
                    icon
                    isNested
                  />
                </div>
                <span
                  className={`flex justify-center font-semibold text-3xl leading-8 ${scoreColor}`}
                >
                  {scores.dash[0] > 0 ? scores.dash[0] : "N/A"}
                </span>
              </div>
            </Tooltip>
            <ShareableCard tokenName={name}>
              <Shareable
                social={socialMetrics?.socials}
                name={name}
                symbol={symbol}
                logo={logo}
                description={description}
                tokenMetrics={metrics}
                dashScore={scores?.dash}
                listingOn={listingOn}
                followers={{
                  count: socialMetrics?.devActivity,
                  change: socialMetrics?.devActivityDelta,
                }}
                engagements={{
                  count: socialMetrics?.socialVolume,
                  change: socialMetrics?.socialVolumeDelta,
                }}
                sentiment={{
                  trend: socialMetrics?.socialSentimentTrend,
                  value: socialMetrics?.socialSentiment,
                }}
                tags={{
                  kyc,
                  kycSource,
                  audit,
                  auditSource,
                  vcBacked,
                  vcBackedSource,
                }}
              />
            </ShareableCard>
          </div>
        </div>
        <p className="font-normal leading-8">{description}</p>
      </div>
      <div className="flex text-xs justify-between gap-2 gap-y-4 flex-wrap">
        <div className="flex gap-2">
          <Tag
            icon={kyc ? <ShieldSvg /> : <CrossSign />}
            text="External KYC"
            link={kycSource}
            className={` ${kyc ? "bg-green" : "bg-orange"} ${
              kycSource ? "cursor-pointer" : ""
            }`}
          />
          <Tag
            icon={audit ? <ShieldSvg /> : <CrossSign />}
            text="Audit"
            link={auditSource}
            className={`${audit ? "bg-green" : "bg-orange"}  ${
              auditSource ? "cursor-pointer" : ""
            }`}
          />
          <Tag
            icon={vcBacked ? <ShieldSvg /> : <CrossSign />}
            link={vcBackedSource}
            text="VC Backed"
            className={`${vcBacked ? "bg-green" : "bg-orange"}  ${
              vcBackedSource ? "cursor-pointer" : ""
            }`}
          />
        </div>

        <div className="mr-2 lg:text-sm font-normal flex items-center gap-2">
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
              <span className="text-button-primary-highlight ml-1">
                {listingOn}
              </span>
            </>
          ) : (
            <> No confirmed listings</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;

interface Props {
  name: string;
  symbol: string;
  description: string;
  logo: string;
  scores: {
    dash: number;
    dev: number;
    marketing: number;
    product: number;
    team: number;
    tokenomics: number;
  };
  listingOn?: string | JSX.Element;
  kyc: boolean | null;
  kycSource: string | null;
  audit: boolean | null;
  auditSource: string | null;
  vcBacked: boolean | null;
  vcBackedSource: string | null;
  metrics: {
    g: string;
    d: number | string;
    c?: number | string;
    v?: number | string;
  }[];
  socialMetrics: any;
}
