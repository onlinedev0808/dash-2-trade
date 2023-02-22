import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

import PriceChange from "../PriceChange";

const PriceHistory = ({ prices }: { prices: Array<number> }): JSX.Element => (
  <div className="border border-border-primary rounded-2xl relative max-w-[400px] px-8 py-6 text-center relative">
    <span className="absolute top-0 right-[50%] translate-y-[-50%]">
      <FontAwesomeIcon icon={faCaretUp} className="w-5 h-5" />
    </span>
    <div className="flex flex-row text-text-primary dark:text-text-secondary-dark text-sm border-b border-border-primary pb-2">
      <div className="w-[25%]">5M</div>
      <div className="w-[25%]">1H</div>
      <div className="w-[25%]">6H</div>
      <div className="w-[25%]">24H</div>
    </div>
    <div className="flex flex-row text-sm pt-2">
      {prices.map((price) => (
        <div className="w-[25%] flex justify-center px-5" key={uuidv4()}>
          <PriceChange price={Math.abs(price)} up={price > 0} suffix="%" />
        </div>
      ))}
    </div>
  </div>
);

export default PriceHistory;
