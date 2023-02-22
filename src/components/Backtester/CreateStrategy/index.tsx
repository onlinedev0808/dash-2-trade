/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useMediaQuery } from "react-responsive";
import {
  ArrowLeft,
  DropdownArrow,
  SaveSvg,
  StepSeparator,
  StepSeparatorCompleted,
  TrendingDown,
  TrendingUp,
} from "../../CommonSvg";
import SelectSource from "./SelectSource";
import SetUpIndicators from "./SetUpIndicators";
import SignalGeneration from "./SignalGeneration";
import OperationSettings from "./OperationSettings";
import Button from "../../common/Button";
import { EXCLUDE_PROPS, INPUTS } from "./common/utils";
import { ArrowUp, ArrowDown, TickSvg } from "../../svg";
import InnerLayout from "../common/InnerLayout";
import Switch from "./common/Switch";
import { ColorsEnum } from "../../../theme";

const STEPS = [
  { id: 1, title: "Select Source" },
  { id: 2, title: "Set up Indicators" },
  { id: 3, title: "Signal Generation" },
  { id: 4, title: "Operation Settings" },
];

const getInitialLogic = () => [
  { id: 0, indicator: "", symbol: "", indicator2: "", value: "" },
];
const getInitialSets = () => [
  {
    id: 1,
    title: "Set 1",
    logic: getInitialLogic(),
    isActive: true,
  },
];

const getInitialTabs = () => [
  {
    id: 1,
    title: "Open",
    isActive: true,
    sets: getInitialSets(),
    icon: "ArrowUp",
    activeColor: ColorsEnum.Green,
  },
  {
    id: 2,
    title: "Close",
    isActive: false,
    sets: getInitialSets(),
    icon: "ArrowDown",
    activeColor: ColorsEnum.Red,
  },
];

const getSignalItems = () => [
  {
    id: 1,
    title: "Long",
    tabs: getInitialTabs(),
    isActive: true,
    icon: <TrendingUp />,
    activeColor: "bg-green",
  },
  {
    id: 2,
    title: "Short",
    tabs: getInitialTabs(),
    isActive: false,
    icon: <TrendingDown />,
    activeColor: "bg-red flex-row-reverse",
  },
];

const getSettingItems = () => [
  {
    id: 1,
    title: "BTC",
    tabs: [
      {
        id: 3,
        title: "Take Profit & Stop Loss",
        isActive: true,
        hasTooltip: true,
      },
      {
        id: 0,
        title: "Signal",
        isActive: false,
        hasTooltip: true,
      },
      {
        id: 1,
        title: "Goal & Loss - Controller",
        isActive: false,
        hasTooltip: true,
      },
      {
        id: 2,
        title: "Sizing & Cash",
        isActive: false,
        hasTooltip: true,
      },
    ],
    isActive: true,
    form: {},
  },
  {
    id: 2,
    title: "ETH",
    tabs: [
      {
        id: 3,
        title: "Take Profit & Stop Loss",
        isActive: true,
        hasTooltip: true,
      },
      {
        id: 0,
        title: "Signal",
        isActive: false,
        hasTooltip: true,
      },
      {
        id: 1,
        title: "Goal & Loss - Controller",
        isActive: false,
        hasTooltip: true,
      },
      {
        id: 2,
        title: "Sizing & Cash",
        isActive: false,
        hasTooltip: true,
      },
    ],
    isActive: false,
    form: {},
  },
];

