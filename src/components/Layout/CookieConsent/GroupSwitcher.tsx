import React from "react";
import ToggleForm from "../../Setting/ToggleForm";
import Tooltip from "../../common/Tooltip";

const GroupSwitcher = ({
  title,
  isActive,
  enable,
  tooltip = null,
}): JSX.Element => {
  return (
    <div className="flex gap-3 items-center">
      <ToggleForm isActive={isActive} onChange={enable} />
      <span className="text-lg leading-[1.875rem] text-text-primary dark:text-text-primary-dark font-medium">
        {title}
      </span>
      {tooltip && <Tooltip message={tooltip.message} icon />}
    </div>
  );
};

export default GroupSwitcher;
