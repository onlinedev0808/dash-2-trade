import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../common/Button";
import Tooltip, { TooltipPosY } from "../../../common/Tooltip";
import TabWrapper, { TabButton } from "../common/Tab";
import Dropdown from "../common/Dropdown";
import StepLayout from "../StepLayout";
import { ACTIVE_SET_STYLE, SYMBOL_OPTIONS } from "./utils";
import ModalWrapper from "../../../common/ModalWrapper";
import { FILLED_STYLE, getInitialLogic, INPUT_STYLE } from "../common/utils";
import Input from "../common/Input";
import { ArrowUp, CloseSvg } from "../../../svg";

const SwitchItem = ({
  isActive,
  title,
  setActiveSwitchItem,
  icon,
  activeColor,
}) => (
  <button
    className={`py-2 px-5 flex gap-3 cursor-pointer items-center rounded-xl ${
      isActive && activeColor
    }`}
    onClick={setActiveSwitchItem}
  >
    {isActive && icon}

    {title}
  </button>
);

const Switch = ({ switches, setSwitches }) => (
  <div className="rounded-xl flex bg-foreground dark:bg-foreground-secondary-dark p-1.5 items-center w-fit">
    {switches.map((item, index) => (
      <SwitchItem
        key={item.id}
        title={item.title}
        isActive={item.isActive}
        setActiveSwitchItem={() => {
          const switchItems = switches.map((switchItem) => ({
            ...switchItem,
            isActive: false,
          }));
          switchItems[index].isActive = true;

          setSwitches(switchItems);
        }}
        icon={item.icon}
        activeColor={item.activeColor}
      />
    ))}
  </div>
);

const Sets = ({
  sets,
  setSwitches,
  switches,
  setIsConfirmationModalOpened,
  setSetToRemove,
}) => (
  <div className="flex flex-wrap gap-4 w-full items-center">
    {sets.map((set, index) => (
      <div
        key={set.id}
        className={`py-2 cursor-pointer px-4 rounded-md flex gap-3 items-center ${
          set.isActive && ACTIVE_SET_STYLE
        }`}
        onClick={() => {
          const newSwitches = [...switches];

          const activeSwitch = newSwitches.find((item) => item.isActive);
          const tabs = [...activeSwitch.tabs];
          const activeTab = tabs.find((item) => item.isActive);
          const currentSets = activeTab.sets.map((item) => ({
            ...item,
            isActive: false,
          }));
          currentSets[index].isActive = true;

          activeTab.sets = currentSets;
          activeSwitch.tabs = tabs;

          setSwitches([...newSwitches]);
        }}
      >
        {set.title}
        {set.isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              setSetToRemove(set);
              setIsConfirmationModalOpened(true);
            }}
          >
            <CloseSvg />
          </button>
        )}
      </div>
    ))}

    <button
      onClick={() => {
        const currentSets = sets.map((item) => ({ ...item, isActive: false }));
        currentSets.push({
          id: sets?.length ? sets[sets.length - 1].id + 1 : 1,
          title: `Set ${sets[sets.length - 1].id + 1}`,
          logic: getInitialLogic(),
          isActive: true,
        });

        const currentSwitch = switches.find((item) => item.isActive);
        const currentTab = currentSwitch.tabs.find((item) => item.isActive);
        currentTab.sets = currentSets;

        setSwitches([...switches]);
      }}
      className="text-text-secondary dark:text-text-secondary-dark"
    >
      + New set
    </button>
  </div>
);

