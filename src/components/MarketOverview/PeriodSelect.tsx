/* eslint-disable @typescript-eslint/no-shadow */
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useEffect, Fragment } from "react";

const PeriodSelect = ({ selectedPeriod, setSelectedPeriod, periods }) => {
  useEffect(() => {
    setSelectedPeriod(periods[0]);
  }, [setSelectedPeriod, periods]);

  return (
    <div className="z-[1]">
      <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-36 cursor-default rounded bg-button-primary md:py-2 py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-white">
              {selectedPeriod.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-36 overflow-auto rounded-md bg-[#a0abff] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {periods.map((period, periodIdx) => (
                <Listbox.Option
                  key={periodIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none md:py-2 py-1 pl-10 pr-4 ${
                      active
                        ? "bg-button-primary text-slate-200"
                        : "text-gray-900"
                    }`
                  }
                  value={period}
                >
                  {({ selectedPeriod }: any) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedPeriod ? "font-medium" : "font-normal"
                        }`}
                      >
                        {period.name}
                      </span>
                      {selectedPeriod ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default PeriodSelect;
