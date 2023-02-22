const Checkbox = ({
  children,
  label,
  checked = false,
  onChange,
  error = "",
}) => (
  <>
    <div className="flex items-start mb-4">
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 text-button-primary outline-none rounded focus:ring-[transparent] dark:focus:ring-[transparent]"
        checked={checked}
        id={label}
        onChange={onChange}
      />

      <label className="ml-2 text-sm" htmlFor={label}>
        {children}
      </label>
    </div>
    {error && <span className="text-red text-center text-sm">{error}</span>}
  </>
);

export default Checkbox;