const CreateStrategy = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [completedSteps, setCompletedSteps] = useState([STEPS[0].id]);

  const [step, setStep] = useState(STEPS[0]);
  const [isAdvanced, setIsAdvanced] = useState(true);

  // step 1
  const [token, setToken] = useState(null);
  const [resolution, setResolution] = useState(null);

  // step 2
  const [indicators, setIndicators] = useState([]);

  // step 3
  const [signals, setSignals] = useState(getSignalItems());

  // step 4
  const [settings, setSettings] = useState(getSettingItems());

  const handleSave = async () => {
    try {
      await axios.post("/api/backend/backtester/test-strategy", {
        token,
        resolution,
        signals,
        settings: settings.map((setting) => setting.form),
        indicators: indicators.map((indicator) => {
          const props = Object.keys(indicator).filter(
            (it) => !EXCLUDE_PROPS.includes(it)
          );

          const item = { indicator: indicator.title };

          props.forEach((prop) => {
            item[prop] =
              typeof indicator[prop] === "object"
                ? indicator[prop]?.title
                : indicator[prop];
          });

          return item;
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InnerLayout isMobile={isMobile}>
      <div className="top-0 right-0 flex gap-4 items-center w-fit absolute">
        <Switch isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />
      </div>
      <div className="lg:pl-4 flex flex-col gap-12 items-center lg:mt-8">
        <div className="relative bottom-[5.5rem] lg:bottom-0 w-full flex flex-col gap-y-12 items-center">
          <div className="flex items-center gap-5 justify-center">
            {STEPS.map((item, index) =>
              isMobile && item.id !== step.id ? null : (
                <div
                  key={item.id}
                  className="flex items-center gap-[inherit] cursor-pointer"
                  onClick={() => {
                    if (completedSteps.includes(item.id)) setStep(item);
                  }}
                >
                  {!isMobile &&
                    !!index &&
                    (!completedSteps.includes(STEPS[index].id) ? (
                      <StepSeparator />
                    ) : (
                      <StepSeparatorCompleted />
                    ))}
                  <div
                    className={`rounded-full ${
                      item.id !== step.id &&
                      completedSteps.includes(item.id) &&
                      "text-text-primary dark:text-text-primary-dark border-solid border-1 border-text-primary dark:border-text-primary-dark"
                    } ${
                      item.id === step.id
                        ? "bg-button-primary text-white"
                        : "text-text-secondary dark:text-text-secondary-dark border-solid border-1 border-text-secondary dark:border-text-secondary-dark"
                    }   h-7 w-7 text-xs flex items-center justify-center`}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <span
                    className={`text-lg lg:text-base ${
                      item.id === step.id
                        ? "lg:text-button-primary"
                        : "text-text-secondary dark:text-text-secondary-dark"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-10 justify-center grow w-full">
            {step.id === STEPS[0].id && (
              <SelectSource
                isMobile={isMobile}
                token={token}
                resolution={resolution}
                setToken={setToken}
                setResolution={setResolution}
                isAdvanced={isAdvanced}
              />
            )}
            {step.id === STEPS[1].id && (
              <SetUpIndicators
                indicators={indicators}
                setIndicators={setIndicators}
                isMobile={isMobile}
                isAdvanced={isAdvanced}
              />
            )}
            {step.id === STEPS[2].id && (
              <SignalGeneration
                switches={signals}
                setSwitches={setSignals}
                isMobile={isMobile}
                indicatorOptions={[...BASE_INDICATORS, ...indicators]}
                isAdvanced={isAdvanced}
              />
            )}
            {step.id === STEPS[3].id && (
              <OperationSettings
                targets={settings}
                setTargets={setSettings}
                isMobile={isMobile}
                isAdvanced={isAdvanced}
                step={step}
                STEPS={STEPS}
                setSettigngs={() => setSettings(getSettingItems())}
                saveSettings={async () => {
                  const currentStepIndex = STEPS.findIndex(
                    (item) => item.id === step.id
                  );
                  if (currentStepIndex === STEPS.length - 1) {
                    await handleSave();
                    return;
                  }
                  setStep(STEPS[currentStepIndex + 1]);
                  if (!completedSteps.includes(STEPS[currentStepIndex + 1].id))
                    setCompletedSteps([
                      ...completedSteps,
                      STEPS[currentStepIndex + 1].id,
                    ]);
                }}
              />
            )}
            {STEPS[STEPS.length - 1].id !== step.id && (
              <div className="flex gap-2 justify-center">
                {step.id !== STEPS[0].id && (
                  <>
                    <Button
                      color="transparent-white"
                      onClick={() => {
                        const currentStepIndex = STEPS.findIndex(
                          (item) => item.id === step.id
                        );

                        setStep(STEPS[currentStepIndex - 1]);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <div className="rotate-90">
                            <DropdownArrow w="1.25rem" h="1.25rem" />
                          </div>
                          Back
                        </div>
                      </div>
                    </Button>
                    <Button
                      color="transparent-white"
                      onClick={() => {
                        switch (step.id) {
                          case STEPS[0].id:
                            setToken(null);
                            setResolution(null);
                            break;
                          case STEPS[1].id:
                            setIndicators([]);
                            break;
                          case STEPS[2].id:
                            setSignals(getSignalItems());
                            break;
                          case STEPS[3].id:
                            setSettings(getSettingItems());
                            break;
                          default: // noop;
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </>
                )}

                <Button
                  onClick={async () => {
                    const currentStepIndex = STEPS.findIndex(
                      (item) => item.id === step.id
                    );
                    if (currentStepIndex === STEPS.length - 1) {
                      await handleSave();
                      return;
                    }
                    setStep(STEPS[currentStepIndex + 1]);
                    if (
                      !completedSteps.includes(STEPS[currentStepIndex + 1].id)
                    )
                      setCompletedSteps([
                        ...completedSteps,
                        STEPS[currentStepIndex + 1].id,
                      ]);
                  }}
                  size="small"
                >
                  <div className="flex items-center justify-center gap-2">
                    {STEPS[STEPS.length - 2].id === step.id ||
                    STEPS[STEPS.length - 1].id === step.id ? (
                      <div className="flex itms-center gap-2">
                        Save
                        <span>
                          <TickSvg />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Next
                        <div className="-rotate-90">
                          <DropdownArrow w="1.25rem" h="1.25rem" />
                        </div>
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            )}

            {/* {STEPS[STEPS.length - 1].id === step.id && (
              <Button
                onClick={async () => {
                  const currentStepIndex = STEPS.findIndex(
                    (item) => item.id === step.id
                  );
                  if (currentStepIndex === STEPS.length - 1) {
                    await handleSave();
                    return;
                  }
                  setStep(STEPS[currentStepIndex + 1]);
                  if (!completedSteps.includes(STEPS[currentStepIndex + 1].id))
                    setCompletedSteps([
                      ...completedSteps,
                      STEPS[currentStepIndex + 1].id,
                    ]);
                }}
                size="small"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex itms-center gap-2">
                    Save Operation Settings
                    <span>
                      <TickSvg />
                    </span>
                  </div>
                </div>
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default CreateStrategy;

const BASE_INDICATORS = [
  { id: 0, label: "number" },
  { id: 1, label: "open" },
  { id: 2, label: "high" },
  { id: 3, label: "low" },
  { id: 4, label: "close" },
  { id: 5, label: "volume" },
];
