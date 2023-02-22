// @ts-nocheck
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { LineWave } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import Select, { components } from "react-select";
import { Range } from "react-date-range";

import {
  DiscordRoundedSvg,
  FacebookSvg,
  FilledArrowDown,
  HashSvg,
  InstagramSvg,
  ListSortSvg,
  ListSortSvgUp,
  NestedCirclesSvg,
  ThumbUpSvg,
  TwitterSvg,
} from "../CommonSvg";
import BtcIcon from "/public/_mock-tokens-icons/btc_frame.png";
import EventsDatePicker from "./EventsDatePicker";
import MobileFilters, { FilterButton } from "./MobileFilters";

const LIMIT = 3;

const selectClasses = {
  control: () =>
    "text-text-primary dark:text-text-primary-dark dark:bg-badge !shadow-none !border-none py-[8px] px-[12px] ",
  menu: () => "dark:bg-badge",
  option: (state) => {
    let result = "active:dark:bg-hover-highlight ";
    result += state.isFocused
      ? " dark:bg-hover-highlight-dark "
      : " dark:bg-badge ";
    return result;
  },
  multiValue: () => "dark:bg-hover-highlight-dark ",
  multiValueLabel: () => "dark:text-text-primary-dark ",
  placeholder: () => "dark:text-text-primary-dark ",
  clearIndicator: () =>
    "w-10 h-10 dark:text-text-primary-dark -translate-y-[1px]",
  indicatorsContainer: () => "w-max h-9",
};

interface IEventItem {
  id: number;
  title: string;
  description: string;
  tags: [];
  likes: number;
  timestamp: string;
  image?: string;
}

interface IOption {
  value: string | number;
  label: string;
}

const initDateRange = [
  {
    startDate: null,
    endDate: null,
    key: "selection",
  },
];

const BgList = ["bg-[#AFDD75]", "bg-[#5E4EC5]", "bg-[#C64B68]", "bg-[#1D2435]"];

const lineWave = (
  <div className="absolute top-0 right-0 left-0">
    <LineWave
      color="#5367FE"
      ariaLabel="line-wave"
      wrapperStyle={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
      }}
      wrapperClass=""
      visible
    />
  </div>
);

const LikesCounter = ({ likes }) => (
  <div className="text-[#35416D] bg-foreground dark:bg-[#171D34] border-highlight dark:border-[#262D48] border-1 rounded-8px lg:w-[3.54rem] lg:h-[3.5rem] px-4 py-2 flex flex-row lg:flex-col justify-center items-center gap-1">
    <ThumbUpSvg />
    <span className="text-text-primary dark:text-text-primary-dark text-2sm">
      {likes}
    </span>
  </div>
);

const SocialIcon = ({ icon }) => (
  <div className="w-14 h-14 flex items-center px-[14px] dark:bg-grey-dark rounded-8px">
    {icon}
  </div>
);

const SocialsBlock = () => (
  <div
    className="flex flex-col items-center px-6 py-10
          rounded-3xl border-1 border-separator-blue dark:bg-background-secondary-dark"
  >
    <span className="text-2xl mb-5">Stay up to date!</span>
    <p className="text-larger text-text-secondary dark:text-text-secondary-dark mb-[2.15rem]">
      Follow Dash2Trade on socials to keep up with the latest news & events
    </p>
    <div className="flex gap-3.5 ">
      <SocialIcon icon={<TwitterSvg />} />
      <SocialIcon icon={<InstagramSvg />} />
      <SocialIcon icon={<DiscordRoundedSvg />} />
      <SocialIcon icon={<FacebookSvg />} />
    </div>
  </div>
);

const DropdownIndicator = () => <FilledArrowDown w={10.5} h={4.5} />;
const TokenValueContainer = ({ ...props }) => (
  <div className="flex items-center ">
    <span className="text-grey-light -translate-y-[2px]">
      <NestedCirclesSvg />
    </span>
    <components.ValueContainer {...props} />
  </div>
);
const TopicValueContainer = ({ ...props }) => (
  <div className="flex items-center ">
    <span className="text-grey-light -translate-y-[2px]">
      <HashSvg />
    </span>
    <components.ValueContainer {...props} />
  </div>
);

