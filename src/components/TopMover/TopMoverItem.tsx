import { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import TradingGraph from "./TradingGraph";

interface ITopMoverItemProps {
  quantity: any;
  data: any;
  shortName: any;
  change: any;
  longName?: any;
  active?: boolean;
}

const TopMoverItem: NextPage<ITopMoverItemProps> = ({
  quantity,
  data,
  shortName,
  change,
  longName,
}) => {
  const [prevPrice, setPrevPrice] = useState(quantity);
  // const [priceChange, setPricechange] = useState(false);
  const [priceColor, setPriceColor] = useState(
    "text-text-primary dark:text-text-primary-dark"
  );

  useEffect(() => {
    // setPricechange(prevPrice < quantity);
    if (prevPrice !== quantity) {
      setPriceColor(prevPrice < quantity ? "text-[#0f0]" : "text-[#f00]");
    }
    setTimeout(() => {
      setPriceColor("text-text-primary dark:text-text-primary-dark");
    }, 750);
    setPrevPrice(quantity);
  }, [quantity]);

  return (
    <Card classes="w-[18.75rem] h-[8.125rem] flex flex-col gap-0.5">
      <div className="flex items-center text-sm text-text-primary dark:text-text-primary-dark leading-1">
        {longName}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-sm leading-1 text-text-secondary dark:text-text-secondary-dark truncate w-[3.75rem]">
            {shortName}
          </div>
          <div className="flex mx-3.5">
            <div className="text-base text-button-primary mr-[-0.125rem] mb-1">
              {"<"}
            </div>
            <div className="text-base text-button-primary mt-1">{">"}</div>
          </div>
          <div className="text-sm leading-1 text-text-secondary dark:text-text-secondary-dark">
            USD
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`text-sm leading-3.5 ${
              change < 0 ? "text-red" : "text-green"
            }`}
          >
            {change > 0 ? "+" : ""}
            {(change * 100).toLocaleString("en-us", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            %
          </div>
        </div>
      </div>
      <div
        className={`text-base leading-5 ${priceColor} transition-colors duration-[750ms]`}
      >
        $
        {quantity.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })}
      </div>
      <div className="h-[2.5rem]">
        <TradingGraph
          data={[
            {
              data,
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default TopMoverItem;
