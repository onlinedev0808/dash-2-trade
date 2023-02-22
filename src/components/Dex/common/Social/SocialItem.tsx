import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface ISocialItem {
  text: string;
  children?: ReactNode;
  color?: string;
}

const SocialItem = ({
  children,
  text,
  color = "green",
}: ISocialItem): JSX.Element => {
  let colorsClasses = "text-green border-green";
  let textColorHover = "group-hover:text-green";

  if (color === "yellow") {
    colorsClasses = "text-yellow border-yellow";
    textColorHover = "group-hover:text-yellow";
  }

  const classes = `${
    children ? "hidden group-hover:block" : "block"
  } ${colorsClasses}`;

  return (
    <div className="relative group">
      {children ? <span className={textColorHover}>{children}</span> : null}
      <div
        className={`border rounded-2xl whitespace-nowrap p-2 mt-3 absolute -bottom-5 left-[50%] translate-y-[100%] -translate-x-[50%] ${classes}`}
      >
        <span className="absolute top-0 right-[50%] -translate-y-[50%] translate-x-[50%]">
          <FontAwesomeIcon icon={faCaretUp} className="w-5 h-5" />
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default SocialItem;
