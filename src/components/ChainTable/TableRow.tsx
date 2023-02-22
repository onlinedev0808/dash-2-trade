import { useState } from "react";
import { NextPage } from "next";
import { formatNumber } from "../../utils";
import PriceRange from "../PriceRange";
import ConnectWalletDialog from "../ConnectWalletDialog";

import "react-toastify/dist/ReactToastify.css";

interface ITableRowProps {
  row: any;
  setIsWatchlistDialogOpen?: (isOpen: boolean) => void;
  setSelectedToken?: (token: any) => void;
  setIsDetailsModalOpen?: (isOpen: boolean) => void;
  watchlists?: any;
  setSelectedRow?: (row: any) => void;
}

const TableRow: NextPage<ITableRowProps> = ({ row }) => {
  const {
    base_amount,
    trade_amount,
    quote_amount,
    trades,
    quote_price,
    max_price,
    min_price,
    median_price,
    open_price,
    close_price,
    date,
    base_currency_symbol,
    quote_currency_symbol,
  } = row;
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="h-[51px] flex items-center">
      <ConnectWalletDialog isOpen={isOpen} close={() => setOpen(false)} />
      <div className="w-[6.5%] ml-[24px] text-sm leading-[18px] text-[#9194A6]">
        ${base_amount ? formatNumber(base_amount) : 0}
      </div>
      <div className="w-[6.5%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        ${trade_amount ? formatNumber(trade_amount) : 0}
      </div>
      <div className="w-[9.75%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        ${quote_amount ? formatNumber(quote_amount) : 0}
      </div>
      <div className="w-[6.5%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        ${trades ? formatNumber(trades) : 0}
      </div>
      <div className="w-[17%] pr-[40px]">
        <PriceRange min={min_price} max={max_price} current={quote_price} />
      </div>
      <div className="w-[9.75%] text-sm leading-[16.8px] flex items-center text-text-primary dark:text-text-primary-dark">
        ${median_price ? formatNumber(median_price) : 0}
      </div>
      <div className="w-[9.75%] text-sm leading-[16.8px] flex items-center text-text-primary dark:text-text-primary-dark">
        ${open_price ? formatNumber(open_price) : 0}
      </div>
      <div className="w-[9.75%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        ${close_price ? formatNumber(close_price) : 0}
      </div>
      <div className="w-[10%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        {date}
      </div>
      <div className="w-[6.5%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        {base_currency_symbol}
      </div>
      <div className="w-[8%] text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark">
        {quote_currency_symbol}
      </div>
    </div>
  );
};

export default TableRow;