const EventItem = ({
  id,
  image,
  title,
  description,
  tags,
  likes,
  timestamp,
}: IEventItem) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(likes);

  useEffect(() => setCount(likes), [likes]);

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await axios.post("/api/events/like", { id });
      if (result.data) setCount(result.data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const time = moment.unix(timestamp).format("DD MMM, YYYY | h:mm");

  const likeButton = (
    <button type="button" onClick={handleClick}>
      <LikesCounter likes={count} />
    </button>
  );

  return (
    <section className="flex flex-col lg:flex-row gap-1 lg:gap-5">
      <div className="min-w-[2.77rem] min-h-[2.77rem]">
        {image ? (
          <img
            src={image}
            alt=""
            style={{ width: "2.769rem" }}
            className="mb-2"
          />
        ) : (
          <Image src={BtcIcon} />
        )}
      </div>

      <div className="border-b-1 border-border-primary w-full">
        <div className="flex flex-col lg:flex-row justify-between mb-2 gap-4">
          <h4 className="text-lg">{title}</h4>
          <span className="hidden lg:flex items-center gap-5 text-2sm">
            <span className="text-text-secondary dark:text-text-secondary-dark">
              {time}
            </span>
            {likeButton}
          </span>
        </div>

        {tags ? (
          <div className="flex gap-2.5 lg:mb-4">
            {tags.map((item, key) => {
              const [title, color, type] = item;
              const tagClass =
                color === "#1D2435"
                  ? "bg-foreground border-1 border-highlight dark:border-0 dark:bg-[#1D2435]"
                  : "text-text-primary";
              return (
                <span
                  key={key}
                  className={`px-[.77rem] py-[.3rem] text-xs tracking-[.077rem] rounded-4px bg-[${color}] ${tagClass}`}
                >
                  {title}
                </span>
              );
            })}
          </div>
        ) : null}

        <div className="lg:hidden text-text-secondary dark:text-text-secondary-dark text-2sm mb-6 mt-3">
          {time}
        </div>

        <p className="text-2sm text-text-secondary dark:text-text-secondary-dark mb-6">
          {description}
        </p>

        <div className="lg:hidden mb-8">{likeButton}</div>
      </div>
    </section>
  );
};

const initOptions = { tokens: [], types: [] };
const dateFormat = "DD MMMM YYYY";

const EventsSection = ({
  dateRange,
  events,
  onSorting,
  isDesc,
  tokenOptions,
  typesOptions,
  onOptionsChange,
  isLoading = false,
  tagTypes = [],
}: {
  dateRange: object;
  events: IEventItem[];
  isDesc: boolean;
  tokenOptions: IOption[];
  typesOptions: IOption[];
  isLoading: boolean;
  onOptionsChange: () => void;
  onSorting: () => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState(initOptions);
  //const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selectedTypes = typesOptions.filter(
      (item) => tagTypes.indexOf(item.value) > -1
    );
    const selectedTokens = tokenOptions.filter(
      (item) => tagTypes.indexOf(item.value) > -1
    );

    setSelectedOptions({ tokens: selectedTokens, types: selectedTypes });
  }, [tagTypes, tokenOptions, typesOptions]);

  const starDate = dateRange[0].startDate
    ? moment(dateRange[0].startDate).format(dateFormat)
    : null;
  const endDate = dateRange[0].endDate
    ? moment(dateRange[0].endDate).format(dateFormat)
    : null;

  let calenderButton = starDate;
  if (endDate && endDate !== starDate)
    calenderButton += calenderButton ? "-" + endDate : endDate;

  return (
    <>
      <div>
        <div className="hidden lg:flex lg:justify-between lg:flex-row">
          <div className="flex gap-3">
            {tokenOptions.length || typesOptions.length ? (
              <button
                type="button"
                className="bg-button-primary text-text-primary-dark rounded-4px px-5 py-4"
                onClick={() =>
                  setSelectedOptions((prevState) => {
                    onOptionsChange(initOptions);
                    return initOptions;
                  })
                }
              >
                All
              </button>
            ) : null}
            {tokenOptions.length ? (
              <Select
                options={tokenOptions}
                value={selectedOptions.tokens}
                classNames={selectClasses}
                placeholder="Token"
                components={{
                  DropdownIndicator,
                  ValueContainer: TokenValueContainer,
                  IndicatorSeparator: null,
                }}
                onChange={(newValue, actionMeta) => {
                  setSelectedOptions((prevState) => {
                    const newS = {
                      types: [...prevState.types],
                      tokens: [...newValue],
                    };
                    onOptionsChange(newS);
                    return newS;
                  });
                }}
                isMulti
              />
            ) : null}
            {typesOptions.length ? (
              <Select
                options={typesOptions}
                value={selectedOptions.types}
                classNames={selectClasses}
                components={{
                  DropdownIndicator,
                  ValueContainer: TopicValueContainer,
                  IndicatorSeparator: null,
                }}
                placeholder="Topic"
                onChange={(newValue) => {
                  setSelectedOptions((prevState) => {
                    const newS = {
                      types: [...newValue],
                      tokens: [...prevState.tokens],
                    };
                    onOptionsChange(newS);
                    return newS;
                  });
                }}
                isMulti
              />
            ) : null}

            {calenderButton && (
              <button
                type="button"
                onClick={() => {}}
                className="rounded-4px py-2 px-3 flex items-center justify-center gap-2 cursor-pointer text-text-primary-dark bg-button-primary"
              >
                {calenderButton}
              </button>
            )}
          </div>
          <FilterButton
            className="hidden lg:flex items-center gap-x-[.8rem]"
            onClick={onSorting}
          >
            {isDesc ? <ListSortSvg /> : <ListSortSvgUp />}
            {isDesc ? "Latest" : "Oldest"} first
          </FilterButton>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 mb-2 relative min-h-[8rem]">
        {isLoading && lineWave}
        {events.length === 0 && !isLoading ? "No Events Found" : null}
        {events.map((e) => (
          <EventItem key={e.id} {...e} />
        ))}
      </div>
    </>
  );
};

