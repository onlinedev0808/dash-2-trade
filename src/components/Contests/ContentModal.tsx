import React, { useRef, useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import Card from "../common/Card";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./Swiper.module.scss";
import STEP_1 from "../../../public/contests/step-1.png";
import STEP_2 from "../../../public/contests/step-2.png";

const DESCRIPTION_ITEMS = [
  {
    title: "Welcome to Dash2Trade Contests!",
    img: STEP_1,
    info: (
      <p>
        Trade the global markets and test your trading skills in a simulated
        environment -{" "}
        <span className="text-primary dark:text-white">
          with no money at risk.
        </span>{" "}
        Join to compete with other traders from around the world, climb the
        leaderboards and win prizes!
      </p>
    ),
  },
  {
    title: "How it works",
    img: STEP_2,
    info: (
      <p>
        After joining the Contest, all traders are provided with{" "}
        <span className="text-primary dark:text-white">virtual funds.</span>
        Participants compete against each other by trading global markets such
        as{" "}
        <span className="text-primary dark:text-white">
          Crypto, Commodities, Forex,
        </span>{" "}
        and can monitor their progress on the leaderboards. The higher your
        returns - the higher your ranking will be!
      </p>
    ),
  },
  {
    title: "Trade, win and get real prizes!",
    img: STEP_2,
    info: (
      <p>
        The total trading performance (%ROI) is what matters in every Contest.
        Top traders who achieve the highest returns will receive prizes. It’s
        easy to get started - simply join one of the active Contests, and show
        your skills to the world! Good luck in trading!
      </p>
    ),
    statistic: ["1", "RICH1", "+140,11%", "+43,36%", "+43,36%", "+43,36%"],
  },
];

const Badge = ({ data }): JSX.Element => {
  const getClass = (index) => {
    let className;
    switch (index) {
      case 0:
      case 1:
        className = "text-violet";
        break;
      case 2:
      case 3:
        className = "text-green";
        break;
      default:
        className = "text-white";
        break;
    }
    return className;
  };
  return (
    <div className="absolute top-[20%] right-[50%] translate-x-[50%] flex p-5 flex-nowrap justify-between rounded-xl bg-badge gap-6 text-lg text-white">
      {data.map((item, index) => (
        <span className={getClass(index)}>{item}</span>
      ))}
    </div>
  );
};

const Item = ({
  title,
  img,
  info,
  statistic = null,
}: {
  title: string;
  img: any;
  info: React.ReactNode;
  statistic?: string[];
}) => {
  return (
    <div className="text-grey-light font-medium px-8">
      <div className="text-center text-2xl">{title}</div>
      <div className="relative">
        <div className="mt-5 mb-5 md:mt-10 md:mb-10 mx-auto w-[80%] lg:max-w-[26.6rem] relative">
          <Image src={img} alt="step1" />
        </div>
        {statistic ? <Badge data={statistic} /> : null}
      </div>
      <div className="text-lg tracking-wide text-center">{info}</div>
    </div>
  );
};

const ContentModal = ({ onClick }: { onClick: () => void }): JSX.Element => {
  const swiperRef = useRef(null);

  const [isEnd, seIsEnd] = useState(false);

  const handleClick = () => {
    if (isEnd) {
      onClick();
    } else {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <Card>
      <div className="w-[85vw] md:w-[65vw] md:max-w-[70rem] p-4 md:p-8">
        <div className="text-1.5xl font-medium mb-10 relative">
          <div>Dash2Trade Contests</div>
          <button className="absolute right-0 top-0" onClick={onClick}>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-[1.5rem] font-light text-grey-light"
            />
          </button>
        </div>
        <div className={`relative max-w-full ${styles.sliderWrapper}`}>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onReachEnd={() => seIsEnd(true)}
          >
            {DESCRIPTION_ITEMS.map((slide, key) => (
              <SwiperSlide key={key} className="w-full">
                <Item
                  title={slide.title}
                  img={slide.img}
                  info={slide.info}
                  statistic={slide.statistic ?? null}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="block mt-6 md:mt-12 text-lg font-semibold leading-5 text-white bg-button-primary
                px-8 py-4 rounded hover:bg-highlight-button-primary mx-auto"
        >
          {isEnd ? "Get Started" : "Continue"}
        </button>
      </div>
    </Card>
  );
};

export default ContentModal;