const TabContent = ({
  switches,
  index,
  logic,
  setSwitches,
  indicatorOptions,
}) => {
  const updateSet = (option, prop, title) => {
    const newSwitches = [...switches];

    const activeSwitch = newSwitches.find((item) => item.isActive);
    const tabs = [...activeSwitch.tabs];
    const activeTab = tabs.find((item) => item.isActive);
    const sets = [...activeTab.sets];
    const activeSet = sets.find((item) => item.isActive);

    activeSet.logic[index][prop] = title || option;

    activeTab.sets = sets;
    activeSwitch.tabs = tabs;

    setSwitches([...newSwitches]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 py-6 items-start lg:items-center lg:grid lg:grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1fr)]">
      <Dropdown
        options={indicatorOptions.slice(1)}
        onChange={(option, title) => {
          updateSet(option, "indicator", title);
        }}
        value={logic.indicator}
        title="Indicator"
      />

      <div className="flex gap-2">
        {SYMBOL_OPTIONS.map((symbol) => (
          <button
            key={symbol.id}
            className={`rounded-full px-4 py-2 h-fit leading-[100%] ${
              logic.symbol === symbol.label
                ? "bg-button-primary text-white"
                : "bg-highlight dark:bg-gray-active"
            }`}
            onClick={() => updateSet(symbol.label, "symbol", "")}
          >
            {symbol.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-5">
        {logic.indicator2 === "number" && (
          <Input
            label="Indicator"
            placeholder="0.95"
            value={logic.value}
            onChange={(e) => updateSet(e.target.value, "value", e.target.value)}
            name="value"
            type="number"
            styles={`${INPUT_STYLE} min-w-[100%]`}
            step={0.01}
          />
        )}

        <Dropdown
          options={indicatorOptions}
          onChange={(option, title) => updateSet(option, "indicator2", title)}
          value={logic.indicator2}
          title="Indicator"
        />
      </div>
    </div>
  );
};

const Tabs = ({ setSwitches, switches, indicatorOptions, isAdvanced }) => {
  const [isConfirationModalOpened, setIsConfirmationModalOpened] =
    useState(false);
  const [removeSet, setRemoveSet] = useState(null);

  const currentActiveSwitch = switches.find((item) => item.isActive);

  const currentActiveTab = currentActiveSwitch.tabs.find(
    (item) => item.isActive
  );

  const currentActiveSet = currentActiveTab.sets.find((item) => item.isActive);

  return (
    <>
      <div className="w-full">
        {isAdvanced && (
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              {currentActiveSwitch.tabs.map((tab, index) => (
                <TabButton
                  key={tab.id}
                  onClick={() => {
                    const currentTabs = currentActiveSwitch.tabs.map(
                      (item) => ({
                        ...item,
                        isActive: false,
                      })
                    );
                    currentTabs[index].isActive = true;

                    const currentSwitch = switches.find(
                      (item) => item.isActive
                    );
                    currentSwitch.tabs = currentTabs;
                    setSwitches([...switches]);
                  }}
                  title={tab.title}
                  isActive={tab.isActive}
                  icon={tab.icon}
                  activeColor={tab.activeColor}
                />
              ))}
            </div>

            <Tooltip
              title="Signal Generation"
              message=""
              icon
              variant="filled"
            />
          </div>
        )}

        {isAdvanced ? (
          <TabWrapper>
            <Sets
              sets={currentActiveTab.sets}
              setSwitches={setSwitches}
              switches={switches}
              setIsConfirmationModalOpened={setIsConfirmationModalOpened}
              setSetToRemove={setRemoveSet}
            />
            {currentActiveSet?.logic?.map((logic, index) => (
              <div key={logic.id}>
                <TabContent
                  switches={switches}
                  setSwitches={setSwitches}
                  index={index}
                  logic={logic}
                  indicatorOptions={indicatorOptions}
                />
                {index !== currentActiveSet.logic.length - 1 && (
                  <div className="py-3 text-center">
                    <span>AND</span>
                  </div>
                )}
              </div>
            ))}
          </TabWrapper>
        ) : (
          <div>
            {currentActiveSet?.logic?.map((logic, index) => (
              <div key={logic.id} className="flex flex-row gap-8 items-center">
                <div className={`${FILLED_STYLE} flex gap-3 items-center`}>
                  Buy
                  <Tooltip
                    title="Title"
                    message="Description"
                    positionY={TooltipPosY.Bottom}
                    icon
                    variant="filled"
                  />
                </div>
                <span>when</span>
                <Dropdown
                  options={indicatorOptions.slice(1)}
                  onChange={(option, title) => {
                    const newSwitches = [...switches];

                    const activeSwitch = newSwitches.find(
                      (item) => item.isActive
                    );
                    const tabs = [...activeSwitch.tabs];
                    const activeTab = tabs.find((item) => item.isActive);
                    const sets = [...activeTab.sets];
                    const activeSet = sets.find((item) => item.isActive);

                    activeSet.logic[index].indicator = title || option;

                    activeTab.sets = sets;
                    activeSwitch.tabs = tabs;

                    setSwitches([...newSwitches]);
                  }}
                  value={logic.indicator}
                  styles={`${FILLED_STYLE} min-w-[13rem]`}
                />
                <span>has</span>
                <Dropdown
                  options={[{ id: 0, label: "cross-over" }]}
                  onChange={(option, title) => {}}
                  value="cross-over"
                  styles={`${FILLED_STYLE} min-w-[13rem]`}
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-3">
          <Button
            color="transparent"
            onClick={() => {
              const newSwitches = [...switches];

              const activeSwitch = newSwitches.find((item) => item.isActive);
              const tabs = [...activeSwitch.tabs];
              const activeTab = tabs.find((item) => item.isActive);
              const sets = [...activeTab.sets];
              const activeSet = sets.find((item) => item.isActive);

              activeSet.logic = [
                ...activeSet.logic,
                {
                  id: activeSet.logic.length,
                  indicator: "",
                  symbol: "",
                  indicator2: "",
                  type: "",
                },
              ];

              activeTab.sets = sets;
              activeSwitch.tabs = tabs;

              setSwitches([...newSwitches]);
            }}
          >
            <span className="flex gap-3 items-center">
              <FontAwesomeIcon icon={faPlus} />
              Add Logic
            </span>
          </Button>
        </div>
      </div>

      {isConfirationModalOpened && (
        <ModalWrapper onClick={() => setIsConfirmationModalOpened(false)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="py-6 bg-foreground px-12 dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center"
          >
            Are you sure you want to remove this set?
            <div className="mt-5 flex gap-5">
              <Button
                color="transparent-white"
                onClick={() => {
                  setIsConfirmationModalOpened(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const currentTab = currentActiveSwitch.tabs.find(
                    (item) => item.isActive
                  );

                  currentTab.sets = currentTab.sets.filter(
                    (item) => item.id !== removeSet.id
                  );

                  const activeSet = currentTab.sets.find(
                    (item) => item.isActive
                  );
                  if (!activeSet && currentTab.sets.length)
                    currentTab.sets[0].isActive = true;

                  setSwitches([...switches]);
                  setIsConfirmationModalOpened(false);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

const SignalGeneration = ({
  switches,
  setSwitches,
  isMobile,
  indicatorOptions,
  isAdvanced,
}) => (
  <StepLayout title="Signal Generation" isMobile={isMobile}>
    <div className="flex flex-col gap-6 w-full lg:w-2/3 md:w-3/4 items-center">
      {isAdvanced && <Switch switches={switches} setSwitches={setSwitches} />}

      <Tabs
        setSwitches={setSwitches}
        switches={switches}
        indicatorOptions={indicatorOptions}
        isAdvanced={isAdvanced}
      />
    </div>
  </StepLayout>
);

export default SignalGeneration;
