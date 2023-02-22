import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils";

import Card from "../common/Card";
import { TokenChartSvg } from "../CommonSvg";

const LivePrice = () => {
  const [livePrice, setLivePrice] = useState([]);

  useEffect(() => {
    setLivePrice([
      { id: 1, token: "BTC", value: 17448.58, change: 2.82 },
      { id: 2, token: "ETH", value: 1288.03, change: 2.69 },
      { id: 3, token: "SOL", value: 13.31, change: -2.82 },
    ]);
  }, []);

  return (
    <Card
      title="Live Price"
      icon={<TokenChartSvg />}
      hasBorder
      classes="h-full flex flex-col gap-y-3"
    >
      {livePrice.map((item) => {
        const isIncreasing = item.change > 0;
        const isDecreasing = item.change < 0;
        const isNeutral = item.change === 0;

        return (
          <div
            key={item.id}
            className="grid grid-cols-2 justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <div>
                <img alt={item.token} src="/token.png" />
              </div>
              <span className="text-xs">{item.token}</span>
            </div>

            <div className="grid grid-cols-[1fr_0.5fr] text-right gap-3 items-center">
              <span className="text-xs">{formatPrice(item.value)} USDT</span>
              <span
                className={`py-1.5 px-3 rounded text-xs ${
                  isIncreasing && "bg-green text-background-dark"
                } ${isDecreasing && "bg-red text-white"} ${
                  isNeutral &&
                  "text-text-secondary dark:text-text-secondary-dark"
                }`}
              >
                {isIncreasing && "+"}
                {item.change}%
              </span>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default LivePrice;
