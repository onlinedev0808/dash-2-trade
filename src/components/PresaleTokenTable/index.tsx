import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import AddToWatchlist from "./AddToWatchlist";
import { updatePresaleTokenFeed } from "../../redux/reducers/PresaleTokenSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  PresaleFilterOptionsEnum as FilterOptionsEnum,
  PresaleTokenStatusEnum,
} from "../../types/enums";
import Card from "../common/Card";
import CustomFilter from "./common/CustomFilter";
import Cards from "./common/CardList";
import ToggleForm, { ToggleTheme } from "../Setting/ToggleForm";
import { IPresaleToken } from "../../types/redux";
import PresaleTable from "./Table";
import { PresalesCols, presaleTableColumnsConfig } from "./common/config";
import { preparePresaleTableData } from "./common/dataHandlers";
import { updateWatchlists } from "../../redux/reducers/UserSlice";

const LIMIT = 10;

const OPTIONS = [
  {
    id: 1,
    title: FilterOptionsEnum.kyc,
    show: null,
  },
  {
    id: 2,
    title: FilterOptionsEnum.audit,
    show: null,
  },
  {
    id: 3,
    title: FilterOptionsEnum.vc,
    show: null,
  },
  {
    id: 4,
    title: FilterOptionsEnum.active,
    show: null,
  },
];

const selectorStyles = {
  button: {
    default:
      "bg-highlight dark:bg-selector " +
      "text-left text-text-primary dark:text-text-primary-dark" +
      "  py-2 md:py-2.5 rounded hover:bg-highlight hover:dark:bg-selector" +
      " text-xs md:text-sm leading-[1.125rem] w-full max-w-[12.5rem]",
    valueSelected: "!text-text-primary dark:!text-text-primary-dark",
  },
  option: {
    selected: "text-text-primary dark:text-text-primary-dark",
  },
};

const CHAIN_OPTIONS: { label: string; logo?: string; value?: number }[] = [
  { label: "All" },
  { label: "Own L1" },
];

const FILTER_OPTIONS = [
  { label: "Reset All", sort: "all" },
  { label: "Token", sort: PresalesCols.Name },
  { label: "Score", sort: PresalesCols.Score },
  { label: "End Date", sort: PresalesCols.End },
  { label: "Hard Cap", sort: PresalesCols.HardCap },
  { label: "Raised", sort: PresalesCols.Raised },
  { label: "Social", sort: PresalesCols.SInteractions },
  { label: "Chain", sort: PresalesCols.Chain },
];

const initSort = {
  sort: PresalesCols.Score,
  desc: true,
};

