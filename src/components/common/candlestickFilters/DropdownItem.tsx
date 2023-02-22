/* eslint-disable no-nested-ternary */
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import useDetectOutsideClick from "../../../hooks/useDetectOutsideClick";
import DropdownOption from "./DropdownOption";

interface IOption {
  name: string;
  value: string;
  isSelected?: boolean;
  isDefault?: boolean;
  hasCustomValue?: boolean;
  placeholder?: string;
  params?: { name: string; value: string }[];
}
interface IDropdownItemProps {
  selectedItem?: IOption;
  setSelectedItem?: (value: IOption) => void;
  items: IOption[];
  setItems?: (value: IOption[]) => void;
  title: string;
  subTitle?: string;
  hasCustomValue?: boolean;
  customValue?: string;
  onChangeCustomValue?: (value: string) => void;
  isMultiple?: boolean;
}

const DropdownItem: NextPage<IDropdownItemProps> = ({
  selectedItem,
  setSelectedItem,
  items,
  setItems,
  title,
  subTitle,
  hasCustomValue,
  customValue,
  onChangeCustomValue,
  isMultiple,
}) => {
  const [value, setValue] = useState(customValue);
  const [chosenItems, setChosenItems] = useState("");

  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    if (isMultiple) return;
    setSelectedItem(items[0]);
  }, [setSelectedItem, items]);

  useEffect(() => {
    if (!isMultiple) return;

    const selectedItems = items.filter((item) => item.isSelected);
    const selectedItemsNames = selectedItems.map((item) => item.name);
    setChosenItems(selectedItemsNames.join(", "));
  }, [items]);

  return (
    <div className="h-[3.75rem] z-[1] relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpened(!isOpened)}
        className="h-full py-1 flex flex-col justify-around relative min-w-fit w-20 cursor-pointer rounded px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-xs"
      >
        <h6 className="text-text-secondary dark:text-text-secondary-dark text-xs ">
          {title}
        </h6>
        <div className="flex align-center gap-x-2 border-t-solid border-t-1 border-border-primary pt-1 w-full">
          <span className="block truncate text-text-primary dark:text-text-primary-dark text-xs grow max-w-[4.375rem]">
            {isMultiple
              ? chosenItems || "None"
              : hasCustomValue && customValue
              ? customValue
              : selectedItem.name}
          </span>

          <div className="self-center h-[0.5vh] w-[0.5rem] bg-transparent border-l-[0.5vh] border-l-transparent border-t-[0.7vh] border-t-[#9a98a5] border-t-solid border-r-[0.5vh] border-r-transparent" />
        </div>
      </button>

      {isOpened && (
        <ul className="absolute max-h-80 mt-[-0.25rem] left-3 w-max px-3 overflow-auto rounded-md bg-highlight dark:bg-highlight-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs border-[#31313a] border-solid border-1">
          {subTitle && (
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark h-6 pt-1">
              {subTitle}
            </p>
          )}
          {items.map((period, periodIdx) => (
            <li
              key={periodIdx}
              className="relative cursor-pointer select-none hover:text-button-primary text-text-primary dark:text-text-primary-dark"
            >
              <DropdownOption
                setSelectedItem={setSelectedItem}
                items={items}
                setItems={setItems}
                isMultiple={isMultiple}
                option={period}
              />
            </li>
          ))}
          {hasCustomValue && (
            <>
              <hr className="w-full border-border-primary" />
              <li className="py-3 grid grid-cols-[60%_30%] justify-between">
                <input
                  className="md:py-2 py-1 px-3 outline-none rounded bg-foreground dark:bg-foreground-dark"
                  placeholder="1000 Days"
                  type="text"
                  value={value}
                  name="value"
                  onChange={(e) => {
                    e.stopPropagation();
                    setValue(e.target.value);
                  }}
                />
                <button
                  className="rounded md:p-2 p-1 border-border-primary border-solid border-1"
                  type="button"
                  onClick={() => {
                    onChangeCustomValue(value);
                  }}
                >
                  Apply
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownItem;
