import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { LineWave } from "react-loader-spinner";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import AddToWatchlist from "../AddToWatchlist";

import { updateTokenFeed } from "../../../redux/reducers/TokenSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Card from "../../common/Card";
import { TokenSortEnum, TokenSortOrdersEnum } from "../../../types/enums";

const TokenTable = () => {
  const email = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  const [selectedData, setSelectedData] = useState({ label: "Liquidity" });
  const [isWatchlistDialogOpen, setIsWatchlistDialogOpen] = useState(false);
  // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [, setSelectedRow] = useState();
  const [watchlists, setWatchlists] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsPerPage] = useState(10);
  const [paginationHistory, setPaginationHistory] = useState([""]);
  const [isPriceFeedFetching, setIsPriceFeedFetching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const currPage = useRef(0);

  const handleSelectData = (data) => {
    setSelectedData(data);
  };

  const loadWatchlists = async (userEmail) => {
    try {
      const response = await axios.get(`/api/watchlist/${userEmail}`);
      setWatchlists(response.data.watchlists.filter((watchlist) => watchlist));
    } catch (error) {
      setWatchlists([]);
      console.log(error);
    }
  };

  const fetchPriceFeed = async (
    sort = TokenSortEnum.Id,
    order = TokenSortOrdersEnum.Asc
  ) => {
    setIsPriceFeedFetching(true);
    try {
      const { data } = await axios.get(
        `/api/backend/tokens/price-feed?sort=${sort}&order=${order}&limit=${10}&after=${
          paginationHistory[currPage.current] || ""
        }`
      );
      setRows(data);

      const newHistory = paginationHistory.filter(
        (_, idx) => idx <= currPage.current
      );
      newHistory.push(data[data.length - 1].tokenId);
      setPaginationHistory(newHistory);
      dispatch(updateTokenFeed(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsPriceFeedFetching(false);
    }
  };

  const handleTableSort = (sort, order) => {
    fetchPriceFeed(sort, order);
  };

  useEffect(() => {
    if (email.length > 0) {
      loadWatchlists(email);
    }
  }, [email]);

  useEffect(() => {
    fetchPriceFeed();
  }, []);

  return (
    <Card>
      <AddToWatchlist
        isOpen={isWatchlistDialogOpen}
        close={() => {
          setIsWatchlistDialogOpen(false);
        }}
        watchlists={watchlists}
        selectedToken={selectedToken}
        email={email}
      />

      <div className="mb-6">
        <input
          type="search"
          className="w-[11.25rem] h-[2.375rem] py-1 px-3 outline-none rounded bg-highlight dark:bg-highlight-dark text-sm placeholder:text-text-primary placeholder:dark:text-text-primary-dark"
          value={searchQuery}
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-auto">
        <div className="min-w-[40rem]">
          <TableHead onHeaderClick={handleTableSort} />
          <div className="relative ">
            {isPriceFeedFetching && (
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
            )}
            {rows &&
              rows.map((row, index) => (
                <TableRow
                  key={row.tokenId}
                  row={row}
                  position={index + 1}
                  setIsWatchlistDialogOpen={setIsWatchlistDialogOpen}
                  setSelectedToken={setSelectedToken}
                  // setIsDetailsModalOpen={setIsDetailsModalOpen}
                  watchlists={watchlists}
                  setSelectedRow={setSelectedRow}
                />
              ))}
          </div>
        </div>
      </div>
      {/* {totalPages > 1 &&  */}
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center pl-5 text-text-primary dark:text-text-primary-dark">
          Page {currPage.current + 1}
        </div>
        <div className="flex justify-end items-center mt-[1.25rem] gap-1 text-sm">
          <div
            className={`${
              currPage.current === 0
                ? "bg-button-secondary"
                : "bg-button-primary"
            } rounded-lg py-2 px-3 flex items-center cursor-pointer text-text-primary dark:text-text-primary-dark`}
            onClick={() => {
              if (currPage.current <= 0 || isPriceFeedFetching) return;
              currPage.current--;
              fetchPriceFeed();
            }}
          >
            Prev
          </div>

          <div
            className={`${
              rows.length < rowsPerPage
                ? "bg-button-secondary"
                : "bg-button-primary"
            } rounded-lg py-2 px-3 flex items-center cursor-pointer text-text-primary dark:text-text-primary-dark`}
            onClick={() => {
              if (isPriceFeedFetching) return;
              currPage.current++;
              fetchPriceFeed();
            }}
          >
            Next
          </div>
        </div>
      </div>
    </Card>
  );
};

// export default TokenTable;
