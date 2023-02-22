/* eslint-disable  react/jsx-props-no-spreading */
import { useState } from "react";

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
        className="text-base leading-5 text-text-primary dark:text-text-primary-dark bg-button-primary px-4 py-2.5 rounded hover:bg-[#4357FE] flex items-center justify-center gap-5 duration-300 "
      >
        Columns
      </button>
      {isOpen ? (
        <div className="absolute -bottom-1 left-0 translate-y-[100%] rounded-2xl bg-highlight dark:bg-highlight-dark p-2.5">
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
