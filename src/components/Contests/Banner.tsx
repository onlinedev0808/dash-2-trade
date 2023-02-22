import React from "react";
import Image from "next/image";

import logo from "../../../public/contests/contest_banner.png";

const Banner = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <div
      className="w-full rounded-3xl py-8 px-6 md:py-12 md:px-16 mt-10"
      style={{
        boxShadow:
          "inset -2px -3px 4px rgba(123, 168, 255, 0.17), inset 0px 4px 4px rgba(255, 255, 255, 0.25)",
        background:
          "linear-gradient(146.62deg, rgba(83, 103, 254, 0.2) 4.32%, rgba(5, 9, 40, 0.2) 76.47%), rgba(83, 103, 254, 0.06)",
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="font-medium text-xl md:text-3xl">
            Join Contest & Win $$!
          </h2>
          <p className="text-[#7A7F93] text-sm md:text-lg mt-2.5">
            Free virtual funds are provided to all participants
          </p>
        </div>
        <div className="flex justify-center  md:items-center mt-8 md:mt-0 relative">
          <div className="hidden xl:inline-block absolute left-0 -translate-x-[90%] w-[26rem] h-[10.8rem]">
            <Image src={logo} alt="contest" layout="fill" />
          </div>

          <button
            onClick={onClick}
            className="text-lg font-semibold leading-5 text-white bg-button-primary
                px-8 py-4 rounded hover:bg-highlight-button-primary relative"
          >
            What is Contest?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
