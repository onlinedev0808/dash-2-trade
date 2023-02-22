import { NextPage } from "next";
import React from "react";

interface IProps {
  children: JSX.Element | string;
  color?: "white" | "blue";
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button: NextPage<IProps> = ({
  children,
  color = "blue",
  type = "button",
  onClick,
}) => {
  let className = "w-[11rem] h-[2.625rem] text-sm rounded-md";

  switch (color) {
    case "blue":
      className += " bg-button-primary text-white";
      break;
    case "white":
      className += " bg-white text-button-primary";
      break;
    default:
      className += " bg-button-primary text-white";
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
