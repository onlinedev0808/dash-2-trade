import Button from "../../common/Button";
import { ArrowsSvg } from "../../CommonSvg";

const TradeHistory = ({ rows }) => (
  <div className="">
    <h2 className="text-xl mb-8">Trade History</h2>
    <div className="grid grid-cols-7 w-full h-8">
      <div className="text-left font-medium text-sm flex gap-2">
        Start Date
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-left font-medium text-sm flex gap-2">
        End Date
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-left font-medium text-sm flex gap-2 justify-center">
        Entry quantity
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-left font-medium text-sm flex gap-2 justify-center">
        Exit amoount
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-left font-medium text-sm flex gap-2 justify-center">
        Net gain
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-left font-medium text-sm flex gap-2 justify-center">
        Net gain %
        <span className="cursor-pointer text-text-secondary dark:text-text-secondary-dark">
          <ArrowsSvg />
        </span>
      </div>
      <div className="text-right justify-end font-medium text-sm flex gap-2">
        Action
      </div>
    </div>

    {rows.map((row, index) => (
      <div
        key={index}
        className="grid grid-cols-7 w-full py-3 border-b-1 border-b-solid border-b-separator"
      >
        <div className="text-sm flex justify-center flex-col">
          {row.start}
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
            {row.startTime}
          </span>
        </div>
        <div className="text-sm flex justify-center flex-col">
          {row.end}
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
            {row.endTime}
          </span>
        </div>
        <div className="text-sm flex items-center justify-center">
          {row.entry}
        </div>
        <div className="text-sm flex items-center justify-center">
          {row.exit}
        </div>
        <div className="text-sm flex items-center justify-center">
          <span className={`${row.gain < 0 ? "text-red" : "text-green"}`}>
            {row.gain} USDT
          </span>
        </div>
        <div className="text-sm flex items-center text-green justify-center">
          <span className={`${row.gain < 0 ? "text-red" : "text-green"}`}>
            {row.change}%
          </span>
        </div>
        <div className="text-sm flex justify-end">
          <Button>Details</Button>
        </div>
      </div>
    ))}
  </div>
);

export default TradeHistory;
