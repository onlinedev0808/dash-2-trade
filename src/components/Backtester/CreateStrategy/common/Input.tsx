/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { INPUT_STYLE, LABEL_STYLE } from "./utils";

const PLACEHOLDER = "Type...";

const Input = ({
  label = "",
  placeholder = "",
  value,
  onChange,
  name,
  type = "text",
  styles = "",
  min = 0,
  step = 1,
}) => {
  const style = styles || INPUT_STYLE;
  return (
    <div className="w-full">
      <label htmlFor={label}>
        <span className={LABEL_STYLE}>{label}</span>
      </label>
      <input
        className={`${style} bg-transparent w-full outline-none`}
        placeholder={placeholder || PLACEHOLDER}
        id={label}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        min={min}
        step={step}
      />
    </div>
  );
};

export default Input;
