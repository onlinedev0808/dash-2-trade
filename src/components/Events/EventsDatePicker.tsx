import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, Range } from "react-date-range";
import { SearchSvg } from "../CommonSvg";

import styles from "./DateRangePicker.module.scss";

const classes = `
flex justify-center

[&_.rdrInputRanges]:hidden
[&_.rdrDefinedRangesWrapper]:hidden

[&_.rdrDateDisplayWrapper]:rounded-3xl
[&_.rdrMonthAndYearWrapper]:rounded-t-3xl
[&_.rdrExtraContent]:rounded-b-3xl

[&_.rdrNextPrevButton]:bg-transparent
[&_.rdrDateDisplayWrapper]:bg-transparent

[&_.rdrNextPrevButton]:m-0
[&_.rdrMonthAndYearWrapper]:px-[1.5rem]
[&_.rdrMonth]:px-[1.5rem]

[&_.rdrDay]:h-[2.35rem]
[&_.rdrDay]:mb-[0.6rem]
[&_.rdrDay]:leading-normal  
[&_.rdrDay>*]:h-[2.35rem]

[&_.rdrDayStartPreview]:top-[5px]
[&_.rdrDayInPreview]:top-[5px]
[&_.rdrDayEndPreview]:top-[5px]

[&_.rdrMonthAndYearPickers]:text-larger
[&_.rdrDayNumber]:text-larger
[&_.rdrWeekDay]:text-larger

[&_.rdrCalendarWrapper]:dark:bg-transparent
[&_.rdrNextPrevButton:hover]:dark:bg-background-dark

[&_.rdrStartEdge]:dark:bg-iris-base
[&_.rdrInRange]:dark:bg-background-tertiary-dark
[&_.rdrEndEdge]:dark:bg-iris-base

[&_.rdrNextPrevButton]:dark:text-text-primary-dark
[&_.rdrMonthAndYearPickers_select]:dark:text-text-primary-dark
[&_.rdrDayNumber>span]:dark:text-text-primary-dark
[&_.rdrDayPassive>.rdrDayNumber>span]:dark:text-text-secondary-dark
`;

const Extra = ({ isFetching, onClick, onReset }) => {
  return (
    <div className="flex flex-col items-center mb-10 text-larger">
      <button
        type="button"
        onClick={onClick}
        disabled={isFetching}
        className="w-[15rem] h-[3.5rem] rounded-4px py-2 px-3 mb-4
      flex items-center justify-center gap-2
      cursor-pointer text-text-primary-dark bg-button-primary"
      >
        Search for events <SearchSvg />
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={isFetching}
        className="w-full flex items-center justify-center cursor-pointer
            dark:text-text-primary-dark"
      >
        Reset
      </button>
    </div>
  );
};

const EventsDatePicker = ({
  ranges,
  onChange,
  onSubmit,
  onReset,
  isFetching,
}: {
  ranges: Range[];
  isFetching: boolean;
  onChange: () => void;
  onSubmit: () => void;
  onReset: () => void;
}) => {
  return (
    <div>
      <div className={`w-full ${styles.d2tDatePicker}`}>
        <DateRangePicker
          className={classes}
          editableDateInputs
          // showMonthAndYearPickers={false}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          ranges={ranges}
          // onChange={(item) => setState([item.selection])}
          onChange={onChange}
          inputRanges={[]}
          staticRanges={[]}
          classNames={{
            nextPrevButton: "d2tNavButtonsClassName ",
            prevButton: "d2tPrevButtonClassName",
            nextButton: "d2tNextButtonClassName",
          }}
        />
      </div>

      <Extra onClick={onSubmit} onReset={onReset} isFetching={isFetching} />
    </div>
  );
};

export default EventsDatePicker;
