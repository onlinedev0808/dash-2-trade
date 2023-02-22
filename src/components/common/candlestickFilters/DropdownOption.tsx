/* eslint-disable no-nested-ternary */
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface IOption {
  name: string;
  value: string;
  isSelected?: boolean;
  isDefault?: boolean;
  hasCustomValue?: boolean;
  placeholder?: string;
  params?: { name: string; value: string }[];
}
interface IDropdownItemProps {
  selectedItem?: IOption;
  setSelectedItem?: (value: IOption) => void;
  items: IOption[];
  setItems?: (value: IOption[]) => void;
  hasCustomValue?: boolean;
  customValue?: string;
  onChangeCustomValue?: (value: string) => void;
  isMultiple?: boolean;
  option: any;
}

const DropdownOption: NextPage<IDropdownItemProps> = ({
  setSelectedItem,
  items,
  setItems,
  isMultiple,
  option,
}) => (
  <div>
    <button
      onClick={() => {
        if (isMultiple) {
          const options = items.map((item) => {
            if (option.value === "obv" && item.value === "volume") {
              return { ...item, isSelected: true };
            }

            if (item === option) {
              return { ...item, isSelected: !item.isSelected };
            }
            return item;
          });
          setItems(options);
        } else {
          setSelectedItem(option);
        }
      }}
      type="button"
      className="md:py-2 py-1 pl-3 pr-4 w-full text-left flex justify-between items-center"
    >
      <span>{option.name}</span>
      <div className="flex">
        {option.hasCustomValue &&
          option.params?.length &&
          option.params.map((parameter, index) => (
            <input
              key={index}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="ml-4 md:py-2 py-1 px-3 w-20 outline-none rounded bg-foreground dark:bg-foreground-dark self-end"
              type="text"
              placeholder={option.placeholder}
              value={parameter.value}
              onChange={(e) => {
                e.stopPropagation();
                const options = items.map((item) => {
                  if (!item.params) return item;
                  const params = item.params.map((param) => {
                    if (param === parameter) {
                      return { ...param, value: e.target.value };
                    }

                    return param;
                  });

                  if (item === option) {
                    return { ...item, params, isSelected: true };
                  }
                  return item;
                });
                setItems(options);
              }}
            />
          ))}
        {isMultiple && (
          <div className="ml-2 w-3">
            {option.isSelected && !option.isDefault && (
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  const options = items.map((item) => {
                    if (item === option) {
                      return { ...item, isSelected: false };
                    }
                    return item;
                  });
                  setItems(options);
                }}
              >
                <FontAwesomeIcon icon={faClose} className="w-3" />
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  </div>
);

export default DropdownOption;
