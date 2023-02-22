import { useEffect, useState, useRef } from "react";

import { useDraggable } from "react-use-draggable-scroll";

import { DexSvg } from "../CommonSvg";

//import axios from "axios";

const DUMMY_DATA = [
  { name: "THE" },
  { name: "THE" },
  { name: "DC" },
  { name: "DIE" },
  { name: "RISU" },
  { name: "X" },
];

const LatestListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);

  const loadData = async () => {
    setIsLoading(true);

    try {
      setData(DUMMY_DATA);
    } catch (error) {
      setData([]);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-full flex flex-row items-top p-5 rounded-xl bg-highlight dark:bg-highlight-dark">
      <div className="w-[10%] text-base pr-8 min-w-[9.7rem] text-text-primary dark:text-text-primary-dark">
        Latest Listings
      </div>
      <div
        className="w-[90%] text-base flex flex-row justify-between items-center overflow-x-scroll scrollbar-hide cursor-grab"
        {...events}
        ref={ref}
      >
        {data.map((item, key, arr) => (
          <div
            key={key}
            className={`flex ${key + 1 === arr.length ? "pl-3" : "px-3"}`}
          >
            <span className="pr-2 text-text-primary dark:text-text-primary-dark">
              #{key + 1}
            </span>
            <span className="text-text-secondary dark:text-text-secondary-dark pr-2">
              WETH/
            </span>
            <span className="pr-2 text-text-primary dark:text-text-primary-dark">
              {item.name}
            </span>
            <DexSvg name="test" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListing;
