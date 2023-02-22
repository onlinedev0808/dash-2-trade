import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NextPage } from "next";
import {
  faCaretUp,
  faCaretDown,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import PriceRange from "../PriceRange";

import { formatNumber } from "../../utils";

interface ITableRowProps {
  row: any;
  editMode?: any;
  selected?: boolean;
  onSelect?: (item: any) => void;
  setSelectedToken?: (item: any) => void;
  setIsDetailsModalOpen?: (item: boolean) => void;
}

const TableRow: NextPage<ITableRowProps> = ({
  row,
  editMode,
  selected,
  onSelect,
  // setIsDetailsModalOpen
}) => {
  const {
    id,
    tokenId,
    tokenImg,
    symbol,
    name,
    price,
    liquidity,
    volume,
    priceChange,
    marketCap,
    priceMax,
    priceMin,
    priceCurrent,
  } = row;

  return (
    <Link href={`/tokens/${tokenId}`}>
      <div
        className={`h-[3.2rem] flex items-center cursor-pointer${
          id % 2
            ? " hover:bg-highlight hover:dark:bg-highlight-dark hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark"
            : " hover:bg-hover-highlight hover:dark:bg-hover-highlight-dark"
        }`}
      >
        <div
          className="w-[7.5%] ml-6 text-sm leading-[1.125rem] text-[#9194A6] flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {editMode &&
            (selected ? (
              <FontAwesomeIcon
                icon={faCheckSquare}
                className="w-5 h-5 text-white cursor-pointer"
                onClick={() => onSelect(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                className="w-5 h-5 text-white cursor-pointer"
                onClick={() => onSelect(true)}
              />
            ))}
          {id}
        </div>
        <div className="w-[5%] flex items-center">
          <img
            className="mx-1.5 w-[1.25rem] h-[1.25rem]"
            src={tokenImg}
            alt="Token"
            width={20}
            height={20}
          />
        </div>
        <div className="w-[10%] flex items-center">
          <div className="p-3 rounded-lg bg-[#000000] text-[#7482F2] text-sm leading-[0px]">
            {symbol}
          </div>
        </div>
        <div className="w-[10%] text-sm leading-4 text-text-primary dark:text-text-primary-dark">
          {name}
        </div>
        <div className="w-[7.5%] text-sm leading-4 text-text-primary dark:text-text-primary-dark">
          {(price && `$${formatNumber(price)}`) ?? "N/A"}
        </div>
        <div className="w-[7.5%] text-sm leading-4 flex items-center  text-text-primary dark:text-text-primary-dark">
          {/* <FontAwesomeIcon icon={faCaretDown} className='mr-[6px] w-3 h-3 flex items-center' /> */}
          {(liquidity && `$${formatNumber(liquidity)}`) ?? "N/A"}
        </div>
        <div className="w-[7.5%] text-sm leading-4 flex items-center  text-text-primary dark:text-text-primary-dark">
          {/* <FontAwesomeIcon icon={faCaretUp} className='mr-[6px]  w-3 h-3' /> */}
          {(volume && `$${formatNumber(volume)}`) ?? "N/A"}
        </div>
        <div
          className={`w-[10%] text-sm leading-4 flex items-center ${
            // eslint-disable-next-line no-nested-ternary
            priceChange < 0
              ? "text-red"
              : priceChange > 0
              ? "text-green"
              : "text-text-primary dark:text-text-primary-dark"
          }`}
        >
          {priceChange && priceChange < 0 && (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="mr-1.5 w-3 h-3 flex items-center"
            />
          )}
          {priceChange && priceChange > 0 && (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="mr-1.5 w-3 h-3 flex items-center"
            />
          )}
          {priceChange
            ? `${Math.abs(priceChange).toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%`
            : "N/A"}
        </div>
        <div className="w-[10%] text-sm leading-1  text-text-primary dark:text-text-primary-dark">
          {(marketCap && `$${formatNumber(marketCap)}`) ?? "N/A"}
        </div>
        <div className="w-[15%] pr-10">
          {priceMin && priceMax && priceCurrent && (
            <PriceRange min={priceMin} max={priceMax} current={priceCurrent} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default TableRow;
