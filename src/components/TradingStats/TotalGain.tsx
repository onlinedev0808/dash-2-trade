import React, { useEffect, useState } from "react";

import Gain from "./Gain";

const TotalGain = () => {
  const [totalGain, setTotalGain] = useState(0);

  useEffect(() => {
    setTotalGain(2);
  }, []);

  return (
    <Gain
      title="Total Gain"
      gain={totalGain}
      hasChart
      history={[1000, 1256, 1013, 1024]}
    />
  );
};

export default TotalGain;
