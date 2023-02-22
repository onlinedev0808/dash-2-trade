import Dropdown from "./common/Dropdown";
import StepLayout from "./StepLayout";

const TOKEN_OPTIONS = [
  { id: 1, label: "BTC", value: "btc" },
  { id: 2, label: "ETH", value: "eth" },
];
const RESOLUTION_OPTIONS = [
  { id: 1, label: "1m", value: "1m" },
  { id: 2, label: "5m", value: "5m" },
  { id: 3, label: "1H", value: "1H" },
  { id: 4, label: "4H", value: "4H" },
  { id: 5, label: "1D", value: "1D" },
  { id: 6, label: "1W", value: "1W" },
];

const SelectSource = ({
  token,
  resolution,
  setToken,
  setResolution,
  isMobile,
  isAdvanced,
}) => (
  <StepLayout title="Select Source" isMobile={isMobile}>
    <div className="w-full lg:w-2/3 md:w-3/4 flex flex-col gap-y-4">
      <Dropdown
        options={TOKEN_OPTIONS}
        onChange={setToken}
        value={token}
        title="Token"
        hasTooltip
      />

      {isAdvanced && (
        <Dropdown
          options={RESOLUTION_OPTIONS}
          onChange={setResolution}
          value={resolution}
          title="Resolution"
          hasTooltip
        />
      )}
    </div>
  </StepLayout>
);

export default SelectSource;
