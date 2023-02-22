import React, { ReactNode, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {
  CalenderSvg,
  FilterSvgSecond,
  HashSvg,
  ListSortSvg,
  ListSortSvgUp,
  NestedCirclesSvg,
} from "../CommonSvg";

import MobileDrawer from "./MobileDrawer";

interface IOption {
  value: string | number;
  label: string;
}

export const FilterButton = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`bg-iris-base text-text-primary-dark dark:bg-badge rounded-4px px-2.5 py-2 lg:px-5 lg:py-4 ${className}`}
  >
    {children}
  </button>
);

const AccordionButton = ({ title, onClick, isOpen, children }): JSX.Element => (
  <button
    type="button"
    className="flex justify-between w-full dark:text-white"
    onClick={onClick}
  >
    <div>
      <span>{children}</span>
      <span className="text-lg font-medium ml-3">{title}</span>
    </div>

    <FontAwesomeIcon
      icon={faCaretDown}
      className={`w-4 h-4 duration-300 ${isOpen ? "" : "-rotate-90"}`}
    />
  </button>
);

const Accordion = ({ children, title, onClick, isOpen }): JSX.Element => {
  return (
    <div>
      <AccordionButton title={title} isOpen={isOpen} onClick={onClick}>
        {title === "Topics" ? <HashSvg /> : <NestedCirclesSvg />}
      </AccordionButton>
      <div
        className={`transition-all ease-in-out duration-300 ${
          isOpen ? "max-h-[100vh]" : "max-h-0"
        } overflow-y-hidden h-auto text-text-secondary dark:text-text-secondary-dark text-sm flex flex-col gap-3.5 pt-6 px-5`}
      >
        {children}
      </div>
    </div>
  );
};

const Checkbox = ({ checked = false, label, value, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        className="w-5 h-5 text-button-primary outline-none rounded focus:ring-[transparent] dark:focus:ring-[transparent] accent-iris-base"
        checked={checked}
        id={value}
        onChange={onChange.bind(null, value)}
      />

      <label className="ml-2 text-sm dark:text-white" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

const Filter = ({
  typesOptions,
  tokensOptions,
  tagTypes = [],
  onChange,
}: {
  typesOptions: IOption[];
  tokensOptions: IOption[];
  tagTypes: (string | number)[];
  onChange: (ids) => void;
}) => {
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const [activeTags, setActiveTags] = useState(tagTypes);

  useEffect(() => setActiveTags(tagTypes), [tagTypes]);

  const handleChange = (tagId) => {
    setActiveTags((prevState) => {
      const newState = [...prevState];
      const index = newState.indexOf(tagId);
      if (index > -1) {
        newState.splice(index, 1);
      } else {
        newState.push(tagId);
      }
      return newState;
    });
  };

  return (
    <>
      {tokensOptions?.length && (
        <div className="pb-5 mb-8 border-b-1 border-separator-blue">
          <Accordion
            title="Token"
            isOpen={isTokenOpen}
            onClick={() => {
              setIsTokenOpen((prevState) => !prevState);
            }}
          >
            {tokensOptions.map((option: IOption) => (
              <Checkbox
                key={option.value}
                value={option.value}
                label={option.label}
                onChange={handleChange}
                checked={activeTags.includes(option.value)}
              />
            ))}
          </Accordion>
        </div>
      )}

      {typesOptions?.length && (
        <Accordion
          title="Topics"
          isOpen={isTypeOpen}
          onClick={() => {
            setIsTypeOpen((prevState) => !prevState);
          }}
        >
          {typesOptions.map((option: IOption) => (
            <Checkbox
              key={option.value}
              value={option.value}
              label={option.label}
              onChange={handleChange}
              checked={activeTags.includes(option.value)}
            />
          ))}
        </Accordion>
      )}

      <div className="fixed bottom-10 right-0 left-0 text-center">
        <button
          type="button"
          className="w-[15rem] h-[3.5rem] rounded-4px py-2 px-3 mb-4 cursor-pointer text-text-primary-dark bg-button-primary mx-auto block"
          onClick={() => {
            onChange([...activeTags]);
          }}
        >
          Apply filters
        </button>
        <button
          type="button"
          disabled={tagTypes.length === 0}
          className="cursor-pointer dark:text-text-primary-dark mx-auto block"
          onClick={() => {
            onChange([]);
          }}
        >
          Reset {tagTypes.length > 0 ? `(${tagTypes.length})` : null}
        </button>
      </div>
    </>
  );
};

const MobileFilters = ({
  onSorting,
  isDesc,
  children,
  typesOptions,
  tokensOptions,
  tagTypes = [],
  onChangeTags,
}: {
  isDesc: boolean;
  children: ReactNode;
  typesOptions: IOption[];
  tokensOptions: IOption[];
  onSorting: () => void;
  tagTypes: (string | number)[];
  onChangeTags: (ids) => void;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);

  const filter = (
    <Filter
      tokensOptions={tokensOptions}
      typesOptions={typesOptions}
      tagTypes={tagTypes}
      onChange={onChangeTags}
    />
  );

  const drawerContent = isDatePicker ? children : filter;

  return (
    <>
      <div className="flex gap-2 lg:hidden">
        <FilterButton
          className="lg:flex lg:items-center lg:gap-x-[.8rem]"
          onClick={onSorting}
        >
          {isDesc ? <ListSortSvg /> : <ListSortSvgUp />}
        </FilterButton>
        <FilterButton
          onClick={() => {
            setIsDatePicker(false);
            setIsOpen((prevState) => !prevState);
          }}
        >
          <FilterSvgSecond />
          {tagTypes.length > 0 && (
            <span className="text-sm rounded bg-iris-base py-1 px-2 ml-2">
              {tagTypes.length}
            </span>
          )}
        </FilterButton>
        <FilterButton
          onClick={() => {
            setIsDatePicker(true);
            setIsOpen((prevState) => !prevState);
          }}
        >
          <CalenderSvg />
        </FilterButton>
      </div>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          isDatePicker
            ? "Calendar"
            : `Filters${tagTypes.length ? " (" + tagTypes.length + ")" : ""}`
        }
      >
        {drawerContent}
      </MobileDrawer>
    </>
  );
};

export default MobileFilters;
