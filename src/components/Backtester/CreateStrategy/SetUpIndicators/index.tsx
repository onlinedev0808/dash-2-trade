/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Button from "../../../common/Button";
import StepLayout from "../StepLayout";
import { INPUTS, IIndicator, FILLED_STYLE } from "../common/utils";
import Indicator from "./Indicator";
import useDetectOutsideClick from "../../../../hooks/useDetectOutsideClick";
import Input from "../common/Input";
import { TrashCan } from "../../../svg";

const AddIndicatorDropdown = ({ types, indicators, setIndicators }) => {
  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  const [search, setSearch] = useState("");

  const options = types
    .map((element) => ({
      ...element,
      options: element.options.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((element) => element.options.length);

  return (
    <div ref={dropdownRef} className="w-full flex flex-col grow relative">
      <button
        onClick={() => setIsOpened(!isOpened)}
        className="flex justify-between relative w-full items-center"
      >
        <div className="text-button-primary flex gap-3 items-center">
          <div
            className={`${
              isOpened && "rotate-45"
            } transition ease-in-out duration-300`}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          Add Indicator
        </div>
      </button>

      {isOpened && (
        <ul
          className={`w-[19rem] transition-all absolute ease-in-out duration-300 top-[3rem] z-[1] rounded-xl pt-3 pb-1.5 px-4 bg-highlight dark:bg-background-secondary-dark ${
            isOpened ? "max-h-[25rem]" : "max-h-0"
          } overflow-y-scroll h-auto`}
        >
          <li className="mb-2">
            <Input
              label=""
              placeholder="Search for indicators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="period"
              styles={`${FILLED_STYLE} placeholder:text-sm dark:bg-[#1D233A]`}
            />
          </li>

          {options?.map(({ label: category, options: itemOptions, id }) => (
            <li
              key={id}
              className="flex flex-col justify-center border-b-1 border-b-solid border-separator-blue"
            >
              {category && (
                <div className="flex items-center gap-3 outline-none w-full h-9">
                  <span className="block truncate text-xs md:text-sm font-semibold text-button-primary">
                    {category}
                  </span>
                </div>
              )}
              <ul>
                {itemOptions.map((item, key) => {
                  const itemTitle = item.label;

                  return (
                    <li
                      onClick={() => {
                        const input = {
                          ...item,
                          id: INPUTS.length + 1,
                          label: itemTitle,
                        };
                        setIndicators([...indicators, input]);

                        INPUTS.push(input);

                        setIsOpened(false);
                      }}
                      key={key}
                      className="flex items-center h-9"
                    >
                      <button className="flex justify-between outline-none w-full">
                        <span className="block truncate text-xs md:text-xs">
                          {itemTitle}
                        </span>
                        <span className="block rounded-full h-4 w-4 border-1 border-solid border-separator-blue" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SetUpIndicators = ({
  indicators,
  setIndicators,
  isMobile,
  isAdvanced,
}) => {
  useEffect(
    () => () => {
      INPUTS.splice(5);
    },
    []
  );

  useEffect(() => {
    if (!indicators.length) INPUTS.splice(5);
  }, [indicators]);

  return (
    <StepLayout title="Set up Indicators" isMobile={isMobile}>
      <div className="w-full lg:w-2/3 md:w-3/4 flex flex-col gap-4">
        {isAdvanced
          ? indicators.map((indicator) => (
              <Indicator
                key={indicator.id}
                indicators={indicators}
                indicator={indicator}
                setIndicators={setIndicators}
                TYPE_OPTIONS={TYPE_OPTIONS}
                isMobile={isMobile}
                isAdvanced={isAdvanced}
              />
            ))
          : indicators.map((indicator, index) => (
              <div key={indicator.id} className="flex flex-col gap-2.5">
                <span className="text-xs uppercase">Indicator {index + 1}</span>
                <div className="flex gap-2.5">
                  <div
                    className={`${FILLED_STYLE} w-full text-sm text-text-secondary dark:text-text-secondary-dark`}
                  >
                    {indicator.label}
                  </div>
                  <button
                    className="w-fit"
                    onClick={() => {
                      const inputIndex = INPUTS.findIndex(
                        (input) => input.id === indicator.id
                      );
                      const currentIndicators = indicators.filter(
                        (item) => item.id !== indicator.id
                      );
                      setIndicators(currentIndicators);

                      INPUTS.splice(inputIndex, 1);
                    }}
                  >
                    <TrashCan />
                  </button>
                </div>
              </div>
            ))}
        <AddIndicatorDropdown
          indicators={indicators}
          setIndicators={setIndicators}
          types={TYPE_OPTIONS}
        />
        {/* <div>
          <Button color="transparent" onClick={handleAddIndicator}>
            <div className="flex gap-3 items-center">
              <FontAwesomeIcon icon={faPlus} />
              Add Indicator
            </div>
          </Button>
        </div> */}
      </div>
    </StepLayout>
  );
};

export default SetUpIndicators;

const BASE_PERIOD = 1;
const BASE_FLOAT = 0.1;

const TYPE_OPTIONS: IIndicator[] = [
  {
    id: 1,
    label: "Math Operators", // category
    options: /* indicators */ [
      {
        id: 1,
        label: "LAG",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 2,
        label: "MATH_SUM",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "target_input2",
            type: "data",
            initialValue: INPUTS,
            title: "Target 2",
          },
        ],
      },
      {
        id: 3,
        label: "MATH_DIFF",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "target_input2",
            type: "data",
            initialValue: INPUTS,
            title: "Target 2",
          },
        ],
      },
      {
        id: 4,
        label: "MATH_PROD",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "target_input2",
            type: "data",
            initialValue: INPUTS,
            title: "Target 2",
          },
        ],
      },
      {
        id: 5,
        label: "MATH_DIV",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "target_input2",
            type: "data",
            initialValue: INPUTS,
            title: "Target 2",
          },
        ],
      },
      {
        id: 6,
        label: "STDDEV",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            title: "Target",
            initialValue: INPUTS,
          },
          {
            id: 3,
            name: "nbdev",
            type: "float",
            initialValue: BASE_FLOAT,
            title: "nbdev",
            placeholder: "0.95",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Volume related", // category
    options: /* indicators */ [
      { id: 7, label: "AD" }, // input: 'None'
      {
        id: 8,
        label: "ADOSC",
        inputs: [
          {
            id: 1,
            name: "fastperiod",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Fast Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "flowperiod",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Flow Period",
            placeholder: "1",
          },
        ],
      },
      { id: 9, label: "OBV" }, // input: 'None'
    ],
  },
  {
    id: 3,
    label: "Momentum indicators",
    options: [
      {
        id: 10,
        label: "ADX",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 11,
        label: "AROON",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 12,
        label: "AROONOSC",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 13,
        label: "APO",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 3,
            name: "fastperiods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Fast Period",
            placeholder: "1",
          },
          {
            id: 4,
            name: "slowperiod",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Slow Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 14,
        label: "BOP",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 15,
        label: "CCI",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 16,
        label: "MFI",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 17,
        label: "PPO",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "fastperiods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Fast Period",
            placeholder: "1",
          },
          {
            id: 3,
            name: "slowperiod",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Slow Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 18,
        label: "ROC",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 19,
        label: "RSI",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      { id: 20, label: "STOCH" }, // input: 'None'
      { id: 21, label: "STOCHF" }, // input: 'None'
      {
        id: 22,
        label: "STOCHRSI",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
      {
        id: 23,
        label: "TRIX",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 24,
        label: "WILLR",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Volatility indicators",
    options: [
      {
        id: 25,
        label: "ATR",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 26,
        label: "NATR",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      { id: 27, label: "TRANGE" }, // target_input1: 'None'
    ],
  },
  {
    id: 5,
    label: "Averages",
    options: [
      {
        id: 28,
        label: "SMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 29,
        label: "EMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 30,
        label: "DEMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 31,
        label: "KAMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 32,
        label: "MA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 33,
        label: "MAMA",
        inputs: [
          {
            id: 1,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
          {
            id: 2,
            name: "fastlimit",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Fast Limit",
            placeholder: "1",
          },
          {
            id: 3,
            name: "slowlimit",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Slow Limit",
            placeholder: "1",
          },
        ],
      },
      {
        id: 34,
        label: "TRIMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 35,
        label: "TEMA",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 36,
        label: "T3",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 37,
        label: "TSF",
        inputs: [
          {
            id: 1,
            name: "periods",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Period",
            placeholder: "1",
          },
          {
            id: 2,
            name: "target_input1",
            type: "data",
            initialValue: INPUTS,
            title: "Target",
          },
        ],
      },
      {
        id: 37,
        label: "SAR",
        inputs: [
          {
            id: 1,
            name: "acceleration",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration",
            placeholder: "1",
          },
          {
            id: 2,
            name: "maximum",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Maximum",
            placeholder: "1",
          },
        ],
      },
      {
        id: 39,
        label: "SAREXT",
        inputs: [
          {
            id: 1,
            name: "accelerationinitlong",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration",
            placeholder: "1",
          },
          {
            id: 2,
            name: "accelerationlong",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Maximum",
            placeholder: "1",
          },
          {
            id: 3,
            name: "accelerationmaxlong",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration Max Long",
            placeholder: "1",
          },
          {
            id: 4,
            name: "accelerationinitshort",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration Init Short",
            placeholder: "1",
          },
          {
            id: 5,
            name: "accelerationshort",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration Short",
            placeholder: "1",
          },
          {
            id: 6,
            name: "accelerationmaxshort",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Acceleration Max Long",
            placeholder: "1",
          },
          {
            id: 7,
            name: "startvalue",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Start Value",
            placeholder: "1",
          },
          {
            id: 8,
            name: "offsetoneverse",
            type: "integer",
            initialValue: BASE_PERIOD,
            title: "Offset on Reverse",
            placeholder: "1",
          },
        ],
      },
    ],
  },
];
