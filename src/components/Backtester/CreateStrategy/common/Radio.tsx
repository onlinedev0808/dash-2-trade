import Tooltip, { TooltipPosY } from "../../../common/Tooltip";

const RadioButton = ({
  name,
  label,
  value,
  onChange,
  formValue = "",
  hasTooltip = false,
}) => (
  <div className="flex items-center gap-2.5">
    <input
      className="appearance-none w-5 h-5 border-solid border-1 border-border-primary checked:border-button-primary rounded-full place-content-center grid checked:before:content-[''] checked:before:w-2 checked:before:h-2 checked:bg-button-primary checked:before:bg-white checked:before:rounded-full"
      type="radio"
      name={name}
      id={label}
      value={value}
      onChange={onChange}
      checked={value === formValue}
    />
    <label htmlFor={label} className="flex gap-2">
      <span>{label}</span>
      {hasTooltip && (
        <Tooltip
          title="Title"
          message="Description"
          positionY={TooltipPosY.Bottom}
          icon
          variant="filled"
        />
      )}
    </label>
  </div>
);

export default RadioButton;
