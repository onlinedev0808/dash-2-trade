import { useState, useEffect } from "react";

import { ClockIcon } from "../CommonSvg";

const Timer = ({
  date: date,
  isEndDate = false,
}: {
  date: string;
  isEndDate?: boolean;
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = isEndDate
        ? new Date(date).getTime() - Date.now()
        : Date.now() - Date.parse(date);

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex items-center text-text-primary dark:text-text-primary-dark">
      <span className="mr-2 flex">
        <ClockIcon />
      </span>
      <div>
        {days > 0 && <span className="mr-1">{days}d</span>}
        {hours > 0 && <span className="mr-1">{hours}h</span>}
        <span className="mr-1">{minutes}m</span>
        <span className="mr-1">{seconds}s</span>
      </div>
    </div>
  );
};

export default Timer;
