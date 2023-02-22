/* eslint-disable no-unsafe-optional-chaining */
import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

import { debounce, formatNumber } from "../../utils";

/*
min: The minimum price over the interval
max: The maximum price over the interval
current: The current price
*/

interface IPriceRangeProps {
  min?: number;
  max: number;
  current: number;
}

const PriceRange: NextPage<IPriceRangeProps> = ({ min = 0, max, current }) => {
  const [normalized, setNormalized] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const [translate, setTranslate] = useState(0);

  const sliderRef: any = useRef();

  const sliderText: any = useRef();

  const [grayAreaWidth, setGrayAreaWidth] = useState(0);

  const getSliderWidth = () => {
    setSliderWidth(sliderRef.current?.offsetWidth);
  };

  useEffect(() => {
    setNormalized((max - min) / (current - min));

    setGrayAreaWidth(((sliderWidth * normalized) / sliderWidth) * 100);
  }, [min, max, current, normalized, sliderWidth]);

  useEffect(() => {
    setSliderWidth(sliderRef.current?.offsetWidth);
    window.addEventListener("resize", debounce(getSliderWidth, 150));

    return () =>
      window.removeEventListener("resize", debounce(getSliderWidth, 150));
  }, []);

  useEffect(() => {
    if (max / current <= 0.1) {
      setTranslate(
        grayAreaWidth + sliderText?.current?.offsetWidth / 2 - grayAreaWidth
      );
      return;
    }

    if (grayAreaWidth < sliderText?.current?.offsetWidth) {
      setTranslate(sliderText?.current?.offsetWidth * (1 - max / current));
      return;
    }

    setTranslate(0);
  }, [sliderText, normalized, sliderWidth, grayAreaWidth, max, current]);

  return (
    <div className="flex flex-col items-center mt-12">
      <div
        ref={sliderRef}
        className="w-[100%] flex flex-row relative items-center justify-center"
      >
        <div
          style={{ left: `calc(100% - 0.35vh)` }}
          className="absolute bottom-[0.5rem] w-[100%]"
        >
          <div className="absolute lg:w-[0.65vw] w-[0.5rem] top-[-0.375rem] bg-transparent border-l-[0.5vh] border-l-transparent border-t-[0.7vh] border-t-green-700 border-r-[0.5vh] border-r-transparent">
            <span
              style={{
                transform: `translateX(calc(-100% + 0.35vh))`,
              }}
              className="absolute text-text-secondary dark:text-text-secondary-dark text-xs w-fit bottom-[0.375rem]"
            >
              {formatNumber(current)}&nbsp;USDC
            </span>
          </div>
        </div>

        <div className="h-[0.65vh] bg-transparent rounded-lg w-[100%] flex">
          <div
            style={{ width: `${grayAreaWidth}%` }}
            className="h-[0.65vh] bg-[#5C5C5C] rounded-lg"
          />
          <div
            style={{ width: `calc(100% - ${grayAreaWidth}%)` }}
            className="h-[0.65vh] bg-green rounded-lg"
          />
        </div>
      </div>
      <div
        style={{ width: `${grayAreaWidth}%` }}
        className="self-start relative flex text-text-primary dark:text-text-primary-dark w-full justify-center mt-[0.375rem] mb-2 h-[8px] border-solid border-1 border-text-secondary dark:border-text-secondary-dark border-t-transparent dark:border-t-transparent"
      >
        <p
          ref={sliderText}
          className="bg-primary text-xs absolute top-[-1px] leading-none px-[0.3rem]"
          style={{
            transform: `translateX(${translate}px)`,
          }}
        >
          {formatNumber(max - min)}&nbsp;USDC
        </p>
      </div>
    </div>
  );
};

export default PriceRange;
