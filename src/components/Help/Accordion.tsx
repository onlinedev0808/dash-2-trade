import { useState } from "react";

interface IAccordionItemProps {
  titleClasses?: string;
  title: string;
  icon: any[2];
  childrenClasses?: string;
  children: React.ReactNode;
  classes: string;
}

const Accordion = ({
  titleClasses,
  title,
  icon,
  childrenClasses,
  children,
  classes,
}: IAccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenClose = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={`${classes}`}>
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleOpenClose}
      >
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 rounded-t-xl  bg-none dark:bg-none dark:text-white"
        >
          <span className={`${titleClasses}`}>{title}</span>
          <span>{isOpen ? icon[1] : icon[0]}</span>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen py-3 mt-5" : "max-h-0"
        } ${childrenClasses} overflow-hidden h-auto transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
