/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from "react";

import { NextPage } from "next";
import { formatNumber } from "../../utils";
import TopSellingModel from "../../models/TopSellingModel";
import Card from "./Card";
import { CardTokenLink } from "../PresaleTokenTable/common/tokenUtils";
import RoundedImage from "../common/RoundedImage";

const TableHead = ({ isM }) => {
  const wToken = isM ? "min-w-[59%] w-[59%]" : "min-w-[42%] w-[42%]";
  const wStart = isM ? "w-[25%]" : "w-[25%]";
  const wSold = isM ? "w-[20%]" : "w-[25%]";

  return (
    <div
      className="flex space-x-2 items-center font-normal text-xs leading-4
     text-text-primary dark:text-text-primary-dark
      border-y border-border-primary
       pt-2.5 pb-2.5 mb-7 "
    >
      <div className={wToken}>Token</div>
      {isM ? <></> : <div className="w-[15%]">Symbol</div>}
      <div className={wStart}>
        <span className="hidden lg:inline-block">Presale start</span>
        <span className="lg:hidden">Start</span>
      </div>
      <div className={wSold}>
        <span className="hidden lg:inline-block">Amount raised</span>
        <span className="lg:hidden">Sold</span>
      </div>
    </div>
  );
};

const TableRow: NextPage<ITableRowProps> = ({ row, isM }) => {
  const { id, presale_start, token, amount_raised } = row;

  const date = presale_start
    ? new Date(presale_start).toLocaleDateString()
    : "-";

  const wToken = isM ? "min-w-[49%] w-[49%]" : "min-w-[32%] w-[32%]";
  const wStart = isM ? "w-[25%]" : "w-[25%]";
  const wSold = isM ? "w-[20%]" : "w-[25%]";

  return (
    <CardTokenLink tokenId={id}>
      <div
        className="h-8 text-base flex space-x-2 items-center cursor-pointer
      hover:bg-highlight dark:hover:bg-highlight-dark"
      >
        <div className="w-[12%] font-normal leading-[1.125rem] text-text-secondary dark:text-text-secondary-dark pl-2">
          <RoundedImage
            logo={token?.logo}
            alt="top selling presale token"
            className="w-4 h-4 lg:w-5 lg:h-5"
          />
        </div>

        <div className={wToken}>
          <div className="leading-5 text-text-primary dark:text-text-primary-dark truncate">
            {token?.name}
          </div>
        </div>
        {isM ? (
          <></>
        ) : (
          <div className="w-[15%] leading-4 text-text-secondary dark:text-text-secondary-dark truncate">
            {token?.symbol}
          </div>
        )}
        <div
          className={`${wStart} text-sm leading-4 text-text-primary dark:text-text-primary-dark truncate`}
        >
          {date || "-"}
        </div>
        <div
          className={`${wSold} leading-4 text-text-primary dark:text-text-primary-dark truncate`}
        >
          {`$ ${formatNumber(+amount_raised, 0)}`}
        </div>
      </div>
    </CardTokenLink>
  );
};

const TopSellingCard = ({
  titleFirst,
  data,
  isM,
  isLoading = false,
}: Props) => {
  const rows = [];
  const error = data?.length === 0 ? "No top selling presales" : "";

  for (let i = 0; i < 5; i++) {
    if (data[i])
      rows.push(<TableRow key={data[i].id} row={data[i]} isM={isM} />);
  }
  return (
    <Card
      head={<TableHead isM={isM} />}
      rows={<div className="flex flex-col gap-y-4">{rows}</div>}
      titleFirst={titleFirst}
      isLoading={isLoading}
      isM={isM}
      error={error}
    />
  );
};
export default TopSellingCard;

interface Props {
  titleFirst: string | ReactNode;
  data: TopSellingModel[];
  isM: boolean;
  isLoading?: boolean;
}

interface ITableRowProps {
  row: TopSellingModel;
  isM: boolean;
}
