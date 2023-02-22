import { useState, useEffect } from "react";
import SelectBox from "../../../common/SelectBox";

const OPTIONS = [
  { label: "% 24H", id: "24h" },
  { label: "% 6H", id: "6h" },
  { label: "% 1H", id: "1h" },
  { label: "% 5M", id: "5m" },
];

interface IOption {
  id: string;
  label: string;
}

const PriceSelectBox = ({
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
            "bg-highlight dark:bg-highlight-dark text-left text-text-primary dark:text-text-primary-dark px-3 p-2 rounded border border-border-primary w-[6.25rem]",
        },
        list: "bg-highlight dark:bg-highlight-dark rounded-0 w-[6.25rem]",
      }}
    />
  );
};

export default PriceSelectBox;
