import React from "react";
import { THEME_PROPERTY, THEMES } from "./properties";

export type ThemeValueType = [string, (value: string) => void];

export const DEFAULT_THEME =
  (typeof window !== "undefined" &&
    window?.localStorage?.getItem(THEME_PROPERTY)) ||
  THEMES.DARK;

const ThemeContext = React.createContext<ThemeValueType>(["", () => {}]);

export default ThemeContext;