const Events = () => {
  const unmounted = useRef(false);

  const [events, setEvents] = useState<IEventItem[]>([]);
  const [page, setPage] = useState(0);
  const [dateRange, setDateRange] = useState<Range[]>(initDateRange);
  const [isDesc, setIsDesc] = useState(true);

  const [isFetching, setIsFetching] = useState(false);

  //const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [tokensOptions, setTokensOptions] = useState<IOption[]>([]);
  const [typesOptions, setTypesOptions] = useState<IOption[]>([]);

  const [tagTypes, setTagsTypes] = useState<string | number[]>([]);

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleDateChange = (item) => setDateRange([item.selection]);

  const fetchEvents = async (isFirstPage = false, isInitDate = false) => {
    setIsFetching(true);

    try {
      const pageNum = isFirstPage ? 0 : page;
      const starDate = Math.floor(
        new Date(dateRange[0].startDate).getTime() / 1000
      );
      const endDate = Math.floor(
        new Date(dateRange[0].endDate).getTime() / 1000
      );

      let query = `?page=${pageNum}`;

      query += `&desc=${isDesc}&limit=${LIMIT}`;

      if (!isInitDate && starDate > 0 && endDate > 0) {
        query += `&start=${starDate}&end=${
          starDate === endDate ? endDate + 60 * 60 * 24 : endDate
        }`;
      }

      if (tagTypes.length > 0) {
        query += `&tags=${tagTypes.join(",")}`;
      }

      const response = await axios.get(`/api/events${query}`);

      if (!unmounted.current) {
        if (pageNum === 0) {
          setEvents(response.data);
        } else {
          setEvents((prevState) => [...prevState, ...response.data]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!unmounted.current) setIsFetching(false);
    }
  };

  const handleSubmit = () => {
    setPage(0);
    fetchEvents(true);
  };

  const handleReset = () => {
    setDateRange(initDateRange);
    setPage(0);

    fetchEvents(true, true);
  };

  const handleSorting = () => {
    setPage(0);
    setIsDesc((prevState) => !prevState);
  };

  const handleOptionsChange = (options) => {
    const types = [...options.tokens, ...options.types]?.map(
      (item) => item.value
    );

    setPage(0);
    setTagsTypes(types);
  };

  useEffect(() => {
    fetchEvents();
  }, [page, isDesc, tagTypes]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/api/events/tags`);
        const tags = response.data;
        const tokenType = "token";

        const tokensOption = tags
          ?.filter((tag) => tag.type === tokenType)
          .map((tag) => ({ value: tag.id, label: tag.title }));

        const typesOption = tags
          ?.filter((tag) => tag.type !== tokenType)
          .map((tag) => ({ value: tag.id, label: tag.title }));

        if (!unmounted.current) {
          setTokensOptions(tokensOption);
          setTypesOptions(typesOption);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();

    return () => {
      unmounted.current = true;
    };
  }, []);

  const isDisabled = isFetching || events.length < LIMIT * (page + 1);

  const datePicker = (
    <EventsDatePicker
      ranges={dateRange}
      onChange={handleDateChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isFetching={isFetching}
    />
  );

  const handleOnChange = (ids) => {
    setTagsTypes(ids);
  };

  return (
    <div
      className="flex flex-col lg:grid lg:grid-cols-[1fr_331px] gap-[4.38rem]
       text-text-primary dark:text-text-primary-dark
       px-5 py-16
       "
    >
      <div className="flex flex-col lg:gap-y-12">
        <section className="flex flex-col gap-5 lg:gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl">Events</h1>
            <MobileFilters
              isDesc={isDesc}
              onSorting={handleSorting}
              tokensOptions={tokensOptions}
              typesOptions={typesOptions}
              tagTypes={tagTypes}
              onChangeTags={handleOnChange}
            >
              <div className="text-center">{datePicker}</div>
            </MobileFilters>
          </div>

          <EventsSection
            dateRange={dateRange}
            events={events}
            onSorting={handleSorting}
            isDesc={isDesc}
            tokenOptions={tokensOptions}
            typesOptions={typesOptions}
            tagTypes={tagTypes}
            onOptionsChange={handleOptionsChange}
            isLoading={isFetching}
          />
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "bg-transparent border-2 border-border-primary cursor-not-allowed text-text-primary dark:text-text-primary-dark"
                  : "bg-button-primary text-text-primary-dark"
              } w-[14rem] h-[3.5rem] rounded-lg py-2 px-3 mb-8 flex items-center justify-center cursor-pointer`}
            >
              Load More
            </button>
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-3xl border-1 border-separator-blue bg-white dark:bg-background-secondary-dark overflow-hidden hidden lg:block">
          {datePicker}
        </div>
        <SocialsBlock />
      </div>
    </div>
  );
};

export default Events;
