const TableRow = ({ row }) => {
  const { id, chain, price, liquidity, volume_12hr, volume_24hr, dex } = row;
  return (
    <div
      className={`h-[51px] flex items-center${
        id % 2 ? " hover:bg-highlight hover:dark:bg-highlight-dark" : ""
      }`}
    >
      <div className="w-[20%] text-sm leading-[16.8px] text-white pl-[20px]">
        {dex}
      </div>
      <div className="w-[12.5%] text-sm leading-[16.8px] text-white">
        {chain}
      </div>
      <div className="w-[12.5%] text-sm leading-[16.8px] text-white">
        $
        {price.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="w-[20%] text-sm leading-[16.8px] text-white">
        $
        {volume_12hr.toLocaleString("en-us", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
        M
      </div>
      <div className="w-[20%] text-sm leading-[16.8px] text-white">
        $
        {volume_24hr.toLocaleString("en-us", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
        M
      </div>
      <div className="w-[15%] text-sm leading-[16.8px] text-white">
        $
        {liquidity.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        M
      </div>
    </div>
  );
};

export default TableRow;
