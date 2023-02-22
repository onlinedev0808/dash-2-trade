/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable  no-param-reassign */

import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingSquare } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

import TableRow from "./TableRow";
import TableHead from "./TableHead";
import SelectBox from "../common/SelectBox";
import TokenDetails from "../TokenDetails";
import { useAppSelector } from "../../redux/hooks";
import RadioGroup from "../MarketOverview/RadioGroup";
import PresaleTable from "./PresaleTokenTable";

const OPTIONS = [
  { value: "Tokens", text: "Tokens" },
  { value: "Presale Tokens", text: "Presale Tokens" },
];

const TokenTable = ({ watchlistId }) => {
  const emailAddress = useAppSelector((state) => state.user.email);

  const [selectedData, setSelectedData] = useState({ label: "Liquidity" });
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [selectedTable, setSelectedTable] = useState(OPTIONS[0]);

  const handleSelectData = (data) => {
    setSelectedData(data);
  };

  const loadWatchlist = async (emailAddress, watchlistId) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/watchlist/${emailAddress}/${watchlistId}/${selectedTable.value}`
      );
      setRows(response.data);
    } catch (error) {
      setRows([]);
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!watchlistId) return;

    loadWatchlist(emailAddress, watchlistId);
  }, [emailAddress, watchlistId, selectedTable.value]);

  const handleClickEdit = () => {
    setEditMode(true);
    setSelectedTokens([]);
  };

  const handleClickClose = () => {
    setEditMode(false);
  };

  const handleClickDelete = async () => {
    setLoading(true);

    try {
      setEditMode(false);

      await axios.delete(`/api/watchlist/token`, {
        data: {
          address: emailAddress,
          id: watchlistId,
          tokens: selectedTokens,
        },
      });

      await loadWatchlist(emailAddress, watchlistId);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-foreground dark:bg-foreground-dark p-6 rounded-lg">
      {isDetailsModalOpen && (
        <TokenDetails
          token={{ name: "Binance" }}
          close={() => {
            setIsDetailsModalOpen(false);
          }}
        />
      )}
      <RadioGroup
        options={OPTIONS}
        selected={selectedTable}
        setSelected={setSelectedTable}
      />

      {selectedTable.value === OPTIONS[0].value && (
        <>
          <div className="flex items-center justify-end mb-7">
            {/* <h1 className="text-lg leading-[33px] text-text-primary dark:text-text-primary-dark">
              Tokens
            </h1> */}
            {!editMode ? (
              <div className="text-sm cursor-pointer">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark"
                  onClick={handleClickEdit}
                />
              </div>
            ) : (
              <div className="text-sm flex gap-2.5">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                  onClick={handleClickDelete}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                  onClick={handleClickClose}
                />
              </div>
            )}
            <div className="flex hidden">
              <div className="mr-2.5">
                <SelectBox
                  onChange={handleSelectData}
                  value={selectedData}
                  options={[
                    { label: "Market Cap" },
                    { label: "Volume" },
                    { label: "Liquidity" },
                    { label: "MACD" },
                    { label: "RSI" },
                  ]}
                />
              </div>
              <div className="mr-2.5 bg-selector text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]">
                Volume
              </div>
              <div className="mr-2.5">
                <SelectBox
                  options={[
                    { label: "Market Cap" },
                    { label: "Volume" },
                    { label: "Liquidity" },
                    { label: "MACD" },
                    { label: "RSI" },
                  ]}
                />
              </div>
              <div className="mr-2.5 bg-selector text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]">
                Exchange
              </div>
              <div className="mr-2.5">
                <SelectBox
                  options={[{ label: "Sort" }]}
                  style={{
                    button: {
                      default:
                        "bg-selector text-left text-text-primary dark:text-text-primary-dark px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[6.25rem]",
                    },
                    list: "bg-selector rounded w-[6.25rem]",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <div className="min-w-[68.25rem]">
              <TableHead />
              {loading ? (
                <div className="flex flex-col text-text-secondary dark:text-text-secondary-dark text-center w-fit my-auto">
                  <RotatingSquare
                    ariaLabel="rotating-square"
                    visible
                    color="grey"
                  />
                  <p>Loading...</p>
                </div>
              ) : (
                rows
                  // .filter((row) => tokens.includes(row.contractAddress))
                  .map((row, index) => {
                    row.id = index + 1;
                    return (
                      <TableRow
                        key={row.id}
                        row={row}
                        editMode={editMode}
                        setSelectedToken={setSelectedToken}
                        setIsDetailsModalOpen={setIsDetailsModalOpen}
                        selected={selectedTokens.includes(row.tokenId)}
                        onSelect={(selected) => {
                          const tokens = [...selectedTokens];
                          if (selected) {
                            tokens.push(row.tokenId);
                            setSelectedTokens(tokens);
                          } else {
                            setSelectedTokens(
                              tokens.filter((token) => token !== row.tokenId)
                            );
                          }
                        }}
                      />
                    );
                  })
              )}
              {!loading && !rows?.length && (
                <div className="text-center mt-4 text-base text-text-secondary dark:text-text-secondary-dark">
                  No Tokens
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {selectedTable.value === OPTIONS[1].value && (
        <>
          <div className="flex items-center justify-end mb-7">
            {!editMode ? (
              <div className="text-sm cursor-pointer">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark"
                  onClick={handleClickEdit}
                />
              </div>
            ) : (
              <div className="text-sm flex gap-2.5">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                  onClick={handleClickDelete}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                  onClick={handleClickClose}
                />
              </div>
            )}
          </div>
          <div className="overflow-x-scroll">
            <PresaleTable
              selectedTokens={selectedTokens}
              setSelectedTokens={setSelectedTokens}
              rows={rows}
              editMode={editMode}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TokenTable;
