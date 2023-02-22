import { NextPage } from "next";

import { formatNumber } from "../../utils";
import HeatmapCell from "./HeatmapCell";

interface IHeatScaleProps {
  maxValue: number;
  colorStart?: number[];
  colorEnd?: number[];
}

const VOLUME_SCALE = [1, 2, 3, 4];

const HeatScale: NextPage<IHeatScaleProps> = ({
  maxValue,
  colorStart,
  colorEnd,
}) => (
  <div className="flex flex-col md:mt-10 mt-5 mx-auto h-fit w-full">
    <p className="md:mb-4 mb-1 text-text-secondary dark:text-text-secondary-dark text-sm">
      Scale
    </p>
    <div className="grid grid-cols-4 grid-flow-col gap-x-5 gap-y-2 text-sm text-text-primary dark:text-text-primary-dark text-center w-[100%">
      {VOLUME_SCALE.map((item, index) => (
        <div key={item} className="flex flex-col gap-y-2">
          <div className="h-4">
            <HeatmapCell
              normalizedValue={0.25 * (index + 1)}
              colorStart={colorStart}
              colorEnd={colorEnd}
              isScale
            />
          </div>
          <span className="text-xs">
            ${formatNumber(maxValue * 0.25 * (index + 1))}
          </span>
        </div>
      ))}
    </div>
  </div>
);
export default HeatScale;
