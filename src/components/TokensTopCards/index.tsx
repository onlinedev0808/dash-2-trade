import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import TopGainersCard from "./TopGainersCard";
import TopExchangeCard from "./TopExchangeCard";
import TopSocialCard from "./TopSocialCard";
import {
  NewListingsSvg,
  TopSellingPresalesSvg,
  TopSocialActivitySvg,
} from "../CommonSvg";
import CardWrapper from "../common/Wrapper";

const GAINERS_ITEMS = [
  {
    id: 1,
    longName: "Matura Universe",
    shortName: "MAU",
    gain: "+3%",
    price: 1327,
    icon: "mau",
  },
  {
    id: 2,
    longName: "Avalon GFX",
    shortName: "GFX",
    gain: "+1%",
    price: 19041,
    icon: "gfx",
  },
  {
    id: 3,
    longName: "Drop box",
    shortName: "BOX",
    gain: "+3%",
    price: 1327,
    icon: "box",
  },
  {
    id: 4,
    longName: "Deep AI",
    shortName: "DEEP",
    gain: "+1%",
    price: 1327,
    icon: "deep",
  },
  {
    id: 5,
    longName: "Share Network",
    shortName: "SHR",
    gain: "+1%",
    price: 19041,
    icon: "shr",
  },
];


const TokensTopCards = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isMobileMode, setIsMobileMode] = useState(false);

  const [gainersData, setGainersData] = useState([]);
  const [topSocialData, setTopSocialData] = useState([]);
  const [topExchangeData, setTopExchangeData] = useState([]);

  const [isFetchingTopSocials, setIsFetchingTopSocials] = useState(false);
  const [isFetchingExchanges, setIsFetchingExchanges] = useState(false);
  const [isFetchingGainers, setIsFetchingGainers] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);

  const loadTopSocials = async (limit) => {
    setIsFetchingTopSocials(true);
    try {
      const response = await axios.get(
        `/api/backend/cryptocurrency/top-social-activity?is_presale=false&limit=${limit}`
      );
      setTopSocialData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingTopSocials(false);
    }
  };

  const loadExchanges = async () => {
    setIsFetchingExchanges(true);
    try {
      const response = await axios.get(`/api/backend/exchanges/stats?limit=5`);
      setTopExchangeData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingExchanges(false);
    }
  };

  const loadDailyGainers = async () => {
    setIsFetchingGainers(true);
    try {
      setGainersData(GAINERS_ITEMS);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingGainers(false);
    }
  };

  useEffect(() => {
    loadDailyGainers();
    loadExchanges();
    loadTopSocials(5);
  }, []);

  useEffect(() => {
    if (!isTabletOrMobile) {
      setIsMobileMode(false);
      return;
    }
    setIsMobileMode(true);
  }, [isTabletOrMobile]);

  return (
    <CardWrapper>
      <div
        className="md:flex overflow-x-auto scrollbar-hide cursor-grab gap-[inherit]"
        ref={ref}
        {...events}
      >
        <TopSocialCard
          titleFirst={
            <div className="flex gap-2 items-center text-text-primary dark:text-text-primary-dark">
              <TopSocialActivitySvg w='2rem' h='1.3rem' />
              Top social activity
            </div>
          }
          data={topSocialData}
          isM={isMobileMode}
          isLoading={isFetchingTopSocials}
        />
        <TopExchangeCard
          titleFirst={
            <div className="flex gap-2 items-center text-text-primary dark:text-text-primary-dark">
              <NewListingsSvg w="2rem" h="1.35rem" />
              Top exchange volume
            </div>
          }
          data={topExchangeData}
          isM={isMobileMode}
          isLoading={isFetchingExchanges}
        />
        <TopGainersCard
          titleFirst={
            <div className="flex gap-2 items-center text-text-primary dark:text-text-primary-dark">
              <TopSellingPresalesSvg w="2rem" h="1.4rem" />
              Top Gainers
            </div>
          }
          data={gainersData}
          isM={isMobileMode}
          isLoading={isFetchingGainers}
        />
      </div>
    </CardWrapper>
  );
};

export default TokensTopCards;
