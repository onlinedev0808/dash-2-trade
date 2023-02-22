import { compareAsc, differenceInDays } from "date-fns";
import { IPresaleToken } from "../types/redux";

export const formatNumber = (val: number, maximumFractionDigits = null) => {
  if (!val) return null;
  if (val === 0) return 0;

  if (val < 0.001 && val > 0) {
    let t = val;
    let count = 0;
    while (t < 0.1) {
      t *= 10;
      count++;
    }
    return count;
  }

  const calcNumber = () => {
    if (val >= 1000000000000) {
      return val / 1000000000000;
    }
    if (val >= 1000000000) {
      return val / 1000000000;
    }
    if (val >= 1000000) {
      return val / 1000000;
    }
    if (val >= 1000) {
      return val / 1000;
    }
    if (val >= 0.1) {
      return val;
    }
    if (val >= 0.01) {
      return val.toLocaleString("en-us", {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits ?? 3,
      });
    }
    if (val >= 0.001) {
      return val.toLocaleString("en-us", {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits ?? 4,
      });
    }
    return val;
  };

  const calcPostfix = () => {
    if (val >= 1000000000000) {
      return "T";
    }
    if (val >= 1000000000) {
      return "B";
    }
    if (val >= 1000000) {
      return "M";
    }
    if (val >= 1000) {
      return "k";
    }
    return "";
  };

  const stringified = calcNumber().toLocaleString("en-us", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maximumFractionDigits ?? 2,
  });

  return stringified + calcPostfix();
};

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { maximumSignificantDigits: 10 }).format(
    price
  );

export const timeSince = (str_date: string | Date, isInDays = false) => {
  const date = Math.floor(new Date(str_date).getTime());
  const seconds = Math.abs(Math.floor((new Date().getTime() - date) / 1000));
  let interval = seconds / 31536000;

  if (isInDays) {
    interval = seconds / 86400;
    const time = Math.floor(interval);
    const unit = time === 1 ? "day" : "days";
    return `${time} ${unit}`;
  }

  if (interval > 1) {
    const time = Math.floor(interval);
    const unit = time === 1 ? "year" : "years";
    return `${time} ${unit}`;
  }

  interval = seconds / 2592000;

  if (interval > 1) {
    const time = Math.floor(interval);
    const unit = time === 1 ? "month" : "months";
    return `${time} ${unit}`;
  }

  interval = seconds / 86400;

  if (interval > 1) {
    const time = Math.floor(interval);
    const unit = time === 1 ? "day" : "days";
    return `${time} ${unit}`;
  }

  interval = seconds / 3600;

  if (interval > 1) {
    const time = Math.floor(interval);
    const unit = time === 1 ? "minute" : "minutes";
    return `${time} ${unit}`;
  }

  interval = seconds / 60;

  if (interval > 1) {
    const time = Math.floor(interval);
    const unit = time === 1 ? "minute" : "minutes";
    return `${time} ${unit}`;
  }

  const time = Math.floor(seconds);
  const unit = time === 1 ? "second" : "seconds";

  return `${time} ${unit}`;
};

export const getElementFromObj = (
  arr: IPresaleToken[],
  value: number
): IPresaleToken | null => {
  const result = arr.filter((o) => o.id === value);

  return result ? result[0] : null; // or undefined
};

export const colourGradientor = (
  p: number,
  rgb_beginning: number[],
  rgb_end: number[]
) => {
  const w = p * 2 - 1;

  const w1 = (w + 1) / 2.0;
  const w2 = 1 - w1;

  const rgb = [
    rgb_beginning[0] * w1 + rgb_end[0] * w2,
    rgb_beginning[1] * w1 + rgb_end[1] * w2,
    rgb_beginning[2] * w1 + rgb_end[2] * w2,
  ];

  return rgb;
};

export const debounce = (func: () => void, time = 100) => {
  let timer: any;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
};

export const prepareName = (word) => {
  const separatedArr = word
    .match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1)
    .join(" ");
  return separatedArr[0].toUpperCase() + separatedArr.substring(1);
};

export const getDashScoreColor = (value) => {
  let scoreColor;
  if (value >= 0 && value < 50) scoreColor = " text-red";
  else if (value >= 70) scoreColor = " text-green";
  else scoreColor = " text-[#C6A656]";
  return scoreColor;
};

export const getChangeColor = (value: number) => {
  let color;

  if (value > 0) color = " text-green";
  if (value < 0) color = " text-red";
  if (value === 0) color = " text-text-secondary dark:text-text-secondary-dark";

  return color;
};

export const daysSince = (date) => {
  if (compareAsc(new Date(date), new Date()) === -1) {
    return "Ended";
  }

  const difference = differenceInDays(new Date(date), new Date());
  let period = "days";
  if (difference === 1) {
    period = "day";
  }

  return `${difference} ${period} left`;
};
//
// export const checkOverflow = (el) => {
//   const curOverflow = el.style.overflow;
//
//   if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";
//
//   const isOverflowing =
//     el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
//
//   el.style.overflow = curOverflow;
//
//   return isOverflowing;
// };
