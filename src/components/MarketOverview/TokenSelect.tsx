/* eslint-disable @typescript-eslint/no-shadow */
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Fragment, useEffect } from "react";
import { DropdownArrow } from "../CommonSvg";

const TokenSelect = ({ selectedToken, setSelectedToken, tokens }) => {
  useEffect(() => {
    setSelectedToken(tokens[0]);
  }, [setSelectedToken, tokens]);

  return (
    <div className="z-[2]">
      <Listbox value={selectedToken} onChange={setSelectedToken}>
        <div className="relative">
          <Listbox.Button className="h-[2.75rem] w-20 relative cursor-pointer rounded bg-button-primary md:py-2 py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-white">
              {selectedToken.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-white">
              <DropdownArrow />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-20 overflow-auto rounded-md bg-[#a0abff] py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {tokens.map((token, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none md:py-2 py-1 pl-3 pr-4 ${
                      active
                        ? "bg-button-primary text-slate-200"
                        : "text-gray-900"
                    }`
                  }
                  value={token}
                >
                  {({ selectedPeriod }: any) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedPeriod ? "font-medium" : "font-normal"
                        }`}
                      >
                        {token.name}
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

export default TokenSelect;
