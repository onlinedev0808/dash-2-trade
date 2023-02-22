import React from "react";

const SectionLayout = ({ title, children }) => (
  <div>
    <span className="text-base leading-[1.875rem] text-text-primary dark:text-text-primary-dark">
      {title}
    </span>
    <div className="mt-8">{children}</div>
  </div>
);

export default SectionLayout;
