/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from "react";

import { NextPage } from "next";
import Card from "./Card";
import { CardTokenLink } from "../PresaleTokenTable/common/tokenUtils";
import { DailyGainersSvg } from "../CommonSvg";

const TableHead = ({ isM }) => {
  const wToken = isM ? "min-w-[59%] w-[59%]" : "min-w-[42%] w-[42%]";
  const wDate = isM ? "w-[20%]" : "w-[25%]";

  return (
    <div
      className="flex space-x-2 items-center font-normal text-xs leading-4
     text-text-primary dark:text-text-primary-dark
      border-y border-border-primary
       pt-2.5 pb-2.5 mb-7 "
    >
      <div className={wToken}>Token</div>
      {isM ? <></> : <div className="w-[15%]">Symbol</div>}
      <div className="w-[25%]">Price</div>
      <div className={`${wDate} min-w-[3.875rem]`}>Gain</div>
    </div>
  );
};

const TableRow: NextPage<ITableRowProps> = ({ row, isM }) => {
  const { id, icon, longName, shortName, price, gain } = row;

  const wToken = isM ? "min-w-[49%] w-[49%]" : "min-w-[32%] w-[32%]";
  const wDate = isM ? "w-[20%]" : "w-[25%]";

  return (
    <CardTokenLink tokenId={id}>
      <div
        className="h-8 text-base flex space-x-2 items-center cursor-pointer
      hover:bg-highlight dark:hover:bg-highlight-dark"
      >
        <div className="w-[12%] font-normal leading-[1.125rem] text-[#9194A6] pl-1">
          {icon ? (
            <div className="w-8 h-8">
              <DailyGainersSvg name={icon} />
            </div>
          ) : (
            <span>&#x2022;</span>
          )}
        </div>
        <div className={wToken}>
          <div className=" leading-5 text-text-primary dark:text-text-primary-dark truncate">
            {longName}
          </div>
        </div>
        {isM ? (
          <></>
        ) : (
          <div className="w-[15%]  leading-4 text-text-secondary dark:text-text-secondary-dark truncate">
            {shortName}
          </div>
        )}
        <div className="w-[25%] leading-4 text-text-primary dark:text-text-primary-dark truncate">
          {price}
        </div>
        <div
          className={`${wDate} min-w-[3.875rem] leading-4 text-green truncate`}
        >
          {gain}
        </div>
      </div>
    </CardTokenLink>
  );
};

const TopGainersCard = ({
  titleFirst,
  data,
  isM,
  isLoading = false,
}: Props) => {
  const rows = [];
  const error = data?.length === 0 ? "No top gainers" : "";

  for (let i = 0; i < 5; i++) {
    if (data[i])
      rows.push(<TableRow key={data[i].id} row={data[i]} isM={isM} />);
  }
  return (
    <Card
      head={<TableHead isM={isM} />}
      rows={<div className="flex flex-col gap-y-4">{rows}</div>}
      titleFirst={titleFirst}
      isM={isM}
      isLoading={isLoading}
      error={error}
    />
  );
};
export default TopGainersCard;

type DailyGainerItem = {
  id: number;
  longName: string;
  shortName: string;
  gain: string;
  price: number;
  icon: string;
};

interface Props {
  titleFirst: string | ReactNode;
  data: DailyGainerItem[];
  isM: boolean;
  isLoading?: boolean;
}

interface ITableRowProps {
  row: DailyGainerItem;
  isM: boolean;
}
