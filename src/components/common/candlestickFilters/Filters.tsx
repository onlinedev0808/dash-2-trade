import axios from "axios";
import { differenceInDays, format } from "date-fns";
import { NextPage } from "next";
import { ChartSwitchSvg, DatePickerSvg } from "../../CommonSvg";
import DatePicker from "../DatePicker";
import DropdownItem from "./DropdownItem";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

interface IDropdownOption {
  name: string;
  value: string;
  exchanges?: string[];
  isSelected?: boolean;
  isDefault?: boolean;
  hasCustomValue?: boolean;
  placeholder?: string;
  params?: { name: string; value: string }[];
}

interface IFilters {
  onChangeToken?: (value) => void;
  token?: IDropdownOption;
  tokens?: IDropdownOption[];
  charts?: { id: number; name: string }[];
  selectedChart?: { id: number; name: string };
  onChangeChart?: (value) => void;
  onSelectPeriod?: (value) => void;
  periods?: IDropdownOption[];
  onSetCustomPeriod?: (value) => void;
  exchangesList?: IDropdownOption[];
  selectedExchange?: IDropdownOption;
  setSelectedExchange?: (value) => void;
  markets?: IDropdownOption[];
  selectedMarket?: IDropdownOption;
  setSelectedMarket?: (value) => void;
  intervals?: IDropdownOption[];
  selectedInterval?: IDropdownOption;
  setSelectedInterval?: (value) => void;
  indicators?: IDropdownOption[];
  setIndicators?: (value) => void;
}

const Filters: NextPage<IFilters> = ({
  charts,
  selectedChart,
  onChangeChart,
  onSelectPeriod,
  periods,
  onSetCustomPeriod,
  exchangesList,
  selectedExchange,
  setSelectedExchange,
  markets,
  selectedMarket,
  setSelectedMarket,
  intervals,
  selectedInterval,
  setSelectedInterval,
  indicators,
  setIndicators,
  tokens,
  onChangeToken,
  token,
}) => {
  const handleChangeRange = (ranges) => {
    if (differenceInDays(new Date(), ranges.startDate) === 6) {
      const period = periods.find((element) => element.name === "Week");
      if (!period) return;
      onSelectPeriod(period);
      return;
    }

    if (differenceInDays(new Date(), ranges.startDate) === 13) {
      const period = periods.find((element) => element.name === "2 Weeks");
      if (!period) return;
      onSelectPeriod(period);
      return;
    }

    if (differenceInDays(new Date(), ranges.startDate) === 29) {
      const period = periods.find((element) => element.name === "Month");
      if (!period) return;
      onSelectPeriod(period);
      return;
    }

    if (differenceInDays(new Date(), ranges.startDate) === 89) {
      const period = periods.find((element) => element.name === "3 Months");
      if (!period) return;
      onSelectPeriod(period);
      return;
    }

    if (differenceInDays(new Date(), ranges.startDate) === 364) {
      const period = periods.find((element) => element.name === "Year");
      if (!period) return;
      onSelectPeriod(period);
      return;
    }

    onSetCustomPeriod(
      `${format(ranges.startDate, "yyyy-MM-dd")},${format(
        ranges.endDate,
        "yyyy-MM-dd"
      )}`
    );

    const periodCustom = periods.find((element) => element.name === "Custom");
    if (!periodCustom) return;
    onSelectPeriod(periodCustom);
  };

  return (
    <div className="w-full flex items-end justify-between flex-wrap flex-row">
      <div className="flex flex-wrap gap-2 items-end grow">
        {tokens && tokens?.length ? (
          <div className="bg-highlight dark:bg-selector">
            <DropdownItem
              selectedItem={token}
              setSelectedItem={onChangeToken}
              items={tokens}
              title="Token"
            />
          </div>
        ) : null}
        {exchangesList && exchangesList?.length && selectedExchange ? (
          <div className="bg-highlight dark:bg-selector">
            <DropdownItem
              selectedItem={selectedExchange}
              setSelectedItem={setSelectedExchange}
              items={exchangesList}
              title="Exchange"
            />
          </div>
        ) : null}
        {markets && markets?.length && selectedMarket ? (
          <div className="bg-highlight dark:bg-selector">
            <DropdownItem
              selectedItem={selectedMarket}
              setSelectedItem={setSelectedMarket}
              items={markets}
              title="Market"
            />
          </div>
        ) : null}
        {intervals && intervals?.length && selectedInterval ? (
          <div className="bg-highlight dark:bg-selector">
            <DropdownItem
              selectedItem={selectedInterval}
              setSelectedItem={setSelectedInterval}
              items={intervals}
              title="Interval"
            />
          </div>
        ) : null}

        <div className="bg-highlight dark:bg-selector">
          <DropdownItem
            isMultiple
            items={indicators}
            setItems={setIndicators}
            title="Indicators"
          />
        </div>

        <div className="flex gap-2 h-fit items-end md:justify-end md:grow">
          <DatePicker
            onChange={handleChangeRange}
            classes="bg-highlight dark:bg-selector rounded p-2"
            buttonSvg={<DatePickerSvg />}
          />
          {charts?.length &&
            charts.map((option) => (
              <div
                key={option.id}
                onClick={() => onChangeChart(option)}
                className="cursor-pointer h-fit bg-highlight dark:bg-selector p-2 rounded"
              >
                <ChartSwitchSvg
                  type="token-specific"
                  name={option.name}
                  color={
                    selectedChart.name === option.name ? "#FFFFFF" : "#7A7F93"
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Filters;
