import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClockSvg, EyeSvg, NoStrategiesIcon, PlaySvg } from "../CommonSvg";
import Button from "../common/Button";
import StrategyItem from "./StrategyItem";
import Accordion from "./CreateStrategy/common/Accordion";
import PresetItem from "./PresetItem";
import { StrategyStatusEnum } from "./CreateStrategy/common/utils";

const CreateStrategyButton = ({ onClick, title = "Create a Strategy" }) => (
  <Button onClick={onClick} size="large">
    <FontAwesomeIcon icon={faPlus} className="mr-3" /> <span>{title}</span>
  </Button>
);

const Banner = () => (
  <div className="flex items-center px-11 py-8 bg-gradient-to-b from-[#5367FE33] to-[#05092833] justify-between rounded-sidebar shadow-[inset_-2px_-3px_4px_#7BA8FF1A,_inset_0px_4px_4px_#FFFFFF40]">
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Welcome to Backtesting</h2>
      <h4 className="text-sm text-text-secondary dark:text-text-secondary-dark">
        Get started by creating your first strategy
      </h4>
    </div>
    <div className="flex gap-2 flex-col md:flex-row ">
      <Link href="/getting-started/backtesting">
        <a className="h-full">
          <Button color="outline" size="large">
            What is backtesting?
          </Button>
        </a>
      </Link>

      <Button onClick={() => {}} size="large">
        Try Presets
      </Button>
    </div>
  </div>
);

// const Header = ({ handleCreateStrategy, isMobile }) => (
//   <div className="flex justify-between">
//     <h3 className="text-lg lg:text-2xl">Test your strategy</h3>

//     <CreateStrategyButton
//       onClick={handleCreateStrategy}
//       title={isMobile ? "Create" : "Create a Strategy"}
//     />
//   </div>
// );

const Backtester = () => {
  const [presets, setPresets] = useState([
    {
      id: 1,
      name: "Preset 1",
      description:
        "Here goes short description. Lorem ipsum dolor sit amet, consectetur.",
    },
    {
      id: 2,
      name: "Preset 2",
      description:
        "Here goes short description. Lorem ipsum dolor sit amet, consectetur.",
    },
    {
      id: 3,
      name: "Preset 3",
      description:
        "Here goes short description. Lorem ipsum dolor sit amet, consectetur.",
    },
    {
      id: 4,
      name: "Preset 4",
      description:
        "Here goes short description. Lorem ipsum dolor sit amet, consectetur.",
    },
  ]);
  const [backtesters, setBacktesters] = useState([]);

  useEffect(() => {
    setBacktesters([
      {
        id: 1,
        title: "Backtester 1",
        strategies: [
          { id: 1, title: "Test", start: new Date(), end: new Date() },
          { id: 2, title: "Test 2", start: new Date(), end: new Date() },
        ],
        status: "complete",
      },
      {
        id: 2,
        title: "Backtester 2",
        strategies: [
          { id: 1, title: "Test", start: new Date(), end: new Date() },
        ],
        status: "in progress",
      },
      {
        id: 3,
        title: "Backtester 3",
        strategies: [
          { id: 1, title: "Test", start: new Date(), end: new Date() },
        ],
      },
    ]);
  }, []);

  const router = useRouter();

  const handleCreateStrategy = () => {
    router.push("/backtester/create-strategy");
  };

  return (
    <div className="p-3 flex flex-col gap-12">
      <Banner />
      {backtesters.length ? (
        <div className="p-3">
          <div className="flex flex-col">
            <div className="flex gap-6 justify-between items-center mb-4">
              <h2 className="text-xl">Your Strategies</h2>

              <div className="flex gap-2 flex-col md:flex-row">
                <Link href="/backtester/history">
                  <a>
                    <Button color="outline" size="large">
                      <span className="mr-2">
                        <ClockSvg />
                      </span>

                      <span>History</span>
                    </Button>
                  </a>
                </Link>

                <CreateStrategyButton
                  onClick={handleCreateStrategy}
                  title="Add new strategy"
                />
              </div>
            </div>

            <div>
              {backtesters.map((backtester) => {
                const actions = [];

                if (backtester.status === StrategyStatusEnum.Complete)
                  actions.push({
                    icon: <EyeSvg />,
                    text: "Results",
                    id: 0,
                    variant: "outline",
                    onClick: () => {
                      router.push(`/backtester/results/${backtester.id}`);
                    },
                  });

                if (backtester.status !== StrategyStatusEnum.Complete)
                  actions.push({
                    icon: <PlaySvg />,
                    text: "Run",
                    id: 1,
                    variant: "",
                  });

                return (
                  <Accordion
                    title={backtester.title}
                    key={backtester.id}
                    status={backtester.status}
                    actions={actions}
                  >
                    {backtester.strategies.map((strategy, index) => (
                      <StrategyItem
                        key={strategy.id}
                        title={strategy.title}
                        start={strategy.start}
                        end={strategy.end}
                        hasBorder={index}
                        logo=""
                      />
                    ))}
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {!backtesters.length ? (
        <div>
          <div className="flex flex-col justify-center items-center gap-y-8 lg:gap-y-10 py-10 lg:py-14">
            <div className="lg:mb-7">
              <NoStrategiesIcon />
            </div>

            <div className="text-center flex flex-col gap-2 lg:gap-4">
              <h4 className="text-lg lg:text-2xl">
                Build your own strategy and test it
              </h4>
              <h5 className="text-sm lg:text-base text-text-secondary dark:text-text-secondary-dark">
                Start by creating a new Strategy
              </h5>
            </div>
            <CreateStrategyButton onClick={handleCreateStrategy} />
          </div>
        </div>
      ) : null}

      <div className="p-3">
        <div className="flex flex-col gap-8">
          <h2 className="text-xl">Preset Strategy</h2>

          <input
            className="outline-none rounded-lg placeholder:text-text-secondary placeholder:dark:text-text-secondary-dark px-5 py-3 bg-foreground dark:bg-background-secondary-dark"
            placeholder="Search for presets..."
            type="search"
          />

          <div className="flex flex-col gap-y-8">
            {presets.map((preset) => (
              <PresetItem key={preset.id} preset={preset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backtester;
