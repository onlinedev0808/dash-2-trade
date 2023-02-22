import type { NextPage } from "next";
import Card from "../../components/common/Card";
import CardWrapper from "../../components/common/Wrapper";
import NewsFeed from "../../components/NewsFeed";
import AverageGain from "../../components/TradingStats/AverageGain";
import ChainData from "../../components/TradingStats/ChainData";
import Console from "../../components/TradingStats/Console";
import LivePrice from "../../components/TradingStats/LivePrice";
import TotalGain from "../../components/TradingStats/TotalGain";
import TotalOrders from "../../components/TradingStats/TotalOrders";
import TradeRatio from "../../components/TradingStats/TradeRatio";

export { default as getServerSideProps } from "../../lib/serverProps";

const TradingStats: NextPage = () => (
  <CardWrapper>
    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-[inherit] grid-rows-8">
      <div className="md:order-1 md:h-full md:row-span-2 lg:order-none lg:col-span-3 lg:row-span-2">
        <TotalGain />
      </div>
      <div className="md:order-4 md:h-full md:row-span-2 lg:order-none lg:col-span-3 lg:row-span-2">
        <AverageGain />
      </div>
      <div className="md:order-2 md:row-span-1 lg:order-none lg:col-span-6 lg:row-span-1">
        <TotalOrders />
      </div>
      <div className="md:order-3 md:row-span-3 lg:order-none lg:col-span-6 lg:row-span-3">
        <Card classes="h-[20rem] flex flex-col">
          <NewsFeed keyword="crypto" />
        </Card>
      </div>
      <div className="md:order-5 lg:order-none lg:col-span-3 lg:row-span-2">
        <LivePrice />
      </div>
      <div className="md:order-6 lg:order-none lg:col-span-3 lg:row-span-2">
        <TradeRatio />
      </div>

      <div className="md:order-7 lg:order-none lg:col-span-3 lg:row-span-4">
        <ChainData />
      </div>
      <div className="md:order-8 lg:order-none lg:col-span-9 lg:row-span-4">
        <Console />
      </div>
    </div>
  </CardWrapper>
);

export default TradingStats;
