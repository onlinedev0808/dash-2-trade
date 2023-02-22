/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from "react";

import { NextPage } from "next";
import { formatNumber } from "../../utils";
import Card from "./Card";

const TableHead = () => (
  <div className="flex space-x-2 items-center font-normal text-xs leading-4
   text-text-primary dark:text-text-primary-dark
    border-y border-border-primary dark:border-border-primary
    pt-2.5 pb-2.5 mb-7">
    <div className="min-w-[30%] w-[30%] pl-1">Exchange</div>
    <div className="w-[25%]">Volume</div>
    <div className="w-[20%] lg:w-[25%]">
      <span className="hidden lg:inline-block">Change day</span>
      <span className="lg:hidden">Day</span>
    </div>
    <div className="w-[20%] lg:w-[25%]">
      <span className="hidden lg:inline-block">Change week</span>
      <span className="lg:hidden">Week</span>
    </div>
  </div>
);

const TableRow: NextPage<ITableRowProps> = ({ row }) => {
  const { name, vol_usd, vol_1w_change, vol_1d_change } = row;

  const isDayGain = vol_1d_change > 0;
  const isWeekGain = vol_1w_change > 0;

  return (
    <div className="text-base">
      <div className="h-8 flex space-x-2 items-center cursor-pointer hover:bg-highlight dark:hover:bg-highlight-dark">
        <div className="min-w-[30%] w-[30%] pl-1">
          <div className="leading-5 text-text-primary dark:text-text-primary-dark truncate">
            {name}
          </div>
        </div>
        <div className="w-[25%] leading-4 text-text-secondary dark:text-text-secondary-dark truncate">
          {`$ ${formatNumber(vol_usd, 1)}`}
        </div>
        <div
          className={`w-[20%] lg:w-[25%] leading-4 truncate ${
            isDayGain ? "text-green" : "text-red"
          }`}
        >
          {`${isDayGain ? "+" : ""}${formatNumber(+vol_1d_change, 1)} %`}
        </div>
        <div
          className={`w-[20%] lg:w-[25%] leading-4 truncate ${
            isWeekGain ? "text-green" : "text-red"
          }`}
        >
          {`${isWeekGain ? "+" : ""}${formatNumber(+vol_1w_change, 1)} %`}
        </div>
      </div>
    </div>
  );
};

const TopExchangeCard = ({
  titleFirst,
  data,
  isM,
  isLoading = false,
}: Props) => {
  const rows = [];
  const error = data?.length === 0 ? "No exchange data" : "";

  for (let i = 0; i < 5; i++) {
    if (data[i])
      rows.push(<TableRow key={data[i].exchange_id} row={data[i]} />);
  }
  return (
    <Card
      head={<TableHead />}
      rows={<div className="flex flex-col gap-y-4">{rows}</div>}
      titleFirst={titleFirst}
      isLoading={isLoading}
      error={error}
      isM={isM}
    />
  );
};
export default TopExchangeCard;

type Exchange = {
  exchange_id: number;
  name: string;
  vol: number;
  vol_usd: number;
  vol_1d_change: number;
  vol_1w_change: number;
};

interface Props {
  titleFirst: string | ReactNode;
  data: Exchange[];
  isM: boolean;
  isLoading?: boolean;
}

interface ITableRowProps {
  row: Exchange;
}
