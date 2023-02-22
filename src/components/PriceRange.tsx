import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

import { debounce, formatNumber } from "../utils";

/*
min: The minimum price over the interval
max: The maximum price over the interval
current: The current price
*/

interface IPriceRangeProps {
  min: number;
  max: number;
  current: number;
}

const PriceRange: NextPage<IPriceRangeProps> = ({ min, max, current }) => {
  const [normalized, setNormalized] = useState(0.8);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef: any = useRef();

  const getSliderWidth = () => {
    setSliderWidth(sliderRef.current?.offsetWidth);
  };

  useEffect(() => {
    setNormalized((current - min) / (max - min));
  }, [min, max, current]);

  useEffect(() => {
    setSliderWidth(sliderRef.current?.offsetWidth);
    window.addEventListener("resize", debounce(getSliderWidth, 150));

    return () =>
      window.removeEventListener("resize", debounce(getSliderWidth, 150));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row text-text-secondary dark:text-text-secondary-dark w-full justify-between mb-2 text-sm">
        <p>${formatNumber(min)}</p>
        <p>-</p>
        <p>${formatNumber(max)}</p>
      </div>
      <div
        ref={sliderRef}
        className="w-[80%] flex flex-row relative items-center justify-center"
      >
        <div className="w-[80%] lg:h-[0.23vw] h-[2.58px] bg-red rounded-l-lg" />
        <div className="w-[20%] lg:h-[0.23vw] h-[2.58px] bg-green rounded-r-lg" />
        <div
          style={{ left: `${sliderWidth * normalized}px` }}
          className="lg:w-[0.65vw] w-[8px] lg:h-[0.65vw] h-[8px] bg-white rounded-full absolute lg:top-[-0.21vw] top-[-3px]"
        />
      </div>
    </div>
  );
};

export default PriceRange;
