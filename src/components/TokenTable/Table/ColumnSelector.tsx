/* eslint-disable  react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { ColumnsSvg, MenuItemArrow } from "../../CommonSvg";

interface IProps {
  columns: Array<any>;
  isNested?: boolean;
  btnClasses?: string;
}

const ColumnSelector = ({
  columns,
  isNested = false,
  btnClasses = "",
}: IProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [localCols, setLocalCols] = useState({});
  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (e) => {
    setLocalCols((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));
    const colProps = columns
      .find((col) => col.id === e.target.name)
      .getToggleHiddenProps();
    colProps.onChange(e);
  };

  const btnNestedClasses =
    "!bg-transparent border-0 text-xs justify-between w-full m-0 px-0 py-2 md:py-2.5 ";

  useEffect(() => {
    const initState = {};
    columns.map((col) => {
      initState[col.id] = col.getToggleHiddenProps().checked;
      return null;
    });
    setLocalCols({ ...initState });
  }, [columns]);

  return (
    <div className="h-full relative z-[3]">
      <button
        type="button"
        onClick={handleClick}
        className={`leading-5
        px-4 h-full rounded
        text-text-primary dark:text-text-primary-dark
         bg-highlight dark:bg-selector
        flex items-center justify-center
        gap-3 duration-300  ${isNested && btnNestedClasses} ${btnClasses}`}
      >
        Columns
        {!isNested ? (
          <ColumnsSvg w={13} h={11} />
        ) : (
          <div
            className={`transition duration-250 ease-in-out ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <MenuItemArrow />
          </div>
        )}
      </button>
      {/* FIXME: refactor me */}
      {!isNested ? (
        <div
          className={`bg-highlight dark:bg-selector rounded absolute z-10 top-[3rem] px-3
        transition-all ease-in-out duration-300 w-max
       ${isOpen ? "max-h-[12.8rem]" : "max-h-0"}`}
        >
          <ul
            className={`py-2 overflow-y-scroll h-auto transition-all ease-in-out duration-300
            ${isOpen ? "max-h-[12.8rem]" : "max-h-0"}`}
          >
            {isOpen &&
              columns.map((column) => (
                <li key={column.id}>
                  <label
                    htmlFor={column.id}
                    className="text-text-primary dark:text-text-primary-dark whitespace-nowrap"
                  >
                    <input
                      type="checkbox"
                      id={column.id}
                      name={column.id}
                      checked={localCols[column.id]}
                      onChange={handleCheckboxChange}
                    />
                    {` ${column.Header}`}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <ul
          className={`overflow-y-scroll h-auto transition-all ease-in-out duration-300
          ${isOpen ? "max-h-[12.8rem] py-2" : "max-h-0"}`}
        >
          {isOpen &&
            columns.map((column) => (
              <li key={column.id}>
                <label
                  htmlFor={column.id}
                  className="text-text-primary dark:text-text-primary-dark whitespace-normal"
                >
                  <input
                    type="checkbox"
                    id={column.id}
                    name={column.id}
                    checked={localCols[column.id]}
                    onChange={handleCheckboxChange}
                  />
                  {` ${column.Header}`}
                </label>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ColumnSelector;
