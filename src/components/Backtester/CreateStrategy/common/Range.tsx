/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useRef, useState } from "react";

const Range = ({ item, timeWindowSettings, index, setTimeWindowSettings }) => {
  const input = useRef(null);

  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize((item.hour * 100) / 24 > 100 ? 100 : (item.hour * 100) / 24);
  }, [item.hour]);

  return (
    <div className="w-full flex gap-3 items-end mt-3 relative">
      <span className="leading-[100%]">00</span>
      <div className="relative">
        <input
          ref={input}
          className="mt-3"
          type="range"
          value={item.hour}
          onChange={(e) => {
            setSize((+e.target.value * 100) / 24);

            const it = timeWindowSettings[index];
            it[e.target.name] = +e.target.value;
            setTimeWindowSettings([...timeWindowSettings]);
          }}
          max={24}
          name="hour"
        />
        <div
          className="absolute bg-button-primary h-[6px] rounded-[5px] bottom-[6px]"
          style={{ width: `${size}%` }}
        />
      </div>

      <span className="leading-[100%]">24</span>
    </div>
  );
};

export default Range;
