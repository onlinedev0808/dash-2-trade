import React from "react";

import Card from "../common/Card";
import { VolumeSvg } from "../CommonSvg";
import TableHistoryGraph from "../TokenTable/Table/TableHistoryGraph";

const Gain = ({ title, gain, history = [], hasChart = false }) => (
  <Card title={title} icon={<VolumeSvg />} hasBorder classes="h-full">
    <div className="flex justify-between">
      <div>
        <h6 className="text-[2.25rem]">{gain.toFixed(2)}</h6>
        <span className="text-text-secondary dark:text-text-secondary text-sm">
          USDT
        </span>
      </div>
      {hasChart && (
        <div className=" h-20">
          <TableHistoryGraph
            data={[{ data: history.map((stamp, i) => [i, stamp]) }]}
          />
        </div>
      )}
    </div>
  </Card>
);

export default Gain;
