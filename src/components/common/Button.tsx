import { useEffect, useState } from "react";

const DEFAULT_STYLE = [
  "text-white",
  "bg-button-primary",
  "hover:bg-highlight-button-primary",
];

const Button = ({
  onClick = null,
  children,
  color = "primary",
  size = "default",
  styles = "",
}) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    let classes = [];
    switch (color) {
      case "green": {
        classes = ["bg-green", "text-background", "dark:text-background-dark"];
        break;
      }
      case "transparent-white":
        classes = [
          "bg-transparent",
          "text-text-primary",
          "dark:text-text-primary-dark",
        ];
        break;
      case "transparent":
        classes = ["bg-transparent", "text-button-primary", "font-semibold"];
        break;
      case "outline":
        classes = [
          "bg-transparent",
          "font-semibold",
          "border-1",
          "border-solid",
          "border-button-primary",
        ];
        break;
      default:
        classes = [...DEFAULT_STYLE];
    }

    if (size === "large") {
      classes.push(`w-[12.2rem]`);
      classes.push(`h-[2.875rem]`);
    }

    if (size === "medium") {
      classes.push(`w-[10rem]`);
      classes.push(`h-[2.875rem]`);
    }

    if (size === "small") {
      classes.push(`w-[7.75rem]`);
      classes.push(`h-[2.875rem]`);
    }

    setClassName(classes.join(" "));
  }, [color, size]);

  return (
    <button
      onClick={onClick}
      className={`text-sm px-3.5 py-2 rounded font-semibold ${className} ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;
