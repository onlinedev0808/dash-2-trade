import React from "react";

const ColonDelimiter = (): JSX.Element => (
  <div className="text-1.5xl pt-3 px-4 md:px-2 lg:px-4">:</div>
);

const TimerItem = ({ value }): JSX.Element => (
  <div className="w-[3rem] h-[3rem] md:w-[3.76rem] md:h-[3.76rem] flex justify-center items-center font-medium text-xl md:text-1.5xl rounded-xl bg-[#1D1E2C]">
    {value}
  </div>
);

const TimerItemLabel = ({ title }: { title: string }): JSX.Element => {
  return (
    <div className="mt-2 text-xs text-grey-light uppercase tracking-[.08rem] w-full text-center">
      {title}
    </div>
  );
};

const Timer = (): JSX.Element => {
  return (
    <div className="flex">
      <div>
        <TimerItem value="00" />
        <TimerItemLabel title="Days" />
      </div>
      <ColonDelimiter />
      <div>
        <TimerItem value="00" />
        <TimerItemLabel title="Hours" />
      </div>
      <ColonDelimiter />
      <div>
        <TimerItem value="00" />
        <TimerItemLabel title="Mins" />
      </div>
      <ColonDelimiter />
      <div>
        <TimerItem value="00" />
        <TimerItemLabel title="Secs" />
      </div>
    </div>
  );
};

export default Timer;
