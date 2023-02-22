/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import NewsFeed from "../NewsFeed";
import Heatmap from "../Heatmap";
import TokenCharts from "./TokenCharts";

import { formatNumber, prepareName } from "../../utils";
import { TextColorEnum } from "../../types/enums";

import USDTLogo from "../../../public/usdt.png";
import TokenDescription from "../TokenDescriptionAndMetrics/TokenDescription";
import TokenSocialMetrics from "../TokenDescriptionAndMetrics/TokenSocialMetrics";
import SmallInfoCard from "../SmallInfoCard";
import { TokenChartSvg, TokenInformationSvg, WorldMapSvg } from "../CommonSvg";
import TechnicalIndicators from "../TokenDescriptionAndMetrics/TechnicalIndicators";
import Card from "../common/Card";
import PresaleWorldMap from "../common/PresaleWorldMap";
import CardWrapper from "../common/Wrapper";
import { useAppDispatch } from "../../redux/hooks";
import { updateBreadcrumbs } from "../../redux/reducers/BreadcrumbsSlice";
import {
  BACK_BTN,
  BACK_BTN_PROPERTY,
  BACK_BTN_ROUTE_PROPERTY,
} from "../../constant/localStorage";

const MapColors = {
  Green: `bg-map-green`,
  Yellow: `bg-map-yellow`,
  Orange: `bg-map-orange`,
  Red: `bg-map-red`,
  Gray: `bg-map-gray`,
};

const MapTooltipColors = [
  {
    id: 1,
    color: "Green",
    text: "- Permissive (legal to use)",
  },
  {
    id: 2,
    color: "Yellow",
    text: "- Contentious (some legal restrictions on usage)",
  },
  {
    id: 3,
    color: "Orange",
    text: "- Contentious (old laws interpretation, not directly prohibited)",
  },
  {
    id: 4,
    color: "Red",
    text: "- Hostile (full or partial prohibition)",
  },
  {
    id: 5,
    color: "Gray",
    text: "- No data",
  },
];

const InfoItem = ({ title, text, position }) => {
  const isTextBool = typeof text === "boolean";

  const textColor = isTextBool
    ? text
      ? TextColorEnum.Green
      : TextColorEnum.Red
    : "";

  const textChecked = isTextBool ? (text ? "True" : "False") : text;

  const bgColor =
    position % 2 === 0 ? "bg-highlight/50 dark:bg-highlight-dark/50" : "";

  return (
    <div className={`flex justify-between h-10 items-center px-3 ${bgColor}`}>
      <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
        {title}
      </div>
      <div className={`text-sm font-normal ${textColor}`}>{textChecked}</div>
    </div>
  );
};

const TokenInfo = ({ info }) => (
  <Card title="Token Information" icon={<TokenInformationSvg />}>
    <div>
      {Object.keys(info).map((prop, index) => (
        <InfoItem
          key={prop}
          title={prepareName(prop)}
          text={info[prop]}
          position={index}
        />
      ))}
    </div>
  </Card>
);

interface ITokenDetailsProps {
  token: any;
  close?: () => void;
}

interface IMetricsData {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  logo: string;
  description?: string;
  metrics: {
    developer_activity: number;
    developer_activity_change: number;
    social_volume: number;
    social_volume_change: number;
    sentiment: string;
    sentiment_trend: string;
    socials?: {
      linkedin?: string;
      telegram?: string;
      twitter?: string;
      medium?: string;
    };
  };
}

const INITIAL_TOKEN_DATA = {
  id: 1,
  tokenId: "",
  symbol: "",
  name: "",
  rank: -1,
  logo: "",
  volume: 0,
  marketCap: 0,
  priceMin: 0,
  priceMax: 0,
  priceChange: 0,
  priceCurrent: 0,
  description: "",
};

const INITIAL_TOKEN_METRICS_DATA = {
  id: "",
  symbol: "",
  name: "",
  rank: -1,
  logo: "",
  metrics: {
    developer_activity: null,
    developer_activity_change: null,
    social_volume: null,
    social_volume_change: null,
    sentiment: null,
    sentiment_trend: null,
    socials: {
      linkedin: "",
      telegram: "",
      twitter: "",
      medium: "",
    },
  },
};

