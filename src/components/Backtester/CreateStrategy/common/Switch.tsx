const SwitchItem = ({ isActive, title, setActiveSwitchItem }) => (
  <button
    className={`py-1 px-5 cursor-pointer items-center text-xs w-[6rem] rounded ${
      isActive && "bg-button-primary"
    }`}
    onClick={setActiveSwitchItem}
  >
    {title}
  </button>
);

const Switch = ({ isAdvanced, setIsAdvanced }) => {
  const handleSetActiveSwitchItem = (e) => {
    e.stopPropagation();
    setIsAdvanced(!isAdvanced);
  };

  return (
    <div className="rounded flex bg-foreground dark:bg-foreground-secondary-dark p-1.5 items-center w-fit">
      <SwitchItem
        title="Simple"
        isActive={!isAdvanced}
        setActiveSwitchItem={handleSetActiveSwitchItem}
      />
      <SwitchItem
        title="Advanced"
        isActive={isAdvanced}
        setActiveSwitchItem={handleSetActiveSwitchItem}
      />
    </div>
  );
};

export default Switch;
