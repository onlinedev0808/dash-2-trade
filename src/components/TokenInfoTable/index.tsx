import TableRow from "./TableRow";
import TableHead from "./TableHead";

const TokenInfoTable = () => {
  const rows = [
    {
      id: 1,
      dex: "Uniswap",
      chain: "Eth",
      price: 0.15,
      volume_12hr: 100,
      volume_24hr: 200,
      liquidity: 50
    },
    {
      id: 2,
      dex: "SushiSwap",
      chain: "Eth",
      price: 0.16,
      volume_12hr: 50,
      volume_24hr: 70,
      liquidity: 40
    }
  ];
  return (
    <div className="w-full bg-[#111112] rounded-[8px] lg:p-5 text-[#DBDFEA] overflow-x-scroll">
      <div className="">
        <div className="min-w-[650px]">
          <TableHead />
          {rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenInfoTable;
