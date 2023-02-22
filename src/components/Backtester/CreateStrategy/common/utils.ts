export const INPUT_STYLE =
  "border-b-solid border-b-2 border-b-[#3F4B74] pt-1.5 pb-3";
export const FILLED_STYLE =
  "bg-foreground dark:bg-background-secondary-dark px-5 py-3 rounded-lg mt-2";
export const LABEL_STYLE =
  "text-left text-xs text-text-secondary dark:text-text-secondary-dark uppercase";

export const getInitialLogic = () => [
  { id: 0, datetime: "", symbol: "", open: "" },
];

export const EXCLUDE_PROPS = ["id", "label", "inputs", "title"];

export interface IInput {
  id: number;
  label: string;
  indicator?: string;
  parent?: IIndicator;
}

export interface IIndicator {
  id: number;
  label: string;
  options: {
    id: number;
    label: string;
    inputs?: {
      id: number;
      name: string;
      type: string;
      initialValue: IInput[] | number;
      title: string;
      placeholder?: string;
    }[];
  }[];
}

export const INPUTS: IInput[] = [
  { id: 1, label: "open" },
  { id: 2, label: "high" },
  { id: 3, label: "low" },
  { id: 4, label: "close" },
  { id: 5, label: "volume" },
];

export enum StrategyStatusEnum {
  Complete = "complete",
  InProgress = "in progress",
  Failed = "failed",
}
