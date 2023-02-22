import Link from "next/link";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../../common/Button";
import { ClockSvg, EyeSvg, ReportSvg } from "../../svg";
import InnerLayout from "../common/InnerLayout";
import Accordion from "../CreateStrategy/common/Accordion";
import { StrategyStatusEnum } from "../CreateStrategy/common/utils";
import StrategyItem from "../StrategyItem";

const History = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

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
        createdAt: new Date(),
        archivedAt: new Date(),
      },
      {
        id: 2,
        title: "Backtester 2",
        strategies: [
          { id: 1, title: "Test", start: new Date(), end: new Date() },
        ],
        status: "failed",
        createdAt: new Date(),
        archivedAt: new Date(),
      },
    ]);
  }, []);

  return (
    <InnerLayout isMobile={isMobile}>
      {backtesters.length ? (
        <div className="p-3">
          <div className="flex flex-col">
            <div className="flex gap-6 justify-between items-center mb-4">
              <h2 className="text-xl">History</h2>
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
                  });

                if (backtester.status === StrategyStatusEnum.Failed)
                  actions.push({
                    icon: <ReportSvg />,
                    text: "Report",
                    id: 1,
                    variant: "outline",
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
    </InnerLayout>
  );
};

export default History;
