/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from "react";

import { NextPage } from "next";
import Link from "next/link";
import Card from "./Card";
import { formatNumber } from "../../utils";
import { ITopSocialActivity } from "../../types/redux";
import RoundedImage from "../common/RoundedImage";

const TableHead = ({ isM }) => {
  const wToken = isM ? "min-w-[49%] w-[49%]" : "min-w-[36%] w-[36%]";
  const wSymbol = isM ? "w-[20%]" : "w-[30%]";
  const wFollowers = isM ? "w-[25%]" : "w-[32%]";

  return (
    <div className="flex space-x-2 items-center font-normal text-xs leading-4
     text-text-primary dark:text-text-primary-dark
     border-y border-border-primary dark:border-border-primary
     pl-1 pt-2.5 pb-2.5 mb-7">
      <div className={wToken} >Token</div>
      <div className={wSymbol}>Symbol</div>
      <div className={wFollowers}>Followers</div>
    </div>
  );
};

const TableRow: NextPage<ITableRowProps> = ({ row = {}, isM }) => {
  const { value, token } = row;
  const wToken = isM ? "min-w-[35%] w-[35%]" : "min-w-[26%] w-[26%]";
  const wSymbol = isM ? "w-[20%]" : "w-[30%]";
  const wFollowers = isM ? "w-[25%]" : "w-[32%]";

  const isDecreasing = value?.change < 0;

  const textColor = isDecreasing ? "text-red" : "text-green";
  const firstChar = isDecreasing ? "-" : "+";

  const maxFractons = value?.change > 1000 ? 0 : 1;

  return (
    <Link href={`tokens/${token.id}`}>
      <div className="text-base">
        <div className="h-8 flex space-x-2 items-center cursor-pointer hover:bg-highlight dark:hover:bg-highlight-dark">
          <div className="w-[10%] font-normal leading-[1.125rem] text-text-primary dark:text-text-primary-dark pl-1">
            <RoundedImage
              logo={token?.logo}
              alt="top selling presale token"
              className="w-7 h-7 text-text-primary dark:text-text-primary-dark"
            />
          </div>

          <div className={wToken}>
            <div className="leading-4 text-text-primary dark:text-text-primary-dark truncate">
              {token?.name}
            </div>
          </div>
          <div
            className={`${wSymbol} leading-4 text-text-secondary dark:text-text-secondary-dark truncate`}
          >
            {token?.symbol}
          </div>
          <div
            className={`${wFollowers} leading-4 text-text-primary dark:text-text-primary-dark truncate`}
          >
            {formatNumber(value?.count, 0)}&nbsp;
            <span className={`${textColor} text-xs`}>{` ${firstChar}${formatNumber(
              value.change,
              maxFractons
            )}%`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TopSocialCard = ({ titleFirst, data, isM, isLoading = false }: Props) => {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    if (data[i])
      rows.push(<TableRow key={data[i].token?.id} row={data[i]} isM={isM} />);
  }
  return (
    <Card
      head={<TableHead isM={isM} />}
      rows={<div className="flex flex-col gap-y-4">{rows}</div>}
      titleFirst={titleFirst}
      isM={isM}
      isLoading={isLoading}
    />
  );
};
export default TopSocialCard;

interface Props {
  titleFirst: string | ReactNode;
  data: ITopSocialActivity[];
  isM: boolean;
  isLoading?: boolean;
}

interface ITableRowProps {
  row: ITopSocialActivity;
  isM: boolean;
}
