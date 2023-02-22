/* eslint-disable @typescript-eslint/no-shadow */
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";

interface ISelectBoxProps {
  options: { label: string; logo?: string }[];
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
  className?: string;
  onChange?: (option: any) => void;
  value?: any;
  label?: any;
  isChains?: boolean;
  isFilter?: boolean;
  hasLogos?: boolean;
}

const ignoredValue = "All";

const defaultButtonStyles =
  "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]";

const SelectBox: NextPage<ISelectBoxProps> = ({
  options,
  onChange,
  value,
  label,
  style,
  isChains,
  isFilter,
  hasLogos = false,
  className = "",
}) => {
  const [selected, setSelected] = useState({ label: "" });
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (options.length > 0 && isChains) {
      setSelected(options[0]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(options[0]);
    }
  }, [options]);

  useEffect(() => {
    if (!value) return;
    setSelected(value);

    if (label && value?.label && value?.label !== ignoredValue) {
      setPlaceholder(
        `${isFilter ? "Filter by " : ""}${label} — ${value?.label}`
      );
    } else if (label) {
      setPlaceholder(label);
    } else setPlaceholder(value?.label);
  }, [value]);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        if (onChange) {
          onChange(value);
        } else {
          setSelected(value);
        }
      }}
    >
      <div className={`relative ${className}`}>
        <Listbox.Button
          className={`relative ${
            style?.button?.default ?? defaultButtonStyles
          } ${
            selected?.label !== ignoredValue ? style?.button?.valueSelected : ""
          }`}
        >
          <span className="block truncate">{placeholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FontAwesomeIcon
              icon={faAngleDown}
              className="h-3 w-3 text-text-primary dark:text-text-primary-dark"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute z-10 translate-y-1 ${
              !style || !style.list
                ? "bg-highlight dark:bg-highlight-dark rounded"
                : style.list
            }`}
          >
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `${
                    style.option?.default ||
                    "relative hover:cursor-pointer hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark "
                  } ${
                    active
                      ? style.option?.active ||
                        "bg-highlight dark:bg-highlight-dark "
                      : " "
                  }${
                    !style?.button.default
                      ? "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]"
                      : style.button.default
                  }`
                }
                value={option}
              >
                {({ selected: isSelected }) => (
                  <div className="flex gap-3">
                    {hasLogos && (
                      <div className="h-5 w-5">
                        {option.logo && (
                          <img
                            src={option.logo}
                            alt={option.label}
                            className="h-5 w-5"
                          />
                        )}
                      </div>
                    )}

                    <span
                      className={`block truncate text-xs md:text-sm ${
                        isSelected
                          ? style.option?.selected || "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectBox;
