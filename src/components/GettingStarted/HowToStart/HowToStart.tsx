import React from "react";
import Link from "next/link";
import { PenSvg } from "../../CommonSvg";
import { DayTradersSvg, LongTradersSvg, SwingTradersSvg } from "./Svgs";

import dayImg from "../../../../public/gettingStarted/dayTradersImg.png";
import swingImg from "../../../../public/gettingStarted/swingTradersImg.png";
import {
  CannotFindBox,
  HeadSection,
  TextWithImageSection,
  WarningBox,
} from "../common/components";

const description =
  "The most significant decision one can make as a trader is to define the timeframe that suits your mindset.\n" +
  "Are you an individual who wishes to look at charts for 12 hrs a day and make multiple trades within small ranges (scalping)? Or, are you comfortable looking at charts for focused analysis but infrequently, trading crosses at 4 hour intervals, and daily timeframes and making a few large trades a month?  Dash 2 Trade is built to support all types of traders, and we’ll even help you define which type you are with our tailored onboarding process.";

const daySectionText = `For day traders, the D2T platform ensures they have both the data and the framework to increase their chance of success. By showing day traders nonstandard patterns, they can be alerted before the majority is aware and they can therefore make prescient trades.

Being a day trader means you are comfortable being fully immersed in the market. Day trading is a particular disposition where you are looking for low time frame patterns and relative behaviour between assets. Utilising methods such as relative strength indices to show potential price movements in the near future whilst understanding the typical price action of your target assets will provide you with a sufficient edge to profit.

Dash 2 Trade helps day traders by allowing them to interact with their peers who share the same approach to the market. Having access to the wisdom of the crowd can provide these rapid trading specialists with an additional edge. `;

const swingSectionText =
  "The swing trader attempts to profit from short- to medium-term changes in the market according to a perceived opportunity apparent in underlying trends or indicators. Swing traders should have a set of guiding principles for decisions in the market. It is critical to understand why the prices move in a certain direction over the course of a medium term time frame. These guiding principles could be based on any of a number of factors or indicators. D2T provides swing traders with the metrics, insights and tools that allows them to build a framework to increase the chance of profitability when making these types of trades.";
const longerTermSectionText = `Longer term holders take positions and hold them from weeks to months, or even years. The long term holder needs to know where the market is in the macro cycle of major highs and lows.

The tools required to make successful long term trades can be similar to those used by the day trader or swing trader tools, though with time frames extending out weeks to months.

Dash 2 Trade offers longer-term holders specialized social indicators along with powerful oscillators that help determine when the market is at a significant high or low point. Combining the social indicators with the pre-scripted technical indicators gives longer-term holders a much easier toolkit for making profitable entries and exits based on the valleys and peaks of the crypto market.`;

const dayId = "day-traders";
const swingId = "swing-traders";
const longId = "longer-term-holders";

const ButtonLink = ({ href, icon, text, className }) => (
  <Link href={`#${href}`}>
    <div
      className={`max-w-[20rem] w-1/3 min-h-[14rem]
      px-2 py-8
      rounded-3xl
      flex justify-center items-center flex-wrap self-start gap-8
      text-center text-text-primary-dark ${className}`}
    >
      <div className="max-h-max my-auto flex gap-8 flex-wrap">
        <div className="w-full">{icon}</div>
        <span className="w-full">{text}</span>
      </div>
    </div>
  </Link>
);

const HowToStart = () => (
  <div
    className="text-text-primary dark:text-text-primary-dark flex flex-col
  gap-10 md:gap-[5.3rem]
  "
  >
    <HeadSection
      title="What type of trader are you?"
      headText="How to Start"
      description={description}
      child={
        <button
          className="flex items-center justify-center gap-3
          bg-button-primary-highlight py-4 px-6 rounded text-text-primary-dark"
        >
          Take Questionnaire <PenSvg w="1.25rem" h="1.25rem" />
        </button>
      }
    />

    <nav className="flex gap-4 md:gap-8 justify-center">
      <ButtonLink
        href={dayId}
        icon={<DayTradersSvg />}
        text="Day Traders"
        className="bg-[#5F00A9]"
      />
      <ButtonLink
        href={swingId}
        icon={<SwingTradersSvg />}
        text="Swing Traders"
        className="bg-[#9B37FF]"
      />
      <ButtonLink
        href={longId}
        icon={<LongTradersSvg />}
        text="Long-Term Holders"
        className="bg-[#DC79FF]"
      />
    </nav>
    <TextWithImageSection
      hId={dayId}
      title="Day Traders"
      text={daySectionText}
      image={dayImg}
    />
    <TextWithImageSection
      hId={swingId}
      title="Swing Traders"
      text={swingSectionText}
      image={swingImg}
      className="flex-row-reverse gap-[7rem]"
    />
    <WarningBox />
    <TextWithImageSection
      hId={longId}
      title="Longer Term Holders"
      text={longerTermSectionText}
    />

    <CannotFindBox />
  </div>
);
export default HowToStart;
