const CustomInput = ({
  label,
  name,
  errorText,
  type = "",
  onChange,
  value,
  onFocus = null,
  onBlur = null,
}) => (
  <>
    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
      {label}
    </p>
    <input
      className="text-text-primary dark:text-text-primary-dark bg-highlight dark:bg-highlight-dark px-2 py-1 mb-1 mt-2 rounded-lg shadow-lg border-1 w-full border-border-primary"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    <p className="text-red text-center text-sm">{errorText}</p>
  </>
);

export default CustomInput;