const PresaleTokenTableContainer = () => {
  const [isWatchlistDialogOpen, setIsWatchlistDialogOpen] = useState(false);
  const [isTableMode, setIsTableMode] = useState(true);
  const [selectedToken, setSelectedToken] = useState("");

  const [chainFilter, setChainFilter] = useState("All");
  const [customFilterOptions, setCustomFilterOptions] = useState(OPTIONS);
  const [chainOptions, setChainOptions] = useState(CHAIN_OPTIONS);
  const [selectedChain, setSelectedChain] = useState(chainOptions[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(initSort);
  const [activeFilters, setActiveFilters] = useState(0);

  const [mainData, setMainData] = useState<IPresaleToken[]>([]);
  const [mainDataCards, setMainDataCards] = useState([]);
  const [tableData, setTableData] = useState<IPresaleToken[] | []>([]);
  const [colSelectorData, setColSelectorData] = useState([]);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const currPage = useRef(0);

  const email = useAppSelector((state) => state.user.email);
  const watchlists = useAppSelector((state) => state.user.watchlists);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1316px)" });
  const isNotLargeMonitor = useMediaQuery({ query: "(max-width: 1920px)" });
  const dispatch = useAppDispatch();

  const tableColumns = useMemo(() => {
    const result = [...presaleTableColumnsConfig];
    const scoreColumn = result.find((col) => col.Header === "Dash Score");
    if (isNotLargeMonitor) {
      scoreColumn.width = 84;
    } else {
      delete scoreColumn.width;
    }
    return result;
  }, [isNotLargeMonitor]);

  const loadChains = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/backend/chains/presale-list`);
      const initOptions = response?.data?.map((it) => ({
        label: it.symbol,
        logo: it.logo,
        value: it.id,
      }));

      initOptions.unshift({ label: "All", value: "all" });
      setChainOptions(initOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async (sort = PresalesCols.Name, desc = false) => {
    try {
      const kyc = customFilterOptions.find(
        (item) => item.title === FilterOptionsEnum.kyc
      ).show;
      const audit = customFilterOptions.find(
        (item) => item.title === FilterOptionsEnum.audit
      ).show;
      const vc = customFilterOptions.find(
        (item) => item.title === FilterOptionsEnum.vc
      ).show;

      const active = customFilterOptions.find(
        (item) => item.title === FilterOptionsEnum.active
      ).show;

      let url = `/api/backend/presale?sort=${sort}&desc=${desc}&limit=${LIMIT}&offset=${
        LIMIT * currPage.current
      }`;

      if (active !== null) {
        const status =
          active === true
            ? PresaleTokenStatusEnum.active
            : PresaleTokenStatusEnum.ended;

        url += `&status=${status}`;
      }
      if (kyc !== null) url += `&kyc=${kyc}`;
      if (audit !== null) url += `&audit=${audit}`;
      if (vc !== null) url += `&vc=${vc}`;

      if (searchQuery) url += `&search=${searchQuery}`;

      if (chainFilter !== "All") {
        url += `&chain=${
          chainOptions.find((item) => item.label === chainFilter).value
        }`;
      }

      setIsLoading(true);
      const response = await axios.get(url);

      const resultData =
        currPage.current === 0
          ? response.data
          : mainDataCards.concat(response.data);
      // dispatch(updatePresaleTokenFeed(response.data));

      dispatch(updatePresaleTokenFeed(resultData));
      setMainData(resultData);
      setMainDataCards(resultData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableSort = (sort, desc) => {
    setSelectedSort({ sort, desc });
    loadData(sort, desc);
  };

  const handleResetFilters = () => {
    setSelectedChain(chainOptions[0]);
    setChainFilter("All");
    setCustomFilterOptions(OPTIONS);
    setSearchQuery("");
    setSelectedSort(initSort);
  };

  const setChain = (value) => {
    setChainFilter(value);
  };

  const handleLoadMore = () => {
    if (mainData.length < LIMIT) return;

    currPage.current++;
    loadData(selectedSort.sort, selectedSort.desc);
  };

  /* const nextPage = () => {
    if (isFetching || mainData.length < LIMIT) return;

    currPage.current++;
    loadData(selectedSort.sort, selectedSort.desc);
  };

  const prevPage = () => {
    if (currPage.current <= 0 || isFetching) return;
    currPage.current--;
    loadData(selectedSort.sort, selectedSort.desc);
  }; */

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
    if ((!watchlists || !watchlists.length) && email) {
      toast.error("You need to create a watchlist");
      return;
    }
    if (!email) {
      toast.error("You need to log in");
      return;
    }
    setSelectedToken(tokenId);

    const isInWatchlist = watchlistId;

    if (isInWatchlist) removeFromWl(tokenId, watchlistId);
    else setIsWatchlistDialogOpen(true);
  };

  const addToWatchList = (rowId) => {
    if ((!watchlists || !watchlists.length) && email) {
      toast.error("You need to create a watchlist");
      return;
    }
    if (!email) {
      toast.error("You need to log in");
      return;
    }

    setSelectedToken(rowId);
    setIsWatchlistDialogOpen(true);
  };

  const prevSort = useRef("");
  const desc = useRef(false);
  const handleHeaderClick = (type: PresalesCols) => {
    if (prevSort.current === type) {
      desc.current = !desc.current;
    } else {
      prevSort.current = type;
      desc.current = false;
    }
    handleTableSort(type, desc.current);
  };

  useEffect(() => {
    loadChains();
  }, []);

  // useEffect(() => {
  //   if (email.length > 0) {
  //     loadWatchlists(email);
  //   }
  // }, [email]);

  useEffect(() => {
    currPage.current = 0;
    loadData(selectedSort.sort, selectedSort.desc);
  }, [searchQuery, customFilterOptions, chainFilter, selectedSort]);

  useEffect(() => {
    let filter = 0;
    if (searchQuery !== "") filter++;
    if (chainFilter !== "All") filter++;

    const countCustomFilterNotSet = customFilterOptions.filter(
      (item) => item.show !== null
    );

    filter += countCustomFilterNotSet.length;

    setActiveFilters(filter);
  }, [searchQuery, customFilterOptions, chainFilter, selectedChain]);

  useEffect(() => {
    setTableData(
      preparePresaleTableData(mainData, watchlists, handleWatchlistClick)
    );
  }, [mainData, watchlists]);

  return (
    <>
      <Card
        // icon={<PresaleTokensSvg width={isMobile ? "1.25rem" : "1.5rem"} />}
        classes="!p-5 !pt-8"
      >
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

        {/* <div className="flex hidden">
          <div className="mr-2.5">
            <SelectBox
              onChange={setSelectedData}
              value={selectedData}
              options={[
                { label: "Market Cap" },
                { label: "Volume" },
                { label: "Liquidity" },
                { label: "MACD" },
                { label: "RSI" },
              ]}
            />
          </div>
          <div className="mr-2.5 bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-xs leading-[1.125rem] w-[11.25rem]">
            Volume
          </div>
          <div className="mr-2.5">
            <SelectBox
              options={[
                { label: "Market Cap" },
                { label: "Volume" },
                { label: "Liquidity" },
                { label: "MACD" },
                { label: "RSI" },
              ]}
            />
          </div>
          <div className="mr-2.5 bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-xs leading-[1.125rem] w-[11.25rem]">
            Exchange
          </div>
          <div className="mr-2.5">
            <SelectBox options={[{ label: "Sort" }]} style={selectorStyles} />
          </div>
        </div> */}

        <div
          className={`flex justify-between items-center mb-10 ${
            isTabletOrMobile && "flex-col items-stretch gap-y-8"
          }`}
        >
          <h1 className="text-3xl">Presale Tokens</h1>
          <div className="flex">
            <CustomFilter
              styles={selectorStyles.button.default}
              options={customFilterOptions}
              setOptions={setCustomFilterOptions}
              setChain={setChain}
              selectedChain={chainFilter}
              chainOptions={chainOptions}
              filterOptions={FILTER_OPTIONS}
              selectedSort={selectedSort}
              setSelectedSort={handleTableSort}
              selectorStyles={selectorStyles}
              handleResetFilters={handleResetFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilters={activeFilters}
              colSelectorData={colSelectorData}
              isMobileView={isTabletOrMobile}
            />

            <div
              className={`flex justify-end items-center rounded ${
                isTabletOrMobile ? "visible" : "hidden"
              }`}
            >
              <span className="text-xs leading-7 text-text-primary dark:text-text-primary-dark mr-3">
                Table Mode
              </span>
              <ToggleForm
                isActive={isTableMode}
                onChange={() => setIsTableMode((prevState) => !prevState)}
                toggleTheme={ToggleTheme.Small}
              />
            </div>
          </div>
        </div>

        {isTableMode && (
          <>
            <div ref={tableContainerRef} className="overflow-auto">
              <PresaleTable
                data={tableData}
                columns={tableColumns}
                colSelectorData={colSelectorData}
                setColSelectorData={setColSelectorData}
                onHeaderClick={handleHeaderClick}
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              {mainData.length ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={`w-[14rem] h-[3.5rem] rounded-lg py-2 px-3 mb-8 flex items-center justify-center cursor-pointer 
            ${
              mainData.length < LIMIT
                ? "bg-transparent border-2 border-border-primary cursor-not-allowed text-text-primary dark:text-text-primary-dark"
                : "bg-button-primary text-text-primary-dark"
            } 
            `}
                >
                  Load More
                </button>
              ) : null}
            </div>
          </>
        )}
      </Card>
      {!isTableMode && (
        <Cards
          rows={mainDataCards}
          chains={chainOptions}
          isLoading={isLoading}
          nextPage={handleLoadMore}
          onWatchListClick={addToWatchList}
        />
      )}
    </>
  );
};

export default PresaleTokenTableContainer;
