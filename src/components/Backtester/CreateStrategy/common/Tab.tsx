import Tooltip, { TooltipPosY } from "../../../common/Tooltip";
import { DropdownFilledArrow, TabIcon } from "../../../CommonSvg";
import { ACTIVE_TAB_STYLE } from "../SignalGeneration/utils";

export const TabButton = ({
  isActive,
  onClick,
  title,
  isMobile = false,
  icon = null,
  activeColor = "",
  hasTooltip = false,
}) => (
  <button
    className={`py-3.5 px-8 ${
      isActive && ACTIVE_TAB_STYLE
    } flex items-center gap-2`}
    onClick={onClick}
  >
    {icon && <TabIcon icon={icon} color={isActive ? activeColor : ""} />}

    {title}
    {hasTooltip && (
      <Tooltip
        title="Title"
        message="Description"
        positionY={TooltipPosY.Bottom}
        icon
        variant="filled"
      />
    )}
    {isMobile && (
      <div>
        <DropdownFilledArrow />
      </div>
    )}
  </button>
);

const TabWrapper = ({ children }) => (
  <div className="bg-foreground dark:bg-foreground-dark px-4 py-6 rounded-b-lg rounded-tr-lg mb-6 max-w-full">
    {children}
  </div>
);

export default TabWrapper;
