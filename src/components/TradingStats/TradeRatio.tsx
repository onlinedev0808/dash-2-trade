import React, { useEffect, useState } from "react";

import Card from "../common/Card";
import { VolumeSvg } from "../CommonSvg";
import PriceRange from "../PricesRange";

const TradeRatio = () => {
  const [tradeRatio, setTradeRatio] = useState({
    current: 0,
    max: 1000,
    negative: 0,
    positive: 0,
  });

  useEffect(() => {
    setTradeRatio({ current: 2000, max: 3000, negative: 0, positive: 0 });
  }, []);

  const positivePercent = ((tradeRatio.current * 100) / tradeRatio.max).toFixed(
    2
  );
  const negativePercent = 100 - +positivePercent;

  return (
    <Card title="Trade Ratio" icon={<VolumeSvg />} hasBorder classes="h-full">
      <div>
        <div className="flex justify-between">
          <div>
            <h6 className="text-3xl">{positivePercent}%</h6>
            <span className="text-sm text-green">
              {tradeRatio.positive} Positive
            </span>
          </div>
          <div>
            <h6 className="text-3xl">{negativePercent}%</h6>
            <span className="text-sm text-red">
              {tradeRatio.negative} Negative
            </span>
          </div>
        </div>

        <div className="overflow-hidden w-full h-[100%] flex items-end">
          <PriceRange
            current={tradeRatio.current}
            max={tradeRatio.max}
            hideDetails
            variant="large"
          />
        </div>
      </div>
    </Card>
  );
};

export default TradeRatio;
