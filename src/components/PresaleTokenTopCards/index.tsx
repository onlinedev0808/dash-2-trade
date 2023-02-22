import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import NewListingsCard from "./NewListingsCard";
import TopSellingCard from "./TopSellingCard";
import TopSocialCard from "./TopSocialCard";
import {
  NewListingsSvg,
  TopSellingPresalesSvg,
  TopSocialActivitySvg,
} from "../CommonSvg";
import CardWrapper from "../common/Wrapper";

const PresaleTokenTopCards = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isMobileMode, setIsMobileMode] = useState(false);

  const [newListingsData, setNewListingsData] = useState([]);
  const [topSocialData, setTopSocialData] = useState([]);
  const [topSellingsData, setTopSellingsData] = useState([]);

  const [isFetchingTopSocials, setIsFetchingTopSocials] = useState(false);
  const [isFetchingTopSellings, setIsFetchingTopSellings] = useState(false);
  const [isFetchingNewListings, setIsFetchingNewListings] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);

  const loadTopSocials = async (limit) => {
    setIsFetchingTopSocials(true);
    try {
      const response = await axios.get(
        `/api/backend/cryptocurrency/top-social-activity?is_presale=true&limit=${limit}`
      );
      setTopSocialData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingTopSocials(false);
    }
  };

  const loadTopSellings = async () => {
    setIsFetchingTopSellings(true);
    try {
      const response = await axios.get(`/api/backend/presale/top-selling/`);
      setTopSellingsData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingTopSellings(false);
    }
  };

  const loadNewListings = async () => {
    setIsFetchingNewListings(true);
    try {
      const response = await axios.get(`/api/backend/presale/new-listings/`);
      setNewListingsData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingNewListings(false);
    }
  };

  useEffect(() => {
    loadNewListings();
    loadTopSellings();
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
        <TopSellingCard
          titleFirst={
            <div className="flex gap-2 items-center text-text-primary dark:text-text-primary-dark">
              <TopSellingPresalesSvg w="2rem" h="1.4rem" />
              Top selling presales
            </div>
          }
          data={topSellingsData}
          isM={isMobileMode}
          isLoading={isFetchingTopSellings}
        />
        <NewListingsCard
          titleFirst={
            <div className="flex gap-2 items-center text-text-primary dark:text-text-primary-dark">
              <NewListingsSvg w="2rem" h="1.35rem" />
              New Listings
            </div>
          }
          data={newListingsData}
          isM={isMobileMode}
          isLoading={isFetchingNewListings}
        />
      </div>
    </CardWrapper>
  );
};

export default PresaleTokenTopCards;
