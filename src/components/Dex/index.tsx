import React, { useEffect, useMemo, useState } from "react";

import DexList from "./DexList";
import SelectBox from "../common/SelectBox";
import DexTable from "./DexTable";

import {
  ID_LOGO,
  ID_REMAINING,
  ID_PAIR,
  ID_PRICE,
  ID_PRICE_CHANGE,
  ID_LIQUIDITY,
  ID_MARKET,
  ID_SOCIAL,
  ID_SINCE,
  ID_VARIATION,
  ID_CONTRACT,
} from "./configs";

const DEX_DUMMY = [
  {
    pair: ["NVT", "WBNB"],
    img: "/dex/bsc.png",
    //since: "1666972507",
    since: "2022-11-18T13:55:00",
    price: "19093",
    priceChange: "-0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 1000, max: 2000 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["Germany", "USDT"],
    img: "/dex/pancakeswap.png",
    since: "2022-11-18T13:45:00",
    price: "19093",
    priceChange: "-0.62",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "0.62",
      "1h": "-7.53",
      "6h": "-0.70",
      "24h": "-90.68",
    },
    liquidity: "67000",
    poolRemaining: { current: 500, max: 3000 },
    poolVariation: "0.002",
    marketCap: "2000000",
    contract: true,
  },
  {
    pair: ["Argentina", "WBNB"],
    img: "/dex/arbitrum.png",
    since: "2022-11-18T13:43:00",
    price: "19093",
    priceChange: "-0.18",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.01",
      "1h": "0.18",
      "6h": "0.14",
      "24h": "0.14",
    },
    liquidity: "67000",
    poolRemaining: { current: 800, max: 3400 },
    poolVariation: "-0.001",
    marketCap: "1050000",
    contract: false,
  },
  {
    pair: ["NVT", "WBNB"],
    img: "/dex/quickswap.png",
    since: "2022-11-18T13:42:00",
    price: "19093",
    priceChange: "-0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.09",
      "1h": "-0.22",
      "6h": "-0.86",
      "24h": "2.15",
    },
    liquidity: "170800000",
    poolRemaining: { current: 300, max: 3400 },
    poolVariation: "-0.003",
    marketCap: "10400000",
    contract: true,
  },
  {
    pair: ["Germany", "USDT"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:40:00",
    price: "19093",
    priceChange: "0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "0.04",
      "1h": "0.09",
      "6h": "-0.72",
      "24h": "0.83",
    },
    liquidity: "6300000000",
    poolRemaining: { current: 800, max: 3400 },
    poolVariation: "0.002",
    marketCap: "14200000000",
    contract: true,
  },
  {
    pair: ["Argentina", "WBNB"],
    img: "/dex/arbitrum.png",
    since: "2022-11-18T13:39:00",
    price: "19093",
    priceChange: "-0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.02",
      "1h": "0.12",
      "6h": "-0.59",
      "24h": "1.85",
    },
    liquidity: "487000",
    poolRemaining: { current: 1500, max: 2000 },
    poolVariation: "-0.001",
    marketCap: "14700000",
    contract: false,
  },
  {
    pair: ["DogeZilla", "WBNB"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:38:00",
    price: "19093",
    priceChange: "-0.006",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 400, max: 1800 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["YYDS", "USDT"],
    img: "/dex/quickswap.png",
    since: "2022-11-18T13:35:00",
    price: "19093",
    priceChange: "0.072",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.003",
      "6h": "0.006",
      "24h": "-0.002",
    },
    liquidity: "190930000",
    poolRemaining: { current: 1000, max: 1900 },
    poolVariation: "0.002",
    marketCap: "1909",
    contract: true,
  },
  {
    pair: ["ALEO", "WBNB"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:35:20",
    price: "19093",
    priceChange: "-0.062",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.005",
      "6h": "-0.002",
      "24h": "-0.009",
    },
    liquidity: "190930000",
    poolRemaining: { current: 800, max: 2300 },
    poolVariation: "-0.001",
    marketCap: "1909",
    contract: false,
  },
  {
    pair: ["PC", "WBNB"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:34:00",
    price: "19093",
    priceChange: "0.009",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 3500, max: 4000 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["DINO", "WETH"],
    img: "/dex/uniswap.png",
    since: "2022-11-18T13:33:00",
    price: "19093",
    priceChange: "-0.092",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.003",
      "6h": "0.006",
      "24h": "-0.002",
    },
    liquidity: "190930000",
    poolRemaining: { current: 850, max: 2000 },
    poolVariation: "0.002",
    marketCap: "1909",
    contract: true,
  },
  {
    pair: ["USDW", "CAKEW"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:30:00",
    price: "19093",
    priceChange: "0.054",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.005",
      "6h": "-0.002",
      "24h": "-0.009",
    },
    liquidity: "190930000",
    poolRemaining: { current: 1000, max: 1100 },
    poolVariation: "-0.001",
    marketCap: "1909",
    contract: false,
  },
  {
    pair: ["KUOR", "BUSD"],
    img: "/dex/pancakeswap.png",
    since: "2022-11-18T13:20:00",
    price: "19093",
    priceChange: "-0.033",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 150, max: 5000 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["YES", "USDT"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:19:00",
    price: "19093",
    priceChange: "0.023",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.003",
      "6h": "0.006",
      "24h": "-0.002",
    },
    liquidity: "190930000",
    poolRemaining: { current: 900, max: 2000 },
    poolVariation: "0.002",
    marketCap: "1909",
    contract: true,
  },
  {
    pair: ["WMATIC", "USDC"],
    img: "/dex/uniswap.png",
    since: "2022-11-18T13:18:00",
    price: "19093",
    priceChange: "-0.072",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.005",
      "6h": "-0.002",
      "24h": "-0.009",
    },
    liquidity: "190930000",
    poolRemaining: { current: 500, max: 2500 },
    poolVariation: "-0.001",
    marketCap: "1909",
    contract: false,
  },
  {
    pair: ["JEWEL", "WONE"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:15:00",
    price: "19093",
    priceChange: "-0.062",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 660, max: 2000 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["WBNB", "USDC"],
    img: "/dex/pancakeswap.png",
    since: "2022-11-18T13:10:00",
    price: "19093",
    priceChange: "0.067",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.003",
      "6h": "0.006",
      "24h": "-0.002",
    },
    liquidity: "190930000",
    poolRemaining: { current: 700, max: 3400 },
    poolVariation: "0.002",
    marketCap: "1909",
    contract: true,
  },
  {
    pair: ["WMATIC", "USDC"],
    img: "/dex/bsc.png",
    since: "2022-11-18T13:07:00",
    price: "19093",
    priceChange: "-0.001",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.005",
      "6h": "-0.002",
      "24h": "-0.009",
    },
    liquidity: "190930000",
    poolRemaining: { current: 400, max: 2000 },
    poolVariation: "-0.001",
    marketCap: "1909",
    contract: false,
  },
  {
    pair: ["NVT", "WBNB"],
    img: "/dex/uniswap.png",
    since: "2022-11-18T132:40:00",
    price: "19093",
    priceChange: "-0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.52",
      "1h": "0.73",
      "6h": "-0.05",
      "24h": "2.43",
    },
    liquidity: "139300000",
    poolRemaining: { current: 700, max: 2000 },
    poolVariation: "-0.003",
    marketCap: "1050000000",
    contract: true,
  },
  {
    pair: ["WETH", "USDT"],
    img: "/dex/arbitrum.png",
    since: "2022-11-18T12:30:00",
    price: "19093",
    priceChange: "-0.002",
    //pricesHistory: ["-0.002", "0.002", "0.002", "-0.002"],
    pricesHistory: {
      "5m": "-0.002",
      "1h": "0.003",
      "6h": "0.006",
      "24h": "-0.002",
    },
    liquidity: "190930000",
    poolRemaining: { current: 1000, max: 4000 },
    poolVariation: "0.002",
    marketCap: "1909",
    contract: true,
  },
];

