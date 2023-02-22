/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import { NextPage } from "next";
import { MenuItemArrow } from "../../CommonSvg";

interface ISelectBoxProps {
  options: { label: string; logo?: string; value?: string | number }[];
  style?: {
    button?: {
      default?: string;
      valueSelected?: string;
    };
    list?: string;
    option?: {
      default?: string;
      active?: string;
      selected?: string;
    };
  };
  onChange?: (option: any) => void;
  value?: any;
  label?: any;
  hasLogos?: boolean;
  isExpandable?: boolean;
}

const defaultButtonStyles =
  "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]";

const ChainFilter: NextPage<ISelectBoxProps> = ({
  options,
  onChange,
  value,
  style,
  hasLogos = false,
  isExpandable = false,
}) => {
  const [isOpened, setIsOpened] = useState(!isExpandable);

  const filterText = value === "All" ? "Chain" : `Filter by ${value}`;

  return (
    <>
      {isExpandable && (
        <button
          onClick={() => setIsOpened(!isOpened)}
          className={`flex justify-between relative ${
            style?.button?.default ?? defaultButtonStyles
          } `}
        >
          {filterText}
          <div
            className={`transition duration-250 ease-in-out ${
              isOpened ? "rotate-90" : ""
            }`}
          >
            <MenuItemArrow />
          </div>
        </button>
      )}

      <ul
        className={`transition-all ease-in-out duration-300 ${
          isOpened ? "max-h-[12.8rem]" : "max-h-0"
        } overflow-y-scroll h-auto`}
      >
        {options?.map(({ label, logo }, key) => (
          <li
            className={`${
              style?.option?.default ||
              "relative hover:cursor-pointer hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark "
            } ${
              !style?.button.default
                ? "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]"
                : style?.button.default
            }`}
            onClick={() => {
              onChange(label);
            }}
            key={key}
          >
            <button className="flex gap-3 outline-none w-full">
              {hasLogos && (
                <div className="h-5 w-5">
                  {logo && <img src={logo} alt={label} className="h-5 w-5" />}
                </div>
              )}

              <span className="block truncate text-xs md:text-sm">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChainFilter;
