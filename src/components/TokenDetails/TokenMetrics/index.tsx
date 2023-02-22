const Row = ({ title, value }) => (
  <div className="flex flex-row justify-between lg:gap-10 whitespace-nowrap">
    <p className="text-white/50">{title}</p>
    <p>{value}</p>
  </div>
);

const TokenMetrics = () => (
  <div className="bg-[#111112] rounded-[8px] lg:w-fit p-5 flex flex-col gap-3 w-full">
    <p className="lg:text-2xl text-lg lg:mb-10 mb-3">Token Information</p>
    <Row title="DEX" value="Uniswap" />
    <Row title="Market Cap" value="$50M" />
    <Row title="Liquidity" value="$27M" />
    <Row title="Price" value="$230.00" />
    <Row title="FDV" value="$200M" />
    <Row title="Circulating Supply" value="200M BNB" />
  </div>
);

export default TokenMetrics;
