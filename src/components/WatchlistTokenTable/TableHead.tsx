const TableHead = () => (
  <div className="h-[3.2rem] flex items-center text-sm leading-4 text-text-primary dark:text-text-primary-dark border-y-2 border-[#313135]">
    <div className="w-[7.5%] ml-6">#</div>
    <div className="w-[5%]">Logo</div>
    <div className="w-[10%]">Symbol</div>
    <div className="w-[10%]">Name</div>
    <div className="w-[7.5%]">Price</div>
    <div className="w-[7.5%]">Liquidity</div>
    <div className="w-[7.5%]">Volume</div>
    <div className="w-[10%]">Price Change</div>
    <div className="w-[10%]">Market cap</div>
    <div className="w-[15%]">Day price range</div>
  </div>
);

export default TableHead;