const TokenDetails: NextPage<ITokenDetailsProps> = ({ token }) => {
  const dispatch = useAppDispatch();

  const [heatmapData, setHeatmapData] = useState([]);
  const [tokenData, setTokenData] = useState(INITIAL_TOKEN_DATA);
  const [tokenMetricsData, setTokenMetricsData] = useState<IMetricsData>(
    INITIAL_TOKEN_METRICS_DATA
  );

  const [socialMetrics, setSocialMetrics] = useState<any>();

  const fetchTokenDetails = async () => {
    const response = await axios.get(
      `/api/backend/tokens/${token.tokenId}/stats`
    );

    if (!Object.keys(response.data).length) return;
    setTokenData(response.data);
  };

  useEffect(() => {
    dispatch(updateBreadcrumbs("Tokens"));
    localStorage.setItem(BACK_BTN_PROPERTY, BACK_BTN.VISIBLE);
    localStorage.setItem(BACK_BTN_ROUTE_PROPERTY, "/");
    return () => {
      dispatch(updateBreadcrumbs(""));
      localStorage.removeItem(BACK_BTN_PROPERTY);
      localStorage.removeItem(BACK_BTN_ROUTE_PROPERTY);
    };
  }, []);

  const fetchHeatmapData = async () => {
    const { data } = await axios.get(
      `/api/backend/tokens/historical/heatmap?token_id=${token.tokenId}&time_period=7d`
    );

    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const formattedResponse = [];

    for (let day = 0; day < 7; day++) {
      for (let hour = 4; hour <= 24; hour += 4) {
        let volume = 0;
        const dayData = data[token.tokenId][weekday[day]];
        const hourData = dayData?.find((el) => {
          const offsetHour = hour === 24 ? hour - 2 : hour - 1;
          return el.hour === offsetHour;
        });
        if (hourData) {
          volume = hourData.volume;
        }

        formattedResponse.push({
          day,
          hour,
          volume,
        });
      }
    }

    setHeatmapData(formattedResponse);
  };

  const fetchTokenSocialDetails = async () => {
    try {
      const response = await axios.get(
        `/api/backend/tokens/${token.tokenId}/detail`
      );
      setTokenMetricsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTokenSocialMetrics = async () => {
    try {
      const response = await axios.get(
        `/api/backend/tokens/${token.tokenId}/social-metrics`
      );
      setSocialMetrics({
        devActivity: response.data?.followers?.github?.count,
        devActivityDelta: response.data?.followers?.github?.change,
        socialVolume: response.data?.followers?.total?.count,
        socialVolumeDelta: response.data?.followers?.total?.change,
        socialSentiment: response.data?.sentiment?.value,
        socialSentimentTrend: response.data?.sentiment?.trend,
        // FIXME: no socials in response
        socials: response.data?.socials,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchTokenDetails();
    fetchTokenSocialDetails();
    fetchHeatmapData();
    fetchTokenSocialMetrics();
  }, []);

  const listingInfo = (
    <>
      <div className="flex gap-4 items-center">
        <img
          src="/presale-token-info/thumb_up.svg"
          alt="thumb up"
          className="min-w-3.5 w-3.5 pb-0.5 mr-2"
        />
        {/* <Image
          src="/presale-token-info/check.svg"
          alt=""
          width={14}
          height={22}
        /> */}
      </div>
      <span className="text-text-primary dark:text-text-primary-dark">
        Traded on all major exchanges
      </span>
    </>
  );

  const basic_token_data = {
    longName: tokenData.tokenId || tokenMetricsData.name,
    shortName: tokenData.symbol || tokenMetricsData.symbol,
    description:
      tokenData.description ||
      tokenMetricsData.description ||
      `The project is built as a distributed registry operating system technology - Overledger Network - to connect various blockchain networks.`,
    price: tokenData.priceCurrent,
    priceDelta: (tokenData.priceChange * 100).toFixed(1),
    logo:
      tokenData.logo ||
      tokenMetricsData.logo ||
      "https://bullbear-data-scrapers.s3.amazonaws.com/logos/Pinksale/c402dc28-3b6d-4868-aaa2-7e19d80de709.png",
    listingInfo,
  };

  const additional_data = [
    {
      titleFirst: "Monthly Volume",
      textFirst: tokenData.volume && formatNumber(tokenData.volume),
      textSecond: "-1.6 %",
    },
    {
      titleFirst: "Monthly Return",
      textFirst: "124.67",
      textSecond: "+1.6 %",
    },
    {
      titleFirst: "Market Cap",
      textFirst: (
        <div className="flex items-center gap-2">
          {tokenData.marketCap
            ? `$${formatNumber(tokenData.marketCap)}`
            : "N/A"}
          <div className="relative w-4 h-4 lg:w-4.5 lg:h-4.5">
            <Image className="rounded-full" src={USDTLogo} layout="fill" />
          </div>
        </div>
      ),
    },
    {
      titleFirst: "Rank",
      textFirst: `#${
        tokenData.rank && tokenData.rank !== -1
          ? formatNumber(tokenData.rank)
          : tokenMetricsData.rank && tokenMetricsData.rank !== -1
          ? formatNumber(tokenMetricsData.rank)
          : " -"
      }`,
    },
  ];

  const tokenInformation = {
    circulatingSupply: "12,072,738 QNT",
    totalSupply: "14,612,493 QNT",
    totalAddresses: "68,605",
    "activeAddresses (24h)": "489",
    exchangeTraded: true,
  };

  const technicalIndicators = {
    rsi: "1",
    rsiDelta: "-66.67%",
    socialVolume: "13",
    socialVolumeDelta: "+550%",
    socialSentiment: "Medium",
    socialSentimentTrend: "up",
    socialSentiment2: "Low",
    socialSentimentTrend2: "down",
  };

  return (
    <CardWrapper direction="row">
      <div className="w-[50%] gap-[inherit] flex flex-col">
        <TokenDescription socialMetrics={socialMetrics} {...basic_token_data} />

        <div className="grid grid-cols-2 gap-[inherit]">
          {additional_data.map((item) => (
            <SmallInfoCard key={item.titleFirst} {...item} />
          ))}
        </div>

        {basic_token_data?.shortName && (
          <Card title="Chart" icon={<TokenChartSvg />}>
            <TokenCharts
              tokenData={tokenData}
              symbol={basic_token_data.shortName}
            />
          </Card>
        )}

        <Card
          title="Crypto Legal Status"
          icon={<WorldMapSvg />}
          hasTooltip
          tooltipTitle=""
          tooltpMessage={
            <ul>
              {MapTooltipColors.map(({ id, color, text }) => (
                <li
                  className="grid grid-cols-[1.25rem_minmax(0,_1fr)] gap-2"
                  key={id}
                >
                  <div className={`w-4 h-4 rounded ${MapColors[color]}`} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          }
        >
          <PresaleWorldMap />
        </Card>
      </div>

      <div className="w-[50%] flex flex-col gap-[inherit]">
        <div className="flex gap-[inherit]">
          <div className="w-[50%]">
            <TechnicalIndicators technicalIndicators={technicalIndicators} />
          </div>
          <div className="w-[50%]">
            <TokenSocialMetrics
              devActivity={socialMetrics?.devActivity}
              devActivityDelta={socialMetrics?.devActivityDelta}
              socialVolume={socialMetrics?.socialVolume}
              socialVolumeDelta={socialMetrics?.socialVolumeDelta}
              socialSentiment={socialMetrics?.socialSentiment}
              socialSentimentTrend={socialMetrics?.socialSentimentTrend}
              socials={socialMetrics?.socials}
            />
          </div>
        </div>
        <TokenInfo info={tokenInformation} />
        <Card classes="h-[25rem] flex flex-col">
          <NewsFeed keyword={basic_token_data.shortName} hasMedia />
        </Card>
        <Heatmap data={heatmapData} />
      </div>
    </CardWrapper>
  );
};

export default TokenDetails;
