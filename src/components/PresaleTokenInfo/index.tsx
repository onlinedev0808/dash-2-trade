import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import Image from "next/image";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateBreadcrumbs } from "../../redux/reducers/BreadcrumbsSlice";

import { formatNumber, prepareName, timeSince } from "../../utils";
import TokenMetricsChart from "./TokenMetricsChart";

import USDTLogo from "../../../public/usdt.png";

import { TextColorEnum } from "../../types/enums";
import { IPresaleToken } from "../../types/redux";
import Metrics from "./Metrics";
import Description from "./Description";
import InfoCard from "./InfoCard";
import { InfoFilledSvg, PieChartSvg } from "../CommonSvg";
import CardWrapper from "../common/Wrapper";
import Card from "../common/Card";
import { ChainLogo } from "../PresaleTokenTable/common/tokenUtils";
import {
  BACK_BTN,
  BACK_BTN_PROPERTY,
  BACK_BTN_ROUTE_PROPERTY,
} from "../../constant/localStorage";
import SocialsFeed from "../SocialsFeed/SocialsFeed";

interface ITokenInfoProps {
  name: string;
  symbol: string;
  // decimals: number | string;
  presaleAddress: string;
  tokenAddress: string;
  totalSupply: number | string;
  tokensForPresale: number | string;
  tokensForLiquidity: number | string;
  softCap: number | string;
  presaleStartTime: string;
  presaleEndTime: string;
  listingOn: string;
}

const TokenInfo: NextPage<ITokenInfoProps> = (props) => (
  <div className="flex justify-between flex-wrap py-2">
    {Object.entries(props)?.map((prop, idx) => (
      <div
        key={prop[0]}
        className={`flex justify-between
           w-full min-h-[2.8rem] 
           text-sm
           p-3
           ${idx % 2 === 0 ? "bg-highlight/50 dark:bg-highlight-dark/50" : ""}`}
      >
        <span className="text-text-secondary dark:text-text-secondary-dark">
          {prepareName(prop[0])}
        </span>
        <span
          className={`${
            prop[0] === "listingOn" && "text-button-primary-highlight"
          }`}
        >
          {prop[1] != null ? prop[1] : "N/A"}
        </span>
      </div>
    ))}
  </div>
);

const formatTNumber = (value) =>
  `${value?.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })} (${formatNumber(value, 1)})`;

