import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { UsersSvg } from "../CommonSvg";
import Timer from "./Timer";

import Modal from "./ContestModalWrapper";

import image1 from "../../../public/contests/1.png";
import image2 from "../../../public/contests/2.png";
import image3 from "../../../public/contests/3.png";

const ItemData = ({
  openJion,
  openView,
}: {
  openJion: () => void;
  openView: () => void;
}): JSX.Element => {
  return (
    <div className="rounded-2xl bg-white dark:bg-foreground-dark border-1 border-primary font-normal overflow-hidden">
      <div className="w-full relative">
        <img className="w-full" src="/contests/contest.png" alt="contest" />
        {/*<Image
          src="/contests/contest.png"
          alt="contest"
          width="100%"
          height="auto"
        />*/}
        <div
          className="absolute top-0 right-0 bottom-0 left-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 24, 33, 1) 100%)",
          }}
        />
      </div>
      <div className="p-7 pt-0 relative -top-4">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-1.5xl font-medium">
            Fluffiest Trading Contest Ever
          </h3>
          <div className="bg-gray-600 dark:bg-grey-dark p-2.5 rounded text-2sm flex flex-nowrap">
            <UsersSvg />
            <span className="ml-4">1725/5000</span>
          </div>
        </div>
        <div className="mb-8">
          <div className="text-2sm text-grey-light mb-1">Awards</div>
          <div className="text-lg tracking-wide leading-6">
            3,750 USDT + 20 NFT
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div>
            <div className="text-2sm text-grey-light mb-1">Start</div>
            <div className="text-lg tracking-wide leading-6">
              <span>20 Nov, 2022</span>
              <br />
              <span>00:00:00</span>
            </div>
          </div>
          <div>
            <div className="text-2sm text-grey-light mb-1">End</div>
            <div className="text-lg tracking-wide leading-6">
              <span>01 Dec, 2022</span>
              <br />
              <span> 00:00:00</span>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="text-2sm text-grey-light mb-1">Contest ends in</div>
          <Timer />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="font-semibold leading-5 text-white bg-button-primary rounded py-4"
            onClick={openJion}
          >
            Join
          </button>
          <button
            className="font-semibold leading-5 dark:text-white border-1 rounded py-4"
            onClick={openView}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const CardItemModalWrap = ({ children, onClose }) => {
  const handleClose = () => {};

  return (
    <div className="rounded-3xl bg-white dark:bg-foreground-dark border-1 border-cookie-consent-b font-normal overflow-hidden max-w-[44rem]">
      <div className="w-full relative">
        <img
          className="w-full"
          src="/contests/contest_detail.png"
          alt="contest"
        />
        <div
          className="absolute top-0 right-0 bottom-0 left-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 24, 33, 1) 100%)",
          }}
        />
      </div>
      <div className="pb-16 relative max-w-[31rem] text-center mx-auto">
        <h3 className="dark:text-white text-3xl mb-8">
          Join the Fluffiest Trading Contest Ever
        </h3>
        {children}

        <div className="grid grid-cols-2 gap-4 mt-16">
          <button
            type="button"
            onClick={onClose}
            className="font-semibold leading-5 dark:text-white border-1 border-button-primary rounded py-4"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="font-semibold leading-5 text-white bg-button-primary rounded py-4"
          >
            I want to join
          </button>
        </div>
      </div>
    </div>
  );
};

const CardItem = (): JSX.Element => {
  const modalRef = useRef(null);
  const modalViewRef = useRef(null);

  const handleOpenJoinClick = () => modalRef.current?.openModal();
  const handleCloseJoinClick = () => modalRef.current?.closeModal();

  const handleOpenViewClick = () => modalViewRef.current?.openModal();
  const handleCloseViewClick = () => modalViewRef.current?.closeModal();

  return (
    <>
      <ItemData openJion={handleOpenJoinClick} openView={handleOpenViewClick} />
      <Modal ref={modalRef}>
        <CardItemModalWrap onClose={handleCloseJoinClick}>
          <div className="text-grey-light text-2sm">
            You are about to participate in the trading Contest. Virtual funds
            are provided for all Contest participants. No real funds are
            required to join. The winners will be determined based on the
            maximum returns for the period of the contest.
          </div>

          <div className="flex flex-wrap justify-between my-16">
            <div>
              <div className="relative w-[5.4rem] h-[4.7rem] mx-auto">
                <Image src={image1} alt="contest" layout="fill" />
              </div>
              <div className="dark:text-white text-xl mt-4 mb-2">1200 USDT</div>
              <div className="text-2sm bg-grey-dark text-white px-2 py-1 rounded inline-block">
                + NFT
              </div>
            </div>
            <div>
              <div className="relative w-[5.4rem] h-[4.7rem] mx-auto">
                <Image src={image2} alt="contest" layout="fill" />
              </div>
              <div className="dark:text-white text-xl mt-4 mb-2">700 USDT</div>
              <div className="text-2sm bg-grey-dark text-white px-2 py-1 rounded inline-block">
                + NFT
              </div>
            </div>
            <div>
              <div className="relative w-[5.4rem] h-[4.7rem] mx-auto">
                <Image src={image3} alt="contest" layout="fill" />
              </div>
              <div className="dark:text-white text-xl mt-4 mb-2">500 USDT</div>
              <div className="text-2sm bg-grey-dark text-white px-2 py-1 rounded inline-block">
                + NFT
              </div>
            </div>
          </div>

          <Link href="">
            <a className="underline dark:text-white text-2sm">See all prizes</a>
          </Link>
        </CardItemModalWrap>
      </Modal>
      <Modal ref={modalViewRef}>
        <CardItemModalWrap onClose={handleCloseViewClick}>
          View
        </CardItemModalWrap>
      </Modal>
    </>
  );
};

export default CardItem;
