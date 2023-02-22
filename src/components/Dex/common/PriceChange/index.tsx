import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const PriceChange = ({
  price,
  up,
  suffix,
}: {
  price: number;
  up: boolean;
  suffix?: string;
}) => (
  <span
    className={`flex items-center whitespace-nowrap ${
      up ? "text-green" : "text-red"
    }`}
  >
    <FontAwesomeIcon
      icon={up ? faCaretUp : faCaretDown}
      className="mr-[6px] w-3 h-3 flex items-center"
    />
    {price} {suffix}
  </span>
);

export default PriceChange;
