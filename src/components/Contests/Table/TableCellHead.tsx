import React from "react";

const Cell = ({ column }): JSX.Element => {
  return column.render("Header");
};

export default Cell;
