/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import { NextPage } from "next";
import { MenuItemArrow } from "../../CommonSvg";
import { PresalesCols } from "./config";

interface ISelectBoxProps {
  options: { label: string; sort: string }[];
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
  onChange?: (sort: string, desk: boolean) => void;
  value: {
    sort: string;
    desc: boolean;
  };
  label?: any;
}

const defaultButtonStyles =
  "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]";

const SortByFilter: NextPage<ISelectBoxProps> = ({
  options,
  onChange,
  value,
  label,
  style,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const activeOption = options?.find((option) => option.sort === value?.sort);

  const filterText =
    value?.sort === "all"
      ? label ?? "Sorted by"
      : `Sorted by ${activeOption?.label} ${value?.desc ? "DESC" : "ASC"}`;

  const handleClick = (item) => {
    const sort = value?.sort === item.sort ? !value.desc : true;

    if (item.sort === "all") {
      onChange(PresalesCols.Score, true);
    } else {
      onChange(item.sort, sort);
    }
  };

  return (
    <>
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

      <ul
        className={`transition-all ease-in-out duration-300 ${
          isOpened ? "max-h-screen" : "max-h-0"
        } overflow-hidden h-auto`}
      >
        {options?.map((option) => (
          <li
            className={`${
              style?.option?.default ||
              "relative hover:cursor-pointer hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark "
            } ${
              !style?.button.default
                ? "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]"
                : style.button.default
            }`}
            onClick={handleClick.bind(null, option)}
            key={option.sort}
          >
            <button className="flex gap-3 outline-none w-full">
              <span className="block truncate text-xs md:text-sm">
                {option.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SortByFilter;
