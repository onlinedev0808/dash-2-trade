import React from "react";
import { MoonSvg, SunSvg } from "../CommonSvg";

const ThemeSwitcher = ({
  isActive,
  onChange,
}: {
  isActive: boolean;
  onChange: () => void;
}): JSX.Element => (
  <div
    className={`relative rounded-full transition-all duration-300 ease-all w-12 h-6 
      ${isActive ? "bg-button-primary" : "bg-gray-600 dark:bg-highlight-dark"}`}
    onClick={onChange}
  >
    <div
      className={`absolute top-[50%] -translate-y-[50%] ${
        isActive ? "left-2" : "right-2"
      }`}
    >
      <span className="text-white h-[1rem]">
        {isActive ? <MoonSvg /> : <SunSvg />}
      </span>
    </div>

    <div
      className={`bg-white rounded-full my-1 transition-all duration-300 ease-all w-4 h-4 ${
        isActive ? "ml-7" : "ml-1"
      }`}
    />
  </div>
);

export default ThemeSwitcher;
