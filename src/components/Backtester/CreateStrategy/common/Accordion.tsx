import { useState } from "react";
import Button from "../../../common/Button";
import { DropdownFilledArrow } from "../../../CommonSvg";
import { StrategyStatusEnum } from "./utils";

const Accordion = ({ children, title, status, actions = [] }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="w-full py-6 border-b-1 border-b-solid border-b-separator flex flex-col justify-center">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-8">
              <h2 className="font-semibold">{title}</h2>
              <button
                className={`h-5 w-5 text-center leading-none text-white transition ease-in-out duration-500 ${
                  isOpened && "-rotate-180"
                }`}
                onClick={() => setIsOpened(!isOpened)}
              >
                <DropdownFilledArrow />
              </button>
            </div>

            <div
              className={`py-1 px-6 rounded text-center ${
                status === StrategyStatusEnum.Complete && "bg-green"
              } ${
                status === StrategyStatusEnum.InProgress &&
                "bg-background-light-dark"
              } ${status === StrategyStatusEnum.Failed && "bg-red"}`}
            >
              {status}
            </div>
          </div>

          {actions.map((action) => (
            <Button
              key={action.id}
              color={action.variant}
              size="small"
              onClick={action.onClick}
            >
              {action.icon} <span className="ml-2">{action.text}</span>
            </Button>
          ))}
        </div>

        <div
          className={`transition-all linear duration-500 ${
            isOpened ? "max-h-[100vh]" : "max-h-0 "
          } h-auto overflow-hidden`}
        >
          <div className="pt-[1.125rem]">
            <div className="rounded-card bg-foreground dark:bg-background-secondary-dark px-7 py-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
