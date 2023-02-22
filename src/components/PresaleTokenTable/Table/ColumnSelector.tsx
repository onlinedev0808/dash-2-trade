/* eslint-disable  react/jsx-props-no-spreading */
import { useState } from "react";
import { ColumnsSvg } from "../../CommonSvg";

const ColumnSelector = ({ columns }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative z-[3]">
      <button
        type="button"
        onClick={handleClick}
        className="leading-5
        px-4 h-full rounded
        text-text-primary dark:text-text-primary-dark
        border-1 border-[#F1F3FF]
        dark:border-0
        bg-white dark:bg-bg-highlight-dark
        hover:bg-foreground hover:dark:bg-foreground-dark
        flex items-center justify-center
        gap-3 duration-300 "
      >
        <ColumnsSvg w={13} h={11} />
        Columns
      </button>
      {isOpen ? (
        <div className="absolute -bottom-1 left-0 translate-y-[100%] rounded-2xl bg-highlight dark:bg-bg-highlight-dark p-4">
          {columns.map((column) => (
            <div key={column.id}>
              <label
                htmlFor={column.id}
                className="text-text-primary dark:text-text-primary-dark whitespace-nowrap"
              >
                <input
                  type="checkbox"
                  {...column.getToggleHiddenProps()}
                  id={column.id}
                />
                {` ${column.Header}`}
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ColumnSelector;
