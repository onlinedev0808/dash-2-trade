import Button from "../common/Button";
import { PresetSvg } from "../svg";

const PresetItem = ({ preset }) => (
  <div className="flex justify-between">
    <div className="flex gap-6">
      <div className="bg-highlight dark:bg-background-tertiary-dark w-[2.625rem] flex justify-center items-center h-[2.625rem] rounded">
        <PresetSvg />
      </div>

      <div className="flex flex-col gap-2">
        <h4>{preset.name}</h4>
        <p className="text-text-secondary dark:text-text-secondary-dark">
          {preset.description}
        </p>
      </div>
    </div>
    <Button onClick={() => {}} size="fixed">
      Run {preset.name}
    </Button>
  </div>
);

export default PresetItem;
