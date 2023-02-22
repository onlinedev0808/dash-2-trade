/* eslint-disable react/jsx-props-no-spreading */
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import CardWrapper from "../common/Wrapper";

import TopMoverItem from "./TopMoverItem";

interface ITopMoverProps {
  hasTitle?: string;
}

const TopMover: NextPage<ITopMoverProps> = ({ hasTitle }) => {
  const [items, setItems] = useState([]);

  const ref = useRef<HTMLDivElement>();
  const { events } = useDraggable(ref);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://d2t.info/ws/tokens/top-movers?num_results=7"
    );
    socket.onmessage = (event) => {
      const array = [];

      JSON.parse(event.data).forEach((item) => {
        array.push({
          quantity: item.current_price,
          change: item.perc_change_24h,
          longName: item.token.long_name,
          shortName1: item.token.short_name,
          shortName2: "USD",
          data: item.last_prices_24h.map((dataItem) => [
            dataItem.timestamp,
            dataItem.value,
          ]),
          // data: [
          //   [1654480394495, 24.67],
          //   [1654476798656, 24.87],
          //   [1654473196109, 24.35],
          //   [1654469593732, 24.56],
          //   [1654465994076, 24.7],
          //   [1654462395377, 24.2],
          //   [1654458795225, 24.16],
          //   [1654455194391, 24.96]
          // ]
        });
      });

      setItems(array);
    };
  }, []);

  return (
    <div className="w-full" {...events} ref={ref}>
      <CardWrapper
        classes="overflow-x-scroll scrollbar-hide cursor-grab"
        direction="row"
      >
        {items.map((item, index) => (
          <div key={index}>
            <TopMoverItem
              quantity={item.quantity}
              longName={item.longName}
              shortName={item.shortName1}
              change={item.change}
              data={item.data}
              active={item.active}
            />
          </div>
        ))}
      </CardWrapper>
    </div>
  );
};

export default TopMover;
