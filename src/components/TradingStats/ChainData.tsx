import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils";

import Card from "../common/Card";
import { TokenChartSvg } from "../CommonSvg";
import TableHistoryGraph from "../TokenTable/Table/TableHistoryGraph";

const ChainData = () => {
  const [chainData, setChainData] = useState({
    token: "",
    symbol: "",
    logo: "",
    price: 0,
    estimated_hash_rate: 0,
    transaction: 0,
    transaction_volume: 0,
    estimated_hash: 0,
  });

  useEffect(() => {
    setChainData({
      token: "Bitcoin",
      symbol: "BTC",
      logo: "",
      price: 17488.58,
      estimated_hash_rate: 238221,
      transaction: 238221,
      transaction_volume: 238221,
      estimated_hash: 238221,
    });
  }, []);

  return (
    <Card
      title="Chain Data"
      icon={<TokenChartSvg />}
      hasBorder
      classes="flex flex-col gap-y-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1 flex-col">
          <div className="flex gap-3 items-center">
            <img alt={chainData.token} src={chainData.logo || "/token.png"} />
            <span>{chainData.symbol}</span>
          </div>
          <span className="text-text-secondary dark:text-text-secondary-dark">
            {chainData.token}
          </span>
        </div>

        <div className="flex flex-col text-right">
          <span>{formatPrice(chainData.price)} USDT</span>
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Price
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[inherit]">
        <div className="flex flex-col">
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Estimated hash rate
          </span>
          <span>{formatPrice(chainData.estimated_hash_rate)} </span>
        </div>
        <div className="flex flex-col">
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Transaction (24hrs)
          </span>
          <span>{formatPrice(chainData.transaction)} </span>
        </div>
        <div className="flex flex-col">
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Transaction volume
          </span>
          <span>{formatPrice(chainData.transaction_volume)} </span>
        </div>
        <div className="flex flex-col">
          <span className="text-text-secondary dark:text-text-secondary-dark">
            Estimated hash (Est)
          </span>
          <span>{formatPrice(chainData.estimated_hash)} </span>
        </div>
      </div>
      <div>
        <span className="text-text-secondary dark:text-text-secondary-dark">
          Mempool Size (Bytes)
        </span>
        <div className="h-24">
          <TableHistoryGraph data={[{ data: [1000, 1013, 1025, 989] }]} />
        </div>
      </div>
    </Card>
  );
};

export default ChainData;
