import React, { useEffect, useState } from "react";

import Card from "../common/Card";
import { TokenInformationSvg } from "../CommonSvg";

const ConsoleItem = ({ item }) => (
  <div className="leading-7">
    <span>{item.timestamp.toLocaleDateString()}</span> -{" "}
    <span>{item.title}</span>
  </div>
);

const Console = () => {
  const [consoleData, setConsoleData] = useState([]);

  useEffect(() => {
    setConsoleData([
      {
        id: 1,
        title: "NFT Research Tool NFT Inspect Is Shutting Down",
        description: "some description",
        timestamp: new Date(),
      },
      {
        id: 2,
        title:
          "Rise of Argentina’s Bukele? Leading Presidential Candidate Preaches Bitcoin",
        description: "some description",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <Card title="Console" icon={<TokenInformationSvg />} classes="h-full">
      {consoleData.map((item) => (
        <ConsoleItem item={item} key={item.id} />
      ))}
    </Card>
  );
};

export default Console;
