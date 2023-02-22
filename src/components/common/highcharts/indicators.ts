// eslint-disable-next-line import/prefer-default-export
export const INDICATORS = [
  // { name: "None", value: "none", isSelected: true, isDefault: true },
  { name: "Volume", value: "volume", isSelected: false },
  { name: "RSI", value: "rsi", isSelected: false },
  { name: "Stochastic", value: "stochastic", isSelected: false },
  { name: "OBV", value: "obv", isSelected: false },
  { name: "Bollinger bands", value: "bb", isSelected: false },
  {
    name: "EMA",
    value: "ema",
    isSelected: false,
    hasCustomValue: true,
    placeholder: "Period",
    params: [
      {
        name: "period",
        value: "",
      },
    ],
  },
  {
    name: "SMA",
    value: "sma",
    isSelected: false,
    hasCustomValue: true,
    placeholder: "Period",
    params: [
      {
        name: "period",
        value: "",
      },
    ],
  },
  {
    name: "DMI",
    value: "dmi",
    isSelected: false,
    hasCustomValue: true,
    placeholder: "Period",
    params: [
      {
        name: "period",
        value: "",
      },
    ],
  },
  {
    name: "MACD",
    value: "macd",
    isSelected: false,
    hasCustomValue: true,
    placeholder: "Period",
    params: [
      {
        name: "period",
        value: "",
      },
    ],
  },
  { name: "Ichimoku Kinko Hyo", value: "ikh", isSelected: false },
  {
    name: "Aroon",
    value: "aroon",
    isSelected: false,
    hasCustomValue: true,
    placeholder: "Period",
    params: [
      {
        name: "period",
        value: "",
      },
    ],
  },
];
