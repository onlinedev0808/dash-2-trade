/* eslint-disable @typescript-eslint/no-shadow */
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function SelectBox({ options, onChange, value }) {
  const [selected, setSelected] = useState(options[0]);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  return (
    <Listbox
      value={selected}
      onChange={(newValue) => {
        if (onChange) {
          onChange(newValue);
        } else {
          setSelected(newValue);
        }
      }}
    >
      <div className="relative">
        <Listbox.Button className="relative bg-selector text-left text-white px-[8px] py-[4px] rounded-[5px] text-[8px] leading-[12px] w-[100px]">
          <span className="block truncate">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-3 w-3 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 bg-selector rounded-[5px] text-xs leading-[12px] w-[100px]">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative text-white px-[8px] py-[4px] rounded-[5px] hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark ${
                    active
                      ? "bg-hover-highlight dark:bg-hover-highlight-dark"
                      : ""
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
