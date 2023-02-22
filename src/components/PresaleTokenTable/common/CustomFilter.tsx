import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useDetectOutsideClick from "../../../hooks/useDetectOutsideClick";
import {
  FilterIconSvg,
  FilterSvg,
  ResetFilterSvg,
  SeacrhSvg,
  WatchlistIcon,
} from "../../CommonSvg";
import ThemeContext, { THEMES } from "../../../theme";
import ChainFilter from "./ChainFilter";
import SortByFilter from "./SortByFilter";

import { PresaleFilterOptionsEnum as FilterOptionsEnum } from "../../../types/enums";
import ColumnSelector from "../../TokenTable/Table/ColumnSelector";

const SELECTED_BG = "bg-button-primary";
const SELECTED_TEXT = "text-white";

const HideShowClearFilter = ({
  setIsActive = null,
  option,
  selectOption,
  title = "",
  hasBorder = false,
}) => {
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  const eyeColor = isLightTheme ? "#000" : "white";

  return (
    <div
      className={`flex border-border-primary ${
        hasBorder ? "border-solid border-1 rounded" : ""
      } items-center py-0.5 pr-0.5`}
    >
      {title && (
        <span
          onClick={() => {
            if (!setIsActive) return;
            setIsActive(false);
          }}
          className="text-sm px-2 cursor-pointer"
        >
          {title}
        </span>
      )}

      <div className="rounded overflow-hidden grid grid-cols-2 border-1 border-solid border-border-primary">
        <button
          onClick={() => selectOption(option?.id, "show", true)}
          className={`${
            option?.show
              ? `${SELECTED_BG} ${SELECTED_TEXT}`
              : "bg-white dark:bg-black"
          } px-1.5 py-1 text-[0.625rem] border-r-1 border-border-primary flex flex-col items-center`}
        >
          <WatchlistIcon color={!option?.show ? eyeColor : "white"} />
          Yes
        </button>
        <button
          onClick={() => selectOption(option?.id, "show", false)}
          className={`${
            option?.show === false
              ? `${SELECTED_BG} ${SELECTED_TEXT}`
              : "bg-white dark:bg-black"
          } px-1.5 py-1 text-[0.625rem] border-border-primary border-r-1 flex flex-col items-center`}
        >
          <FontAwesomeIcon icon={faClose} />
          No
        </button>
        {/* <button
          onClick={() => selectOption(option?.id, "clear", false)}
          className="bg-white dark:bg-black px-1.5 py-1 text-[0.625rem]"
        >
          Clear
        </button> */}
      </div>
    </div>
  );
};

const FilterButton = ({ setIsActive, title }) => (
  <button
    onClick={() => setIsActive(true)}
    className="bg-highlight dark:bg-selector rounded text-text-primary dark:text-text-primary-dark px-3 py-2.5 flex gap-2 items-center"
  >
    {title}
    <div className="w-4">
      <FilterIconSvg />
    </div>
  </button>
);

const DesktopTagFilter = ({
  isActive,
  option,
  selectOption,

  setIsActive,
  title,
  buttonTitle,
}) => (
  <div className="flex gap-[inherit] items-center">
    {isActive && (
      <HideShowClearFilter
        title={title}
        option={option}
        selectOption={selectOption}
        setIsActive={() => setIsActive(false)}
        hasBorder
      />
    )}
    {!isActive && (
      <FilterButton title={buttonTitle} setIsActive={setIsActive} />
    )}
  </div>
);

