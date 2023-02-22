import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TokenTable from "./Table";
import { tokenTableColumnsConfig } from "./common/config";
import { TokenSortEnum, TokenSortOrdersEnum } from "../../types/enums";
import { updateTokenFeed } from "../../redux/reducers/TokenSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TokenModel from "../../models/TokenModel";
import AddToWatchlist from "../PresaleTokenTable/AddToWatchlist";
import Card from "../common/Card";
import {
  getTokensPrices,
  getTokensSocials,
  getTokensVolumes,
  prepareTokenTableData,
} from "./common/dataHandlers";
import CreateWatchlist from "../Watchlist/CreateWatchlist";
import { updateWatchlists } from "../../redux/reducers/UserSlice";

const LIMIT = 10;

const TokenTableContainer = () => {
  const [tokensData, setTokensData] = useState([]);
  const [tableData, setTableData] = useState<TokenModel[] | []>([]);

  const [pricesData, setPricesData] = useState([]);
  const [volumesData, setVolumesData] = useState([]);
  const [socialsData, setSocialsData] = useState([]);

  const [isCreateWatchlistOpen, setIsCreateWatchlistOpen] = useState(false);
  const [pricesPeriod, setPricesPeriod] = useState({ label: "", value: "" });
  const [isFetching, setIsFetching] = useState(false);

  const [isWatchlistDialogOpen, setIsWatchlistDialogOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");

  const currPage = useRef(0);
  const email = useAppSelector((state) => state.user.email);
  const watchlists = useAppSelector((state) => state.user.watchlists);

  const dispatch = useAppDispatch();

  const tableColumns = useMemo(() => tokenTableColumnsConfig, []);

  const removeFromWl = async (tokenId, watchlistId) => {
    const response = await axios.delete(`/api/watchlist/token`, {
      data: {
        address: email,
        id: watchlistId,
        tokens: [tokenId],
      },
    });

    dispatch(updateWatchlists(response.data.watchlists));
  };

  const handleWatchlistClick = (tokenId, watchlistId) => {
    // if ((!watchlists || !watchlists.length) && email) {
    //   toast.error("You need to create a watchlist");
    //   return;
    // }
    if (!email) {
      toast.error("You need to log in");
      return;
    }
    setSelectedToken(tokenId);

    if ((!watchlists || !watchlists.length) && email) {
      setIsCreateWatchlistOpen(true);
      return;
    }

    const isInWatchlist = watchlistId;

    if (isInWatchlist) removeFromWl(tokenId, watchlistId);
    else setIsWatchlistDialogOpen(true);
  };

  const fetchTokens = async (
    {
      sort = TokenSortEnum.Id,
      order = TokenSortOrdersEnum.Asc,
      after = null,
    } = {
      sort: TokenSortEnum.Id,
      order: TokenSortOrdersEnum.Asc,
      after: null,
    }
  ) => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `/api/backend/tokens/price-feed?sort=${sort}&order=${order}&limit=${10}&after=${
          after || ""
        }`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLoadMore = async () => {
    if (isFetching || tokensData.length < LIMIT) return;
    currPage.current++;
    const lastToken = tokensData.at(-1)?.id;
    const newTokensData = await fetchTokens({ after: lastToken });
    setTokensData((prev) =>
      lastToken ? [...prev, ...newTokensData] : newTokensData
    );
    dispatch(updateTokenFeed(newTokensData));
  };

  useEffect(() => {
    const cookTokensData = async () => {
      const newTokensData = await fetchTokens();

      if (newTokensData) {
        setTokensData(newTokensData);
        dispatch(updateTokenFeed(newTokensData));
      }
    };
    cookTokensData();
    return () => {};
  }, []);

  useEffect(() => {
    if (tokensData?.length > 0) {
      getTokensPrices(tokensData, pricesPeriod).then(
        (prices) => {
          setPricesData(prices);
        },
        (reason) => {
          console.log("reason", reason);
        }
      );
      getTokensVolumes(tokensData).then(
        (volumes) => {
          setVolumesData(volumes);
        },
        (reason) => {
          console.log("reason", reason);
        }
      );
      getTokensSocials(tokensData).then(
        (socials) => {
          setSocialsData(socials);
        },
        (reason) => {
          console.log("reason", reason);
        }
      );
    }
  }, [tokensData]);

  useEffect(() => {
    if (tokensData?.length > 0) {
      const cookTableData = async () => {
        const newTableData = prepareTokenTableData(
          tokensData,
          pricesData,
          volumesData,
          socialsData,
          watchlists,
          handleWatchlistClick
        );

        setTableData(newTableData);
      };
      cookTableData();
    }
    return () => {};
  }, [pricesData, volumesData, socialsData, watchlists, tokensData]);

  return (
    <Card classes="bg-background-t-table dark:bg-foreground-highlight-dark !p-5 !pt-8">
      {isWatchlistDialogOpen && (
        <AddToWatchlist
          close={() => {
            setIsWatchlistDialogOpen(false);
          }}
          watchlists={watchlists}
          selectedToken={selectedToken}
          email={email}
        />
      )}
      {isCreateWatchlistOpen && (
        <CreateWatchlist
          close={() => {
            setIsCreateWatchlistOpen(false);
          }}
          emailAddress={email}
          loadWatchlists={undefined}
          tokenId={selectedToken}
        />
      )}
      <TokenTable
        data={tableData}
        columns={tableColumns}
        setHistoryInterval={setPricesPeriod}
      />
      <div className="flex justify-center items-center mt-8">
        {tokensData?.length ? (
          <button
            type="button"
            onClick={handleLoadMore}
            className={`${
              tokensData.length < LIMIT
                ? "bg-transparent border-2 border-border-primary cursor-not-allowed"
                : "bg-button-primary"
            } w-[14rem] h-[3.5rem] rounded-lg py-2 px-3 mb-8 flex items-center justify-center cursor-pointer 
            text-text-primary-dark`}
          >
            Load More
          </button>
        ) : null}
      </div>
    </Card>
  );
};

export default TokenTableContainer;
