/* eslint-disable @typescript-eslint/no-use-before-define */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../../../common/Button";
import Dropdown from "../common/Dropdown";
import StepLayout from "../StepLayout";
import { EditSvg, TrashCan } from "../../../CommonSvg";
import Input from "../common/Input";
import {
  INPUTS,
  IIndicator,
  EXCLUDE_PROPS,
  FILLED_STYLE,
} from "../common/utils";

const RowWrapper = ({ children, isMobile }) => (
  <div
    className={`grid ${
      children.filter((item) => item).length < 2 && isMobile
        ? "grid-cols-1"
        : "grid-cols-[30%,_minmax(0,_1fr)]"
    } px-2.5 py-3 gap-8 bg-foreground dark:bg-foreground-dark lg:bg-transparent lg:dark:bg-transparent rounded grow`}
  >
    {children}
  </div>
);

const Indicator = ({
  indicators,
  setIndicators,
  isMobile,
  indicator,
  TYPE_OPTIONS,
  isAdvanced,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");

  const updateIndicators = (option, category) => {
    const foundIndicator = indicators.find((item) => item.id === indicator.id);

    const foundCategoty = TYPE_OPTIONS.find((item) => item.label === category);
    const type = foundCategoty.options.find((item) => item.label === option);
    foundIndicator.label = option;

    foundIndicator.inputs = type.inputs;

    setIndicators([...indicators]);
  };

  const updateIndicator = (name, value) => {
    const foundIndicator = indicators.find((item) => item.id === indicator.id);

    const initialValues = foundIndicator.inputs.find(
      (item) => item.name === name
    ).initialValue;

    foundIndicator[name] = Array.isArray(initialValues)
      ? initialValues.find((item) => item.label === value)
      : value;

    const props = Object.keys(foundIndicator).filter(
      (it) => !EXCLUDE_PROPS.includes(it)
    );

    let baseTitle = "";

    props.forEach((key, index) => {
      if (typeof foundIndicator[key] === "object") {
        baseTitle += foundIndicator[key].title || foundIndicator[key].label;
      } else baseTitle += foundIndicator[key];

      if (index !== props.length - 1) baseTitle += ", ";
    });

    const title = `${foundIndicator.label}(${baseTitle})`;

    foundIndicator.title = title;

    setIndicators([...indicators]);
  };

  const handleUpdateIndicatorNickname = (value) => {
    const foundIndicator = indicators.find((item) => item.id === indicator.id);

    foundIndicator.nickname = value;
    setIndicators([...indicators]);
  };

  // const options = TYPE_OPTIONS.map((element) => ({
  //   ...element,
  //   options: element.options.filter((item) =>
  //     item.label.toLowerCase().includes(search.toLowerCase())
  //   ),
  // })).filter((element) => element.options.length);

  return (
    <div>
      <div className="flex gap-2.5" key={indicator.id}>
        <RowWrapper isMobile={isMobile}>
          <div className="flex h-fit items-center gap-4">
            {isEditMode ? (
              <Input
                placeholder="Nickname"
                value={indicator.nickname || indicator.label || ""}
                onChange={(e) => handleUpdateIndicatorNickname(e.target.value)}
                name="nickname"
              />
            ) : (
              // <Dropdown
              //   options={options}
              //   onChange={updateIndicators}
              //   value={indicator.nickname || indicator.label}
              //   hasSearch
              //   hasSubcategories
              //   search={search}
              //   setSearch={setSearch}
              //   styles=" "
              //   width="w-[16rem]"
              // />
              <div className="leading-none">
                {indicator.nickname || indicator.label}
              </div>
            )}

            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
              }}
            >
              <EditSvg />
            </button>
            <button
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

          <div className="flex flex-col gap-[1.125rem]">
            {indicator.inputs?.map((input) => {
              if (input.type === "data") {
                return (
                  <Dropdown
                    options={input.initialValue}
                    onChange={(option) => updateIndicator(input.name, option)}
                    value={indicator[input.name]?.label}
                    title={indicator[input.name]?.nickname || input.title}
                    key={input.id}
                    excludeId={indicator.id}
                    valueTitle={
                      indicator[input.name]?.nickname ||
                      indicator[input.name]?.title
                    }
                    styles={isAdvanced ? FILLED_STYLE : ""}
                  />
                );
              }

              if (input.type === "integer" || input.type === "float") {
                return (
                  <Input
                    label={input.title}
                    placeholder={input.placeholder}
                    value={indicator[input.name] || ""}
                    onChange={(e) =>
                      updateIndicator(e.target.name, e.target.value)
                    }
                    name={input.name}
                    type="number"
                    styles={isAdvanced ? FILLED_STYLE : ""}
                    key={input.id}
                    step={input.type === "integer" ? 1 : 0.01}
                  />
                );
              }

              return (
                <Input
                  label={input.title}
                  placeholder={input.placeholder}
                  value={indicator[input.name] || ""}
                  onChange={(e) =>
                    updateIndicator(e.target.name, e.target.value)
                  }
                  name="period"
                  key={input.id}
                  styles={isAdvanced ? FILLED_STYLE : ""}
                />
              );
            })}
          </div>
        </RowWrapper>
      </div>
    </div>
  );
};

export default Indicator;
