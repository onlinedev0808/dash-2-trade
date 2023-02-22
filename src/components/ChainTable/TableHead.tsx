const TableHead = () => {
  return (
    <div className="h-[51px] flex items-center font-normal text-sm leading-[16.8px] text-text-primary dark:text-text-primary-dark opacity-[0.5] border-y-2 border-[#313135]">
      <div className="w-[6.5%] ml-[24px]">Amount (Base)</div>
      <div className="w-[6.5%]">Amount (Trade)</div>
      <div className="w-[9.75%]">Amount (Quote)</div>
      <div className="w-[6.5%]">Trades</div>
      <div className="w-[17%]">Price Range</div>
      <div className="w-[9.75%]">Price (Median)</div>
      <div className="w-[9.75%]">Price (Open)</div>
      <div className="w-[9.75%]">Price (Close)</div>
      <div className="w-[10%]">Date</div>
      <div className="w-[6.5%]">Symbol (Base)</div>
      <div className="w-[8%]">Symbol (Quote)</div>
    </div>
  );
};

export default TableHead;