const CustomFilter = ({
  styles = "",
  options,
  setOptions,
  selectedChain,
  chainOptions,
  filterOptions,
  selectedSort,
  selectorStyles,
  setChain,
  setSelectedSort,
  handleResetFilters,
  searchQuery,
  setSearchQuery,
  activeFilters,
  colSelectorData,
  isMobileView = false,
}) => {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [isInputActive, setIsInputActive] = useState(false);
  const [isAuditActive, setIsAuditActive] = useState(false);
  const [isKycActive, setIsKycActive] = useState(false);
  const [isVCActive, setIsVCActive] = useState(false);
  const [isStatusActive, setIsStatusActive] = useState(false);

  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  const selectOption = (id, prop, value) => {
    const updateOptions = (opts) =>
      opts?.map((item) => {
        if (item.id === id) {
          const show = item[prop];
          return {
            ...item,
            [prop]: show === value ? null : value,
          };
        }

        return { ...item };
      });

    setOptions(updateOptions);
  };

  const kycOption = options?.find(
    (option) => option?.title === FilterOptionsEnum.kyc
  );
  const vcOption = options?.find(
    (option) => option?.title === FilterOptionsEnum.vc
  );
  const auditOption = options?.find(
    (option) => option?.title === FilterOptionsEnum.audit
  );
  const activeOption = options?.find(
    (option) => option?.title === FilterOptionsEnum.active
  );

  return (
    <div className="relative flex grow" ref={dropdownRef}>
      {!isMobileView && (
        <div className="flex grow justify-end gap-2 flex-wrap ">
          <div className="flex gap-[inherit] relative">
            <input
              ref={inputRef}
              type="search"
              className={`${
                isInputActive ? "w-[12.5rem]" : "w-7"
              } transition-all duration-250 px-2.5 py-2 md:px-3 md:py-2 rounded outline-none rounded bg-highlight dark:bg-selector text-xs md:text-sm placeholder:text-text-primary placeholder:dark:text-text-primary-dark`}
              value={searchQuery}
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className={` ${
                !isInputActive
                  ? "bg-button-primary"
                  : "bg-highlight dark:bg-selector"
              } rounded w-11 h-11 justify-center flex gap-2 items-center absolute right-0`}
              onClick={() => {
                setIsInputActive(!isInputActive);

                setTimeout(() => {
                  if (!isInputActive) inputRef?.current?.focus();
                }, 100);
              }}
            >
              <SeacrhSvg color={isInputActive ? "#5366FF" : "white"} />
            </button>
          </div>
          <ColumnSelector columns={colSelectorData} />

          <div>
            <button
              className="bg-highlight dark:bg-selector rounded text-text-primary dark:text-text-primary-dark px-3 py-2.5 flex gap-2 items-center w-[9.75rem]"
              onClick={() => {
                setIsOpened(!isOpened);
              }}
            >
              Chains Filter
              <div className="w-4">
                <FilterIconSvg />
              </div>
            </button>
            {isOpened && (
              <div className="bg-highlight dark:bg-selector rounded absolute z-10 top-[3rem] w-[9.75rem] px-3">
                <ChainFilter
                  onChange={setChain}
                  value={selectedChain}
                  label="Chain"
                  options={chainOptions}
                  style={selectorStyles}
                  hasLogos
                />
              </div>
            )}
          </div>
          <DesktopTagFilter
            title={FilterOptionsEnum.audit}
            buttonTitle="Audit Filter"
            option={auditOption}
            selectOption={selectOption}
            setIsActive={setIsAuditActive}
            isActive={isAuditActive}
          />

          <DesktopTagFilter
            title={FilterOptionsEnum.kyc}
            buttonTitle="KYC Filter"
            option={kycOption}
            selectOption={selectOption}
            setIsActive={setIsKycActive}
            isActive={isKycActive}
          />

          <DesktopTagFilter
            title={FilterOptionsEnum.vc}
            buttonTitle="VC Filter"
            option={vcOption}
            selectOption={selectOption}
            setIsActive={setIsVCActive}
            isActive={isVCActive}
          />

          <DesktopTagFilter
            title={FilterOptionsEnum.active}
            buttonTitle="Active presale"
            option={activeOption}
            selectOption={selectOption}
            setIsActive={setIsStatusActive}
            isActive={isStatusActive}
          />

          <button
            className={`bg-highlight dark:bg-selector rounded text-text-primary dark:text-text-primary-dark duration-300 transition-all overflow-hidden ${
              activeFilters > 0 ? "max-w-[11rem]" : "max-w-0"
            }`}
            onClick={handleResetFilters}
          >
            <span className="whitespace-nowrap px-3 py-2 flex gap-2 items-center">
              Reset Filters <span className="w-5">({activeFilters})</span>
              <span className="w-4">
                <ResetFilterSvg />
              </span>
            </span>
          </button>
        </div>
      )}
      {isMobileView && (
        <>
          <div className="flex gap-2 flex-wrap">
            <input
              type="search"
              className="w-[11.25rem] md:w-[12.5rem] px-2.5 py-2 md:px-3 md:py-2 rounded outline-none
               bg-highlight dark:bg-selector
               text-xs md:text-sm
               placeholder:text-text-primary placeholder:dark:text-text-primary-dark"
              value={searchQuery}
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setIsOpened(!isOpened)}
              className="flex rounded"
            >
              <FilterSvg />
            </button>
          </div>

          {isOpened && (
            <div className="absolute z-10 top-[2.625rem]">
              <ul className=" bg-highlight dark:bg-selector py-2.5 rounded w-[12.5rem]">
                {options?.map((option) => (
                  <li
                    className="px-3 flex justify-between items-center h-10 "
                    key={option.id}
                  >
                    <span className="text-xs md:text-sm">{option?.title}</span>
                    <HideShowClearFilter
                      option={option}
                      selectOption={selectOption}
                    />
                  </li>
                ))}
                <li className="px-3 mt-3">
                  <ChainFilter
                    onChange={setChain}
                    value={selectedChain}
                    label="Chain"
                    options={chainOptions}
                    style={selectorStyles}
                    hasLogos
                    isExpandable
                  />
                </li>
                <li className="px-3">
                  <hr className="border-t-1 border-solid cursor-pointer border-border-primary/50 dark:border-border-primary" />
                  <ColumnSelector columns={colSelectorData} isNested />
                </li>
                <li className="px-3  md:hidden">
                  <hr className="border-t-1 border-solid cursor-pointer border-border-primary/50 dark:border-border-primary" />
                  <SortByFilter
                    onChange={setSelectedSort}
                    value={selectedSort}
                    label="Sort By"
                    options={filterOptions}
                    style={selectorStyles}
                  />
                </li>
                <li className="px-3">
                  <hr className="mb-2.5 border-t-1 border-solid cursor-pointer border-border-primary/50 dark:border-border-primary" />
                  <button
                    className="text-red cursor-pointer text-sm md:text-base"
                    onClick={handleResetFilters}
                  >
                    Reset filters
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomFilter;
