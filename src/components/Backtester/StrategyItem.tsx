import { format } from "date-fns";
import { ColorsEnum } from "../../theme";
import Button from "../common/Button";
import { EditSvg, MenuSvg, StrategySvg } from "../CommonSvg";

const StrategyItem = ({ title, start, end, hasBorder, logo }) => (
  <div
    className={`flex justify-between items-center py-3 ${
      hasBorder && "border-t-1 border-t-solid border-t-separator"
    }`}
  >
    <div className="flex items-center gap-4">
      {logo ? <img src={logo} alt={title} /> : <StrategySvg />}

      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2 items-center">
          <h3 className="text-sm">{title}</h3>
          <button onClick={() => {}}>
            <EditSvg color={ColorsEnum.TextSecondaryLight} />
          </button>
        </div>

        <h4 className="text-sm text-text-secondary dark:text-text-secondary-dark">
          {format(start, "MM/dd/yyyy")} - {format(end, "MM/dd/yyyy")}
        </h4>
      </div>
    </div>

    <div className="flex gap-2.5">
      <Button onClick={() => {}} color="transparent-white">
        <span className="hidden lg:block">Edit</span>
        <span className="block lg:hidden">
          <EditSvg />
        </span>
      </Button>
      <Button onClick={() => {}} color="outline">
        view
      </Button>
      <Button onClick={() => {}} color="transparent">
        <MenuSvg />
      </Button>
    </div>
  </div>
);

export default StrategyItem;
