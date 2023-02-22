import React from "react";
import ContestItem from "./CardItem";

const Cards = (): JSX.Element => {
  return (
    <div className="mt-10 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid gap-8 lg:gap-6 lg:gap-8">
      <div className="">
        <ContestItem />
      </div>
      <div className="">
        <ContestItem />
      </div>
      <div className="">
        <ContestItem />
      </div>
      <div className="">
        <ContestItem />
      </div>
    </div>
  );
};

export default Cards;
