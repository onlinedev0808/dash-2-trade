import { useState, useEffect } from "react";
import SelectBox from "../../../common/SelectBox";

const OPTIONS = [
  { label: "% 24H", value: "1d" },
  { label: "% 1 Week", value: "1w" },
  { label: "% 2 Weeks", value: "2w" },
  { label: "% 1 Month", value: "1m" },
  { label: "% 3 Months", value: "3m" },
  { label: "% Year", value: "1y" },
];

interface IOption {
  value: string;
  label: string;
}

const PeriodSelectBox = ({
  onChange,
}: {
  onChange: (option: IOption) => void;
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<IOption>(OPTIONS.at(0));

  const handleSelectOption = (option: IOption) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  return (
    <SelectBox
      onChange={handleSelectOption}
      value={selectedOption}
      options={OPTIONS}
      style={{
        button: {
          default:
            "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 p-2 rounded border border-border-primary w-full",
        },
        list: "bg-highlight dark:bg-highlight-dark rounded-0 w-full",
      }}
      className="w-full"
    />
  );
};

export default PeriodSelectBox;
