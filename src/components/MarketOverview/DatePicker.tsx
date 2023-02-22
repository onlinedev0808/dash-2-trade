import {
  addDays,
  isSameDay,
  differenceInCalendarDays,
  endOfDay,
  startOfDay,
} from "date-fns";
import { useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import { CalendarSvg } from "../CommonSvg";

const DatePicker = ({ onChange }) => {
  const dropdownRef = useRef(null);
  const [isDatePickerShown, setIsDatePickerShown] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      maxDate: new Date(),
      color: "#5367FE",
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  return (
    <div className="relative h-min" ref={dropdownRef}>
      <button
        className="rounded md:py-2 py-1 px-6"
        type="button"
        onClick={() => setIsDatePickerShown(!isDatePickerShown)}
      >
        <span>
          <CalendarSvg />
        </span>
      </button>
      {isDatePickerShown && (
        <div className="absolute">
          <DateRangePicker
            ranges={state}
            onChange={handleOnChange}
            /*showSelectionPreview*/
            direction="horizontal"
            inputRanges={[
              {
                label: "days up to today",
                range(value) {
                  return {
                    startDate: addDays(
                      startOfDay(new Date()),
                      (Math.max(Number(value), 1) - 1) * -1
                    ),
                    endDate: endOfDay(new Date()),
                  };
                },
                getCurrentValue(range) {
                  if (!isSameDay(range.endDate, endOfDay(new Date())))
                    return "-";
                  if (!range.startDate) return "∞";
                  return (
                    differenceInCalendarDays(
                      endOfDay(new Date()),
                      range.startDate
                    ) + 1
                  );
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
