/* eslint-disable react/jsx-no-bind */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddWatchlistDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async () => {
    try {
      if (!name) return;

      await axios.delete("/api/watchlist", {
        data: { id: 1, address: "0x69" },
      });
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-base leading-[19.2px] text-white bg-button-primary px-[15px] py-[10px] rounded-[4px] hover:bg-highlight-button-primary flex items-center"
      >
        Creat a Watchlist
        <FontAwesomeIcon icon={faEye} className="w-3 ml-[20px]" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full w-[356px] transform overflow-hidden rounded-[16px] bg-[#383838] p-6 text-left align-middle shadow-xl transition-all text-white">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-[120%] flex justify-between"
                  >
                    Create A Watchlist
                    <div
                      className="w-[24px] h-[24px] bg-white flex justify-center cursor-pointer"
                      onClick={closeModal}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="w-[16px] text-[#586870]"
                      />
                    </div>
                  </Dialog.Title>
                  <div className="mt-[40px]">
                    <p className="text-sm leading-1">Name *</p>
                  </div>

                  <div className="mt-[2px] pr-[24px] mb-[16px]">
                    <input
                      type="text"
                      className="w-[100%] rounded-[8px] border-[0.5px] border-[#C0C6C9] p-[10px] outline-0 text-sm leading-1 text-black"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <div className="flex justify-end">
                      <button
                        className="mt-[22px] text-sm leading-[18px] px-[20px] py-[8px] bg-[#5366FF] hover:bg-highlight-button-primary rounded-[5px]"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
