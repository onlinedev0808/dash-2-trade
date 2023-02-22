import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { TooltipContext } from "../../contexts";

// eslint-disable-next-line no-shadow
export enum TooltipPosY {
  Top = "top",
  Middle = "middle",
  Bottom = "bottom",
}

// eslint-disable-next-line no-shadow
export enum TooltipPosX {
  Right = "Right",
  Left = "Left",
}

interface ITooltipProps {
  title?: string;
  message: string | React.ReactElement;
  className?: string;
  icon?: boolean;
  iconText?: string;
  iconTextClass?: string;
  positionX?: string;
  positionY?: string;
  children?: React.ReactElement;
  isNested?: boolean;
  tooltipContentClassname?: string;
  variant?: string;
}

const placements = {
  topLeft: {
    content: "top-0 left-[-1.25rem] translate-y-[-110%]",
    arrow: "bottom-0 left-5 rotate-180 translate-y-[100%]",
  },
  topRight: {
    content: "top-0 right-[-1.25rem] translate-y-[-110%]",
    arrow: "bottom-0 right-5 rotate-180 translate-y-[100%]",
  },
  middleLeft: {
    content: "top-0 translate-x-[-110%]",
    arrow: "right-0 translate-x-[80%] rotate-90 top-[10%]",
  },
  middleRight: {
    content: "top-0 translate-x-[82%]",
    arrow: "left-0 translate-x-[-80%] rotate-[-90deg] top-[10%]",
  },
  bottomRight: {
    content: "bottom-0 right-[-1.25rem] translate-y-[110%]",
    arrow: "top-0 right-5 translate-y-[-100%]",
  },
  bottomLeft: {
    content: "bottom-0 left-[-1.25rem] translate-y-[110%]",
    arrow: "top-0 left-5 translate-y-[-100%]",
  },
};

function Tooltip({
  title,
  message,
  children,
  icon,
  iconText = "",
  iconTextClass = "",
  positionX = "",
  positionY = "",
  className = "",
  isNested,
  tooltipContentClassname = "lg:min-w-[18.125rem] lg:max-w-[28.125rem]",
  variant = "default",
}: ITooltipProps): JSX.Element {
  const [activeTooltip, setActiveTooltip] = useContext(TooltipContext);
  const targetRef = useRef<HTMLInputElement>();
  const tooltipRef = useRef<HTMLInputElement>();

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  // const [isFixed, setIsFixed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [placement, setPlacement] = useState("topRight");

  const handleClick = (event) => {
    event.stopPropagation();
    // setIsFixed(true);
    if (activeTooltip !== targetRef.current) {
      setActiveTooltip(targetRef.current);
      return;
    }

    setActiveTooltip(null);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    // setIsFixed(false);
    setActiveTooltip(null);
  };
  const handleMouseEnter = (event) => {
    if (activeTooltip && activeTooltip !== targetRef.current) return;
    if (!isNested && event.target.classList.contains("nested-tooltip")) {
      setIsActive(false);
      return;
    }
    setIsActive(true);
  };
  const handleMouseLeave = () => {
    setIsActive(false);
  };

  let tooltipVisibility = isActive ? "flex" : "hidden";
  tooltipVisibility =
    activeTooltip === targetRef.current ? "flex" : tooltipVisibility;

  const placementSettings = placements[placement];

  const placementHandler = useCallback(() => {
    const targetClientRect = targetRef.current.getBoundingClientRect();
    const tooltipClientRect = tooltipRef.current.getBoundingClientRect();

    if (tooltipRef.current.height === 0) return;

    const screenPadding = 36;
    const topOffset = 64;

    const sidebarElement: HTMLElement | null =
      document.querySelector(`aside.w-sidebar`);

    const sidebarOffset = sidebarElement?.classList.contains("-left-[13.75rem]")
      ? 0
      : 220;

    let tooltipPosition;

    if (positionY) {
      tooltipPosition = positionY;
    } else {
      tooltipPosition =
        tooltipClientRect.height + screenPadding + topOffset <
        targetClientRect.y
          ? TooltipPosY.Top
          : TooltipPosY.Bottom;
    }

    if (positionX) {
      tooltipPosition += positionX;
    } else {
      tooltipPosition +=
        tooltipClientRect.width + screenPadding >
        targetClientRect.x - (!isMobile ? sidebarOffset : 0)
          ? TooltipPosX.Left
          : TooltipPosX.Right;
    }
    setPlacement(tooltipPosition);
  }, []);

  useEffect(() => {
    if (tooltipVisibility === "hidden") {
      window.removeEventListener("scroll", placementHandler, true);
      return;
    }

    if (tooltipVisibility !== "hidden") placementHandler();

    window.addEventListener("scroll", placementHandler, true);
    return () => {
      window.removeEventListener("scroll", placementHandler, true);
    };
  }, [tooltipVisibility, placementHandler]);

  return (
    <div className={`relative ${className} `}>
      <div
        ref={targetRef}
        onClick={handleClick}
        onMouseOver={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onFocus={() => {}}
        onBlur={() => {}}
        className="tooltip-container w-full cursor-pointer"
      >
        {icon ? (
          <div className="flex items-center">
            {iconText && (
              <span className={`pr-1 ${iconTextClass}`}>{iconText}</span>
            )}
            <div className="flex items-center relative w-3 h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4">
              <Image
                layout="fill"
                src={
                  variant === "filled" ? "/tooltip-filled.svg" : "/tooltip.svg"
                }
                alt=""
                className={`${isNested ? "nested-tooltip" : ""}`}
              />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
      <div
        ref={tooltipRef}
        className={`absolute z-10 flex-col ${placementSettings.content} ${tooltipVisibility}`}
        role="tooltip"
      >
        <div
          className={`
        tooltip-content  
        relative p-5 
        text-sm
        text-text-primary dark:text-text-primary-dark whitespace-no-wrap bg-white dark:bg-black shadow-lg rounded-md
        ${tooltipContentClassname}
        `}
        >
          <button
            className="tooltip-close absolute right-5 top-5 cursor-pointer text-lg leading-none"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="pb-3 pr-[6.25rem] whitespace-nowrap font-bold">
            {title}
          </div>
          <div>{message}</div>
        </div>
        <div
          className={`w-0 h-0 border-l-[0.625rem] border-l-transparent border-b-[0.75rem] border-b-white dark:border-b-black border-r-[0.625rem] border-r-transparent absolute ${placementSettings.arrow}`}
        />
      </div>
    </div>
  );
}

export default Tooltip;
