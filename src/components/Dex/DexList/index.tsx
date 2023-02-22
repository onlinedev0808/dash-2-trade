/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { v4 as uuidv4 } from "uuid";
import CardWrapper from "../../common/Wrapper";

import DexItem from "../DexItem";

interface IActiveDex {
  name: string;
  id: string;
  image?: string;
}

const DUMMY_DATA = [
  { name: "Uniswap V3", id: "uniswap", image: "/dex/uniswap.png" },
  { name: "Curve", id: "curve", image: "/dex/curve.svg" },
  { name: "QuickSwap", id: "quickswap", image: "/dex/quickswap.png" },
  { name: "PancakeSwap", id: "pancakeswap", image: "/dex/pancakeswap.png" },
  { name: "Balancer", id: "balancer", image: "/dex/balancer-amm.svg" },
  { name: "DODO", id: "dodo", image: "/dex/amm-dodo.svg" },
  { name: "Uniswap V2", id: "uniswap_v2", image: "/dex/amm-uniswap_v2.webp" },
  { name: "SushiSwap", id: "sushiswap", image: "/dex/sushiswap.svg" },
  { name: "Biswap", id: "biswap", image: "/dex/biswap.svg" },
  { name: "Platypus", id: "platypus", image: "/dex/platypus-amm.svg" },
];

const DexList = ({
  onChange,
}: {
  onChange: (activeDex: IActiveDex) => void;
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IActiveDex>>([]);
  const [active, setActive] = useState<IActiveDex>();

  //const ref = useRef<HTMLDivElement>();
  //const { events } = useDraggable(ref);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const defaultData = [...DUMMY_DATA];

      defaultData.unshift({ name: "All DEXes", id: "all", image: null });
      setData(defaultData);
      setActive(defaultData.at(0));
    } catch (error) {
      setData([]);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClock = (id) => {
    const dexActive = data.find((item) => item.id === id);
    onChange(dexActive);
    setActive(dexActive);
  };

  const activeStyle = { borderBottom: "1px solid #333438", fontWeight: "bold" };

  if (isLoading) return;

  return (
    <CardWrapper>
      <ul className="list-none flex flex-row items-center flex-wrap gap-[inherit]">
        {data.map((item) => (
          <li
            key={uuidv4()}
            className="flex border-b border-transparent"
            style={item.id === active.id ? activeStyle : {}}
          >
            <DexItem
              name={item.name}
              id={item.id}
              img={item.image}
              onClick={handleClock}
            />
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
};

export default DexList;
