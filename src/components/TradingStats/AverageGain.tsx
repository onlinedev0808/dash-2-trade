import React, { useEffect, useState } from "react";
import Gain from "./Gain";

const AverageGain = () => {
  const [averageGain, setAverageGain] = useState(0);

  useEffect(() => {
    setAverageGain(2);
  }, []);

  return <Gain title="Average Gain" gain={averageGain} />;
};

export default AverageGain;