const PresaleTokenInfo: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tokenId: number = +(router.query.tokenId || "");

  // const [requestTokenById, setRequestTokenById] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<IPresaleToken | null>(null);

  // const presaleTokenArray: IPresaleToken[] = useAppSelector(
  //   (state) => state.presaleToken
  // );
  const walletAddress = useAppSelector((state) => state.wallet?.address);

  const loadPresaleTokenById = async (id: number) => {
    try {
      const response = await axios.get(`/api/backend/presale/${id}`);
      setTokenInfo(response.data);
    } catch (error) {
      console.log(error);
    } /* finally {
      setRequestTokenById(false);
    } */
  };

  const [metricsData, setMetricsData] = useState(null);

  // useEffect(() => {
  //   if (presaleTokenArray.length !== 0 && !tokenInfo) {
  //     const dataFromTable = getElementFromObj(presaleTokenArray, tokenId);

  //     // if (!dataFromTable) setRequestTokenById(true);
  //     // else setTokenInfo(dataFromTable);
  //   } else {
  //     setRequestTokenById(true);
  //   }
  // }, [presaleTokenArray]);

  useEffect(() => {
    dispatch(updateBreadcrumbs("Presales"));
    localStorage.setItem(BACK_BTN_PROPERTY, BACK_BTN.VISIBLE);
    localStorage.setItem(BACK_BTN_ROUTE_PROPERTY, "/presale-tokens");
    return () => {
      dispatch(updateBreadcrumbs(""));
      localStorage.removeItem(BACK_BTN_PROPERTY);
      localStorage.removeItem(BACK_BTN_ROUTE_PROPERTY);
    };
  }, []);

  const loadSocialMetrics = async () => {
    try {
      if (!tokenInfo?.token?.id) return;
      const { data } = await axios.get(
        `/api/backend/presale/social-metrics?cc_id=${tokenInfo?.token?.id}`
      );

      setMetricsData({
        devActivity: data?.followers?.total?.count,
        devActivityDelta: data?.followers?.total?.change,
        socialVolume: data?.engagements?.count,
        socialVolumeDelta: data?.engagements?.change,
        socialSentiment: data?.sentiment?.value,
        socialSentimentTrend: data?.sentiment?.trend,
        socials: data?.followers ?? null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSocialMetrics();
  }, [tokenInfo]);

  useEffect(() => {
    loadPresaleTokenById(tokenId);
  }, []);

  if (!tokenInfo) {
    return (
      <LineWave
        color="#5367FE"
        ariaLabel="line-wave"
        wrapperStyle={{
          position: "absolute",
          zIndex: "1",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        visible
      />
    );
  }

  const now = new Date().getTime();
  const started_date = new Date(tokenInfo?.presale_start).getTime();
  const ended_date = new Date(tokenInfo?.presale_stop).getTime();
  const formattedStartedDate =
    tokenInfo?.presale_start != null
      ? new Date(tokenInfo?.presale_start).toLocaleDateString()
      : "N/A";

  const formattedEndedDate =
    tokenInfo?.presale_stop != null
      ? new Date(tokenInfo?.presale_stop).toLocaleDateString()
      : "N/A";

  let end;
  let isEnded = false;
  let isStarted = false;
  if (tokenInfo?.presale_stop == null) end = "N/A";
  else if (now - ended_date < 0) {
    end = timeSince(tokenInfo.presale_stop);
  } else {
    end = `${timeSince(tokenInfo.presale_stop, true)} ago`;
    isEnded = true;
  }

  let start;
  if (isEnded) start = "";
  else if (tokenInfo?.presale_start == null) start = "N/A";
  else if (now - started_date < 0) {
    start = timeSince(tokenInfo.presale_start);
    isStarted = true;
  } else {
    start = `${timeSince(tokenInfo.presale_start, true)} ago`;
  }

  const getCapUSD = (type) => {
    const capUSD = tokenInfo[`${type}cap_usd`];

    if (!capUSD) return "$ -";

    return `$ ${formatNumber(+capUSD)}`;
  };

  const getCap = (type) => {
    const cap = tokenInfo[`${type}cap`];

    if (!cap) return "N/A";

    return (
      <div className="flex items-center gap-2">
        {formatNumber(+cap)}
        <div className="relative w-4 h-4 lg:w-4.5 lg:h-4.5">
          <Image
            className="rounded-full"
            src={tokenInfo?.cap_logo || USDTLogo}
            layout="fill"
          />
        </div>
      </div>
    );
  };

  const calcDateTitle = () => {
    if (isEnded) return "Ended";
    if (isStarted) return "Starting In";
    return "Started";
  };

  const calcDateText = () => {
    if (isEnded) return end;
    // if (isStarted) return `${start} ago`;
    return start;
  };

  const smallInfoCardsData = [
    {
      titleFirst: "Raised",
      textFirst: `$ ${
        tokenInfo?.amount_raised ? formatNumber(tokenInfo?.amount_raised) : "-"
      }`,
      textSecond: tokenInfo?.token?.chains?.[0].contract_link ? (
        <a
          className="cursor-pointer"
          href={tokenInfo?.token?.chains?.[0].contract_link}
          target="_blank"
          rel="noreferrer"
        >
          View
        </a>
      ) : (
        ""
      ),
      textSecondColor: TextColorEnum.Blue,
      tooltip: {
        title: "Raised",
        message: "Amount raised by the presale project so far",
      },
    },
    {
      titleFirst: "Soft Cap",
      textFirst: getCap("soft"),
      textSecond: getCapUSD("soft"),
      tooltip: {
        title: "Soft Cap",
        message:
          "The minimum defined limit for the collection of funds specified by a project's team for its fund-raising",
      },
    },
    {
      titleFirst: "Hard Cap",
      textFirst: getCap("hard"),
      textSecond: getCapUSD("hard"),
      tooltip: {
        title: "Hard Cap",
        message:
          "The maximum amount of funds a project intends to raise during their fundraising event",
      },
    },
    {
      titleFirst: calcDateTitle(),
      titleSecond: `${isEnded ? "" : "Ending In"}`,
      textFirst: calcDateText(),
      textSecond: isEnded ? "" : end,
    },
    {
      titleFirst: "Chain",
      textFirst: (
        <span className="flex gap-1 items-center">
          {tokenInfo?.token?.chains?.[0]?.symbol ? (
            <ChainLogo
              chain={tokenInfo?.token?.chains?.[0]?.symbol}
              logo={tokenInfo?.token?.chains?.[0]?.logo}
            />
          ) : (
            <ChainLogo chain="Own" logo={tokenInfo?.token?.logo} />
          )}
        </span>
      ),
    },
  ];

  const scores = {
    dash: tokenInfo?.score?.total,
    dev: tokenInfo?.score?.dev,
    marketing: tokenInfo?.score?.marketing,
    product: tokenInfo?.score?.product,
    team: tokenInfo?.score?.team,
    tokenomics: tokenInfo?.score?.tokenomics,
  };

  const tokenMetrics = tokenInfo?.token_distribution ?? null;

  return (
    <CardWrapper>
      <div className="flex max-w-full gap-[inherit] flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[76%]">
          <Description
            name={tokenInfo?.token?.name}
            symbol={tokenInfo?.token?.symbol}
            description={tokenInfo?.token?.description}
            logo={tokenInfo?.token?.logo}
            scores={scores}
            listingOn={tokenInfo?.listing_on}
            kyc={tokenInfo?.kyc}
            kycSource={tokenInfo?.kyc_source}
            audit={tokenInfo?.audit}
            auditSource={tokenInfo?.audit_source}
            vcBacked={tokenInfo?.vc_backed}
            vcBackedSource={tokenInfo?.vc_backed_source}
            metrics={tokenMetrics}
            socialMetrics={metricsData}
          />
        </div>
        <div className="w-full md:w-[24%] grow">
          <Metrics
            devActivity={metricsData?.devActivity}
            devActivityDelta={metricsData?.devActivityDelta}
            socialVolume={metricsData?.socialVolume}
            socialVolumeDelta={metricsData?.socialVolumeDelta}
            socialSentiment={metricsData?.socialSentiment}
            socialSentimentTrend={metricsData?.socialSentimentTrend}
            socials={tokenInfo?.token?.urls}
            socialsNumbers={metricsData?.socials}
            name={tokenInfo?.token?.name}
            symbol={tokenInfo?.token?.symbol}
            logo={tokenInfo?.token?.logo}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-[inherit]">
        {smallInfoCardsData?.map((i) => (
          <InfoCard
            key={i.titleFirst}
            titleFirst={i.titleFirst}
            titleSecond={i.titleSecond}
            textFirst={i.textFirst}
            textSecond={i.textSecond}
            textSecondColor={i.textSecondColor}
            tooltip={i.tooltip}
          />
        ))}
      </div>
      <div className="flex max-w-full gap-[inherit] flex-wrap md:flex-nowrap">
        <Card
          classes="w-full md:w-[60%]"
          title="Token Information"
          icon={<InfoFilledSvg />}
        >
          <TokenInfo
            name={tokenInfo?.token?.name}
            symbol={tokenInfo?.token?.symbol}
            // decimals={null}
            presaleAddress={walletAddress || "Not connected"}
            tokenAddress={tokenInfo?.token?.chains?.[0].token_address}
            totalSupply={
              tokenInfo?.total_supply && tokenInfo?.total_supply >= 1000
                ? formatTNumber(tokenInfo?.total_supply)
                : tokenInfo?.total_supply
              // formatTNumber(tokenInfo?.total_supply)
            }
            tokensForPresale={
              tokenInfo.supply_for_presale &&
              tokenInfo?.supply_for_presale >= 1000
                ? formatTNumber(tokenInfo?.supply_for_presale)
                : tokenInfo?.supply_for_presale
              // formatTNumber(tokenInfo?.supply_for_presale)
            }
            tokensForLiquidity={
              tokenInfo?.supply_for_liquidity &&
              tokenInfo?.supply_for_liquidity >= 1000
                ? formatTNumber(tokenInfo?.supply_for_liquidity)
                : tokenInfo?.supply_for_liquidity
            }
            softCap={
              tokenInfo?.softcap &&
              `${
                tokenInfo?.softcap >= 1000
                  ? formatTNumber(tokenInfo?.softcap)
                  : tokenInfo?.softcap
              } ${tokenInfo?.cap_currency ?? ""}`
            }
            presaleStartTime={formattedStartedDate}
            presaleEndTime={formattedEndedDate}
            listingOn={tokenInfo.listing_on}
          />
        </Card>
        <Card
          classes="w-full md:w-[40%]"
          icon={<PieChartSvg />}
          title="Token Metrics"
        >
          <TokenMetricsChart metrics={tokenMetrics} />
        </Card>
      </div>

      <SocialsFeed tokenId={tokenInfo?.token.id} />
    </CardWrapper>
  );
};

export default PresaleTokenInfo;
