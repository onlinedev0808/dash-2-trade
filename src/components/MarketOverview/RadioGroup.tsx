const RadioButton = ({
                       item,
  selectedItem,
  setSelectedItem,
  color = "primary",
}) => (
  <div
    className="flex flex-row gap-2 cursor-pointer"
    onClick={() => {
      setSelectedItem(item);
    }}
  >
    <div className="rounded-full my-auto border border-border-primary w-5 h-5 p-[3px]">
      <div
        className={`rounded-full w-full h-full ${
          selectedItem.value === item.value ? "bg-button-primary" : ""
        }`}
      />
    </div>

    <p
      className={`rb-text my-auto text-sm text-text-${color} dark:text-text-${color}-dark`}
    >
      {item.text}
    </p>
  </div>
);

const RadioGroup = ({
  options,
  selected,
  setSelected,
  color = "primary",
  className = "",
}) => (
  <div className={`flex flex-row md:gap-10 gap-3 mb-2 ${className}`}>
    {options.map((item, index) => (
      <RadioButton
        item={item}
        selectedItem={selected}
        setSelectedItem={setSelected}
        key={index}
        color={color}
      />
    ))}
  </div>
);

export default RadioGroup;
