import React, { useRef } from "react";
import Image from "next/image";
import { TokenSortEnum, TokenSortOrdersEnum } from "../../../types/enums";
import ArrowsIcon from "../../../../public/presale-token-info/arrows.svg";

const TableHead = ({ onHeaderClick }) => {
  const prevSort = useRef("");
  const sortOrder = useRef(TokenSortOrdersEnum.Asc);

  const sortBy = (type: TokenSortEnum) => () => {
    if (prevSort.current !== type) {
      prevSort.current = type;
    }
    sortOrder.current =
      sortOrder.current === TokenSortOrdersEnum.Asc
        ? TokenSortOrdersEnum.Desc
        : TokenSortOrdersEnum.Asc;

    onHeaderClick(type, sortOrder.current);
  };
  return (
    <div className="h-[3.2rem] flex justify-between items-center text-sm leading-4 text-text-primary dark:text-text-primary-dark border-y-2 border-border-primary">
      <div className="w-[5%] ml-2.5 lg:ml-6">Logo</div>
      <div className="w-[10%]">Symbol</div>
      <div
        className="w-[10%] flex items-center gap-1 cursor-pointer"
        onClick={sortBy(TokenSortEnum.Id)}
      >
        Name
        <div className="relative w-3 h-3">
          <Image src={ArrowsIcon} layout="fill" />
        </div>
      </div>
      {/* <div className='w-[7.5%]'>Price</div> */}
      {/* <div className='w-[7.5%]'>Liquidity</div> */}
      <div
        className="w-[10%] flex items-center gap-1 cursor-pointer"
        onClick={sortBy(TokenSortEnum.Volume)}
      >
        Volume
        <div className="relative w-3 h-3">
          <Image src={ArrowsIcon} layout="fill" />
        </div>
      </div>
      <div
        className="w-[10%] flex items-center gap-1 cursor-pointer"
        onClick={sortBy(TokenSortEnum.PriceChange)}
      >
        Price Change
        <div className="relative w-3 h-3">
          <Image src={ArrowsIcon} layout="fill" />
        </div>
      </div>
      <div
        className="w-[10%] flex items-center gap-1 cursor-pointer"
        onClick={sortBy(TokenSortEnum.MarketCap)}
      >
        Market cap
        <div className="relative w-3 h-3">
          <Image src={ArrowsIcon} layout="fill" />
        </div>
      </div>
      <div className="w-[15%]">Day price range</div>
      <div className="w-[12.5%] min-w-[7.8rem]">Watchlist</div>
    </div>
  );
};

export default TableHead;
