import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Image from "next/image";

import { NextPage } from "next";
import { formatNumber } from "../../../utils";

import PriceRange from "../../PriceRange";
import ConnectWalletDialog from "../../ConnectWalletDialog";

import { useAppSelector } from "../../../redux/hooks";
import { AddToListIcon, WatchlistIcon } from "../../CommonSvg";

interface ITableRowProps {
  row: any;
  setIsWatchlistDialogOpen?: (isOpen: boolean) => void;
  setSelectedToken?: (token: any) => void;
  setIsDetailsModalOpen?: (isOpen: boolean) => void;
  watchlists?: any;
  setSelectedRow?: (row: any) => void;
  position?: number;
}

const TableRow: NextPage<ITableRowProps> = ({
  row,
  setIsWatchlistDialogOpen,
  setSelectedToken,
  watchlists,
  position,
}) => {
  const {
    id,
    symbol,
    name,
    logo,
    volume,
    marketCap,
    priceMax,
    priceMin,
    priceChange,
    priceCurrent,
  } = row;

  const [open, setOpen] = useState(false);
  const email = useAppSelector((state) => state.user.email);

  const isIncreasing = priceChange > 0;
  const isDescreasing = priceChange < 0;

  let color = "text-text-secondary dark:text-text-secondary-dark";
  if (isIncreasing) color = "text-green";
  if (isDescreasing) color = "text-red";

  return (
    <Link href={`/tokens/${id}`}>
      <div
        className={`h-[3.2rem] flex justify-between items-center cursor-pointer${
          position % 2
            ? " bg-highlight dark:bg-highlight-dark dark:hover:bg-highlight-dark hover:bg-highlight"
            : " hover:bg-highlight dark:hover:bg-highlight-dark"
        }`}
      >
        <ConnectWalletDialog isOpen={open} close={() => setOpen(false)} />
        <div className="w-[5%] ml-2.5 lg:ml-6 text-sm leading-[1.125rem] text-text-secondary dark:text-text-secondary-dark">
          <Image
            height={28}
            width={28}
            src={logo}
            alt="token logo"
            className="h-[1.75rem] rounded-full mr-2"
          />
        </div>
        <div className="w-[10%] flex items-center">
          <div className="p-3 rounded-lg bg-highlight dark:bg-highlight-dark text-text-secondary dark:text-text-secondary-dark text-sm leading-[0]">
            {symbol}
          </div>
        </div>
        <div className="w-[10%] text-sm leading-4 text-text-primary dark:text-text-primary-dark">
          {name}
        </div>
        {/* <div className='w-[7.5%] text-sm leading-[16.8px] text-white'>
          ${price ? formatNumber(price) : 0}
        </div> */}
        {/* <div className='w-[7.5%] text-sm leading-[16.8px] flex items-center text-white'> */}
        {/* <FontAwesomeIcon icon={faCaretDown} className='mr-[6px] w-3 h-3 flex items-center' /> */}
        {/* ${liquidity ? formatNumber(liquidity) : 0}
        </div> */}
        <div className="w-[10%] text-sm leading-4 flex items-center text-text-primary dark:text-text-primary-dark">
          {/* <FontAwesomeIcon icon={faCaretUp} className='mr-[6px]  w-3 h-3' /> */}
          {volume ? `$${formatNumber(volume)}` : "N/A"}
        </div>

        <div className="w-[10%] text-sm leading-4 text-text-primary dark:text-text-primary-dark flex items-center">
          {priceChange ?? (
            <div className={`flex items-center ${color}`}>
              {isDescreasing && (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="mr-1.5 w-3 h-3 flex items-center"
                />
              )}
              {isIncreasing && (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="mr-1.5 w-3 h-3 flex items-center"
                />
              )}
              {!isIncreasing && !isDescreasing && (
                <div className="flex flex-col mr-1.5">
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    className="w-3 h-3 relative top-1"
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="w-3 h-3 relative mb-1"
                  />
                </div>
              )}
              {isDescreasing && "-"}
              {isIncreasing && "+"}
              {Math.abs(priceChange * 100).toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </div>
          )}

          {/* <FontAwesomeIcon icon={faArrowTrendUp} className='ml-[6px]  w-3 h-3 text-green' /> */}
        </div>
        <div className="w-[10%] text-sm leading-4 text-text-primary dark:text-text-primary-dark">
          {marketCap ? `$${formatNumber(marketCap)}` : "N/A"}
        </div>

        <div className="xl:w-[15%] xl:pr-[2.5rem] w-[7.8rem]">
          {priceMin && priceMax && priceCurrent && (
            <PriceRange min={priceMin} max={priceMax} current={priceCurrent} />
          )}
        </div>

        <div className="xl:w-[12.5%] w-[6.7rem]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if ((!watchlists || !watchlists.length) && email) {
                toast.error("You need to create a watchlist");
                return;
              }
              if (!email) {
                toast.error("You need to log in");
                return;
              }
              setSelectedToken(row.tokenId);
              setIsWatchlistDialogOpen(true);
            }}
            className="bg-button-primary rounded px-4 py-2.5 hover:bg-highlight-button-primary flex gap-3 items-center"
          >
            <AddToListIcon color="white" />
            <WatchlistIcon color="white" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TableRow;
