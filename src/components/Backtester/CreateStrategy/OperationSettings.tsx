/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { title } from "process";
import { useEffect, useState, useRef } from "react";
import useDetectOutsideClick from "../../../hooks/useDetectOutsideClick";
import Button from "../../common/Button";
import { GearSvg, SaveSvg, TickSvg } from "../../svg";
import Dropdown from "./common/Dropdown";
import Input from "./common/Input";
import Modal from "./common/Modal";
import RadioButton from "./common/Radio";
import TabWrapper, { TabButton } from "./common/Tab";
import { FILLED_STYLE } from "./common/utils";
import StepLayout from "./StepLayout";
import Range from "./common/Range";
import { SettingsSvg } from "../../CommonSvg";

const RadioButtonWrapper = ({ children, title }) => (
  <div className="flex flex-col gap-6">
    <h6 className="uppercase text-xs ">{title}</h6>

    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const Signal = ({
  oppositeSignalHandling,
  continuousSignal,
  onChange,
  styles = "",
}) => (
  <div className={`grid lg:grid-cols-3 gap-8 ${styles}`}>
    <RadioButtonWrapper title="Opposite Signal Handling">
      <RadioButton
        name="oppositeSignalHandling"
        label="Close Position"
        value="Close Position"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={oppositeSignalHandling}
      />
      <RadioButton
        name="oppositeSignalHandling"
        label="Do Nothing"
        value="Do Nothing"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={oppositeSignalHandling}
      />
      <RadioButton
        name="oppositeSignalHandling"
        label="Invert Position"
        value="Invert Position"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={oppositeSignalHandling}
      />
    </RadioButtonWrapper>
    <RadioButtonWrapper title="Continuous Signal">
      <RadioButton
        name="continuousSignal"
        label="Adjust"
        value="Adjust"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={continuousSignal}
      />
      <RadioButton
        name="continuousSignal"
        label="Not-Adjust"
        value="Not-Adjust"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={continuousSignal}
      />
    </RadioButtonWrapper>
  </div>
);
const GoalAndLossController = ({
  onChange,
  dailyLossLimit,
  weeklyLossLimit,
  dailyLossLimit2,
  weeklyLossLimit2,
}) => (
  <div className="flex flex-col gap-y-4">
    <div className="grid lg:grid-cols-2 gap-8">
      <Input
        label="Daily Loss Limit (%)"
        placeholder="%"
        value={dailyLossLimit}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="dailyLossLimit"
      />
      <Input
        label="Weekly Loss Limit (%)"
        placeholder="%"
        value={weeklyLossLimit}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="weeklyLossLimit"
      />
    </div>
    <div className="grid lg:grid-cols-2 gap-8">
      <Input
        label="Daily Loss Limit (%)"
        placeholder="%"
        value={dailyLossLimit2}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="dailyLossLimit2"
      />
      <Input
        label="Weekly Loss Limit (%)"
        placeholder="%"
        value={weeklyLossLimit2}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="weeklyLossLimit2"
      />
    </div>
  </div>
);

const SizingAndCash = ({
  onChange,
  oppositeSignalHandlingSizingAndCash,
  maxPositionSize,
  marginCash,
  assetMinimumTradableSize,
  startCash,
}) => (
  <div className="grid lg:grid-cols-3 gap-8">
    <div className="flex flex-col gap-10">
      <Input
        label="Max position size"
        placeholder="Max Size"
        value={maxPositionSize}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="maxPositionSize"
      />
    </div>
    <div>
      <Input
        label="Asset Minimum Tradable Size"
        placeholder="1"
        value={assetMinimumTradableSize}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="assetMinimumTradableSize"
      />
    </div>
    <div>
      <Input
        label="Start cash"
        placeholder="Initial Cash"
        value={startCash}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name="startCash"
      />
    </div>

    <RadioButtonWrapper title="Opposite Signal Handling">
      <RadioButton
        name="oppositeSignalHandlingSizingAndCash"
        label="Asset Price"
        value="Asset Price"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={oppositeSignalHandlingSizingAndCash}
      />
      <RadioButton
        name="oppositeSignalHandlingSizingAndCash"
        label="Asset Price (Leveraged)"
        value="Asset Price (Leveraged)"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={oppositeSignalHandlingSizingAndCash}
      />

      <div className="flex flex-col gap-[inherit]">
        <RadioButton
          name="oppositeSignalHandlingSizingAndCash"
          label="Margin"
          value="Margin"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          formValue={oppositeSignalHandlingSizingAndCash}
        />
        <div className="w-1/2 ml-8">
          <Input
            label=""
            placeholder="Margin Cash"
            value={marginCash}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            name="marginCash"
          />
        </div>
      </div>
    </RadioButtonWrapper>
  </div>
);
const TaskProfitAndStopLoss = ({
  onChange,
  takeProfit,
  stopLoss,
  timeWindowSettingsSet,
  setIsModalOpened,
}) => (
  <div className="grid lg:grid-cols-2 gap-7">
    <RadioButtonWrapper title="Take Profit">
      <RadioButton
        name="takeProfit"
        label="Fixed"
        value="Fixed"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={takeProfit}
      />
      <div>
        <RadioButton
          name="takeProfit"
          label="Time-Window Based"
          value="Time-Window Based"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          formValue={takeProfit}
        />
        <div className="ml-8">
          {timeWindowSettingsSet ? (
            <button
              onClick={() => setIsModalOpened(true)}
              className="py-1 px-3 bg-[#3AA58B] rounded mt-1.5 items-center flex gap-2"
            >
              <TickSvg />
              <span className="text-sm">Settings</span>
            </button>
          ) : (
            <button
              className="py-1 px-3 bg-foreground dark:bg-cookie-consent rounded mt-1.5"
              onClick={() => setIsModalOpened(true)}
            >
              <span className="text-sm flex gap-2">
                <GearSvg />
                Add Settings
              </span>
            </button>
          )}
        </div>
      </div>

      <RadioButton
        name="takeProfit"
        label="None"
        value="None"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={takeProfit}
      />
    </RadioButtonWrapper>
    <RadioButtonWrapper title="Stop-Loss">
      <RadioButton
        name="stopLoss"
        label="Fixed"
        value="Fixed"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={stopLoss}
      />
      <RadioButton
        name="stopLoss"
        label="Time-Window Based"
        value="Time-Window Based"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={stopLoss}
      />
      <RadioButton
        name="stopLoss"
        label="None"
        value="None"
        onChange={(e) => onChange(e.target.name, e.target.value)}
        formValue={stopLoss}
      />
    </RadioButtonWrapper>
  </div>
);

const OperationSettings = ({
  targets,
  setTargets,
  isMobile,
  isAdvanced,
  step,
  STEPS,
  setSettigngs,
  saveSettings,
}) => {
  const [activeTarget, setActiveTarget] = useState(targets[0]);
  const [isNewBacktester, setIsNewBacktester] = useState(false);

  const [nickname, setNickname] = useState("Operation Settings");

  const [backtesters, setBacktesters] = useState([
    {
      id: 1,
      title: "Backtester 1",
      strategies: [
        { id: 1, title: "Test", start: new Date(), end: new Date() },
        { id: 2, title: "Test 2", start: new Date(), end: new Date() },
      ],
      status: "complete",
      isApplied: false,
    },
    {
      id: 2,
      title: "Backtester 2",
      strategies: [
        { id: 1, title: "Test", start: new Date(), end: new Date() },
      ],
      status: "in progress",
      isApplied: false,
    },
  ]);

  const router = useRouter();

  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    setActiveTarget(targets.find((item) => item.isActive));
  }, [targets]);

  const activeTab = activeTarget.tabs.find((tab) => tab.isActive);

  const handleChangeForm = (name, value) => {
    const currentTargets = targets.concat();
    const currentActiveTarget = currentTargets.find((item) => item.isActive);

    currentActiveTarget.form[name] = value;
    setTargets(currentTargets);
  };

  const handleChangeTarget = (option) => {
    const currentTargets = targets.map((target) => ({
      ...target,
      isActive: false,
    }));
    const newActiveTarget = currentTargets.find(
      (item) => item.title === option
    );
    newActiveTarget.isActive = true;

    setTargets(currentTargets);
  };

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [timeWindowSettings, setTimeWindowSettings] = useState([
    {
      hour: 0,
      minute: 0,
      tp: 0,
    },
  ]);

  const [timeWindowSettingsSet, setTimeWindowSettingsSet] = useState(false);

  return (
    <StepLayout
      title={nickname}
      isMobile={isMobile}
      isEditable={isNewBacktester}
      onChange={setNickname}
    >
      {isAdvanced ? (
        <div className="w-full flex flex-col items-center">
          {isNewBacktester ? (
            <div className="w-full flex flex-col items-center">
              <div className="mb-8">
                <Dropdown
                  options={targets.map(({ id, title }) => ({
                    id,
                    label: title,
                  }))}
                  onChange={(target) => handleChangeTarget(target)}
                  value={activeTarget.title}
                  styles="border-none bg-foreground dark:bg-foreground-secondary-dark rounded-[12px] px-6 py-3"
                />
              </div>
              <div className="w-full lg:w-2/3 md:w-3/4">
                {!isMobile && (
                  <div className="flex">
                    {activeTarget.tabs.map((tab, index) => (
                      <TabButton
                        key={tab.id}
                        onClick={() => {
                          const currentTargets = targets.concat();
                          const currentActiveTarget = currentTargets.find(
                            (item) => item.isActive
                          );

                          const currentTabs = currentActiveTarget.tabs.map(
                            (item) => ({
                              ...item,
                              isActive: false,
                            })
                          );
                          currentTabs[index].isActive = true;
                          currentActiveTarget.tabs = currentTabs;
                          setTargets(currentTargets);
                        }}
                        title={tab.title}
                        isActive={tab.isActive}
                        isMobile={isMobile}
                        hasTooltip={tab.hasTooltip}
                      />
                    ))}
                  </div>
                )}
                {isMobile && (
                  <div ref={dropdownRef} className="relative max-w-fit">
                    <TabButton
                      key={activeTab.id}
                      onClick={() => {
                        setIsOpened(!isOpened);
                      }}
                      title={activeTab.title}
                      isActive={activeTab.isActive}
                      isMobile={isMobile}
                    />
                    {isOpened && (
                      <ul
                        className={`w-full transition-all absolute ease-in-out duration-300 translate-y-[100%] bottom-0 z-[1] rounded pt-3 pb-1.5 px-4 bg-highlight dark:bg-[#3F4B74] ${
                          isOpened ? "max-h-[12.8rem]" : "max-h-0"
                        } overflow-y-scroll h-auto`}
                      >
                        {activeTarget.tabs.map(({ title }, key) => (
                          <li
                            onClick={() => {
                              const currentTargets = targets.concat();
                              const currentActiveTarget = currentTargets.find(
                                (item) => item.isActive
                              );
                              const currentTabs = currentActiveTarget.tabs.map(
                                (item) => ({
                                  ...item,
                                  isActive: false,
                                })
                              );
                              currentTabs[key].isActive = true;
                              currentActiveTarget.tabs = currentTabs;
                              setTargets(currentTargets);

                              setIsOpened(false);
                            }}
                            key={key}
                            className="h-7"
                          >
                            <button className="flex gap-3 outline-none w-full">
                              <span className="block truncate text-sm">
                                {title}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <TabWrapper>
                  {activeTab.id === 0 && (
                    <Signal
                      oppositeSignalHandling={
                        activeTarget.form.oppositeSignalHandling || ""
                      }
                      continuousSignal={
                        activeTarget.form.continuousSignal || ""
                      }
                      onChange={handleChangeForm}
                    />
                  )}
                  {activeTab.id === 1 && (
                    <GoalAndLossController
                      onChange={handleChangeForm}
                      dailyLossLimit={activeTarget.form.dailyLossLimit || ""}
                      weeklyLossLimit={activeTarget.form.weeklyLossLimit || ""}
                      dailyLossLimit2={activeTarget.form.dailyLossLimit2 || ""}
                      weeklyLossLimit2={
                        activeTarget.form.weeklyLossLimit2 || ""
                      }
                    />
                  )}
                  {activeTab.id === 2 && (
                    <SizingAndCash
                      onChange={handleChangeForm}
                      oppositeSignalHandlingSizingAndCash={
                        activeTarget.form.oppositeSignalHandlingSizingAndCash ||
                        ""
                      }
                      maxPositionSize={activeTarget.form.maxPositionSize || ""}
                      marginCash={activeTarget.form.marginCash || ""}
                      assetMinimumTradableSize={
                        activeTarget.form.assetMinimumTradableSize || ""
                      }
                      startCash={activeTarget.form.startCash || ""}
                    />
                  )}
                  {activeTab.id === 3 && (
                    <TaskProfitAndStopLoss
                      onChange={handleChangeForm}
                      takeProfit={activeTarget.form.takeProfit || ""}
                      stopLoss={activeTarget.form.stopLoss || ""}
                      timeWindowSettingsSet={timeWindowSettingsSet}
                      setIsModalOpened={setIsModalOpened}
                    />
                  )}

                  <div className="flex w-full justify-center gap-3">
                    <Button
                      color="transparent-white"
                      onClick={() => {
                        setSettigngs();
                        setTimeWindowSettings([
                          {
                            hour: 0,
                            minute: 0,
                            tp: 0,
                          },
                        ]);
                        setTimeWindowSettingsSet(false);
                      }}
                    >
                      Reset
                    </Button>
                    <Button onClick={saveSettings} size="small">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex itms-center gap-2">
                          Save
                          <span>
                            <SaveSvg />
                          </span>
                        </div>
                      </div>
                    </Button>
                  </div>
                </TabWrapper>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-3/4 md:w-2/3">
              {backtesters?.map((backtester, index) => (
                <div
                  key={backtester.id}
                  className="flex justify-between items-center border-b-separator border-b-1 border-b-solid py-5"
                >
                  <h4>{backtester.title}</h4>
                  <div className="flex">
                    <Button color="transparent" size="small">
                      Edit
                    </Button>
                    {backtester.isApplied ? (
                      <Button
                        size="large"
                        onClick={() => {
                          const item = backtesters[index];
                          item.isApplied = false;
                          setBacktesters([...backtesters]);
                        }}
                      >
                        <div className="flex gap-3 items-center justify-center">
                          Applied
                          <div>
                            <TickSvg />
                          </div>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        size="large"
                        color="outline"
                        onClick={() => {
                          const item = backtesters[index];
                          item.isApplied = true;
                          setBacktesters([...backtesters]);
                        }}
                      >
                        Apply settings
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <Button
                  onClick={() => setIsNewBacktester(true)}
                  color="transparent"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-3" />
                  <span>Add new Operation Settings</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full lg:w-1/2">
          <div className="px-4 py-6 rounded-b-lg rounded-tr-lg mb-6 w-full">
            <Signal
              oppositeSignalHandling={
                activeTarget.form.oppositeSignalHandling || ""
              }
              continuousSignal={activeTarget.form.continuousSignal || ""}
              onChange={handleChangeForm}
              styles="lg:grid-cols-2"
            />
          </div>
        </div>
      )}
      {isModalOpened && (
        <Modal setIsOpened={setIsModalOpened}>
          <div className="w-full">
            <h3 className="text-2xl mx-auto text-center mb-8">
              Time-Window Based
            </h3>

            {timeWindowSettings.map((item, index) => (
              <div key={index} className="flex flex-col gap-8 mb-8">
                <h3 className="text-lg">Time {index + 1}</h3>

                <div className="grid grid-cols-[minmax(0,_1fr)_15%_minmax(0,_1fr)] w-full">
                  <div>
                    <div className="flex gap-6 items-center">
                      <Input
                        label="Hour"
                        placeholder="00"
                        value={item.hour}
                        onChange={(e) => {
                          timeWindowSettings[index][e.target.name] =
                            e.target.value;
                          setTimeWindowSettings([...timeWindowSettings]);
                        }}
                        name="hour"
                        styles="bg-cookie-consent py-3 px-5 rounded-[6px]"
                      />
                      <span className="relative bottom-[-10px]">:</span>

                      <Input
                        label="Minute"
                        placeholder="00"
                        value={item.minute}
                        onChange={(e) => {
                          timeWindowSettings[index][e.target.name] =
                            e.target.value;
                          setTimeWindowSettings([...timeWindowSettings]);
                        }}
                        name="minute"
                        styles="bg-cookie-consent py-3 px-5 rounded-[6px]"
                      />
                    </div>
                    <div className="flex gap-3 items-end">
                      <Range
                        item={item}
                        timeWindowSettings={timeWindowSettings}
                        index={index}
                        setTimeWindowSettings={setTimeWindowSettings}
                      />
                    </div>
                  </div>

                  <div />
                  <Input
                    label="Take Profit"
                    placeholder="%"
                    value={item.tp}
                    onChange={(e) => {
                      timeWindowSettings[index][e.target.name] = e.target.value;
                      setTimeWindowSettings([...timeWindowSettings]);
                    }}
                    name="tp"
                    styles="bg-cookie-consent py-3 px-5 rounded-[6px]"
                  />
                </div>
              </div>
            ))}
            <div>
              <Button
                onClick={() => {
                  setTimeWindowSettings([
                    ...timeWindowSettings,
                    { hour: 0, minute: 0, tp: 0 },
                  ]);
                }}
                color="transparent"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                <span>Add time</span>
              </Button>
            </div>

            <div className="flex gap-3 justify-center w-full mt-8">
              <Button
                color="transparent-white"
                onClick={() => {
                  setIsModalOpened(false);
                }}
              >
                <span>Reset</span>
              </Button>
              <Button
                size="medium"
                onClick={() => {
                  setTimeWindowSettingsSet(true);

                  setIsModalOpened(false);
                }}
              >
                <span>Save</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {STEPS[STEPS.length - 1].id === step.id && isAdvanced && (
        <div className="mt-10 flex justify-center">
          <Button
            styles="!px-6 !py-3.5"
            onClick={() => router.push("/backtester")}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex itms-center gap-2">Save {nickname}</div>
              <TickSvg />
            </div>
          </Button>
        </div>
      )}
    </StepLayout>
  );
};

export default OperationSettings;
