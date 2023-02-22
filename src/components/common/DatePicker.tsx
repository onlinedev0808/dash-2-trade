import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isSameDay,
  startOfDay,
} from "date-fns";
import { useRef, useState, useCallback, useEffect } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import { CalendarSvg } from "../CommonSvg";

const datePickerClasses = `
        [&_.rdrDateRangePickerWrapper]:shadow-xl
        [&_.rdrDateRangePickerWrapper]:rounded-lg
        [&_.rdrDefinedRangesWrapper]:rounded-l-lg
        [&_.rdrStaticRanges]:rounded-lg
        [&_.rdrStaticRange]:rounded-tl-lg
        [&_.rdrStaticRangeLabel]:rounded-lg
        [&_.rdrDateDisplayWrapper]:rounded-tr-lg
        [&_.rdrCalendarWrapper]:rounded-tr-lg
        [&_.rdrMonths]:rounded-br-lg
        [&_.rdrMonth]:rounded-br-lg
        [&_.rdrDateRangeWrapper]:rounded-br-lg
        [&_.rdrDateInput>*]:rounded-lg

        [&_.rdrInputRangeInput]:border-none

        [&_.rdrInRange~.rdrDayNumber_span]:!font-bold
        [&_.rdrStartEdge~.rdrDayNumber_span]:!font-bold
        [&_.rdrEndEdge~.rdrDayNumber_span]:!font-bold
        [&_.rdrInRange~.rdrDayNumber_span]:!text-button-primary-highlight
        [&_.rdrStartEdge~.rdrDayNumber_span]:!text-button-primary-highlight
        [&_.rdrEndEdge~.rdrDayNumber_span]:!text-button-primary-highlight
        [&_.rdrDayToday_span:after]:!bg-button-primary-highlight

        [&_.rdrDayStartPreview]:!bg-transparent
        [&_.rdrDayInPreview]:!bg-transparent
        [&_.rdrDayEndPreview]:!bg-transparent

        [&_*]:!bg-highlight
        [&_.rdrDefinedRangesWrapper]:border-navigation-background
        [&_.rdrDateDisplayWrapper]:!bg-navigation-background
        [&_.rdrDateDisplayWrapper>*]:!bg-navigation-background
        [&_.rdrNextPrevButton]:!bg-navigation-background
        [&_.rdrNextPrevButton>*]:!bg-navigation-background
        [&_.rdrMonthAndYearPickers_option]:!bg-navigation-background
        [&_.rdrInputRangeInput]:!bg-navigation-background
        [&_.rdrStaticRange_*:hover]:!bg-navigation-background
        [&_.rdrDayPassive>.rdrDayNumber>span]:text-text-secondary
        [&_.rdrDayNumber>span]:text-text-primary

        [&_*]:dark:!bg-highlight-dark
        [&_.rdrDefinedRangesWrapper]:dark:border-navigation-background-dark
        [&_.rdrDateDisplayWrapper]:dark:!bg-navigation-background-dark
        [&_.rdrDateDisplayWrapper>*]:dark:!bg-navigation-background-dark
        [&_.rdrNextPrevButton]:dark:!bg-navigation-background-dark
        [&_.rdrNextPrevButton>*]:dark:!bg-navigation-background-dark
        [&_.rdrMonthAndYearPickers_option]:dark:!bg-navigation-background-dark
        [&_.rdrInputRangeInput]:dark:!bg-navigation-background-dark
        [&_.rdrStaticRange_*:hover]:dark:!bg-navigation-background-dark
        [&_.rdrDayPassive>.rdrDayNumber>span]:dark:text-text-secondary-dark
        [&_.rdrDayNumber>span]:dark:text-text-primary-dark
        [&_.rdrMonthPicker>*]:dark:!bg-[#6780cd]
        [&_.rdrYearPicker>*]:dark:!bg-[#6780cd]`;

const DatePicker = ({ onChange, buttonSvg = null, classes = "" }) => {
  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);
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

  useEffect(() => {
    if (!isDatePickerShown) return;

    const bounding = calendarRef.current.getBoundingClientRect();

    if (window.innerWidth > bounding.width) {
      calendarRef.current.style.right = `0`;
      return;
    }

    if (bounding.width > dropdownRef.current?.getBoundingClientRect().y) {
      calendarRef.current.style.right = `${
        // eslint-disable-next-line no-unsafe-optional-chaining
        dropdownRef.current?.getBoundingClientRect().left - bounding.width
      }px`;
    }
  }, [isDatePickerShown]);

  return (
    <div className=" h-min" ref={dropdownRef}>
      <button
        className={classes || "rounded md:py-2 py-1 px-6"}
        type="button"
        onClick={() => setIsDatePickerShown(!isDatePickerShown)}
      >
        <span>{buttonSvg || <CalendarSvg />}</span>
      </button>
      {isDatePickerShown && (
        <div
          className="absolute z-10 border-1 border-text-primary rounded-lg"
          ref={calendarRef}
        >
          <DateRangePicker
            ranges={state}
            className={datePickerClasses}
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
