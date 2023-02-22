import React from "react";

export enum ToggleTheme {
  Small = "small",
}

const ToggleForm = ({ isActive, onChange, toggleTheme = "" }) => {
  const isSmallToggle = ToggleTheme.Small === toggleTheme;
  const activeOffset = isSmallToggle ? "ml-5" : "ml-7";

  return (
    <div
      className={`rounded-full transition-all duration-300 ease-all ${
        isActive ? "bg-button-primary" : "bg-gray-600 dark:bg-highlight-dark"
      } ${isSmallToggle ? "w-8 h-4" : "w-12 h-6"}`}
      onClick={onChange}
    >
      <div
        className={`bg-white rounded-full my-1 transition-all duration-300 ease-all ${
          isSmallToggle ? "w-2 h-2" : "w-4 h-4"
        } ${isActive ? activeOffset : "ml-1"}`}
      />
    </div>
  );
};

export default ToggleForm;
