import React, { useEffect, useState } from "react";

import Card from "../common/Card";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState({ value: 0, change: 0 });

  useEffect(() => {
    setTotalOrders({ value: 0, change: 4.8 });
  }, []);

  const getColor = (value) => {
    if (value > 0) return "text-green";
    if (value < 0) return "text-red";

    return "text-text-secondary dark:text-text-secondary";
  };

  const getChange = (value) => {
    if (value > 0) return `+${totalOrders.change}`;
    if (value < 0) return totalOrders.change;

    return totalOrders.change;
  };

  return (
    <Card>
      <span className="text-text-secondary dark:text-text-secondary text-sm">
        Total Orders
      </span>
      <div className="flex justify-between items-center">
        <h5 className="text-3xl">{totalOrders.value}</h5>
        <h6 className={`${getColor(totalOrders.change)}`}>
          {getChange(totalOrders.change)}%
        </h6>
      </div>
    </Card>
  );
};

export default TotalOrders;
