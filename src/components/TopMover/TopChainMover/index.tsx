import { useEffect, useState } from "react";
import axios from "axios";

import { useAppSelector } from "../../../redux/hooks";

import TopMoverItem from "../TopMoverItem";

interface IGainer {
  symbol: string;
  close_price: string | number;
  change: any;
  data: any;
}

interface IData {
  gainers: IGainer[];
}

const TopChainMover = () => {
  const [data, setData] = useState<IData>({ gainers: [] });

  const selectedChain = useAppSelector((state) => state.chain.selectedChain);
  const selectedNetwork = useAppSelector(
    (state) => state.chain.selectedNetwork
  );

  const loadTopMovers = async () => {
    try {
      const response = await axios.get(
        `api/backend/chains/top_changers/${selectedChain?.label}?network=${selectedNetwork?.label}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedNetwork && selectedChain) {
      loadTopMovers();
    }
  }, [selectedNetwork, selectedChain]);

  return (
    <div className="w-full">
      <p className="text-lg mb-2 ml-4">Top Movers</p>
      <div className="flex gap-[12px] overflow-x-scroll pb-2">
        {data?.gainers?.length
          ? data.gainers.map((item, index) => (
              <TopMoverItem
                key={index}
                quantity={item.close_price}
                shortName={item.symbol}
                change={item.change}
                data={item.data}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default TopChainMover;
