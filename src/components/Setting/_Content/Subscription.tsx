import React, { useState } from "react";

import ToggleForm from "../ToggleForm";
import Button from "./Button";
import SectionLayout from "./SectionLayout";

const PlanCard = ({ isActive, setIsActive, title }) => (
  <div
    className={`h-[12.5rem] grow rounded-xl bg-foreground dark:bg-foreground-dark py-5 px-5 flex flex-col border-solid border-2 ${
      isActive && "border-button-primary"
    }`}
    onClick={setIsActive}
  >
    <div className="flex justify-between">
      <div className="grid gap-px">
        <span className="text-text-primary dark:text-text-primary-dark text-base leading-[1.875rem]">
          {title}
        </span>
        <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
          Upgrade
        </span>
      </div>
      <div className="grid gap-px">
        <span className="text-text-primary dark:text-text-primary-dark text-base leading-[1.875rem]">
          $10/
        </span>
        <span className="text-sm leading-[1.875rem] text-text-secondary dark:text-text-secondary-dark">
          Month
        </span>
      </div>
    </div>

    <div className="ml-auto mt-auto">
      <Button color="white" onClick={() => {}}>
        {isActive ? "Cancel Subscription" : "Upgrade"}
      </Button>
    </div>
  </div>
);

const Subscription = () => {
  const [isActive, setIsActive] = useState(0);

  const [isAutoRenewEnabled, setIsAutoRenewEnabled] = useState(false);

  return (
    <SectionLayout title="Plans">
      <div className="flex gap-4 pt-5 flex-wrap">
        <PlanCard
          title="Beginner"
          isActive={isActive === 0}
          setIsActive={() => setIsActive(0)}
        />
        <PlanCard
          title="Professional"
          isActive={isActive === 1}
          setIsActive={() => setIsActive(1)}
        />
      </div>
      <div className="mt-10 flex justify-between">
        <span className="text-base leading-[1.875rem] text-text-primary dark:text-text-primary-dark">
          Enable auto Renew
        </span>
        <ToggleForm
          isActive={isAutoRenewEnabled}
          onChange={() => setIsAutoRenewEnabled(!isAutoRenewEnabled)}
        />
      </div>
      <p className="mt-1.5 text-sm text-text-secondary dark:text-text-secondary-dark">
        Lorem Ipsum is simply dummy
        <br />
        text of the printing and
        <br /> typesetting industry.
      </p>
    </SectionLayout>
  );
};

export default Subscription;
