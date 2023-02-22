/* eslint-disable no-unsafe-optional-chaining */
import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { debounce, formatNumber } from "../../utils";
import OverlapPriceRange from "./OverlapPriceRange";

interface IPriceRangeProps {
  min?: number;
  max: number;
  current: number;
  hideDetails?: boolean;
  variant?: string;
}

const PriceRange: NextPage<IPriceRangeProps> = ({
  min = 0,
  max,
  current,
  hideDetails = false,
  variant = "small",
}) => {
  const [normalized, setNormalized] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderText = useRef<HTMLDivElement>(null);

  const [greenAreaWidth, setGreenAreaWidth] = useState(0);

  const [translate, setTranslate] = useState(0);

  const getSliderWidth = () => {
    setSliderWidth(sliderRef.current?.offsetWidth);
  };

  useEffect(() => {
    if (min < max) setNormalized((current - min) / (max - min));
    else setNormalized(current / max);

    setGreenAreaWidth(((sliderWidth * normalized) / sliderWidth) * 100);
  }, [min, max, current, normalized, sliderWidth]);

  useEffect(() => {
    setSliderWidth(sliderRef.current?.offsetWidth);
    window.addEventListener("resize", debounce(getSliderWidth, 150));

    return () =>
      window.removeEventListener("resize", debounce(getSliderWidth, 150));
  }, []);

  useEffect(() => {
    if (sliderWidth * normalized < sliderText?.current?.offsetWidth / 2) {
      setTranslate(sliderWidth * normalized);
      return;
    }

    if (
      sliderWidth - sliderWidth * normalized <
      sliderText?.current?.offsetWidth / 2
    ) {
      setTranslate(
        sliderText?.current?.offsetWidth -
          (sliderWidth - sliderWidth * normalized)
      );
      return;
    }

    setTranslate(sliderText?.current?.offsetWidth / 2);
  }, [sliderWidth, greenAreaWidth, sliderText, normalized]);

  if (current > max) {
    return <OverlapPriceRange max={max} current={current} />;
  }

  return (
    <div className="flex flex-col items-center mt-12 w-full">
      <div
        ref={sliderRef}
        className="w-[100%] flex flex-row relative items-center justify-center"
      >
        <div
          style={{ left: `calc(${sliderWidth * normalized}px - 0.35vh)` }}
          className="absolute bottom-[0.5rem] w-[100%] pb-2"
        >
          {!hideDetails && (
            <div
              className="text-text-secondary dark:text-text-secondary-dark text-xs w-fit px-1"
              ref={sliderText}
              style={{
                transform: `translateX(-${translate}px)`,
              }}
            >
              {formatNumber(current)}&nbsp;USDC
            </div>
          )}

          <div
            className={`absolute ${
              variant === "small" ? "bottom-0" : "bottom-1"
            }  flex items-center justify-center -translate-x-[20%]`}
          >
            <FontAwesomeIcon icon={faCaretDown} className="w-3 h-3" />
          </div>
        </div>

        <div
          className={`${
            variant === "small" ? "h-[0.65vh]" : "h-3"
          } bg-transparent rounded-lg w-[100%] flex`}
        >
          <div
            style={{ width: `${greenAreaWidth}%` }}
            className="h-full bg-green rounded-lg"
          />
          <div
            style={{ width: `calc(100% - ${greenAreaWidth}%)` }}
            className="h-full bg-red rounded-lg"
          />
        </div>
      </div>
      {!hideDetails && (
        <div className="relative flex text-text-secondary dark:text-text-secondary-dark w-full justify-center mt-[0.375rem] mb-2 h-[0.5rem] border-solid border-1 border-text-secondary dark:border-text-secondary-dark border-t-transparent dark:border-t-transparent">
          <p className="bg-foreground dark:bg-foreground-dark text-xs absolute top-[1px] leading-none px-[0.3rem]">
            {formatNumber(max - min)}&nbsp;USDC
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
