/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRef, useState } from "react";
import useDetectOutsideClick from "../../../../hooks/useDetectOutsideClick";
import Tooltip, { TooltipPosY } from "../../../common/Tooltip";
import { DropdownFilledArrow, TickSvg } from "../../../CommonSvg";
import Input from "./Input";
import { FILLED_STYLE, INPUT_STYLE, LABEL_STYLE } from "./utils";

const PLACEHOLDER = "Select";

const Dropdown = ({
  onChange,
  options = [],
  value,
  title = "",
  styles = "",
  hasSearch = false,
  hasSubcategories = false,
  search = "",
  setSearch = null,
  excludeId = null,
  valueTitle = "",
  width = "",
  hasTooltip = false,
}) => {
  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  const style = styles || INPUT_STYLE;

  const dropdownSize = width || "w-full";

  return (
    <div ref={dropdownRef} className="w-full flex flex-col grow relative">
      <div className="flex gap-2">
        {title && <span className={LABEL_STYLE}>{title}</span>}
        {hasTooltip && (
          <Tooltip
            title="Title"
            message="Description"
            positionY={TooltipPosY.Bottom}
            icon
            variant="filled"
          />
        )}
      </div>

      <button
        onClick={() => setIsOpened(!isOpened)}
        className={`flex justify-between relative w-full items-center ${style}`}
      >
        <span className="flex flex-col gap-2">
          <span className="text-left">
            {valueTitle || value || PLACEHOLDER}
          </span>
        </span>

        <span>
          <DropdownFilledArrow />
        </span>
      </button>

      {isOpened && (
        <ul
          className={`${dropdownSize} transition-all absolute ease-in-out duration-300 translate-y-[100%] bottom-0 z-[1] rounded-xl pt-3 pb-1.5 px-4 bg-highlight dark:bg-background-secondary-dark ${
            isOpened ? "max-h-[25rem]" : "max-h-0"
          } overflow-y-scroll h-auto`}
        >
          {hasSearch && (
            <li className="mb-2">
              <Input
                label=""
                placeholder="Search for indicators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="period"
                styles={`${FILLED_STYLE} dark:bg-[#1D233A]`}
              />
            </li>
          )}
          {hasSubcategories
            ? options?.map(({ label: category, options: itemOptions, id }) => (
                <li key={id} className="flex flex-col justify-center">
                  {category && (
                    <div className="flex items-center gap-3 outline-none w-full h-10">
                      <span className="block truncate text-xs md:text-sm font-semibold text-button-primary">
                        {category}
                      </span>
                    </div>
                  )}
                  <ul>
                    {itemOptions
                      ?.filter((item) => item.id !== excludeId)
                      .map(({ label }, key) => {
                        const itemTitle = label;

                        return (
                          <li
                            onClick={() => {
                              onChange(itemTitle, category);

                              setIsOpened(false);
                            }}
                            key={key}
                            className="flex items-center h-10"
                          >
                            <button className="flex justify-between outline-none w-full">
                              <span className="block truncate text-xs md:text-xs">
                                {itemTitle}
                              </span>
                              <span className="block rounded-full h-4 w-4 border-1 border-solid border-separator-blue" />
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              ))
            : options
                ?.filter((item) => item.id !== excludeId)
                .map((item, key) => {
                  const itemTitle = item.title || item.label;

                  return (
                    <li
                      onClick={() => {
                        onChange(item.label, itemTitle);

                        setIsOpened(false);
                      }}
                      key={key}
                      className="flex items-center h-10"
                    >
                      <button className="flex justify-between outline-none w-full">
                        <span className="block truncate text-xs md:text-xs">
                          {itemTitle}
                        </span>
                        {(valueTitle || value) === itemTitle ? (
                          <span className="flex rounded-full h-4 w-4 items-center justify-center bg-button-primary">
                            <TickSvg />
                          </span>
                        ) : (
                          <span className="block rounded-full h-4 w-4 border-1 border-solid border-separator-blue" />
                        )}
                      </button>
                    </li>
                  );
                })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
