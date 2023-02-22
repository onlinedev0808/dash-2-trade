import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import TableRow from "./TableRow";
import TableHead from "./TableHead";
import SelectBox from "../common/SelectBox";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  updateSelectedChain,
  updateSelectedNetwork,
} from "../../redux/reducers/ChainSlice";

const ChainTable = () => {
  const dispatch = useAppDispatch();

  const selectedChain = useAppSelector((state) => state.chain.selectedChain);
  const selectedNetwork = useAppSelector(
    (state) => state.chain.selectedNetwork
  );

  const [chainsOptions, setChainsOptions] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);

  const [chainData, setChainData] = useState([]);
  const [mainData, setMainData] = useState([]);

  const [, setSelectedRow] = useState();
  const [rows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handleSelectChain = (data) => {
    dispatch(updateSelectedChain(data));
  };
  const handleSelectNetwork = (data) => {
    dispatch(updateSelectedNetwork(data));
  };

  const fetchChainData = async () => {
    try {
      const response = await axios.get(`/api/backend/chains/blockchains`);
      setChainData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("hello");
    fetchChainData();
  }, []);

  const fetchMainData = async () => {
    try {
      const response = await axios.get(
        `/api/backend/chains/${selectedChain?.label}?network=${selectedNetwork?.label}`
      );
      setMainData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const makeNetworkOptions = () => {
    const data = chainData
      .filter(
        (item) =>
          item.chain_id === selectedChain?.label && item.has_dex_trades === true
      )
      .map((item) => ({ label: item.network }));
    setNetworkOptions(data);
    dispatch(updateSelectedNetwork(data[0]));
  };

  const makeChainsOptions = () => {
    const data = [];
    chainData.forEach((item) => {
      if (!data.includes(item.chain_id) && item.has_dex_trades === true) {
        data.push(item.chain_id);
      }
    });
    setChainsOptions(data.map((item) => ({ label: item })));
    dispatch(updateSelectedChain(data[0]));
  };

  useEffect(() => {
    makeChainsOptions();
  }, [chainData]);

  useEffect(() => {
    makeNetworkOptions();
  }, [selectedChain, chainsOptions]);

  useEffect(() => {
    if (selectedChain && selectedNetwork) {
      fetchMainData();
    }
  }, [selectedChain, selectedNetwork]);

  useEffect(() => {
    setTotalPages(rows.length / rowsPerPage + 1);
  }, [rowsPerPage]);

  return (
    <div className="bg-[#121318] p-[24px] rounded-lg">
      <div className="flex items-center justify-between mb-[28px] ">
        <h1 className="mr-[10px] text-lg leading-[33px] text-text-primary dark:text-text-primary-dark">
          Chains
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex">
            <div className="mr-[10px] bg-selector text-center text-text-primary dark:text-text-primary-dark px-[12px] py-[10px] rounded-[5px] text-sm leading-[18px] w-[80px]">
              Chain:
            </div>
            <div className="mr-[10px]">
              <SelectBox
                onChange={handleSelectChain}
                value={selectedChain}
                options={chainsOptions}
                isChains
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-[10px] bg-selector text-center text-text-primary dark:text-text-primary-dark px-[12px] py-[10px] rounded-[5px] text-sm leading-[18px] w-[80px]">
              Network:
            </div>
            <div className="mr-[10px]">
              <SelectBox
                onChange={handleSelectNetwork}
                value={selectedNetwork}
                options={networkOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <div className="min-w-[1092px]">
          <TableHead />
          {mainData
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((row) => (
              <TableRow
                key={uuidv4()}
                row={row}
                setSelectedRow={setSelectedRow}
              />
            ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-[20px] gap-[5px] text-sm">
          <div
            className={`${
              page === 1 ? "bg-button-secondary" : "bg-button-primary"
            } rounded-lg py-2 px-3 flex items-center cursor-pointer`}
            onClick={() => {
              if (page === 1) return;
              setPage(page - 1);
            }}
          >
            Prev
          </div>

          <div
            className={`${
              page === totalPages ? "bg-button-secondary" : "bg-button-primary"
            } rounded-lg py-2 px-3 flex items-center cursor-pointer`}
            onClick={() => {
              if (page === totalPages) return;
              setPage(page + 1);
            }}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainTable;