const DexMain = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [selectedSmart, setSelectedSmart] = useState({});
  const [smartOptions, setSmartOptions] = useState([]);

  const handleSelectSmart = (smartValue) => {
    /*console.log("smartValue", smartValue);*/
  };

  const handleDexChange = (dex) => {
    /*console.log("dex", dex);*/
  };

  // const handleSort = (isDesc: boolean) => {
  //   console.log("isDesc", isDesc);
  // };

  const tableColumns = useMemo(
    () => [
      {
        Header: "Pair Logo",
        id: ID_LOGO,
        accessor: "pair",
        width: 75,
        minWidth: 75,
      },
      {
        Header: "Pair",
        id: ID_PAIR,
        accessor: "pair",
        minWidth: 80,
      },
      {
        Header: "Listed Since",
        id: ID_SINCE,
        accessor: "since",
        //maxWidth: 200,
        minWidth: 200,
        //width: 200,
      },
      {
        Header: "Price",
        id: ID_PRICE,
        accessor: "price",
        //minWidth: 110,
      },
      {
        Header: "History",
        id: ID_PRICE_CHANGE,
        accessor: "pricesHistory",
        //minWidth: 110,
      },
      {
        Header: "Total Liquidity",
        id: ID_LIQUIDITY,
        accessor: "liquidity",
        minWidth: 120,
        //maxWidth: 150,
      },
      {
        Header: "Pool Remaining",
        id: ID_REMAINING,
        accessor: "poolRemaining",
        // maxWidth: 200,
        minWidth: 200,
        // width: 200,
      },
      {
        Header: "Pool Variation",
        //HeadTitle: "Pool Variation",
        id: ID_VARIATION,
        accessor: "poolVariation",
      },
      {
        Header: "Market Cap",
        id: ID_MARKET,
        accessor: "marketCap",
      },
      {
        Header: "Contract",
        id: ID_CONTRACT,
        accessor: "contract",
        width: 40,
        minWidth: 40,
      },
      { Header: "Social", id: ID_SOCIAL, minWidth: 150 },
    ],
    []
  );

  useEffect(() => {
    const filterData: Array<{ label: string }> = [{ label: "Smart Filter" }];

    setData(DEX_DUMMY);
    setSmartOptions(filterData);
    setSelectedSmart(filterData[0]);
  }, []);

  return (
    <>
      <DexList onChange={handleDexChange} />
      {/* <div className="mb-6 flex flex-row gap-3">
        <SelectBox
          onChange={handleSelectSmart}
          value={selectedSmart}
          options={smartOptions}
        />
      </div> */}

      <DexTable columns={tableColumns} data={data} />
    </>
  );
};

export default DexMain;
